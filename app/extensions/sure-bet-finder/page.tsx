"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Chrome,
  TrendingUp,
  Clock,
  Filter,
  RefreshCw,
  ShieldCheck,
  Users,
  Star,
  Award,
  AlertTriangle,
  Timer,
  Brain,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BarChart3,
  Eye,
  MousePointerClick,
  Lock,
  Home,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/polymarket-sure-bet-finde/ikkajnakiciblmjgejjhcaecdijgekne";

const faqs = [
  {
    q: "Is Polymarket Sure Bet Finder free?",
    a: "Yes, completely free. There are no premium tiers, no subscriptions, and no hidden costs. It will remain free forever.",
  },
  {
    q: "Does it collect my data?",
    a: "No. The extension runs entirely in your browser. It does not collect, store, or transmit any personal data. Your browsing activity and trading information stay completely private.",
  },
  {
    q: "How often are bets updated?",
    a: "You can set auto-refresh to update every 1, 5, or 10 minutes. You can also manually refresh at any time with a single click.",
  },
  {
    q: 'What makes a bet a "sure bet"?',
    a: "Markets with extreme probabilities (90%+ or under 10%) that are expiring soon. These represent near-certain outcomes where you can lock in small but reliable gains before the market resolves.",
  },
  {
    q: "Do I need a Polymarket account?",
    a: "The extension works without one - you can browse and analyze bets freely. However, you will need a Polymarket account to actually place trades.",
  },
];

const relatedTools = [
  { name: "Polymarket EV Calculator", href: "/polymarket-ev", desc: "Calculate expected value of any bet" },
  { name: "Arbitrage Calculator", href: "/polymarket-arbitrage", desc: "Find cross-market arbitrage opportunities" },
  { name: "Kelly Criterion Calculator", href: "/polymarket-kelly", desc: "Optimal bet sizing for your bankroll" },
  { name: "Implied Probability Calculator", href: "/polymarket-probability", desc: "Convert odds to real probabilities" },
];

function CTAButton({ className = "", size = "lg" }: { className?: string; size?: "lg" | "xl" }) {
  const sizeClasses = size === "xl" ? "px-10 py-5 text-xl" : "px-8 py-4 text-lg";
  return (
    <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
      <Button
        className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 cursor-pointer ${sizeClasses} ${className}`}
      >
        <Chrome className="w-5 h-5 mr-2" />
        Add to Chrome — It&apos;s Free
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </a>
  );
}

function MockupCard() {
  const bets = [
    { market: "Will Bitcoin hit $100K by Feb 28?", yes: "96%", no: "4%", vol: "$2.1M", time: "2h 14m" },
    { market: "Will the Fed cut rates in March?", yes: "91%", no: "9%", vol: "$890K", time: "5h 32m" },
    { market: "Super Bowl LVIII winner: Chiefs?", yes: "3%", no: "97%", vol: "$4.7M", time: "1h 05m" },
    { market: "Will ETH reach $5K by March 1?", yes: "7%", no: "93%", vol: "$1.3M", time: "11h 48m" },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden w-full max-w-md">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-white" />
        <span className="text-white font-bold text-sm">Polymarket Sure Bet Finder</span>
        <span className="ml-auto text-xs text-white/80 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" /> Live
        </span>
      </div>
      <div className="px-3 py-2 border-b border-slate-700 flex gap-2 text-xs text-slate-400">
        <span className="bg-slate-800 px-2 py-1 rounded">Expiry: &lt;24h</span>
        <span className="bg-slate-800 px-2 py-1 rounded">Prob: &gt;90%</span>
        <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Top 20</span>
      </div>
      <div className="divide-y divide-slate-800">
        {bets.map((bet, i) => (
          <div key={i} className="px-3 py-2.5 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-xs font-medium truncate max-w-[200px]">{bet.market}</span>
              <span className="text-slate-500 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {bet.time}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={`font-bold ${parseInt(bet.yes) > 50 ? "text-green-400" : "text-red-400"}`}>
                YES {bet.yes}
              </span>
              <span className={`font-bold ${parseInt(bet.no) > 50 ? "text-green-400" : "text-red-400"}`}>
                NO {bet.no}
              </span>
              <span className="text-slate-500 ml-auto">Vol: {bet.vol}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-slate-800/50 text-center">
        <span className="text-xs text-slate-500">Showing 4 of 20 results</span>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-4 text-slate-600 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function SureBetFinderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">Calc-Tech</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
                <Chrome className="w-4 h-4" />
                Free Chrome Extension
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Stop Scrolling Through Thousands of Markets.{" "}
                <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Find the Sure Bets Instantly.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Automatically discover the highest-probability Polymarket bets about to expire. AI-powered scoring finds profitable opportunities so you don&apos;t have to.
              </p>
              <CTAButton size="xl" />
              <p className="mt-5 text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                <span>Free forever</span>
                <span>No account required</span>
                <span>100% private</span>
                <span>39+ active traders</span>
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MockupCard />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 text-slate-600">
            <div className="flex items-center gap-2 font-semibold">
              <Users className="w-5 h-5 text-orange-500" />
              39+ Traders
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Star className="w-5 h-5 text-orange-500" />
              3.7 Chrome Web Store
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Award className="w-5 h-5 text-orange-500" />
              Featured on Calc-Tech.com
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            The Problem with Polymarket Trading
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Manual market scanning wastes hours and costs you profitable opportunities.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: BarChart3,
              title: "Thousands of Markets",
              desc: "Too many markets to manually analyze. Which ones are actually profitable? You could spend all day scrolling and still miss the best opportunities.",
              color: "from-red-500 to-orange-500",
            },
            {
              icon: Timer,
              title: "Timing is Everything",
              desc: "By the time you find a sure bet, it has already expired or the odds have moved. Manual searching simply cannot keep up with market speed.",
              color: "from-orange-500 to-amber-500",
            },
            {
              icon: Brain,
              title: "Information Overload",
              desc: "No easy way to filter by probability AND expiry time simultaneously. You need both dimensions to find real sure-bet opportunities.",
              color: "from-amber-500 to-yellow-500",
            },
          ].map((item, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-slate-50 to-white">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-2`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-800">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Find Sure Bets
            </h2>
          </div>
          <div className="space-y-20">
            {[
              {
                icon: TrendingUp,
                title: "Find the Best Bets in Seconds",
                points: [
                  "Top 20 highest and lowest probability bets, automatically sorted",
                  "See YES and NO columns side by side for instant comparison",
                  "AI-powered scoring highlights the most promising opportunities",
                ],
                reverse: false,
              },
              {
                icon: Filter,
                title: "Smart Filters That Save Hours",
                points: [
                  "Filter by hours to expiry - from 1 hour to 30 days",
                  "Set probability threshold to focus on near-certain outcomes",
                  "Real-time volume data for every market so you know liquidity",
                ],
                reverse: true,
              },
              {
                icon: RefreshCw,
                title: "Set It and Forget It",
                points: [
                  "Auto-refresh every 1, 5, or 10 minutes",
                  "New opportunities appear automatically as markets update",
                  "One-click to open any market directly on Polymarket",
                ],
                reverse: false,
              },
              {
                icon: Lock,
                title: "Your Data Stays Yours",
                points: [
                  "Runs 100% in your browser - nothing is sent to external servers",
                  "Zero data collection, zero tracking, zero analytics",
                  "No account or login required - install and start immediately",
                ],
                reverse: true,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10`}
              >
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-5">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <ul className="space-y-3">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-600 text-lg">
                        <Zap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-sm h-56 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200/50 flex items-center justify-center">
                    <feature.icon className="w-20 h-20 text-orange-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500">Three steps. Under 60 seconds.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Install", desc: "Add to Chrome in one click. No signup, no configuration, no permissions to grant.", icon: Chrome },
            { step: 2, title: "Search", desc: "Set your filters: time to expiry, probability threshold. The extension finds the best bets instantly.", icon: Eye },
            { step: 3, title: "Trade", desc: "Click any bet to open it directly on Polymarket. Place your trade in seconds.", icon: MousePointerClick },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-5 text-white text-2xl font-bold shadow-lg shadow-orange-500/25">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join 39+ Traders Finding Better Bets
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Install in under 10 seconds. Start finding sure bets immediately.
          </p>
          <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome — It&apos;s Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">More Polymarket Tools on Calc-Tech.com</h2>
            <p className="text-slate-500">Complete your trading toolkit with these free calculators.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-800">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm">{tool.desc}</p>
                    <span className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm mt-3">
                      Try it <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Ready to Find Your Next Sure Bet?
        </h2>
        <p className="text-lg text-slate-500 mb-8">
          Join traders who let the extension do the scanning so they can focus on trading.
        </p>
        <CTAButton size="xl" />
        <p className="mt-6 text-sm text-slate-400 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> No data collection</span>
          <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Installs in seconds</span>
          <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> 100% private</span>
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Calc-Tech.com. All rights reserved.</p>
          <p className="mt-1">
            Polymarket Sure Bet Finder is not affiliated with or endorsed by Polymarket.
          </p>
        </div>
      </footer>
    </div>
  );
}
