"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/whatsapp-chat-export-back/mmfnoflakijglhcmejaeoajpcgidompn?authuser=8&hl=en";
const EDGE_STORE_URL =
  "https://microsoftedge.microsoft.com/addons/detail/whatsapp-chat-export-ba/hjkeddpelchcfinoifbkhnhghfjdddeo";

type Browser = "chrome" | "edge";

function detectBrowser(): Browser {
  if (typeof navigator === "undefined") return "chrome";
  return navigator.userAgent.includes("Edg/") ? "edge" : "chrome";
}

export default function WhatsAppLpPage() {
  const [step, setStep] = useState(1);
  const [browser, setBrowser] = useState<Browser>("chrome");
  const [showExit, setShowExit] = useState(false);
  const [step2Anim, setStep2Anim] = useState(false);
  const exitShown = useRef(false);

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown.current && step < 2) {
        exitShown.current = true;
        setShowExit(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [step]);

  const storeUrl = browser === "edge" ? EDGE_STORE_URL : CHROME_STORE_URL;
  const browserLabel = browser === "edge" ? "Edge" : "Chrome";
  const storeLabel = browser === "edge" ? "Edge Add-ons" : "Chrome Web Store";
  const addToLabel = browser === "edge" ? "Add to Edge" : "Add to Chrome";

  const goStep2 = () => {
    setStep(2);
    setStep2Anim(true);
  };

  const goStep3 = () => {
    window.open(storeUrl, "_blank");
    setStep(3);
  };

  const tryAgain = () => {
    window.open(storeUrl, "_blank");
  };

  return (
    <>
      {/* Scoped styles — prefixed wai- to avoid conflicts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

        .wai-root {
          font-family: Roboto, sans-serif;
          font-size: 13px;
          color: rgb(38, 38, 38);
          background: rgb(249, 249, 249);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: 40px;
        }
        .wai-root::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
          pointer-events: none;
        }
        .wai-card {
          width: 800px;
          max-width: calc(100% - 32px);
          background: rgb(255, 255, 255);
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 20px 1px;
          padding: 35px 40px;
          position: relative;
          z-index: 2;
          margin: 40px auto;
          box-sizing: border-box;
        }
        .wai-h1 {
          font-size: 34px;
          font-weight: 400;
          margin: 0 0 1.68rem;
          text-align: center;
          font-family: Roboto, sans-serif;
        }
        .wai-subtitle {
          font-size: 28px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 1.68rem;
          font-family: Roboto, sans-serif;
        }
        .wai-subtitle img {
          height: 30px;
          margin-right: 10px;
        }
        .wai-description {
          font-size: 13px;
          text-align: center;
          display: grid;
          width: fit-content;
          margin: 0 auto 1.68rem;
          line-height: 1.7;
          font-family: Roboto, sans-serif;
        }
        .wai-compatible {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.3rem;
          font-size: 13px;
          font-family: Roboto, sans-serif;
        }
        .wai-compatible .material-icons {
          font-size: 28px;
          color: rgb(83, 166, 86);
          margin-right: 5px;
          vertical-align: sub;
        }
        .wai-compatible img {
          height: 30px;
          vertical-align: bottom;
          margin-left: 5px;
        }
        .wai-btn {
          cursor: pointer;
          border: none;
          display: block;
          margin: 0 auto;
          text-align: center;
          border-radius: 10px;
          font-family: Roboto, sans-serif;
        }
        .wai-btn-blue {
          background-color: rgb(26, 115, 232);
          color: rgb(255, 255, 255);
          width: 400px;
          max-width: 100%;
          height: 65px;
          line-height: 65px;
          font-size: 1.7rem;
        }
        .wai-btn-blue:hover { background-color: rgb(34, 150, 245); }
        .wai-btn-green {
          background-color: rgb(33, 140, 73);
          color: rgb(255, 255, 255);
          width: 400px;
          max-width: 100%;
          height: 65px;
          line-height: 65px;
          font-size: 1.7rem;
        }
        .wai-btn-green:hover { background-color: rgb(59, 160, 98); }
        .wai-step2-subheading {
          font-weight: bold;
          text-align: center;
          font-size: 18px;
          margin-bottom: 4px;
          font-family: Roboto, sans-serif;
        }
        .wai-step2-subtext {
          text-align: center;
          font-size: 13px;
          margin-bottom: 10px;
          color: rgb(38, 38, 38);
          font-family: Roboto, sans-serif;
        }
        .wai-step2-instructions {
          font-size: 13px;
          text-align: center;
          margin-bottom: 14px;
          line-height: 2;
          font-family: Roboto, sans-serif;
        }
        .wai-step2-instructions a { color: #1a73e8; text-decoration: none; }
        .wai-step2-instructions a:hover { text-decoration: underline; }

        /* Stepper */
        .wai-stepper {
          position: relative;
          margin-top: 2rem;
        }
        .wai-stepper-progress {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          counter-reset: step;
          position: relative;
        }
        .wai-stepper-track {
          position: absolute;
          top: 9px;
          width: 70%;
          left: 15%;
          height: 5px;
          background: #dfe3e4;
          z-index: 0;
        }
        .wai-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33.33%;
          position: relative;
          z-index: 1;
        }
        .wai-step-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #dfe3e4;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: Roboto, sans-serif;
          color: black;
          position: relative;
          z-index: 2;
        }
        .wai-step-circle.active {
          border-color: rgb(33, 115, 189);
          animation: waiPulse 2s ease infinite;
        }
        .wai-step-circle.complete {
          border-color: #05bc05;
          transform: scale(1.5);
          background: white;
        }
        .wai-step-line {
          position: absolute;
          top: 11px;
          left: 50%;
          width: 100%;
          height: 5px;
          background: #dfe3e4;
          z-index: 0;
        }
        .wai-step-line.filled {
          background: #2183dd;
          animation: waiNextStep 1s ease forwards;
        }
        .wai-step-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
          font-size: 13px;
          margin-top: 10px;
          font-family: Roboto, sans-serif;
        }
        .wai-step-extra {
          font-size: 13px;
          font-weight: 500;
          padding-top: 4px;
          font-family: Roboto, sans-serif;
        }

        @keyframes waiPulse {
          0%   { box-shadow: 0 0 0 0 rgba(33,131,221,0.4); }
          70%  { box-shadow: 0 0 0 10px rgba(33,131,221,0); }
          100% { box-shadow: 0 0 0 0 rgba(33,131,221,0); }
        }
        @keyframes waiNextStep {
          0%   { width: 0; }
          100% { width: 100%; }
        }
        @keyframes waiPopIn {
          0%   { transform: scale(0.88); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Footer */
        .wai-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 10;
        }
        .wai-footer ul {
          list-style: none;
          text-align: center;
          font-size: 11px;
          padding: 8px 0;
          margin: 0;
          background: rgb(249, 249, 249);
          border-top: 1px solid rgb(221, 221, 221);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          font-family: Roboto, sans-serif;
          color: rgb(38,38,38);
        }
        .wai-footer a { color: rgb(38,38,38); text-decoration: none; }
        .wai-footer a:hover { text-decoration: underline; }
        .wai-footer-sep { color: #aaa; }

        /* Exit popup */
        .wai-exit-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wai-exit-popup {
          background: rgb(255, 255, 255);
          border-radius: 10px;
          box-shadow: rgba(0,0,0,0.75) 0px 0px 30px 2px;
          padding: 40px 44px 36px;
          width: 520px;
          max-width: calc(100% - 32px);
          text-align: center;
          position: relative;
          animation: waiPopIn 0.25s ease-out;
          font-family: Roboto, sans-serif;
        }
        .wai-exit-close {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 22px;
          color: #aaa;
          cursor: pointer;
          background: none;
          border: none;
          line-height: 1;
        }
        .wai-exit-close:hover { color: #555; }
        .wai-exit-popup h2 { font-size: 24px; font-weight: 500; margin: 0 0 10px; color: rgb(38,38,38); }
        .wai-exit-popup p { font-size: 14px; color: #555; line-height: 1.6; margin: 0 0 24px; }
        .wai-exit-cta {
          background: rgb(26, 115, 232);
          color: white;
          border: none;
          border-radius: 10px;
          width: 100%;
          height: 56px;
          font-size: 1.3rem;
          font-family: Roboto, sans-serif;
          cursor: pointer;
          margin-bottom: 12px;
          display: block;
        }
        .wai-exit-cta:hover { background: rgb(34, 150, 245); }
        .wai-exit-dismiss {
          font-size: 12px;
          color: #aaa;
          cursor: pointer;
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          font-family: Roboto, sans-serif;
        }
        .wai-exit-dismiss:hover { color: #777; }
      `}</style>

      <div className="wai-root">
        <div className="wai-card">

          {/* H1 */}
          <h1 className="wai-h1">Install {browserLabel} Extension</h1>

          {/* Subtitle with icon */}
          <div className="wai-subtitle">
            {/* WhatsApp icon SVG */}
            <svg viewBox="0 0 48 48" style={{height: 30, marginRight: 10, flexShrink: 0}} aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="#25D366"/>
              <path fill="#fff" d="M24 11C17 11 11 17 11 24c0 2.3.6 4.5 1.7 6.4L11 37l6.8-1.7A13 13 0 0 0 24 37c7 0 13-6 13-13S31 11 24 11zm6.4 17.8c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.4-5.1-4.6-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-1.9 1-2.2.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.5-.6c.2-.2.4-.3.6-.2l2 .9c.2.1.4.2.4.4 0 .3 0 1-.3 1.8z"/>
            </svg>
            WhatsApp Chat Export &amp; Backup
          </div>

          {/* Description */}
          <p className="wai-description">
            Click Next to go to the {storeLabel} and install our {browserLabel} extension.<br/>
            Export and backup your WhatsApp chats to PDF, TXT, CSV, or HTML — with full history, media, and date filters.<br/>
            Free to use — up to 100 messages. PRO unlocks full history and media export.
          </p>

          {/* Compatible row */}
          <div className="wai-compatible">
            <i className="material-icons">check</i>
            Compatible with your browser
            {browser === "edge" ? (
              /* Edge icon */
              <svg viewBox="0 0 48 48" style={{height: 30, marginLeft: 5, verticalAlign: "bottom"}} aria-label="Edge">
                <defs>
                  <linearGradient id="wai-edge-a" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0078D4"/>
                    <stop offset="100%" stopColor="#00B4F0"/>
                  </linearGradient>
                </defs>
                <ellipse cx="24" cy="26" rx="16" ry="14" fill="url(#wai-edge-a)"/>
                <path fill="#50E6FF" d="M8 26c0-8.8 7.2-16 16-16 3.8 0 7.3 1.3 10 3.5C31.4 11.2 27.8 10 24 10 15.2 10 8 17.2 8 26z"/>
                <path fill="#fff" d="M24 16c5.5 0 10 4.5 10 10 0 2-.6 3.9-1.6 5.5H14c-.6-1.5-1-3.2-1-5 0-5.5 4.5-10 11-10.5z" opacity=".3"/>
                <path fill="#fff" d="M38 32c-2 3.6-5.9 6-10.3 6-4 0-7.6-2-9.8-5H38z"/>
              </svg>
            ) : (
              /* Chrome icon */
              <svg viewBox="0 0 48 48" style={{height: 30, marginLeft: 5, verticalAlign: "bottom"}} aria-label="Chrome">
                <circle cx="24" cy="24" r="10" fill="#4285F4"/>
                <path fill="#EA4335" d="M24 14h18.3A24 24 0 0 0 5.2 11.2L14.6 27A10 10 0 0 1 24 14z"/>
                <path fill="#FBBC05" d="M5.2 11.2A24 24 0 0 0 0 24a24 24 0 0 0 4.2 13.6L13.8 21.8A10 10 0 0 1 14.6 27z"/>
                <path fill="#34A853" d="M24 34a10 10 0 0 1-9.8-8.2L4.2 37.6A24 24 0 0 0 24 48a24 24 0 0 0 18.3-10H24z"/>
                <circle cx="24" cy="24" r="7" fill="#4285F4"/>
                <circle cx="24" cy="24" r="5" fill="#fff"/>
              </svg>
            )}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <button className="wai-btn wai-btn-blue" onClick={goStep2}>
              Next
            </button>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className={step2Anim ? "wai-expend" : ""}>
              <div className="wai-step2-subheading">Before we continue</div>
              <div className="wai-step2-subtext">to {storeLabel}</div>
              <div className="wai-step2-instructions">
                1. Click <a href={storeUrl} target="_blank" rel="noopener noreferrer">&ldquo;{addToLabel}&rdquo;</a><br/>
                2. Click <a href={storeUrl} target="_blank" rel="noopener noreferrer">&ldquo;Add extension&rdquo;</a>
              </div>
              <button className="wai-btn wai-btn-blue" onClick={goStep3}>
                Add Extension
              </button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <p style={{textAlign: "center", fontSize: 14, marginBottom: "1rem", color: "#555"}}>
                If the store didn&apos;t open, try again:
              </p>
              <button className="wai-btn wai-btn-green" onClick={tryAgain}>
                Try Again
              </button>
            </div>
          )}

          {/* Stepper */}
          <div className="wai-stepper">
            <div className="wai-stepper-progress">
              {/* Track */}
              <div className="wai-stepper-track" />

              {/* Step 1 */}
              <div className="wai-step-item">
                <div className={`wai-step-circle ${step === 1 ? "active" : step > 1 ? "complete" : ""}`}>
                  {step > 1 ? (
                    <svg viewBox="0 0 14 14" width="10" height="10"><path d="M1 7l4 4 8-8" stroke="#05bc05" strokeWidth="2" fill="none"/></svg>
                  ) : "1"}
                </div>
                <div className="wai-step-label">Step One</div>
              </div>

              {/* Step 2 */}
              <div className="wai-step-item">
                {/* Filled line between 1 and 2 */}
                <div className="wai-step-line" style={{
                  position: "absolute", top: 11, left: "-50%", width: "100%",
                  height: 5, zIndex: 0,
                  background: step >= 2 ? "#2183dd" : "#dfe3e4",
                  ...(step === 2 ? {animation: "waiNextStep 1s ease forwards"} : {})
                }}/>
                <div className={`wai-step-circle ${step === 2 ? "active" : step > 2 ? "complete" : ""}`}
                     style={{position: "relative", zIndex: 2}}>
                  {step > 2 ? (
                    <svg viewBox="0 0 14 14" width="10" height="10"><path d="M1 7l4 4 8-8" stroke="#05bc05" strokeWidth="2" fill="none"/></svg>
                  ) : "2"}
                </div>
                <div className="wai-step-label">
                  Step Two
                  {step >= 2 && <span className="wai-step-extra">Almost there!</span>}
                </div>
              </div>

              {/* Step 3 */}
              <div className="wai-step-item">
                <div className="wai-step-line" style={{
                  position: "absolute", top: 11, left: "-50%", width: "100%",
                  height: 5, zIndex: 0,
                  background: step >= 3 ? "#2183dd" : "#dfe3e4",
                }}/>
                <div className={`wai-step-circle ${step === 3 ? "active" : ""}`}
                     style={{position: "relative", zIndex: 2}}>
                  3
                </div>
                <div className="wai-step-label">{storeLabel}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed Footer */}
      <div className="wai-footer">
        <ul>
          <li>Copyright &copy; 2026 WhatsApp Chat Export</li>
          <li className="wai-footer-sep">|</li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li className="wai-footer-sep">|</li>
          <li><Link href="/terms">Terms and Conditions</Link></li>
          <li className="wai-footer-sep">|</li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Exit-intent popup */}
      {showExit && (
        <div className="wai-exit-overlay" onClick={() => setShowExit(false)}>
          <div className="wai-exit-popup" onClick={e => e.stopPropagation()}>
            <button className="wai-exit-close" onClick={() => setShowExit(false)}>&times;</button>
            <h2>Wait — don&apos;t miss out!</h2>
            <p>
              WhatsApp Chat Export &amp; Backup is free to install.<br/>
              Export any chat to PDF, TXT, or CSV in seconds — no account needed, works right in your browser.
            </p>
            <a href={storeUrl} target="_blank" rel="noopener noreferrer">
              <button className="wai-exit-cta">Get It Free — Install Now</button>
            </a>
            <button className="wai-exit-dismiss" onClick={() => setShowExit(false)}>
              No thanks, I&apos;ll skip it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
