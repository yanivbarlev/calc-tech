import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you — WAExportPro PRO",
  description:
    "Thank you for upgrading to WAExportPro PRO. Activate your license to unlock unlimited WhatsApp chat exports.",
};

export default function WhatsAppChatExportThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
