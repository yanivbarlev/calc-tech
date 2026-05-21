import Link from "next/link";
import {
  Calculator,
  CheckCircle,
  ExternalLink,
  FileText,
  Gauge,
  Languages,
  MousePointerClick,
  Shield,
  Volume2,
} from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/read-aloud-text-to-speech/gpcgbgibifgjdpoemahepkjiannfmcco?authuser=3&hl=en";

const features = [
  {
    title: "Read any webpage",
    description:
      "Listen to articles, docs, emails, recipes, PDFs, and study material directly in Chrome.",
    icon: FileText,
  },
  {
    title: "Control the pace",
    description:
      "Adjust voice speed for focused reading, fast scanning, or comfortable long-form listening.",
    icon: Gauge,
  },
  {
    title: "40+ languages",
    description:
      "Use voices available on your device across English, Spanish, French, German, Hindi, and more.",
    icon: Languages,
  },
  {
    title: "Selection reading",
    description:
      "Highlight a paragraph, right-click, and hear only the text you selected.",
    icon: MousePointerClick,
  },
];

const highlights = [
  "Works on most webpages",
  "Keyboard shortcut support",
  "Sentence highlighting",
  "No signup required",
  "Free to install",
  "Built for Chrome",
];

function StoreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 ${className}`}
    >
      <ExternalLink className="h-5 w-5" />
      Add to Chrome
    </a>
  );
}

export default function ReadAloudTtsLandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span>Calc-Tech</span>
          </Link>
          <StoreButton className="hidden px-5 py-2.5 text-sm sm:inline-flex" />
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                <Volume2 className="h-4 w-4" />
                Text to speech for Chrome
              </div>
              <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-slate-950 md:text-6xl">
                Read Aloud Text to Speech
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600">
                Turn webpages into natural audio with one click. Read articles,
                documents, and selected text out loud while you work, study, or
                browse.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <StoreButton />
                <Link
                  href="/read-aloud-tts/welcome"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-4 text-base font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  Setup guide
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-950/10">
              <div className="rounded-xl bg-slate-950 p-5 text-white">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500">
                      <Volume2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold">Read Aloud</p>
                      <p className="text-sm text-slate-400">Listening now</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full rounded bg-blue-400" />
                  <div className="h-3 w-11/12 rounded bg-slate-700" />
                  <div className="h-3 w-4/5 rounded bg-slate-700" />
                  <div className="h-3 w-9/12 rounded bg-slate-700" />
                </div>
                <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-lg bg-white/10 p-3">
                    <p className="font-bold">1.25x</p>
                    <p className="text-slate-400">Speed</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3">
                    <p className="font-bold">Alt+R</p>
                    <p className="text-slate-400">Shortcut</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3">
                    <p className="font-bold">Local</p>
                    <p className="text-slate-400">Speech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[.12em] text-blue-600">
                Features
              </p>
              <h2 className="text-3xl font-bold text-slate-950">
                Built for everyday reading
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-950">
                Simple, private, and fast
              </h2>
              <p className="text-lg leading-8 text-slate-600">
                Read Aloud uses browser speech features, so you can listen
                without creating an account or sending your reading workflow
                through a complicated setup.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-slate-950">
              Start listening in Chrome
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Install the extension, open a webpage, and click the speaker
              button to hear the page out loud.
            </p>
            <StoreButton />
          </div>
        </section>
      </main>
    </div>
  );
}
