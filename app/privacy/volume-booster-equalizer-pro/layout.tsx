import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Volume Booster + Equalizer Pro",
  description:
    "Privacy policy for the Volume Booster + Equalizer Pro Chrome extension. No personal data is collected. Volume and EQ settings are stored locally on your device only.",
  openGraph: {
    title: "Privacy Policy — Volume Booster + Equalizer Pro",
    description:
      "Privacy policy for the Volume Booster + Equalizer Pro Chrome extension. No personal data collected, no data sent to any server.",
    type: "website",
    url: "https://calc-tech.com/privacy/volume-booster-equalizer-pro",
  },
};

export default function VolumeBoosterPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
