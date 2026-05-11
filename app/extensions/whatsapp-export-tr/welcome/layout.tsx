import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoş geldiniz - WhatsApp Sohbet Dışa Aktarma",
  description:
    "WhatsApp Sohbet Dışa Aktarma eklentisi başarıyla yüklendi. WhatsApp Web sohbetlerinizi TXT, HTML veya CSV olarak dışa aktarmaya başlayın.",
};

export default function WhatsAppExportTrWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
