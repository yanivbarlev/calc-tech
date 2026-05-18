"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Download,
  ExternalLink,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// TODO: Google Ads conversion — add conversion ID + label here once the campaign is set up.
// Pattern (fire only when ?reason=install is present in the URL):
//
// import Script from "next/script";
// const GADS_ID = "AW-XXXXXXXXXX";
// const INSTALL_CONVERSION_LABEL = "XXXXXXXXXXXXXXXXXX";
//
// Then inside the component, read `params.get("reason")` via useSearchParams(),
// and render <Script> tags conditionally when reason === "install".

const CWS_URL = "https://chromewebstore.google.com/detail/stream-saver";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        border: "1px solid #efefef",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff",
        marginBottom: 8,
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "#111", paddingRight: 12 }}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp style={{ width: 16, height: 16, color: "#aaa", flexShrink: 0 }} />
        ) : (
          <ChevronDown style={{ width: 16, height: 16, color: "#aaa", flexShrink: 0 }} />
        )}
      </div>
      {isOpen && (
        <div
          style={{
            padding: "0 20px 16px",
            fontSize: 13.5,
            color: "#555",
            lineHeight: 1.7,
            borderTop: "1px solid #f5f5f5",
            paddingTop: 12,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "3px solid #0E7C7B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 700, color: "#0E7C7B" }}>{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "Is Stream Saver free?",
    a: "Yes. The free tier lets you download up to 5 videos per day. PRO ($4.99 one-time) removes the limit entirely — no subscription.",
  },
  {
    q: "Why does it need access to all websites?",
    a: "To detect streams on any site, the extension must be able to observe network responses as they happen. This permission is required for the universal sniffer to work. No data is collected or transmitted anywhere.",
  },
  {
    q: "What sites does it work on?",
    a: "Any site with an HLS stream (.m3u8) or direct MP4. Plus site-specific scrapers for Instagram, Vimeo, Twitter/X, Facebook, and Rumble that find the real URL even when sites hide it.",
  },
  {
    q: "Does it work on YouTube or Netflix?",
    a: "YouTube DASH support is on our roadmap. Netflix uses DRM (Widevine) which cannot be bypassed by any browser extension.",
  },
  {
    q: "How do I upgrade to PRO?",
    a: "Click the toolbar icon on any video page and click the upgrade banner. You'll be taken to the Gumroad checkout — $4.99 one-time. After purchase, paste your license key into the activation prompt.",
  },
];

export default function StreamSaverWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      style={{
        fontFamily:
          "'Inter', system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { max-width: 960px; margin: 0 auto; padding: 0 24px; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 10px; }
        .cta-btn { display: inline-flex; align-items: center; gap: 9px; background: #0E7C7B; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 9px; text-decoration: none; transition: background .15s, transform .12s; }
        .cta-btn:hover { background: #0a6160; transform: translateY(-1px); }
        header { padding: 22px 0; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-mark { width: 32px; height: 32px; background: #0E7C7B; border-radius: 7px; display: flex; align-items: center; justify-content: center; }
        .step-block { padding: 52px 0; text-align: center; border-bottom: 1px solid #f5f5f5; }
        .step-block:last-child { border-bottom: none; }
        .step-title { font-size: 19px; font-weight: 700; color: #111; margin-bottom: 10px; }
        .step-desc { font-size: 14px; color: #666; line-height: 1.7; max-width: 480px; margin: 0 auto; }
        .puzzle-wrap { display: inline-block; border-radius: 12px; overflow: hidden; border: 1px solid #e8e8e8; box-shadow: 0 2px 12px rgba(0,0,0,.06); margin-top: 20px; }
      `}</style>

      {/* Header */}
      <div className="page">
        <header>
          <a href="/extensions/streamsaver" className="logo">
            <div className="logo-mark">
              <Download style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#111", letterSpacing: "-.3px" }}>
              Stream Saver
            </span>
          </a>
          <Link
            href="/"
            style={{ fontSize: 12.5, color: "#aaa", textDecoration: "none" }}
          >
            calc-tech.com
          </Link>
        </header>
      </div>

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #e6f4f4 0%, #fff 100%)",
          padding: "64px 24px 52px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#0E7C7B",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 4px 20px rgba(14,124,123,.25)",
            }}
          >
            <Download style={{ width: 28, height: 28, color: "#fff" }} />
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Stream Saver is installed.{" "}
            <span style={{ color: "#0E7C7B" }}>Ready to download.</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 480,
              margin: "0 auto 32px",
            }}
          >
            Pin the extension, visit any video page, and click the toolbar icon
            to see detected streams.
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            <ExternalLink style={{ width: 16, height: 16 }} />
            Try it on Instagram
          </a>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "64px 0 0" }}>
        <div className="page">
          <div className="section-label" style={{ textAlign: "center" }}>
            Getting Started
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111",
              textAlign: "center",
              letterSpacing: "-.4px",
              marginBottom: 8,
            }}
          >
            5 steps to your first download
          </h2>
        </div>

        <div className="page" style={{ maxWidth: 600, marginTop: 0 }}>
          {/* Step 1 */}
          <div className="step-block">
            <StepNumber n={1} />
            <h3 className="step-title">
              Click the puzzle piece icon in Chrome&apos;s toolbar
            </h3>
            <p className="step-desc">
              It&apos;s at the top right of your browser, next to the address bar.
            </p>
            <div className="puzzle-wrap">
              <NextImage
                src="/shared/chrome-puzzle-icon.png"
                alt="Chrome toolbar showing the puzzle piece extensions icon circled in red"
                width={400}
                height={60}
                style={{ display: "block", width: "100%", maxWidth: 400, height: "auto" }}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-block">
            <StepNumber n={2} />
            <h3 className="step-title">
              Click <span style={{ color: "#0E7C7B" }}>Stream Saver</span> and pin it
            </h3>
            <p className="step-desc">
              Pinning keeps the icon always visible in your toolbar — one click
              to see detected streams.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-block">
            <StepNumber n={3} />
            <h3 className="step-title">Visit any video page</h3>
            <p className="step-desc">
              Go to Instagram, Vimeo, Twitter/X, a news site, or any site with a
              video. Stream Saver watches for HLS streams and MP4 URLs in the
              background.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-block">
            <StepNumber n={4} />
            <h3 className="step-title">Click the Stream Saver toolbar icon</h3>
            <p className="step-desc">
              The popup lists every detected stream on the current page — with
              resolution and format shown for each one.
            </p>
          </div>

          {/* Step 5 */}
          <div className="step-block">
            <StepNumber n={5} />
            <h3 className="step-title">Click Download</h3>
            <p className="step-desc">
              For HLS streams, Stream Saver fetches every segment, decrypts it if
              needed, and saves a playable MP4 to your Downloads folder. For
              direct MP4 links, the file downloads immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section
        style={{
          padding: "64px 0",
          background: "#fafafa",
          borderTop: "1px solid #efefef",
          borderBottom: "1px solid #efefef",
          marginTop: 24,
        }}
      >
        <div className="page">
          <div className="section-label">Why Stream Saver</div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.4px",
              marginBottom: 32,
            }}
          >
            The only extension that actually downloads HLS
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                title: "Real segment download",
                desc: "Fetches all .ts segments, decrypts AES-128 if present, muxes into a playable MP4.",
              },
              {
                title: "Per-site scrapers",
                desc: "Deep integrations for Instagram, Vimeo, Twitter/X, Facebook, Rumble and more.",
              },
              {
                title: "No data collection",
                desc: "Everything runs locally. No URLs, no video data, nothing ever sent to a server.",
              },
              {
                title: "5 free / day",
                desc: "5 downloads free each day. Upgrade to PRO ($4.99 once) for unlimited.",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid #efefef",
                  borderRadius: 10,
                  padding: "22px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0E7C7B",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 0" }}>
        <div className="page" style={{ maxWidth: 720 }}>
          <div className="section-label">FAQ</div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.4px",
              marginBottom: 28,
            }}
          >
            Common questions
          </h2>
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: "64px 24px",
          background: "#111",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-.5px",
            marginBottom: 12,
          }}
        >
          Ready to try it?
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#888",
            marginBottom: 28,
            maxWidth: 400,
            margin: "0 auto 28px",
          }}
        >
          Visit any page with a video and click the Stream Saver icon.
        </p>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn"
        >
          <ExternalLink style={{ width: 16, height: 16 }} />
          Open Instagram
        </a>
        <p
          style={{
            fontSize: 11.5,
            color: "#555",
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span>5 free downloads/day</span>
          <span>&bull;</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Shield style={{ width: 12, height: 12 }} />
            100% private
          </span>
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "28px 24px",
          borderTop: "1px solid #efefef",
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <a
          href="/extensions/streamsaver"
          style={{ fontSize: 12.5, color: "#aaa", textDecoration: "none" }}
        >
          Stream Saver
        </a>
        <div style={{ display: "flex", gap: 20 }}>
          <Link
            href="/privacy"
            style={{ fontSize: 12.5, color: "#aaa", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          <a
            href={CWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12.5, color: "#aaa", textDecoration: "none" }}
          >
            Chrome Web Store
          </a>
        </div>
        <span style={{ fontSize: 12.5, color: "#aaa" }}>
          &copy; {new Date().getFullYear()} Calc-Tech
        </span>
      </footer>
    </div>
  );
}
