"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Shield,
  Sliders,
  Volume2,
  Keyboard,
  Globe,
  Zap,
  Star,
} from "lucide-react";

const CWS_URL =
  "https://chromewebstore.google.com/detail/volume-booster-equalizer-pro/placeholder";

const PRO_CHECKOUT_URL = "https://calc-tech.com/extensions/volume-booster-equalizer-pro";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | React.ReactNode;
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
    <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
      <span className="text-xl font-bold text-white">{n}</span>
    </div>
  );
}

const FEATURES = [
  {
    icon: Volume2,
    title: "Up to 1000% Volume Boost",
    desc: "Push audio far beyond the browser's built-in limit. Quiet YouTube videos, muffled Netflix streams, and low Zoom calls become fully audible — even at max system volume.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    tag: "PRO",
  },
  {
    icon: Sliders,
    title: "5-Band Equalizer",
    desc: "Adjust bass, low-mid, mid, high-mid, and treble independently. Apply the Bass Boost preset for music, or the Voice Clarity preset for podcasts and calls.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    tag: "PRO",
  },
  {
    icon: Globe,
    title: "Per-Site Memory",
    desc: "Set YouTube to Bass Boost and Zoom to Voice Clarity — the extension remembers your settings for each domain automatically. No re-adjusting when you switch tabs.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    tag: "PRO",
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    desc: "Bump volume up or down without touching the popup. Assign any key combination in Chrome's extension shortcuts settings.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    tag: "PRO",
  },
  {
    icon: Zap,
    title: "Works on Any Tab",
    desc: "YouTube, Netflix, Twitch, Zoom, Google Meet, Spotify Web, local video files, news sites — if it plays audio in Chrome, the booster works on it.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    tag: "FREE",
  },
  {
    icon: Shield,
    title: "100% Local, Zero Data Sent",
    desc: "The audio processing happens entirely inside your browser using the Web Audio API. No audio data is recorded, transmitted, or analyzed by any server.",
    color: "text-slate-600",
    bg: "bg-slate-100",
    tag: "FREE",
  },
];

const FAQS = [
  {
    q: "What is Volume Booster + Equalizer Pro?",
    a: "It is a Chrome extension that uses the Web Audio API to amplify any tab's audio output up to 1000% and apply a 5-band equalizer. It works on YouTube, Netflix, Zoom, Spotify, and any other audio source in Chrome.",
  },
  {
    q: "How is this different from Volume Master or Louder?",
    a: "The main differences are: (1) a true 5-band equalizer versus single-gain-only sliders in those extensions, (2) per-site memory that saves your EQ preset per domain, (3) a 1000% cap versus their 600%, and (4) keyboard shortcut support.",
  },
  {
    q: "Why is my YouTube / Netflix / Zoom audio too quiet?",
    a: "Most devices apply hardware volume limiting at the OS or headphone driver level. Chrome also clips audio at 100% on some platforms. A volume booster extension bypasses these limits by processing audio in a separate gain node before it reaches your speakers or headphones.",
  },
  {
    q: "Is it free?",
    a: "The 600% boost and three built-in presets (Flat, Bass, Voice) are free with no limits. The PRO upgrade ($4.99 one-time) unlocks 1000% boost, all five presets, the custom EQ sliders, per-site memory, and keyboard shortcuts. No subscription — you pay once.",
  },
  {
    q: "Will it distort my audio?",
    a: "At moderate boost levels (up to ~300%) distortion is rare. At 600–1000% some audio sources may clip if the original signal is already at 100% loudness. The equalizer lets you reduce bass or treble to prevent clipping even at high gain.",
  },
  {
    q: "Does it work on Netflix or other DRM content?",
    a: "Yes. Volume boosting works on DRM-protected streams because it processes the decoded audio output — not the encrypted stream. The extension cannot bypass DRM; it only adjusts the volume of whatever audio Chrome plays.",
  },
  {
    q: "Is my audio data private?",
    a: "Yes. The extension uses the Web Audio API entirely inside your browser. No audio is ever recorded or sent anywhere. The extension has no network permissions and makes zero outbound requests.",
  },
  {
    q: "How do I get a refund?",
    a: "We offer a 30-day no-questions-asked refund. Reply to your purchase receipt email or contact support and we will process it immediately.",
  },
];

function CtaButton({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={CWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-violet-700 hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
    >
      {children}
    </a>
  );
}

export default function VolumeBoosterLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
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
          <a
            href={CWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-violet-600 text-white font-semibold text-sm rounded-full hover:bg-violet-700 transition-colors"
          >
            Add to Chrome — Free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">
            Boost any tab to{" "}
            <span className="text-violet-600">1000%</span>{" "}
            volume
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-4 max-w-2xl mx-auto">
            Fix quiet YouTube videos, muffled Netflix streams, and silent Zoom calls — with a{" "}
            <strong className="text-slate-700">5-band equalizer</strong> that remembers your settings per site.
          </p>
          <p className="text-sm text-slate-400 mb-10">
            Free to install &bull; 600% boost free &bull; PRO unlocks 1000% + full EQ
          </p>

          <CtaButton>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Add to Chrome — Free
          </CtaButton>

          <div className="flex items-center justify-center gap-1 mt-6 text-sm text-slate-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2">Trusted by 10,000+ users</span>
          </div>
        </div>
      </section>

      {/* Comparison callout */}
      <section className="py-10 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-6">
            How we compare
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-slate-400 font-medium">Feature</th>
                  <th className="pb-3 text-violet-400 font-semibold text-center">Volume Booster + EQ Pro</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Volume Master</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Louder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  ["Max boost", "1000%", "600%", "600%"],
                  ["EQ bands", "5-band", "1 (gain only)", "1 (gain only)"],
                  ["Per-site memory", "Yes", "No", "No"],
                  ["Keyboard shortcuts", "Yes", "No", "No"],
                  ["Custom presets", "Yes", "No", "No"],
                  ["Price", "$4.99 one-time", "$2.99/mo", "Free (limited)"],
                ].map(([feature, us, vm, louder]) => (
                  <tr key={feature}>
                    <td className="py-3 text-slate-300">{feature}</td>
                    <td className="py-3 text-center">
                      <span className="text-violet-300 font-semibold">{us}</span>
                    </td>
                    <td className="py-3 text-center text-slate-500">{vm}</td>
                    <td className="py-3 text-center text-slate-500">{louder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            How it works
          </p>
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-16">
            Up and running in under a minute
          </h2>

          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Install the extension",
                desc: 'Click "Add to Chrome" above, then confirm the install. The extension icon appears in your toolbar.',
              },
              {
                step: 2,
                title: "Open any tab with audio",
                desc: "Navigate to YouTube, Netflix, Zoom, Spotify, or any site that plays audio in Chrome.",
              },
              {
                step: 3,
                title: "Click the extension icon and drag the slider",
                desc: "The popup opens. Drag the volume slider to the right to boost audio beyond 100%. You will hear the difference immediately.",
              },
              {
                step: 4,
                title: "Pick a preset or tune the EQ",
                desc: "Try Bass Boost for music, Voice Clarity for calls, or drag the 5 EQ bands to build your own custom sound. Settings auto-save per site.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 items-start">
                <StepNumber n={step} />
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Features
          </p>
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-14">
            Everything Volume Master and Louder are missing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      f.tag === "PRO"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {f.tag}
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Pricing
          </p>
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-14">
            Free to use, unlock everything once
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="border border-slate-200 rounded-2xl p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                Free
              </p>
              <div className="text-4xl font-bold text-slate-900 mb-1">$0</div>
              <p className="text-slate-400 text-sm mb-8">Forever free</p>
              <ul className="space-y-3">
                {[
                  "Up to 600% volume boost",
                  "3 built-in presets (Flat, Bass, Voice)",
                  "Works on all tabs",
                  "No account required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={CWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center w-full py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                Add to Chrome — Free
              </a>
            </div>

            {/* Pro */}
            <div className="border-2 border-violet-500 rounded-2xl p-8 bg-violet-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  BEST VALUE
                </span>
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-3">
                PRO
              </p>
              <div className="text-4xl font-bold text-slate-900 mb-1">$4.99</div>
              <p className="text-slate-400 text-sm mb-8">One-time payment, lifetime access</p>
              <ul className="space-y-3">
                {[
                  "Up to 1000% volume boost",
                  "5-band equalizer (Bass, Low-Mid, Mid, High-Mid, Treble)",
                  "5 presets + save custom presets",
                  "Per-site memory — remembers settings per domain",
                  "Keyboard shortcuts for volume control",
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
                className="mt-8 flex items-center justify-center w-full py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-md"
              >
                Get PRO — $4.99
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            FAQ
          </p>
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
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
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Make your browser louder — right now
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Quiet YouTube videos, muffled Netflix, barely audible Zoom calls — fixed in one click.
            Free to install, no account required.
          </p>
          <CtaButton>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Add to Chrome — Free
          </CtaButton>
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Free forever tier</span>
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
              Terms of Service
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
