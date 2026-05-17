import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — Volume Booster + Equalizer Pro is Installed",
  description:
    "Volume Booster + Equalizer Pro is installed. Boost any tab to 600% free, or unlock 1000% boost and a 5-band equalizer with PRO.",
};

export default function VolumeBoosterWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
