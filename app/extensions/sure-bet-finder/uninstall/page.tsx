"use client";

import { useState } from "react";

// Published Chrome Web Store listing — the reinstall CTA points here.
const CWS_URL =
  "https://chromewebstore.google.com/detail/polymarket-sure-bet-finde/ikkajnakiciblmjgejjhcaecdijgekne";

// Survey posts to the shared Cloudflare Worker's /feedback route (absolute URL —
// the page is on calc-tech, /feedback lives on the worker). The worker already
// returns Access-Control-Allow-Origin: * and handles the OPTIONS preflight, so
// this cross-origin POST works without any worker change. Rate-limited +
// honeypot-protected server-side; emails the owner via Resend.
const FEEDBACK_URL = "https://polymarket-ai-proxy.u-niv.workers.dev/feedback";

const REASONS: { value: string; label: string }[] = [
  { value: "not-working", label: "Didn't work the way I expected" },
  { value: "too-expensive", label: "Pro upgrade was too expensive" },
  { value: "found-better", label: "Found a better alternative" },
  { value: "missing-feature", label: "Missing a feature I needed" },
  { value: "too-slow", label: "Too slow / too many results to sift through" },
  { value: "no-good-bets", label: "Didn't find bets worth taking" },
  { value: "just-trying", label: "Just trying it out, no longer need it" },
  { value: "other", label: "Something else" },
];

export default function SureBetFinderUninstall() {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    const message =
      "Reason: " + (reason || "unknown") + (details ? "\n\nDetails: " + details : "");
    try {
      await fetch(FEEDBACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "uninstall",
          message,
          version: "unknown",
          honeypot,
        }),
      });
    } catch (_) {
      // Silent — we never block the user on a failed feedback send.
    }
    setSent(true);
    setSending(false);
    // Tabs Chrome opens on uninstall usually can't be closed by JS, but try.
    setTimeout(() => {
      try {
        window.close();
      } catch (_) {}
    }, 1800);
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --bg: #f8fafc;
          --bg-card: #ffffff;
          --line: #e5e7eb;
          --text: #0f172a;
          --text-muted: #475569;
          --text-dim: #64748b;
          --accent: #059669;
          --accent-hover: #047857;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          line-height: 1.5;
        }
        .un-wrap {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px 64px;
        }
        .un-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 15% 8%, rgba(5,150,105,0.07), transparent 60%),
            radial-gradient(ellipse 600px 500px at 85% 85%, rgba(59,130,246,0.05), transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .un-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 560px;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 36px 34px;
          box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 24px 48px -16px rgba(15,23,42,0.12);
          animation: unFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes unFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .un-h1 {
          font-size: 26px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--text); margin-bottom: 8px;
        }
        .un-lead { font-size: 15.5px; color: var(--text-muted); margin-bottom: 24px; }

        /* PRIMARY ACTION — reinstall CTA dominates the fold */
        .un-reinstall {
          display: flex; align-items: center; gap: 16px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: #fff; padding: 18px 20px; border-radius: 16px;
          text-decoration: none; margin-bottom: 12px;
          box-shadow: 0 10px 30px rgba(5,150,105,0.4);
          animation: unPulse 2.4s ease-in-out infinite;
          transition: transform 0.12s ease;
        }
        .un-reinstall:hover { transform: translateY(-2px); }
        .un-reinstall-icon { font-size: 30px; line-height: 1; animation: unSpin 4.5s linear infinite; }
        .un-reinstall-main { flex: 1; }
        .un-reinstall-title { font-size: 17px; font-weight: 700; }
        .un-reinstall-sub { font-size: 13px; opacity: 0.9; margin-top: 2px; }
        .un-reinstall-arrow { font-size: 22px; font-weight: 700; }
        @keyframes unPulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(5,150,105,0.4); }
          50%      { box-shadow: 0 14px 38px rgba(5,150,105,0.6), 0 0 0 5px rgba(5,150,105,0.12); }
        }
        @keyframes unSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .un-reinstall-hint {
          font-size: 12.5px; color: var(--text-dim); text-align: center; margin-bottom: 28px;
        }

        .un-divider {
          display: flex; align-items: center; gap: 14px;
          color: var(--text-dim); font-size: 13px; margin: 4px 0 20px;
        }
        .un-divider::before, .un-divider::after {
          content: ''; flex: 1; height: 1px; background: var(--line);
        }

        .un-reason {
          display: flex; align-items: center; gap: 11px;
          padding: 12px 14px; margin-bottom: 9px;
          border: 1.5px solid var(--line); border-radius: 11px;
          cursor: pointer; font-size: 14.5px; color: var(--text-muted);
          transition: border-color 0.12s ease, background 0.12s ease;
        }
        .un-reason:hover { border-color: #cbd5e1; }
        .un-reason:has(input:checked) {
          border-color: var(--accent); background: rgba(5,150,105,0.07); color: var(--text);
        }
        .un-reason input { accent-color: var(--accent); width: 16px; height: 16px; flex-shrink: 0; }

        .un-textarea {
          width: 100%; margin-top: 6px; padding: 12px 14px;
          border: 1.5px solid var(--line); border-radius: 11px;
          font-family: inherit; font-size: 14px; color: var(--text);
          resize: vertical; min-height: 78px; background: #fff;
        }
        .un-textarea:focus { outline: none; border-color: var(--accent); }

        .un-honeypot { position: absolute; left: -10000px; opacity: 0; pointer-events: none; height: 0; }

        .un-submit {
          width: 100%; margin-top: 16px;
          padding: 14px 18px; border: none; border-radius: 12px;
          background: #0f172a; color: #fff;
          font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer;
          transition: opacity 0.12s ease, transform 0.12s ease;
        }
        .un-submit:hover { transform: translateY(-1px); }
        .un-submit:disabled { opacity: 0.55; cursor: default; transform: none; }

        .un-thanks {
          text-align: center; padding: 20px 0 4px;
          font-size: 16px; font-weight: 600; color: var(--accent-hover);
          animation: unFadeUp 0.4s ease both;
        }
        .un-foot {
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid var(--line);
          font-size: 12.5px; color: var(--text-dim); text-align: center;
        }
      `}</style>

      <div className="un-wrap">
        <div className="un-card">
          <h1 className="un-h1">Wait — was it something we did?</h1>
          <p className="un-lead">
            If you uninstalled <strong>Polymarket Sure Bet Finder</strong> by accident — or just
            want to give it another shot — you&apos;re one click away.
          </p>

          <a className="un-reinstall" href={CWS_URL} target="_blank" rel="noopener noreferrer">
            <span className="un-reinstall-icon">↻</span>
            <span className="un-reinstall-main">
              <div className="un-reinstall-title">Reinstall — Free</div>
              <div className="un-reinstall-sub">Takes 5 seconds, keeps your license</div>
            </span>
            <span className="un-reinstall-arrow">→</span>
          </a>
          <p className="un-reinstall-hint">
            Your license key stays valid — just paste it again after reinstalling.
          </p>

          {sent ? (
            <div className="un-thanks">✓ Thanks — your feedback helps us improve.</div>
          ) : (
            <>
              <div className="un-divider">or tell us why you left</div>
              <form onSubmit={handleSubmit}>
                {REASONS.map((r) => (
                  <label className="un-reason" key={r.value}>
                    <input
                      type="radio"
                      name="reason"
                      value={r.value}
                      checked={reason === r.value}
                      onChange={() => setReason(r.value)}
                    />
                    {r.label}
                  </label>
                ))}

                <textarea
                  className="un-textarea"
                  placeholder="Anything else? (optional)"
                  maxLength={2000}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />

                {/* Honeypot — bots fill hidden fields; humans never see this. */}
                <input
                  type="text"
                  className="un-honeypot"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <button className="un-submit" type="submit" disabled={sending || !reason}>
                  {sending ? "Sending…" : "Send feedback"}
                </button>
              </form>
            </>
          )}

          <div className="un-foot">
            Changed your mind, or need help?{" "}
            <a href={CWS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#047857", fontWeight: 600, textDecoration: "none" }}>
              Reinstall here
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
