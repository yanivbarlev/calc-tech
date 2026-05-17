"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  Shield,
  Volume2,
  Sliders,
  Globe,
  Keyboard,
} from "lucide-react";

// Google Ads — Volume Booster Install conversion
const GADS_ID = "AW-1006081641";
const INSTALL_CONVERSION_LABEL = "volume_booster_install"; // placeholder — replace with real label

const PRO_CHECKOUT_URL = "https://calc-tech.com/extensions/volume-booster-equalizer-pro";

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
    q: "How do I boost volume on YouTube?",
    a: "Open YouTube in Chrome, then click the Volume Booster icon in the toolbar. Drag the slider to the right — 200–400% is a good starting point for quiet videos. The change takes effect immediately.",
  },
  {
    q: "Why is my audio quiet even at 100% system volume?",
    a: "Most operating systems apply hardware limiting that caps audio before it reaches your headphones. Chrome also limits audio mixing at the OS level on some platforms. A volume booster extension uses the Web Audio API to apply a gain node independently of these limits.",
  },
  {
    q: "Will it work on Netflix and Zoom?",
    a: "Yes. The extension boosts audio from any tab — YouTube, Netflix, Zoom, Google Meet, Spotify Web, Twitch, local video files — any source that plays audio through Chrome.",
  },
  {
    q: "What is the difference between Free and PRO?",
    a: "Free includes up to 600% boost and three presets (Flat, Bass, Voice). PRO ($4.99 one-time) adds 1000% boost, the 5-band EQ sliders, two additional presets, custom preset saving, per-site memory, and keyboard shortcuts.",
  },
  {
    q: "How do keyboard shortcuts work?",
    a: "After installing, go to chrome://extensions/shortcuts (paste into the address bar). Find Volume Booster + Equalizer Pro and assign keys for Volume Up and Volume Down. These will adjust the boost level from any tab without opening the popup.",
  },
  {
    q: "Is my audio sent anywhere?",
    a: "No. All audio processing happens locally in your browser using the Web Audio API. Nothing is recorded, transmitted, or analyzed by any server. The extension has no network permissions.",
  },
];

function WelcomeContent() {
  const params = useSearchParams();
  const reason = params.get("reason");
  const isInstall = reason === "install";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showConversion, setShowConversion] = useState(false);

  useEffect(() => {
    if (isInstall) {
      setShowConversion(true);
    }
  }, [isInstall]);

  return (
    <>
      {/* Google Ads conversion — fires only on ?reason=install */}
      {showConversion && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gads-volume-install" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GADS_ID}');
              gtag('event', 'conversion', {'send_to': '${GADS_ID}/${INSTALL_CONVERSION_LABEL}'});
            `}
          </Script>
        </>
      )}

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
              <Volume2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Volume Booster is installed.{" "}
              <span className="text-violet-600">Make it loud.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-8">
              Drag the slider, pick a preset, and your audio is instantly louder.
            </p>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-violet-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Try it on YouTube
            </a>
            <p className="text-sm text-slate-400 mt-3">
              Works on any tab — YouTube, Netflix, Zoom, and more
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              Getting started
            </p>
            <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-14">
              How to use Volume Booster
            </h2>

            {/* Step 1 */}
            <div className="py-10 text-center border-b border-slate-100">
              <StepNumber n={1} />
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Pin the extension to your toolbar
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                Click the puzzle-piece icon at the top right of your browser, find Volume Booster + Equalizer Pro, and click the pin icon so it stays visible.
              </p>
              <div className="inline-block rounded-xl overflow-hidden shadow-md border border-slate-200 mx-auto">
                <NextImage
                  src="/shared/chrome-puzzle-icon.png"
                  alt="Chrome toolbar showing the puzzle piece extensions icon circled in red"
                  width={400}
                  height={60}
                  className="w-full max-w-sm h-auto block"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="py-10 text-center border-b border-slate-100">
              <StepNumber n={2} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Click the icon and drag the slider
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Open any tab with audio, click the Volume Booster icon, and drag the slider right.
                Start at 200% and increase until you can hear clearly.
              </p>
              {/* Visual slider mockup */}
              <div className="mt-8 inline-block bg-slate-900 rounded-2xl px-8 py-6 text-left shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Volume</span>
                  <span className="text-violet-400 font-bold text-lg">320%</span>
                </div>
                <div className="w-64 h-2 bg-slate-700 rounded-full">
                  <div className="w-2/5 h-2 bg-violet-500 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-slate-500">100%</span>
                  <span className="text-xs text-slate-500">1000%</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="py-10 text-center border-b border-slate-100">
              <StepNumber n={3} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Try the presets
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Hit <strong>Bass Boost</strong> for music, <strong>Voice Clarity</strong> for calls and podcasts,
                or keep it at <strong>Flat</strong> for pure volume with no EQ changes.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                {["Flat", "Bass Boost", "Voice Clarity"].map((preset, i) => (
                  <div
                    key={preset}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
                      i === 1
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    {preset}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="py-10 text-center">
              <StepNumber n={4} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Set a keyboard shortcut (optional)
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Go to{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
                  chrome://extensions/shortcuts
                </code>{" "}
                and assign keys for Volume Up / Volume Down. Adjust audio from any tab without opening the popup.
              </p>
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              What you have
            </p>
            <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
              Your extension at a glance
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Volume2,
                  title: "600% Boost (Free)",
                  desc: "Push audio beyond the browser's built-in 100% limit on any tab.",
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
                {
                  icon: Sliders,
                  title: "5-Band EQ (PRO)",
                  desc: "Adjust bass, mids, and treble independently for your exact preference.",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  icon: Globe,
                  title: "Per-Site Memory (PRO)",
                  desc: "Settings auto-save per domain. YouTube, Zoom, Netflix each remember their own EQ.",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  icon: Keyboard,
                  title: "Keyboard Shortcuts (PRO)",
                  desc: "Control volume from any tab with custom hotkeys — no popup required.",
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <f.icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO Upsell */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="border-2 border-violet-500 rounded-2xl p-8 text-center bg-violet-50">
              <div className="inline-flex p-3 bg-violet-100 rounded-xl mb-4">
                <Sliders className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Unlock the full equalizer
              </h2>
              <p className="text-slate-600 mb-6">
                1000% boost, 5-band EQ, per-site memory, keyboard shortcuts — one-time $4.99 payment.
              </p>
              <ul className="text-left space-y-2 mb-8 max-w-xs mx-auto">
                {[
                  "1000% boost instead of 600%",
                  "5-band equalizer (Bass, Low-Mid, Mid, High-Mid, Treble)",
                  "Per-site memory — settings saved per domain",
                  "Keyboard shortcuts for Volume Up / Down",
                  "All future updates included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={PRO_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-violet-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Get PRO — $4.99 one-time
              </a>
              <p className="text-xs text-slate-400 mt-3">
                Secure checkout · 30-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
              FAQ
            </p>
            <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
              Common questions
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
              Ready to make it louder?
            </h2>
            <p className="text-slate-400 mb-8">
              Open YouTube, Netflix, or Zoom and try the boost slider now.
            </p>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-violet-500 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Open YouTube and try it
            </a>
            <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>Free to use</span>
              <span>&bull;</span>
              <span>No account required</span>
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

export default function VolumeBoosterWelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-violet-50">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
