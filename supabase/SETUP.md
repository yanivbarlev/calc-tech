# Supabase setup for `/random-chat`

This is the one-time setup you need to do before the random chat page works.
Takes ~5 minutes.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. Click **New project**.
   - Name: `calc-tech-random-chat` (or whatever you like)
   - Database password: pick a strong one, save it somewhere — you won't need it
     for the chat itself, but it's how you'd connect with `psql` later
   - Region: pick the one closest to most of your users (e.g. `us-east-1`)
   - Plan: **Free**
3. Wait ~2 minutes for the project to provision.

## 2. Run the schema

1. In the Supabase dashboard, left sidebar → **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` from this repo, copy the entire contents into the
   editor, and click **Run**.
3. You should see `Success. No rows returned.` Tables `chat_users`,
   `chat_sessions`, `chat_waiting`, `chat_messages` now exist.

> Re-running the file is safe — every statement is idempotent.

## 3. Grab the keys

In the Supabase dashboard, left sidebar → **Project Settings** → **API**.

You need two values:

| Name in Supabase           | Used as env var                       |
| -------------------------- | ------------------------------------- |
| **Project URL**            | `SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_URL` (same value) |
| **anon / public** key      | `NEXT_PUBLIC_SUPABASE_ANON_KEY`       |
| **service_role / secret**  | `SUPABASE_SERVICE_ROLE_KEY`           |

The `service_role` key bypasses Row-Level Security — **never expose it to the
browser**. Only the API routes under `app/api/random-chat/*` use it.

## 4. Add the env vars

### Local development (`.env.local` in the project root)

```env
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...long-secret-here...
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...public-anon-key...
```

`.env.local` is already in `.gitignore` — don't commit it.

### Production (Vercel)

1. Vercel dashboard → your project → **Settings** → **Environment Variables**.
2. Add all four vars above, scope to **Production**, **Preview**, **Development**.
3. Trigger a redeploy (or push any commit) for the new vars to take effect.

## 5. Verify

- Visit `/random-chat` locally (`npm run dev`).
- Open two browser windows (one normal, one incognito).
- Pick a username + check 18+ in each → click **Start Chat**.
- They should pair within ~2 seconds. Messages should appear instantly in both.

## What's in the database

- **`chat_users`** — one row per visitor (anonymous, just a username).
- **`chat_waiting`** — temporary queue. A user sits here for at most a couple
  of seconds before being paired.
- **`chat_sessions`** — every pairing, with `status = 'active'` while live and
  `'ended'` after either user leaves.
- **`chat_messages`** — every message ever sent. Indexed by `session_id` so
  you can replay any conversation later.

## Optional: cleanup job

Stale rows can accumulate if the browser is killed before sending the
`/leave` beacon. If you want a periodic sweep, add a Supabase
**Edge Function** or a `pg_cron` job that runs:

```sql
-- Drop waiting rows older than 30 seconds (user clearly left)
delete from chat_waiting where joined_at < now() - interval '30 seconds';

-- Mark sessions older than 1 hour as ended (in case both clients vanished)
update chat_sessions
  set status = 'ended', ended_at = now(), end_reason = 'stale'
  where status = 'active' and created_at < now() - interval '1 hour';
```

For v1 traffic this is not urgent — both tables are tiny.
