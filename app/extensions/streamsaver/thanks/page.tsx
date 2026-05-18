"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import {
  Download,
  CheckCircle,
  Copy,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Google Ads purchase conversion
// TODO: Replace with the actual Stream Saver conversion ID + label once campaign is created.
// Pattern already wired — just swap the constants below.
const GADS_ID = "AW-XXXXXXXXXX"; // TODO: replace with real conversion ID
const PURCHASE_CONVERSION_LABEL = "XXXXXXXXXXXXXXXXXX"; // TODO: replace with real label
const GADS_READY = false; // flip to true once IDs above are real

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
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "3px solid #0E7C7B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 18px",
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700, color: "#0E7C7B" }}>{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "Where do I find my license key?",
    a: "Gumroad emails your license key to the address you used at checkout. Look for an email titled \"Your purchase from Yaniv Goldbar.\" Check spam if you don't see it.",
  },
  {
    q: "Where do I enter my license key?",
    a: "Open any video page in Chrome, click the Stream Saver toolbar icon, then click the upgrade banner. Paste your key and click Activate.",
  },
  {
    q: "Can I use my license on multiple computers?",
    a: "Yes. One license activates Stream Saver PRO on up to 3 of your own computers.",
  },
  {
    q: "Is this a subscription?",
    a: "No. Stream Saver PRO is a one-time $4.99 payment. No renewals, no auto-charges.",
  },
  {
    q: "How do I get a refund?",
    a: "30-day no-questions-asked refund. Reply to your Gumroad receipt email and we will process it.",
  },
];

function ThanksContent() {
  const params = useSearchParams();
  const licenseKey = params.get("license_key") || "";
  const orderId = params.get("order_id") || "";
  const customerEmail = params.get("customer_email") || "";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!licenseKey) return;
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // ignore
    }
  };

  return (
    <>
      {/* Google Ads conversion — only fires once purchase IDs are configured */}
      {GADS_READY && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gads-purchase-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GADS_ID}');
              gtag('event', 'conversion', {
                'send_to': '${GADS_ID}/${PURCHASE_CONVERSION_LABEL}',
                'value': 4.99,
                'currency': 'USD',
                'transaction_id': '${orderId.replace(/'/g, "")}'
              });
            `}
          </Script>
        </>
      )}

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
          .section-label { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #bbb; margin-bottom: 10px; text-align: center; }
          .cta-btn { display: inline-flex; align-items: center; gap: 9px; background: #0E7C7B; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 9px; text-decoration: none; transition: background .15s; }
          .cta-btn:hover { background: #0a6160; }
          header { padding: 22px 0; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; }
          .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
          .logo-mark { width: 32px; height: 32px; background: #0E7C7B; border-radius: 7px; display: flex; align-items: center; justify-content: center; }
          .step-block { padding: 48px 0; text-align: center; border-bottom: 1px solid #f5f5f5; }
          .step-block:last-child { border-bottom: none; }
          .step-title { font-size: 18px; font-weight: 700; color: #111; margin-bottom: 10px; }
          .step-desc { font-size: 14px; color: #666; line-height: 1.7; max-width: 460px; margin: 0 auto; }
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
              href="/extensions/streamsaver"
              style={{ fontSize: 12.5, color: "#aaa", textDecoration: "none" }}
            >
              ← Extension Page
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
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div
              style={{
                width: 72,
                height: 72,
                background: "#0E7C7B",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: "0 4px 24px rgba(14,124,123,.25)",
              }}
            >
              <CheckCircle style={{ width: 32, height: 32, color: "#fff" }} />
            </div>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 38px)",
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-1px",
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              Thank you for upgrading!
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#555",
                lineHeight: 1.7,
              }}
            >
              Your Stream Saver PRO license is ready. Unlimited downloads, for life.
            </p>
          </div>
        </section>

        {/* License key card */}
        <section style={{ padding: "40px 24px 0" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div
              style={{
                border: "2px solid #0E7C7B",
                borderRadius: 12,
                padding: "28px 28px 24px",
                background: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#bbb",
                  marginBottom: 12,
                }}
              >
                Your license key
              </p>
              {licenseKey ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <code
                    style={{
                      flex: 1,
                      wordBreak: "break-all",
                      background: "#f5f5f5",
                      color: "#111",
                      fontFamily: "monospace",
                      fontSize: 13.5,
                      padding: "12px 14px",
                      borderRadius: 8,
                    }}
                  >
                    {licenseKey}
                  </code>
                  <button
                    onClick={onCopy}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      background: "#0E7C7B",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 18px",
                      fontFamily: "inherit",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Copy style={{ width: 14, height: 14 }} />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    background: "#e6f4f4",
                    border: "1px solid #b3dede",
                    borderRadius: 8,
                    padding: "16px 18px",
                    fontSize: 13.5,
                    color: "#333",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Check your email</strong> — Gumroad sent your license key
                  to{" "}
                  <strong>{customerEmail || "the address you used at checkout"}</strong>.
                  Look for an email titled{" "}
                  <em>&ldquo;Your purchase from Yaniv Goldbar.&rdquo;</em> Check spam
                  if you don&apos;t see it.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Activation steps */}
        <section style={{ padding: "56px 0 0" }}>
          <div className="page">
            <div className="section-label">Activate in 3 steps</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                textAlign: "center",
                letterSpacing: "-.4px",
              }}
            >
              Unlock unlimited downloads in under a minute
            </h2>
          </div>

          <div className="page" style={{ maxWidth: 560, marginTop: 0 }}>
            {/* Step 1 */}
            <div className="step-block">
              <StepNumber n={1} />
              <h3 className="step-title">Open any video page</h3>
              <p className="step-desc">
                Go to Instagram, Vimeo, Twitter/X, or any other site with a
                video. Make sure Stream Saver is installed and pinned to your
                toolbar.
              </p>
              <div className="puzzle-wrap">
                <NextImage
                  src="/shared/chrome-puzzle-icon.png"
                  alt="Chrome toolbar puzzle-piece icon — click to access extensions"
                  width={400}
                  height={60}
                  style={{ display: "block", width: "100%", maxWidth: 400, height: "auto" }}
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-block">
              <StepNumber n={2} />
              <h3 className="step-title">Click the upgrade banner</h3>
              <p className="step-desc">
                Click the Stream Saver toolbar icon to open the popup. At the
                top, click the <strong>&ldquo;Enter License&rdquo;</strong> banner
                or upgrade prompt to open the activation input.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-block">
              <StepNumber n={3} />
              <h3 className="step-title">Paste your license key</h3>
              <p className="step-desc">
                Paste the key from above and click <strong>Activate</strong>.
                PRO unlocks instantly — no restart required.
              </p>
              <div
                style={{
                  marginTop: 20,
                  display: "inline-flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {["HLS streams", "Direct MP4", "All sites", "Unlimited"].map((label) => (
                  <span
                    key={label}
                    style={{
                      background: "#e6f4f4",
                      border: "1px solid #b3dede",
                      borderRadius: 6,
                      padding: "5px 12px",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#0a6160",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you unlocked */}
        <section
          style={{
            padding: "56px 0",
            background: "#fafafa",
            borderTop: "1px solid #efefef",
            borderBottom: "1px solid #efefef",
          }}
        >
          <div className="page" style={{ maxWidth: 720 }}>
            <div className="section-label">What you unlocked</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                textAlign: "center",
                letterSpacing: "-.4px",
                marginBottom: 28,
              }}
            >
              Every PRO feature, for life
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              {[
                "Unlimited downloads — no daily cap",
                "HLS streams: all segments fetched and merged",
                "AES-128 encrypted stream support",
                "Per-site scrapers: Instagram, Vimeo, Twitter, Facebook, Rumble",
                "All future PRO features included",
                "Activate on up to 3 of your own computers",
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <CheckCircle
                    style={{
                      width: 15,
                      height: 15,
                      color: "#0E7C7B",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span style={{ fontSize: 13.5, color: "#444" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "56px 0" }}>
          <div className="page" style={{ maxWidth: 680 }}>
            <div className="section-label">FAQ</div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                textAlign: "center",
                letterSpacing: "-.4px",
                marginBottom: 28,
              }}
            >
              Frequently asked questions
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

        {/* Final CTA */}
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
            Ready to download without limits?
          </h2>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>
            Visit any video page and click the Stream Saver icon.
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Try it on Instagram
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
            <span>Lifetime license</span>
            <span>&bull;</span>
            <span>No subscription</span>
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
    </>
  );
}

export default function StreamSaverThanksPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#aaa", fontSize: 14 }}>Loading…</p>
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
