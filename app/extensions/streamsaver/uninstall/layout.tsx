import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You've Uninstalled Stream Saver",
  description:
    "Stream Saver has been uninstalled. Let us know why — and reinstall for free anytime.",
};

export default function StreamSaverUninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
