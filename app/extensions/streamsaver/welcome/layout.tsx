import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Stream Saver — You're Ready to Download",
  description:
    "Stream Saver is installed. Follow these 5 steps to pin the extension and download your first video from any site.",
};

export default function StreamSaverWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
