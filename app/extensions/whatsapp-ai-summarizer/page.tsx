"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Shield,
  ListChecks,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  MessageSquare,
  Users,
  Lock,
  Inbox,
  CheckCircle,
  Zap,
  Calculator,
  HelpCircle,
  Languages,
  BookOpen,
  FileText,
} from "lucide-react";

// Will be replaced once the extension is approved on the Chrome Web Store.
const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ai-chat-summarizer-for-wh/__EXTENSION_ID__";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
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

function SummaryMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-white" />
        <span className="text-white font-semibold text-sm">
          AI Summary — Family Group
        </span>
        <span className="ml-auto text-green-100 text-xs">3.2s</span>
      </div>
      <div className="px-4 py-3 border-b border-slate-100 flex gap-2 text-xs text-slate-500">
        <span className="bg-green-50 text-green-600 px-2 py-1 rounded font-medium">
          Last 24h
        </span>
        <span className="bg-slate-100 px-2 py-1 rounded">218 messages</span>
        <span className="bg-slate-100 px-2 py-1 rounded">12 people</span>
      </div>

      <div className="px-4 py-4 space-y-4 text-xs">
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
            TL;DR
          </p>
          <p className="text-slate-700 leading-relaxed">
            Mom is hosting Sunday lunch at 1pm. Dad needs help moving the
            piano on Saturday. Lior&apos;s flight lands Friday night — needs
            pickup from TLV.
          </p>
        </div>

        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
            Action items for you
          </p>
          <ul className="space-y-1 text-slate-700">
            <li className="flex gap-2">
              <span className="text-green-500">→</span>
              <span>Confirm pickup time with Lior (Fri 22:40)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">→</span>
              <span>RSVP to Sunday lunch</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
            Decisions
          </p>
          <ul className="space-y-1 text-slate-700">
            <li className="flex gap-2">
              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Gift for grandma: photo album (Yael coordinating)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex gap-2">
        <div className="flex-1 text-[10px] text-slate-500 text-center py-1.5 bg-white border border-slate-200 rounded">
          Copy
        </div>
        <div className="flex-1 text-[10px] text-slate-500 text-center py-1.5 bg-white border border-slate-200 rounded">
          Save .md
        </div>
        <div className="flex-1 text-[10px] text-white text-center py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded font-semibold">
          Summarize Again
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppAiSummarizerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it really free?",
      a: "Yes — fully free during launch. A Pro tier with higher daily limits may launch later, but core summarization stays free.",
    },
    {
      q: "Is my chat data private?",
      a: "Messages from the chat you summarize are sent to our AI provider for that single summary request and are never stored on any server. We don't log them, sell them, or use them for training. Your full chat history stays on your device — only the messages from the scope you pick (e.g. \"Last 24 hours\") are sent for that one summary.",
    },
    {
      q: "Does it work on the WhatsApp mobile app?",
      a: "No. This is a Chrome extension for WhatsApp Web (web.whatsapp.com) only. WhatsApp's mobile apps don't allow extensions. Pair it with WhatsApp Web on your laptop to catch up before opening your phone.",
    },
    {
      q: "What does the summary actually include?",
      a: "Four sections: a 1-2 sentence TL;DR, the key topics discussed, action items specifically directed at you, and any decisions the group made. You can hide sections you don't care about in the extension options.",
    },
    {
      q: "What languages are supported?",
      a: "The summary is automatically written in the same language as the chat. Tested on English, Spanish, Portuguese, Hebrew, Arabic, Hindi, Russian, French, German, Italian, Dutch, Turkish, and 15+ more.",
    },
    {
      q: "Is this affiliated with WhatsApp or Meta?",
      a: "No. WhatsApp is a trademark of Meta Platforms, Inc. This extension is an independent third-party tool and is not endorsed by or affiliated with WhatsApp Inc. or Meta Platforms, Inc.",
    },
    {
      q: "How do I uninstall it?",
      a: "Right-click the extension icon in Chrome → \"Remove from Chrome\". That's it. No leftover files, no account to delete.",
    },
  ];

  const relatedTools = [
    {
      name: "WhatsApp Chat Export",
      href: "/extensions/whatsapp-chat-export",
      icon: FileText,
    },
    {
      name: "ChatGPT Conversation Export",
      href: "/extensions/chatgpt-conversation-export",
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
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
                Free Chrome Extension
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Catch Up on Any WhatsApp Chat in 3 Seconds
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                AI reads your unread messages so you don&apos;t have to. Get a
                TL;DR, the decisions made, and what people need from you — right
                inside WhatsApp Web.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> 3-second summaries
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> No messages stored
                </span>
                <span>&bull;</span>
                <span>No account needed</span>
                <span>&bull;</span>
                <span>Free</span>
              </p>
            </div>
            <div className="flex-shrink-0 lg:rotate-1">
              <SummaryMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="font-medium">Powered by Llama 3.3 70B</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="font-medium">Zero Message Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-green-500" />
            <span className="font-medium">25+ Languages Supported</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Drowning in WhatsApp?
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            The family group has 200+ unread. Work chat moved while you were in
            meetings. Scrolling and re-reading is killing your time.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Inbox,
                title: "Unread Counts in the Hundreds",
                desc: "You step away for half a day and come back to 247 unread messages across five groups. Scrolling each one is a full hour you don&apos;t have.",
              },
              {
                icon: Clock,
                title: "Important Stuff Buried in Noise",
                desc: "The actual question someone asked you is hidden between memes, voice notes, and 30 reactions. By the time you find it, the moment is gone.",
              },
              {
                icon: HelpCircle,
                title: "&quot;Wait, What Did We Decide?&quot;",
                desc: "Group chats make decisions in real time — and forget them just as fast. You agreed to something on Tuesday and now nobody can remember what.",
              },
            ].map((card, i) => (
              <Card
                key={i}
                className="border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <card.icon className="w-8 h-8 text-green-500 mb-2" />
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
            Built for People Who Don&apos;t Have Time to Scroll
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            One click summarizes any chat. The summary is opinionated about what
            matters — so you can act, not read.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  One Click Inside WhatsApp Web
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  No New App. No Copy-Paste.
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  A small green &quot;Summarize&quot; button is added directly
                  to the WhatsApp Web chat header. Click it, and the AI summary
                  appears in a side panel right next to your conversation.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Native to WhatsApp Web — no separate app or website
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Side panel doesn&apos;t hide the chat
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Works on group chats and 1-on-1 conversations
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Lives Inside WhatsApp Web
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    One click, summary appears in the side panel
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Structured Summary
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  TL;DR, Decisions, and What You Owe People
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Every summary breaks the chat into four sections so you can
                  scan it in seconds. No wall of text — just the parts you need
                  to act on.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>TL;DR</strong> — 1-2 sentences capturing the gist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Key topics</strong> — what was discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Action items for you</strong> — what people need from YOU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Decisions</strong> — what was agreed on</span>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <ListChecks className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    4 Smart Sections
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    TL;DR · Topics · Actions · Decisions
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Choose Your Scope
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Summarize Only What You Missed
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Pick how much of the chat to summarize: unread messages only,
                  today, the last 24 hours, or the last 7 days. The AI doesn&apos;t
                  re-read what you&apos;ve already seen.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Unread / Today / Last 24h / Last 7 days
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Last 20 summaries saved per chat — scroll back later
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Copy to clipboard or save as Markdown / Text
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Time-Range Filters
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Only summarize what you actually missed
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Privacy First
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Your Messages Are Never Stored
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Messages from the chat you summarize go to our AI provider for
                  that one summary — and that&apos;s it. No logging, no training,
                  no selling. Your settings and summary history live in your
                  browser, not on any server.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Messages never stored on any server
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Per-chat opt-out — mark sensitive chats &quot;never summarize&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Permission only for web.whatsapp.com — nothing else
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Zero Storage Policy
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Your chats are not logged, sold, or used for training
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
                desc: "One click to add from the Chrome Web Store. No signup or configuration needed.",
              },
              {
                step: 2,
                title: "Open a Chat",
                desc: "Go to web.whatsapp.com, open any chat, and click the green Summarize button in the header.",
              },
              {
                step: 3,
                title: "Read & Act",
                desc: "TL;DR, action items, and decisions appear in 3 seconds. Copy or save the summary.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
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
      <section className="py-14 md:py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Save Hours Every Week — Free
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. No account, no signup, no messages stored.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Built for People with 3+ Active Group Chats
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            If you keep losing the thread, this is for you.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "Group Admins", desc: "Family, school, building, and class groups that never stop moving." },
              { icon: Sparkles, title: "Busy Professionals", desc: "Work chats that pile up while you're in meetings." },
              { icon: Inbox, title: "Returning From Time Off", desc: "Holidays, sick days, or just a long weekend — catch up fast." },
              { icon: Clock, title: "Multi-Group Members", desc: "Anyone with 3+ active groups they can't keep up with." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl p-5 text-center border border-slate-200"
              >
                <item.icon className="w-8 h-8 text-green-500 mx-auto mb-3" />
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
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all group"
              >
                <tool.icon className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
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
            Stop Scrolling. Start Catching Up.
          </h2>
          <p className="text-slate-400 mb-8">
            One click summarizes any WhatsApp chat in 3 seconds. Free during
            launch.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Free</span>
            <span>&bull;</span>
            <span>No account required</span>
            <span>&bull;</span>
            <span>Messages never stored</span>
            <span>&bull;</span>
            <span>Install in 10 seconds</span>
          </p>
        </div>
      </section>

      {/* Trademark disclaimer */}
      <section className="bg-slate-950 border-t border-slate-800 py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            WhatsApp is a trademark of Meta Platforms, Inc. This extension is an
            independent third-party tool and is not endorsed by or affiliated
            with WhatsApp Inc. or Meta Platforms, Inc.
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
