import Link from "next/link";
import { ArrowLeft, Calculator, CircleDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calc-Tech.com
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <CircleDollarSign className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Refund Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: June 25, 2026
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  1. Scope
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  This Refund Policy applies to paid digital products,
                  subscriptions, software licenses, browser extension upgrades,
                  and other paid services sold by Calc-Tech.com. Free calculators
                  and free tools do not involve payments and are not eligible for
                  refunds.
                </p>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Some products may show a longer or more generous refund
                  guarantee on their product page or checkout page. If a product
                  page clearly states a different refund guarantee, that specific
                  guarantee controls for that product.
                </p>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  2. Standard Refund Window
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Unless a product page says otherwise, refund requests must be
                  submitted within 14 days of purchase. After 14 days, all sales
                  are final except where a refund is required by applicable law
                  or where we determine that the product could not be delivered
                  or used because of a verified technical fault on our side.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  3. Eligible Refund Reasons
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may approve a refund when:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>The same order was charged more than once by mistake</li>
                  <li>
                    You purchased the wrong plan and repurchased the correct plan
                    promptly
                  </li>
                  <li>
                    The paid feature cannot be accessed because of a verified
                    technical issue that we cannot resolve within a reasonable
                    time
                  </li>
                  <li>
                    The refund is required under applicable consumer protection
                    law
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  4. Non-Refundable Cases
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To keep pricing fair and prevent abuse, refunds are generally
                  not provided for:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Requests submitted after the applicable refund window</li>
                  <li>Change of mind after using or accessing the paid product</li>
                  <li>
                    Failure to cancel a subscription before the renewal date
                  </li>
                  <li>
                    Incompatibility caused by unsupported browsers, devices,
                    third-party websites, or local settings
                  </li>
                  <li>
                    Temporary service interruptions, unless they materially
                    prevent use of the paid product
                  </li>
                  <li>
                    Purchases made in violation of our{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Terms of Use
                    </Link>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  5. Subscriptions and Cancellations
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  You may cancel a subscription at any time. Cancellation stops
                  future renewals but does not automatically refund charges that
                  have already been processed. You are responsible for cancelling
                  before the next billing date if you do not want to renew.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  6. How to Request a Refund
                </h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To request a refund, contact us within the applicable refund
                  window and include:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Your order email address</li>
                  <li>Your order ID or receipt number</li>
                  <li>The product name</li>
                  <li>A short explanation of the issue</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  You can contact us through the{" "}
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Contact page
                  </Link>{" "}
                  or by email at{" "}
                  <a
                    href="mailto:yaniv.bl+calc@gmail.com"
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    yaniv.bl+calc@gmail.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  7. Payment Processor
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Payments may be processed by Paddle or another authorized
                  payment provider. When Paddle is used, Paddle may act as the
                  merchant of record and may handle payment processing, tax
                  calculation, invoices, and refund execution. Approved refunds
                  are returned to the original payment method through the payment
                  provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  8. Processing Time
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  We aim to review refund requests within 2 business days.
                  Approved refunds are submitted to the payment provider
                  promptly. The time for funds to appear on your statement
                  depends on your card issuer, bank, payment method, and payment
                  provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  9. Chargebacks
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Please contact us before opening a chargeback so we can review
                  and resolve the issue. If a chargeback is opened, we may
                  suspend access to the related paid product while the dispute is
                  handled by the payment provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  10. Policy Changes
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  We may update this Refund Policy from time to time. The version
                  posted on this page applies to purchases made after the updated
                  date shown above, unless a product-specific guarantee states
                  otherwise.
                </p>
              </section>

              <section className="bg-slate-100 p-6 rounded-lg border-2">
                <p className="text-slate-700 font-medium text-center">
                  By purchasing a paid product from Calc-Tech.com, you acknowledge
                  that you have read and agree to this Refund Policy.
                </p>
              </section>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Calculators
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t bg-white/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-slate-500">
            &copy; 2026 Calc-Tech.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
