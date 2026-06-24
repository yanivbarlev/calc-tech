import Link from "next/link";

export default function SureBetFinderPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header
        className="bg-white sticky top-0 z-50"
        style={{ borderBottom: "1px solid #efefef" }}
      >
        <div
          className="mx-auto px-4 py-4 flex items-center justify-between"
          style={{ maxWidth: 960 }}
        >
          <Link href="/" className="font-bold text-lg" style={{ color: "#111" }}>
            Calc-Tech.com
          </Link>
          <span style={{ fontSize: 13, color: "#bbb" }}>Privacy Policy</span>
        </div>
      </header>

      <main className="mx-auto px-4 py-14" style={{ maxWidth: 760 }}>
        <div className="mb-12">
          <p
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#bbb",
              marginBottom: 12,
            }}
          >
            Legal
          </p>
          <h1 className="font-bold" style={{ fontSize: 36, color: "#111", marginBottom: 8 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#888", fontSize: 14 }}>
            Polymarket Sure Bet Finder Chrome Extension · Last updated: June 24, 2026
          </p>
        </div>

        <section
          className="mb-12 rounded-xl p-6"
          style={{ background: "#f6fdf9", border: "1px solid #c3e8d4" }}
        >
          <p className="font-bold mb-2" style={{ color: "#1a8c5f", fontSize: 15 }}>
            Short summary
          </p>
          <p style={{ color: "#333", fontSize: 15, lineHeight: 1.65 }}>
            Polymarket Sure Bet Finder works with public Polymarket market data. It stores
            preferences locally in Chrome, sends public market questions to an AI proxy only when
            you click AI Score, validates license keys when you enter one, and sends anonymous
            feature-usage analytics. It does not collect your Polymarket account, trades, wallet,
            browsing history, or private messages.
          </p>
        </section>

        <div className="space-y-10" style={{ color: "#333", fontSize: 15, lineHeight: 1.75 }}>
          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              What the extension does
            </h2>
            <p>
              The extension opens as a Chrome side panel and scans public Polymarket markets for
              high-probability bets ending soon. It fetches public market data from Polymarket APIs,
              shows ranked opportunities, and optionally sends selected public market questions to
              a Groq AI model through a Cloudflare Worker proxy for scoring and explanation.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              Data stored locally
            </h2>
            <p>The extension uses Chrome storage to save:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Filter settings such as hours to expiry, probability threshold, and category exclusions.</li>
              <li>Daily free-tier usage counters and tutorial completion flags.</li>
              <li>A short-lived public market-results cache so the panel opens faster.</li>
              <li>A license key if you choose to enter one.</li>
            </ul>
            <p className="mt-3">
              This storage stays in your Chrome profile. It is not used to build a browsing profile.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              Data sent off-device
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Polymarket public APIs:</strong> the extension requests public market listings
                and order-book prices from Polymarket domains.
              </li>
              <li>
                <strong>AI scoring proxy:</strong> when you click AI Score or request an AI explanation,
                public market questions and related public market fields are sent to our Cloudflare
                Worker, which forwards them to Groq. No Polymarket login, wallet, trading history, or
                personal account data is included.
              </li>
              <li>
                <strong>License validation:</strong> when you enter a license key, the key is sent to
                our Cloudflare Worker for validation.
              </li>
              <li>
                <strong>Anonymous analytics:</strong> feature-usage events are sent to Google Analytics
                4. These events help us understand usage and fix problems. They do not include market
                content, license keys, personal account data, or browsing history.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              Website access
            </h2>
            <p>
              The content script runs on Polymarket pages only to inject an Open button and a
              first-run tutorial. It does not read your account, wallet, portfolio, private data, or
              trading history. The welcome and thank-you page content scripts only relay button
              clicks so the extension can open the side panel.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              Third-party services
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Polymarket APIs for public market data.</li>
              <li>Groq for AI scoring and explanations.</li>
              <li>Cloudflare Workers for API-key protection, license validation, and proxy routing.</li>
              <li>Google Analytics 4 for anonymous feature-usage analytics.</li>
              <li>LemonSqueezy or Gumroad for payment and license-key purchase flows.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold mb-3" style={{ fontSize: 24, color: "#111" }}>
              Contact
            </h2>
            <p>
              For privacy questions, contact Calc-Tech through the{" "}
              <Link href="/contact" className="underline" style={{ color: "#1a8c5f" }}>
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
