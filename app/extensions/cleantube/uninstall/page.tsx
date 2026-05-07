"use client";

import { useState } from "react";
import Link from "next/link";

const REASONS = [
  "It didn't hide what I needed",
  "It broke something on YouTube",
  "I found a better extension",
  "I don't use YouTube anymore",
  "Just testing — I'll reinstall",
];

export default function CleanTubeUninstallPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      style={{
        fontFamily:
          "'Outfit', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
        background: "#ffffff",
        color: "#111",
        minHeight: "100vh",
        padding: "0 24px 80px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { max-width: 960px; margin: 0 auto; }
        header { padding: 28px 0 24px; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 9px; font-size: 16px; font-weight: 700; color: #111; letter-spacing: -.3px; text-decoration: none; }
        .logo-dot { width: 24px; height: 24px; background: #1a8c5f; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 20px; }
        .divider { display: flex; align-items: center; gap: 16px; margin: 40px 0; }
        .divider-line { flex: 1; height: 1px; background: #efefef; }
        .divider-text { font-size: 13px; color: #aaa; white-space: nowrap; }
        .radio-option { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: background .12s; margin-bottom: 4px; }
        .radio-option:hover { background: #fafafa; }
        .radio-option input[type=radio] { display: none; }
        .radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #e0e0e0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color .15s; }
        .radio-circle.checked { border-color: #1a8c5f; }
        .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #1a8c5f; }
        .radio-label { font-size: 14px; color: #222; cursor: pointer; }
        textarea { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 12px 14px; font-family: inherit; font-size: 13.5px; color: #333; resize: vertical; outline: none; transition: border-color .15s; background: #fff; }
        textarea:focus { border-color: #1a8c5f; }
        .submit-btn { background: #1a8c5f; color: #fff; border: none; border-radius: 8px; padding: 11px 28px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; }
        .submit-btn:hover { background: #126641; }
        .reinstall-btn { display: inline-flex; align-items: center; gap: 8px; color: #1a8c5f; border: 2px solid #1a8c5f; border-radius: 8px; padding: 11px 28px; font-family: inherit; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .15s, color .15s; }
        .reinstall-btn:hover { background: #1a8c5f; color: #fff; }
        .thank-you { background: #f0fdf8; border: 1px solid #d4f0e3; border-radius: 10px; padding: 20px 24px; }
        footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #efefef; display: flex; gap: 20px; }
        footer a { font-size: 11px; color: #999; text-decoration: none; }
        footer a:hover { color: #1a8c5f; }
      `}</style>

      <div className="page">
        {/* Header */}
        <header>
          <Link href="/" className="logo">
            <div className="logo-dot">
              <svg
                viewBox="0 0 24 24"
                fill="#fff"
                width="13"
                height="13"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            CleanTube
          </Link>
        </header>

        {/* Hero */}
        <section style={{ padding: "48px 0 16px" }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              color: "#111",
              marginBottom: 12,
            }}
          >
            You&apos;ve uninstalled CleanTube
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            We&apos;ll miss you. Would you take 30 seconds to tell us why? It
            helps us improve.
          </p>
        </section>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,420px)",
            gap: 60,
            marginTop: 40,
            alignItems: "start",
          }}
        >
          {/* Left: survey */}
          <div>
            <div className="section-label">Why did you uninstall?</div>

            {submitted ? (
              <div className="thank-you">
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#1a8c5f",
                    marginBottom: 6,
                  }}
                >
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
                        {selected === reason && (
                          <div className="radio-dot" />
                        )}
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

          {/* Right: reinstall CTA */}
          <div style={{ paddingTop: 8 }}>
            <div className="section-label">Changed your mind?</div>
            <p
              style={{
                fontSize: 15,
                color: "#555",
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              CleanTube is free, takes 10 seconds to reinstall, and all your
              settings are saved in Chrome sync — so you&apos;ll pick up right
              where you left off.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/cleantube"
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Reinstall CleanTube
            </a>
            <p
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "#aaa",
              }}
            >
              Free to install. No account required.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <Link href="/">calc-tech.com</Link>
          <Link href="/privacy">Privacy</Link>
        </footer>
      </div>
    </div>
  );
}
