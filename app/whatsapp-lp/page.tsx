"use client";

import { useState, useEffect, useRef } from "react";

const CWS_URL = "https://chromewebstore.google.com/detail/waexportpro-backup-whatsa/pcbcfneocfimieifgogbkfodlkicemcl";
const EDGE_URL = "https://microsoftedge.microsoft.com/addons/detail/whatsapp-chat-export-ba/hjkeddpelchcfinoifbkhnhghfjdddeo";

type Browser = "chrome" | "edge";

function detectBrowser(): Browser {
  if (typeof navigator === "undefined") return "chrome";
  return /Edg\//.test(navigator.userAgent) ? "edge" : "chrome";
}

/* WhatsApp logo SVG (card-band + product-line) */
function WaLogo({ size = 26, fill = "#25D366" }: { size?: number; fill?: string }) {
  return (
    <svg viewBox="0 0 448 512" width={size} height={size} style={{ fill }}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

/* Checkmark circle SVG */
function CheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="#1fa855" width={19} height={19} style={{ flexShrink: 0 }}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.6-4-4 1.7-1.7 2.3 2.3 5-5.5 1.8 1.6-6.8 7.3z"/>
    </svg>
  );
}

/* Chrome icon SVG */
function ChromeIcon() {
  return (
    <svg viewBox="0 0 256 256" width={26} height={26} aria-label="Chrome">
      <path d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223 0-39.335-31.886-71.223-71.221-71.223-39.335 0-71.222 31.888-71.222 71.223 0 39.335 31.887 71.223 71.222 71.223Z" fill="#fff"/>
      <path d="M35.89 92.997c-5.313-9.203-11.558-18.862-18.736-28.977a127.98 127.98 0 0 0 110.857 191.981c11.78-16.523 19.78-28.437 23.996-35.74 8.099-14.028 18.573-34.112 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.015c-17.453-32.548-29.68-54.886-36.683-67.013Z" fill="#229342"/>
      <path d="M128.008 255.996A127.972 127.972 0 0 0 255.996 128a127.983 127.983 0 0 0-17.196-64H128.002a63.993 63.993 0 0 1 55.428 95.997c-8.55 15.11-14.808 26.052-18.777 32.825-3.969 6.774-16.184 27.832-36.645 63.173Z" fill="#fbc116"/>
      <path d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67 0-27.986-22.685-50.67-50.67-50.67-27.983 0-50.669 22.686-50.669 50.67 0 27.985 22.686 50.67 50.67 50.67Z" fill="#1a73e8"/>
      <path d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99.015.008a63.993 63.993 0 0 1 55.415-96.014Z" fill="#e33b2e"/>
    </svg>
  );
}

/* Edge icon (4-square MS logo) */
function EdgeIcon() {
  return (
    <span style={{ display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 22, height: 22, verticalAlign: "middle" }}>
      <i style={{ display: "block", background: "#F25022" }} />
      <i style={{ display: "block", background: "#7FBA00" }} />
      <i style={{ display: "block", background: "#00A4EF" }} />
      <i style={{ display: "block", background: "#FFB900" }} />
    </span>
  );
}

export default function WhatsAppLpPage() {
  const [step, setStep] = useState(1);
  const [browser, setBrowser] = useState<Browser>("chrome");
  const [showExit, setShowExit] = useState(false);
  const exitShown = useRef(false);

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  useEffect(() => {
    // GCLID passthrough
    const p = new URLSearchParams(window.location.search);
    const g = p.get("gclid") || p.get("pclid");
    if (g) localStorage.setItem("waex_gclid", g);
  }, []);

  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitShown.current && step < 2) {
        exitShown.current = true;
        setShowExit(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [step]);

  const isEdge = browser === "edge";
  const storeUrl = isEdge ? EDGE_URL : CWS_URL;
  const browserLabel = isEdge ? "Edge" : "Chrome";
  const storeLabel = isEdge ? "Microsoft Edge Add-ons" : "Chrome Web Store";
  const storeLabelShort = isEdge ? "Edge Add-ons" : "Chrome Web Store";
  const addToLabel = isEdge ? '"Get"' : '"Add to Chrome"';

  const goStep2 = () => setStep(2);
  const goStep3 = () => {
    window.open(storeUrl, "_blank");
    setTimeout(() => setStep(3), 1000);
  };
  const tryAgain = () => window.open(storeUrl, "_blank");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #25D366; --green-hover: #1fc25b;
          --teal: #128C7E; --teal-dark: #075E54;
          --ink: #111b21; --sub: #54656f; --grey2: #dfe3e4;
        }
        .waf-body {
          font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
          color: var(--ink);
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative;
          background-color: #efeae2;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cg fill='none' stroke='%23cfc7ba' stroke-width='1.4'%3E%3Cpath d='M30 40h28a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H44l-10 8v-8h-4a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8z'/%3E%3Ccircle cx='150' cy='60' r='12'/%3E%3Cpath d='M140 170c6-10 18-10 24 0s18 10 24 0'/%3E%3Cpath d='M60 150l8 8 14-16'/%3E%3Cpath d='M180 120l6 12 12 2-9 9 2 13-11-6-11 6 2-13-9-9 12-2z'/%3E%3Ccircle cx='105' cy='105' r='3'/%3E%3C/g%3E%3C/svg%3E");
          padding-bottom: 44px;
        }
        .waf-body::after {
          content: ""; position: fixed; inset: 0;
          background: rgba(11,20,26,0.45); z-index: 1; pointer-events: none;
        }
        .waf-card {
          width: 780px; max-width: 96vw;
          background: #fff; border-radius: 24px;
          box-shadow: 0 24px 64px rgba(11,20,26,0.45);
          padding: 0 0 38px; position: relative; z-index: 2; margin: 40px auto;
          overflow: hidden;
        }
        .waf-band {
          background: var(--teal-dark); color: #fff;
          display: flex; align-items: center; gap: 11px;
          padding: 15px 28px;
          font-family: 'Inter Tight', sans-serif; font-size: 17px; font-weight: 600;
        }
        .waf-band-right { margin-left: auto; font-size: 11.5px; font-weight: 500; opacity: 0.85; display: flex; align-items: center; gap: 6px; }
        .waf-inner { padding: 30px 44px 0; }
        h1.waf-h1 { font-family: 'Inter Tight', sans-serif; font-size: 33px; font-weight: 600; letter-spacing: -0.02em; text-align: center; margin-bottom: 16px; }
        .waf-product-line { display: flex; align-items: center; justify-content: center; gap: 11px; font-size: 21px; font-weight: 500; color: var(--ink); margin-bottom: 20px; font-family: 'Inter Tight', sans-serif; }
        .waf-benefits { width: fit-content; margin: 0 auto 14px; font-size: 14.5px; line-height: 2.1; }
        .waf-benefits div { display: flex; align-items: center; gap: 9px; }
        .waf-format-row { display: flex; justify-content: center; gap: 8px; margin-bottom: 14px; }
        .waf-chip { font-size: 12px; font-weight: 700; letter-spacing: 0.04em; padding: 5px 14px; border-radius: 999px; border: 1px solid; }
        .waf-chip-pdf  { color: #c62828; border-color: #f3c1c1; background: #fdf3f3; }
        .waf-chip-csv  { color: #1e7e34; border-color: #bfe3c8; background: #f2faf4; }
        .waf-chip-txt  { color: #455a64; border-color: #cfd8dc; background: #f4f7f8; }
        .waf-chip-html { color: #b25b00; border-color: #f0d4ae; background: #fdf7ee; }
        .waf-free-note { text-align: center; font-size: 11.5px; color: #8696a0; margin-bottom: 16px; }
        .waf-compat { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 20px; font-size: 13.5px; color: var(--ink); }
        .waf-compat-check { color: #1fa855; font-size: 19px; font-weight: 700; }
        .waf-btn-main {
          display: block; margin: 0 auto;
          background: var(--green); color: #0a3d1e;
          width: 400px; max-width: 100%; height: 62px;
          font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;
          border: none; border-radius: 999px; cursor: pointer;
        }
        .waf-btn-main:hover { background: var(--green-hover); }
        .waf-btn-teal {
          display: block; margin: 0 auto;
          background: var(--teal); color: #fff;
          width: 400px; max-width: 100%; height: 62px;
          font-size: 22px; font-weight: 700; font-family: 'Inter', sans-serif;
          border: none; border-radius: 999px; cursor: pointer;
        }
        .waf-btn-teal:hover { background: #0f7a6e; }
        .waf-microcopy { text-align: center; font-size: 12px; color: #8696a0; margin-top: 10px; }
        .waf-s2-heading { font-weight: 700; text-align: center; font-size: 19px; margin-bottom: 4px; }
        .waf-s2-subtext { text-align: center; font-size: 13.5px; margin-bottom: 12px; color: var(--sub); }
        .waf-s2-instructions { font-size: 14px; text-align: center; margin-bottom: 16px; line-height: 2.1; }
        .waf-s2-instructions b { color: var(--teal); }

        /* Stepper */
        .waf-stepper { counter-reset: step; margin: 38px 22% 0; }
        .waf-sp { position: relative; display: flex; z-index: 1; }
        .waf-track { position: absolute; top: 5px; width: 70%; left: 14%; height: 5px; background: var(--grey2); z-index: -1; }
        .waf-si { position: relative; width: 100%; font-size: 12.5px; }
        .waf-si::before {
          content: counter(step); counter-increment: step;
          display: flex; margin: 0 auto 10px; width: 18px; height: 18px;
          background: #fff; border: 2px solid var(--grey2); border-radius: 100%;
          color: var(--ink); line-height: 1; transform: scale(1.2);
          justify-content: center; align-items: center; font-size: 12px;
        }
        .waf-si::after {
          content: ""; position: absolute; top: 6px; left: 50%; width: 0%;
          height: 5px; background: var(--grey2); z-index: -1;
        }
        .waf-si.active::before { border: 2px solid var(--green); animation: wafPulse 2s infinite; }
        .waf-si.done::before {
          transform: scale(1.5);
          content: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2325D366' d='M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.332 26.629 74.98 74.98 26.629 123.332 0 187.62 0 256s26.629 132.667 74.98 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.98C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.981-181.02zm-58.713 120.093L235.241 338.139a14.953 14.953 0 01-10.606 4.393 14.953 14.953 0 01-10.607-4.393l-80.334-80.333c-5.858-5.857-5.858-15.354 0-21.213 5.857-5.858 15.355-5.858 21.213 0l69.728 69.727 132.458-132.46c5.857-5.858 15.355-5.858 21.213 0s5.858 15.355 0 21.213z'/%3E%3C%2Fsvg%3E");
          justify-content: unset; align-items: baseline;
        }
        .waf-si.done::after { background: var(--teal); animation: wafFill 1s forwards; }
        .waf-si-text { display: flex; flex-direction: column; width: 33%; align-items: center; white-space: nowrap; }
        .waf-si-extra { display: none; color: var(--teal); font-size: 12.5px; font-weight: 600; padding-top: 4px; }
        .waf-si.active .waf-si-extra { display: block; }

        @keyframes wafPulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.5); } 70% { box-shadow: 0 0 0 10px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
        @keyframes wafFill  { 0% { width: 0%; } 100% { width: 100%; } }

        /* Footer */
        .waf-footer { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 10; }
        .waf-footer ul { list-style: none; text-align: center; font-size: 11px; padding: 7px 0; margin: 0; background: rgba(255,255,255,.95); border-top: 1px solid #ddd; color: #54656f; }
        .waf-footer li { display: inline; padding: 0 7px; }
        .waf-footer li + li { border-left: 1px solid #b9c0c5; }
        .waf-footer a { color: #54656f; text-decoration: none; }

        /* Exit popup */
        .waf-overlay { position: fixed; inset: 0; background: rgba(11,20,26,.7); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .waf-popup { background: #fff; border-radius: 20px; padding: 40px 44px 34px; width: 520px; max-width: 94vw; text-align: center; position: relative; animation: wafPopIn .25s ease-out; }
        @keyframes wafPopIn { from { transform: scale(.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .waf-popup-x { position: absolute; top: 13px; right: 17px; font-size: 22px; color: #aaa; cursor: pointer; background: none; border: none; }
        .waf-popup h2 { font-size: 24px; font-weight: 700; margin-bottom: 10px; font-family: 'Inter Tight', sans-serif; }
        .waf-popup p { font-size: 14.5px; color: var(--sub); line-height: 1.6; margin-bottom: 22px; }
        .waf-popup-cta { width: 100%; background: var(--green); color: #0a3d1e; font-weight: 700; font-size: 17px; border: none; border-radius: 999px; padding: 16px; cursor: pointer; font-family: 'Inter', sans-serif; }
        .waf-popup-cta:hover { background: var(--green-hover); }
        .waf-popup-dismiss { display: inline-block; margin-top: 13px; font-size: 12px; color: #9aa6ac; cursor: pointer; text-decoration: underline; background: none; border: none; }

        @media (max-width: 860px) {
          .waf-inner { padding: 22px 18px 0; }
          h1.waf-h1 { font-size: 24px; }
          .waf-product-line { font-size: 17px; }
          .waf-btn-main, .waf-btn-teal { font-size: 18px; }
          .waf-stepper { margin: 30px 8% 0; }
        }
      `}</style>

      <div className="waf-body">
        <div className="waf-card">
          {/* Teal header band */}
          <div className="waf-band">
            <WaLogo size={26} fill="#25D366" />
            WhatsApp Exporter
            <span className="waf-band-right">🔒 100% private — runs locally</span>
          </div>

          <div className="waf-inner">
            <h1 className="waf-h1">WhatsApp Exporter for {browserLabel}</h1>

            <div className="waf-product-line">
              <WaLogo size={36} fill="#25D366" />
              WhatsApp Chat Export &amp; Backup
            </div>

            <div className="waf-benefits">
              <div><CheckCircle />Export any chat to PDF, CSV, TXT or HTML — in one click</div>
              <div><CheckCircle />Names, dates &amp; timestamps included · filter by date range</div>
              <div><CheckCircle />100% private — runs locally in your browser, no sign-up</div>
            </div>

            <div className="waf-format-row">
              <span className="waf-chip waf-chip-pdf">PDF</span>
              <span className="waf-chip waf-chip-csv">CSV</span>
              <span className="waf-chip waf-chip-txt">TXT</span>
              <span className="waf-chip waf-chip-html">HTML</span>
            </div>

            <p className="waf-free-note">Free to install · free plan exports up to 100 messages per chat · PRO unlocks unlimited history &amp; media</p>

            <div className="waf-compat">
              <span className="waf-compat-check">✓</span>
              Compatible with your browser
              {isEdge ? <EdgeIcon /> : <ChromeIcon />}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <button className="waf-btn-main" onClick={goStep2}>Next</button>
                <div className="waf-microcopy">Free &nbsp;·&nbsp; No sign-up &nbsp;·&nbsp; Takes 30 seconds</div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <div className="waf-s2-heading">Before we continue</div>
                <div className="waf-s2-subtext">to the {storeLabel}</div>
                <div className="waf-s2-instructions">
                  1. Click <b>{addToLabel}</b><br />
                  2. Click <b>&ldquo;Add extension&rdquo;</b>
                </div>
                <button className="waf-btn-main" onClick={goStep3}>Add Extension</button>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <button className="waf-btn-teal" onClick={tryAgain}>Try Again</button>
                <div className="waf-microcopy">The store tab may have been blocked — click to reopen it</div>
              </div>
            )}

            {/* Stepper */}
            <div className="waf-stepper">
              <div className="waf-sp">
                <div className="waf-track" />
                <div className={`waf-si ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>
                  <div className="waf-si-text">
                    <span>Step One</span>
                    <span className="waf-si-extra" />
                  </div>
                </div>
                <div className={`waf-si ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>
                  <div className="waf-si-text">
                    <span>Step Two</span>
                    <span className="waf-si-extra">Almost there!</span>
                  </div>
                </div>
                <div className={`waf-si ${step === 3 ? "active" : ""}`}>
                  <div className="waf-si-text">
                    <span>{storeLabelShort}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="waf-footer">
        <ul>
          <li>2026 © WhatsApp Chat Export &amp; Backup — an independent extension, not affiliated with WhatsApp LLC or Meta</li>
          <li><a href="https://calc-tech.com/waexportpro/privacy.html" target="_blank" rel="noopener">Privacy Policy</a></li>
          <li><a href="mailto:support@calc-tech.com">Contact Us</a></li>
        </ul>
      </div>

      {/* Exit-intent popup */}
      {showExit && (
        <div className="waf-overlay" onClick={() => setShowExit(false)}>
          <div className="waf-popup" onClick={e => e.stopPropagation()}>
            <button className="waf-popup-x" onClick={() => setShowExit(false)}>&#x2715;</button>
            <div style={{ fontSize: 44, marginBottom: 12 }}>💬</div>
            <h2>Wait — your chats aren&apos;t backed up!</h2>
            <p>The exporter is <strong>free to install</strong>. Save any WhatsApp chat to PDF, CSV or TXT in one click — everything stays on your own computer.</p>
            <button className="waf-popup-cta" onClick={() => { setShowExit(false); goStep2(); }}>Get the Free Exporter</button>
            <br />
            <button className="waf-popup-dismiss" onClick={() => setShowExit(false)}>No thanks — I&apos;ll risk losing them</button>
          </div>
        </div>
      )}
    </>
  );
}
