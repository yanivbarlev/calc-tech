"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Calculator, Search, TrendingUp, Heart, Brain, DollarSign, Sparkles, ArrowRight, Zap, Shield, Clock, Monitor } from "lucide-react";

const calculatorCategories = [
  {
    title: "Polymarket Tools",
    icon: TrendingUp,
    gradient: "from-orange-500 to-amber-600",
    calculators: [
      { name: "Polymarket EV Calculator", href: "/polymarket-ev" },
      { name: "Polymarket Arbitrage Calculator", href: "/polymarket-arbitrage" },
      { name: "Kelly Criterion Calculator", href: "/polymarket-kelly" },
      { name: "Implied Probability Calculator", href: "/polymarket-probability" },
      { name: "Sure Bet Finder Extension", href: "/extensions/sure-bet-finder" },
      { name: "Whale Tracker Extension", href: "/extensions/whale-tracker" },
    ],
  },
  {
    title: "Loan & Mortgage Calculators",
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
      { name: "Debt Payoff Calculator", href: "/debt-payoff" },
      { name: "Debt Consolidation Calculator", href: "/debt-consolidation" },
      { name: "Credit Card Calculator", href: "/credit-card" },
    ],
  },
  {
    title: "Investment & Retirement",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-600",
    calculators: [
      { name: "Retirement Calculator", href: "/retirement" },
      { name: "401K Calculator", href: "/401k" },
      { name: "IRA Calculator", href: "/ira" },
      { name: "Roth IRA Calculator", href: "/roth-ira" },
      { name: "Investment Calculator", href: "/investment" },
      { name: "ROI Calculator", href: "/roi" },
      { name: "RMD Calculator", href: "/rmd" },
      { name: "Social Security Calculator", href: "/social-security" },
      { name: "Savings Calculator", href: "/savings" },
      { name: "CD Calculator", href: "/cd" },
      { name: "College Cost Calculator", href: "/college-cost" },
      { name: "Present Value Calculator", href: "/present-value" },
      { name: "Future Value Calculator", href: "/future-value" },
    ],
  },
  {
    title: "Interest & Finance",
    icon: Calculator,
    gradient: "from-purple-500 to-indigo-600",
    calculators: [
      { name: "Interest Calculator", href: "/interest" },
      { name: "Compound Interest Calculator", href: "/compound-interest" },
      { name: "Simple Interest Calculator", href: "/simple-interest" },
      { name: "Interest Rate Calculator", href: "/interest-rate" },
      { name: "APR Calculator", href: "/apr" },
      { name: "Finance Calculator", href: "/finance" },
      { name: "Payment Calculator", href: "/payment" },
      { name: "Inflation Calculator", href: "/inflation" },
    ],
  },
  {
    title: "Tax & Income Calculators",
    icon: DollarSign,
    gradient: "from-orange-500 to-red-600",
    calculators: [
      { name: "Income Tax Calculator", href: "/income-tax" },
      { name: "Sales Tax Calculator", href: "/sales-tax" },
      { name: "Salary Calculator", href: "/salary" },
    ],
  },
  {
    title: "Real Estate & Housing",
    icon: DollarSign,
    gradient: "from-teal-500 to-green-600",
    calculators: [
      { name: "House Affordability Calculator", href: "/house-affordability" },
      { name: "Rent Calculator", href: "/rent" },
      { name: "Down Payment Calculator", href: "/down-payment" },
    ],
  },
  {
    title: "Business & Commerce",
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-600",
    calculators: [
      { name: "Budget Calculator", href: "/budget" },
      { name: "Commission Calculator", href: "/commission" },
      { name: "Discount Calculator", href: "/discount" },
    ],
  },
  {
    title: "Fitness & Health Calculators",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    calculators: [
      { name: "BMI Calculator", href: "/bmi" },
      { name: "Calorie Calculator", href: "/calorie" },
      { name: "Body Fat Calculator", href: "/body-fat" },
      { name: "BMR Calculator", href: "/bmr" },
      { name: "Ideal Weight Calculator", href: "/ideal-weight" },
      { name: "Pace Calculator", href: "/pace" },
      { name: "Conception Calculator", href: "/conception" },
      { name: "Due Date Calculator", href: "/due-date" },
    ],
  },
  {
    title: "Math Calculators",
    icon: Brain,
    gradient: "from-purple-500 to-indigo-600",
    calculators: [
      { name: "Scientific Calculator", href: "/scientific" },
      { name: "Fraction Calculator", href: "/fraction" },
      { name: "Percentage Calculator", href: "/percentage" },
      { name: "Random Number Generator", href: "/random-number" },
      { name: "Triangle Calculator", href: "/triangle" },
      { name: "Standard Deviation Calculator", href: "/standard-deviation" },
    ],
  },
  {
    title: "Other Calculators",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-600",
    calculators: [
      { name: "Age Calculator", href: "/age" },
      { name: "Date Calculator", href: "/date" },
      { name: "Time Calculator", href: "/time" },
      { name: "Hours Calculator", href: "/hours" },
      { name: "GPA Calculator", href: "/gpa" },
      { name: "Grade Calculator", href: "/grade" },
      { name: "Concrete Calculator", href: "/concrete" },
      { name: "Subnet Calculator", href: "/subnet" },
      { name: "Password Generator", href: "/password" },
      { name: "Conversion Calculator", href: "/conversion" },
    ],
  },
  {
    title: "Software & App Reviews",
    icon: Monitor,
    gradient: "from-cyan-500 to-blue-600",
    calculators: [
      { name: "Software Hub", href: "/software" },
      { name: "Roblox Review", href: "/software/roblox" },
      { name: "Uber App Review", href: "/software/com_ubercab" },
    ],
  },
];

const featuredCalculators = [
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index instantly",
    href: "/bmi",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: "Mortgage Calculator",
    description: "Plan your home loan payments",
    href: "/mortgage",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Percentage Calculator",
    description: "Quick percentage calculations",
    href: "/percentage",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results with our optimized calculation engines",
  },
  {
    icon: Shield,
    title: "100% Accurate",
    description: "Every calculator is thoroughly tested and validated",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Access all tools 24/7 without any registration",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all calculators from all categories for searching
  const allCalculators = calculatorCategories.flatMap(category =>
    category.calculators.map(calc => ({
      ...calc,
      category: category.title,
      categoryGradient: category.gradient,
    }))
  );

  // Filter calculators based on search query
  const filteredCalculators = searchQuery.trim()
    ? allCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter categories to show only those with matching calculators
  const filteredCategories = searchQuery.trim()
    ? calculatorCategories.map(category => ({
        ...category,
        calculators: category.calculators.filter(calc =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(category => category.calculators.length > 0)
    : calculatorCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calc-Tech.com
              </span>
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Over 65 Free Calculators
          </div>

          <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight pb-2">
            Calculate Anything,
            <br />
            Instantly
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed">
            Fast, comprehensive, and convenient. Access professional-grade calculators
            without registration. Each tool undergoes strict testing to ensure accuracy.
          </p>

          {/* Search Bar */}
          <div id="search-section" className="mx-auto max-w-2xl mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-6 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search calculators... (e.g., BMI, mortgage, percentage)"
                  className="h-14 pl-14 pr-6 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-400 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Search Results Dropdown */}
            {searchQuery.trim() && (
              <div className="relative mt-4">
                <Card className="absolute top-0 left-0 right-0 max-h-96 overflow-y-auto shadow-2xl border-2 z-50 bg-white">
                  <CardContent className="p-4">
                    {filteredCalculators.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-600 mb-3">
                          Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
                        </p>
                        {filteredCalculators.map((calc, idx) => (
                          <Link
                            key={idx}
                            href={calc.href}
                            className="block p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all border hover:border-blue-300 group"
                            onClick={() => setSearchQuery("")}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-slate-800 group-hover:text-blue-600">
                                  {calc.name}
                                </p>
                                <p className="text-xs text-slate-500">{calc.category}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">No calculators found</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Try searching for "BMI", "mortgage", or "percentage"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Featured Calculators */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {featuredCalculators.map((calc, index) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <Card className="relative h-full border-2 hover:border-blue-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`${calc.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <calc.icon className={`h-6 w-6 ${calc.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">{calc.description}</p>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      Try Now <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculator Categories Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
            {searchQuery.trim() ? `Search Results for "${searchQuery}"` : "Browse by Category"}
          </h2>
          {searchQuery.trim() && filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-600 font-medium mb-2">No calculators found</p>
              <p className="text-slate-500">Try a different search term</p>
              <Button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.title}
                  className="group border-2 hover:border-blue-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className={`bg-gradient-to-r ${category.gradient} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 pb-8 px-6">
                    <div className="grid grid-cols-1 gap-1">
                      {category.calculators.map((calculator) => (
                        <Link
                          key={calculator.href}
                          href={calculator.href}
                          className="group/item flex items-center justify-between rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200"
                        >
                          <span className="font-medium">{calculator.name}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transform translate-x-0 group-hover/item:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Our Calculators?
              </h2>
              <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                Built with precision, designed for simplicity
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-2 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Calculate?
              </h2>
              <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
                Join thousands of users who trust our calculators for accurate results
              </p>
              <Button
                size="lg"
                onClick={() => {
                  const searchSection = document.getElementById('search-section');
                  searchSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t bg-white/80 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 mb-6">
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/sitemap" className="hover:text-blue-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
