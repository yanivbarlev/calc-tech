import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — Volume Booster + Equalizer Pro PRO Activated",
  description:
    "Thank you for upgrading to Volume Booster + Equalizer Pro PRO. Your license key is on its way. Here is how to activate 1000% boost and the full 5-band EQ.",
};

export default function VolumeBoosterThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
