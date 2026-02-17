"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Shield,
  BookOpen,
  GraduationCap,
  Calculator,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Target,
  Layers,
  CheckCircle,
  Brain,
  Eye,
  ListChecks,
  Trophy,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/polyguide-prediction-mark/lohacnfcnnggojhhkclajoigmlomghdo";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="0" />
      </svg>
      Add to Chrome — It&apos;s Free
    </a>
  );
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

function PolyGuideMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3">
        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-0.5">
          Prediction Market Guide
        </p>
        <p className="text-white font-bold text-sm">PolyGuide</p>
        <p className="text-slate-400 text-[11px]">
          Learn faster, trade with more discipline.
        </p>
      </div>
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-4 text-center text-[11px]">
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-800">0%</p>
            <p className="text-slate-400">Mastery</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-800">1</p>
            <p className="text-slate-400">Day Streak</p>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-800">0/4</p>
            <p className="text-slate-400">Lessons</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-700 mb-1">
          Next Momentum Step: Prediction Markets 101
        </p>
        <p className="text-[11px] text-slate-400">
          Micro-win target: Finish one lesson before opening a market tab.
        </p>
      </div>
      <div className="flex border-b border-slate-100 text-[11px] font-medium text-center">
        <span className="flex-1 py-2 text-slate-500">Learn</span>
        <span className="flex-1 py-2 bg-orange-500 text-white rounded-md mx-1 my-1">
          Tools
        </span>
        <span className="flex-1 py-2 text-slate-500">Markets</span>
        <span className="flex-1 py-2 text-slate-500">Glossary</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-bold text-slate-700 mb-1">
          Risk Calculator
        </p>
        <p className="text-[11px] text-slate-400 mb-2">
          Position sizing for downside control.
        </p>
        <div className="space-y-2 text-[11px] text-slate-500">
          <div className="flex justify-between">
            <span>Bankroll ($)</span>
            <div className="w-24 h-5 bg-slate-100 rounded" />
          </div>
          <div className="flex justify-between">
            <span>Max risk per trade (%)</span>
            <div className="w-24 h-5 bg-slate-100 rounded" />
          </div>
          <div className="flex justify-between">
            <span>Entry price (0-1)</span>
            <div className="w-24 h-5 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="mt-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold text-center py-2 rounded-lg">
          Calculate
        </div>
      </div>
    </div>
  );
}

export default function PolyGuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is PolyGuide free?",
      a: "Yes, completely free. There is no premium tier, no hidden costs, and no ads inside the extension. It is free forever.",
    },
    {
      q: "Do I need a Polymarket account to use PolyGuide?",
      a: "No. PolyGuide works as a learning and risk management tool regardless of whether you have a Polymarket account. You can learn all the concepts before ever placing a trade.",
    },
    {
      q: "What topics do the lessons cover?",
      a: "The lessons cover prediction market fundamentals including how pricing works, implied probability, reading order books, understanding spreads and liquidity, position sizing, and risk management strategies.",
    },
    {
      q: "What is the educational overlay?",
      a: "When you browse Polymarket with PolyGuide installed, an optional overlay explains what you are seeing in plain language — prices, probabilities, and market mechanics — directly on the page.",
    },
    {
      q: "Does PolyGuide track my data or trades?",
      a: "No. PolyGuide runs entirely in your browser. It does not collect personal data, track your trades, or send information to any server. Everything stays private on your machine.",
    },
  ];

  const relatedTools = [
    { name: "EV Calculator", href: "/polymarket-ev", icon: Calculator },
    { name: "Arbitrage Finder", href: "/polymarket-arbitrage", icon: Target },
    { name: "Kelly Criterion", href: "/polymarket-kelly", icon: BarChart3 },
    {
      name: "Probability Calculator",
      href: "/polymarket-probability",
      icon: TrendingUp,
    },
    {
      name: "Sure Bet Finder Extension",
      href: "/extensions/sure-bet-finder",
      icon: Zap,
    },
    {
      name: "Whale Tracker Extension",
      href: "/extensions/whale-tracker",
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Calc-Tech
            </span>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left - Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-4">
                Free Chrome Extension
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Learn Polymarket While You Browse
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Guided lessons, a built-in risk calculator, and live educational
                overlays — everything a beginner needs to trade prediction
                markets with confidence.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Free forever
                </span>
                <span>&bull;</span>
                <span>No account required</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Guided lessons
                </span>
                <span>&bull;</span>
                <span>100% private</span>
              </p>
            </div>
            {/* Right - Mockup */}
            <div className="flex-shrink-0 lg:rotate-1">
              <PolyGuideMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Beginner-Friendly Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Built-In Risk Calculator</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Featured on Calc-Tech.com</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            New to Prediction Markets?
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Polymarket is powerful, but the learning curve is steep. Without
            guidance, beginners lose money to mistakes that are easy to avoid.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HelpCircle,
                title: "Confusing Pricing",
                desc: "Market prices represent probabilities, not dollar values. Without understanding this, you will misread every opportunity.",
              },
              {
                icon: Layers,
                title: "No Learning Path",
                desc: "Polymarket does not teach you how to use it. You are dropped into live markets with real money and zero guidance.",
              },
              {
                icon: Target,
                title: "Poor Risk Habits",
                desc: "Beginners bet too much on single positions. Without a risk framework, one bad trade can wipe out your entire bankroll.",
              },
            ].map((card, i) => (
              <Card
                key={i}
                className="border-t-4 border-t-orange-500 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <card.icon className="w-8 h-8 text-orange-500 mb-2" />
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Everything You Need to Learn Polymarket
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            A side panel that turns confusion into confidence — with lessons,
            tools, and real-time explanations built right into your browser.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Guided Learning
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Step-by-Step Lessons with Practice Checks
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Work through structured lessons that teach prediction market
                  mechanics in plain language. Each lesson ends with a quick
                  practice check to make sure you understood.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Covers pricing, probability, spreads, liquidity, and more
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Quick practice checks after each lesson
                  </li>
                  <li className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Progress tracking with mastery percentage and streaks
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Prediction Markets 101
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    4 lessons &middot; Practice checks included
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Educational Overlay
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Learn While You Browse Polymarket
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Turn on the optional overlay and PolyGuide explains what you
                  are seeing on Polymarket — prices, probabilities, and market
                  mechanics — directly on the page in plain language.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    In-page explanations on Polymarket event pages
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Translates market data into beginner-friendly language
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Toggle on or off any time — choose beginner or advanced mode
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Live Overlay
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Plain-language explanations on Polymarket
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Risk Management
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Risk Calculator for Position Sizing
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Size every position based on your bankroll and risk tolerance.
                  PolyGuide tells you exactly how many shares to buy so you never
                  over-expose yourself on a single trade.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Calculator className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Enter bankroll, max risk percentage, and entry price
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Downside control built into every calculation
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Supports optional stop price for tighter risk management
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Calculator className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Risk Calculator
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Bankroll-based position sizing
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Reference Tools
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Glossary and Progress Tracking
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Look up any prediction market term instantly. Track your
                  learning streaks and mastery score to build a daily habit of
                  improving your trading knowledge.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Glossary covers spread, liquidity, implied probability, and
                    more
                  </li>
                  <li className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Day streaks and mastery percentage keep you motivated
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Micro-win targets guide your next step
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Track Progress
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Mastery score, streaks, and micro-wins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-14">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-300" />
            {[
              {
                step: 1,
                title: "Install",
                desc: "One click to add from the Chrome Web Store. Opens as a side panel next to any tab.",
              },
              {
                step: 2,
                title: "Learn",
                desc: "Work through guided lessons and practice checks at your own pace. Track your progress.",
              },
              {
                step: 3,
                title: "Trade Smarter",
                desc: "Use the risk calculator and overlay to make disciplined decisions on Polymarket.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-14 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Start Learning Prediction Markets Today
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. No account needed. Free forever.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
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

      {/* Related Tools */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            More Polymarket Tools on Calc-Tech.com
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Sharpen your edge with our full suite of prediction market tools.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-200 hover:shadow-md hover:border-orange-300 transition-all group"
              >
                <tool.icon className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-slate-700">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Guessing. Start Learning.
          </h2>
          <p className="text-slate-400 mb-8">
            Every trade without understanding the fundamentals is a gamble.
            PolyGuide turns beginners into disciplined traders.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Free forever</span>
            <span>&bull;</span>
            <span>No account required</span>
            <span>&bull;</span>
            <span>100% private</span>
            <span>&bull;</span>
            <span>Install in 10 seconds</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <Link href="/" className="text-slate-300 hover:text-white font-medium">
            Calc-Tech.com
          </Link>
          <p>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
