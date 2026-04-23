"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calculator,
  CheckCircle,
  FileText,
  FileCode,
  Image,
  Table2,
  Braces,
  FileType,
  Download,
  MousePointerClick,
  Clock,
  Search,
  Scissors,
  Monitor,
  Palette,
  ListChecks,
  Lock,
  Zap,
  Star,
  ExternalLink,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/chatgpt-conversation-expo/meemjekapihgngmphphnppghdpjdihag";
const GUMROAD_URL =
  "https://goldbaryaniv.gumroad.com/l/ChatGPTConversationExport";

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
      Add to Chrome — 5 Free Exports
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
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      {/* ChatGPT-style header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3">
        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-0.5">
          ChatGPT Conversation Export
        </p>
        <p className="text-white font-bold text-sm">Export Your Conversation</p>
        <p className="text-slate-400 text-[11px]">
          Choose a format and download instantly.
        </p>
      </div>
      {/* Toolbar row */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2">
            <div className="bg-orange-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-md">
              Select All
            </div>
            <div className="bg-slate-100 text-slate-600 text-[11px] font-medium px-3 py-1.5 rounded-md">
              Deselect All
            </div>
          </div>
          <span className="text-[11px] text-slate-400">12 messages</span>
        </div>
      </div>
      {/* Format selector */}
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-700 mb-2">Export Format</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: "PDF", active: true },
            { name: "Markdown", active: false },
            { name: "Text", active: false },
            { name: "CSV", active: false },
            { name: "JSON", active: false },
            { name: "Image", active: false },
          ].map((fmt) => (
            <div
              key={fmt.name}
              className={`text-[11px] font-medium text-center py-1.5 rounded-md ${
                fmt.active
                  ? "bg-orange-500 text-white"
                  : "bg-slate-50 text-slate-500 border border-slate-200"
              }`}
            >
              {fmt.name}
            </div>
          ))}
        </div>
      </div>
      {/* Export button */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold text-center py-2.5 rounded-lg">
          Export as PDF
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2">
          4 of 5 free exports remaining
        </p>
      </div>
    </div>
  );
}

export default function ChatGPTConversationExportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it free?",
      a: "You get 5 free exports in any format. Copy to clipboard is always free and unlimited. After 5 exports, Pro is $1.99/month.",
    },
    {
      q: "What formats are supported?",
      a: "PDF, Markdown (.md), Plain Text (.txt), CSV, JSON, and Image (PNG). Every format you need for documentation, code repos, data analysis, or sharing.",
    },
    {
      q: "Does it preserve code blocks and math?",
      a: "Yes. Code blocks keep their syntax highlighting and language tags. Math formulas (LaTeX) are preserved. Tables maintain their structure.",
    },
    {
      q: "Is my data safe?",
      a: "The extension runs entirely in your browser. Your conversations are never sent to any server. Export processing happens locally on your machine.",
    },
    {
      q: "How does Pro work?",
      a: "Purchase on Gumroad for $1.99/month. You will receive a license key by email. Enter it in the extension settings to unlock unlimited exports.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, cancel from your Gumroad account anytime. You keep Pro access until the end of your billing period.",
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
                Chrome Extension &middot; 5 Free Exports
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Your ChatGPT Conversations Deserve Better Than a Screenshot
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Export any ChatGPT conversation as a clean PDF, Markdown, Plain
                Text, CSV, JSON, or Image — in seconds.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> 5 free exports
                </span>
                <span>&bull;</span>
                <span>No account required</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% private
                </span>
              </p>
            </div>
            {/* Right - Mockup */}
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
            <FileText className="w-4 h-4 text-orange-500" />
            <span className="font-medium">6 Export Formats</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="font-medium">100% Browser-Based</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Featured on Calc-Tech.com</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            ChatGPT Has No Export Button
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            You spend hours crafting prompts and getting valuable answers. But
            when it comes time to save them, your options are terrible.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Your Best Prompts Disappear",
                desc: "Valuable ChatGPT outputs vanish into an endless scroll. No search, no backup, no way to reuse them.",
              },
              {
                icon: Scissors,
                title: "Copy-Paste Destroys Formatting",
                desc: "Code blocks lose syntax highlighting. Tables break. Math formulas turn into gibberish.",
              },
              {
                icon: Monitor,
                title: "Screenshots Don't Scale",
                desc: "They are unsearchable, uneditable, and look terrible in documents and presentations.",
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
            Export ChatGPT Conversations Your Way
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Six formats, selective export, and pixel-perfect formatting — all
            from a lightweight browser extension.
          </p>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  6 Export Formats
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  PDF, Markdown, Text, CSV, JSON, Image
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Every format you need for docs, code repos, data analysis, or
                  sharing. Each export is clean, well-structured, and ready to
                  use.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    PDF with customizable layout, fonts, and page sizes
                  </li>
                  <li className="flex items-start gap-2">
                    <FileCode className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Markdown perfect for GitHub, Notion, or Obsidian
                  </li>
                  <li className="flex items-start gap-2">
                    <Table2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    CSV and JSON for spreadsheets and data pipelines
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Download className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    6 Formats
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF &middot; Markdown &middot; Text &middot; CSV &middot;
                    JSON &middot; Image
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Selective Export
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Export Exactly What You Need
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Check exactly which messages to include. Export the whole
                  conversation or just the parts that matter. Select all, deselect
                  all, or pick individual messages.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Per-message checkboxes for granular control
                  </li>
                  <li className="flex items-start gap-2">
                    <MousePointerClick className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Select All and Deselect All with one click
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Preview your selection before exporting
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <ListChecks className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Selective Export
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Choose exactly which messages to include
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Perfect Formatting
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Code, Math, and Tables — All Preserved
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Code blocks with syntax highlighting, math formulas, tables,
                  nested lists, images — all preserved exactly as ChatGPT
                  rendered them.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <FileCode className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Syntax highlighting with language tags
                  </li>
                  <li className="flex items-start gap-2">
                    <Table2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Tables, nested lists, and inline formatting
                  </li>
                  <li className="flex items-start gap-2">
                    <Braces className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    LaTeX math formulas stay intact
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <FileCode className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Rich Formatting
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Code blocks &middot; Math &middot; Tables &middot; Images
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Custom PDFs
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Full Control Over Your PDF Output
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Choose page size, margins, fonts, dark or light mode. Add a
                  table of contents. Control page breaks per prompt. Your PDFs,
                  your rules.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Palette className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Dark mode and light mode PDF themes
                  </li>
                  <li className="flex items-start gap-2">
                    <FileType className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Custom fonts, page sizes, and margin control
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Auto-generated table of contents
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Palette className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Custom PDFs
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Page size &middot; Fonts &middot; Dark mode &middot; TOC
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
                desc: "Add to Chrome in one click. Works instantly on chatgpt.com.",
              },
              {
                step: 2,
                title: "Select",
                desc: "Open any ChatGPT conversation. Choose which messages to export.",
              },
              {
                step: 3,
                title: "Export",
                desc: "Pick your format and download. Takes under 10 seconds.",
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
            Start Exporting Your ChatGPT Conversations
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. No account needed. 5 free exports included.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Simple, Fair Pricing
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Start free. Upgrade only if you need unlimited exports.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-slate-400">
              <CardHeader>
                <CardTitle className="text-xl text-center">Free</CardTitle>
                <p className="text-3xl font-extrabold text-center text-slate-900">
                  $0
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    5 exports in any format
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Copy to clipboard (unlimited)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    All 6 formats available
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    No account required
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Get Started Free
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-orange-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-center">Pro</CardTitle>
                <p className="text-3xl font-extrabold text-center text-slate-900">
                  $1.99
                  <span className="text-base font-normal text-slate-500">
                    /mo
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Unlimited exports
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    All 6 formats
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Remove branding from exports
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Mute notifications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Cancel anytime
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href={GUMROAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              </CardContent>
            </Card>
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

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Losing Your Best ChatGPT Conversations
          </h2>
          <p className="text-slate-400 mb-8">
            Every conversation you don&apos;t export is one you might never find
            again. Save them in the format you need, in seconds.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>5 free exports</span>
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
          <Link
            href="/"
            className="text-slate-300 hover:text-white font-medium"
          >
            Calc-Tech.com
          </Link>
          <p>
            &copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
