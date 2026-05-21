import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desinstalaste Exportar Chat WhatsApp",
  description:
    "¿Cambiaste de opinión? Reinstala Exportar Chat WhatsApp gratis en segundos. Cuéntanos por qué desinstalaste para ayudarnos a mejorar.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WhatsAppExportEsUninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
