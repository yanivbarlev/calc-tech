export default function VolumeBoosterPrivacyPage() {
  return (
    <div style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif", background: "#fff", color: "#111", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', system-ui, -apple-system, sans-serif; }
        a { color: #1a8c5f; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .container { max-width: 760px; margin: 0 auto; padding: 0 24px; }
        h1 { font-size: 2rem; font-weight: 700; line-height: 1.2; }
        h2 { font-size: 1.15rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.6rem; color: #111; }
        p { font-size: 0.975rem; line-height: 1.7; color: #333; margin-bottom: 0.75rem; }
        ul { padding-left: 1.4rem; margin-bottom: 0.75rem; }
        li { font-size: 0.975rem; line-height: 1.7; color: #333; margin-bottom: 0.25rem; }
        .label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #bbb;
        }
        .highlight-box {
          background: #f6fbf9;
          border: 1px solid #c3e6d8;
          border-radius: 10px;
          padding: 20px 24px;
          margin: 1.5rem 0;
        }
        .highlight-box p { margin-bottom: 0; }
        .check-list { list-style: none; padding-left: 0; }
        .check-list li::before { content: "✓"; color: #1a8c5f; font-weight: 700; margin-right: 8px; }
        hr { border: none; border-top: 1px solid #efefef; margin: 2rem 0; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #efefef", padding: "20px 0" }}>
        <div className="container">
          <a href="https://calc-tech.com" style={{ color: "#111", fontWeight: 600, fontSize: "0.95rem" }}>
            ← calc-tech.com
          </a>
        </div>
      </header>

      {/* Main */}
      <main style={{ padding: "56px 0 80px" }}>
        <div className="container">

          <p className="label">Privacy Policy</p>
          <h1 style={{ marginTop: "10px", marginBottom: "8px" }}>
            Volume Booster + Equalizer Pro
          </h1>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Effective date: May 2026
          </p>

          <div className="highlight-box">
            <p>
              <strong>The short version:</strong> This extension does not collect, transmit, or share any personal data.
              All settings are stored locally on your device. No account required. No server communication.
            </p>
          </div>

          <hr />

          <h2>What This Extension Does</h2>
          <p>
            Volume Booster + Equalizer Pro is a Chrome extension that amplifies tab audio up to 1000% and
            provides a 5-band equalizer for per-tab audio control. It works entirely within your browser
            using the Web Audio API.
          </p>

          <h2>Data Collected</h2>
          <p>
            We collect <strong>no personal data</strong> of any kind. Specifically, we do not collect:
          </p>
          <ul>
            <li>Your name, email address, or any account information</li>
            <li>Browsing history or the URLs of pages you visit</li>
            <li>Audio content or media from the tabs you boost</li>
            <li>Device identifiers or IP addresses</li>
            <li>Usage statistics or analytics</li>
          </ul>

          <h2>What Is Stored Locally</h2>
          <p>
            The extension uses <strong>chrome.storage.local</strong> — Chrome's built-in local storage — to
            remember your volume level and equalizer settings on a per-tab or per-site basis. This data:
          </p>
          <ul>
            <li>Stays entirely on your device</li>
            <li>Is never transmitted to any server</li>
            <li>Can be cleared at any time by removing the extension or clearing extension storage via Chrome settings</li>
          </ul>

          <h2>Network Requests</h2>
          <p>
            This extension makes <strong>no network requests</strong>. It does not contact any external server,
            analytics service, or third-party API. There is no backend.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            No third-party SDKs, analytics libraries, or tracking scripts are included in this extension.
            No data is shared with any third party.
          </p>

          <h2>Permissions Used</h2>
          <p>
            The extension requests only the permissions necessary to function:
          </p>
          <ul>
            <li><strong>activeTab / tabs</strong> — to apply audio processing to the current tab</li>
            <li><strong>storage</strong> — to save your volume and EQ settings locally</li>
          </ul>
          <p>
            These permissions are used solely to deliver the core audio-boosting functionality. They are not
            used to monitor browsing activity.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            This extension does not knowingly collect information from anyone, including children under 13.
            Because no data is collected at all, there is no special risk to younger users.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If this policy is updated, the new version will be published at this URL with a revised effective
            date. Continued use of the extension after changes constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this privacy policy? Email us at{" "}
            <a href="mailto:yaniv@goldbarventures.com">yaniv@goldbarventures.com</a>.
          </p>

          <hr />

          <div className="highlight-box">
            <ul className="check-list">
              <li>No personal data collected</li>
              <li>No data sent to any server</li>
              <li>Settings stored locally on your device only</li>
              <li>No analytics, no tracking</li>
              <li>No third-party data sharing</li>
              <li>Free to use, no account required</li>
            </ul>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #efefef", padding: "24px 0" }}>
        <div className="container">
          <p style={{ fontSize: "0.825rem", color: "#aaa", margin: 0 }}>
            © 2026 calc-tech.com &nbsp;·&nbsp;{" "}
            <a href="https://calc-tech.com/privacy" style={{ color: "#aaa" }}>Site Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
