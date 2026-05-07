"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
  Zap,
  EyeOff,
  SkipForward,
  LayoutGrid,
  MessageSquareOff,
  TrendingDown,
  Play,
} from "lucide-react";

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
    <div className="w-16 h-16 rounded-full border-[3px] border-teal-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-teal-600">{n}</span>
    </div>
  );
}

const FEATURES = [
  {
    icon: EyeOff,
    title: "Hide Shorts",
    desc: "Shorts are removed from every surface — home feed, sidebar, search results, and the navigation bar. YouTube becomes a long-form video platform again.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: LayoutGrid,
    title: "Hide Home Feed",
    desc: "Clear the home page so you only watch what you came for. Optionally redirect the home button straight to your Subscriptions feed.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: SkipForward,
    title: "Disable Autoplay",
    desc: "Stop the next video from loading automatically. Every watch is intentional. Works on both desktop and mobile YouTube.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Hide Recommended Videos",
    desc: "Remove the sidebar recommendations and end-screen suggestions that pull you down rabbit holes. Just watch the video you chose.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: MessageSquareOff,
    title: "Hide Comments",
    desc: "The comments section can be a time sink and a mood killer. Hide it with one toggle and keep your focus on the content.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: TrendingDown,
    title: "Hide Trending & Explore",
    desc: "Block the Trending and Explore tabs so you never accidentally drift into viral content you didn't ask for.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const FAQS = [
  {
    q: "Is CleanTube free?",
    a: "Yes, completely free. All 21 toggle options are included with no limits, no account, and no subscription.",
  },
  {
    q: "Will it affect my YouTube account or recommendations?",
    a: "No. CleanTube only hides elements visually — it does not interact with your YouTube account, change your watch history, or signal anything to YouTube's algorithm. Everything is purely display-level.",
  },
  {
    q: "Does it work on mobile YouTube (m.youtube.com)?",
    a: "Yes. CleanTube applies to both www.youtube.com and m.youtube.com, so mobile YouTube in Chrome is also covered.",
  },
  {
    q: "Can I turn it off temporarily?",
    a: "Yes. Click the CleanTube icon in your toolbar and toggle the power button at the top right. All hiding is instantly paused. One more click turns it back on.",
  },
  {
    q: "Are my settings saved?",
    a: "Yes. Your toggle settings are saved to Chrome sync storage, so they follow you across devices when you're signed in to Chrome.",
  },
  {
    q: "Does it hide everything or can I choose?",
    a: "You choose. CleanTube has 21 individual toggles — from Shorts to Comments to the Top Header — each independently on or off. Configure exactly the experience you want.",
  },
];

export default function CleanTubeWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Calc-Tech
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-10 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
              <Play className="w-7 h-7 text-white fill-white" />
            </div>
            <span className="text-3xl font-bold text-slate-900">CleanTube</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            CleanTube is installed.{" "}
            <span className="text-teal-600">You&apos;re in control.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto">
            Hide Shorts, recommended videos, comments, autoplay, and any other
            distraction — one toggle at a time.
          </p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-teal-700 hover:shadow-lg transition-all duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            Open YouTube
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest mb-2">
            Getting Started
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-14">
            3 steps to a cleaner YouTube
          </h2>

          {/* Step 1 */}
          <div className="py-10 text-center border-b border-slate-100">
            <StepNumber n={1} />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Click the puzzle piece icon in Chrome&apos;s toolbar
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              It&apos;s at the top right of your browser, next to the address bar.
            </p>
            <div className="inline-block rounded-xl overflow-hidden shadow-md border border-slate-200">
              <NextImage
                src="/shared/chrome-puzzle-icon.png"
                alt="Chrome toolbar showing the puzzle piece extensions icon circled in red"
                width={400}
                height={60}
                className="w-full max-w-sm h-auto"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="py-10 text-center border-b border-slate-100">
            <StepNumber n={2} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Click <span className="text-teal-600">CleanTube</span> and pin it
            </h3>
            <p className="text-slate-500 text-sm">
              Pin the extension so the icon is always visible in your toolbar —
              one click to open your settings.
            </p>
          </div>

          {/* Step 3 */}
          <div className="py-10 text-center">
            <StepNumber n={3} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Turn on the distractions you want to hide
            </h3>
            <p className="text-slate-500 text-sm">
              Toggle each option on or off. Your settings are saved automatically
              and sync across devices.
            </p>
            {/* Toggle preview */}
            <div className="mt-8 inline-block text-left bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 space-y-4 shadow-sm">
              {[
                { label: "Hide Shorts", on: true },
                { label: "Hide Home Feed", on: true },
                { label: "Disable Autoplay", on: true },
                { label: "Hide Recommended", on: true },
                { label: "Hide Comments", on: false },
                { label: "Hide Trending", on: false },
              ].map(({ label, on }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                      on ? "bg-teal-600" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        on ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest mb-2">
            What You Can Hide
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-12">
            21 toggles. Every distraction covered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest mb-2">
            FAQ
          </p>
          <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Common questions about CleanTube
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
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-400 mb-2">Ready?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Open YouTube and try it now
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Click the CleanTube icon, flip a few toggles, and watch YouTube
            without the noise.
          </p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-teal-500 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            Open YouTube
          </a>
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>100% free</span>
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
  );
}
