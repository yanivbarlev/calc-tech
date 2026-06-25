import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  CircleDollarSign,
  ExternalLink,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Product = {
  name: string;
  href: string;
  badge: string;
  price: string;
  billing: string;
  summary: string;
  freeTier: string;
  proTier: string;
};

type FreeExtension = {
  name: string;
  href: string;
  status: string;
  summary: string;
};

const paidProducts: Product[] = [
  {
    name: "ChatGPT Conversation Export",
    href: "/extensions/chatgpt-conversation-export",
    badge: "Free trial + subscription",
    price: "$1.99",
    billing: "per month",
    summary:
      "Export ChatGPT conversations as PDF, Markdown, Text, CSV, JSON, or Image.",
    freeTier: "5 free exports in any format. Copy to clipboard is unlimited.",
    proTier: "Unlimited exports, branding removal, and muted notifications.",
  },
  {
    name: "Stream Saver",
    href: "/extensions/streamsaver",
    badge: "Free tier + lifetime PRO",
    price: "$4.99",
    billing: "one-time",
    summary:
      "Download HLS streams and direct MP4 videos from supported websites.",
    freeTier: "5 downloads per day.",
    proTier: "Unlimited downloads and all future PRO features.",
  },
  {
    name: "Volume Booster + Equalizer Pro",
    href: "/extensions/volume-booster-equalizer-pro",
    badge: "Free tier + lifetime PRO",
    price: "$4.99",
    billing: "one-time",
    summary:
      "Boost browser tab audio and unlock a 5-band equalizer with PRO.",
    freeTier: "Up to 600% volume boost and three built-in presets.",
    proTier:
      "1000% boost, 5-band EQ, custom presets, per-site memory, and shortcuts.",
  },
  {
    name: "WhatsApp Chat Export",
    href: "/extensions/whatsapp-chat-export",
    badge: "Free tier + lifetime PRO",
    price: "$4.99",
    billing: "one-time",
    summary:
      "Export WhatsApp Web chats as text, PDF, HTML, or CSV with optional media.",
    freeTier: "Up to 100 messages per chat and unlimited TXT exports.",
    proTier:
      "Unlimited messages, HTML/CSV/PDF formats, media, contacts, and groups.",
  },
  {
    name: "WhatsApp Chat Export - Turkish",
    href: "/extensions/whatsapp-export-tr",
    badge: "Free tier + lifetime PRO",
    price: "$4.99",
    billing: "one-time",
    summary:
      "Turkish localized WhatsApp export extension for WhatsApp Web backups.",
    freeTier: "Up to 100 messages per chat and unlimited TXT exports.",
    proTier:
      "Unlimited messages, HTML/CSV, media export, contacts, and group data.",
  },
  {
    name: "Exportar Chat WhatsApp - Spanish",
    href: "/extensions/whatsapp-export-es/thank-you",
    badge: "Lifetime PRO",
    price: "$7.99",
    billing: "one-time",
    summary:
      "Spanish localized WhatsApp export extension with PRO license activation.",
    freeTier:
      "Free install may be available through the extension listing, depending on the current store release.",
    proTier:
      "Lifetime PRO license with future PRO updates included. No subscription.",
  },
  {
    name: "Telegram Video Downloader",
    href: "/extensions/telegram-video-downloader",
    badge: "Try free + PRO",
    price: "Shown at checkout",
    billing: "one-time PRO upgrade",
    summary:
      "Download Telegram Web videos, photos, documents, and large files.",
    freeTier: "Limited free downloads to try the extension.",
    proTier: "Unlimited downloads. No subscription.",
  },
];

const freeExtensions: FreeExtension[] = [
  {
    name: "AI Chat Summarizer for WhatsApp",
    href: "/extensions/whatsapp-ai-summarizer",
    status: "Free during launch",
    summary:
      "Summarizes WhatsApp chats. A higher-limit PRO tier may be added later, but core summarization stays free.",
  },
  {
    name: "Codex for Chrome",
    href: "/extensions/codex-for-chrome",
    status: "Free",
    summary:
      "ChatGPT and Codex prompt templates and keyboard shortcuts. No paywall.",
  },
  {
    name: "Facebook Messenger Cleaner",
    href: "/extensions/facebook-messenger-cleaner",
    status: "Free forever",
    summary:
      "Bulk delete or archive Messenger conversations. No premium tier.",
  },
  {
    name: "PolyGuide",
    href: "/extensions/polyguide",
    status: "Free forever",
    summary:
      "Polymarket education overlay, glossary, and learning progress tools.",
  },
  {
    name: "Polymarket Sure Bet Finder",
    href: "/extensions/sure-bet-finder",
    status: "Free forever",
    summary:
      "Find high-probability Polymarket bets that are close to expiry.",
  },
  {
    name: "Polymarket Whale Tracker",
    href: "/extensions/whale-tracker",
    status: "Free forever",
    summary:
      "Track large Polymarket trades and get alerts when smart money moves.",
  },
  {
    name: "Video Snapshot for YouTube",
    href: "/extensions/video-snapshot-youtube",
    status: "Free",
    summary:
      "Capture YouTube video frames and thumbnails. Free, private, no account.",
  },
  {
    name: "CleanTube",
    href: "/extensions/cleantube/welcome",
    status: "Free",
    summary:
      "YouTube cleanup controls with all toggle options included. No subscription.",
  },
  {
    name: "Read Aloud TTS",
    href: "/read-aloud-tts",
    status: "Free",
    summary:
      "Text-to-speech reader with voice picker, speed control, and highlighting.",
  },
];

const supportOnlyExtensions: FreeExtension[] = [
  {
    name: "WhatsApp Chat Export & Backup",
    href: "https://www.downloads.services/whatsapp",
    status: "External product page",
    summary:
      "External WhatsApp export and backup product linked from the Calc-Tech homepage. Pricing is shown on its own product page.",
  },
  {
    name: "Exportar Chat WhatsApp - Privacy",
    href: "/extensions/exportar-chat-whatsapp/privacy",
    status: "Support page",
    summary:
      "Privacy information for the Spanish WhatsApp export extension.",
  },
];

function Header() {
  return (
    <header className="relative border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Calculator className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calc-Tech.com
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-12">
            <CircleDollarSign className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pricing
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Clear pricing for Calc-Tech browser extensions. Many extensions
              are completely free. Some include a free tier and an optional PRO
              upgrade for higher limits or advanced features.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white rounded-2xl border-2 p-6 shadow-sm">
              <Sparkles className="h-7 w-7 text-blue-600 mb-3" />
              <h2 className="font-bold text-slate-900 mb-2">Free Tools</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Several extensions are free forever with no paid tier.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 p-6 shadow-sm">
              <CheckCircle className="h-7 w-7 text-emerald-600 mb-3" />
              <h2 className="font-bold text-slate-900 mb-2">Optional PRO</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paid upgrades are optional and listed before purchase.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 p-6 shadow-sm">
              <Shield className="h-7 w-7 text-purple-600 mb-3" />
              <h2 className="font-bold text-slate-900 mb-2">Secure Checkout</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Checkout may be handled by Paddle or another authorized payment
                provider, depending on the product.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Paid and Freemium Extensions
                </h2>
                <p className="text-slate-600 mt-2">
                  Free to try or free to use, with paid upgrades where shown.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {paidProducts.map((product) => (
                <Card
                  key={product.name}
                  className="border-2 rounded-2xl shadow-lg bg-white"
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
                          {product.badge}
                        </span>
                        <CardTitle className="text-2xl text-slate-900">
                          {product.name}
                        </CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-extrabold text-slate-900">
                          {product.price}
                        </div>
                        <div className="text-xs text-slate-500">
                          {product.billing}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-slate-600 leading-relaxed">
                      {product.summary}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-slate-50 p-4 border">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          Free tier
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {product.freeTier}
                        </p>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          PRO upgrade
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {product.proTier}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      View product page
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Free Extensions
            </h2>
            <p className="text-slate-600 mb-6">
              These extensions are currently free or free during launch.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeExtensions.map((extension) => (
                <Link
                  key={extension.name}
                  href={extension.href}
                  className="block bg-white rounded-2xl border-2 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 mb-3">
                    {extension.status}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {extension.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {extension.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Other Extension Pages
            </h2>
            <p className="text-slate-600 mb-6">
              These are support, privacy, localized, or activation pages tied to
              extension products.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {supportOnlyExtensions.map((extension) => (
                <Link
                  key={extension.name}
                  href={extension.href}
                  className="block bg-white rounded-2xl border-2 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 mb-3">
                    {extension.status}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {extension.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {extension.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border-2 shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Billing, Taxes, and Refunds
            </h2>
            <div className="grid md:grid-cols-3 gap-5 text-sm text-slate-600 leading-relaxed">
              <p>
                Prices are shown in USD unless the checkout page displays a
                localized currency.
              </p>
              <p>
                Taxes may be calculated and collected by the payment provider at
                checkout based on your location.
              </p>
              <p>
                Refund terms are explained on our{" "}
                <Link
                  href="/refund-policy"
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  Refund Policy
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative mt-20 border-t bg-white/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 mb-6">
            <Link href="/terms" className="hover:text-blue-600 font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 font-medium">
              Privacy Policy
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-blue-600 font-medium"
            >
              Refund Policy
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            &copy; 2026 Calc-Tech.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
