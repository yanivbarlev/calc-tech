import Link from "next/link";

const ACCENT = "#00a884";

export default function WaBackupExportPrivacyPage() {
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
          <span style={{ fontSize: 13, color: "#bbb" }}>
            WA - Backup &amp; Export · Privacy
          </span>
        </div>
      </header>

      <main className="mx-auto px-4 py-14" style={{ maxWidth: 720 }}>
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
            WA - Backup &amp; Export — Chrome extension · Last updated: October 5, 2026
          </p>
        </div>

        <div
          className="mb-12 rounded-xl p-6"
          style={{ background: "#f3fbf7", border: "1px solid #b7ebc9" }}
        >
          <p className="font-bold mb-2" style={{ color: ACCENT, fontSize: 15 }}>
            Short summary
          </p>
          <p style={{ color: "#333", fontSize: 15, lineHeight: 1.65 }}>
            WA - Backup &amp; Export saves WhatsApp Web chats inside your browser.
            Chat content is never uploaded. A license key you paste, a Contact Us
            message you type, or a Help question you type can leave the device.
            The install and thank-you pages can tell Google Ads that an install
            or a purchase happened. They do not include chat text.
          </p>
        </div>

        <div style={{ color: "#333", fontSize: 15, lineHeight: 1.75 }}>
          <Section title="1. Who we are">
            <p>
              This policy is for the <strong>WA - Backup &amp; Export</strong> Chrome
              extension. Questions:{" "}
              <a href="mailto:support@downloads.services" style={{ color: ACCENT }}>
                support@downloads.services
              </a>{" "}
              or{" "}
              <a href="mailto:support@calc-tech.com" style={{ color: ACCENT }}>
                support@calc-tech.com
              </a>
              .
            </p>
          </Section>

          <Section title="Collection">
            <p>
              On web.whatsapp.com we read only the chat or list you asked to export:
              messages, timestamps, names, and group numbers when WhatsApp shows them.
              If you paste a license key, we collect that key. If you use Contact Us,
              we collect what you typed and an optional email. If you use Help, we
              collect the question you typed plus basic extension facts (version,
              Free or PRO, chosen format, whether the last export worked, whether
              downloads are allowed, whether a WhatsApp Web tab is open, and the
              browser version). The install page and the thank-you page on
              downloads.services can collect a Google Ads click id (gclid) and a
              purchase or install event. They do not collect chat text.
            </p>
          </Section>

          <Section title="Handling">
            <p>
              Chat content is turned into a file in your browser. A license key is
              sent to Lemon Squeezy to check PRO. A Contact Us message is sent to
              our feedback inbox. A Help question is sent to our server and to Groq,
              an AI service, to write the answer. Phone numbers, emails, and license
              keys you type in Help are removed first. We keep only a daily question
              count per install, not your questions. We do not use chat exports for
              ads or training. Google Ads uses the install and purchase events to
              measure ads. We do not sell data.
            </p>
          </Section>

          <Section title="Storage">
            <ul className="list-disc pl-6 mb-3">
              <li>Language and export options</li>
              <li>License key and PRO status</li>
              <li>A random install id on this browser</li>
              <li>Whether you hid the in-page Export button</li>
            </ul>
            <p>
              Chat history is not kept in extension storage. Uninstalling the
              extension deletes that local data. Exported files stay where you
              saved them on your computer.
            </p>
          </Section>

          <Section title="Sharing">
            <ul className="list-disc pl-6 mb-3">
              <li>
                <strong>Contact Us</strong> — what you typed, an optional email,
                version, and PRO on or off. No chat export is attached. Inbox:
                support@downloads.services and support@calc-tech.com.
              </li>
              <li>
                <strong>License key</strong> — if you paste a PRO key, the key is
                checked with Lemon Squeezy. No chat content.
              </li>
              <li>
                <strong>Help assistant</strong> — the question you typed, the last
                few turns of that conversation, and the extension facts above go to
                our Cloudflare server and to Groq to write the answer. No chat
                export, contact list, or file is sent. We do not store the questions.
              </li>
              <li>
                <strong>Checkout</strong> — buying PRO opens Lemon Squeezy. Card
                details stay on Lemon Squeezy, not in this extension.
              </li>
              <li>
                <strong>Google Ads</strong> — the install page and the thank-you
                page load Google tag AW-1006081641 and can send an install or a
                purchase (value $4.99). No chat content is included.
              </li>
            </ul>
            <p>We do not sell your data.</p>
          </Section>

          <Section title="5. Permissions">
            <ul className="list-disc pl-6">
              <li>
                <strong>storage</strong> — settings and license on this device
              </li>
              <li>
                <strong>sidePanel</strong> — the WA - Backup &amp; Export panel
              </li>
              <li>
                <strong>offscreen</strong> — save large PDFs
              </li>
              <li>
                <strong>downloads</strong> (optional) — save the file after you click Download
              </li>
              <li>
                <strong>web.whatsapp.com</strong> — read the chat you chose. No other sites
              </li>
            </ul>
          </Section>

          <Section title="6. Children">
            <p>WA - Backup &amp; Export is not for children under 13.</p>
          </Section>

          <Section title="7. Changes">
            <p>
              The “Last updated” date on this page will change if we edit this policy.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              Email{" "}
              <a href="mailto:support@downloads.services" style={{ color: ACCENT }}>
                support@downloads.services
              </a>{" "}
              or use Contact Us in the extension.
            </p>
          </Section>
        </div>
      </main>

      <footer
        className="py-8"
        style={{ borderTop: "1px solid #efefef", background: "#fafafa" }}
      >
        <div
          className="mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ maxWidth: 960, fontSize: 13, color: "#bbb" }}
        >
          <Link href="/" style={{ color: "#888" }}>
            Calc-Tech.com
          </Link>
          <p>&copy; {new Date().getFullYear()} WA - Backup &amp; Export</p>
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
      <h2 className="font-bold" style={{ fontSize: 18, color: "#111", marginBottom: 10 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
