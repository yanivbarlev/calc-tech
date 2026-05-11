"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Shield,
  Sparkles,
  Copy,
} from "lucide-react";

// Google Ads conversion: WAExportPro Purchase
const GADS_ID = "AW-1006081641";
const PURCHASE_CONVERSION_LABEL = "AH84CPblnIccEOms3t8D";

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
    q: "Where do I find my license key?",
    a: "Gumroad emails your license key to the address you used at checkout. Check your inbox (and spam folder) for the email titled “Your purchase from Yaniv Goldbar.” You can also find the key on your Gumroad library page.",
  },
  {
    q: "Where do I enter my license key?",
    a: "Open WhatsApp Web, click the WAExportPro icon to open the side panel, then click the “Enter License” banner. Paste your license key and click Activate.",
  },
  {
    q: "Can I use my license on multiple computers?",
    a: "Yes. One license key activates WAExportPro PRO on up to 3 of your own computers. If you need more, contact support.",
  },
  {
    q: "Is the upgrade a subscription?",
    a: "No. WAExportPro PRO is a one-time $4.99 payment. No subscription, no renewals, no auto-charges.",
  },
  {
    q: "How do I get a refund?",
    a: "We offer a 30-day no-questions-asked refund. Reply to your Gumroad receipt email or contact support and we will process it.",
  },
];

function ThankYouContent() {
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
          gtag('event', 'conversion', {
            'send_to': '${GADS_ID}/${PURCHASE_CONVERSION_LABEL}',
            'value': 4.99,
            'currency': 'USD',
            'transaction_id': '${orderId.replace(/'/g, "")}'
          });
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
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Thank you for upgrading!
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Your WAExportPro PRO license is ready. All PRO features are now
              unlocked for life.
            </p>
          </div>
        </section>

        {/* License key card — Gumroad delivers keys by email */}
        <section className="pb-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white border-2 border-green-500 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold tracking-wide uppercase text-slate-400 mb-3">
                Your license key
              </p>
              {licenseKey ? (
                <div className="flex items-center gap-3">
                  <code className="flex-1 break-all bg-slate-100 text-slate-900 font-mono text-sm md:text-base px-3 py-3 rounded-lg">
                    {licenseKey}
                  </code>
                  <button
                    onClick={onCopy}
                    className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-slate-700">
                  📩 <strong>Check your email</strong> — Gumroad just sent your
                  license key to{" "}
                  <strong>{customerEmail || "the address you used at checkout"}</strong>.
                  Look for an email titled <em>“Your purchase from Yaniv Goldbar.”</em>{" "}
                  If you don&apos;t see it, check your spam folder.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Activation steps */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              Activate in 3 steps
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              Unlock unlimited exports in under a minute
            </h2>

            {/* Step 1 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Open WAExportPro
              </h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Open{" "}
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-medium"
                >
                  web.whatsapp.com
                </a>{" "}
                in Chrome, then click the puzzle-piece icon in the toolbar and
                choose <strong>WAExportPro</strong>. The side panel opens on the
                right.
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

            {/* Step 2 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={2} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Click “Enter License”
              </h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                At the top of the WAExportPro side panel, click the upgrade
                banner or <strong>“Enter License”</strong> button to open the
                activation modal.
              </p>
            </div>

            {/* Step 3 */}
            <div className="py-12 text-center">
              <StepNumber n={3} />
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Paste your license key
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Paste the key from above into the input field and click{" "}
                <strong>Activate</strong>. All PRO features unlock instantly —
                no restart required.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {["HTML", "CSV", "Media"].map((fmt) => (
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

        {/* What you unlocked */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-[.12em] uppercase text-slate-400 text-center mb-3">
              What you unlocked
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Every PRO feature, for life
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Unlimited message exports — no 100-message cap",
                "HTML, CSV, and TXT formats",
                "Export photos, videos, and audio attachments",
                "Export contacts and group participants",
                "Dark theme for HTML exports",
                "Bulk export multiple chats at once",
                "All future PRO features included",
                "Activate on up to 3 of your own computers",
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

        {/* FAQ */}
        <section className="py-16 bg-white">
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
              Ready to export?
            </h2>
            <p className="text-slate-400 mb-8">
              Open WhatsApp Web, activate your key, and start exporting without
              limits.
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
              <span>Lifetime license</span>
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

export default function WhatsAppChatExportThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <p className="text-slate-500">Loading…</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
