"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Keyboard,
  Command,
  Terminal,
  MessageSquare,
  Moon,
  Shield,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calculator,
  CheckCircle,
  PanelRight,
  BookOpen,
  FileText,
  Clipboard,
  Repeat,
  MousePointerClick,
} from "lucide-react";

// Will be replaced once the extension is approved on the Chrome Web Store.
const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/codex-for-chrome-chatgpt-sidebar/__EXTENSION_ID__";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
    >
      <Sparkles className="w-5 h-5" />
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

function SidePanelMockup() {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-w-sm w-full">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-700">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="text-slate-100 font-semibold text-sm">
          Codex for Chrome
        </span>
        <Moon className="w-3.5 h-3.5 text-slate-500 ml-auto" />
      </div>
      {/* Tabs */}
      <div className="px-4 pt-3 flex gap-4 text-xs border-b border-slate-700">
        <span className="text-emerald-400 font-semibold border-b-2 border-emerald-400 pb-2">
          Prompts
        </span>
        <span className="text-slate-500 pb-2">Shortcuts</span>
      </div>
      {/* Prompt cards */}
      <div className="px-4 py-4 space-y-3 text-xs">
        <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
          Code
        </p>
        {[
          "Explain this code step by step",
          "Find all bugs and explain each one",
          "Write unit tests for this",
        ].map((t) => (
          <div
            key={t}
            className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
          >
            <span>{t}</span>
            <Clipboard className="w-3 h-3 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        ))}
        <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] pt-1">
          Review
        </p>
        {["Act as a senior engineer and code review this"].map((t) => (
          <div
            key={t}
            className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
          >
            <span>{t}</span>
            <Clipboard className="w-3 h-3 text-slate-500 flex-shrink-0 ml-2" />
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-slate-800/60 border-t border-slate-700 text-[10px] text-slate-400 text-center">
        Click any prompt to insert it into the chat input
      </div>
    </div>
  );
}

export default function CodexForChromePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it really free?",
      a: "Yes — 100% free. No subscriptions, no paywall, no account required. Install it and start using it immediately.",
    },
    {
      q: "Does it send my chats or data anywhere?",
      a: "No. The extension reads nothing from your conversations and sends no data to any server. There are no analytics, no tracking pixels, and no third-party scripts. The only thing it stores is your theme preference (dark or light), saved locally in your own browser.",
    },
    {
      q: "Which sites does it work on?",
      a: "ChatGPT (chatgpt.com), OpenAI (openai.com), Codex (codex.com), and Sora (sora.com). It stays completely inactive everywhere else — it only adds its helper button on those pages.",
    },
    {
      q: "How do I open the side panel?",
      a: "Click the Codex for Chrome icon in your Chrome toolbar (pin it from the puzzle-piece menu so it's always visible), or click the small ⚡ button that appears next to the chat input on ChatGPT and Codex. The panel slides in from the side.",
    },
    {
      q: "What's inside the panel?",
      a: "Two tabs. \"Prompts\" gives you 30+ ready-to-use templates grouped into Code, Review, Clarity, and Debug — click one to drop it straight into the chat box. \"Shortcuts\" is a full cheatsheet of every ChatGPT and Codex keyboard shortcut, so you never have to hunt for them again.",
    },
    {
      q: "Is this affiliated with OpenAI?",
      a: "No. This is an independent third-party tool and is not affiliated with, endorsed by, or officially connected to OpenAI. ChatGPT and Codex are trademarks of OpenAI.",
    },
    {
      q: "How do I uninstall it?",
      a: "Right-click the extension icon in Chrome → \"Remove from Chrome\". That's it — no leftover files, no account to delete.",
    },
  ];

  const relatedTools = [
    {
      name: "ChatGPT Conversation Export",
      href: "/extensions/chatgpt-conversation-export",
      icon: FileText,
    },
    {
      name: "AI Chat Summarizer for WhatsApp",
      href: "/extensions/whatsapp-ai-summarizer",
      icon: MessageSquare,
    },
    {
      name: "Read Aloud TTS",
      href: "/read-aloud-tts",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
                Free Chrome Extension
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Your ChatGPT &amp; Codex Power-Up, One Click Away
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                A clean side panel inside ChatGPT, OpenAI and Codex — with
                ready-to-use prompt templates and every keyboard shortcut, so
                you stop retyping and start shipping.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> One-click prompts
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> No data collected
                </span>
                <span>&bull;</span>
                <span>No account needed</span>
                <span>&bull;</span>
                <span>Free</span>
              </p>
            </div>
            <div className="flex-shrink-0 lg:rotate-1">
              <SidePanelMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">Works in ChatGPT, OpenAI &amp; Codex</span>
          </div>
          <div className="flex items-center gap-2">
            <Clipboard className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">30+ Ready-to-Use Prompts</span>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">Light &amp; Dark Mode</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            The Little Frictions That Add Up
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            None of these are big on their own. Stacked across a day of working
            inside ChatGPT and Codex, they cost you real focus.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Repeat,
                title: "Retyping the Same Prompts",
                desc: "&quot;Explain this code&quot;, &quot;write tests&quot;, &quot;refactor this&quot; — you type the same instructions a dozen times a day instead of reusing them.",
              },
              {
                icon: Keyboard,
                title: "Hunting for Shortcuts",
                desc: "You know there&apos;s a shortcut for a new chat or to run a Codex task — but you can never remember it, so you reach for the mouse every time.",
              },
              {
                icon: MousePointerClick,
                title: "Context-Switching Kills Flow",
                desc: "Opening a notes app to grab a saved prompt, or a help page to look up a shortcut, pulls you out of the conversation you&apos;re in the middle of.",
              },
            ].map((card, i) => (
              <Card
                key={i}
                className="border-t-4 border-t-emerald-500 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <card.icon className="w-8 h-8 text-emerald-500 mb-2" />
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-slate-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                  />
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
            Everything You Reach For, Right Beside the Chat
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            One side panel, two tabs, zero setup. It lives inside ChatGPT and
            Codex so your tools never leave the page.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-emerald-500 text-sm font-bold uppercase tracking-wider">
                  Prompt Templates
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Insert a Great Prompt in One Click
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  30+ curated prompts, grouped into Code, Review, Clarity, and
                  Debug. Click one and it drops straight into the chat input —
                  no retyping, no copy-paste from a notes app.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    &quot;Explain this code&quot;, &quot;write unit tests&quot;, &quot;find all bugs&quot; and more
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Inserted directly into the ChatGPT / Codex input box
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Also copied to your clipboard as a backup
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Clipboard className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    30+ One-Click Prompts
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Code · Review · Clarity · Debug
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-emerald-500 text-sm font-bold uppercase tracking-wider">
                  Keyboard Shortcuts Cheatsheet
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Every ChatGPT &amp; Codex Shortcut, On Demand
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Stop guessing. The Shortcuts tab lists every keyboard shortcut
                  for ChatGPT and Codex — navigation, editing, conversations,
                  models, and Codex tasks — without leaving the page.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Command className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    New chat, toggle sidebar, focus input, search chats
                  </li>
                  <li className="flex items-start gap-2">
                    <Command className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Codex: submit task, stop task, open in VS Code
                  </li>
                  <li className="flex items-start gap-2">
                    <Command className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Learn them faster, work without the mouse
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Keyboard className="w-16 h-16 text-sky-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Full Shortcut Reference
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Navigation · Editing · Codex · Browser
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-emerald-500 text-sm font-bold uppercase tracking-wider">
                  Built-In Side Panel
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Always One Click Away — Never in Your Way
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Open the panel from the toolbar icon, or tap the small ⚡
                  button added right next to the chat input. It slides in beside
                  your conversation instead of covering it.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <PanelRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Native Chrome side panel — doesn&apos;t hide the chat
                  </li>
                  <li className="flex items-start gap-2">
                    <PanelRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Inline ⚡ button on ChatGPT and Codex pages
                  </li>
                  <li className="flex items-start gap-2">
                    <PanelRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Open and close it without breaking your flow
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <PanelRight className="w-16 h-16 text-violet-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Lives Inside ChatGPT
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Side panel + inline ⚡ launcher
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-emerald-500 text-sm font-bold uppercase tracking-wider">
                  Lightweight &amp; Private
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Fast, Distraction-Free, and Zero Tracking
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  No bloat, no accounts, no analytics. The extension reads
                  nothing from your conversations and sends no data anywhere.
                  Switch between dark and light mode to match how you work.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    No data collected, sent, or sold — ever
                  </li>
                  <li className="flex items-start gap-2">
                    <Moon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Dark &amp; light mode, saved on your device
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    Tiny footprint — only active on OpenAI sites
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    No Tracking, No Account
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Your conversations stay yours
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
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-300" />
            {[
              {
                step: 1,
                title: "Install",
                desc: "One click to add from the Chrome Web Store. No signup, no setup.",
              },
              {
                step: 2,
                title: "Pin & Open",
                desc: "Pin the icon from the puzzle-piece menu, then open the side panel on ChatGPT or Codex.",
              },
              {
                step: 3,
                title: "Work Faster",
                desc: "Insert prompts in one click and check any shortcut without leaving the chat.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
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
      <section className="py-14 md:py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Make ChatGPT &amp; Codex Faster — Free
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. No account, no signup, no tracking.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Built for Anyone Living Inside ChatGPT &amp; Codex
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            If you use AI every day, this saves you small bits of time that
            stack up fast.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Terminal, title: "Developers", desc: "Reuse code prompts and run Codex tasks without leaving flow." },
              { icon: Sparkles, title: "Prompt Engineers", desc: "Keep your go-to prompts one click from the chat box." },
              { icon: FileText, title: "Writers & Students", desc: "Summarize, rewrite, and clarify with ready-made prompts." },
              { icon: Zap, title: "AI Power Users", desc: "Anyone who uses ChatGPT or Codex daily and hates friction." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200"
              >
                <item.icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-800 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-slate-50">
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

      {/* Related Extensions */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
            More Chrome Extensions on Calc-Tech.com
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Explore our other free browser extensions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <tool.icon className="w-8 h-8 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
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
            Stop Retyping. Start Shipping.
          </h2>
          <p className="text-slate-400 mb-8">
            Prompt templates and every shortcut, one click away inside ChatGPT
            and Codex. Free, forever.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Free</span>
            <span>&bull;</span>
            <span>No account required</span>
            <span>&bull;</span>
            <span>No data collected</span>
            <span>&bull;</span>
            <span>Install in 10 seconds</span>
          </p>
        </div>
      </section>

      {/* Trademark disclaimer */}
      <section className="bg-slate-950 border-t border-slate-800 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            This extension is an independent third-party tool and is not
            affiliated with, endorsed by, or officially connected to OpenAI.
            ChatGPT and Codex are trademarks of OpenAI.
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
