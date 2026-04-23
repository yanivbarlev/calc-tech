"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Video,
  Shield,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calculator,
  Image as ImageIcon,
  Film,
  File,
  Lock,
  MousePointerClick,
  Play,
  CheckCircle2,
  MessageSquare,
  Archive,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/telegram-video-downloader/capjjagcfgekmbllkkhffcdmajnkjfgd";

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
      Add to Chrome — Try Free
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

function DownloaderMockup() {
  const items = [
    { name: "Sunset clip.mp4", size: "24.3 MB", progress: 100, icon: Film },
    { name: "Travel photo.jpg", size: "3.1 MB", progress: 100, icon: ImageIcon },
    { name: "Meeting.mp4", size: "147 MB", progress: 62, icon: Video },
    { name: "Notes.pdf", size: "812 KB", progress: 100, icon: File },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm w-full">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <Download className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-white font-semibold text-sm">
          Telegram Downloader
        </span>
        <span className="ml-auto text-sky-100 text-xs">4 items</span>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((it, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <it.icon className="w-4 h-4 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">
                  {it.name}
                </div>
                <div className="text-xs text-slate-400">{it.size}</div>
              </div>
              {it.progress === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <span className="text-xs font-semibold text-sky-600">
                  {it.progress}%
                </span>
              )}
            </div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  it.progress === 100 ? "bg-green-500" : "bg-sky-500"
                } transition-all`}
                style={{ width: `${it.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
        Downloads saved to your device
      </div>
    </div>
  );
}

export default function TelegramDownloaderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it really free?",
      a: "Yes. You can download a limited number of files for free to try the extension. A one-time Pro upgrade unlocks unlimited downloads — no subscription.",
    },
    {
      q: "Does it work on restricted content?",
      a: "Yes. The extension can download videos, photos, and files from channels and chats where Telegram has disabled saving — as long as you have access to view them.",
    },
    {
      q: "What file types can I download?",
      a: "Videos, photos, voice notes, round video messages, stickers, stories, and regular file attachments. Everything you can see in a chat, you can save.",
    },
    {
      q: "Does it work with private channels?",
      a: "Yes. If you are a member and can view the content, you can download it. The extension runs inside your own Telegram Web session.",
    },
    {
      q: "Where do downloads go?",
      a: "Files save directly to your browser's Downloads folder. Nothing is uploaded anywhere — the download happens between Telegram and your device only.",
    },
    {
      q: "Do I need the Telegram desktop app?",
      a: "No. The extension works entirely on web.telegram.org in Chrome. Just log in as you normally would.",
    },
  ];

  const relatedTools = [
    { name: "WhatsApp Chat Export", href: "/extensions/whatsapp-chat-export", icon: MessageSquare },
    { name: "ChatGPT Conversation Export", href: "/extensions/chatgpt-conversation-export", icon: MessageSquare },
    { name: "Facebook Messenger Cleaner", href: "/extensions/facebook-messenger-cleaner", icon: Archive },
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
                Download Any Video, Photo or File From Telegram
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                One-click downloads from Telegram Web — including stories,
                private channels, and restricted content that Telegram blocks
                from saving.
              </p>
              <div className="mb-6">
                <CtaButton />
              </div>
              <p className="text-sm text-slate-500 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> 100% private
                </span>
                <span>&bull;</span>
                <span>Works on restricted content</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> One-click save
                </span>
              </p>
            </div>
            <div className="flex-shrink-0 lg:rotate-1">
              <DownloaderMockup />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Videos, Photos & Files</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-500" />
            <span className="font-medium">Restricted Content Supported</span>
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
            Telegram Makes Saving Content Harder Than It Should Be
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Channels disable downloads. Stories disappear. Files are buried in
            infinite scroll. You need a cleaner way to keep what matters.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Downloads Disabled",
                desc: "Channel owners can block saving. Stories vanish in 24 hours. Restricted content has no save button at all.",
              },
              {
                icon: Film,
                title: "No Bulk Download",
                desc: "Telegram gives you no way to grab multiple videos or photos at once. It is one file at a time, by hand.",
              },
              {
                icon: MousePointerClick,
                title: "Clunky On the Web",
                desc: "Telegram Web's download flow buries options behind menus. A quick save turns into five clicks.",
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
            Save Anything You Can See on Telegram
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
            A single download button that works everywhere on Telegram Web.
          </p>

          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  All Media Types
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Videos, Photos, Stories, Voice Notes, Files
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  If it appears in a Telegram chat or channel, the extension can
                  save it. Including round video messages, stickers, and
                  documents attached as files.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Full-resolution videos and photos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Stories before they expire
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Documents, audio, voice notes
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Any Media Type
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    One button saves it all
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  Restricted Content
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Works Where Telegram Blocks Saving
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Channels that disable downloads, forward-restricted messages,
                  and private groups — if you have access to view them, you can
                  save what you need.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Private channels and groups
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Forward-disabled content
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Stories before they disappear
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Restricted-Friendly
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Save what you can see
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">
                  One-Click UI
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                  Download Button Right Inside Telegram Web
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  The extension adds a clean download button exactly where you
                  need it — no menus, no popups to wait for. Click, saved,
                  done.
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <MousePointerClick className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Integrated button next to every media item
                  </li>
                  <li className="flex items-start gap-2">
                    <Play className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Progress indicator for large files
                  </li>
                  <li className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    Saves straight to your Downloads folder
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Download className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    One Click
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    From chat to file in seconds
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
                desc: "Add from the Chrome Web Store in one click. No account or sign-up needed.",
              },
              {
                step: 2,
                title: "Open Telegram Web",
                desc: "Log into web.telegram.org like you normally do. The extension adds download buttons automatically.",
              },
              {
                step: 3,
                title: "Save Anything",
                desc: "Click the download button on any video, photo, or file. Files land in your Downloads folder instantly.",
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
            Never Lose a Telegram Video Again
          </h2>
          <p className="text-slate-600 mb-8">
            Install in 10 seconds. Try it free. Upgrade only if you love it.
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
            Stop Losing Content to Disappearing Stories
          </h2>
          <p className="text-slate-400 mb-8">
            Save every video, photo, and file you actually care about.
          </p>
          <CtaButton />
          <p className="text-sm text-slate-500 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Try free</span>
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
