"use client";

import { useState } from "react";
import Link from "next/link";
import { Volume2 } from "lucide-react";

const CWS_URL =
  "https://chromewebstore.google.com/detail/volume-booster-equalizer-pro/placeholder";

const REASONS = [
  "Too few features",
  "It did not work on my site",
  "I found a better alternative",
  "It caused audio issues",
  "I only needed it temporarily",
  "Other",
];

export default function VolumeBoosterUninstallPage() {
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
        .logo-dot { width: 24px; height: 24px; background: #7c3aed; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 20px; }
        .radio-option { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: background .12s; margin-bottom: 4px; }
        .radio-option:hover { background: #fafafa; }
        .radio-option input[type=radio] { display: none; }
        .radio-circle { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #e0e0e0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color .15s; }
        .radio-circle.checked { border-color: #7c3aed; }
        .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #7c3aed; }
        .radio-label { font-size: 14px; color: #222; cursor: pointer; }
        textarea { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 12px 14px; font-family: inherit; font-size: 13.5px; color: #333; resize: vertical; outline: none; transition: border-color .15s; background: #fff; }
        textarea:focus { border-color: #7c3aed; }
        .submit-btn { background: #7c3aed; color: #fff; border: none; border-radius: 8px; padding: 11px 28px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s; }
        .submit-btn:hover { background: #6d28d9; }
        .reinstall-btn { display: inline-flex; align-items: center; gap: 10px; background: #7c3aed; color: #fff; border: none; border-radius: 10px; padding: 14px 32px; font-family: inherit; font-size: 16px; font-weight: 700; text-decoration: none; transition: background .15s, transform .15s; box-shadow: 0 4px 14px rgba(124,58,237,.35); }
        .reinstall-btn:hover { background: #6d28d9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,58,237,.45); }
        .reinstall-btn-outline { display: inline-flex; align-items: center; gap: 8px; color: #7c3aed; border: 2px solid #7c3aed; border-radius: 8px; padding: 10px 24px; font-family: inherit; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .15s, color .15s; margin-top: 12px; }
        .reinstall-btn-outline:hover { background: #7c3aed; color: #fff; }
        .thank-you { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 10px; padding: 20px 24px; }
        footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #efefef; display: flex; gap: 20px; }
        footer a { font-size: 11px; color: #999; text-decoration: none; }
        footer a:hover { color: #7c3aed; }
      `}</style>

      <div className="page">
        {/* Header */}
        <header>
          <Link href="/" className="logo">
            <div className="logo-dot">
              <svg viewBox="0 0 24 24" fill="#fff" width="13" height="13">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            </div>
            Volume Booster + EQ Pro
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
            You&apos;ve uninstalled Volume Booster
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            We&apos;re sorry to see you go. Would you take 30 seconds to tell us why?
            It helps us build a better extension.
          </p>
        </section>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,380px)",
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
                    color: "#7c3aed",
                    marginBottom: 6,
                  }}
                >
                  Thanks for the feedback
                </p>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.6 }}>
                  We read every response. If you change your mind, you can
                  always reinstall — it&apos;s free and takes 10 seconds.
                </p>
                <div style={{ marginTop: 16 }}>
                  <a
                    href={CWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reinstall-btn-outline"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                    Reinstall Volume Booster
                  </a>
                </div>
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
                    placeholder="Tell us what we could do better..."
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

          {/* Right: reinstall CTA — most important element */}
          <div style={{ paddingTop: 8 }}>
            <div className="section-label">Changed your mind?</div>

            <p
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.3,
                marginBottom: 12,
                letterSpacing: "-0.3px",
              }}
            >
              Reinstall takes 10 seconds
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Volume Booster + Equalizer Pro is free to install. Boost YouTube,
              Netflix, Zoom, and any other tab beyond your system&apos;s volume limit.
              No account required.
            </p>

            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reinstall-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              Reinstall for Free
            </a>

            <div
              style={{
                marginTop: 20,
                padding: "14px 16px",
                background: "#f5f3ff",
                border: "1px solid #ddd6fe",
                borderRadius: 10,
              }}
            >
              <p style={{ fontSize: 12, color: "#7c3aed", fontWeight: 700, marginBottom: 8, letterSpacing: ".06em", textTransform: "uppercase" }}>
                What you had
              </p>
              {[
                "Boost any tab beyond 100% system volume",
                "Bass Boost and Voice Clarity presets",
                "Works on YouTube, Netflix, Zoom, and more",
                "Zero data sent — 100% private",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                  <svg viewBox="0 0 24 24" fill="#7c3aed" width="14" height="14" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span style={{ fontSize: 13, color: "#444", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 14, fontSize: 12, color: "#aaa" }}>
              Free to install. No account required. PRO from $4.99 (one-time).
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <Link href="/">calc-tech.com</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/extensions/volume-booster-equalizer-pro">Extension Page</Link>
        </footer>
      </div>
    </div>
  );
}
