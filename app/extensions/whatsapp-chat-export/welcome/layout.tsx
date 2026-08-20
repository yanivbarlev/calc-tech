import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-wty-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-wty-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thank you — unlock WAExportPro",
  description:
    "WAExportPro is installed. Unlock PRO to export full WhatsApp chats, Excel, contacts, and media.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WhatsAppChatExportWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${outfit.variable} ${syne.variable}`}>{children}</div>
  );
}
