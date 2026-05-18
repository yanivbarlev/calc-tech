import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — Stream Saver PRO Activated",
  description:
    "Your Stream Saver PRO license is ready. Follow the activation steps to unlock unlimited downloads.",
};

export default function StreamSaverThanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
