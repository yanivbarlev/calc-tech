import Link from "next/link";
import { Calculator, ArrowLeft, DollarSign, Heart, Brain, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SitemapPage() {
  const calculatorCategories = [
    {
      title: "Financial Calculators",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-600",
      calculators: [
        { name: "Mortgage Calculator", href: "/mortgage" },
        { name: "Loan Calculator", href: "/loan" },
        { name: "Auto Loan Calculator", href: "/auto-loan" },
        { name: "Student Loan Calculator", href: "/student-loan" },
        { name: "Personal Loan Calculator", href: "/personal-loan" },
        { name: "Business Loan Calculator", href: "/business-loan" },
        { name: "Amortization Calculator", href: "/amortization" },
        { name: "Refinance Calculator", href: "/refinance" },
        { name: "Payment Calculator", href: "/payment" },
        { name: "Down Payment Calculator", href: "/down-payment" },
        { name: "House Affordability Calculator", href: "/house-affordability" },
        { name: "Rent vs Buy Calculator", href: "/rent" },
        { name: "Investment Calculator", href: "/investment" },
        { name: "Compound Interest Calculator", href: "/compound-interest" },
        { name: "Simple Interest Calculator", href: "/simple-interest" },
        { name: "Interest Calculator", href: "/interest" },
        { name: "Interest Rate Calculator", href: "/interest-rate" },
        { name: "APR Calculator", href: "/apr" },
        { name: "Savings Calculator", href: "/savings" },
        { name: "CD Calculator", href: "/cd" },
        { name: "401k Calculator", href: "/401k" },
        { name: "IRA Calculator", href: "/ira" },
        { name: "Roth IRA Calculator", href: "/roth-ira" },
        { name: "Retirement Calculator", href: "/retirement" },
        { name: "RMD Calculator", href: "/rmd" },
        { name: "Social Security Calculator", href: "/social-security" },
        { name: "Future Value Calculator", href: "/future-value" },
        { name: "Present Value Calculator", href: "/present-value" },
        { name: "ROI Calculator", href: "/roi" },
        { name: "Inflation Calculator", href: "/inflation" },
        { name: "Salary Calculator", href: "/salary" },
        { name: "Budget Calculator", href: "/budget" },
        { name: "Debt Payoff Calculator", href: "/debt-payoff" },
        { name: "Debt Consolidation Calculator", href: "/debt-consolidation" },
        { name: "Credit Card Calculator", href: "/credit-card" },
        { name: "Sales Tax Calculator", href: "/sales-tax" },
        { name: "Income Tax Calculator", href: "/income-tax" },
        { name: "Discount Calculator", href: "/discount" },
        { name: "Commission Calculator", href: "/commission" },
        { name: "College Cost Calculator", href: "/college-cost" },
        { name: "Finance Calculator", href: "/finance" },
      ],
    },
    {
      title: "Fitness & Health Calculators",
      icon: Heart,
      gradient: "from-pink-500 to-rose-600",
      calculators: [
        { name: "BMI Calculator", href: "/bmi" },
        { name: "BMR Calculator", href: "/bmr" },
        { name: "Body Fat Calculator", href: "/body-fat" },
        { name: "Ideal Weight Calculator", href: "/ideal-weight" },
        { name: "Calorie Calculator", href: "/calorie" },
        { name: "Pace Calculator", href: "/pace" },
        { name: "Due Date Calculator", href: "/due-date" },
        { name: "Conception Calculator", href: "/conception" },
      ],
    },
    {
      title: "Math Calculators",
      icon: Brain,
      gradient: "from-purple-500 to-indigo-600",
      calculators: [
        { name: "Percentage Calculator", href: "/percentage" },
        { name: "Fraction Calculator", href: "/fraction" },
        { name: "Standard Deviation Calculator", href: "/standard-deviation" },
        { name: "Random Number Generator", href: "/random-number" },
        { name: "Scientific Calculator", href: "/scientific" },
        { name: "Triangle Calculator", href: "/triangle" },
      ],
    },
    {
      title: "Other Calculators",
      icon: Wrench,
      gradient: "from-amber-500 to-orange-600",
      calculators: [
        { name: "Age Calculator", href: "/age" },
        { name: "Date Calculator", href: "/date" },
        { name: "Time Calculator", href: "/time" },
        { name: "Hours Calculator", href: "/hours" },
        { name: "GPA Calculator", href: "/gpa" },
        { name: "Grade Calculator", href: "/grade" },
        { name: "Conversion Calculator", href: "/conversion" },
        { name: "Password Generator", href: "/password" },
        { name: "Subnet Calculator", href: "/subnet" },
        { name: "Concrete Calculator", href: "/concrete" },
      ],
    },
  ];

  const informationPages = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Sitemap", href: "/sitemap" },
  ];

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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sitemap
            </h1>
            <p className="text-xl text-slate-600">
              Complete directory of all calculators and pages on Calc-Tech.com
            </p>
          </div>

          {/* Information Pages */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl">Information Pages</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {informationPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border hover:border-blue-300 transition-all"
                  >
                    <span className="text-slate-700 hover:text-blue-600 font-medium">
                      {page.name}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calculator Categories */}
          {calculatorCategories.map((category, idx) => (
            <Card key={idx} className="mb-8 border-2 shadow-lg">
              <CardHeader className={`bg-gradient-to-r ${category.gradient} text-white`}>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <category.icon className="h-8 w-8" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-3">
                  {category.calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border hover:border-blue-300 transition-all"
                    >
                      <span className="text-slate-700 hover:text-blue-600 text-sm">
                        {calc.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Total Count */}
          <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg border-2">
            <p className="text-3xl font-bold text-slate-800 mb-2">
              60+ Free Calculators
            </p>
            <p className="text-slate-600">
              All available for free, no registration required
            </p>
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
