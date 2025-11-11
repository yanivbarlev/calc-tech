import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ArrowLeft, Target, Users, Shield, TrendingUp } from "lucide-react";

export default function AboutPage() {
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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Calc-Tech.com
            </h1>
            <p className="text-xl text-slate-600">
              Your trusted source for free, accurate online calculators since 2025
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-8 w-8" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                At Calc-Tech.com, our mission is to provide a comprehensive collection of free online calculators
                for ease of public use. We believe that everyone should have access to accurate, reliable calculation
                tools without barriers, fees, or complicated interfaces.
              </p>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <Calculator className="h-6 w-6" />
                  60+ Calculators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We offer a diverse range of calculators organized into four main categories: Financial,
                  Fitness & Health, Math, and Utility calculators. Each tool is designed for specific needs,
                  from mortgage calculations to BMI assessments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Shield className="h-6 w-6" />
                  Quality & Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Over 90% of our calculators are based on well-established formulas and equations from
                  trusted textbooks. We prioritize accuracy and reliability in every calculation we provide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Users className="h-6 w-6" />
                  User-Centered Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our calculators feature clean, intuitive interfaces with clear instructions and helpful
                  explanations. We focus on making complex calculations simple and accessible for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-600">
                  <TrendingUp className="h-6 w-6" />
                  Continuous Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We continuously update and expand our calculator collection based on user feedback and
                  emerging needs. Our goal is to remain your go-to resource for online calculations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Development Process */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Development & Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Internal Development</h3>
                <p className="text-slate-600">
                  All calculators on Calc-Tech.com are developed in-house by our team of experienced
                  developers and engineers. This ensures consistency, quality, and adherence to our
                  high standards.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Formula-Based Accuracy</h3>
                <p className="text-slate-600">
                  The majority of our calculators utilize well-documented formulas and equations from
                  established textbooks and academic sources. Common examples include mortgage calculations,
                  BMI formulas, loan amortization schedules, and statistical computations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Expert Review</h3>
                <p className="text-slate-600">
                  For specialized calculators, we engage subject matter experts to ensure accuracy:
                </p>
                <ul className="list-disc list-inside text-slate-600 mt-2 ml-4 space-y-1">
                  <li>Financial calculators reviewed by certified financial advisors</li>
                  <li>Health calculators validated by medical professionals</li>
                  <li>Technical calculators verified by engineers and scientists</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Calculator Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-600 mb-2">💰 Financial Calculators</h3>
                  <p className="text-slate-600 text-sm">
                    Mortgage, loan, investment, retirement, savings, and other money-related calculations
                    to help you make informed financial decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-pink-600 mb-2">❤️ Fitness & Health Calculators</h3>
                  <p className="text-slate-600 text-sm">
                    BMI, BMR, body fat, calorie, ideal weight, and pregnancy calculators to support your
                    health and wellness journey.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-2">🧮 Math Calculators</h3>
                  <p className="text-slate-600 text-sm">
                    Percentage, fraction, statistics, scientific, and other mathematical tools for students,
                    professionals, and anyone needing quick calculations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-600 mb-2">🔧 Utility Calculators</h3>
                  <p className="text-slate-600 text-sm">
                    Date, time, conversion, age, grade, and various other practical calculators for
                    everyday use and problem-solving.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Technology & Platform</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-slate-600 mb-4">
                Calc-Tech.com is built using modern web technologies to ensure fast, reliable, and
                secure access to our calculators:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li><strong>Next.js 16</strong> - For optimal performance and user experience</li>
                <li><strong>TypeScript</strong> - Ensuring type safety and code reliability</li>
                <li><strong>Tailwind CSS</strong> - For beautiful, responsive design</li>
                <li><strong>Clerk Authentication</strong> - Secure user accounts and data protection</li>
                <li><strong>Vercel Hosting</strong> - Global CDN for lightning-fast load times</li>
              </ul>
            </CardContent>
          </Card>

          {/* Commitment */}
          <Card className="border-2 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Commitment to You</h2>
              <div className="space-y-3 text-slate-700">
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Always Free:</strong> All our calculators are and will remain free to use</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>No Registration Required:</strong> Use any calculator instantly without creating an account</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Privacy Focused:</strong> We don't store your calculation data</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Mobile Friendly:</strong> All calculators work seamlessly on phones and tablets</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Regularly Updated:</strong> We continuously improve and add new calculators</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Calculator className="h-5 w-5" />
              Start Calculating Now
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
