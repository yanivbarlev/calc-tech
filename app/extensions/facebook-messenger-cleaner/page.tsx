"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Trash2,
  Shield,
  Archive,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calculator,
  MessageSquare,
  CheckCircle2,
  Clock,
  Eye,
  Lock,
  MousePointerClick,
  ShoppingBag,
  Download,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/facebook-messenger-free-c/jkbbkoafdhmndncinhackofcdhmimlig";

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

function CleanupMockup() {
  const chats = [
    { name: "Marketplace: iPhone seller", status: "deleted", time: "just now" },
    { name: "Marketplace: Couch buyer", status: "deleted", time: "1s ago" },
    { name: "Old group chat (2019)", status: "archived", time: "2s ago" },
    { name: "Spam account", status: "deleting", time: "now" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <Trash2 className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-white font-semibold text-sm">
          Messenger Cleaner
        </span>
        <span className="ml-auto text-blue-100 text-xs">In progress</span>
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      <div className="divide-y divide-slate-100">
        {chats.map((chat, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                chat.status === "deleted"
                  ? "bg-red-50"
                  : chat.status === "archived"
                  ? "bg-amber-50"
                  : "bg-slate-100"
              }`}
            >
              {chat.status === "deleted" ? (
                <Trash2 className="w-4 h-4 text-red-500" />
              ) : chat.status === "archived" ? (
                <Archive className="w-4 h-4 text-amber-500" />
              ) : (
                <Clock className="w-4 h-4 text-slate-400 animate-spin" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800 truncate">
                {chat.name}
              </div>
              <div className="text-xs text-slate-400 capitalize">
                {chat.status} &bull; {chat.time}
              </div>
            </div>
            {chat.status !== "deleting" && (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">127 cleaned</span>
        <span className="text-xs font-semibold text-blue-600">
          Keep going...
        </span>
      </div>
    </div>
  );
}

export default function MsgEraserPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it really free?",
      a: "Yes, completely free. No premium tier, no hidden costs, no ads. Delete or archive as many chats as you want.",
    },
    {
      q: "Does it delete Marketplace conversations too?",
      a: "Yes. Buy/Sell Marketplace messages are a separate folder that Facebook hides — the extension handles those alongside your regular inbox.",
    },
    {
      q: "Can I archive instead of delete?",
      a: "Yes. Choose 'Archive All' to keep your chats searchable but out of your main inbox, or 'Delete All' to remove them permanently.",
    },
    {
      q: "Is this reversible?",
      a: "Deleting a Messenger conversation is permanent on your account — Facebook does not provide a way to restore deleted chats. If you want a safety net, use Archive instead.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. The extension works entirely inside your own browser session on facebook.com. Nothing is sent to any server. No account or login is required beyond your normal Facebook login.",
    },
    {
      q: "Will Facebook block my account for using this?",
      a: "The extension uses the same delete/archive buttons Facebook already exposes — it just clicks them for you. It does not use the API or scrape anything. That said, very large cleanups may trigger temporary rate limits from Facebook.",
    },
  ];

  const relatedTools = [
    { name: "WhatsApp Chat Export", href: "/extensions/whatsapp-chat-export", icon: MessageSquare },
    { name: "ChatGPT Conversation Export", href: "/extensions/chatgpt-conversation-export", icon: MessageSquare },
    { name: "Telegram Video Downloader", href: "/extensions/telegram-video-downloader", icon: Download },
    { name: "Whale Tracker Extension", href: "/extensions/whale-tracker", icon: Zap },
    { name: "Sure Bet Finder Extension", href: "/extensions/sure-bet-finder", icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-4">
                Free Chrome Extension
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Bulk Delete All Your Facebook Messenger Chats
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Wipe or archive every Messenger conversation with a single
                click — including Marketplace Buy/Sell messages Facebook hides
                in a separate folder.
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
                  <Zap className="w-3.5 h-3.5" /> One-click cleanup
                </span>
                <span>&bull;</span>
                <span>Covers Marketplace</span>
              </p>
            </div>
            <div className="flex-shrink-0 lg:rotate-1">
              <CleanupMockup />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Bulk Delete</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Includes Marketplace</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Featured on Calc-Tech.com</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Facebook Makes Cleaning Messenger Nearly Impossible
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Years of conversations pile up. Deleting them one at a time is
            painful. And Marketplace messages are hidden in their own folder
            most people never find.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "One-By-One Is Brutal",
                desc: "Deleting each chat manually — 3 clicks per conversation — turns into hours of mindless work for heavy users.",
              },
              {
                icon: ShoppingBag,
                title: "Marketplace Is Hidden",
                desc: "Buy/Sell messages live in a separate inbox most people never clear. They pile up for years without you knowing.",
              },
              {
                icon: Eye,
                title: "No Bulk Action",
                desc: "Messenger offers no 'select all' or bulk delete. Facebook wants your history sticky — you want it gone.",
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

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Clear Your Messenger the Way Facebook Won&apos;t Let You
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            One click, every conversation, done.
          </p>

          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Bulk Actions
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Delete or Archive Every Chat in One Click
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  No more deleting one conversation at a time. Click once, walk
                  away, come back to a clean inbox.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Trash2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Delete all chats permanently
                  </li>
                  <li className="flex items-start gap-2">
                    <Archive className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Or archive them for a safer, reversible clean-up
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Progress counter shows exactly how many are processed
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Trash2 className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    One-Click Wipe
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Hundreds of chats, minutes of cleaning
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Marketplace Included
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Cleans the Marketplace Inbox Most People Forget
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Buy and sell messages from Facebook Marketplace live in a
                  separate hidden folder. The extension cleans both your main
                  inbox and that Marketplace folder in the same run.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Handles Marketplace Buy/Sell messages
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Covers group chats and regular DMs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    No manual switching between folders
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Marketplace Covered
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Even the hidden inbox
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Private By Default
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Runs Entirely in Your Browser
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  No servers, no API access, no third parties. The extension
                  operates inside your own Facebook tab using the same buttons
                  you would click yourself — just much faster.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Zero data leaves your device
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    No sign-up, no additional login
                  </li>
                  <li className="flex items-start gap-2">
                    <MousePointerClick className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Uses Facebook&apos;s own UI actions
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    100% Local
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Your data stays yours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-14">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-300" />
            {[
              {
                step: 1,
                title: "Install",
                desc: "Add the extension from the Chrome Web Store. A quick tutorial shows you where the button lives.",
              },
              {
                step: 2,
                title: "Open Messenger",
                desc: "Go to facebook.com/messages (or the Marketplace inbox). The extension injects a cleaner button into the page.",
              },
              {
                step: 3,
                title: "Clean It All",
                desc: "Click Delete All or Archive All. Walk away. Come back to an empty inbox.",
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

      <section className="py-14 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Get a Clean Messenger Inbox in Minutes
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. Free forever. No account needed.
          </p>
          <CtaButton />
        </div>
      </section>

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

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            More Helpful Tools on Calc-Tech.com
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Chrome extensions built to save you time.
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

      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Years of Messenger Clutter, Cleaned in One Click
          </h2>
          <p className="text-slate-400 mb-8">
            Stop scrolling through ancient chats. Wipe the slate clean.
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
