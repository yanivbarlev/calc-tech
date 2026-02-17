"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  DollarSign,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Search,
  MousePointerClick,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  ExternalLink,
  Calculator,
  Target,
  Layers,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/polymarket-whale-tracker/onhhaghaecempnnodenjjlhkobgpkkfj";

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

function TradeFeedMockup() {
  const trades = [
    {
      market: "Will Trump win 2028?",
      direction: "SELL",
      amount: "$48,350",
      whale: "Deep Pocket Trader #5",
      time: "2m ago",
    },
    {
      market: "Bitcoin above $100k by March?",
      direction: "BUY",
      amount: "$32,000",
      whale: "Institutional Whale #12",
      time: "8m ago",
    },
    {
      market: "Fed rate cut in April?",
      direction: "SELL",
      amount: "$27,500",
      whale: "Deep Pocket Trader #8",
      time: "14m ago",
    },
    {
      market: "Ethereum ETF approved Q2?",
      direction: "BUY",
      amount: "$41,200",
      whale: "Institutional Whale #3",
      time: "22m ago",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-white font-semibold text-sm">
          Whale Trade Feed
        </span>
        <span className="ml-auto text-blue-200 text-xs">Live</span>
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      <div className="divide-y divide-slate-100">
        {trades.map((trade, i) => (
          <div key={i} className="px-4 py-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-sm font-medium text-slate-800 leading-tight">
                {trade.market}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  trade.direction === "BUY"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trade.direction}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">
                {trade.amount}
              </span>
              <span className="text-xs text-slate-400">{trade.time}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{trade.whale}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          Tracking trades above $25,000
        </span>
      </div>
    </div>
  );
}

export default function WhaleTrackerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is Polymarket Whale Tracker free?",
      a: "Yes, completely free. There is no premium tier, no hidden costs, and no ads inside the extension. It is free forever.",
    },
    {
      q: "What counts as a whale trade?",
      a: "Any trade of $25,000 or more by default. You can adjust the threshold anywhere from $10,000 to $100,000 to match your own definition of a significant trade.",
    },
    {
      q: "How are whales identified?",
      a: "Each trader receives a consistent identifier based on their wallet activity, such as \"Institutional Whale #5678\" or \"Deep Pocket Trader #12\". This lets you track repeat players across different markets over time.",
    },
    {
      q: "Will I get too many notifications?",
      a: "You control the frequency. Choose from real-time alerts, hourly digests, every 4 hours, or every 8 hours. You can also raise the trade threshold to filter out smaller trades.",
    },
    {
      q: "Does it work on all Polymarket markets?",
      a: "Yes. The extension monitors every active Polymarket market including politics, crypto, sports, current events, and all other categories. If a whale trades on it, you will see it.",
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
                Never Miss a Whale Trade on Polymarket Again
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Get real-time alerts when smart money moves. Track $25,000+
                trades across every Polymarket prediction market, right from
                your browser.
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
                  <Zap className="w-3.5 h-3.5" /> Real-time alerts
                </span>
                <span>&bull;</span>
                <span>Track trades $25K+</span>
              </p>
            </div>
            {/* Right - Mockup */}
            <div className="flex-shrink-0 lg:rotate-1">
              <TradeFeedMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Real-time Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Tracks $25K+ Trades</span>
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
            Trading Blind on Polymarket?
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            The biggest edge in prediction markets is knowing what smart money
            is doing. Without it, you are at a disadvantage.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: EyeOff,
                title: "Whale Moves Hidden",
                desc: "Big money enters positions quietly. By the time the market moves, you have already missed the signal.",
              },
              {
                icon: Layers,
                title: "Too Many Markets",
                desc: "Hundreds of active markets across politics, crypto, sports, and more. You cannot manually watch them all for large trades.",
              },
              {
                icon: Search,
                title: "No Smart Money Feed",
                desc: "Polymarket does not show you who is trading big. You are flying blind without whale data.",
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
            Everything You Need to Follow the Whales
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            A purpose-built tool for tracking high-value Polymarket trades
            directly in your browser.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Real-Time Alerts
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Real-Time Whale Alerts
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Get notified instantly when trades over $25,000 hit any
                  Polymarket market. Never be the last to know when smart money
                  takes a position.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Customize your threshold from $10K to $100K
                  </li>
                  <li className="flex items-start gap-2">
                    <Bell className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Choose notification frequency: real-time, hourly, every 4 or
                    8 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Browser notifications — no app or account needed
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Bell className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Whale Alert
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    &quot;Bitcoin above $100k&quot; &mdash; $32,000 BUY
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Side Panel Dashboard
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Trade Feed Dashboard
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  View all large trades in Chrome&apos;s side panel without
                  leaving your current tab. Everything you need at a glance.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    See market name, trade amount, direction, and whale ID
                  </li>
                  <li className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Compact view shows 8-9 trades at once for quick scanning
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    7-day rolling cache of all whale trades
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Side Panel Feed
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    All whale trades, one glance
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Whale Tracking
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Whale Identification
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Every large trader gets a persistent identifier so you can
                  track their activity across markets and over time.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Consistent labels like &quot;Institutional Whale
                    #5678&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Track repeat players across different markets
                  </li>
                  <li className="flex items-start gap-2">
                    <Search className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Spot patterns in how smart money positions
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Whale #5678
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    12 trades tracked across 8 markets
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Instant Access
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  One-Click Market Access
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Click any market name in the feed to open the full Polymarket
                  event page. Go from signal to action in seconds.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <MousePointerClick className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Click any trade to open the market on Polymarket
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    7-day rolling cache — never lose context
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    See the full picture instantly
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <MousePointerClick className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    One Click
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Feed to market in seconds
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
                desc: "One click to add from the Chrome Web Store. Opens automatically in Chrome's side panel.",
              },
              {
                step: 2,
                title: "Customize",
                desc: "Set your trade threshold and choose your preferred notification frequency.",
              },
              {
                step: 3,
                title: "Follow the Whales",
                desc: "Get alerts and scan the feed for smart money signals across every market.",
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
            Start Tracking Smart Money Today
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
            The Whales Are Trading Right Now. Are You Watching?
          </h2>
          <p className="text-slate-400 mb-8">
            Every minute without whale data is a missed opportunity.
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
