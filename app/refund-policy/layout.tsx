import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Calc-Tech.com",
  description:
    "Read the Calc-Tech refund policy for paid digital products, subscriptions, and extension licenses processed through Paddle or other payment providers.",
  keywords:
    "calc-tech refund policy, refunds, cancellation policy, digital products refund",
  openGraph: {
    title: "Refund Policy - Calc-Tech.com",
    description:
      "Read the Calc-Tech refund policy for paid digital products, subscriptions, and extension licenses.",
    type: "website",
    url: "https://calc-tech.com/refund-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy - Calc-Tech.com",
    description:
      "Read the Calc-Tech refund policy for paid digital products, subscriptions, and extension licenses.",
  },
  alternates: {
    canonical: "https://calc-tech.com/refund-policy",
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
