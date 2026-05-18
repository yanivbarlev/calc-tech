"use client";

import { useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

const CWS_URL = "https://chromewebstore.google.com/detail/stream-saver";

const REASONS = [
  "It didn't detect the streams I needed",
  "The download wasn't a playable file",
  "I found a better extension",
  "Too few free downloads per day",
  "Just testing — I'll reinstall",
  "Other",
];

export default function StreamSaverUninstallPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to a feedback endpoint when one is available.
    // Pattern used by other calc-tech extensions:
    //   POST /api/feedback with { extension: "streamsaver", reason: selected, comment: other }
    // For now, show the thank-you state immediately (client-only, same as CleanTube pattern).
    setSubmitted(true);
  }

  return (
    <div
      style={{
        fontFamily:
          "'Inter', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
        background: "#ffffff",
        color: "#111",
        minHeight: "100vh",
        padding: "0 24px 80px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { max-width: 960px; margin: 0 auto; }
        header { padding: 28px 0 24px; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 9px; font-size: 15px; font-weight: 700; color: #111; letter-spacing: -.3px; text-decoration: none; }
        .logo-dot { width: 28px; height: 28px; background: #0E7C7B; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 16px; }
        .radio-option { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 8px; cursor: pointer; transition: background .12s; margin-bottom: 4px; }
        .radio-option:hover { background: #fafafa; }
        .radio-option input[type=radio] { display: none; }
        .radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #e0e0e0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color .15s; }
        .radio-circle.checked { border-color: #0E7C7B; }
        .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #0E7C7B; }
        .radio-label { font-size: 14px; color: #222; cursor: pointer; }
        textarea { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 12px 14px; font-family: inherit; font-size: 13.5px; color: #333; resize: vertical; outline: none; transition: border-color .15s; background: #fff; }
        textarea:focus { border-color: #0E7C7B; }
        .submit-btn { background: #0E7C7B; color: #fff; border: none; border-radius: 8px; padding: 11px 26px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; }
        .submit-btn:hover { background: #0a6160; }
        .reinstall-btn { display: inline-flex; align-items: center; gap: 9px; background: #0E7C7B; color: #fff; border-radius: 9px; padding: 13px 26px; font-family: inherit; font-size: 14px; font-weight: 700; text-decoration: none; transition: background .15s, transform .12s; }
        .reinstall-btn:hover { background: #0a6160; transform: translateY(-1px); }
        .reinstall-btn-outline { display: inline-flex; align-items: center; gap: 9px; color: #0E7C7B; border: 2px solid #0E7C7B; border-radius: 9px; padding: 11px 22px; font-family: inherit; font-size: 13.5px; font-weight: 600; text-decoration: none; transition: background .15s, color .15s; margin-top: 10px; }
        .reinstall-btn-outline:hover { background: #0E7C7B; color: #fff; }
        .thank-you { background: #e6f4f4; border: 1px solid #b3dede; border-radius: 10px; padding: 20px 22px; }
        footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #efefef; display: flex; gap: 20px; }
        footer a { font-size: 11px; color: #999; text-decoration: none; }
        footer a:hover { color: #0E7C7B; }
      `}</style>

      <div className="page">
        {/* Header */}
        <header>
          <Link href="/" className="logo">
            <div className="logo-dot">
              <Download style={{ width: 14, height: 14, color: "#fff" }} />
            </div>
            Stream Saver
          </Link>
        </header>

        {/* Reinstall CTA — above the fold, prominent, per extension-defaults skill */}
        <section style={{ padding: "48px 0 0" }}>
          <div
            style={{
              background: "#fafafa",
              border: "1px solid #efefef",
              borderRadius: 12,
              padding: "32px 28px",
              maxWidth: 580,
            }}
          >
            <div className="section-label">Changed your mind?</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-.4px",
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Stream Saver is free to reinstall
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.7,
                marginBottom: 22,
                maxWidth: 440,
              }}
            >
              Takes 10 seconds. No account needed. If it didn&apos;t work on the
              site you tried, let us know below — we may have a fix.
            </p>
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn"
            >
              <Download style={{ width: 15, height: 15 }} />
              Reinstall Stream Saver
            </a>
            <p style={{ marginTop: 10, fontSize: 12, color: "#aaa" }}>
              Free — 5 downloads/day &bull; No account required
            </p>
          </div>
        </section>

        {/* Survey + side reinstall details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,380px)",
            gap: 56,
            marginTop: 48,
            alignItems: "start",
          }}
        >
          {/* Left: survey */}
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-.5px",
                lineHeight: 1.2,
                color: "#111",
                marginBottom: 10,
              }}
            >
              You&apos;ve uninstalled Stream Saver
            </h1>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.6, marginBottom: 28 }}>
              Would you take 30 seconds to tell us why? It helps us improve.
            </p>

            <div className="section-label">Why did you uninstall?</div>

            {submitted ? (
              <div className="thank-you">
                <p style={{ fontWeight: 600, fontSize: 14.5, color: "#0a6160", marginBottom: 6 }}>
                  Thanks for the feedback
                </p>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.6 }}>
                  We read every response. If you change your mind, you can
                  always reinstall — it&apos;s free.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  {REASONS.map((reason) => (
                    <label
                      key={reason}
                      className="radio-option"
                      onClick={() => setSelected(reason)}
                    >
                      <input type="radio" name="reason" value={reason} />
                      <div
                        className={`radio-circle${selected === reason ? " checked" : ""}`}
                      >
                        {selected === reason && <div className="radio-dot" />}
                      </div>
                      <span className="radio-label">{reason}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#999",
                      marginBottom: 6,
                    }}
                  >
                    Anything else? (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us more..."
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Feedback
                </button>
              </form>
            )}
          </div>

          {/* Right: what it can do + secondary reinstall */}
          <div style={{ paddingTop: 8 }}>
            <div className="section-label">What it can do</div>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Stream Saver is the only extension that actually downloads HLS
              streams — it fetches every segment, handles AES-128 encryption,
              and saves a playable MP4 file.
            </p>
            <ul
              style={{
                listStyle: "none",
                marginBottom: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                "Real HLS segment download — not just the playlist",
                "Instagram, Vimeo, Twitter/X, Facebook, Rumble",
                "Encrypted stream (AES-128) support",
                "5 free downloads/day — no account needed",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 9,
                    fontSize: 13.5,
                    color: "#444",
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      flexShrink: 0,
                      color: "#0E7C7B",
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn-outline"
            >
              <Download style={{ width: 14, height: 14 }} />
              Reinstall Stream Saver
            </a>
            <p style={{ marginTop: 10, fontSize: 12, color: "#aaa" }}>
              Free to install. No account required.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <Link href="/">calc-tech.com</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/extensions/streamsaver">Stream Saver</Link>
        </footer>
      </div>
    </div>
  );
}
