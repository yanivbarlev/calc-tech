import type { Metadata } from "next";

// lang="tr" is set via the metadata alternates pattern below.
// The root layout sets lang="en" but this page targets Turkish speakers.
export const metadata: Metadata = {
  title: "WhatsApp Sohbet Dışa Aktarma ve Yedekleme | calc-tech",
  description:
    "WhatsApp Web sohbetlerinizi ve mesaj geçmişinizi tek tıkla TXT, HTML veya CSV olarak dışa aktarın, indirin ve yedekleyin. Ücretsiz Chrome eklentisi.",
  keywords:
    "whatsapp sohbet dışa aktarma, whatsapp web yedek alma, whatsapp mesajları indirme, whatsapp sohbet geçmişi, whatsapp csv, whatsapp txt, chrome eklentisi",
  openGraph: {
    title: "WhatsApp Sohbet Dışa Aktarma ve Yedekleme",
    description:
      "WhatsApp Web sohbetlerinizi ve mesaj geçmişinizi tek tıkla TXT, HTML veya CSV olarak dışa aktarın, indirin ve yedekleyin. Ücretsiz Chrome eklentisi.",
    url: "https://www.calc-tech.com/extensions/whatsapp-export-tr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Sohbet Dışa Aktarma ve Yedekleme",
    description:
      "WhatsApp Web sohbetlerinizi ve mesaj geçmişinizi tek tıkla TXT, HTML veya CSV olarak dışa aktarın, indirin ve yedekleyin. Ücretsiz Chrome eklentisi.",
  },
};

export default function WhatsAppExportTrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
