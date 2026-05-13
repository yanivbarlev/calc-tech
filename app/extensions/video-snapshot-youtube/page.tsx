"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calculator,
  Camera,
  Clipboard,
  Download,
  Keyboard,
  Zap,
  Star,
  ExternalLink,
  MonitorPlay,
  ImageIcon,
  Lock,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/video-snapshot-for-youtub/__EXTENSION_ID__";

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
      Add to Chrome — Free
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

function SnapshotMockup() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      {/* YouTube-style video player mockup */}
      <div className="bg-black aspect-video relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-80" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <MonitorPlay className="w-12 h-12 text-slate-400" />
          <span className="text-slate-400 text-xs">YouTube Video</span>
        </div>
        {/* Snapshot button overlay */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
            <Camera className="w-3.5 h-3.5" />
            Snapshot
          </div>
        </div>
      </div>
      {/* Action panel */}
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-1">
          Video Snapshot for YouTube
        </p>
        <p className="text-slate-800 font-semibold text-sm">Frame captured!</p>
      </div>
      <div className="px-4 py-3 flex gap-2">
        <div className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold text-center py-2 rounded-lg flex items-center justify-center gap-1">
          <Download className="w-3.5 h-3.5" /> Save PNG
        </div>
        <div className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold text-center py-2 rounded-lg flex items-center justify-center gap-1">
          <Clipboard className="w-3.5 h-3.5" /> Copy
        </div>
      </div>
    </div>
  );
}

export default function VideoSnapshotYouTubePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What image format does the snapshot save as?",
      a: "Snapshots are saved as PNG files — lossless quality that preserves every pixel of the video frame exactly as it appeared on screen.",
    },
    {
      q: "Where does the saved file go?",
      a: "The PNG file is downloaded directly to your browser's default Downloads folder. No cloud upload, no account required.",
    },
    {
      q: "Does it work on YouTube Shorts?",
      a: "Yes. Video Snapshot works on all YouTube content including regular videos, Shorts, and embedded players on youtube.com.",
    },
    {
      q: "Is my data or viewing history sent anywhere?",
      a: "No. The extension only has storage permission (to save your preferences) and runs only on youtube.com. It never transmits any data. Everything happens locally in your browser.",
    },
    {
      q: "Is there a keyboard shortcut?",
      a: "Yes. You can trigger a snapshot with a configurable keyboard shortcut. Open the extension's Options page to set your preferred key combination.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
                Chrome Extension &middot; Completely Free
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Capture Any YouTube Frame in One Click
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Snap the exact video frame you want — save it as a PNG, copy it
                to clipboard, or do both. No pausing, cropping, or screenshot
                tools needed.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> One click
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" /> PNG quality
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% local
                </span>
              </p>
            </div>
            {/* Right - Mockup */}
            <div className="flex-shrink-0 lg:rotate-1">
              <SnapshotMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="font-medium">One Click</span>
          </div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-green-500" />
            <span className="font-medium">PNG Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="font-medium">100% Local — No Upload</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Manual Screenshots Are a Chore
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Capturing a single video frame shouldn&apos;t take five steps and a
            crop tool.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "You have to pause at exactly the right frame",
                desc: "Miss by half a second and you are scrubbing back and forth trying to nail it.",
              },
              {
                title: "OS screenshots capture the whole screen",
                desc: "Then you open an image editor just to crop out the browser chrome, controls, and taskbar.",
              },
              {
                title: "The result is low quality",
                desc: "Screen captures compress your image. You lose detail that the actual video frame had at full resolution.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-red-500 font-bold text-sm">✕</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-slate-200 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            Four features. Clean interface. No bloat.
          </p>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Capture Any Frame Instantly
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A Snapshot button appears directly on the YouTube player. Hit
                  it at any moment and the current frame is captured at the
                  video&apos;s native resolution — no pause, no crop, no fuss.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center relative">
                  <MonitorPlay className="w-10 h-10 text-slate-500" />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Snapshot
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Clipboard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Copy Directly to Clipboard
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Need to paste the frame straight into a doc, chat, or
                  presentation? Copy to Clipboard puts the image on your
                  clipboard in one click — ready to paste anywhere without
                  saving a file.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold text-center py-2 rounded-lg flex items-center justify-center gap-2">
                    <Clipboard className="w-4 h-4" /> Copy to Clipboard
                  </div>
                  <div className="text-center text-slate-400 text-xs">
                    Paste into Docs, Slack, Notion...
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Save as PNG
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Download the frame as a lossless PNG file directly to your
                  Downloads folder. Full resolution, no re-encoding, no quality
                  loss. The file is named automatically with the video title and
                  timestamp.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <ImageIcon className="w-4 h-4 text-green-500" />
                    <span className="text-slate-700 font-medium text-xs">
                      frame-00-12-34.png
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    1920 × 1080 &middot; PNG &middot; Lossless
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Keyboard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Configurable Keyboard Shortcut
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Power users can set a keyboard shortcut to trigger snapshots
                  without touching the mouse. Open the Options page to choose
                  your preferred key combination and make capturing frames feel
                  effortless.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center gap-2">
                  <div className="bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-2 rounded shadow-sm">
                    Alt
                  </div>
                  <span className="text-slate-400 font-bold">+</span>
                  <div className="bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-2 rounded shadow-sm">
                    S
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            How It Works
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Three steps, then you never think about it again.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Install the extension",
                desc: 'Click "Add to Chrome" above. No sign-up, no account — just install.',
              },
              {
                step: "2",
                title: "Open any YouTube video",
                desc: "A Snapshot button appears on the player controls automatically.",
              },
              {
                step: "3",
                title: "Click Snapshot",
                desc: "The current frame is saved as PNG, copied to clipboard, or both — instantly.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white font-extrabold text-xl">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-green-50 border-y border-green-100 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Ready to capture your first frame?
          </h2>
          <p className="text-slate-600 mb-6">
            Free to install. Works immediately on youtube.com.
          </p>
          <CtaButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
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
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            More Helpful Extensions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "CleanTube",
                desc: "Remove ads, distractions, and recommended videos from YouTube for a focused viewing experience.",
                href: "/extensions/cleantube",
                color: "from-green-500 to-emerald-500",
              },
              {
                name: "ChatGPT Conversation Export",
                desc: "Export any ChatGPT conversation as PDF, Markdown, CSV, JSON, or plain text in seconds.",
                href: "/extensions/chatgpt-conversation-export",
                color: "from-orange-500 to-amber-500",
              },
              {
                name: "WhatsApp Chat Export",
                desc: "Export your WhatsApp Web conversations to PDF, TXT, or CSV with one click.",
                href: "/extensions/whatsapp-chat-export",
                color: "from-green-600 to-teal-500",
              },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Struggling with Screenshots
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Install Video Snapshot for YouTube and capture any frame in one
            click. Free, private, no account needed.
          </p>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="0" />
            </svg>
            Add to Chrome — Free
          </a>
          <p className="text-slate-500 text-sm mt-4">
            Only runs on youtube.com &middot; No data collected
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            <span>
              &copy; {new Date().getFullYear()} Calc-Tech.com — Video Snapshot
              for YouTube
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors flex items-center gap-1"
            >
              Chrome Web Store <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
