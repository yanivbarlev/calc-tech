import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-wty",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thank you — WAExportPro",
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
  return <div className={outfit.variable}>{children}</div>;
}
