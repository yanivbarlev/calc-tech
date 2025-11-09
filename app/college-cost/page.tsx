"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, GraduationCap, ArrowLeft, DollarSign, TrendingUp, Calendar, BookOpen, PiggyBank, Wallet } from "lucide-react";

interface CollegeCostResults {
  totalCost: number;
  futureTotalCost: number;
  currentSavings: number;
  futureSavings: number;
  savingsGap: number;
  percentCoveredBySavings: number;
  amountNeeded: number;
  yearlyBreakdown: YearlyBreakdown[];
}

interface YearlyBreakdown {
  year: number;
  startYear: number;
  annualCost: number;
  savingsUsed: number;
  remainingNeeded: number;
  savingsBalance: number;
}

export default function CollegeCostCalculator() {
  // College costs
  const [collegeType, setCollegeType] = useState<string>("public-4-year-instate");
  const [customCost, setCustomCost] = useState<string>("29910");
  const [costIncreaseRate, setCostIncreaseRate] = useState<string>("5");
  const [yearsToCollege, setYearsToCollege] = useState<string>("10");
  const [collegeDuration, setCollegeDuration] = useState<string>("4");

  // Savings
  const [currentSavings, setCurrentSavings] = useState<string>("50000");
  const [percentFromSavings, setPercentFromSavings] = useState<string>("75");
  const [investmentReturn, setInvestmentReturn] = useState<string>("6");
  const [taxRate, setTaxRate] = useState<string>("0");

  const [results, setResults] = useState<CollegeCostResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const collegeTypes = {
    "public-4-year-instate": 29910,
    "public-4-year-outstate": 49080,
    "private-4-year": 62990,
    "public-2-year": 20570,
    "custom": parseFloat(customCost) || 29910
  };

  const calculate = () => {
    // Parse inputs
    const annualCost = collegeType === "custom" ? parseFloat(customCost) || 29910 : collegeTypes[collegeType as keyof typeof collegeTypes];
    const inflation = parseFloat(costIncreaseRate) / 100 || 0.05;
    const yearsUntil = parseFloat(yearsToCollege) || 0;
    const duration = parseFloat(collegeDuration) || 4;
    const savings = parseFloat(currentSavings) || 0;
    const percentSavings = parseFloat(percentFromSavings) / 100 || 0.75;
    const returnRate = parseFloat(investmentReturn) / 100 || 0.06;
    const taxRatePercent = parseFloat(taxRate) / 100 || 0;

    // Calculate after-tax return rate
    const afterTaxReturn = returnRate * (1 - taxRatePercent);

    // Calculate future value of current savings
    const futureSavings = savings * Math.pow(1 + afterTaxReturn, yearsUntil);

    // Calculate yearly costs and breakdown
    const yearlyBreakdown: YearlyBreakdown[] = [];
    let totalFutureCost = 0;
    let remainingSavings = futureSavings;
    const currentYear = new Date().getFullYear();

    for (let year = 0; year < duration; year++) {
      const yearFromNow = yearsUntil + year;
      const inflatedCost = annualCost * Math.pow(1 + inflation, yearFromNow);
      totalFutureCost += inflatedCost;

      const savingsToUse = Math.min(remainingSavings, inflatedCost * percentSavings);
      remainingSavings -= savingsToUse;
      const needsFromOtherSources = inflatedCost - savingsToUse;

      yearlyBreakdown.push({
        year: year + 1,
        startYear: currentYear + Math.floor(yearsUntil) + year,
        annualCost: inflatedCost,
        savingsUsed: savingsToUse,
        remainingNeeded: needsFromOtherSources,
        savingsBalance: remainingSavings
      });
    }

    // Calculate total costs at today's prices
    const totalCurrentCost = annualCost * duration;

    // Calculate how much of total future cost will be covered by savings
    const totalSavingsUsed = futureSavings;
    const totalFromOtherSources = totalFutureCost - Math.min(totalSavingsUsed, totalFutureCost * percentSavings);
    const actualPercentCovered = (Math.min(totalSavingsUsed, totalFutureCost * percentSavings) / totalFutureCost) * 100;

    setResults({
      totalCost: totalCurrentCost,
      futureTotalCost: totalFutureCost,
      currentSavings: savings,
      futureSavings: futureSavings,
      savingsGap: Math.max(0, totalFutureCost - futureSavings),
      percentCoveredBySavings: actualPercentCovered,
      amountNeeded: totalFromOtherSources,
      yearlyBreakdown: yearlyBreakdown
    });

    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
            <GraduationCap className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            College Cost Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan ahead for higher education expenses with inflation projections, savings growth, and detailed year-by-year cost breakdowns
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  College Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College Type
                  </label>
                  <select
                    value={collegeType}
                    onChange={(e) => setCollegeType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="public-4-year-instate">4-Year Public (In-State) - $29,910/year</option>
                    <option value="public-4-year-outstate">4-Year Public (Out-of-State) - $49,080/year</option>
                    <option value="private-4-year">4-Year Private - $62,990/year</option>
                    <option value="public-2-year">2-Year Public - $20,570/year</option>
                    <option value="custom">Custom Amount</option>
                  </select>
                </div>

                {collegeType === "custom" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Annual College Cost (Today)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={customCost}
                        onChange={(e) => setCustomCost(e.target.value)}
                        className="pl-7"
                        placeholder="29910"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College Cost Increase Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={costIncreaseRate}
                      onChange={(e) => setCostIncreaseRate(e.target.value)}
                      className="pr-7"
                      placeholder="5"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Typical range: 4-6% annually</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College Will Start In (Years)
                  </label>
                  <Input
                    type="number"
                    value={yearsToCollege}
                    onChange={(e) => setYearsToCollege(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Years of College
                  </label>
                  <Input
                    type="number"
                    value={collegeDuration}
                    onChange={(e) => setCollegeDuration(e.target.value)}
                    placeholder="4"
                  />
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-emerald-600" />
                    Savings & Investment
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Current College Savings
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={currentSavings}
                          onChange={(e) => setCurrentSavings(e.target.value)}
                          className="pl-7"
                          placeholder="50000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Percent of Costs from Savings
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={percentFromSavings}
                          onChange={(e) => setPercentFromSavings(e.target.value)}
                          className="pr-7"
                          placeholder="75"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Annual Investment Return
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={investmentReturn}
                          onChange={(e) => setInvestmentReturn(e.target.value)}
                          className="pr-7"
                          placeholder="6"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Expected growth rate on savings</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Tax Rate on Returns
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={taxRate}
                          onChange={(e) => setTaxRate(e.target.value)}
                          className="pr-7"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Use 0% for 529 plans</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate College Costs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Total Future College Cost</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.futureTotalCost)}</p>
                    <p className="text-emerald-100">
                      Today's cost: {formatCurrency(results.totalCost)} (adjusted for inflation)
                    </p>
                  </div>
                </Card>

                {/* Summary Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Savings Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Current Savings</span>
                        <span className="font-semibold">{formatCurrency(results.currentSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Future Value</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.futureSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Growth</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(results.futureSavings - results.currentSavings)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Coverage</span>
                        <span className="font-bold text-lg">{formatPercent(results.percentCoveredBySavings)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Wallet className="h-5 w-5 text-amber-600" />
                        Funding Gap
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">From Savings</span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(Math.min(results.futureSavings, results.futureTotalCost))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">From Other Sources</span>
                        <span className="font-semibold text-amber-600">{formatCurrency(results.amountNeeded)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Total Gap</span>
                        <span className="font-bold text-lg text-rose-600">{formatCurrency(results.savingsGap)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Additional funding needed (loans, grants, scholarships)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Year by Year Breakdown */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                      Year-by-Year Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-slate-200">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Period</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Annual Cost</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">From Savings</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Other Sources</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.yearlyBreakdown.map((entry) => (
                            <tr key={entry.year} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">{entry.year}</td>
                              <td className="py-3 px-4">{entry.startYear}-{entry.startYear + 1}</td>
                              <td className="py-3 px-4 text-right font-semibold">{formatCurrency(entry.annualCost)}</td>
                              <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(entry.savingsUsed)}</td>
                              <td className="py-3 px-4 text-right text-amber-600">{formatCurrency(entry.remainingNeeded)}</td>
                              <td className="py-3 px-4 text-right font-semibold">{formatCurrency(entry.savingsBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <GraduationCap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Fill in the details and click "Calculate College Costs" to see your personalized projection
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding College Costs and Financial Planning</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Reality of College Expenses</h3>
                <p>
                  When people talk about the cost of college, they're usually referring to tuition—but that's just one piece of a much larger puzzle. The real expense of attending a four-year institution includes tuition and fees, room and board (or housing and food if you're living off-campus), textbooks and course materials, transportation costs, and general living expenses. If you're looking at the sticker price of a college and thinking that's what you'll pay, you're probably underestimating by quite a bit.
                </p>
                <p className="mt-3">
                  What makes planning particularly tricky is that these costs don't stay flat. Over the past several decades, college expenses have consistently grown faster than general inflation. It's not unusual to see annual increases of 5% or more at many schools. That means if you're planning for a child who won't start college for another 10 or 15 years, the actual cost when they enroll could be dramatically higher than today's prices. This is exactly why our calculator adjusts for projected cost increases—so you get a realistic picture of what you'll actually be facing down the road.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Breaking Down What You'll Actually Pay</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Tuition and Fees</h4>
                <p>
                  This is the amount the school charges for instruction and various campus services. At public universities, there's usually a significant difference between in-state and out-of-state tuition—sometimes double or even triple the cost if you're coming from another state. Private colleges typically charge the same tuition regardless of where you live. These published rates are what you'll see in marketing materials and college guidebooks, but keep in mind they're often negotiable through financial aid packages.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Room and Board</h4>
                <p>
                  Whether you're living in a dorm or off-campus, you'll need somewhere to sleep and something to eat. Many schools require freshmen to live on campus and purchase a meal plan, which can run anywhere from $10,000 to $15,000 per year depending on the institution and the level of accommodation you choose. After the first year, living off-campus might be cheaper, or it might not—it really depends on the local housing market near the school. Don't forget to factor in utilities, internet, and the fact that you'll probably eat out more than you think.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Books and Supplies</h4>
                <p>
                  It's easy to overlook this one, but textbooks are expensive. A single science or engineering textbook can easily cost $200 or more, and you might need five or six books per semester. Some students save money by buying used books, renting textbooks, or finding older editions online. There are also course fees for lab classes, art supplies for studio courses, and technology requirements like a specific calculator or software subscriptions. Budget at least $1,000-$1,500 per year, though students in certain majors might spend considerably more.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Personal Expenses and Transportation</h4>
                <p>
                  Then there's everything else: getting to and from school at the beginning and end of semesters, weekend activities, toiletries, clothes, maybe a gym membership if it's not included in student fees. If you're bringing a car to campus, add parking fees, gas, insurance, and maintenance. These "miscellaneous" costs add up faster than most families anticipate—often another $3,000-$5,000 annually.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Financial Aid Actually Works</h3>
                <p>
                  The good news is that very few students pay the full sticker price for college. Most families receive some form of financial aid, which comes in several different flavors. Understanding the distinction between these types is crucial for planning.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Grants and Scholarships</h4>
                <p>
                  This is the holy grail of financial aid—money you don't have to pay back. Grants are typically need-based, meaning they're awarded based on your family's financial situation. The federal Pell Grant is the most common example, providing up to several thousand dollars per year to eligible students. Scholarships, on the other hand, are usually merit-based or tied to specific characteristics like athletic ability, academic achievement, or particular talents. Some come from the colleges themselves, while others are funded by private organizations, corporations, or community groups.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Student Loans</h4>
                <p>
                  Loans are borrowed money that you'll eventually need to repay with interest. Federal student loans generally offer better terms than private loans—lower interest rates, flexible repayment options, and various protections like deferment if you run into financial trouble. The most common types are Direct Subsidized Loans (where the government pays the interest while you're in school) and Direct Unsubsidized Loans (where interest accrues from day one). Parent PLUS loans are another federal option, though they typically come with higher interest rates.
                </p>
                <p className="mt-3">
                  Private student loans from banks and other lenders are typically a last resort. They usually require a credit check, might need a co-signer, and often have variable interest rates that can increase over time. The terms are generally less favorable than federal loans, so it's worth maxing out your federal loan options before going this route.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Work-Study Programs</h4>
                <p>
                  Federal Work-Study provides part-time jobs for students with financial need, allowing them to earn money to help pay education expenses. These are actual jobs—working in the library, assisting in a campus office, tutoring other students—and you receive a regular paycheck. The program is designed so that work hours don't interfere too much with academics, typically limiting students to 10-20 hours per week during the school year.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Savings Strategies for College</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">529 College Savings Plans</h4>
                <p>
                  These tax-advantaged investment accounts are specifically designed for education savings. The money you put in grows tax-free, and withdrawals are also tax-free as long as you use them for qualified education expenses. Many states offer their own 529 plans and provide additional tax benefits like deductions or credits on your state income tax return. There are two main types: savings plans (where you invest in mutual funds or similar investments) and prepaid tuition plans (where you essentially lock in today's tuition rates at participating colleges).
                </p>
                <p className="mt-3">
                  One of the best features of 529 plans is their flexibility. If your child decides not to go to college, you can change the beneficiary to another family member, or you can withdraw the money (though you'll pay taxes and a penalty on the earnings portion). Recent law changes have even made it possible to roll unused 529 funds into a Roth IRA under certain conditions.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Coverdell Education Savings Accounts</h4>
                <p>
                  These work similarly to 529 plans but with some key differences. Contributions are limited to $2,000 per year per beneficiary, and there are income restrictions on who can contribute. However, Coverdell accounts can be used for K-12 expenses in addition to college costs, and they offer more investment flexibility than most 529 plans. The funds must be used by the time the beneficiary turns 30, or they'll face taxes and penalties.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Custodial Accounts (UGMA/UTMA)</h4>
                <p>
                  These accounts allow you to transfer assets to a minor, with an adult serving as custodian until the child reaches the age of majority (usually 18 or 21, depending on your state). Unlike 529 plans, there are no restrictions on how the money is used once the child takes control. That flexibility cuts both ways—your kid could theoretically use it to buy a sports car instead of paying for college. There are also less favorable tax implications compared to 529 plans, and these assets are counted more heavily in financial aid calculations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Roth IRAs as a College Savings Tool</h4>
                <p>
                  While primarily designed for retirement, Roth IRAs can serve double duty for college savings. You can withdraw your contributions (not earnings) at any time without taxes or penalties. If you use the money for qualified education expenses, you can even withdraw earnings penalty-free, though you'll still owe income tax on those earnings. This approach gives you flexibility—if your child gets a full scholarship or decides not to attend college, the money stays in your retirement account where it was always meant to be.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Expected Family Contribution (EFC)</h3>
                <p>
                  When you fill out the FAFSA (Free Application for Federal Student Aid), the government uses a complex formula to calculate your Expected Family Contribution—essentially, how much they think your family can afford to pay for college each year. This number is based on your income, assets, family size, number of children in college simultaneously, and various other factors.
                </p>
                <p className="mt-3">
                  Your EFC isn't necessarily what you'll actually pay—it's more of a starting point for determining financial aid eligibility. The college's total cost of attendance minus your EFC equals your demonstrated financial need. Schools then put together financial aid packages intended to meet some or all of that need, though very few institutions actually meet 100% of demonstrated need, and many of those that do include loans as part of the package.
                </p>
                <p className="mt-3">
                  Here's something many families don't realize: how you structure your savings and assets can significantly impact your EFC. Retirement accounts like 401(k)s and IRAs aren't counted in the formula, which is one reason some financial advisors suggest maxing out retirement contributions before putting money into college savings. Money in a parent's name is assessed at a much lower rate than assets in a student's name, which is why 529 plans owned by parents are generally more favorable for financial aid purposes than custodial accounts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The True Cost of Student Loans</h3>
                <p>
                  Taking out student loans isn't inherently bad—for many families, it's a necessary tool to access higher education. The key is borrowing responsibly and understanding exactly what you're signing up for. A common rule of thumb is that your total student loan debt shouldn't exceed your expected first-year salary after graduation. So if you're planning to go into teaching with a starting salary around $40,000, think carefully before borrowing $100,000.
                </p>
                <p className="mt-3">
                  Interest rates might seem low when you're looking at them as percentages, but remember that you'll be paying them for years or even decades. A $30,000 loan at 5% interest with a standard 10-year repayment plan means you'll pay over $38,000 total—that's more than $8,000 in interest alone. Extend the repayment period to 20 years to lower your monthly payment, and you'll end up paying nearly $48,000 total. The math gets even more sobering when you're talking about larger loan amounts.
                </p>
                <p className="mt-3">
                  Federal student loans offer various repayment plans beyond the standard 10-year option. Income-driven repayment plans cap your monthly payment at a percentage of your discretionary income, which can be a lifesaver if you're not earning much after graduation. After 20 or 25 years of payments (depending on the specific plan), any remaining balance is forgiven—though you'll owe income tax on that forgiven amount. Public Service Loan Forgiveness offers an even better deal for those working in qualifying public service jobs, potentially forgiving your remaining balance after just 10 years of payments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Alternative Paths to Reduce College Costs</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Community College First</h4>
                <p>
                  Starting at a community college for your first two years can save tens of thousands of dollars. You'll take care of general education requirements at a fraction of the cost of a four-year school, then transfer to complete your bachelor's degree. Many states have articulation agreements that guarantee admission to public universities for community college students who meet certain GPA requirements. Just make sure the credits will transfer to your target school before you enroll.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Advanced Placement and Dual Enrollment</h4>
                <p>
                  High school students can earn college credit through AP exams or dual enrollment programs where they take actual college courses while still in high school. Each credit earned is one less credit you'll need to pay for in college. If you can knock out a semester or even a full year's worth of credits before you start, that's a significant cost savings—not just in tuition, but also in room and board, since you might be able to graduate early.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">In-State Public Universities</h4>
                <p>
                  The cost difference between in-state and out-of-state tuition at public universities can be staggering—sometimes $20,000 or more per year. Unless you're getting a substantial scholarship or the out-of-state school offers a program you genuinely can't get in your home state, it's worth seriously considering your in-state options. Over four years, choosing in-state could save $80,000 or more.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Living at Home</h4>
                <p>
                  If you live within commuting distance of a college, living at home instead of on campus can save $10,000-$15,000 per year in room and board costs. Yes, you'll miss out on some of the traditional college experience, but you'll also graduate with significantly less debt. For families where every dollar counts, this trade-off often makes sense.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Long View: Is College Worth It?</h3>
                <p>
                  With all this talk about costs, it's natural to question whether college is worth the investment. The data suggests that, for most people, it still is. College graduates earn substantially more over their lifetimes than those with only a high school diploma—we're talking about a difference of a million dollars or more over a career. They also face lower unemployment rates and have access to jobs with better benefits.
                </p>
                <p className="mt-3">
                  That said, the value proposition varies considerably depending on what you study and where you go to school. An engineering degree from a well-regarded university is a pretty safe bet from an earnings perspective. An art history degree from an expensive private college—while potentially enriching in other ways—might be harder to justify purely from a financial standpoint. This doesn't mean you shouldn't pursue your passion, but it does mean you should go into it with eyes wide open about the financial implications.
                </p>
                <p className="mt-3">
                  There's also increasing recognition that college isn't the only path to a successful career. Skilled trades like plumbing, electrical work, and HVAC repair offer solid middle-class incomes without the burden of student debt. Many tech jobs care more about your skills and portfolio than whether you have a degree. Apprenticeships and vocational programs can lead to well-paying careers in far less time and at far less cost than a traditional four-year degree.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Starting Your College Savings Plan Today</h3>
                <p>
                  The single most important factor in college savings is time. Thanks to compound interest, money you invest today has years or decades to grow. Even modest regular contributions can build into substantial savings if you start early enough. A family that starts putting away $200 per month when their child is born could have over $75,000 saved by the time college rolls around, assuming reasonable investment returns.
                </p>
                <p className="mt-3">
                  Don't let the perfect be the enemy of the good. You might not be able to save enough to cover 100% of college costs, and that's okay. Every dollar you save is one less dollar you'll need to borrow. If you can only afford to save $50 a month right now, start with that. As your income grows, you can increase your contributions. The key is to start somewhere and stay consistent.
                </p>
                <p className="mt-3">
                  It's also worth remembering that you shouldn't sacrifice your own financial security for your child's education. As much as you want to help them avoid student loans, you need to prioritize your retirement savings. Your kids can borrow for college if necessary, but there are no loans for retirement. Make sure you're contributing enough to your 401(k) to get any employer match—that's free money you shouldn't leave on the table. Once you've secured your own financial foundation, then you can focus more aggressively on college savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">College Cost Trends and Future Outlook</h3>
                <p>
                  Over the past 40 years, college tuition has increased at roughly twice the rate of general inflation. In 1980, the average cost of tuition, fees, room, and board at a four-year public institution was around $7,500 (adjusted for inflation to today's dollars). Now it's over $25,000—more than triple the cost. Private colleges have seen similar or even steeper increases.
                </p>
                <p className="mt-3">
                  What's driving these increases? There's no single answer, but contributing factors include reduced state funding for public universities (forcing schools to make up the difference through tuition), expanding administrative staffs, the "amenities arms race" where colleges compete by building fancier dorms and recreation centers, and the general expectation that colleges should provide more services and support than they did in previous generations.
                </p>
                <p className="mt-3">
                  There's growing pressure on colleges to control costs, and some positive signs are emerging. More schools are committing to meet full demonstrated financial need for students. Some have eliminated loans from their financial aid packages, replacing them with grants. A few colleges have frozen or even reduced tuition. Online education and competency-based programs are providing lower-cost alternatives. Whether these trends will reverse decades of escalating costs remains to be seen, but there's at least some movement in the right direction.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Final Thoughts: Planning for the Future</h3>
                <p>
                  Paying for college is one of the biggest financial challenges most families will face, but it's not insurmountable. With careful planning, smart savings strategies, and a realistic understanding of what you can afford, you can help your student get a quality education without destroying your financial future in the process.
                </p>
                <p className="mt-3">
                  Use tools like this calculator to project future costs and track whether your savings are on target. Apply for financial aid even if you think you won't qualify—many middle-income families are surprised by the aid they receive. Have honest conversations with your student about costs, expectations, and the shared responsibility of paying for college. And remember that there are many paths to success. The goal isn't necessarily to send your child to the most expensive or prestigious school possible; it's to find the right fit that provides quality education at a price your family can manage.
                </p>
                <p className="mt-3">
                  Start planning early, stay flexible, and don't be afraid to ask for help from financial aid offices, high school counselors, or fee-only financial planners who can provide personalized guidance for your situation. The investment you make in education—whether in time spent researching options or dollars saved toward tuition—will pay dividends for years to come.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/student-loan" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <GraduationCap className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Student Loan Calculator</div>
                    <div className="text-sm text-slate-600">Plan loan repayment</div>
                  </div>
                </Link>

                <Link href="/savings" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <PiggyBank className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Savings Calculator</div>
                    <div className="text-sm text-slate-600">Track savings growth</div>
                  </div>
                </Link>

                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-600">Project investment returns</div>
                  </div>
                </Link>

                <Link href="/budget" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Budget Calculator</div>
                    <div className="text-sm text-slate-600">Manage monthly finances</div>
                  </div>
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
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
              About Us
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
