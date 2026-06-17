import Link from "next/link";

export default function ExportarChatWhatsAppPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        style={{ borderBottom: "1px solid #efefef" }}
        className="bg-white sticky top-0 z-50"
      >
        <div
          className="mx-auto px-4 py-4 flex items-center justify-between"
          style={{ maxWidth: 960 }}
        >
          <Link
            href="/"
            className="font-bold text-lg"
            style={{ color: "#111" }}
          >
            Calc-Tech.com
          </Link>
          <span style={{ fontSize: 13, color: "#bbb" }}>
            Privacy Policy
          </span>
        </div>
      </header>

      {/* Main content */}
      <main
        className="mx-auto px-4 py-14"
        style={{ maxWidth: 720 }}
      >
        {/* Page title */}
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
          <h1
            className="font-bold"
            style={{ fontSize: 36, color: "#111", marginBottom: 8 }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#888", fontSize: 14 }}>
            Exportar Chat WhatsApp &nbsp;·&nbsp; Chrome Extension
            &nbsp;·&nbsp; Last updated: June 17, 2026
          </p>
        </div>

        {/* Intro summary box */}
        <div
          className="mb-12 rounded-xl p-6"
          style={{ background: "#f6fdf9", border: "1px solid #c3e8d4" }}
        >
          <p
            className="font-bold mb-2"
            style={{ color: "#1a8c5f", fontSize: 15 }}
          >
            Short summary
          </p>
          <p style={{ color: "#333", fontSize: 15, lineHeight: 1.65 }}>
            This extension processes all WhatsApp chat data{" "}
            <strong>entirely inside your browser</strong>. No messages,
            contact names, or media files are ever sent to any external server.
            The only network request the extension makes is a license-key
            verification when you manually enter a license key.
          </p>
        </div>

        <div
          className="prose"
          style={{
            color: "#333",
            fontSize: 15,
            lineHeight: 1.75,
          }}
        >
          {/* Section 1 */}
          <Section title="1. Who we are">
            <p>
              This privacy policy applies to the{" "}
              <strong>Exportar Chat WhatsApp</strong> Chrome extension
              (Chrome Web Store ID:{" "}
              <code
                style={{
                  background: "#f4f4f4",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 13,
                }}
              >
                midmdmeiddmopdbfacbailhlafkfcdoa
              </code>
              ), published by Calc-Tech.com. Questions can be directed to{" "}
              <a
                href="mailto:support@calc-tech.com"
                style={{ color: "#1a8c5f" }}
              >
                support@calc-tech.com
              </a>
              .
            </p>
          </Section>

          {/* Section 2 */}
          <Section title="2. What data the extension accesses">
            <p>
              To perform its core function — exporting chat conversations —
              the extension reads the following data from the WhatsApp Web
              page (
              <code
                style={{
                  background: "#f4f4f4",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 13,
                }}
              >
                web.whatsapp.com
              </code>
              ) while it is open in your browser:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>Chat messages (text, timestamps, sender names)</li>
              <li>Contact names and group participant lists</li>
              <li>
                Media files attached to messages: photos, videos, and audio
                clips (PRO tier only, processed locally)
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              This data is read directly from the page DOM and immediately
              converted into an export file (TXT, HTML, or CSV) inside your
              browser. It is never stored persistently, never indexed, and
              never transmitted anywhere.
            </p>
          </Section>

          {/* Section 3 */}
          <Section title="3. Local-only processing — no data leaves your device">
            <p>
              All data processing happens{" "}
              <strong>100% locally in your browser</strong>. The extension
              does not:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>Upload your messages to any server</li>
              <li>Send contact names or phone numbers anywhere</li>
              <li>Transmit media files to external storage</li>
              <li>
                Store any chat content in{" "}
                <code
                  style={{
                    background: "#f4f4f4",
                    borderRadius: 4,
                    padding: "1px 5px",
                    fontSize: 13,
                  }}
                >
                  chrome.storage
                </code>{" "}
                or any persistent mechanism
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              The exported file is created entirely in memory and downloaded
              directly to your local computer via the browser&apos;s standard
              file-save dialog.
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Network requests the extension makes">
            <p>
              The extension makes exactly two types of network requests:
            </p>
            <ol style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                <strong>License key verification.</strong> When you manually
                enter a PRO license key in the extension&apos;s options panel,
                the extension sends only the key string to{" "}
                <code
                  style={{
                    background: "#f4f4f4",
                    borderRadius: 4,
                    padding: "1px 5px",
                    fontSize: 13,
                  }}
                >
                  https://www.downloads.services/
                </code>{" "}
                and{" "}
                <code
                  style={{
                    background: "#f4f4f4",
                    borderRadius: 4,
                    padding: "1px 5px",
                    fontSize: 13,
                  }}
                >
                  https://www.calc-tech.com/
                </code>{" "}
                for Gumroad license validation. No chat data accompanies this
                request.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Nothing else.</strong> The extension makes no
                background calls, no telemetry pings, no analytics requests,
                and no automatic updates to any server.
              </li>
            </ol>
          </Section>

          {/* Section 5 */}
          <Section title="5. Permissions used">
            <p>
              The extension requests the following Chrome permissions and uses
              them solely as described:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                <strong>storage</strong> — stores your export preferences
                (chosen format, date range, UI settings) and the license key
                validation result locally on your device. No chat content is
                stored.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>sidePanel</strong> — opens the extension&apos;s
                control panel inside the Chrome side panel on
                web.whatsapp.com.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>host_permissions: https://web.whatsapp.com/*</strong>{" "}
                — grants the content script access to read the chat page DOM
                on WhatsApp Web. The extension does not access any other
                website.
              </li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Data retention">
            <p>
              We do not collect, store, or retain any user data on our
              servers. The only data persisted on your device is:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                Your export preferences (format, date range) stored in
                chrome.storage.local
              </li>
              <li>
                The license key you enter and its validation status, stored in
                chrome.storage.local
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              You can clear this data at any time by uninstalling the
              extension or clearing the extension&apos;s storage via Chrome
              settings.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Third-party services">
            <p>
              License purchases are processed by{" "}
              <strong>Gumroad, Inc.</strong> (
              <a
                href="https://gumroad.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1a8c5f" }}
              >
                Gumroad Privacy Policy
              </a>
              ). Calc-Tech.com is not a payment processor and does not receive
              or store your payment information. Gumroad&apos;s handling of
              payment data is governed by their own privacy policy.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Children's privacy">
            <p>
              This extension is not directed at children under the age of 13.
              We do not knowingly collect any personal information from
              children.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Changes to this policy">
            <p>
              We may update this privacy policy from time to time. The
              &ldquo;Last updated&rdquo; date at the top of this page reflects
              when the most recent revision was made. Continued use of the
              extension after changes are posted constitutes acceptance of the
              updated policy.
            </p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Contact">
            <p>
              If you have questions about this privacy policy or how your data
              is handled, please contact us at{" "}
              <a
                href="mailto:support@calc-tech.com"
                style={{ color: "#1a8c5f" }}
              >
                support@calc-tech.com
              </a>
              .
            </p>
          </Section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid #efefef" }}>
          <Link
            href="https://chromewebstore.google.com/detail/midmdmeiddmopdbfacbailhlafkfcdoa"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1a8c5f", fontSize: 14 }}
          >
            View on Chrome Web Store &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{ borderTop: "1px solid #efefef", background: "#fafafa" }}
        className="py-8"
      >
        <div
          className="mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ maxWidth: 960, fontSize: 13, color: "#bbb" }}
        >
          <Link href="/" style={{ color: "#888" }}>
            Calc-Tech.com
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/extensions/exportar-chat-whatsapp/privacy"
              style={{ color: "#555" }}
            >
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "#888" }}>
              Terms of Use
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Calc-Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2
        className="font-bold"
        style={{ fontSize: 18, color: "#111", marginBottom: 10 }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
