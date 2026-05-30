"use client";

import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  AdUnit,
  DocsStyles,
  useScrollSpy,
  CHROME_STORE_URL,
} from "../_components/docs";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const NAV = [
  { id: "welcome", label: "Welcome" },
  { id: "open-panel", label: "Open the panel" },
  { id: "first-prompt", label: "Send your first prompt" },
  { id: "shortcuts", label: "Shortcuts cheatsheet" },
  { id: "make-it-yours", label: "Make it yours" },
  { id: "whats-next", label: "What's next" },
];
const NAV_IDS = NAV.map((n) => n.id);

function CodexWelcomeInner() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const prev = searchParams.get("prev");
  const v = searchParams.get("v") || "";
  const conversionFired = useRef(false);
  const active = useScrollSpy(NAV_IDS, "welcome");

  const isUpdate = reason === "update" && !!prev;

  function handleGtagLoaded() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", "AW-1006081641");
    if (reason === "install" && !conversionFired.current) {
      conversionFired.current = true;
      window.gtag("event", "conversion", {
        send_to: "AW-1006081641/rv3GCLyskc8aEOms3t8D",
        value: 1.0,
        currency: "USD",
      });
      console.log("[Codex Welcome] Google Ads conversion fired (install).");
    } else {
      console.log('[Codex Welcome] Conversion NOT fired (reason is not "install").');
    }
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"
        strategy="afterInteractive"
        onLoad={handleGtagLoaded}
      />

      <DocsStyles />

      <div className="cx-doc">
        {/* Top bar */}
        <header className="cx-topbar">
          <div className="cx-topbar-inner">
            <Link href="/" className="cx-logo">
              <span className="cx-logo-mark">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
              </span>
              Codex for Chrome
            </Link>
            <div className="cx-topbar-spacer" />
            <Link href="/extensions/codex-for-chrome" className="cx-topbar-link">
              Overview
            </Link>
            <Link href="/extensions/codex-for-chrome/thank-you" className="cx-topbar-link">
              Full guide
            </Link>
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="cx-topbar-cta">
              Add to Chrome
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="cx-hero">
          <div className="cx-hero-inner">
            <span className="cx-hero-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {isUpdate ? (v ? "Updated to v" + v : "Updated") : "You're all set"}
            </span>
            <h1>
              {isUpdate
                ? "Codex for Chrome just got better"
                : "Welcome to Codex for Chrome"}
            </h1>
            <p>
              {isUpdate
                ? "Thanks for keeping the extension up to date. Here's a quick refresher on opening the side panel and getting the most out of your prompt templates and shortcuts."
                : "Thanks for installing. This is the 60-second walkthrough: open the side panel, send your first one-click prompt, and learn where every keyboard shortcut lives. Then you're off."}
            </p>
            <div className="cx-hero-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                60-second setup
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                ChatGPT · OpenAI · Codex · Sora
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                Free · no account
              </span>
            </div>
          </div>
        </section>

        {/* Shell */}
        <div className="cx-shell">
          <aside className="cx-side">
            <div className="cx-side-title">On this page</div>
            <nav className="cx-side-nav">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>
                  {n.label}
                </a>
              ))}
            </nav>
          </aside>

          <main className="cx-main">
            {/* Top banner ad */}
            <AdUnit adSlot="3339483394" adFormat="horizontal" style={{ minHeight: 90 }} />

            <h2 id="welcome">Welcome</h2>
            {isUpdate && (
              <div className="cx-call info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
                <p>You just updated from <strong>v{prev}</strong>. Thanks for keeping Codex for Chrome current — everything below still applies.</p>
              </div>
            )}
            <p className="cx-lead">
              Codex for Chrome is a side panel that lives next to ChatGPT, OpenAI and Codex. It gives
              you two things, one click away: 30+ ready-to-use prompt templates, and a full cheatsheet
              of every keyboard shortcut. No setup, no account, no tracking.
            </p>
            <p>
              This page gets you from &ldquo;just installed&rdquo; to &ldquo;using it like a pro&rdquo; in
              about a minute. If you ever want the deeper reference — troubleshooting, the full shortcut
              table, privacy details — head to the <Link className="inline" href="/extensions/codex-for-chrome/thank-you">complete guide</Link>.
            </p>

            <h2 id="open-panel">Open the panel</h2>
            <p>
              Chrome won&apos;t auto-open an extension&apos;s side panel — that&apos;s a deliberate privacy
              protection. So you open it once by hand, then pin it so it&apos;s always a single click away.
            </p>
            <div className="cx-steps">
              <div className="cx-step">
                <h4>Click the puzzle-piece icon</h4>
                <p>Top-right of Chrome&apos;s toolbar. It lists every extension you&apos;ve installed.</p>
              </div>
              <div className="cx-step">
                <h4>Pin &ldquo;Codex for Chrome&rdquo;</h4>
                <p>Click the pin next to it so the icon stays visible in your toolbar from now on.</p>
              </div>
              <div className="cx-step">
                <h4>Click the icon — the panel opens</h4>
                <p>It slides in from the right, next to your chat. Or tap the ⚡ button by the chat input.</p>
              </div>
            </div>
            <div className="cx-call tip">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></svg>
              <p><strong>Do this now:</strong> open a <a className="inline" href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">ChatGPT tab</a>, then click the Codex icon. Seeing the panel appear is the whole &ldquo;aha&rdquo; moment.</p>
            </div>

            <h2 id="first-prompt">Send your first prompt</h2>
            <p>
              Open the <strong>Prompts</strong> tab in the panel. You&apos;ll see prompts grouped into Code,
              Review, Clarity, and Debug. Click any one of them and it drops straight into the ChatGPT or
              Codex input box (and onto your clipboard as a backup). Add your specifics and hit send.
            </p>
            <h3>Try this 3-click code review</h3>
            <ol>
              <li>Paste some code into ChatGPT, then click <code className="inline">Explain this code step by step</code>.</li>
              <li>Follow up with <code className="inline">Find all bugs and explain each one</code>.</li>
              <li>Finish with <code className="inline">Write unit tests for this</code>.</li>
            </ol>
            <p>
              Three clicks, a full review and a test suite — without typing the same instructions you type
              every day.
            </p>

            {/* In-content ad */}
            <AdUnit adSlot="9713320054" style={{ minHeight: 250 }} />

            <h2 id="shortcuts">Shortcuts cheatsheet</h2>
            <p>
              Switch to the <strong>Shortcuts</strong> tab any time you forget a key combo. It lists every
              ChatGPT and Codex shortcut, grouped by area. A few you&apos;ll use constantly:
            </p>
            <table className="cx-tbl">
              <thead>
                <tr><th>Action</th><th>Shortcut</th></tr>
              </thead>
              <tbody>
                <tr><td>New chat</td><td><kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>O</kbd></td></tr>
                <tr><td>Focus the chat input</td><td><kbd>Shift</kbd> <kbd>Esc</kbd></td></tr>
                <tr><td>Send message</td><td><kbd>Enter</kbd></td></tr>
                <tr><td>Codex — run task</td><td><kbd>Ctrl</kbd> <kbd>Enter</kbd></td></tr>
                <tr><td>Codex — stop task</td><td><kbd>Esc</kbd></td></tr>
              </tbody>
            </table>
            <p>On macOS, swap <kbd>Ctrl</kbd> for <kbd>⌘</kbd> where it applies.</p>

            <h2 id="make-it-yours">Make it yours</h2>
            <p>
              Prefer light mode? Click the <strong>moon / sun icon</strong> in the panel header to toggle
              between dark and light. Your choice is saved locally and sticks across sessions — it never
              leaves your device. In fact, the only thing this extension ever stores is that single theme
              preference; it reads nothing from your conversations and sends no data anywhere.
            </p>
            <div className="cx-call warn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <p>Codex for Chrome is an independent third-party tool and is <strong>not affiliated with or endorsed by OpenAI.</strong> ChatGPT and Codex are trademarks of OpenAI.</p>
            </div>

            <h2 id="whats-next">What&apos;s next</h2>
            <p>
              That&apos;s everything you need to start. When you want the full reference — the complete
              shortcut table, troubleshooting, and the privacy deep-dive — the complete guide has it all.
              And if the extension&apos;s saving you time, a quick review on the Chrome Web Store genuinely helps.
            </p>

            {/* Bottom ad */}
            <AdUnit adSlot="3339483394" style={{ minHeight: 250 }} />

            {/* Prev / Next */}
            <div className="cx-pn">
              <Link href="/extensions/codex-for-chrome">
                <span className="dir">← Overview</span>
                <span className="t">Codex for Chrome — features</span>
              </Link>
              <Link href="/extensions/codex-for-chrome/thank-you" className="next">
                <span className="dir">Next →</span>
                <span className="t">The complete guide</span>
              </Link>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="cx-foot">
          <div className="cx-foot-inner">
            <span>&copy; {new Date().getFullYear()} Calc-Tech. Codex for Chrome is an independent tool, not affiliated with OpenAI.</span>
            <span style={{ display: "flex", gap: 16 }}>
              <Link href="/">Home</Link>
              <Link href="/extensions/codex-for-chrome">Overview</Link>
              <Link href="/privacy">Privacy</Link>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function CodexForChromeWelcomePage() {
  return (
    <Suspense>
      <CodexWelcomeInner />
    </Suspense>
  );
}
