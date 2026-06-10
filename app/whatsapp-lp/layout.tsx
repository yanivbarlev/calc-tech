import type { Metadata } from "next";

export const metadata: Metadata = {
  // google: "noads" — official AdSense page-level exclusion tag.
  // Renders as <meta name="google" content="noads"> and tells AdSense
  // to show NO ads on this URL ever, regardless of layout or ad units added later.
  other: { google: "noads" },
  title: "WhatsApp Chat Export & Backup — Free Chrome & Edge Extension",
  description:
    "Export and backup your WhatsApp chats to PDF, TXT, CSV, or HTML with full history, media, and date filters. Free Chrome and Edge extension. 100% private — all processing happens locally.",
  keywords:
    "whatsapp chat export, whatsapp backup, export whatsapp messages, whatsapp to pdf, whatsapp to csv, whatsapp chrome extension, whatsapp edge extension",
  alternates: {
    canonical: "https://calc-tech.com/whatsapp-lp",
  },
  openGraph: {
    type: "website",
    url: "https://calc-tech.com/whatsapp-lp",
    title: "WhatsApp Chat Export & Backup — Free Chrome & Edge Extension",
    description:
      "Export and backup your WhatsApp chats to PDF, TXT, CSV, or HTML. Free browser extension, 100% private.",
    siteName: "Calc-Tech",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
