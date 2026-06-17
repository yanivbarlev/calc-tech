import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Exportar Chat WhatsApp Chrome Extension",
  description:
    "Privacy policy for the Exportar Chat WhatsApp Chrome extension. All chat data is processed locally in your browser — nothing is ever uploaded or shared.",
  alternates: {
    canonical: "https://calc-tech.com/extensions/exportar-chat-whatsapp/privacy",
  },
  openGraph: {
    title: "Privacy Policy – Exportar Chat WhatsApp",
    description:
      "All WhatsApp chat data is processed locally in your browser. No data is ever transmitted to external servers.",
    url: "https://calc-tech.com/extensions/exportar-chat-whatsapp/privacy",
    siteName: "Calc-Tech",
    type: "website",
  },
};

export default function ExportarChatWhatsAppPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
