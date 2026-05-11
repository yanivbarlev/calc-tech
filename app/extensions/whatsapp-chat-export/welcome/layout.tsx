import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome - WAExportPro for WhatsApp Web",
  description:
    "WAExportPro is installed successfully. Start exporting your WhatsApp Web chats to TXT, HTML, or CSV.",
};

export default function WhatsAppChatExportWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
