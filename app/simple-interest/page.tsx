"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Calendar, PiggyBank } from "lucide-react";

interface SimpleInterestResults {
  endBalance: number;
  totalInterest: number;
  principal: number;
  rate: number;
  term: number;
}

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState<string>("20000");
  const [rate, setRate] = useState<string>("3");
  const [term, setTerm] = useState<string>("10");
  const [results, setResults] = useState<SimpleInterestResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simple Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online simple interest calculator to calculate interest earnings and ending balance using straightforward simple interest formulas. Includes educational content and real-world examples.",
    "url": "https://calc-tech.com/simple-interest",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1547"
    }
  };

  const calculate = () => {
    const p = parseFloat(principal) || 20000;
    const r = parseFloat(rate) || 3;
    const t = parseFloat(term) || 10;

    // Simple Interest Formula: I = P × r × t
    const totalInterest = p * (r / 100) * t;
    const endBalance = p + totalInterest;

    setResults({
      endBalance,
      totalInterest,
      principal: p,
      rate: r,
      term: t,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-600">Professional Tools</div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Simple Interest Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate interest earnings and ending balance using straightforward simple interest formulas
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <Card className="border-2 rounded-2xl shadow-lg lg:col-span-1 h-fit sticky top-24">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Principal Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="20000"
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interest Rate (% per year)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="3"
                    className="pr-7"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Term (years)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="10"
                  />
                </div>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                Calculate Interest
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Ending Balance</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.endBalance)}</p>
                    <p className="text-emerald-100">Total amount after {results.term} years</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Interest Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Total Interest</span>
                        <span className="font-semibold text-lg text-emerald-600">
                          {formatCurrency(results.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Principal</span>
                        <span className="font-semibold">{formatCurrency(results.principal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Interest Rate</span>
                        <span className="font-semibold">{formatPercentage(results.rate)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Term</span>
                        <span className="font-semibold">{results.term} years</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Annual Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(results.totalInterest / results.term)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Interest Portion</span>
                        <span className="font-semibold">
                          {((results.totalInterest / results.endBalance) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Formula Card */}
                <Card className="border-2 rounded-2xl shadow-md bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Calculation Formula</h3>
                    <div className="bg-white rounded-lg p-4 border border-emerald-200">
                      <p className="text-slate-700 font-mono text-sm mb-2">
                        <strong>Simple Interest:</strong> I = P × r × t
                      </p>
                      <p className="text-slate-700 font-mono text-sm mb-2">
                        <strong>End Balance:</strong> A = P + I
                      </p>
                      <div className="mt-4 pt-4 border-t border-emerald-200 text-sm text-slate-600 space-y-1">
                        <p>
                          I = {formatCurrency(results.principal)} × {results.rate}% × {results.term} years ={" "}
                          <strong className="text-emerald-600">{formatCurrency(results.totalInterest)}</strong>
                        </p>
                        <p>
                          A = {formatCurrency(results.principal)} + {formatCurrency(results.totalInterest)} ={" "}
                          <strong className="text-emerald-600">{formatCurrency(results.endBalance)}</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to Calculate</h3>
                <p className="text-slate-500">Enter your details and click Calculate Interest</p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Simple Interest</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Simple Interest?</h3>
                <p className="mb-4">
                  Simple interest represents the most straightforward way to calculate what you'll earn on savings or pay on borrowed money. Unlike its more complex cousin, compound interest, simple interest doesn't factor in any previously accumulated earnings—it's just a flat percentage of your original principal, multiplied by time.
                </p>
                <p className="mb-4">
                  Think of it this way: if you lend someone $1,000 at 5% simple interest annually, you'll earn exactly $50 every single year, regardless of how long the loan runs. That consistency makes the math wonderfully predictable, which is why simple interest still pops up in certain financial products today.
                </p>
                <p>
                  The basic formula—I = P × r × t—couldn't be simpler. Take your principal amount (P), multiply it by the interest rate (r), and then multiply that by the time period (t). The result is your total interest. Add that back to your principal, and you've got your ending balance. Easy as that.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Simple Interest Actually Works</h3>
                <p className="mb-4">
                  Here's the thing about simple interest: it stays true to its name. Every calculation uses only the original principal—never the accumulated interest. So if you invest $10,000 at 5% for five years, you'll earn $500 per year, totaling $2,500 in interest. Your ending balance? Exactly $12,500.
                </p>
                <p className="mb-4">
                  Let's break that down with a real example. Say you take out a short-term loan of $5,000 at 4% simple interest for three years. Using our formula, that's $5,000 × 0.04 × 3 = $600 in total interest. When it's time to repay, you'll owe $5,600. No surprises, no hidden compounding—just straightforward arithmetic.
                </p>
                <p>
                  This predictability is exactly why simple interest appears in certain bonds, auto loans, and personal loans. Both borrowers and lenders appreciate knowing exactly what to expect from day one. There's something refreshing about financial calculations that don't require a Ph.D. in mathematics to understand.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Where You'll Actually Encounter Simple Interest</h3>
                <p className="mb-4">
                  While compound interest dominates most modern financial products, simple interest hasn't disappeared entirely. You'll find it alive and well in short-term auto loans, certain personal loans, and some government and corporate bonds. These instruments benefit from the transparency simple interest provides.
                </p>
                <p className="mb-4">
                  Treasury bills and notes, for instance, often use simple interest calculations. When you buy a bond paying 3% annually, you can count on receiving that exact percentage of your investment every single year until maturity. No complex calculations needed—just multiply your investment by the rate.
                </p>
                <p className="mb-4">
                  Some auto financing deals also stick with simple interest, particularly for shorter loan terms. If you're financing that new car for two or three years, there's a good chance your interest is being calculated this way. It keeps things crystal clear when you're making monthly payments.
                </p>
                <p>
                  That said, you'll rarely see simple interest on savings accounts or credit cards anymore. Banks realized long ago that compound interest works much better for their bottom line (and yours, if you're saving). Most mortgages, student loans, and investment accounts have moved to compound interest calculations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Simple Interest vs. Compound Interest: The Real Difference</h3>
                <p className="mb-4">
                  The gap between simple and compound interest might seem minor at first glance, but over time, it becomes absolutely massive. Compound interest calculates earnings on both your principal and your previously accumulated interest—what Einstein allegedly called "the eighth wonder of the world." Simple interest? It ignores all those accumulated earnings and sticks with the original amount.
                </p>
                <p className="mb-4">
                  Let's put some numbers to this. Imagine investing $10,000 at 5% for ten years. With simple interest, you'd calculate: $10,000 × 0.05 × 10 = $5,000 in interest, giving you $15,000 total. Not bad, right?
                </p>
                <p className="mb-4">
                  Now run that same scenario with compound interest (compounded annually). Your money would grow to approximately $16,288—that's an extra $1,288 just from the compounding effect. And if you compound monthly instead? You're looking at around $16,470. The difference becomes even more dramatic over longer time periods.
                </p>
                <p className="mb-4">
                  This explains why lenders typically prefer simple interest for loans (it costs borrowers less), while banks push compound interest for savings products (it rewards savers more). As someone managing your finances, understanding this distinction helps you make smarter decisions about everything from car loans to retirement accounts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Working Through Real-World Examples</h3>
                <p className="mb-4">
                  Nothing beats a practical example for really understanding how this works. Let's say you're considering a $20,000 personal loan at 6% annual simple interest for four years. Your total interest would be: $20,000 × 0.06 × 4 = $4,800. Add that to your principal, and you're repaying $24,800 total over the life of the loan.
                </p>
                <p className="mb-4">
                  Now here's where it gets interesting for budgeting purposes. Divide that $24,800 by 48 months, and your monthly payment comes to about $516.67. Since this is simple interest, that payment stays constant for the entire term—no adjustments, no recalculations, just the same amount month after month.
                </p>
                <p className="mb-4">
                  Compare that to a similar loan with compound interest, and you'd typically see slightly higher total interest charges, though the exact difference depends on the compounding frequency. For a four-year loan, the gap might not seem huge, but it definitely adds up.
                </p>
                <p>
                  Another common scenario: you're buying a municipal bond worth $50,000 that pays 3.5% simple interest annually for five years. Each year, you'll receive exactly $1,750 in interest payments ($50,000 × 0.035). After five years, you'll have collected $8,750 in interest plus your original $50,000 principal back. Simple, predictable, and easy to plan around.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making the Formula Work for You</h3>
                <p className="mb-4">
                  The beauty of simple interest lies in its flexibility—you can solve for any variable if you know the other three. Need to figure out what interest rate you're actually paying? Rearrange the formula to r = I ÷ (P × t). Want to know how long you need to invest to reach a certain interest amount? Use t = I ÷ (P × r).
                </p>
                <p className="mb-4">
                  Let's say someone quotes you a loan where you'd pay $3,000 in interest on a $15,000 principal over five years. What's your actual rate? Plug it in: r = $3,000 ÷ ($15,000 × 5) = 0.04, or 4%. Now you can compare that rate to other loan offers and make an informed decision.
                </p>
                <p className="mb-4">
                  Or maybe you're wondering how long it'll take to earn $2,000 in interest on a $25,000 investment at 3.2%. Calculate it: t = $2,000 ÷ ($25,000 × 0.032) = 2.5 years. These quick calculations help you set realistic expectations and plan your finances accordingly.
                </p>
                <p>
                  Keep in mind that rates are almost always quoted annually, so if you're working with monthly periods, you'll need to convert. A 6% annual rate becomes 0.5% monthly (6% ÷ 12). Similarly, a three-year term is 36 months. Getting comfortable with these conversions makes you much more effective at evaluating different financial products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Simple Interest Makes the Most Sense</h3>
                <p className="mb-4">
                  For borrowers, simple interest can be a fantastic deal, especially on shorter-term loans. Since you're only paying interest on the original principal, you'll typically pay less over the life of the loan compared to compound interest alternatives. This makes it particularly attractive for auto loans, personal loans, and other debts you plan to pay off within a few years.
                </p>
                <p className="mb-4">
                  However, if you're investing or saving, compound interest is usually your friend. That's why you won't find many savings accounts or certificates of deposit using simple interest anymore—banks know it costs them less to pay out, which means you earn less. Always check whether your savings vehicle uses simple or compound interest before committing your money.
                </p>
                <p className="mb-4">
                  The exception? Certain bonds and fixed-income securities still use simple interest because the predictable, steady payments suit many investors' needs. If you're building a retirement portfolio and want guaranteed annual income, simple interest bonds can play a valuable role despite offering lower total returns than compound alternatives.
                </p>
                <p>
                  Bottom line: understand which type of interest you're dealing with before signing anything. For debts, simple interest typically works in your favor. For investments, compound interest usually delivers better long-term growth. There's no one-size-fits-all answer—it depends entirely on your specific situation and financial goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Mistakes to Avoid</h3>
                <p className="mb-4">
                  One of the biggest errors people make is confusing simple interest with APR (Annual Percentage Rate). APR can include fees, points, and other costs beyond just interest, making it a more comprehensive measure of what a loan actually costs. Simple interest focuses solely on the interest charge itself—nothing more.
                </p>
                <p className="mb-4">
                  Another frequent mistake? Forgetting to convert everything to the same time period. If your rate is annual but you're calculating monthly interest, you absolutely must divide that rate by 12. Similarly, if you're working with a term in months, convert it to years (or convert your rate to a monthly rate). Mismatched time periods will give you completely wrong answers.
                </p>
                <p className="mb-4">
                  Many folks also assume all loans use simple interest, which definitely isn't true. Credit cards, mortgages, and most long-term loans use compound interest (often calculated daily). If you're not certain which method applies to your loan or investment, ask directly. The difference can amount to thousands of dollars over time.
                </p>
                <p>
                  Finally, don't overlook the impact of payment timing. While simple interest itself doesn't compound, paying off a loan early can still save you money since you'll reduce the time period in the formula. Every month you shorten that term reduces your total interest charge proportionally.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Planning Your Financial Future</h3>
                <p className="mb-4">
                  Understanding simple interest gives you a solid foundation for all your financial decisions, even if most products you encounter use compound interest. The core concepts—principal, rate, and time—apply across virtually every financial calculation you'll ever need to make.
                </p>
                <p className="mb-4">
                  When you're shopping for loans, knowing how to quickly calculate simple interest helps you reality-check the numbers lenders throw at you. If someone claims you'll pay $5,000 interest on a $25,000 loan over three years, you can immediately verify whether that 6.67% rate seems competitive.
                </p>
                <p className="mb-4">
                  For investments, understanding the difference between simple and compound returns helps you set realistic expectations. If you see an investment promising simple interest returns, you'll know it's probably not your best option for long-term growth—unless other factors like stability and predictability outweigh the lower returns.
                </p>
                <p>
                  Take time to practice these calculations with your own financial scenarios. Whether you're planning to buy a car, invest in bonds, or take out a personal loan, running the numbers yourself builds confidence and helps you avoid costly mistakes. Simple interest might be basic mathematics, but mastering it is anything but trivial when it comes to your financial well-being.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/compound-interest"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group"
                >
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700 group-hover:text-emerald-700">
                    Compound Interest Calculator
                  </span>
                </Link>
                <Link
                  href="/interest-rate"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group"
                >
                  <Calculator className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700 group-hover:text-emerald-700">
                    Interest Rate Calculator
                  </span>
                </Link>
                <Link
                  href="/savings"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group"
                >
                  <PiggyBank className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700 group-hover:text-emerald-700">
                    Savings Calculator
                  </span>
                </Link>
                <Link
                  href="/loan"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group"
                >
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700 group-hover:text-emerald-700">
                    Loan Calculator
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 border-t bg-white/80 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 mb-6">
            <Link href="/about" className="hover:text-emerald-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy and simplicity.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
