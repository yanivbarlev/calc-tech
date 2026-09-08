import Link from "next/link";

const ACCENT = "#00B46D";

export default function KeepWAPrivacyPage() {
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
          <span style={{ fontSize: 13, color: "#bbb" }}>KeepWA · Privacy</span>
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
            KeepWA — Chrome extension · Last updated: September 8, 2026
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
            KeepWA exports WhatsApp Web chats, contacts, and group numbers{" "}
            <strong>inside your browser</strong>. Chat content is never uploaded.
            The only things that can leave your device are: (1) a license key you
            paste, (2) a Contact Us message you type, and (3) nothing else — we
            do not run analytics on your chats.
          </p>
        </div>

        <div style={{ color: "#333", fontSize: 15, lineHeight: 1.75 }}>
          <Section title="1. Who we are">
            <p>
              This policy is for the <strong>KeepWA</strong> Chrome extension
              (store name: Free WA Chat Export — Backup Chats &amp; Contacts to
              PDF, CSV — KeepWA). Questions:{" "}
              <a href="mailto:support@calc-tech.com" style={{ color: ACCENT }}>
                support@calc-tech.com
              </a>
              .
            </p>
          </Section>

          <Section title="2. What the extension reads">
            <p>
              Only on{" "}
              <code
                style={{
                  background: "#f4f4f4",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 13,
                }}
              >
                https://web.whatsapp.com
              </code>
              , and only for
              the chat or list you asked to export:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>Messages, timestamps, and sender names</li>
              <li>Contact names</li>
              <li>Group participant names and phone numbers when WhatsApp shows them</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              That data is turned into a PDF, CSV, TXT, or HTML file on your
              computer. It is not stored on our servers.
            </p>
          </Section>

          <Section title="3. What stays on your computer">
            <p>Chrome local storage may keep:</p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>Language and export options (format, dates)</li>
              <li>License key and whether PRO is on</li>
              <li>A random install id used only on this browser</li>
              <li>Whether you hid the in-page Export button</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Chat history is not saved in extension storage. Uninstalling
              KeepWA deletes this local data.
            </p>
          </Section>

          <Section title="4. What can leave your device">
            <p>Chat messages do not leave your device. These requests can:</p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                <strong>Contact Us.</strong> If you send a message from the
                panel, we receive what you typed (and an email if you entered
                one), plus extension version and whether PRO is on. No chat
                export is attached. That form goes to our feedback worker.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>License key.</strong> If you paste a PRO key, the key
                string may be checked with the license provider (Gumroad). No
                chat content is sent with it. Checkout is not live yet; this
                only applies when you enter a key.
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              We do not send chats, contacts, or group lists to a server. We do
              not sell your data.
            </p>
          </Section>

          <Section title="5. Permissions">
            <ul style={{ paddingLeft: 22 }}>
              <li>
                <strong>storage</strong> — settings and license on this device.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>sidePanel</strong> — the KeepWA panel next to WhatsApp
                Web.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>offscreen</strong> — needed so large PDF files can be
                saved. No extra data collection.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>downloads</strong> (optional) — saves the file after
                you click Download and Allow.
              </li>
              <li style={{ marginTop: 6 }}>
                <strong>web.whatsapp.com</strong> — read the chat you chose to
                export. No other websites.
              </li>
            </ul>
          </Section>

          <Section title="6. Children">
            <p>
              KeepWA is not for children under 13. We do not knowingly collect
              information from children.
            </p>
          </Section>

          <Section title="7. Changes">
            <p>
              We may update this page. The “Last updated” date will change.
              Using KeepWA after a change means you accept the new text.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              Email{" "}
              <a href="mailto:support@calc-tech.com" style={{ color: ACCENT }}>
                support@calc-tech.com
              </a>
              . You can also use Contact Us inside the extension.
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
          <Link href="/extensions/keepwa/privacy" style={{ color: "#555" }}>
            KeepWA Privacy
          </Link>
          <p>&copy; {new Date().getFullYear()} KeepWA</p>
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
