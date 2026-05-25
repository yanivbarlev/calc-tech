"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { Filter } from "bad-words";
import { generateUsername, isValidUsername } from "@/lib/random-chat/username";
import { getBrowserSupabase } from "@/lib/random-chat/supabase-browser";

type Stage = "setup" | "waiting" | "chatting" | "partner_left";

type Msg = {
  id: string;
  sender: "me" | "stranger" | "system";
  username: string;
  content: string;
};

const MATCH_POLL_MS = 2000;
const MAX_MESSAGE_LENGTH = 500;

// ---------------------------------------------------------------------------

export default function RandomChatPage() {
  // Setup-screen state
  const [username, setUsername] = useState("");
  const [ageOk, setAgeOk] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Chat state
  const [stage, setStage] = useState<Stage>("setup");
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageRef = useRef<Stage>("setup");
  const userIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  // Cross-callback reference so subscribeToSession can re-enter beginMatching
  // without creating a declaration cycle.
  const beginMatchingRef = useRef<((myId: string) => Promise<void>) | null>(null);

  useEffect(() => { stageRef.current = stage; }, [stage]);
  useEffect(() => { userIdRef.current = userId; }, [userId]);
  useEffect(() => { sessionIdRef.current = sessionId; }, [sessionId]);

  // Seed a username on first client mount. Done in an effect (not via
  // useState initializer) so SSR and the first client render agree on "".
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsername(generateUsername());
  }, []);

  // Auto-scroll on new message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, stage]);

  // Lazily build a single Filter instance.
  const filter = useMemo(() => new Filter(), []);

  // ---------------------------------------------------------------------------
  // Cleanup helpers
  // ---------------------------------------------------------------------------

  const teardownChannel = useCallback(() => {
    const ch = channelRef.current;
    if (ch) {
      ch.unsubscribe();
      const sb = getBrowserSupabase();
      sb.removeChannel(ch);
      channelRef.current = null;
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearTimeout(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // Tab close / unload: best-effort tell the server we're gone.
  useEffect(() => {
    const handler = () => {
      const uid = userIdRef.current;
      const sid = sessionIdRef.current;
      if (!uid) return;
      const payload = JSON.stringify({ userId: uid, sessionId: sid, reason: "left" });
      try {
        navigator.sendBeacon(
          "/api/random-chat/leave",
          new Blob([payload], { type: "application/json" })
        );
      } catch {
        // ignore -- the row will just stay in chat_waiting until manual cleanup
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // ---------------------------------------------------------------------------
  // Session subscription: messages + partner-left detection
  // ---------------------------------------------------------------------------

  const subscribeToSession = useCallback((sid: string, myId: string) => {
    teardownChannel();
    const sb = getBrowserSupabase();
    const ch = sb
      .channel(`session:${sid}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sid}`,
        },
        (payload) => {
          const row = payload.new as {
            id: number;
            sender_id: string;
            content: string;
          };
          // We optimistically render our own sends, so skip echo.
          if (row.sender_id === myId) return;
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${row.id}`,
              sender: "stranger",
              username: "Stranger",
              content: row.content,
            },
          ]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_sessions",
          filter: `id=eq.${sid}`,
        },
        (payload) => {
          const row = payload.new as { status: string };
          if (row.status === "ended" && stageRef.current === "chatting") {
            setMessages((prev) => [
              ...prev,
              {
                id: `sys-${Date.now()}`,
                sender: "system",
                username: "",
                content: "Stranger disconnected. Finding a new chat…",
              },
            ]);
            setStage("partner_left");
            // Auto-search for a new stranger.
            void beginMatchingRef.current?.(myId);
          }
        }
      )
      .subscribe();
    channelRef.current = ch;
  }, [teardownChannel]);

  // ---------------------------------------------------------------------------
  // Matchmaking loop
  // ---------------------------------------------------------------------------

  const beginMatching = useCallback(async (myId: string) => {
    teardownChannel();
    setSessionId(null);
    setPartnerName(null);
    setMessages([]);
    setStage("waiting");

    const poll = async () => {
      try {
        const res = await fetch("/api/random-chat/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: myId }),
        });
        const data = await res.json();

        if (data.state === "matched") {
          setSessionId(data.sessionId);
          setPartnerName(data.partnerUsername ?? "Stranger");
          setMessages([
            {
              id: `sys-${Date.now()}`,
              sender: "system",
              username: "",
              content: `You're now chatting with a stranger. Say hi!`,
            },
          ]);
          setStage("chatting");
          subscribeToSession(data.sessionId, myId);
          return;
        }
        // Still waiting -- schedule next poll.
        if (stageRef.current === "waiting" || stageRef.current === "partner_left") {
          pollRef.current = setTimeout(poll, MATCH_POLL_MS);
        }
      } catch {
        // Network blip -- retry.
        pollRef.current = setTimeout(poll, MATCH_POLL_MS);
      }
    };

    stopPolling();
    poll();
  }, [stopPolling, subscribeToSession, teardownChannel]);

  // Keep beginMatchingRef pointing at the latest beginMatching.
  useEffect(() => {
    beginMatchingRef.current = beginMatching;
  }, [beginMatching]);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const handleStart = useCallback(async () => {
    setUsernameError(null);

    const clean = username.trim();
    if (!isValidUsername(clean)) {
      setUsernameError("Use 3–20 letters, digits, or underscores.");
      return;
    }
    if (filter.isProfane(clean)) {
      setUsernameError("Please choose a different name.");
      return;
    }
    if (!ageOk) {
      setUsernameError("Please confirm you are 18 or older.");
      return;
    }

    try {
      const res = await fetch("/api/random-chat/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: clean }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setUsernameError(err.error || "Could not start chat. Please try again.");
        return;
      }
      const data = await res.json();
      setUserId(data.userId);
      setUsername(data.username);
      await beginMatching(data.userId);
    } catch {
      setUsernameError("Network error. Please try again.");
    }
  }, [username, ageOk, filter, beginMatching]);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text || stage !== "chatting" || !sessionId || !userId) return;
    if (text.length > MAX_MESSAGE_LENGTH) return;

    const cleaned = filter.clean(text);

    // Optimistic render.
    const localId = `me-${Date.now()}-${Math.random()}`;
    setMessages((prev) => [
      ...prev,
      { id: localId, sender: "me", username, content: cleaned },
    ]);
    setDraft("");

    try {
      await fetch("/api/random-chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, senderId: userId, content: cleaned }),
      });
    } catch {
      // Swallow -- user can retry by sending again.
    }
  }, [draft, stage, sessionId, userId, username, filter]);

  const handleNext = useCallback(async () => {
    if (!userId) return;
    const oldSession = sessionId;

    // Tell the server the old session is over (best-effort).
    if (oldSession) {
      try {
        await fetch("/api/random-chat/leave", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, sessionId: oldSession, reason: "next" }),
        });
      } catch {
        // ignore
      }
    }
    await beginMatching(userId);
  }, [userId, sessionId, beginMatching]);

  const handleLeaveAll = useCallback(async () => {
    stopPolling();
    teardownChannel();
    if (userId) {
      try {
        await fetch("/api/random-chat/leave", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, sessionId, reason: "left" }),
        });
      } catch {
        // ignore
      }
    }
    setStage("setup");
    setSessionId(null);
    setPartnerName(null);
    setMessages([]);
  }, [userId, sessionId, teardownChannel, stopPolling]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      stopPolling();
      teardownChannel();
    };
  }, [stopPolling, teardownChannel]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#e9eff7" }}
    >
      <div className="max-w-[1060px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Calc-Tech
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-slate-800">
            Random Chat — Instant Chat with Strangers
          </h1>
          <div className="w-20" />
        </div>

        {/* Main chat card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div
            ref={scrollRef}
            className="h-[55vh] min-h-[400px] overflow-y-auto p-5 space-y-2"
            style={{ background: "#fafbfc" }}
          >
            {stage === "setup" && (
              <SetupView
                username={username}
                setUsername={setUsername}
                ageOk={ageOk}
                setAgeOk={setAgeOk}
                onShuffle={() => setUsername(generateUsername())}
                onStart={handleStart}
                error={usernameError}
              />
            )}

            {stage === "waiting" && (
              <CenteredStatus
                title="Looking for a stranger…"
                subtitle="Hang tight — we'll connect you as soon as someone shows up."
                spinner
              />
            )}

            {(stage === "chatting" || stage === "partner_left") && (
              <MessageList messages={messages} myName={username} partnerName={partnerName} />
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-slate-200 flex">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                stage === "chatting"
                  ? "Type Message Here"
                  : stage === "setup"
                  ? "Start a chat to send messages"
                  : "Waiting for a stranger…"
              }
              disabled={stage !== "chatting"}
              maxLength={MAX_MESSAGE_LENGTH}
              className="flex-1 px-4 py-3 text-sm bg-slate-50 outline-none disabled:opacity-60"
              style={{ fontFamily: "inherit" }}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={stage !== "chatting" || !draft.trim()}
              className="px-6 py-3 text-sm font-bold text-white disabled:opacity-40"
              style={{ background: "#2563eb" }}
            >
              SEND
            </button>
          </div>

          {/* Action bar */}
          <div className="grid grid-cols-2 text-white text-sm font-semibold">
            <button
              type="button"
              onClick={handleNext}
              disabled={!userId}
              className="py-3 disabled:opacity-50"
              style={{ background: "#1e40af" }}
            >
              {stage === "setup" ? "Start Chat" : "Next Stranger"}
            </button>
            <button
              type="button"
              onClick={handleLeaveAll}
              disabled={stage === "setup"}
              className="py-3 disabled:opacity-50"
              style={{ background: "#b91c1c" }}
            >
              Leave Chat
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          By using Random Chat you confirm you are at least 18 years old and agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-700">Terms of Use</Link>{" "}and{" "}
          <Link href="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>.
          Be respectful. Do not share personal information.
        </p>
      </div>
    </div>
  );
}

// ===========================================================================
// Sub-components
// ===========================================================================

function SetupView({
  username, setUsername, ageOk, setAgeOk, onShuffle, onStart, error,
}: {
  username: string;
  setUsername: (s: string) => void;
  ageOk: boolean;
  setAgeOk: (b: boolean) => void;
  onShuffle: () => void;
  onStart: () => void;
  error: string | null;
}) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div
          className="text-[9.5px] font-bold uppercase mb-3 text-center"
          style={{ letterSpacing: ".12em", color: "#bbb" }}
        >
          Your Username
        </div>
        <div className="flex gap-2 mb-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-800 font-medium outline-none focus:border-slate-500"
            style={{ fontFamily: "inherit" }}
          />
          <button
            type="button"
            onClick={onShuffle}
            title="Generate a new random username"
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-sm font-semibold"
          >
            Shuffle
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          3–20 letters, digits, or underscores. You can change it now — not later.
        </p>

        <label className="flex items-start gap-3 cursor-pointer mb-5">
          <input
            type="checkbox"
            checked={ageOk}
            onChange={(e) => setAgeOk(e.target.checked)}
            className="mt-1 w-4 h-4 accent-green-700"
          />
          <span className="text-sm text-slate-700 leading-snug">
            I confirm I am <strong>18 or older</strong> and agree to the{" "}
            <Link href="/terms" className="underline hover:text-slate-900">Terms of Use</Link>{" "}
            and <Link href="/privacy" className="underline hover:text-slate-900">Privacy Policy</Link>.
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-600 mb-3" role="alert">{error}</p>
        )}

        <button
          type="button"
          onClick={onStart}
          className="w-full py-3 rounded-lg font-bold text-white text-base shadow-sm transition-transform active:scale-[.99]"
          style={{ background: "#1a8c5f" }}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}

function CenteredStatus({
  title, subtitle, spinner,
}: { title: string; subtitle?: string; spinner?: boolean }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      {spinner && (
        <div className="w-10 h-10 mb-4 rounded-full border-[3px] border-slate-200 border-t-slate-500 animate-spin" />
      )}
      <div className="text-base font-semibold text-slate-700">{title}</div>
      {subtitle && (
        <div className="text-sm text-slate-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
}

function MessageList({
  messages, myName, partnerName,
}: { messages: Msg[]; myName: string; partnerName: string | null }) {
  return (
    <div className="space-y-1.5">
      {messages.map((m) => {
        if (m.sender === "system") {
          return (
            <div
              key={m.id}
              className="text-xs italic text-slate-400 text-center py-1"
            >
              {m.content}
            </div>
          );
        }
        const isMe = m.sender === "me";
        const color = isMe ? "#1a8c5f" : "#2563eb";
        const displayName = isMe ? myName : partnerName ?? "Stranger";
        return (
          <div key={m.id} className="text-sm leading-relaxed text-slate-800">
            <span className="font-bold" style={{ color }}>{displayName}:</span>{" "}
            <span className="break-words">{m.content}</span>
          </div>
        );
      })}
    </div>
  );
}
