import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You Uninstalled Volume Booster + Equalizer Pro",
  description:
    "Sorry to see you go. Tell us why so we can improve. You can reinstall Volume Booster + Equalizer Pro for Chrome free at any time.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VolumeBoosterUninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
