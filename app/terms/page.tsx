import Link from "next/link";
import { Calculator, ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
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
            <FileText className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Terms of Use
            </h1>
            <p className="text-lg text-slate-600">
              Last Updated: January 2025
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  By accessing and using Calc-Tech.com ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this Website. The Website reserves the right to modify these terms at any time without prior notice.
                </p>
              </section>

              {/* Use of Service */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Use of Service</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Calc-Tech.com provides free online calculators for personal and professional use. By using our calculators, you agree to:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Use the calculators for lawful purposes only</li>
                  <li>Not attempt to interfere with, compromise, or disrupt the Website's functionality</li>
                  <li>Not use automated systems (bots, scrapers) without explicit permission</li>
                  <li>Not reproduce, duplicate, copy, or resell any portion of the Website without permission</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              {/* Disclaimer */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Disclaimer of Warranties</h2>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-slate-700 leading-relaxed mb-3">
                    <strong>IMPORTANT:</strong> The calculators and information provided on this Website are for educational and informational purposes only. While we strive for accuracy:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Results are provided "AS IS" without warranty of any kind</li>
                    <li>We do not guarantee the accuracy, completeness, or reliability of any calculations</li>
                    <li>The Website and its content may contain errors or inaccuracies</li>
                    <li>Calculator results should not be used as the sole basis for financial, health, or legal decisions</li>
                  </ul>
                </div>
              </section>

              {/* Professional Advice */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Not Professional Advice</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  The calculators and content on Calc-Tech.com do not constitute professional advice:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li><strong>Financial Calculators:</strong> Not a substitute for professional financial advice from licensed advisors</li>
                  <li><strong>Health Calculators:</strong> Not medical advice; consult healthcare professionals for health concerns</li>
                  <li><strong>Legal/Tax Matters:</strong> Consult appropriate professionals for legal or tax guidance</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Always seek the advice of qualified professionals regarding specific questions or concerns.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To the fullest extent permitted by law, Calc-Tech.com and its operators, owners, employees, and affiliates shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                  <li>Any direct, indirect, incidental, special, or consequential damages</li>
                  <li>Financial losses resulting from use of calculator results</li>
                  <li>Errors, omissions, or inaccuracies in calculator outputs</li>
                  <li>Interruption of service or unavailability of the Website</li>
                  <li>Loss of data or information</li>
                  <li>Any damages arising from third-party content or links</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  You use this Website and its calculators at your own risk and discretion.
                </p>
              </section>

              {/* User Responsibility */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">6. User Responsibility</h2>
                <p className="text-slate-700 leading-relaxed">
                  Users are responsible for:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                  <li>Verifying the accuracy of calculator results</li>
                  <li>Using results as estimates only, not as definitive answers</li>
                  <li>Double-checking calculations for important decisions</li>
                  <li>Understanding the limitations of each calculator</li>
                  <li>Consulting professionals when making significant financial, health, or legal decisions</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Intellectual Property</h2>
                <p className="text-slate-700 leading-relaxed">
                  All content on Calc-Tech.com, including text, graphics, logos, button icons, images, calculators, and software, is the property of Calc-Tech.com or its content suppliers and is protected by international copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Third-Party Links</h2>
                <p className="text-slate-700 leading-relaxed">
                  This Website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Accessing third-party links is at your own risk.
                </p>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">9. User Accounts</h2>
                <p className="text-slate-700 leading-relaxed">
                  If you create an account on Calc-Tech.com, you are responsible for:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and current information</li>
                </ul>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Privacy</h2>
                <p className="text-slate-700 leading-relaxed">
                  Your use of Calc-Tech.com is also governed by our Privacy Policy. Please review our{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </Link>{" "}
                  to understand how we collect, use, and protect your information.
                </p>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Modifications to Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after changes are posted constitutes your acceptance of the modified terms. We encourage you to review this page periodically.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">12. Termination</h2>
                <p className="text-slate-700 leading-relaxed">
                  We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms. Upon termination, your right to use the service will cease immediately.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">13. Governing Law</h2>
                <p className="text-slate-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">14. Severability</h2>
                <p className="text-slate-700 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              {/* Entire Agreement */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">15. Entire Agreement</h2>
                <p className="text-slate-700 leading-relaxed">
                  These Terms of Use constitute the entire agreement between you and Calc-Tech.com regarding your use of the Website and supersede all prior agreements and understandings.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Questions About These Terms?</h2>
                <p className="text-slate-700 leading-relaxed">
                  If you have any questions about these Terms of Use, please review our{" "}
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 underline font-medium">
                    About Us
                  </Link>{" "}
                  page for more information about Calc-Tech.com.
                </p>
              </section>

              {/* Acknowledgment */}
              <section className="bg-slate-100 p-6 rounded-lg border-2">
                <p className="text-slate-700 font-medium text-center">
                  By using Calc-Tech.com, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
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
            © 2025 Calc-Tech.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
