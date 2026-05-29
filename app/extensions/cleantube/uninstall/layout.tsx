import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You've uninstalled CleanTube",
  description:
    "Help us improve by telling us why you uninstalled CleanTube. Or reinstall it — it's free.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CleanTubeUninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
