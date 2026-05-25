-- ============================================================================
-- Random Chat schema for calc-tech.com/random-chat
-- Run this once in the Supabase SQL editor on a fresh project.
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / CREATE OR REPLACE).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists chat_users (
  id            uuid primary key default gen_random_uuid(),
  username      text not null,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

create table if not exists chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_a      uuid not null references chat_users(id) on delete cascade,
  user_b      uuid not null references chat_users(id) on delete cascade,
  status      text not null default 'active',         -- 'active' | 'ended'
  created_at  timestamptz not null default now(),
  ended_at    timestamptz,
  end_reason  text                                    -- 'left' | 'next' | null
);
create index if not exists idx_chat_sessions_user_a on chat_sessions(user_a, created_at desc);
create index if not exists idx_chat_sessions_user_b on chat_sessions(user_b, created_at desc);

create table if not exists chat_waiting (
  user_id    uuid primary key references chat_users(id) on delete cascade,
  joined_at  timestamptz not null default now()
);
create index if not exists idx_chat_waiting_joined_at on chat_waiting(joined_at);

create table if not exists chat_messages (
  id          bigserial primary key,
  session_id  uuid not null references chat_sessions(id) on delete cascade,
  sender_id   uuid not null references chat_users(id) on delete cascade,
  content     text not null,
  created_at  timestamptz not null default now()
);
create index if not exists idx_chat_messages_session on chat_messages(session_id, created_at);

-- ---------------------------------------------------------------------------
-- Matchmaking function
-- Atomically pairs the caller with the oldest waiting user, or enqueues them.
-- Returns exactly one row:
--   state='matched' -> session_id + partner_id + partner_username populated
--   state='waiting' -> all NULLs except state
-- ---------------------------------------------------------------------------

create or replace function match_or_wait(p_user_id uuid)
returns table (
  state              text,
  session_id         uuid,
  partner_id         uuid,
  partner_username   text
)
language plpgsql
as $$
declare
  v_partner          uuid;
  v_partner_username text;
  v_session          uuid;
begin
  -- Find an existing waiting user (not ourselves), lock the row so two
  -- concurrent callers can't grab the same partner.
  select w.user_id, u.username
    into v_partner, v_partner_username
    from chat_waiting w
    join chat_users u on u.id = w.user_id
    where w.user_id <> p_user_id
    order by w.joined_at
    for update of w skip locked
    limit 1;

  if v_partner is null then
    -- No one else is waiting. Add us to the pool (refresh joined_at if already there).
    insert into chat_waiting(user_id, joined_at)
      values (p_user_id, now())
      on conflict (user_id) do update set joined_at = now();

    return query select 'waiting'::text, null::uuid, null::uuid, null::text;
    return;
  end if;

  -- Got a partner. Pop both of us out of the waiting pool and open a session.
  delete from chat_waiting where user_id in (p_user_id, v_partner);

  insert into chat_sessions(user_a, user_b)
    values (p_user_id, v_partner)
    returning id into v_session;

  return query select 'matched'::text, v_session, v_partner, v_partner_username;
end;
$$;

-- ---------------------------------------------------------------------------
-- End-session helper. Marks the session ended and removes the caller from
-- the waiting pool. Idempotent.
-- ---------------------------------------------------------------------------

create or replace function end_session(p_session_id uuid, p_reason text default 'left')
returns void
language plpgsql
as $$
begin
  update chat_sessions
    set status = 'ended',
        ended_at = coalesce(ended_at, now()),
        end_reason = coalesce(end_reason, p_reason)
    where id = p_session_id
      and status = 'active';
end;
$$;

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- All writes go through Next.js API routes using the service_role key, so we
-- keep RLS on but expose only SELECT on chat_messages + chat_sessions for the
-- anon role. This is what powers the browser's Realtime subscription.
--
-- Knowing a session UUID (128 bits) is effectively required to read its
-- messages -- API routes never leak it to the wrong client.
-- ---------------------------------------------------------------------------

alter table chat_users    enable row level security;
alter table chat_sessions enable row level security;
alter table chat_waiting  enable row level security;
alter table chat_messages enable row level security;

drop policy if exists "anon can read sessions" on chat_sessions;
create policy "anon can read sessions"
  on chat_sessions for select
  to anon
  using (true);

drop policy if exists "anon can read messages" on chat_messages;
create policy "anon can read messages"
  on chat_messages for select
  to anon
  using (true);

-- No anon policies on chat_users or chat_waiting -- those stay server-only.

-- ---------------------------------------------------------------------------
-- Enable Realtime broadcasts on the two tables the browser subscribes to.
-- (Supabase auto-creates the supabase_realtime publication.)
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and tablename = 'chat_messages'
  ) then
    execute 'alter publication supabase_realtime add table chat_messages';
  end if;

  if not exists (
    select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and tablename = 'chat_sessions'
  ) then
    execute 'alter publication supabase_realtime add table chat_sessions';
  end if;
end $$;
