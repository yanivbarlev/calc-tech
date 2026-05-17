"use client";

import { useEffect, useState } from "react";
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
  Sparkles,
  Zap,
} from "lucide-react";

// Gumroad checkout URL for AI Chat Summarizer PRO
const PRO_CHECKOUT_URL = "https://goldbaryaniv.gumroad.com/l/laksy";

// Google Ads conversion: shared WAExportPro / Calc-Tech account
const GADS_ID = "AW-1006081641";
const INSTALL_CONVERSION_LABEL = "9_OQCPjxmoccEOms3t8D";

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
    <div className="w-16 h-16 rounded-full border-[3px] border-green-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-green-600">{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "Is my chat data private?",
    a: "Yes. Messages are sent to the AI provider for summarization only and are never stored. License keys and settings live in your browser's local storage — nothing else leaves your device.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. One-click cancel via your Gumroad account. No questions asked.",
  },
  {
    q: "Does it work on WhatsApp mobile?",
    a: "No. This is a Chrome extension for web.whatsapp.com only. It does not work with the WhatsApp mobile app.",
  },
];

export default function WhatsAppAiSummarizerWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fireConversion, setFireConversion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("reason") === "install") {
        setFireConversion(true);
      }
    }
  }, []);

  return (
    <>
      {/* Google Ads global site tag — always load */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GADS_ID}');
        `}
      </Script>

      {/* Fire install conversion only when ?reason=install */}
      {fireConversion && (
        <Script id="gads-conversion" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'conversion', {'send_to': '${GADS_ID}/${INSTALL_CONVERSION_LABEL}'});
          `}
        </Script>
      )}

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Calc-Tech
              </span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-10 text-center bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Thanks for installing AI Chat Summarizer for WhatsApp!
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              You&apos;re 30 seconds away from your first summary.
            </p>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Open WhatsApp Web
            </a>
            <p className="text-sm text-slate-400 mt-3">
              web.whatsapp.com — works right in your browser
            </p>
          </div>
        </section>

        {/* Pin instructions */}
        <section className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 mb-3">
              First: pin the extension
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Keep it one click away
            </h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Click the puzzle-piece icon in the Chrome toolbar, find{" "}
              <strong>AI Chat Summarizer</strong>, and click the pin icon so it
              stays visible.
            </p>
            <div className="inline-block rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
              <NextImage
                src="/shared/chrome-puzzle-icon.png"
                alt="Chrome toolbar puzzle-piece icon — click to access extensions"
                width={400}
                height={60}
                className="block"
              />
            </div>
          </div>
        </section>

        {/* How to summarize — 3 steps */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Getting started
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              How to summarize your first chat
            </h2>

            {/* Step 1 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Open WhatsApp Web and pick any chat
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Go to{" "}
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-medium"
                >
                  web.whatsapp.com
                </a>{" "}
                in Chrome, sign in, and open any chat you want to summarize.
              </p>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open web.whatsapp.com
              </a>
            </div>

            {/* Step 2 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={2} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Click the sparkle button
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Look for the{" "}
                <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                  <Sparkles className="w-4 h-4" /> sparkle
                </span>{" "}
                button at the right end of the message box — next to the
                microphone icon. Click it to start the summary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="py-12 text-center">
              <StepNumber n={3} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Get your instant summary
              </h3>
              <p className="text-slate-500 max-w-lg mx-auto">
                In seconds you&apos;ll see a TL;DR, key topics, action items,
                decisions, and a ready-to-send reply — all generated from your
                actual chat history.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-sm sm:max-w-none mx-auto">
                {["TL;DR", "Topics", "Actions", "Reply"].map((label) => (
                  <div
                    key={label}
                    className="bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-center"
                  >
                    <span className="font-bold text-green-700 text-sm">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Premium upsell */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="border-2 border-green-500 rounded-2xl p-8 text-center bg-green-50">
              <div className="inline-flex p-3 bg-green-100 rounded-xl mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Want more? Try Premium for $4.99/mo
              </h2>
              <p className="text-slate-500 mb-6 text-sm">
                The free plan covers 5 summaries per day. Premium removes all
                limits.
              </p>
              <ul className="text-left space-y-2 mb-8 max-w-xs mx-auto">
                {[
                  "Unlimited summaries",
                  "Premium AI (Llama 4 Maverick) on the first 10/day",
                  "Full chat history — no message cap",
                  "No daily or monthly cap",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-slate-700 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={PRO_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Upgrade to Premium — $4.99/mo
              </a>
              <p className="text-xs text-slate-400 mt-3">
                Secure checkout via Gumroad &middot; Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              FAQ
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
              Ready to summarize?
            </h2>
            <p className="text-slate-400 mb-8">
              Open WhatsApp Web, pick a chat, and hit the sparkle button.
            </p>
            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Open WhatsApp Web
            </a>
            <p className="text-sm text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>Free to start</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Private by design
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
                Terms of Use
              </Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
