"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Shield,
  Volume2,
  Sliders,
  Copy,
  Mail,
  Sparkles,
} from "lucide-react";

// Google Ads — Volume Booster Purchase conversion
const GADS_ID = "AW-1006081641";
const PURCHASE_CONVERSION_LABEL = "volume_booster_purchase"; // placeholder — replace with real label

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
    <div className="w-16 h-16 rounded-full border-[3px] border-violet-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-violet-600">{n}</span>
    </div>
  );
}

const FAQS = [
  {
    q: "Where do I find my license key?",
    a: "Gumroad emails your license key to the address you used at checkout. Check your inbox (and spam folder) for an email from Gumroad. You can also find the key in your Gumroad library at gumroad.com/library.",
  },
  {
    q: "Where do I enter my license key in the extension?",
    a: "Click the Volume Booster + Equalizer Pro icon in your Chrome toolbar to open the popup. At the bottom of the popup, click the 'Upgrade to PRO' or 'Enter License' button. Paste your key and click Activate — PRO features unlock immediately.",
  },
  {
    q: "Can I use my license on multiple computers?",
    a: "Yes. One license key activates PRO on up to 3 of your own computers. If you need more, contact support.",
  },
  {
    q: "Is this a subscription?",
    a: "No. This is a one-time $4.99 payment. There are no renewals, no auto-charges, and no subscription. You get all future updates included.",
  },
  {
    q: "How do I get a refund?",
    a: "We offer a 30-day no-questions-asked refund. Reply to your Gumroad receipt email or contact support and we will process it immediately.",
  },
  {
    q: "The boost is distorting — what do I do?",
    a: "At very high boost levels (700%+) some audio sources may clip. Use the 5-band EQ to reduce bass and treble slightly — this often eliminates distortion while keeping volume high. You can also reduce the slider to a level where the audio is clear.",
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
      <Script id="gads-volume-purchase" strategy="afterInteractive">
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
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-violet-700">Volume Booster</span>
            </Link>
            <Link href="/extensions/volume-booster-equalizer-pro">
              <span className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
                Extension Page
              </span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-10 text-center bg-gradient-to-b from-violet-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              You&apos;re all set — PRO is activated!
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Thank you for upgrading. Your 1000% boost and 5-band EQ are ready to use.
            </p>
          </div>
        </section>

        {/* License key card */}
        <section className="pb-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white border-2 border-violet-500 rounded-2xl p-6 shadow-sm">
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
                    className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : (
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-sm text-slate-700 flex gap-3">
                  <Mail className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Check your email</strong> — Gumroad just sent your license key to{" "}
                    <strong>{customerEmail || "the address you used at checkout"}</strong>.
                    Look for an email from Gumroad. If you do not see it within 5 minutes, check your spam folder.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Activation steps */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 text-center mb-3">
              Activate in 3 steps
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-14">
              Unlock 1000% boost and the full EQ in under a minute
            </h2>

            {/* Step 1 */}
            <div className="py-12 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Click the Volume Booster icon
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Click the puzzle-piece icon in the Chrome toolbar, then click{" "}
                <strong>Volume Booster + Equalizer Pro</strong> to open the popup.
                If you do not see it, pin the extension first.
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
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Click &quot;Enter License&quot;
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                At the bottom of the popup, click the <strong>Upgrade to PRO</strong> or{" "}
                <strong>Enter License</strong> button to open the license activation field.
              </p>
            </div>

            {/* Step 3 */}
            <div className="py-12 text-center">
              <StepNumber n={3} />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Paste your license key and activate
              </h3>
              <p className="text-slate-500 max-w-lg mx-auto">
                Paste the key from your email (or copy it above) into the input field and click{" "}
                <strong>Activate</strong>. The 1000% slider and 5-band EQ unlock instantly — no browser restart needed.
              </p>
            </div>
          </div>
        </section>

        {/* What you unlocked */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 text-center mb-3">
              What you unlocked
            </p>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              Every PRO feature, for life
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "1000% volume boost (vs 600% free)",
                "5-band equalizer — Bass, Low-Mid, Mid, High-Mid, Treble",
                "2 extra presets: Deep Bass and Podcast Mode",
                "Save your own custom presets",
                "Per-site memory — settings saved per domain",
                "Keyboard shortcuts for Volume Up / Down",
                "Activate on up to 3 of your own computers",
                "All future PRO updates included",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 text-center mb-3">
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
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sliders className="w-6 h-6 text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to turn it up to 1000%?
            </h2>
            <p className="text-slate-400 mb-8">
              Activate your key, then open YouTube, Netflix, or any tab and experience the difference.
            </p>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-violet-500 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Open YouTube and test it
            </a>
            <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
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

export default function VolumeBoosterThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-violet-50">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
