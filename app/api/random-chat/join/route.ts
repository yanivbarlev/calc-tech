import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/random-chat/supabase-server";
import { isValidUsername } from "@/lib/random-chat/username";

export const runtime = "nodejs";

// POST /api/random-chat/join { username }
// Creates an anonymous chat_user row and returns its id.
// The client stores { userId, username } in localStorage and reuses it on reload.

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { username?: string } | null;
  const username = body?.username?.trim();

  if (!username || !isValidUsername(username)) {
    return NextResponse.json(
      { error: "Invalid username (3-20 chars, letters/digits/underscore only)." },
      { status: 400 }
    );
  }

  const sb = getServerSupabase();
  const { data, error } = await sb
    .from("chat_users")
    .insert({ username })
    .select("id, username")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ userId: data.id, username: data.username });
}
