import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/random-chat/supabase-server";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 500;

// POST /api/random-chat/send { sessionId, senderId, content }
// Inserts a message into chat_messages. Both clients subscribed to Realtime
// on the session will receive it.

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    sessionId?: string;
    senderId?: string;
    content?: string;
  } | null;

  const sessionId = body?.sessionId;
  const senderId = body?.senderId;
  const content = body?.content?.trim();

  if (!sessionId || !senderId || !content) {
    return NextResponse.json(
      { error: "Missing sessionId, senderId or content" },
      { status: 400 }
    );
  }
  if (content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message too long (max ${MAX_MESSAGE_LENGTH} chars).` },
      { status: 400 }
    );
  }

  const sb = getServerSupabase();

  // Verify the sender belongs to this session AND that it's still active.
  const { data: session, error: sessErr } = await sb
    .from("chat_sessions")
    .select("id, user_a, user_b, status")
    .eq("id", sessionId)
    .single();

  if (sessErr || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  if (session.status !== "active") {
    return NextResponse.json({ error: "Session has ended" }, { status: 410 });
  }
  if (session.user_a !== senderId && session.user_b !== senderId) {
    return NextResponse.json({ error: "Sender not in this session" }, { status: 403 });
  }

  const { error: insErr } = await sb
    .from("chat_messages")
    .insert({ session_id: sessionId, sender_id: senderId, content });

  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
