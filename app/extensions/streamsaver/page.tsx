"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Shield,
  Zap,
  Globe,
  Film,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const CWS_URL =
  "https://chromewebstore.google.com/detail/stream-saver";

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
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#111",
            paddingRight: 16,
          }}
        >
          {question}
        </span>
        {isOpen ? (
          <ChevronUp style={{ width: 18, height: 18, color: "#aaa", flexShrink: 0 }} />
        ) : (
          <ChevronDown style={{ width: 18, height: 18, color: "#aaa", flexShrink: 0 }} />
        )}
      </div>
      {isOpen && (
        <div
          style={{
            padding: "0 22px 18px",
            fontSize: 14,
            color: "#555",
            lineHeight: 1.7,
            borderTop: "1px solid #f5f5f5",
            paddingTop: 14,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

const FEATURES = [
  {
    icon: Film,
    title: "Real HLS Download",
    desc: "Actually fetches and merges all stream segments into a playable MP4. Other extensions just save the playlist text file and call it done.",
    color: "#0E7C7B",
    bg: "#e6f4f4",
  },
  {
    icon: Globe,
    title: "Per-Site Scrapers",
    desc: "Deep integrations for Instagram, Vimeo, Twitter/X, Facebook, Rumble and more — finds the real MP4 URL even when sites hide it.",
    color: "#0E7C7B",
    bg: "#e6f4f4",
  },
  {
    icon: Zap,
    title: "One-Click MP4",
    desc: "Click Download in the popup and the file lands in your Downloads folder. No extra apps, no command line, no format juggling.",
    color: "#F25C54",
    bg: "#fef0ef",
  },
  {
    icon: Shield,
    title: "Private By Design",
    desc: "Stream detection runs entirely in your browser. No video data, no URLs, and no personal information ever leave your machine.",
    color: "#F25C54",
    bg: "#fef0ef",
  },
];

const FAQS = [
  {
    q: "What is Stream Saver?",
    a: "Stream Saver is a Chrome extension that detects video streams (HLS/M3U8 and direct MP4) on any web page and downloads them as playable MP4 files. It includes site-specific scrapers for Instagram, Vimeo, Twitter/X, Facebook, and Rumble.",
  },
  {
    q: "What makes it different from other video downloaders?",
    a: "Most extensions that claim HLS support just save the .m3u8 playlist text file — which is unplayable. Stream Saver actually fetches every segment, decrypts AES-128 encryption if needed, and muxes everything into a real MP4 file.",
  },
  {
    q: "Is it free?",
    a: "The free tier lets you download up to 5 videos per day. PRO ($4.99 one-time, no subscription) removes the daily limit.",
  },
  {
    q: "Does it work on YouTube or Netflix?",
    a: "YouTube uses DASH with split audio/video tracks — that format is on our roadmap but not in v1. Netflix and other DRM-protected platforms are technically impossible to download from any extension.",
  },
  {
    q: "Does it collect my browsing data?",
    a: "No. All stream detection happens locally in your browser. The extension only reads video-related network responses on pages you visit. Nothing is sent to any server.",
  },
  {
    q: "How do I activate my PRO license?",
    a: "After purchasing, Gumroad emails your license key. Open any video page, click the Stream Saver toolbar icon, then click the upgrade banner, paste your key, and hit Activate.",
  },
  {
    q: "What's the refund policy?",
    a: "30-day no-questions-asked refund. Reply to your Gumroad receipt email and we will process it.",
  },
];

export default function StreamSaverLandingPage() {
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
        .page { max-width: 1020px; margin: 0 auto; padding: 0 24px; }
        .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 10px; }
        .cta-primary { display: inline-flex; align-items: center; gap: 9px; background: #0E7C7B; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 9px; text-decoration: none; transition: background .15s, transform .12s; }
        .cta-primary:hover { background: #0a6160; transform: translateY(-1px); }
        .cta-secondary { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: #0E7C7B; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 9px; border: 2px solid #0E7C7B; text-decoration: none; transition: background .15s, color .15s; }
        .cta-secondary:hover { background: #0E7C7B; color: #fff; }
        header { padding: 22px 0; border-bottom: 1px solid #efefef; }
        .header-inner { display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-mark { width: 34px; height: 34px; background: #0E7C7B; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo-name { font-size: 16px; font-weight: 700; color: #111; letter-spacing: -.3px; }
        nav { display: flex; align-items: center; gap: 24px; }
        nav a { font-size: 13.5px; color: #555; text-decoration: none; font-weight: 500; }
        nav a:hover { color: #0E7C7B; }
        .hero { padding: 80px 0 64px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: #e6f4f4; color: #0a6160; font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 20px; margin-bottom: 24px; }
        .hero-headline { font-size: clamp(34px, 5vw, 54px); font-weight: 800; line-height: 1.13; letter-spacing: -1px; color: #111; margin-bottom: 20px; max-width: 700px; }
        .hero-sub { font-size: 17px; color: #555; line-height: 1.7; max-width: 520px; margin-bottom: 36px; }
        .hero-ctas { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .social-proof { margin-top: 28px; font-size: 12.5px; color: #aaa; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .social-proof strong { color: #555; }
        .steps-section { padding: 72px 0; background: #fafafa; border-top: 1px solid #efefef; border-bottom: 1px solid #efefef; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; margin-top: 40px; }
        .step-card { background: #fff; border: 1px solid #efefef; border-radius: 12px; padding: 28px 24px; }
        .step-num { width: 36px; height: 36px; background: #0E7C7B; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 15px; margin-bottom: 16px; }
        .step-title { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 8px; }
        .step-desc { font-size: 13.5px; color: #666; line-height: 1.6; }
        .features-section { padding: 80px 0; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 40px; }
        .feature-card { background: #fff; border: 1px solid #efefef; border-radius: 12px; padding: 26px 24px; }
        .feature-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .feature-title { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 8px; }
        .feature-desc { font-size: 13.5px; color: #666; line-height: 1.6; }
        .pricing-section { padding: 80px 0; background: #fafafa; border-top: 1px solid #efefef; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; max-width: 680px; }
        .pricing-card { background: #fff; border: 1px solid #efefef; border-radius: 12px; padding: 32px 28px; }
        .pricing-card.pro { border-color: #0E7C7B; border-width: 2px; }
        .pricing-badge { display: inline-block; background: #0E7C7B; color: #fff; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; margin-bottom: 14px; }
        .pricing-tier { font-size: 20px; font-weight: 800; color: #111; margin-bottom: 6px; }
        .pricing-price { font-size: 32px; font-weight: 800; color: #111; margin-bottom: 4px; }
        .pricing-price span { font-size: 14px; font-weight: 400; color: #888; }
        .pricing-sub { font-size: 12.5px; color: #888; margin-bottom: 24px; }
        .pricing-features { list-style: none; margin-bottom: 28px; display: flex; flex-direction: column; gap: 10px; }
        .pricing-feature { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: #444; }
        .check { color: #0E7C7B; flex-shrink: 0; margin-top: 1px; }
        .cross { color: #ccc; flex-shrink: 0; margin-top: 1px; }
        .faq-section { padding: 80px 0; }
        .faq-list { display: flex; flex-direction: column; gap: 8px; margin-top: 40px; max-width: 740px; }
        .final-cta { padding: 80px 0; background: #111; }
        .final-cta-inner { text-align: center; }
        footer { padding: 36px 0; border-top: 1px solid #efefef; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 12.5px; color: #aaa; }
        footer a { color: #aaa; text-decoration: none; }
        footer a:hover { color: #0E7C7B; }
        @media (max-width: 600px) {
          .header-inner nav { display: none; }
          .pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="page">
          <div className="header-inner">
            <a href="/extensions/streamsaver" className="logo">
              <div className="logo-mark">
                <Download style={{ width: 18, height: 18, color: "#fff" }} />
              </div>
              <span className="logo-name">Stream Saver</span>
            </a>
            <nav>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
                style={{ padding: "9px 18px", fontSize: 13 }}
              >
                Install Free
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="page">
          <div className="hero-eyebrow">
            <Zap style={{ width: 13, height: 13 }} />
            Real HLS download — not just a playlist save
          </div>
          <h1 className="hero-headline">
            Download any video<br />from any site
          </h1>
          <p className="hero-sub">
            Stream Saver detects HLS streams and direct MP4 links on any page,
            then downloads them as playable MP4 files — segments fetched,
            decrypted, and merged automatically.
          </p>
          <div className="hero-ctas">
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              <Download style={{ width: 17, height: 17 }} />
              Install from Chrome Web Store
            </a>
            <a href="#features" className="cta-secondary">
              See how it works
            </a>
          </div>
          <div className="social-proof">
            <span><strong>Free</strong> — 5 downloads/day</span>
            <span>&bull;</span>
            <span><strong>PRO</strong> — unlimited, $4.99 one-time</span>
            <span>&bull;</span>
            <span>No subscription</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="steps-section">
        <div className="page">
          <div className="section-label">How it works</div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.5px",
            }}
          >
            Four steps, one playable MP4
          </h2>
          <div className="steps-grid">
            {[
              {
                n: 1,
                title: "Install the extension",
                desc: "Add Stream Saver from the Chrome Web Store. Takes about 10 seconds.",
              },
              {
                n: 2,
                title: "Visit any video page",
                desc: "Go to Instagram, Vimeo, Twitter/X, a news site — anywhere with a video.",
              },
              {
                n: 3,
                title: "Click the toolbar icon",
                desc: "Stream Saver automatically lists all detected streams. Pick the one you want.",
              },
              {
                n: 4,
                title: "Hit Download",
                desc: "Your browser downloads a proper MP4 file. No extra apps needed.",
              },
            ].map((s) => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="page">
          <div className="section-label">Features</div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.5px",
            }}
          >
            Built to actually work
          </h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div
                  className="feature-icon"
                  style={{ background: f.bg }}
                >
                  <f.icon style={{ width: 20, height: 20, color: f.color }} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <div className="page">
          <div className="section-label">Pricing</div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.5px",
            }}
          >
            Free to start. PRO when you need more.
          </h2>
          <div className="pricing-grid">
            {/* Free */}
            <div className="pricing-card">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">
                $0 <span>forever</span>
              </div>
              <div className="pricing-sub">No credit card required</div>
              <ul className="pricing-features">
                {[
                  ["5 downloads per day", true],
                  ["HLS + MP4 streams", true],
                  ["All supported sites", true],
                  ["Unlimited downloads", false],
                ].map(([label, ok]) => (
                  <li key={label as string} className="pricing-feature">
                    {ok ? (
                      <CheckCircle
                        className="check"
                        style={{ width: 16, height: 16 }}
                      />
                    ) : (
                      <span
                        className="cross"
                        style={{
                          width: 16,
                          height: 16,
                          display: "inline-block",
                          textAlign: "center",
                          lineHeight: "16px",
                          fontSize: 14,
                        }}
                      >
                        ×
                      </span>
                    )}
                    {label}
                  </li>
                ))}
              </ul>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Install Free
              </a>
            </div>

            {/* PRO */}
            <div className="pricing-card pro">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-tier">PRO</div>
              <div className="pricing-price">
                $4.99 <span>one-time</span>
              </div>
              <div className="pricing-sub">No subscription, no renewals</div>
              <ul className="pricing-features">
                {[
                  "Unlimited downloads",
                  "HLS + MP4 streams",
                  "All supported sites",
                  "All future PRO features",
                ].map((label) => (
                  <li key={label} className="pricing-feature">
                    <CheckCircle
                      className="check"
                      style={{ width: 16, height: 16 }}
                    />
                    {label}
                  </li>
                ))}
              </ul>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Get PRO — $4.99
              </a>
              <p
                style={{
                  fontSize: 11.5,
                  color: "#aaa",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Secured by Gumroad &bull; 30-day refund
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="page">
          <div className="section-label">FAQ</div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-.5px",
            }}
          >
            Common questions
          </h2>
          <div className="faq-list">
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="page">
          <div className="final-cta-inner">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#555",
                marginBottom: 16,
              }}
            >
              Ready?
            </p>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-.5px",
                marginBottom: 14,
              }}
            >
              Start saving streams for free
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#888",
                marginBottom: 32,
                maxWidth: 460,
                margin: "0 auto 32px",
              }}
            >
              Install in 10 seconds. 5 free downloads per day. Upgrade to PRO
              any time.
            </p>
            <a
              href={CWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              <Download style={{ width: 17, height: 17 }} />
              Install from Chrome Web Store
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="page">
          <div className="footer-inner">
            <a href="/extensions/streamsaver" style={{ fontWeight: 600, color: "#111" }}>
              Stream Saver
            </a>
            <div style={{ display: "flex", gap: 20 }}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome Web Store
              </a>
            </div>
            <span>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
