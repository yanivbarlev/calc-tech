import Link from "next/link";
import { Calculator, ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
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
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
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
            <Shield className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: January 2025
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  At Calc-Tech.com ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our calculators.
                </p>
                <p className="text-slate-700 leading-relaxed mt-3">
                  By using Calc-Tech.com, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Information We Collect</h2>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">1. Personal Information</h3>
                <p className="text-slate-700 leading-relaxed mb-2">
                  If you create an account on our website, we may collect:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>Email address</li>
                  <li>Name (if provided)</li>
                  <li>Account credentials</li>
                  <li>Profile information (optional)</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">2. Calculator Input Data</h3>
                <p className="text-slate-700 leading-relaxed">
                  When you use our calculators, you may input various types of data such as financial figures, health measurements, or other numerical values. <strong>We do not store your calculator inputs or results</strong> unless you are logged in and explicitly choose to save them.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">3. Automatically Collected Information</h3>
                <p className="text-slate-700 leading-relaxed mb-2">
                  When you visit our website, we automatically collect certain information, including:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">How We Use Your Information</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li><strong>To provide our services:</strong> Operating and maintaining our calculators and website</li>
                  <li><strong>To improve our website:</strong> Understanding how users interact with our calculators to enhance user experience</li>
                  <li><strong>Account management:</strong> Managing your account and providing customer support</li>
                  <li><strong>Communication:</strong> Sending important updates about our service (if you have an account)</li>
                  <li><strong>Analytics:</strong> Analyzing usage patterns to improve functionality and add new features</li>
                  <li><strong>Security:</strong> Detecting, preventing, and addressing technical issues and abuse</li>
                </ul>
              </section>

              {/* Data Storage */}
              <section className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Important: Calculator Data</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>Your calculator inputs and results are NOT stored on our servers</strong> unless you:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Create an account and explicitly save calculations</li>
                  <li>Use features that require data persistence</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  For anonymous users, all calculations are performed client-side (in your browser) and are not transmitted to our servers. Your financial, health, and personal data entered into calculators remains private.
                </p>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We use cookies and similar tracking technologies to enhance your experience:
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Essential Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  Required for the website to function properly, including authentication and security features.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Analytics Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  Help us understand how visitors use our website, which pages are most popular, and how to improve user experience.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Preference Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  Remember your settings and preferences for a better experience on future visits.
                </p>

                <p className="text-slate-700 leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling certain cookies may limit website functionality.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Third-Party Services</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We use the following third-party services:
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Clerk (Authentication)</h3>
                <p className="text-slate-700 leading-relaxed">
                  We use Clerk for user authentication and account management. Clerk processes your email and account information. Review{" "}
                  <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Clerk's Privacy Policy
                  </a>.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Vercel (Hosting)</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our website is hosted on Vercel. Review{" "}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Vercel's Privacy Policy
                  </a>.
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Analytics Services</h3>
                <p className="text-slate-700 leading-relaxed">
                  We may use analytics services to understand website usage. These services may collect anonymous usage data.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Data Security</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Encryption of data in transit (HTTPS/SSL)</li>
                  <li>Secure authentication through Clerk</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Monitoring for suspicious activity</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain personal information only as long as necessary to provide our services and comply with legal obligations. If you delete your account, we will delete or anonymize your personal information, except where required by law to retain certain data.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Rights and Choices</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Opt-out:</strong> Opt out of marketing communications (if applicable)</li>
                  <li><strong>Data portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Withdraw consent:</strong> Withdraw consent for data processing where applicable</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  To exercise these rights, please manage your account settings or contact us through our About page.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Children's Privacy</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will take steps to delete that information.
                </p>
              </section>

              {/* International Users */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">International Users</h2>
                <p className="text-slate-700 leading-relaxed">
                  Our website is operated from the United States. If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States. By using our website, you consent to this transfer.
                </p>
              </section>

              {/* California Privacy Rights */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">California Privacy Rights (CCPA)</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know if personal information is sold or disclosed</li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>Right to deletion of personal information</li>
                  <li>Right to non-discrimination for exercising CCPA rights</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  <strong>Note:</strong> We do not sell your personal information.
                </p>
              </section>

              {/* GDPR */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">European Users (GDPR)</h2>
                <p className="text-slate-700 leading-relaxed">
                  If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, erase, restrict processing, data portability, and to object to processing. You may also lodge a complaint with your local data protection authority.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-slate-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Do Not Track */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Do Not Track Signals</h2>
                <p className="text-slate-700 leading-relaxed">
                  Some web browsers have a "Do Not Track" feature. At this time, we do not respond to Do Not Track signals. However, you can control cookies through your browser settings.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Questions About Privacy?</h2>
                <p className="text-slate-700 leading-relaxed">
                  If you have questions or concerns about this Privacy Policy or our data practices, please visit our{" "}
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 underline font-medium">
                    About Us
                  </Link>{" "}
                  page for more information.
                </p>
              </section>

              {/* Summary */}
              <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Privacy Summary</h2>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Calculator inputs are NOT stored (unless you save them)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>We do NOT sell your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>You can use calculators anonymously (no account required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Secure authentication through Clerk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>You control your data and can delete your account anytime</span>
                  </li>
                </ul>
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
            © 2025 Calc-Tech.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
