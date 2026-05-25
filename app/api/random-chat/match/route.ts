import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/random-chat/supabase-server";

export const runtime = "nodejs";

// POST /api/random-chat/match { userId }
// Atomically pairs the user with a waiting partner, or enqueues them.
// Returns either { state: "matched", sessionId, partnerId, partnerUsername }
// or            { state: "waiting" }.

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { userId?: string } | null;
  const userId = body?.userId;
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const sb = getServerSupabase();
  const { data, error } = await sb.rpc("match_or_wait", { p_user_id: userId });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // RPC returns an array; take the single row.
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return NextResponse.json({ error: "Matchmaker returned no row" }, { status: 500 });
  }

  if (row.state === "matched") {
    return NextResponse.json({
      state: "matched",
      sessionId: row.session_id as string,
      partnerId: row.partner_id as string,
      partnerUsername: row.partner_username as string,
    });
  }
  return NextResponse.json({ state: "waiting" });
}
