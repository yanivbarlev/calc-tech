"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calculator,
  CheckCircle,
  FileText,
  FileCode,
  Image,
  Table2,
  Braces,
  FileType,
  Shield,
  Zap,
  ExternalLink,
} from "lucide-react";

export default function ChatGPTExportWelcomePage() {
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

      {/* Hero — You're All Set */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            You&apos;re All Set
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
            ChatGPT Conversation Export is installed and ready to use. You have
            5 free exports included.
          </p>
        </div>
      </section>

      {/* Quick Start — 3 Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-14">
            Get Started in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-300" />
            {[
              {
                step: 1,
                title: "Open ChatGPT",
                desc: "Go to chatgpt.com and open any conversation you want to export.",
              },
              {
                step: 2,
                title: "Select Messages",
                desc: "Use the toolbar to select all messages or pick specific ones to include.",
              },
              {
                step: 3,
                title: "Choose Format and Export",
                desc: "Pick PDF, Markdown, Text, CSV, JSON, or Image and download instantly.",
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

      {/* Feature Highlights — 6 Format Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            6 Export Formats
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Every format you need, all available from your first export.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                icon: FileText,
                name: "PDF",
                desc: "Customizable layout with dark mode, TOC, and page breaks",
                color: "text-red-500",
                bg: "bg-red-50",
              },
              {
                icon: FileCode,
                name: "Markdown",
                desc: "Perfect for GitHub, Notion, Obsidian, or any Markdown editor",
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                icon: FileType,
                name: "Plain Text",
                desc: "Clean, readable text with no formatting dependencies",
                color: "text-slate-500",
                bg: "bg-slate-50",
              },
              {
                icon: Table2,
                name: "CSV",
                desc: "Structured data ready for Excel, Google Sheets, or analysis",
                color: "text-green-500",
                bg: "bg-green-50",
              },
              {
                icon: Braces,
                name: "JSON",
                desc: "Machine-readable format for data pipelines and automation",
                color: "text-amber-500",
                bg: "bg-amber-50",
              },
              {
                icon: Image,
                name: "Image (PNG)",
                desc: "Full-conversation screenshot for sharing and presentations",
                color: "text-purple-500",
                bg: "bg-purple-50",
              },
            ].map((format) => (
              <div
                key={format.name}
                className={`${format.bg} rounded-xl p-5 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <format.icon
                  className={`w-10 h-10 ${format.color} mx-auto mb-3`}
                />
                <p className="font-bold text-slate-800 mb-1">{format.name}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {format.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Free Exports Callout */}
      <section className="py-14 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-orange-200 mb-6">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">
              5 free exports included
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Your First 5 Exports Are Free
          </h2>
          <p className="text-slate-600 mb-3 max-w-xl mx-auto">
            Export in any format — PDF, Markdown, Text, CSV, JSON, or Image.
            Copy to clipboard is always free and unlimited. Need more than 5
            exports? Pro is just $1.99/month.
          </p>
          <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> 100% private
            </span>
            <span>&bull;</span>
            <span>No account required</span>
            <span>&bull;</span>
            <span>Cancel anytime</span>
          </p>
        </div>
      </section>

      {/* CTA — Open ChatGPT */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Export Your First Conversation
          </h2>
          <p className="text-slate-400 mb-8">
            Open ChatGPT and try it out. Your first export takes under 10
            seconds.
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
            <span>100% private</span>
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
