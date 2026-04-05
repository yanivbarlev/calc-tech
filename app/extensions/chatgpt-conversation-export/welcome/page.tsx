"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  FileCode,
  FileType,
  Table2,
  Braces,
  Image,
  CheckSquare,
  Settings,
  Code,
  Sigma,
  LayoutGrid,
  ListChecks,
  Palette,
  Shield,
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
    <div className="w-16 h-16 rounded-full border-[3px] border-emerald-500 flex items-center justify-center mx-auto mb-6">
      <span className="text-2xl font-bold text-emerald-600">{n}</span>
    </div>
  );
}

export default function ChatGPTExportWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can I export specific messages from my conversation?",
      a: "Yes. Click the Select button in the toolbar to enter selection mode. Checkboxes appear next to each message, letting you pick exactly which ones to include. You can also use Select All or Deselect All for quick bulk actions.",
    },
    {
      q: "How do you handle my conversation data? I have privacy concerns.",
      a: "Your privacy is our top priority. The extension runs entirely in your browser. Your conversations are never sent to any server. All export processing happens locally on your machine. No account is required.",
    },
    {
      q: "What formats are supported?",
      a: "PDF, Markdown (.md), Plain Text (.txt), CSV, JSON, and Image (PNG). PDF supports custom page sizes, margins, fonts, dark mode, and table of contents. Markdown preserves code fences and GFM tables.",
    },
    {
      q: "Is it free?",
      a: "You get 5 free exports in any format. Copy to clipboard is always free and unlimited. After 5 exports, Pro is $1.99/month for unlimited exports, branding removal, and muted notifications. Cancel anytime.",
    },
    {
      q: "Does it preserve code blocks and math formulas?",
      a: "Yes. Code blocks retain syntax highlighting and language tags. Math formulas (LaTeX/KaTeX) are preserved. Tables maintain their grid structure. Nested lists, bold, italic, links, and images are all handled correctly.",
    },
  ];

  const features = [
    {
      title: "Download as PDF, Markdown, and more",
      desc: "Export your ChatGPT conversations in 6 formats: PDF, Markdown, Plain Text, CSV, JSON, and Image (PNG). Each format is optimized for its use case — PDFs for sharing, Markdown for docs, CSV for data analysis.",
      icon: FileText,
      formats: [
        { icon: FileText, name: "PDF", color: "text-red-500", bg: "bg-red-50" },
        { icon: FileCode, name: "Markdown", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: FileType, name: "Text", color: "text-slate-500", bg: "bg-slate-100" },
        { icon: Table2, name: "CSV", color: "text-green-500", bg: "bg-green-50" },
        { icon: Braces, name: "JSON", color: "text-amber-500", bg: "bg-amber-50" },
        { icon: Image, name: "Image", color: "text-purple-500", bg: "bg-purple-50" },
      ],
    },
    {
      title: "Export part of the conversation",
      desc: "You are not forced to download the entire conversation. Use the Select button to enter selection mode, then check or uncheck individual messages. A counter shows how many messages you have selected. Export only what you need.",
      icon: CheckSquare,
      bullets: [
        "Check or uncheck individual messages",
        "Select All / Deselect All toggle",
        "Visual count of selected messages",
      ],
    },
    {
      title: "Customizable export settings",
      desc: "Set your preferred filename pattern. Choose the PDF page format (A4, Letter, Legal), margins (normal, narrow, wide), font family, and font size. Toggle dark mode for exports. Include or exclude conversation link, date, and user info.",
      icon: Settings,
      bullets: [
        "Custom filename patterns",
        "PDF page size, margins, and fonts",
        "Dark or light mode for exports",
        "Include conversation link and metadata",
      ],
    },
    {
      title: "Preserves advanced outputs",
      desc: "Code blocks keep their syntax highlighting and language tags. Math formulas render correctly. Tables maintain their structure. Thinking and reasoning process from o1/o3 models is captured. Deep research outputs, canvas content, and embedded images are all preserved.",
      icon: Code,
      bullets: [
        "Code blocks with syntax highlighting",
        "Math formulas (LaTeX/KaTeX)",
        "Tables and nested lists",
        "Thinking/reasoning sections (o1/o3 models)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
          <Link href="/extensions/chatgpt-conversation-export">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Extension Page
            </Button>
          </Link>
        </div>
      </header>

      {/* Tagline */}
      <section className="pt-10 pb-6">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Export ChatGPT conversations as PDF, Markdown, Text, CSV, JSON and
            Image. Download your ChatGPT results with perfect formatting
            preserved.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-center mb-2">
            <span className="block text-3xl md:text-4xl font-bold text-emerald-600 mb-1">
              Follow the steps to use
            </span>
            <span className="block text-2xl md:text-3xl font-bold text-slate-900">
              ChatGPT Conversation Export
            </span>
          </h1>

          {/* Step 1 */}
          <div className="py-14 text-center">
            <StepNumber n={1} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              open{" "}
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                chatgpt.com
              </a>
            </h2>
          </div>

          {/* Step 2 */}
          <div className="py-14 text-center">
            <StepNumber n={2} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              navigate to the conversation you want to export
            </h2>
          </div>

          {/* Step 3 */}
          <div className="py-14 text-center">
            <StepNumber n={3} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">
              click &apos;Select&apos; button, then choose what to export
            </h2>
            {/* Mockup of the toolbar */}
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-3 flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
                <CheckSquare className="w-4 h-4" />
                Select
              </button>
              <div className="w-px h-6 bg-slate-200" />
              <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 rounded-lg text-sm font-medium text-white">
                <FileText className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="mt-6 text-sm text-slate-500 space-y-1">
              <p>1. you can check/uncheck individual messages</p>
              <p>2. use Select All / Deselect All for bulk actions</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="py-14 text-center">
            <StepNumber n={4} />
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">
              click &apos;Export&apos; button, then choose file format
            </h2>
            {/* Mockup of format dropdown */}
            <div className="max-w-xs mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              {[
                { name: "PDF", icon: FileText, color: "text-red-500" },
                { name: "Markdown", icon: FileCode, color: "text-blue-500" },
                { name: "Plain Text", icon: FileType, color: "text-slate-500" },
                { name: "CSV", icon: Table2, color: "text-green-500" },
                { name: "JSON", icon: Braces, color: "text-amber-500" },
                { name: "Image (PNG)", icon: Image, color: "text-purple-500" },
              ].map((fmt, i) => (
                <div
                  key={fmt.name}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 ${
                    i < 5 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <fmt.icon className={`w-4 h-4 ${fmt.color}`} />
                  {fmt.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm text-slate-400 text-center uppercase tracking-widest mb-2">
            Frequently Asked Questions
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            Common questions about ChatGPT Conversation Export
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

      {/* Features */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center mb-2">
            <span className="text-2xl md:text-3xl font-bold text-emerald-600">
              Powerful Features
            </span>
          </h2>
          <p className="text-center text-slate-500 mb-14 text-lg">
            make exporting effortless
          </p>

          <div className="space-y-20">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10`}
              >
                {/* Text side */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  {feature.bullets && (
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-slate-600 text-sm"
                        >
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Visual side */}
                <div className="flex-1 flex justify-center">
                  {feature.formats ? (
                    <div className="grid grid-cols-3 gap-3 max-w-xs">
                      {feature.formats.map((fmt) => (
                        <div
                          key={fmt.name}
                          className={`${fmt.bg} rounded-lg p-3 text-center border border-slate-200`}
                        >
                          <fmt.icon
                            className={`w-7 h-7 ${fmt.color} mx-auto mb-1`}
                          />
                          <p className="text-xs font-semibold text-slate-700">
                            {fmt.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-64 h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border border-slate-200">
                      <feature.icon className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-400 mb-2">Ready to dive in?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start exporting your ChatGPT conversations
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Open ChatGPT and try it now. Your first 5 exports are free. No
            account required.
          </p>
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            Open ChatGPT to Get Started
          </a>
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>5 free exports</span>
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
          <Link
            href="/"
            className="text-slate-300 hover:text-white font-medium"
          >
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
          <p>
            &copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
