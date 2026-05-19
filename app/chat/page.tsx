"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, MousePointer, Globe, UserX } from "lucide-react";

// TODO: Replace this placeholder with the real Chrome Web Store URL once the extension is published.
// File: app/chat/page.tsx  —  search for "CWS_URL" to find it quickly.
const CWS_URL =
  "https://chrome.google.com/webstore/detail/REPLACE_WITH_CWS_ID";

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
      className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer bg-white"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-semibold text-slate-800 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </div>
      {isOpen && (
        <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}

const FAQS = [
  {
    q: "Is it free?",
    a: "Yes. The free plan includes 5 chats per day — enough to get started. Upgrade to PRO ($4.99 one-time) for unlimited chats and priority matching. No subscription.",
  },
  {
    q: "Do you store my chats?",
    a: "No. Everything stays in your browser. Chats run directly on chatblink.com — we never see, store, or transmit your messages.",
  },
  {
    q: "Can I disable it on specific sites?",
    a: "Yes. Hover over the floating button and click × to mute it on that site for 24 hours. Or go to Options (right-click the extension icon) to manage your mute list or disable globally.",
  },
];

function InstallButton({ className }: { className?: string }) {
  return (
    <a
      href={CWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 " +
        (className ?? "")
      }
      style={{
        background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)",
      }}
    >
      {/* Chrome logo SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="white" />
        <path
          d="M12 8a4 4 0 0 1 3.464 2H21a9 9 0 1 0 0 4h-5.536A4 4 0 0 1 12 8z"
          fill="white"
          opacity="0.4"
        />
        <path
          d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 4a6 6 0 1 1 0 12A6 6 0 0 1 12 6z"
          fill="white"
          opacity="0"
        />
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" opacity="0.25" />
        <path d="M12 8h8.66a10 10 0 0 0-17.32 0H12z" fill="#EA4335" />
        <path d="M3.34 8L7.67 15.5a10 10 0 0 1-4.33-7.5z" fill="#34A853" />
        <path d="M12 16l4.33 7.5A10 10 0 0 1 3.67 16H12z" fill="#FBBC05" />
        <circle cx="12" cy="12" r="4" fill="white" />
      </svg>
      Add to Chrome — Free
    </a>
  );
}

/* ─── CSS Mockup: floating button + popup window ─── */
function ExtensionMockup() {
  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: "min(100%, 480px)", height: 340 }}
      aria-hidden="true"
    >
      {/* Fake browser chrome */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
        style={{ background: "#f8f9fa" }}
      >
        {/* Browser top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2 border-b border-slate-200"
          style={{ background: "#fff" }}
        >
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div
            className="flex-1 mx-3 rounded px-3 py-1 text-xs text-slate-400 border border-slate-200"
            style={{ background: "#f3f4f6", fontFamily: "monospace" }}
          >
            youtube.com
          </div>
        </div>
        {/* Fake page content lines */}
        <div className="p-5 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-5/6" />
          <div className="h-3 bg-slate-100 rounded w-2/3" />
          <div className="mt-3 h-24 bg-slate-200 rounded-lg w-full" />
        </div>
      </div>

      {/* Floating chat button — bottom-right of browser */}
      <div
        className="absolute z-10"
        style={{ bottom: 24, right: 20 }}
      >
        <div
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center cursor-pointer"
          style={{ background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.67 1.19 5.07 3.09 6.74L4 22l4.59-1.53C9.96 20.8 10.96 21 12 21c5.52 0 10-4.03 10-9S17.52 2 12 2z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Popup window — overlapping the browser, slightly raised */}
      <div
        className="absolute z-20 rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
        style={{
          width: 220,
          bottom: 10,
          right: -8,
          top: 16,
          background: "#fff",
        }}
      >
        {/* Popup header — gradient */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)" }}
        >
          <div className="flex items-center gap-2">
            {/* Avatar circle */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "rgba(255,255,255,0.25)" }}
            >
              ?
            </div>
            <div>
              <div className="text-white text-xs font-bold leading-tight">Random Stranger</div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                <span className="text-white text-[9px] opacity-80">Online · Anonymous chat</span>
              </div>
            </div>
          </div>
          {/* Next stranger pill */}
          <div
            className="text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/40"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            Next ›
          </div>
        </div>

        {/* Chat messages */}
        <div className="px-3 py-3 space-y-2 flex flex-col" style={{ background: "#f7f8fc" }}>
          {/* Stranger bubble */}
          <div className="flex justify-start">
            <div
              className="text-[11px] px-3 py-2 rounded-2xl rounded-tl-sm max-w-[75%] text-slate-800"
              style={{ background: "#e8e9f0" }}
            >
              hey! where are you from?
            </div>
          </div>
          {/* My bubble */}
          <div className="flex justify-end">
            <div
              className="text-[11px] px-3 py-2 rounded-2xl rounded-tr-sm max-w-[75%] text-white"
              style={{ background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)" }}
            >
              US! You?
            </div>
          </div>
          {/* Stranger bubble */}
          <div className="flex justify-start">
            <div
              className="text-[11px] px-3 py-2 rounded-2xl rounded-tl-sm max-w-[75%] text-slate-800"
              style={{ background: "#e8e9f0" }}
            >
              UK :) cool extension btw
            </div>
          </div>
        </div>

        {/* Composer */}
        <div
          className="px-3 py-2 flex items-center gap-2 border-t border-slate-100"
          style={{ background: "#fff" }}
        >
          <div
            className="flex-1 rounded-full px-3 py-1.5 text-[10px] text-slate-400 border border-slate-200"
            style={{ background: "#f3f4f6" }}
          >
            Type a message…
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)" }}
          >
            ›
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── HERO ── */}
      <section className="pt-12 pb-10 px-4" style={{ background: "linear-gradient(160deg, #eef0ff 0%, #fff 60%)" }}>
        <div className="max-w-4xl mx-auto">
          {/* Small label */}
          <p className="text-center mb-4" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#bbb" }}>
            Chrome Extension · Free
          </p>

          <h1
            className="text-center font-extrabold leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#111" }}
          >
            Chat with strangers.<br />
            <span style={{ background: "linear-gradient(135deg, #6e8efb 0%, #4a6cf7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              From any tab.
            </span>
          </h1>

          <p className="text-center text-slate-500 mb-8 max-w-lg mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
            One click opens a clean random-chat popup — no new tabs, no ads, no age gates. Same matching as chatblink.com, way less friction.
          </p>

          <div className="flex flex-col items-center gap-3 mb-10">
            <InstallButton />
            <span className="text-xs text-slate-400">Works in Chrome · 5 free chats/day · No sign-up</span>
          </div>

          {/* Visual mockup */}
          <ExtensionMockup />
        </div>
      </section>

      {/* ── MINI BENEFITS ── */}
      <section className="py-16 px-4" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-center mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#bbb" }}>
            Why it exists
          </p>
          <h2 className="text-center font-bold mb-12" style={{ fontSize: "1.6rem", color: "#111" }}>
            Stop context-switching just to chat
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-xl border p-6" style={{ borderColor: "#efefef" }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#eef0ff" }}
              >
                <MousePointer className="w-5 h-5" style={{ color: "#4a6cf7" }} />
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#111" }}>One click</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Click the floating button on any site — you&apos;re in a chat in under 3 seconds.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-xl border p-6" style={{ borderColor: "#efefef" }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#eef0ff" }}
              >
                <Globe className="w-5 h-5" style={{ color: "#4a6cf7" }} />
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#111" }}>Always there</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bored on YouTube? Stuck in a meeting? Chat is one click away — no tab switching.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-xl border p-6" style={{ borderColor: "#efefef" }}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#eef0ff" }}
              >
                <UserX className="w-5 h-5" style={{ color: "#4a6cf7" }} />
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#111" }}>Anonymous</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Same chatblink.com random matching, with a cleaner UI and no ads in your face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4" style={{ background: "#f9f9fb" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-center mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#bbb" }}>
            Questions
          </p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "1.6rem", color: "#111" }}>
            FAQ
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

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-4 text-center" style={{ background: "#fff" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-bold mb-3" style={{ fontSize: "1.6rem", color: "#111" }}>
            Ready to try it?
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            Free install, no account needed. You can uninstall any time from Chrome settings.
          </p>
          <InstallButton />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: "#efefef" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <Link href="/" className="font-semibold hover:text-slate-600 transition-colors" style={{ color: "#111" }}>
            Calc-Tech
          </Link>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-600 transition-colors">Contact</Link>
          </div>
          <span>© {new Date().getFullYear()} Calc-Tech. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
