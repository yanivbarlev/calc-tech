"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, PiggyBank, Calendar, Percent, Clock } from "lucide-react";

interface CompoundInterestResults {
  futureValue: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  effectiveAnnualRate: number;
  doublingTime: number;
}

interface ScheduleEntry {
  year: number;
  startingBalance: number;
  contribution: number;
  interest: number;
  endingBalance: number;
}

export default function CompoundInterestCalculator() {
  // Input states
  const [principal, setPrincipal] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("200");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [years, setYears] = useState<string>("10");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12");
  const [contributionFrequency, setContributionFrequency] = useState<string>("12");

  const [results, setResults] = useState<CompoundInterestResults | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(compoundingFrequency) || 12; // compounds per year
    const c = parseFloat(contributionFrequency) || 12; // contributions per year

    if (P < 0 || r < 0 || t <= 0) {
      return;
    }

    // For continuous compounding
    if (compoundingFrequency === "continuous") {
      const continuousValue = P * Math.exp(r * t);
      const annualContribution = PMT * c;
      const contributionValue = annualContribution * ((Math.exp(r * t) - 1) / r);
      const futureValue = continuousValue + contributionValue;

      setResults({
        futureValue,
        totalPrincipal: P,
        totalContributions: annualContribution * t,
        totalInterest: futureValue - P - (annualContribution * t),
        effectiveAnnualRate: (Math.exp(r) - 1) * 100,
        doublingTime: Math.log(2) / r,
      });

      generateSchedule(P, PMT, r, t, n, c);
      setHasCalculated(true);
      return;
    }

    // Standard compound interest calculation
    let balance = P;
    let totalInterestEarned = 0;
    const scheduleData: ScheduleEntry[] = [];

    // Calculate year by year
    for (let year = 1; year <= t; year++) {
      const startingBalance = balance;

      // Calculate contributions for the year
      const yearlyContribution = PMT * c;

      // Calculate interest with contributions throughout the year
      // We'll break it down by compounding periods
      const periodsPerYear = n;
      const ratePerPeriod = r / n;
      const contributionsPerPeriod = yearlyContribution / n;

      for (let period = 0; period < periodsPerYear; period++) {
        // Add contribution at the beginning of each period
        balance += contributionsPerPeriod;
        // Apply interest
        const periodInterest = balance * ratePerPeriod;
        balance += periodInterest;
        totalInterestEarned += periodInterest;
      }

      scheduleData.push({
        year,
        startingBalance,
        contribution: yearlyContribution,
        interest: balance - startingBalance - yearlyContribution,
        endingBalance: balance,
      });
    }

    const totalContributions = PMT * c * t;
    const futureValue = balance;

    // Calculate effective annual rate (EAR)
    const effectiveAnnualRate = (Math.pow(1 + r / n, n) - 1) * 100;

    // Rule of 72 for doubling time
    const doublingTime = 72 / (parseFloat(interestRate) || 1);

    setResults({
      futureValue,
      totalPrincipal: P,
      totalContributions,
      totalInterest: totalInterestEarned,
      effectiveAnnualRate,
      doublingTime,
    });

    setSchedule(scheduleData);
    setHasCalculated(true);
  };

  const generateSchedule = (P: number, PMT: number, r: number, t: number, n: number, c: number) => {
    const scheduleData: ScheduleEntry[] = [];
    let balance = P;

    for (let year = 1; year <= t; year++) {
      const startingBalance = balance;
      const yearlyContribution = PMT * c;

      // Simple approximation for continuous compounding
      const periodInterest = balance * (Math.exp(r) - 1);
      balance = balance * Math.exp(r) + yearlyContribution;

      scheduleData.push({
        year,
        startingBalance,
        contribution: yearlyContribution,
        interest: periodInterest,
        endingBalance: balance,
      });
    }

    setSchedule(scheduleData);
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatYears = (value: number) => {
    return `${value.toFixed(1)} years`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Financial Tools</div>
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
        {/* Page Title Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the future value of your investments with compound interest.
            See how your money grows over time with regular contributions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Principal Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Initial Investment ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="10000"
                      className="pl-7"
                    />
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Regular Contribution ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="200"
                      className="pl-7"
                    />
                  </div>
                </div>

                {/* Contribution Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contribution Frequency
                  </label>
                  <select
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="12">Monthly</option>
                    <option value="4">Quarterly</option>
                    <option value="2">Semi-Annually</option>
                    <option value="1">Annually</option>
                  </select>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="5"
                      className="pr-7"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                {/* Investment Period */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Investment Period (Years)
                  </label>
                  <Input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="10"
                  />
                </div>

                {/* Compounding Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compound Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-Annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="52">Weekly</option>
                    <option value="365">Daily</option>
                    <option value="continuous">Continuously</option>
                  </select>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Growth
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-8">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Future Value</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.futureValue)}</p>
                    <p className="text-emerald-100">
                      Total value after {years} years
                    </p>
                  </div>
                </Card>

                {/* Growth Breakdown Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Investment Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Initial Principal:</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(results.totalPrincipal)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Contributions:</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(results.totalContributions)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-slate-600">Total Invested:</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(results.totalPrincipal + results.totalContributions)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Growth Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Interest Earned:</span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(results.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Return on Investment:</span>
                        <span className="font-semibold text-emerald-600">
                          {formatPercentage(
                            (results.totalInterest / (results.totalPrincipal + results.totalContributions)) * 100
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Percent className="h-5 w-5 text-emerald-600" />
                        Effective Annual Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Nominal Rate:</span>
                        <span className="font-semibold text-slate-900">
                          {formatPercentage(parseFloat(interestRate))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Effective Rate (EAR):</span>
                        <span className="font-semibold text-emerald-600">
                          {formatPercentage(results.effectiveAnnualRate)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Clock className="h-5 w-5 text-emerald-600" />
                        Doubling Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Rule of 72:</span>
                        <span className="font-semibold text-emerald-600">
                          {formatYears(results.doublingTime)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">
                        Time for your investment to double at this rate
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Growth Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-emerald-600" />
                        Year-by-Year Growth Schedule
                      </CardTitle>
                      <Button
                        onClick={() => setShowSchedule(!showSchedule)}
                        variant="outline"
                        size="sm"
                      >
                        {showSchedule ? 'Hide' : 'Show'} Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  {showSchedule && (
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-emerald-50">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-slate-700">Year</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Starting Balance</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Contributions</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Interest Earned</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Ending Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {schedule.map((entry) => (
                              <tr key={entry.year} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium">{entry.year}</td>
                                <td className="px-4 py-3 text-right">{formatCurrency(entry.startingBalance)}</td>
                                <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(entry.contribution)}</td>
                                <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(entry.interest)}</td>
                                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(entry.endingBalance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your investment details and click Calculate to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Compound Interest</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Compound Interest?</h3>
                <p>
                  Compound interest is often called the eighth wonder of the world—and for good reason. Unlike simple interest, which only calculates returns on your initial investment, compound interest allows you to earn returns on both your principal and the interest that accumulates over time. Think of it as interest earning interest, creating a snowball effect that can dramatically increase your wealth over the long term.
                </p>

                <p className="mt-4">
                  Here's a practical example: if you invest $10,000 at 5% annual interest, simple interest would give you $500 each year. But with compound interest, that first year's $500 gets added to your principal, so in year two you're earning interest on $10,500. By year ten, you're not just earning interest on your original investment—you're earning it on all the growth that's happened along the way.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">The Power of Time</h4>
                <p>
                  What makes compound interest truly remarkable is how it accelerates over time. The difference between simple and compound interest might seem modest in the first few years, but given enough time, the gap becomes extraordinary. That's why financial advisors constantly emphasize starting early—even small amounts invested in your twenties can outgrow larger investments made later in life.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Compounding Frequency Affects Your Returns</h3>
                <p>
                  The frequency at which interest compounds plays a significant role in your overall returns. Most people understand annual compounding, but many banks and investment accounts compound more frequently—monthly, daily, or even continuously. The more frequently your interest compounds, the more you earn.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Compounding Options Explained</h4>
                <p>
                  Let's say you have $1,000 earning 12% interest per year. With annual compounding, you'd end the year with $1,120. But if that same rate compounds monthly (1% per month), you'd actually end up with $1,126.83—an extra $6.83 just from more frequent compounding. Here's what happens with different frequencies:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Annually:</strong> Interest calculated once per year, giving you $1,120.00</li>
                  <li><strong>Quarterly:</strong> Interest calculated four times yearly, resulting in $1,125.51</li>
                  <li><strong>Monthly:</strong> Calculated twelve times per year, yielding $1,126.83</li>
                  <li><strong>Daily:</strong> Calculated every single day, producing $1,127.47</li>
                  <li><strong>Continuously:</strong> Mathematical limit of infinite compounding, reaching $1,127.50</li>
                </ul>

                <p className="mt-4">
                  Notice how the gains from more frequent compounding start to diminish as you approach continuous compounding. The jump from annual to monthly is substantial, but daily versus continuous barely makes a difference. That's why most financial institutions stick with daily or monthly compounding—it captures most of the benefit without the computational complexity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Mathematics Behind Compound Interest</h3>
                <p>
                  While you don't need to be a mathematician to benefit from compound interest, understanding the basic formula can help you make better financial decisions. The standard compound interest formula looks like this:
                </p>

                <div className="bg-slate-50 p-4 rounded-lg my-4 font-mono text-center">
                  A = P(1 + r/n)<sup>nt</sup>
                </div>

                <p>
                  Let me break down what each variable represents:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>A:</strong> The future value of your investment (what you're solving for)</li>
                  <li><strong>P:</strong> Your principal amount (initial investment)</li>
                  <li><strong>r:</strong> Annual interest rate (as a decimal, so 5% becomes 0.05)</li>
                  <li><strong>n:</strong> Number of times interest compounds per year</li>
                  <li><strong>t:</strong> Number of years the money is invested</li>
                </ul>

                <p className="mt-4">
                  For continuous compounding, the formula changes slightly to A = Pe<sup>rt</sup>, where e is Euler's number (approximately 2.71828). This represents the mathematical limit of compounding infinitely often—though in practice, the difference between daily and continuous compounding is minimal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Adding Regular Contributions</h4>
                <p>
                  Most people don't just make a single investment and walk away—they contribute regularly. This makes the math more complex but the results even more powerful. When you add periodic contributions, each deposit starts its own compounding journey. Your latest contribution has less time to grow than your first, but together they create a substantial portfolio.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Rule of 72: A Quick Mental Shortcut</h3>
                <p>
                  Want to quickly estimate how long it'll take your money to double? The Rule of 72 provides a remarkably accurate shortcut. Simply divide 72 by your annual interest rate, and you'll get the approximate number of years needed to double your investment.
                </p>

                <p className="mt-4">
                  For example, at 6% annual interest, your money doubles in approximately 72 ÷ 6 = 12 years. At 8%, it takes about 9 years. At 10%, roughly 7.2 years. This mental math trick works because 72 has many divisors, making the calculation easy even without a calculator.
                </p>

                <p className="mt-4">
                  The Rule of 72 isn't perfect—it's slightly less accurate at very high or very low interest rates—but for typical investment returns between 4% and 12%, it's remarkably precise. It's become a favorite tool among financial advisors for explaining the power of compound growth to clients.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Historical Context and Origins</h3>
                <p>
                  Compound interest has been understood for millennia. Ancient Babylonian clay tablets from around 2000 BC show calculations for compound interest on loans. However, it wasn't until the Italian mathematician Leonardo Fibonacci popularized Hindu-Arabic numerals in Europe during the 13th century that compound interest calculations became more accessible.
                </p>

                <p className="mt-4">
                  The mathematical constant e, essential for continuous compounding, was discovered by Swiss mathematician Jacob Bernoulli in the 1680s while studying compound interest. He was trying to calculate what happens as you compound more and more frequently, eventually discovering this fundamental constant that appears throughout mathematics and nature.
                </p>

                <p className="mt-4">
                  In the modern era, compound interest has become the foundation of retirement planning, mortgage calculations, and investment strategy. Benjamin Franklin famously demonstrated its power by leaving small bequests to Boston and Philadelphia that, through compound growth over 200 years, grew to millions of dollars.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Practical Applications and Strategies</h3>
                <p>
                  Understanding compound interest helps you make smarter financial decisions across multiple areas. In investing, it explains why starting early matters so much—a 25-year-old investing $200 monthly will likely accumulate more by retirement than a 35-year-old investing $400 monthly, even though the older investor contributes more total dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Debt vs. Investment</h4>
                <p>
                  Compound interest works both ways. While it builds wealth in your investment accounts, it also works against you with debt. Credit card balances compound daily at rates often exceeding 20% annually. A $5,000 balance at 20% APR, making only minimum payments, could take decades to pay off and cost thousands in interest. This is why financial advisors universally recommend paying off high-interest debt before focusing on investments.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Maximizing Your Returns</h4>
                <p>
                  To get the most from compound interest, consider these strategies:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Start investing as early as possible—time is your greatest asset</li>
                  <li>Make regular contributions, even small ones—consistency beats timing</li>
                  <li>Reinvest dividends and interest rather than taking them as cash</li>
                  <li>Choose accounts with more frequent compounding when rates are equal</li>
                  <li>Avoid withdrawing funds early, which interrupts the compounding cycle</li>
                  <li>Consider tax-advantaged accounts like 401(k)s and IRAs to maximize growth</li>
                </ul>

                <p className="mt-4">
                  Remember, compound interest requires patience. The first few years might feel slow—you're watching numbers creep up gradually. But once you hit that inflection point, usually after 7-10 years, the growth becomes noticeably faster. Your interest starts earning almost as much as your contributions, and eventually surpasses them entirely.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World Examples</h3>
                <p>
                  Let's look at some concrete scenarios that demonstrate compound interest's power. Consider two friends who start saving for retirement:
                </p>

                <p className="mt-4">
                  <strong>Early Emma</strong> starts investing $200 per month at age 25, continues for 10 years, then stops contributing but leaves the money invested. By age 65, assuming a 7% annual return compounded monthly, her account would grow to approximately $528,000—despite only contributing $24,000 of her own money.
                </p>

                <p className="mt-4">
                  <strong>Late Larry</strong> waits until age 35 to start saving, but then contributes $200 monthly for 30 years straight until retirement. Even though Larry contributed $72,000 (three times Emma's total), his account only reaches about $244,000 by age 65.
                </p>

                <p className="mt-4">
                  Emma ends up with more than double Larry's amount, despite contributing one-third as much money. That's the power of time in compound interest—her earlier start gave those initial contributions decades to grow and multiply.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">The Coffee Shop Example</h4>
                <p>
                  Here's a popular illustration: suppose you spend $5 on coffee each workday. That's about $100 per month, or $1,200 annually. If you invested that money instead at 7% annual return, here's what would happen:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>After 10 years: $17,308</li>
                  <li>After 20 years: $52,397</li>
                  <li>After 30 years: $121,997</li>
                  <li>After 40 years: $262,481</li>
                </ul>

                <p className="mt-4">
                  That morning coffee habit, redirected to investments, could be worth over a quarter million dollars by retirement. Now, I'm not saying you should never enjoy coffee—quality of life matters too. But this illustrates how small, consistent investments can grow into substantial wealth through the magic of compounding.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Misconceptions and Mistakes</h3>
                <p>
                  Many people misunderstand compound interest, leading to poor financial decisions. One common mistake is confusing the stated interest rate with the effective annual rate (EAR). A 6% rate compounded monthly actually yields 6.17% annually—that extra 0.17% comes from the compounding effect.
                </p>

                <p className="mt-4">
                  Another misconception is thinking you need large amounts to invest. While bigger investments certainly grow faster, the compounding principle works regardless of the amount. Starting with $50 monthly is far better than waiting until you can afford $500, because you're giving that money more time to compound.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Inflation Factor</h4>
                <p>
                  People sometimes forget to account for inflation when celebrating their compound interest gains. If your investment grows 7% annually but inflation runs at 3%, your real return is closer to 4%. This doesn't mean compound interest isn't worthwhile—it absolutely is. But for long-term planning, you should consider inflation-adjusted returns to understand your true purchasing power growth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Comparing Compound vs. Simple Interest</h3>
                <p>
                  The difference between simple and compound interest might seem academic, but it has profound real-world implications. Simple interest calculates returns only on your original principal, never on accumulated interest. It's like getting paid the same bonus every year, regardless of your tenure or performance.
                </p>

                <p className="mt-4">
                  Compound interest, by contrast, rewards patience and long-term thinking. Using our earlier example of $10,000 at 5% annual interest:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Simple interest after 20 years: $20,000 ($10,000 principal + $10,000 interest)</li>
                  <li>Compound interest after 20 years: $26,533</li>
                  <li>Difference: $6,533, or 33% more wealth</li>
                </ul>

                <p className="mt-4">
                  Extend that to 30 years, and compound interest gives you $43,219 versus simple interest's $25,000—a difference of over $18,000, or 73% more wealth. The gap keeps widening exponentially the longer you invest.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  Our compound interest calculator helps you visualize how your investments might grow over time. Enter your initial investment, regular contribution amount and frequency, expected interest rate, and investment period. The calculator shows not just your final balance, but also breaks down exactly how much came from your contributions versus interest earned.
                </p>

                <p className="mt-4">
                  Try experimenting with different scenarios. What happens if you increase your monthly contribution by $50? What if you extend your investment period by 5 years? How much difference does the compounding frequency make? These explorations help you understand which variables have the biggest impact on your wealth-building strategy.
                </p>

                <p className="mt-4">
                  The year-by-year schedule feature is particularly valuable—it shows you exactly when your interest earnings start exceeding your contributions, that magical tipping point where compound interest takes over as the primary driver of growth. For most people with consistent contributions, this happens somewhere between years 10 and 20.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-lg mb-2 text-emerald-900">Key Takeaway</h4>
                <p className="text-emerald-800">
                  Compound interest rewards patience, consistency, and time. Start early, contribute regularly, and let the mathematics of exponential growth work in your favor. Whether you're saving for retirement, building an emergency fund, or working toward any financial goal, understanding and harnessing compound interest is one of the most powerful tools at your disposal.
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
                <Link href="/interest" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Interest Calculator</div>
                    <div className="text-sm text-slate-600">Calculate various interest scenarios</div>
                  </div>
                </Link>
                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Investment Calculator</div>
                    <div className="text-sm text-slate-600">Plan your investment strategy</div>
                  </div>
                </Link>
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <PiggyBank className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Retirement Calculator</div>
                    <div className="text-sm text-slate-600">Plan for your retirement savings</div>
                  </div>
                </Link>
                <Link href="/inflation" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Inflation Calculator</div>
                    <div className="text-sm text-slate-600">Account for inflation in planning</div>
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
            <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy and simplicity.
          </p>
        </div>
      </footer>
    </div>
  );
}
