import type { Metadata } from "next";

const URL = "https://www.calc-tech.com/extensions/keepwa/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy – KeepWA Chrome Extension",
  description:
    "KeepWA privacy policy. WhatsApp Web chats are exported in your browser. Messages are not uploaded. Contact form and license checks are explained here.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Privacy Policy – KeepWA",
    description:
      "Chat export stays on your computer. No chat content is sent to our servers.",
    url: URL,
    siteName: "Calc-Tech",
    type: "website",
  },
};

export default function KeepWAPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
