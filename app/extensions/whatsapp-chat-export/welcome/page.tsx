"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

// Live CWS still activates Gumroad keys. Keep until 1.2.8+ is published.
const PRO_CHECKOUT_URL = "https://goldbaryaniv.gumroad.com/l/fznkf";
const WA_URL = "https://web.whatsapp.com";
const EXTENSION_ID = "pcbcfneocfimieifgogbkfodlkicemcl";
const GADS_ID = "AW-1006081641";
const INSTALL_CONVERSION_LABEL = "9_OQCPjxmoccEOms3t8D";

const ROWS: { feature: string; free: string; pro: string }[] = [
  { feature: "Messages", free: "First 100", pro: "Whole chat" },
  { feature: "TXT", free: "Yes", pro: "Yes" },
  { feature: "HTML", free: "—", pro: "Yes" },
  { feature: "Excel", free: "—", pro: "Yes" },
  { feature: "Photos & audio", free: "—", pro: "Yes" },
  { feature: "Contacts", free: "—", pro: "Yes" },
  { feature: "Group members", free: "—", pro: "Yes" },
];

const FAQS = [
  {
    q: "What is free?",
    a: "TXT of the first 100 messages in a chat. Full chats, Excel, media, contacts, and groups need PRO.",
  },
  {
    q: "How do I unlock PRO?",
    a: "Click Get PRO, finish checkout, then paste the license key from your email into the WAExportPro side panel.",
  },
  {
    q: "Do my chats leave this computer?",
    a: "No. Everything stays in Chrome.",
  },
  {
    q: "Do I need the phone app?",
    a: "No. This only works with WhatsApp Web in Chrome.",
  },
];

export default function WhatsAppChatExportWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    try {
      const gclid =
        typeof window !== "undefined"
          ? window.localStorage.getItem("_wa_gclid")
          : null;
      const w = window as unknown as {
        chrome?: { runtime?: { sendMessage?: (...args: unknown[]) => void } };
      };
      if (gclid && w.chrome?.runtime?.sendMessage) {
        w.chrome.runtime.sendMessage(
          EXTENSION_ID,
          { key: "bridge_gclid", gclid },
          () => {},
        );
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GADS_ID}');
          gtag('event', 'conversion', {'send_to': '${GADS_ID}/${INSTALL_CONVERSION_LABEL}'});
        `}
      </Script>

      <style>{CSS}</style>

      <div className="wty">
        <div className="wty-card">
          <header className="wty-bar">
            <span className="wty-dot" aria-hidden="true" />
            <span>WAExportPro</span>
            <em>Installed</em>
          </header>

          <div className="wty-body">
            <div className="wty-thread" aria-hidden="true">
              <div className="wty-in">Installed. You can export from WhatsApp Web.</div>
              <div className="wty-out">Free covers the first 100 messages.</div>
              <div className="wty-in">Need the whole chat, Excel, or photos?</div>
              <div className="wty-out">That’s PRO.</div>
            </div>

            <h1>Thank you</h1>
            <p className="wty-sub">
              Unlock PRO for the full backup — or start with the free limit.
            </p>

            <a
              className="wty-cta"
              href={PRO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get PRO
            </a>
            <a className="wty-skip" href={WA_URL} target="_blank" rel="noopener noreferrer">
              Continue with free
            </a>
            <p className="wty-micro">Key arrives by email · stays on your computer</p>

            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>Free</th>
                  <th>PRO</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className={row.free === "—" ? "off" : ""}>{row.free}</td>
                    <td className="on">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="wty-faq">
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      {faq.q}
                      <span aria-hidden="true">{open ? "–" : "+"}</span>
                    </button>
                    {open && <p>{faq.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <footer>
          <Link href="/">Calc-Tech</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </footer>
      </div>
    </>
  );
}

const CSS = `
.wty {
  --ink: #111b21;
  --sub: #667781;
  --line: #e9edef;
  --green: #25d366;
  --green-ink: #054c29;
  --teal: #008069;
  --out: #d9fdd3;
  --paper: #efeae2;
  min-height: 100vh;
  font-family: var(--font-wty), "Segoe UI", Helvetica, Arial, sans-serif;
  color: var(--ink);
  background-color: var(--paper);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cg fill='none' stroke='%23d5cfc4' stroke-width='1.2'%3E%3Cpath d='M36 48h30a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H50l-10 8v-8h-4a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8z'/%3E%3Ccircle cx='168' cy='70' r='11'/%3E%3Cpath d='M70 168l7 7 13-14'/%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 40px;
}
.wty * { box-sizing: border-box; }
.wty a { color: inherit; }
.wty-card {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(11, 20, 26, 0.12);
}
.wty-bar {
  background: var(--teal);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  font-size: 16px;
  font-weight: 600;
}
.wty-bar em {
  margin-left: auto;
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.85;
}
.wty-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.25);
}
.wty-body { padding: 22px 22px 28px; }
.wty-thread { display: grid; gap: 8px; margin-bottom: 22px; }
.wty-in, .wty-out {
  max-width: 88%;
  padding: 8px 12px;
  font-size: 13.5px;
  line-height: 1.4;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.06);
}
.wty-in {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px 8px 8px 2px;
}
.wty-out {
  margin-left: auto;
  background: var(--out);
  border-radius: 8px 8px 2px 8px;
}
.wty h1 {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
}
.wty-sub {
  margin: 0 0 20px;
  color: var(--sub);
  font-size: 15px;
  line-height: 1.45;
}
.wty-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: var(--green);
  color: var(--green-ink);
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  border-radius: 24px;
}
.wty-cta:hover { filter: brightness(0.97); }
.wty-cta:focus-visible { outline: 3px solid var(--teal); outline-offset: 2px; }
.wty-skip {
  display: block;
  text-align: center;
  margin-top: 12px;
  color: var(--teal);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}
.wty-skip:hover { text-decoration: underline; }
.wty-micro {
  text-align: center;
  margin: 10px 0 22px;
  font-size: 12px;
  color: #8696a0;
}
.wty table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.wty th, .wty td {
  text-align: left;
  padding: 9px 6px;
  border-bottom: 1px solid var(--line);
}
.wty th:nth-child(2), .wty td:nth-child(2),
.wty th:nth-child(3), .wty td:nth-child(3) {
  text-align: center;
  width: 26%;
}
.wty thead th {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sub);
}
.wty td.on { color: var(--teal); font-weight: 600; }
.wty td.off { color: #c5c9cc; }
.wty tbody tr:last-child td { border-bottom: 0; }
.wty-faq { margin-top: 18px; border-top: 1px solid var(--line); padding-top: 6px; }
.wty-faq button {
  width: 100%;
  background: none;
  border: 0;
  padding: 11px 0;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
}
.wty-faq button:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
.wty-faq p {
  margin: 0 0 10px;
  color: var(--sub);
  font-size: 13.5px;
  line-height: 1.45;
}
footer {
  margin-top: 22px;
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #8696a0;
}
footer a { text-decoration: none; }
footer a:hover { color: var(--teal); }
@media (max-width: 480px) {
  .wty { padding: 12px 10px 28px; }
  .wty-card { border-radius: 10px; }
  .wty h1 { font-size: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .wty-cta { transition: none; }
}
`;
