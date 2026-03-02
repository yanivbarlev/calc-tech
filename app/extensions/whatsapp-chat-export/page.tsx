"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Shield,
  FileText,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  MessageSquare,
  Users,
  Clock,
  FileSpreadsheet,
  Lock,
  Image,
  CheckCircle,
  Settings,
  HelpCircle,
  Calculator,
  Globe,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/whatsapp-chat-export/bkihkkemmppahmeemokpkmjdjfgmjdib";

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
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

function ExportMockup() {
  const chats = [
    { name: "Family Group", messages: "2,847", lastMsg: "Mom: See you Sunday!", selected: true },
    { name: "Work Team", messages: "1,203", lastMsg: "Alice: Meeting at 3pm", selected: true },
    { name: "John Smith", messages: "956", lastMsg: "Thanks for the update!", selected: false },
    { name: "Book Club", messages: "412", lastMsg: "Next book: Dune", selected: false },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-white font-semibold text-sm">
          WhatsApp Chat Export
        </span>
        <span className="ml-auto text-green-100 text-xs">Ready</span>
      </div>
      <div className="px-3 py-2 border-b border-slate-100 flex gap-2 text-xs text-slate-500">
        <span className="bg-green-50 text-green-600 px-2 py-1 rounded font-medium">2 selected</span>
        <span className="bg-slate-100 px-2 py-1 rounded">Format: PDF</span>
        <span className="bg-slate-100 px-2 py-1 rounded">All dates</span>
      </div>
      <div className="divide-y divide-slate-100">
        {chats.map((chat, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center gap-3">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${chat.selected ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
              {chat.selected && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{chat.name}</p>
              <p className="text-xs text-slate-400 truncate">{chat.lastMsg}</p>
            </div>
            <span className="text-xs text-slate-400">{chat.messages} msgs</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold text-center py-2 rounded-lg">
          Export Selected Chats
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppChatExportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is WhatsApp Chat Export free?",
      a: "The free plan lets you export up to 100 messages per chat in text format. The Pro plan unlocks unlimited messages, all export formats (PDF, HTML, CSV, Text), media export, and contact and group participant export.",
    },
    {
      q: "Does it collect my data?",
      a: "No. All processing happens locally in your browser. No chat data, messages, or personal information is sent to any external server. Your conversations stay completely private.",
    },
    {
      q: "What export formats are supported?",
      a: "You can export chats as plain text (.txt), PDF documents, HTML web view with full formatting, and CSV for spreadsheets. The free plan supports text format, while Pro unlocks all formats.",
    },
    {
      q: "Do I need to install WhatsApp on my computer?",
      a: "No. The extension works with WhatsApp Web (web.whatsapp.com) in your browser. Just open WhatsApp Web, click the extension icon, and start exporting.",
    },
    {
      q: "Can I export media like photos and videos?",
      a: "Yes, with the Pro plan you can export chats with media attachments included. The HTML export format preserves images and formatting for a complete record of your conversations.",
    },
  ];

  const relatedTools = [
    { name: "Sure Bet Finder", href: "/extensions/sure-bet-finder", icon: Zap },
    { name: "Whale Tracker", href: "/extensions/whale-tracker", icon: Users },
    { name: "PolyGuide", href: "/extensions/polyguide", icon: Globe },
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
                Export Your WhatsApp Chats in One Click
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Save your WhatsApp conversations as PDF, HTML, CSV, or plain
                text. Select individual chats or export everything at once —
                directly from WhatsApp Web.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% private
                </span>
                <span>&bull;</span>
                <span>No data collection</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Multiple formats
                </span>
                <span>&bull;</span>
                <span>4.3 star rating</span>
              </p>
            </div>
            <div className="flex-shrink-0 lg:rotate-1">
              <ExportMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            <span className="font-medium">PDF, HTML, CSV, TXT</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="font-medium">100% Local Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="font-medium">Featured on Calc-Tech.com</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Need to Save Your WhatsApp Conversations?
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            WhatsApp does not make it easy to export or back up your chats in
            a useful format. Important conversations deserve better.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HelpCircle,
                title: "No Built-In Export",
                desc: "WhatsApp Web has no native way to export your chats to PDF, CSV, or any format you can actually use for records, legal, or personal backup.",
              },
              {
                icon: Clock,
                title: "Manual Copy-Paste Wastes Hours",
                desc: "Copying messages one by one is painfully slow. For long conversations with thousands of messages, it is simply not practical.",
              },
              {
                icon: Image,
                title: "Media Gets Lost",
                desc: "Photos, documents, and voice messages shared in chats are difficult to save. Without a proper export tool, your media attachments scatter or disappear.",
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
            Everything You Need to Export WhatsApp Chats
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            A powerful browser extension that turns your WhatsApp Web
            conversations into clean, downloadable files.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Multiple Formats
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Export as PDF, HTML, CSV, or Text
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Choose the format that fits your needs. PDF for sharing and
                  printing, HTML for a rich web view with formatting, CSV for
                  spreadsheets and analysis, or plain text for simplicity.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    PDF documents with full message formatting
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    HTML web view with dark mode support
                  </li>
                  <li className="flex items-start gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    CSV for data analysis in Excel or Google Sheets
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    4 Export Formats
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF, HTML, CSV, and plain text
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Flexible Selection
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Pick Individual Chats or Export All
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Select exactly which conversations you want to save. Export a
                  single important chat, pick a few, or export your entire
                  WhatsApp history in one go.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Select individual or multiple chats
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Custom date ranges to export specific time periods
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Export contacts and group participant lists
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Flexible Selection
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    One chat, many, or all at once
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-green-500 text-sm font-bold uppercase tracking-wider">
                  Media Support
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Export with Photos and Attachments
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Keep your media intact. Export chats with images, documents,
                  and attachments included so you have a complete record of
                  every conversation.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Image className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Photos and images preserved in exports
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Background download mode for large exports
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Choose to include or exclude media per export
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Media Export
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Photos, docs, and attachments included
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
                  Your Chats Stay on Your Machine
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  All processing happens locally in your browser. No messages,
                  contacts, or personal data ever leaves your computer. Your
                  conversations remain completely private.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    100% local processing — nothing sent to servers
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Zero data collection, zero tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    No account or login required
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    100% Private
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    All data stays in your browser
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
                title: "Select Chats",
                desc: "Open WhatsApp Web, click the extension icon, and choose which chats to export.",
              },
              {
                step: 3,
                title: "Download",
                desc: "Pick your format and date range, then download your chats instantly.",
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
            Start Exporting Your WhatsApp Chats Today
          </h2>
          <p className="text-slate-600 mb-8">
            Install in seconds. No account needed. Your data stays private.
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

      {/* Related Extensions */}
      <section className="py-16 md:py-20 bg-slate-50">
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
            Your Conversations Deserve a Backup
          </h2>
          <p className="text-slate-400 mb-8">
            Important chats can disappear. Export them now and keep a permanent
            record of the conversations that matter.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Free to start</span>
            <span>&bull;</span>
            <span>No account required</span>
            <span>&bull;</span>
            <span>100% private</span>
            <span>&bull;</span>
            <span>Install in seconds</span>
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
