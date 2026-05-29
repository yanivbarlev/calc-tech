import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gracias por tu compra — Exportar Chat WhatsApp PRO",
  description:
    "Gracias por actualizar a Exportar Chat WhatsApp PRO. Activa tu licencia para desbloquear exportaciones ilimitadas de chats de WhatsApp.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhatsAppExportEsThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
