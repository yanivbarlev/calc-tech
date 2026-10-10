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
            KeepWA — Chrome extension · Last updated: October 10, 2026
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
            The only things that can leave your device are: a license key you
            paste, messages and Help questions you type, and anonymous counts
            of rating screens. We do not run analytics on your chats.
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

          <Section title="2. Collection">
            <p>
              KeepWA reads data only on{" "}
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
              , and only for the chat or list you asked to export: messages,
              timestamps, sender names, contact names, and group participant
              names and phone numbers when WhatsApp shows them. This is read in
              your browser to build your file. We do not collect it.
            </p>
            <p style={{ marginTop: 12 }}>What we do collect:</p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                <strong>Messages you send us.</strong> Contact Us text, the
                optional feedback you type after a rating, and an email address
                if you enter one.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Help assistant questions.</strong> The question you
                type, a random install id, your language, and basic extension
                state (version, PRO on or off, the format and message count of
                your last export). No chat content.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>License key.</strong> Only if you paste one.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Anonymous counts.</strong> When a rating screen is
                shown, which rating was picked, and whether the store review
                page was opened. These are plain daily totals with no install
                id, no name, and no text.
              </li>
            </ul>
          </Section>

          <Section title="3. Handling">
            <ul style={{ paddingLeft: 22 }}>
              <li>
                Your export file (PDF, Excel, CSV, TXT, or HTML) is built
                inside your browser and saved to your computer.
              </li>
              <li style={{ marginTop: 8 }}>
                Messages you send us are used to answer you and fix problems.
              </li>
              <li style={{ marginTop: 8 }}>
                Help assistant questions are answered by an AI model and are
                not kept after the answer is returned. Only a daily usage count
                per install is kept, to limit abuse.
              </li>
              <li style={{ marginTop: 8 }}>
                Anonymous counts tell us whether people find the rating screens
                useful. They cannot be linked to a person or a browser.
              </li>
              <li style={{ marginTop: 8 }}>
                We do not use your data for advertising, and we do not run
                analytics on your chats.
              </li>
            </ul>
          </Section>

          <Section title="4. Storage">
            <p>On your computer, Chrome local storage may keep:</p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>Language and export options (format, dates)</li>
              <li>License key and whether PRO is on</li>
              <li>A random install id</li>
              <li>How many exports you made today, and whether you were asked to rate</li>
              <li>Whether you hid the in-page Export button</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Chat history is never saved in extension storage or on our
              servers. Uninstalling KeepWA deletes the local data. On our side
              we keep the messages you sent us, in our support mailbox, and the
              anonymous daily counts.
            </p>
          </Section>

          <Section title="5. Sharing">
            <p>
              We do not sell your data and we do not share chats, contacts, or
              group lists with anyone, because they never leave your device.
              The items in “Collection” pass through these services only:
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 22 }}>
              <li>
                <strong>Cloudflare</strong> runs the small server that receives
                Contact Us messages, Help assistant questions, and the
                anonymous counts.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Resend</strong> delivers Contact Us and feedback
                messages to our mailbox.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Groq</strong> (backup: NVIDIA) runs the AI model that
                answers Help assistant questions.
              </li>
              <li style={{ marginTop: 8 }}>
                <strong>Lemon Squeezy</strong> handles checkout and checks a
                license key you paste. Payment details go to them, not to us.
              </li>
            </ul>
          </Section>

          <Section title="6. Permissions">
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

          <Section title="7. Children">
            <p>
              KeepWA is not for children under 13. We do not knowingly collect
              information from children.
            </p>
          </Section>

          <Section title="8. Changes">
            <p>
              We may update this page. The “Last updated” date will change.
              Using KeepWA after a change means you accept the new text.
            </p>
          </Section>

          <Section title="9. Contact">
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
