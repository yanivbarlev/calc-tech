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
  MessageSquare,
  Download,
} from "lucide-react";

// Gumroad checkout URL for WAExportPro PRO
const PRO_CHECKOUT_URL = "https://goldbaryaniv.gumroad.com/l/fznkf";

// WAExportPro Chrome Web Store extension ID — used to bridge gclid into the extension.
const EXTENSION_ID = "pcbcfneocfimieifgogbkfodlkicemcl";

// Google Ads conversion: WAExportPro Install
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
    q: "How do I back up my WhatsApp Web chats?",
    a: "Open web.whatsapp.com, click the extension icon in the toolbar, choose the chats you want to back up, pick a format and date range, then click Download.",
  },
  {
    q: "How do I download WhatsApp messages as CSV?",
    a: "Click the extension icon, select a chat, choose CSV as the format, then click Download. The file is compatible with Excel and Google Sheets.",
  },
  {
    q: "Is it free?",
    a: "Up to 100 messages per chat and unlimited TXT exports are free. Unlimited messages, HTML/CSV, and media require a one-time $4.99 PRO license — no subscription.",
  },
  {
    q: "Do I need to install anything on my phone?",
    a: "No, the extension works only with WhatsApp Web (web.whatsapp.com) in Chrome. You don’t need to install anything on your phone.",
  },
  {
    q: "Is my data safe?",
    a: "Everything is processed locally in your browser. No messages, contacts, or personal data are ever sent anywhere. Your chats stay on your computer only.",
  },
];

export default function WhatsAppChatExportWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Bridge gclid from localStorage into the extension via externally_connectable.
  useEffect(() => {
    try {
      const gclid =
        typeof window !== "undefined"
          ? window.localStorage.getItem("_wa_gclid")
          : null;
      const w = window as unknown as { chrome?: { runtime?: { sendMessage?: (...args: unknown[]) => void } } };
      if (gclid && w.chrome?.runtime?.sendMessage) {
        w.chrome.runtime.sendMessage(
          EXTENSION_ID,
          { key: "bridge_gclid", gclid },
          () => {
            // ignore errors (extension may not be installed)
          },
        );
      }
    } catch (_) {
      // ignore
    }
  }, []);

  return (
    <>
      {/* Google Ads global site tag */}
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
          gtag('event', 'conversion', {'send_to': '${GADS_ID}/${INSTALL_CONVERSION_LABEL}'});
        `}
      </Script>

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
            <Link href="/extensions/whatsapp-chat-export">
              <span className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
                ← Extension Page
              </span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-10 text-center bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome!</h1>
            <p className="text-xl text-slate-600 mb-8">
              WAExportPro for WhatsApp Web is now installed.
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
              web.whatsapp.com — never leaves your browser
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Getting started
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              Export your chats in 3 steps
            </h2>

            {/* Step 1 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Open WhatsApp Web
              </h2>
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
                in Chrome and sign in to your account.
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
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Find the extension icon
              </h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Click the puzzle-piece icon in the Chrome toolbar and click{" "}
                <strong>&quot;WAExportPro&quot;</strong>. Pin the extension with the
                pin icon so it stays visible.
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

            {/* Step 3 */}
            <div className="py-12 text-center">
              <StepNumber n={3} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Export your chat
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                In the side panel, pick a chat, choose a format (TXT, HTML, CSV)
                and a date range, then click{" "}
                <strong>&quot;Download&quot;</strong>.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {["TXT", "HTML", "CSV"].map((fmt) => (
                  <div
                    key={fmt}
                    className="bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-center"
                  >
                    <span className="font-bold text-green-700 text-sm">{fmt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Features
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              What you can do
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Export chats as TXT, HTML, or CSV",
                "Filter messages by date range",
                "Export multiple chats at once",
                "Export contacts and group participants",
                "Include photos, videos, and audio (PRO)",
                "Dark theme for HTML exports",
                "Everything local — no data ever leaves your browser",
                "No subscription — one-time PRO license",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-slate-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO Upsell */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="border-2 border-green-500 rounded-2xl p-8 text-center bg-green-50">
              <div className="inline-flex p-3 bg-green-100 rounded-xl mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Upgrade to PRO
              </h2>
              <p className="text-slate-600 mb-6">
                Unlock unlimited exports, HTML/CSV, and media — one-time $4.99
                payment.
              </p>
              <ul className="text-left space-y-2 mb-8 max-w-xs mx-auto">
                {[
                  "Unlimited message exports",
                  "HTML, CSV, and media formats",
                  "Contact and group list exports",
                  "One-time payment — no subscription",
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
                Buy PRO License — $4.99
              </a>
              <p className="text-xs text-slate-400 mt-3">
                Secure checkout · Instant delivery
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
              Ready to get started?
            </h2>
            <p className="text-slate-400 mb-8">
              Open WhatsApp Web and start exporting your chats.
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
              <span>No subscription</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> 100% private
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
