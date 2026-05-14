"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Shield,
  Volume2,
  Star,
} from "lucide-react";

// Google Ads account shared across all calc-tech extensions.
// Replace PLACEHOLDER_READ_ALOUD_LABEL with the real conversion label
// once a "Read Aloud TTS — Install" conversion action is created in
// Google Ads → Tools → Conversions.
const GADS_ID = "AW-1006081641";
const INSTALL_CONVERSION_LABEL = "PLACEHOLDER_READ_ALOUD_LABEL";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

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
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between p-5">
        <span className="font-semibold text-slate-800 text-left pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </div>
      {isOpen && (
        <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-16 h-16 rounded-full border-[3px] border-blue-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-blue-600">{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "Does Read Aloud TTS work without the internet?",
    a: "Yes. The extension uses your browser's built-in Web Speech API, which runs entirely on your device. No internet connection is required after installation.",
  },
  {
    q: "Which languages are supported?",
    a: "40+ languages are supported, including English, Spanish, French, German, Portuguese, Hindi, Arabic, Japanese, Chinese, and more. Available voices depend on the languages installed in your operating system.",
  },
  {
    q: "How do I read just a specific part of a page?",
    a: "Select the text you want to hear with your mouse, then right-click and choose \"Read aloud\" from the context menu. Only the selected text will be read.",
  },
  {
    q: "What is the keyboard shortcut?",
    a: "Press Alt + R (Windows/Linux) or Option + R (Mac) to start or stop reading the current page. You can change this shortcut in Chrome's extension keyboard settings (chrome://extensions/shortcuts).",
  },
  {
    q: "Is it free?",
    a: "Yes, Read Aloud TTS is completely free with no ads, no signup, and no usage limits. All features — voice picker, speed control, sentence highlighting — are included.",
  },
  {
    q: "Does it send my content anywhere?",
    a: "No. All text-to-speech processing happens locally in your browser using the Web Speech API. Your content is never sent to any external server.",
  },
];

const CAPABILITIES = [
  "40+ languages",
  "Sentence highlighting",
  "Speed control 0.5×–2.5×",
  "Voice picker",
  "Right-click selection",
  "Keyboard shortcut Alt+R",
  "Works offline",
  "100% free, no signup",
];

function ReadAloudTtsWelcomeInner() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const conversionFired = useRef(false);

  function handleGtagLoaded() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GADS_ID);

    // Fire install conversion only on first install, not on updates.
    if (reason === "install" && !conversionFired.current) {
      conversionFired.current = true;
      window.gtag("event", "conversion", {
        send_to: `${GADS_ID}/${INSTALL_CONVERSION_LABEL}`,
        value: 1.0,
        currency: "USD",
      });
    }

    // GA4 welcome_view event for all page loads.
    window.gtag("event", "welcome_view", {
      extension: "read-aloud-tts",
      reason: reason ?? "unknown",
    });
  }

  // Scroll-fade animation for sections.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-in { opacity: 0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease; }
        .fade-in.visible { opacity: 1; transform: none; }
      `}</style>

      {/* Google Ads global site tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
        onLoad={handleGtagLoaded}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Calc-Tech
              </span>
            </Link>
            <span className="text-sm text-slate-500">Read Aloud TTS</span>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-12 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Volume2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Welcome! You&apos;re all set.
            </h1>
            <p className="text-xl text-slate-600 mb-2">
              Read Aloud TTS is now installed.
            </p>
            <p className="text-slate-500 mb-8">
              Read any webpage out loud — free, offline, 40+ languages.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Star className="w-5 h-5" />
              Leave a Review
            </a>
            <p className="text-sm text-slate-400 mt-3">
              Takes 30 seconds &mdash; helps others discover Read Aloud
            </p>
          </div>
        </section>

        {/* How to use — 3 steps */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Getting Started
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              Start listening in 3 steps
            </h2>

            {/* Step 1 — Pin the extension */}
            <div className="py-12 text-center border-b border-slate-100 fade-in">
              <StepNumber n={1} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Pin Read Aloud TTS to your toolbar
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Click the puzzle-piece icon in the Chrome toolbar, then click the
                pin icon next to <strong>Read Aloud TTS</strong> so it&apos;s
                always one click away.
              </p>
              <div className="inline-block rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
                <NextImage
                  src="/shared/chrome-puzzle-icon.png"
                  alt="Chrome toolbar puzzle-piece icon — click to access extensions and pin Read Aloud TTS"
                  width={400}
                  height={60}
                  className="block"
                />
              </div>
            </div>

            {/* Step 2 — Floating button or keyboard shortcut */}
            <div className="py-12 text-center border-b border-slate-100 fade-in">
              <StepNumber n={2} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Open any article and click the speaker button
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                A floating speaker button appears at the bottom-right of every
                page. Click it to start reading. Or press{" "}
                <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-sm font-mono font-semibold">
                  Alt + R
                </kbd>{" "}
                anywhere to toggle reading instantly.
              </p>
            </div>

            {/* Step 3 — Right-click selection */}
            <div className="py-12 text-center fade-in">
              <StepNumber n={3} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Select text and right-click to read just that part
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Highlight any text on the page, right-click, and choose{" "}
                <strong>&ldquo;Read aloud&rdquo;</strong> from the menu. Only
                your selection will be read — useful for quotes, paragraphs, or
                captions.
              </p>
            </div>
          </div>
        </section>

        {/* What&apos;s supported grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 fade-in">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              What&apos;s Supported
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Everything you need, nothing you don&apos;t
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3"
                >
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 fade-in">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Common Questions
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
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
        <section className="py-16 bg-slate-900 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start listening?
            </h2>
            <p className="text-slate-400 mb-8">
              Open any webpage and press the speaker button — or hit{" "}
              <kbd className="px-1.5 py-0.5 bg-slate-700 border border-slate-600 rounded text-sm font-mono">
                Alt + R
              </kbd>{" "}
              to begin.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/read-aloud-a-text-to-spee/hdhinadidafjejdhmfkjgnolgimiaplp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Leave a Review on the Chrome Web Store
            </a>
            <p className="text-sm text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>100% free</span>
              <span>&bull;</span>
              <span>No signup</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Works offline
              </span>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <Link href="/" className="text-slate-300 hover:text-white font-medium">
              Calc-Tech.com
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function ReadAloudTtsWelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ReadAloudTtsWelcomeInner />
    </Suspense>
  );
}
