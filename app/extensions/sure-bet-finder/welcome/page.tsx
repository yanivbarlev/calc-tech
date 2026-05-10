"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function SureBetFinderWelcomeInner() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const prev = searchParams.get("prev");
  const v = searchParams.get("v") || "";
  const conversionFired = useRef(false);
  const [permDone, setPermDone] = useState(false);

  function openPanel() {
    window.postMessage({ type: 'psbf_open_panel' }, '*');
  }

  useEffect(() => {
    const eyebrow = document.getElementById("heroEyebrow");
    const banner = document.getElementById("updateBanner");
    const bannerText = document.getElementById("updateText");
    if (reason === "update" && prev) {
      if (eyebrow) eyebrow.textContent = v ? "Updated to v" + v : "Updated";
      if (banner) banner.classList.add("active");
      if (bannerText)
        bannerText.textContent =
          "You just updated from v" + prev + ". New: faster scans, in-extension feedback, polished loading.";
    } else {
      if (eyebrow) eyebrow.textContent = "You're set up";
    }
  }, [reason, prev, v]);

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
      console.log("[Polymarket Welcome] Google Ads conversion fired (install).");
    } else {
      console.log('[Polymarket Welcome] Conversion NOT fired (reason is not "install").');
    }
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-1006081641"
        strategy="afterInteractive"
        onLoad={handleGtagLoaded}
      />

      <style>{`
        :root {
          --bg: #f8fafc;
          --bg-elev: #ffffff;
          --bg-card: #ffffff;
          --line: #e5e7eb;
          --line-strong: #d1d5db;
          --text: #0f172a;
          --text-muted: #475569;
          --text-dim: #64748b;
          --accent: #059669;
          --accent-hover: #047857;
          --accent-soft: rgba(5,150,105,0.1);
          --accent-border: rgba(5,150,105,0.25);
          --shadow-card: 0 1px 2px rgba(15,23,42,0.04), 0 4px 12px -4px rgba(15,23,42,0.06);
          --shadow-elev: 0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 16px -4px rgba(15,23,42,0.08), 0 24px 48px -16px rgba(15,23,42,0.1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          line-height: 1.5;
        }
        .sbf-wrap { position: relative; min-height: 100vh; }
        .sbf-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 15% 10%, rgba(5,150,105,0.06), transparent 60%),
            radial-gradient(ellipse 600px 500px at 85% 80%, rgba(59,130,246,0.04), transparent 60%);
          pointer-events: none; z-index: 0;
        }
        .sbf-page {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 24px 32px 80px;
        }

        /* ── Permission CTA ── */
        .sbf-perm-banner {
          margin-bottom: 40px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0f766e 100%);
          box-shadow: 0 8px 40px -8px rgba(5,150,105,0.5), 0 0 0 1px rgba(5,150,105,0.3);
          animation: sbfFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        .sbf-perm-inner {
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 700px) {
          .sbf-perm-inner { grid-template-columns: 1fr; gap: 20px; }
          .sbf-page { padding: 16px 16px 60px; }
        }
        .sbf-perm-step {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.4px;
          text-transform: uppercase; color: #6ee7b7;
          background: rgba(110,231,183,0.12);
          padding: 5px 12px; border-radius: 999px;
          border: 1px solid rgba(110,231,183,0.25);
          margin-bottom: 14px;
        }
        .sbf-perm-headline {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800; letter-spacing: -0.02em;
          line-height: 1.15; color: #ffffff;
          margin-bottom: 10px;
        }
        .sbf-perm-sub {
          font-size: 15px; color: #a7f3d0; line-height: 1.55;
          max-width: 50ch;
        }
        .sbf-perm-btn-wrap { display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0; }
        .sbf-perm-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 32px;
          border-radius: 14px;
          font-family: inherit; font-size: 17px; font-weight: 800;
          text-decoration: none; border: none; cursor: pointer;
          white-space: nowrap;
          background: #ffffff;
          color: #065f46;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 0 rgba(255,255,255,0.6);
          animation: sbfPermPulse 2.2s ease-in-out infinite;
          transition: transform 120ms ease, box-shadow 200ms ease;
        }
        .sbf-perm-btn:hover { transform: translateY(-2px) scale(1.02); animation: none; box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        .sbf-perm-btn:active { transform: scale(0.98); }
        .sbf-perm-btn-done {
          background: rgba(110,231,183,0.15);
          color: #6ee7b7;
          border: 1px solid rgba(110,231,183,0.35);
          animation: none;
          cursor: default;
        }
        .sbf-perm-btn-done:hover { transform: none; box-shadow: none; }
        @keyframes sbfPermPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 0 rgba(255,255,255,0.5); }
          50%       { box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 10px rgba(255,255,255,0); }
        }
        .sbf-perm-note { font-size: 12px; color: #6ee7b7; opacity: 0.8; text-align: center; }
        .sbf-perm-steps-hint {
          margin-top: 20px;
          padding: 16px 20px;
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          display: none;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }
        .sbf-perm-steps-hint.open { display: flex; }
        .sbf-perm-hint-step {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: #d1fae5;
        }
        .sbf-perm-hint-num {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(110,231,183,0.25);
          color: #6ee7b7;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .sbf-perm-hint-arrow { color: #6ee7b7; opacity: 0.5; font-size: 18px; }

        /* ── Brand ── */
        .sbf-brand {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: var(--text-muted);
          font-weight: 600; letter-spacing: 0.4px;
          opacity: 0; animation: sbfFadeIn 0.6s ease 0.1s forwards;
          margin-bottom: 28px;
        }
        .sbf-brand-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          animation: sbfDotPulse 2.4s ease-in-out infinite;
        }
        @keyframes sbfDotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(5,150,105,0); }
        }

        /* ── Hero ── */
        .sbf-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 48px; align-items: center;
          opacity: 0; animation: sbfFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
        }
        @media (max-width: 880px) { .sbf-hero { grid-template-columns: 1fr; gap: 32px; } }
        .sbf-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--accent);
          background: var(--accent-soft);
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--accent-border);
          margin-bottom: 20px;
        }
        .sbf-headline {
          font-size: clamp(32px, 4.4vw, 48px);
          font-weight: 700; letter-spacing: -0.03em;
          line-height: 1.05; margin-bottom: 16px;
        }
        .sbf-headline .accent { color: var(--accent); font-style: italic; font-weight: 600; }
        .sbf-sub {
          font-size: 16px; color: var(--text-muted);
          max-width: 52ch; margin-bottom: 22px;
        }
        .sbf-actions { display: flex; gap: 12px; align-items: center; }
        .sbf-update-banner {
          display: none;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          color: var(--text);
          padding: 12px 16px; border-radius: 10px;
          font-size: 13px; margin-bottom: 24px;
        }
        .sbf-update-banner.active { display: flex; align-items: center; gap: 10px; }
        .sbf-asset {
          background: linear-gradient(180deg, #131c2f 0%, #0a0e1a 100%);
          border: 1px solid #1f2937;
          border-radius: 16px; padding: 32px 28px;
          box-shadow: var(--shadow-elev);
        }
        .sbf-asset-title {
          font-size: 11px; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 1.2px;
          margin-bottom: 16px; font-weight: 600;
        }
        .sbf-asset-row {
          display: grid; grid-template-columns: 1fr auto;
          gap: 12px; align-items: center;
          padding: 10px 0; border-bottom: 1px solid #1f2937;
          font-family: 'JetBrains Mono', monospace; font-size: 12px;
        }
        .sbf-asset-row:last-child { border-bottom: none; }
        .sbf-bar { height: 4px; background: #1f2937; border-radius: 2px; overflow: hidden; position: relative; }
        .sbf-bar-fill {
          position: absolute; inset: 0; background: #10b981;
          transform-origin: left; transform: scaleX(0);
          animation: sbfFillBar 1.2s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .sbf-asset-row:nth-child(1) .sbf-bar-fill { animation-delay: 0.6s; --w: 0.98; }
        .sbf-asset-row:nth-child(2) .sbf-bar-fill { animation-delay: 0.75s; --w: 0.97; }
        .sbf-asset-row:nth-child(3) .sbf-bar-fill { animation-delay: 0.9s; --w: 0.965; }
        .sbf-asset-row:nth-child(4) .sbf-bar-fill { animation-delay: 1.05s; --w: 0.95; }
        .sbf-asset-row:nth-child(5) .sbf-bar-fill { animation-delay: 1.2s; --w: 0.92; }
        @keyframes sbfFillBar { to { transform: scaleX(var(--w, 0.95)); } }
        .sbf-pct { color: #34d399; font-weight: 600; }

        /* ── Buttons ── */
        .sbf-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 22px; border-radius: 10px;
          font-family: inherit; font-size: 15px; font-weight: 600;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 120ms ease, background 200ms ease;
        }
        .sbf-btn-primary {
          background: var(--accent); color: #ffffff;
          box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(5,150,105,0.3), 0 0 0 0 rgba(5,150,105,0.4);
          animation: sbfCtaPulse 2.6s ease-in-out infinite;
        }
        .sbf-btn-primary:hover { background: var(--accent-hover); animation: none; }
        .sbf-btn-primary:active { transform: translateY(1px) scale(0.98); }
        @keyframes sbfCtaPulse {
          0%, 100% { box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(5,150,105,0.3), 0 0 0 0 rgba(5,150,105,0.45); }
          50%       { box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(5,150,105,0.3), 0 0 0 12px rgba(5,150,105,0); }
        }
        .sbf-btn-ghost { background: transparent; color: var(--text-muted); padding: 14px 18px; }
        .sbf-btn-ghost:hover { color: var(--text); background: rgba(15,23,42,0.04); }

        /* ── Onboarding steps ── */
        .sbf-onboarding {
          opacity: 0; animation: sbfFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
          margin-bottom: 40px;
        }
        .sbf-onboarding-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.4px;
          text-transform: uppercase; color: var(--accent);
          background: var(--accent-soft);
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid var(--accent-border);
          margin-bottom: 16px;
        }
        .sbf-onboarding-headline { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 8px; }
        .sbf-onboarding-sub { color: var(--text-muted); font-size: 15px; margin-bottom: 28px; max-width: 56ch; }
        .sbf-onboarding-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 18px; margin-bottom: 20px;
        }
        @media (max-width: 880px) { .sbf-onboarding-grid { grid-template-columns: 1fr; } }
        .sbf-step {
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 14px; padding: 22px;
          box-shadow: var(--shadow-card);
          display: flex; flex-direction: column;
          position: relative;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .sbf-step:hover {
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(15,23,42,0.05), 0 12px 28px -10px rgba(15,23,42,0.12);
        }
        .sbf-step-num {
          position: absolute; top: 16px; right: 16px;
          width: 26px; height: 26px;
          background: var(--accent); color: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          box-shadow: 0 2px 6px rgba(5,150,105,0.3);
        }
        .sbf-step-art {
          background: #0f172a;
          border-radius: 10px;
          margin-bottom: 16px;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          min-height: 130px;
        }
        .sbf-step-art img { display: block; max-width: 100%; height: auto; object-fit: contain; }
        .sbf-step-art.s1 { padding: 18px; }
        .sbf-step-art.s1 img { width: 100%; max-width: 280px; }
        .sbf-step-art.s2 { padding: 14px; }
        .sbf-step-art.s2 img { width: 100%; max-width: 240px; border-radius: 6px; }
        .sbf-step-art.s3 { padding: 0; align-items: stretch; }
        .sbf-step-art.s3 img { width: 100%; max-width: 100%; max-height: 200px; object-fit: cover; object-position: top; }
        .sbf-step-title { font-size: 15px; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.01em; }
        .sbf-step-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.55; }

        /* ── Features ── */
        .sbf-section {
          margin-top: 64px;
          opacity: 0; animation: sbfFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.7s forwards;
        }
        .sbf-section-label {
          display: flex; align-items: center; gap: 12px;
          font-size: 12px; color: var(--text-dim);
          font-weight: 700; letter-spacing: 1.4px;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .sbf-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--line) 0%, transparent 100%);
        }
        .sbf-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 880px) { .sbf-features { grid-template-columns: 1fr; } }
        .sbf-feature {
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 12px; padding: 24px;
          box-shadow: var(--shadow-card);
          transition: transform 200ms ease, border-color 200ms ease;
          opacity: 0; animation: sbfFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .sbf-feature:nth-child(1) { animation-delay: 0.8s; }
        .sbf-feature:nth-child(2) { animation-delay: 0.9s; margin-top: 14px; }
        .sbf-feature:nth-child(3) { animation-delay: 1.0s; }
        .sbf-feature:hover { transform: translateY(-2px); border-color: var(--line-strong); }
        .sbf-feature-icon {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-soft); border-radius: 10px;
          color: var(--accent); margin-bottom: 14px;
        }
        .sbf-feature-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
        .sbf-feature-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; }

        /* ── Pricing ── */
        .sbf-pricing {
          margin-top: 64px;
          background:
            radial-gradient(ellipse 600px 300px at 50% 0%, rgba(5,150,105,0.06), transparent 60%),
            var(--bg-elev);
          border: 1px solid var(--line);
          border-radius: 20px; padding: 48px;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 56px; align-items: center;
          box-shadow: var(--shadow-elev);
          opacity: 0; animation: sbfFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.1s forwards;
        }
        @media (max-width: 880px) { .sbf-pricing { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; } }
        .sbf-pricing-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--accent);
          background: var(--accent-soft);
          padding: 5px 10px; border-radius: 999px; margin-bottom: 18px;
        }
        .sbf-pricing-headline { font-size: 30px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 12px; }
        .sbf-pricing-sub { color: var(--text-muted); font-size: 15px; margin-bottom: 28px; max-width: 38ch; }
        .sbf-price { display: flex; align-items: baseline; gap: 10px; margin-bottom: 28px; }
        .sbf-price-num { font-size: 56px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
        .sbf-price-currency { font-size: 22px; color: var(--text-muted); font-weight: 500; }
        .sbf-price-period { font-size: 14px; color: var(--text-dim); font-weight: 500; margin-left: 4px; }
        .sbf-feature-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .sbf-feature-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; }
        .sbf-check {
          flex-shrink: 0; width: 20px; height: 20px;
          border-radius: 50%; background: var(--accent-soft); color: var(--accent);
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .sbf-feature-list strong { font-weight: 600; }
        .sbf-feature-list .muted { color: var(--text-muted); font-weight: 400; }

        /* ── Footer ── */
        .sbf-foot {
          margin-top: 64px; padding-top: 28px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 16px;
          font-size: 13px; color: var(--text-dim);
          opacity: 0; animation: sbfFadeIn 0.8s ease 1.4s forwards;
        }
        .sbf-foot a { color: var(--text-muted); text-decoration: none; transition: color 150ms ease; }
        .sbf-foot a:hover { color: var(--text); }

        @keyframes sbfFadeIn { to { opacity: 1; } }
        @keyframes sbfFadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div className="sbf-wrap">
        <div className="sbf-page">
          <div className="sbf-brand">
            <span className="sbf-brand-dot"></span>
            <span>POLYMARKET SURE BET FINDER</span>
          </div>

          {/* ── How to open the panel — always visible ── */}
          <div className="sbf-onboarding">
            <span className="sbf-onboarding-eyebrow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L4 9l8 7 8-7-8-7z"/><path d="M4 16l8 7 8-7"/>
              </svg>
              HOW TO OPEN THE PANEL
            </span>
            <h2 className="sbf-onboarding-headline">2 clicks and you&apos;re in.</h2>
            <p className="sbf-onboarding-sub">Chrome doesn&apos;t let extensions auto-open the panel. Here&apos;s exactly where to click — takes 5 seconds.</p>

            <div className="sbf-onboarding-grid">
              <div className="sbf-step">
                <div className="sbf-step-num">1</div>
                <div className="sbf-step-art s1">
                  <Image
                    src="/extensions/sure-bet-finder/puzzle-icon.png"
                    alt="Click the puzzle piece icon in your Chrome toolbar"
                    width={280} height={80}
                    style={{width:"100%",maxWidth:280,height:"auto"}}
                    unoptimized
                  />
                </div>
                <div className="sbf-step-title">Click the puzzle piece icon</div>
                <div className="sbf-step-desc">Top-right of Chrome&apos;s toolbar (circled in red). Opens your installed extensions list.</div>
              </div>

              <div className="sbf-step">
                <div className="sbf-step-num">2</div>
                <div className="sbf-step-art s2">
                  <Image
                    src="/extensions/sure-bet-finder/extension-menu.png"
                    alt="Click 'Polymarket Sure Bet Finder' in the dropdown"
                    width={240} height={120}
                    style={{width:"100%",maxWidth:240,height:"auto",borderRadius:6}}
                    unoptimized
                  />
                </div>
                <div className="sbf-step-title">Click &quot;Polymarket Sure Bet Finder&quot;</div>
                <div className="sbf-step-desc">In the dropdown that appears, click the extension name. The pin icon next to it keeps the icon permanently visible.</div>
              </div>

              <div className="sbf-step">
                <div className="sbf-step-num">3</div>
                <div className="sbf-step-art s3">
                  <Image
                    src="/extensions/sure-bet-finder/side-panel.png"
                    alt="The Polymarket Sure Bet Finder side panel slides in"
                    width={400} height={200}
                    style={{width:"100%",maxWidth:"100%",maxHeight:200,objectFit:"cover",objectPosition:"top"}}
                    unoptimized
                  />
                </div>
                <div className="sbf-step-title">The panel slides in</div>
                <div className="sbf-step-desc">Top 20 highest-yield bets, ranked live. Refreshes every 5 minutes.</div>
              </div>
            </div>
          </div>

          {/* ── PERMISSION CTA — most important element on the page ── */}
          <div className="sbf-perm-banner">
            <div className="sbf-perm-inner">
              <div>
                <div className="sbf-perm-step">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                  Step 1 of 2 — Do this first
                </div>
                <div className="sbf-perm-headline">
                  Enable inline buttons on Polymarket
                </div>
                <div className="sbf-perm-sub">
                  Grant one-click access so the &ldquo;Find Sure Bets&rdquo; button appears directly on every Polymarket market page — right next to the YES/NO buttons.
                </div>

                {/* Expandable hint — shown after button click */}
                <div className="sbf-perm-steps-hint" id="permHint">
                  <div className="sbf-perm-hint-step">
                    <span className="sbf-perm-hint-num">1</span>
                    <span>Click the extension icon in Chrome&apos;s toolbar (top-right)</span>
                  </div>
                  <span className="sbf-perm-hint-arrow">→</span>
                  <div className="sbf-perm-hint-step">
                    <span className="sbf-perm-hint-num">2</span>
                    <span>Click <strong style={{color:"#d1fae5"}}>&quot;Enable on Polymarket&quot;</strong> in the panel that opens</span>
                  </div>
                  <span className="sbf-perm-hint-arrow">→</span>
                  <div className="sbf-perm-hint-step">
                    <span className="sbf-perm-hint-num">3</span>
                    <span>Click <strong style={{color:"#d1fae5"}}>&quot;Allow&quot;</strong> in the Chrome permission dialog</span>
                  </div>
                </div>
              </div>

              <div className="sbf-perm-btn-wrap">
                {permDone ? (
                  <button className="sbf-perm-btn sbf-perm-btn-done" disabled>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Done — see you on Polymarket!
                  </button>
                ) : (
                  <button
                    id="psbf-perm-btn"
                    className="sbf-perm-btn"
                    onClick={() => {
                      setPermDone(true);
                      document.getElementById("permHint")?.classList.add("open");
                      openPanel();
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Enable on Polymarket
                  </button>
                )}
                <div className="sbf-perm-note">Free · Takes 10 seconds</div>
              </div>
            </div>
          </div>

          {/* ── Hero ── */}
          <div className="sbf-hero">
            <div>
              <div className="sbf-update-banner" id="updateBanner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--accent)",flexShrink:0}}>
                  <path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 3v5h-5"/>
                </svg>
                <span id="updateText">You just updated to a new version.</span>
              </div>
              <span className="sbf-eyebrow" id="heroEyebrow">You&apos;re set up</span>
              <h1 className="sbf-headline">
                Find your edge<br />
                <span className="accent">before the market does.</span>
              </h1>
              <p className="sbf-sub">
                Polymarket Sure Bet Finder scans thousands of markets every minute for high-probability, short-window bets — the kind that compound capital fast.
              </p>
              <div className="sbf-actions">
                <a
                  href="https://topchrome.lemonsqueezy.com/checkout/buy/fadca5fb-6e2a-42f3-8660-e085b6348791"
                  target="_blank" rel="noopener noreferrer"
                  className="sbf-btn sbf-btn-primary"
                  onClick={openPanel}
                >
                  Unlock Premium — $4.99 lifetime
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
                <button className="sbf-btn sbf-btn-ghost" onClick={() => { openPanel(); window.close(); }}>
                  Maybe later
                </button>
              </div>
            </div>

            <div className="sbf-asset" aria-hidden="true">
              <div className="sbf-asset-title">LIVE — Top Bets Right Now</div>
              {[{pct:"98.0%"},{pct:"97.5%"},{pct:"96.5%"},{pct:"95.0%"},{pct:"92.0%"}].map(({pct}) => (
                <div className="sbf-asset-row" key={pct}>
                  <div><div className="sbf-bar"><div className="sbf-bar-fill"></div></div></div>
                  <div className="sbf-pct">{pct}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Features ── */}
          <div className="sbf-section">
            <div className="sbf-section-label">What it does for you</div>
            <div className="sbf-features">
              <div className="sbf-feature">
                <div className="sbf-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div className="sbf-feature-title">Lightning scans</div>
                <div className="sbf-feature-desc">~3,500 markets ranked in under 3 seconds. Parallel API fetching. Always fresh.</div>
              </div>
              <div className="sbf-feature">
                <div className="sbf-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                </div>
                <div className="sbf-feature-title">AI-powered scoring</div>
                <div className="sbf-feature-desc">Top 25 candidates run through Groq AI to flag event-ended premium bets — the safest plays.</div>
              </div>
              <div className="sbf-feature">
                <div className="sbf-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="sbf-feature-title">Insider warning system</div>
                <div className="sbf-feature-desc">Markets where insiders move price first work for you — not against you. Built into ranking.</div>
              </div>
            </div>
          </div>

          {/* ── Pricing ── */}
          <div className="sbf-pricing">
            <div>
              <div className="sbf-pricing-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                Lifetime access
              </div>
              <h2 className="sbf-pricing-headline">Unlock the full ranking, plus AI scoring on every search.</h2>
              <p className="sbf-pricing-sub">One-time payment. No subscriptions. No recurring charges. Yours forever — including every future update.</p>
              <div className="sbf-price">
                <span className="sbf-price-currency">$</span>
                <span className="sbf-price-num">4.99</span>
                <span className="sbf-price-period">/ lifetime</span>
              </div>
              <a
                href="https://topchrome.lemonsqueezy.com/checkout/buy/fadca5fb-6e2a-42f3-8660-e085b6348791"
                target="_blank" rel="noopener noreferrer"
                className="sbf-btn sbf-btn-primary"
              >
                Buy License — $4.99
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>

            <ul className="sbf-feature-list">
              {[
                {strong:"Top 5 highest-yield bets unlocked", muted:"— locked behind a blur for free users"},
                {strong:"Unlimited AI scoring", muted:"— free tier is capped at 2/day"},
                {strong:"Unlimited searches", muted:"— no daily limit"},
                {strong:"All future features included", muted:"— forever"},
                {strong:"Priority support", muted:"— direct line, fast replies"},
              ].map(({strong,muted}) => (
                <li key={strong}>
                  <span className="sbf-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span><strong>{strong}</strong> <span className="muted">{muted}</span></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sbf-foot">
            <div>Already have a license? Open the extension → click <strong style={{color:"var(--text)"}}>Enter License</strong>.</div>
            <div><a href="#" onClick={(e) => { e.preventDefault(); openPanel(); window.close(); }}>Close this tab</a></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SureBetFinderWelcomePage() {
  return (
    <Suspense>
      <SureBetFinderWelcomeInner />
    </Suspense>
  );
}
