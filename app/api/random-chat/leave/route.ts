import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/random-chat/supabase-server";

export const runtime = "nodejs";

// POST /api/random-chat/leave { userId, sessionId?, reason? }
// Ends the active session (if any) and removes the user from the waiting pool.
// Other client sees the chat_sessions row flip to status='ended' via Realtime.

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    userId?: string;
    sessionId?: string | null;
    reason?: string;
  } | null;

  const userId = body?.userId;
  const sessionId = body?.sessionId ?? null;
  const reason = body?.reason ?? "left";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const sb = getServerSupabase();

  // Always remove from the waiting pool, in case the user bails before matching.
  await sb.from("chat_waiting").delete().eq("user_id", userId);

  if (sessionId) {
    const { error } = await sb.rpc("end_session", {
      p_session_id: sessionId,
      p_reason: reason,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
