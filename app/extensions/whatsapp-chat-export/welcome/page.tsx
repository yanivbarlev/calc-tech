"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

// Live CWS still activates Gumroad keys. Keep this until 1.2.8+ is published, then switch to LS $9.99.
const PRO_CHECKOUT_URL = "https://goldbaryaniv.gumroad.com/l/fznkf";
const WA_URL = "https://web.whatsapp.com";
const EXTENSION_ID = "pcbcfneocfimieifgogbkfodlkicemcl";
const GADS_ID = "AW-1006081641";
const INSTALL_CONVERSION_LABEL = "9_OQCPjxmoccEOms3t8D";

const ROWS: { feature: string; free: string; pro: string }[] = [
  { feature: "Messages per chat", free: "First 100", pro: "Whole chat" },
  { feature: "Text file (TXT)", free: "Yes", pro: "Yes" },
  { feature: "HTML backup", free: "—", pro: "Yes" },
  { feature: "Excel / CSV", free: "—", pro: "Yes" },
  { feature: "Photos, video, audio", free: "—", pro: "Yes" },
  { feature: "All contacts", free: "—", pro: "Excel file" },
  { feature: "Group members", free: "—", pro: "Excel file" },
];

const FAQS = [
  {
    q: "What do I get for free?",
    a: "TXT export of the first 100 messages in a chat. That is the cap. Longer chats, Excel, HTML, media, contacts, and group lists need PRO.",
  },
  {
    q: "How do I unlock PRO?",
    a: "Click Get PRO. Pay. Gumroad emails a license key. Open WhatsApp Web, open WAExportPro, paste the key, click Activate.",
  },
  {
    q: "Does anything leave my computer?",
    a: "No. Chats stay in Chrome. We never upload your messages.",
  },
  {
    q: "Do I need to install anything on my phone?",
    a: "No. This only works with WhatsApp Web in Chrome.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. 30 days, no questions. Reply to the receipt email.",
  },
];

export default function WhatsAppChatExportWelcomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
        <header className="wty-top">
          <div className="wty-brand">
            <span className="wty-mark" aria-hidden="true">
              WP
            </span>
            <div>
              <strong>WAExportPro</strong>
              <em>Installed in Chrome</em>
            </div>
          </div>
          <span className="wty-chip">Thank you</span>
        </header>

        <main>
          <section className="wty-hero">
            <div className="wty-copy">
              <p className="wty-kicker">Installed · one more click</p>
              <h1>
                Thank you.
                <span>Don&apos;t stop at 100 messages.</span>
              </h1>
              <p className="wty-sub">
                PRO saves the whole chat — Excel, HTML, photos, contacts, and
                group lists.
              </p>
              <a
                className="wty-cta"
                href={PRO_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="wty-cta-label">Get PRO</span>
                <span className="wty-cta-price">$4.99</span>
              </a>
              <p className="wty-trust">
                Instant license key · 30-day refund · Stays on your computer
              </p>
              <a className="wty-skip" href={WA_URL} target="_blank" rel="noopener noreferrer">
                Continue with the free 100-message limit →
              </a>
            </div>

            <aside className="wty-stage" aria-hidden="true">
              <div className="wty-sheet wty-sheet-free">
                <header>
                  <b>Free</b>
                  <span>100 messages</span>
                </header>
                <div className="wty-bubbles">
                  <div className="wty-b in">Are we still on for Thursday?</div>
                  <div className="wty-b out">Yes — I&apos;ll send the files.</div>
                  <div className="wty-b in">Invoice + photos attached</div>
                  <div className="wty-cut">
                    <span>CUT — older messages not saved</span>
                  </div>
                  <div className="wty-ghost">Yesterday&apos;s thread</div>
                  <div className="wty-ghost">Last month&apos;s photos</div>
                </div>
              </div>
              <div className="wty-sheet wty-sheet-pro">
                <header>
                  <b>PRO</b>
                  <span>Full archive</span>
                </header>
                <div className="wty-bubbles">
                  <div className="wty-b in">Are we still on for Thursday?</div>
                  <div className="wty-b out">Yes — I&apos;ll send the files.</div>
                  <div className="wty-media">IMG · VID · XLSX</div>
                  <div className="wty-b in">Invoice + photos attached</div>
                  <div className="wty-b out">Got it. Saved.</div>
                </div>
              </div>
            </aside>
          </section>

          <section className="wty-compare" aria-labelledby="wty-compare-h">
            <h2 id="wty-compare-h">Free vs PRO</h2>
            <div className="wty-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>What you get</th>
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
            </div>
            <a
              className="wty-cta wty-cta-mid"
              href={PRO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="wty-cta-label">Unlock every column</span>
              <span className="wty-cta-price">$4.99</span>
            </a>
          </section>

          <section className="wty-why">
            <h2>Why people upgrade on this screen</h2>
            <ul>
              <li>
                <strong>Long chats don&apos;t fit in 100 lines.</strong>
                Family, work, and legal threads are thousands of messages.
              </li>
              <li>
                <strong>Excel has real columns.</strong>
                Dates, names, and phones sit in separate cells — not one blob of
                text.
              </li>
              <li>
                <strong>Media is the proof.</strong>
                Photos, voice notes, and PDFs stay with the backup.
              </li>
            </ul>
          </section>

          <section className="wty-pay">
            <h2>Pay once. Paste the key. Export.</h2>
            <ol>
              <li>
                <b>Checkout</b>
                <span>Opens in a new tab. Takes about a minute.</span>
              </li>
              <li>
                <b>Email</b>
                <span>Your license key arrives in the receipt.</span>
              </li>
              <li>
                <b>Activate</b>
                <span>WhatsApp Web → WAExportPro → paste → Activate.</span>
              </li>
            </ol>
          </section>

          <section className="wty-faq" aria-labelledby="wty-faq-h">
            <h2 id="wty-faq-h">Questions</h2>
            <div className="wty-faq-list">
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className={open ? "open" : ""}>
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
          </section>
        </main>

        <div className="wty-sticky">
          <p>
            PRO · full chats · Excel · media
            <b>$4.99</b>
          </p>
          <a href={PRO_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            Get PRO
          </a>
        </div>

        <footer className="wty-foot">
          <Link href="/">Calc-Tech</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp Web
          </a>
        </footer>
      </div>
    </>
  );
}

const CSS = `
.wty {
  --ink: #13251c;
  --muted: #5b6d64;
  --paper: #eef3ea;
  --sheet: #f7faf5;
  --line: #cdd8ce;
  --leaf: #0c5c45;
  --leaf-2: #083f30;
  --gold: #c4a035;
  --cut: #b42318;
  --pro: #0f3d2e;
  min-height: 100vh;
  background:
    radial-gradient(1200px 480px at 80% -10%, #dce8d8 0%, transparent 60%),
    var(--paper);
  color: var(--ink);
  font-family: var(--font-wty-body), Outfit, ui-sans-serif, system-ui, sans-serif;
  padding-bottom: 88px;
}
.wty * { box-sizing: border-box; }
.wty a { color: inherit; }
.wty-top {
  max-width: 1120px;
  margin: 0 auto;
  padding: 18px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wty-brand { display: flex; align-items: center; gap: 12px; }
.wty-brand strong { display: block; font-size: 15px; letter-spacing: .02em; }
.wty-brand em { display: block; font-style: normal; font-size: 12px; color: var(--muted); }
.wty-mark {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--leaf); color: #f4f7f1;
  display: grid; place-items: center;
  font-family: var(--font-wty-display), Syne, sans-serif;
  font-weight: 800; font-size: 13px;
}
.wty-chip {
  font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
  border: 1px dashed var(--leaf); color: var(--leaf);
  padding: 6px 10px; background: #e7f1e6;
}
.wty-hero {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 20px 40px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  gap: 32px;
  align-items: center;
}
.wty-kicker {
  font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
  color: var(--leaf); margin: 0 0 12px;
}
.wty-copy h1 {
  font-family: var(--font-wty-display), Syne, sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 3.2vw, 40px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin: 0 0 12px;
  max-width: 16ch;
}
.wty-copy h1 span { display: block; color: var(--leaf-2); max-width: 18ch; }
.wty-sub { font-size: 16px; line-height: 1.4; color: var(--muted); margin: 0 0 18px; max-width: 36ch; }
.wty-cta {
  display: inline-flex; align-items: stretch;
  text-decoration: none; color: #f7f3e4;
  background: linear-gradient(180deg, #14785a 0%, #0b4f3b 100%);
  border-radius: 6px;
  box-shadow: 0 10px 24px rgba(11, 79, 59, .28);
  overflow: hidden;
  min-height: 58px;
}
.wty-cta:hover { filter: brightness(1.06); }
.wty-cta:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
.wty-cta-label {
  padding: 14px 22px;
  font-family: var(--font-wty-display), Syne, sans-serif;
  font-weight: 800; font-size: 20px; letter-spacing: .02em;
}
.wty-cta-price {
  padding: 14px 18px;
  background: #c9a227;
  color: #1a1404;
  font-weight: 800; font-size: 20px;
  display: grid; place-items: center;
  min-width: 92px;
}
.wty-trust { margin: 12px 0 16px; font-size: 13px; color: var(--muted); }
.wty-skip { font-size: 14px; color: var(--muted); }
.wty-skip:hover { color: var(--ink); }
.wty-stage { position: relative; min-height: 340px; }
.wty-sheet {
  background: var(--sheet);
  border: 1px solid var(--line);
  border-radius: 4px 18px 18px 4px;
  padding: 14px;
  width: 78%;
  box-shadow: 0 16px 40px rgba(19, 37, 28, .08);
}
.wty-sheet header {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 12px; text-transform: uppercase; letter-spacing: .12em;
  margin-bottom: 10px; color: var(--muted);
}
.wty-sheet header b { color: var(--ink); font-size: 13px; letter-spacing: .08em; }
.wty-sheet-free { transform: rotate(-2.2deg); }
.wty-sheet-pro {
  position: absolute; right: 0; top: 54px; width: 72%;
  background: #12372c; color: #e7f3ea; border-color: #1d5a46;
  transform: rotate(3deg);
  z-index: 1;
}
.wty-sheet-pro header { color: #9fbfb1; }
.wty-sheet-pro header b { color: #f3e3a6; }
.wty-bubbles { display: grid; gap: 8px; }
.wty-b { max-width: 92%; padding: 8px 11px; font-size: 13px; line-height: 1.35; }
.wty-b.in { background: #e4ece2; border-radius: 12px 12px 12px 4px; }
.wty-b.out { margin-left: auto; background: #d5ead8; border-radius: 12px 12px 4px 12px; }
.wty-sheet-pro .wty-b.in { background: #1c4d3d; }
.wty-sheet-pro .wty-b.out { background: #2a6a52; }
.wty-cut {
  border-top: 2px dashed var(--cut);
  color: var(--cut);
  font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
  padding-top: 8px; margin-top: 4px;
}
.wty-ghost { color: #9aa89e; font-size: 12px; filter: blur(0.4px); opacity: .55; }
.wty-media {
  font-size: 11px; font-weight: 800; letter-spacing: .16em;
  color: #f3e3a6; border: 1px dashed #f3e3a6; padding: 7px 10px; text-align: center;
}
.wty-compare, .wty-why, .wty-pay, .wty-faq {
  max-width: 860px; margin: 0 auto; padding: 8px 20px 36px;
}
.wty h2 {
  font-family: var(--font-wty-display), Syne, sans-serif;
  font-size: 28px; letter-spacing: -.02em; margin: 0 0 18px;
}
.wty-table-wrap { overflow-x: auto; border: 1px solid var(--line); background: var(--sheet); }
.wty table { width: 100%; border-collapse: collapse; min-width: 520px; }
.wty th, .wty td {
  text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line);
  font-size: 15px;
}
.wty th:nth-child(2), .wty td:nth-child(2),
.wty th:nth-child(3), .wty td:nth-child(3) { text-align: center; width: 22%; }
.wty thead th {
  background: #e4eee3; font-size: 12px; letter-spacing: .12em; text-transform: uppercase;
}
.wty thead th:last-child { background: #12372c; color: #f3e3a6; }
.wty td.on { font-weight: 700; color: var(--leaf); }
.wty td.off { color: #9aa89e; }
.wty tbody tr:last-child td { border-bottom: 0; }
.wty-cta-mid { margin-top: 18px; }
.wty-why ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.wty-why li {
  background: var(--sheet); border-left: 4px solid var(--gold); padding: 14px 16px;
}
.wty-why strong { display: block; margin-bottom: 4px; }
.wty-pay ol {
  list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; counter-reset: step;
}
.wty-pay li {
  counter-increment: step;
  display: grid; grid-template-columns: 36px 1fr; gap: 12px; align-items: start;
  padding: 12px 0; border-bottom: 1px solid var(--line);
}
.wty-pay li::before {
  content: counter(step);
  width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid var(--leaf); color: var(--leaf);
  display: grid; place-items: center; font-weight: 800;
}
.wty-pay b { display: block; }
.wty-pay span { color: var(--muted); font-size: 14px; }
.wty-faq-list { display: grid; gap: 8px; }
.wty-faq-list > div { background: var(--sheet); border: 1px solid var(--line); }
.wty-faq-list button {
  width: 100%; text-align: left; background: none; border: 0; cursor: pointer;
  padding: 14px 16px; font: inherit; font-weight: 700;
  display: flex; justify-content: space-between; gap: 12px; color: var(--ink);
}
.wty-faq-list button:focus-visible { outline: 2px solid var(--leaf); outline-offset: -2px; }
.wty-faq-list p { margin: 0; padding: 0 16px 14px; color: var(--muted); line-height: 1.5; }
.wty-sticky {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 18px;
  background: #0d241c; color: #eef6f0;
  box-shadow: 0 -8px 24px rgba(0,0,0,.18);
}
.wty-sticky p { margin: 0; font-size: 13px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.wty-sticky b { color: #f3e3a6; font-size: 18px; }
.wty-sticky a {
  text-decoration: none; background: #c9a227; color: #1a1404;
  font-weight: 800; padding: 12px 18px; min-width: 108px; text-align: center;
}
.wty-sticky a:hover { filter: brightness(1.08); }
.wty-foot {
  max-width: 1120px; margin: 0 auto; padding: 28px 20px 20px;
  display: flex; flex-wrap: wrap; gap: 14px 22px;
  font-size: 13px; color: var(--muted);
}
.wty-foot a:hover { color: var(--ink); }
@media (max-width: 860px) {
  .wty-hero { grid-template-columns: 1fr; padding-top: 20px; padding-bottom: 24px; }
  .wty-copy h1 { max-width: none; }
  .wty-stage { min-height: 260px; }
  .wty-sheet { width: 88%; }
  .wty-sheet-pro { width: 82%; top: 40px; }
}
@media (max-width: 560px) {
  .wty-cta { width: 100%; }
  .wty-cta-label, .wty-cta-price { flex: 1; text-align: center; }
  .wty-sticky p { font-size: 12px; }
  .wty-sheet-free { transform: none; }
  .wty-sheet-pro { transform: none; position: relative; top: 12px; right: auto; width: 100%; }
  .wty-stage { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .wty-cta, .wty-sticky a { transition: none; }
}
`;
