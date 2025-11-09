"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, PiggyBank, Target, BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvestmentResults {
  endBalance: number;
  startingAmount: number;
  totalContributions: number;
  totalInterest: number;
}

interface ScheduleEntry {
  year: number;
  startBalance: number;
  contributions: number;
  interest: number;
  endBalance: number;
}

export default function InvestmentCalculator() {
  // Input states
  const [startingAmount, setStartingAmount] = useState<string>("20000");
  const [contribution, setContribution] = useState<string>("1000");
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [investmentLength, setInvestmentLength] = useState<string>("10");
  const [returnRate, setReturnRate] = useState<string>("6");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("annually");
  const [contributionTiming, setContributionTiming] = useState<string>("end");

  const [results, setResults] = useState<InvestmentResults | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const principal = parseFloat(startingAmount) || 0;
    const monthlyContribution = contributionFrequency === "monthly"
      ? (parseFloat(contribution) || 0)
      : (parseFloat(contribution) || 0) / 12;
    const years = parseFloat(investmentLength) || 0;
    const annualRate = (parseFloat(returnRate) || 0) / 100;

    // Determine compounding periods per year
    const compoundPeriods: { [key: string]: number } = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      semimonthly: 24,
      biweekly: 26,
      weekly: 52,
      daily: 365,
      continuously: Infinity
    };

    const n = compoundPeriods[compoundFrequency] || 12;
    const periodicRate = annualRate / n;
    const totalPeriods = years * n;
    const contributionsPerYear = contributionFrequency === "monthly" ? 12 : 1;
    const contributionPerPeriod = monthlyContribution / (n / 12);

    let balance = principal;
    let totalContributed = principal;
    const yearlySchedule: ScheduleEntry[] = [];

    // Calculate year by year for schedule
    for (let year = 1; year <= years; year++) {
      const startBalance = balance;
      let yearContributions = 0;
      let yearInterest = 0;

      // Calculate for each period in the year
      const periodsInYear = n;
      for (let period = 0; period < periodsInYear; period++) {
        // Add contribution at beginning or end of period
        if (contributionTiming === "beginning") {
          balance += contributionPerPeriod;
          yearContributions += contributionPerPeriod;
          totalContributed += contributionPerPeriod;
        }

        // Calculate interest for this period
        if (compoundFrequency === "continuously") {
          const periodInterest = balance * (Math.exp(annualRate / n) - 1);
          balance += periodInterest;
          yearInterest += periodInterest;
        } else {
          const periodInterest = balance * periodicRate;
          balance += periodInterest;
          yearInterest += periodInterest;
        }

        // Add contribution at end of period
        if (contributionTiming === "end") {
          balance += contributionPerPeriod;
          yearContributions += contributionPerPeriod;
          totalContributed += contributionPerPeriod;
        }
      }

      yearlySchedule.push({
        year,
        startBalance,
        contributions: yearContributions,
        interest: yearInterest,
        endBalance: balance
      });
    }

    const totalInterest = balance - totalContributed;

    setResults({
      endBalance: balance,
      startingAmount: principal,
      totalContributions: totalContributed - principal,
      totalInterest: totalInterest
    });

    setSchedule(yearlySchedule);
    setHasCalculated(true);
  };

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
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Investment Calculator</div>
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Investment Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your investment growth over time with compound interest and regular contributions
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-6 w-6" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Starting Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Starting Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={startingAmount}
                    onChange={(e) => setStartingAmount(e.target.value)}
                    placeholder="20000"
                    min="0"
                    step="1000"
                  />
                </div>

                {/* Additional Contribution */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Contribution ($)
                  </label>
                  <Input
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    placeholder="1000"
                    min="0"
                    step="100"
                  />
                </div>

                {/* Contribution Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contribution Frequency
                  </label>
                  <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Investment Length */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Investment Length (years)
                  </label>
                  <Input
                    type="number"
                    value={investmentLength}
                    onChange={(e) => setInvestmentLength(e.target.value)}
                    placeholder="10"
                    min="1"
                    max="50"
                  />
                </div>

                {/* Return Rate */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Return Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    placeholder="6"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                {/* Compound Frequency */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compound Frequency
                  </label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semiannually">Semiannually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="semimonthly">Semimonthly</SelectItem>
                      <SelectItem value="biweekly">Biweekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="continuously">Continuously</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contribution Timing */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contribution Timing
                  </label>
                  <Select value={contributionTiming} onValueChange={setContributionTiming}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="end">End of Period</SelectItem>
                      <SelectItem value="beginning">Beginning of Period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Investment
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
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Final Balance</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.endBalance)}</p>
                    <p className="text-emerald-100">Total value after {investmentLength} years</p>
                  </div>
                </Card>

                {/* Breakdown Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Starting Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-emerald-600">
                        {formatCurrency(results.startingAmount)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">Initial investment</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        Total Contributions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-600">
                        {formatCurrency(results.totalContributions)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">Additional deposits</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-purple-600">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">Investment earnings</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Investment Breakdown */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-emerald-600" />
                      Investment Composition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Visual bar */}
                      <div className="h-12 flex rounded-lg overflow-hidden">
                        <div
                          className="bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold"
                          style={{ width: `${(results.startingAmount / results.endBalance) * 100}%` }}
                        >
                          {((results.startingAmount / results.endBalance) * 100).toFixed(1)}%
                        </div>
                        <div
                          className="bg-blue-500 flex items-center justify-center text-white text-sm font-semibold"
                          style={{ width: `${(results.totalContributions / results.endBalance) * 100}%` }}
                        >
                          {((results.totalContributions / results.endBalance) * 100).toFixed(1)}%
                        </div>
                        <div
                          className="bg-purple-500 flex items-center justify-center text-white text-sm font-semibold"
                          style={{ width: `${(results.totalInterest / results.endBalance) * 100}%` }}
                        >
                          {((results.totalInterest / results.endBalance) * 100).toFixed(1)}%
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                          <span className="text-slate-600">Starting: {formatCurrency(results.startingAmount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-slate-600">Contributions: {formatCurrency(results.totalContributions)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span className="text-slate-600">Interest: {formatCurrency(results.totalInterest)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-emerald-600" />
                      Investment Growth Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-slate-200">
                            <th className="text-left py-3 px-2 font-semibold text-slate-700">Year</th>
                            <th className="text-right py-3 px-2 font-semibold text-slate-700">Start Balance</th>
                            <th className="text-right py-3 px-2 font-semibold text-slate-700">Contributions</th>
                            <th className="text-right py-3 px-2 font-semibold text-slate-700">Interest</th>
                            <th className="text-right py-3 px-2 font-semibold text-slate-700">End Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((entry) => (
                            <tr key={entry.year} className="border-b border-slate-100 hover:bg-emerald-50">
                              <td className="py-3 px-2 font-medium text-slate-700">{entry.year}</td>
                              <td className="py-3 px-2 text-right text-slate-600">{formatCurrency(entry.startBalance)}</td>
                              <td className="py-3 px-2 text-right text-blue-600">{formatCurrency(entry.contributions)}</td>
                              <td className="py-3 px-2 text-right text-purple-600">{formatCurrency(entry.interest)}</td>
                              <td className="py-3 px-2 text-right font-semibold text-emerald-600">{formatCurrency(entry.endBalance)}</td>
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
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your investment details and click calculate to see your projected growth
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Investment Growth</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Investment Calculators Work</h3>
                <p>
                  An investment calculator helps you project the future value of your investments based on a few critical factors: your initial investment amount, regular contributions, expected rate of return, and the time horizon you're working with. Think of it as a financial crystal ball—though instead of magic, it relies on mathematical formulas that have guided investors for generations.
                </p>
                <p className="mt-4">
                  The real power behind investment growth isn't just about picking the right stocks or timing the market perfectly. It's compound interest doing the heavy lifting. When your investments earn returns, those returns get reinvested and start generating their own returns. Over time, this snowball effect can turn modest savings into substantial wealth. That's why Einstein supposedly called compound interest the eighth wonder of the world.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">The Magic of Compounding</h4>
                <p>
                  Here's where things get interesting. Let's say you invest $20,000 and add $1,000 monthly for ten years at a 6% annual return. You might think the math is straightforward—just multiply your contributions by the interest rate. But compound interest works differently. Each month, you earn returns not just on your original investment, but on all the growth that's accumulated up to that point.
                </p>
                <p className="mt-4">
                  In our example, you'd contribute $140,000 total over those ten years ($20,000 initially plus $120,000 in monthly contributions). Without any returns, that's what you'd have. But with 6% annual returns compounding monthly, you'd end up with roughly $198,290. That extra $58,290 is pure growth—money your money made while you slept, went to work, or enjoyed your weekends.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Return Rates: The Cold, Hard Number</h4>
                <p>
                  The return rate is arguably the most critical variable in the entire equation. It's the percentage your investment grows each year, and even small differences can lead to dramatically different outcomes over time. A difference of just 2% might not sound like much, but over decades, it can mean hundreds of thousands of dollars.
                </p>
                <p className="mt-4">
                  Most investors use historical market returns as a guide. The stock market has historically returned around 10% annually before inflation, though that's just an average—some years deliver spectacular gains, while others bring losses. Conservative investors might project 5-6% for a balanced portfolio, while more aggressive strategies targeting growth stocks might assume 8-10% or higher. Remember, though, higher potential returns usually come with increased risk and volatility.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Contribution Frequency Matters</h4>
                <p>
                  Whether you contribute monthly or annually makes a bigger difference than you might expect. Monthly contributions mean your money starts working for you sooner. Instead of waiting until the end of the year to invest $12,000, you're putting $1,000 to work each month. Those earlier contributions have more time to compound, which can add up to significant additional growth over long periods.
                </p>
                <p className="mt-4">
                  There's also a psychological benefit to monthly contributions—they align with how most people receive income through paychecks. Automating monthly investments makes saving feel effortless, and you're less likely to spend money that automatically moves into your investment account before you even see it in your checking account.
                </p>

                <h3 className="text-xl font-bold mb-3 text-slate-800 mt-8">Investment Types and Expected Returns</h3>
                <p>
                  Different investment vehicles come with different risk-return profiles. Understanding these can help you choose realistic return rate assumptions for your calculations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Stocks and Stock Funds</h4>
                <p>
                  Historically, stocks have delivered the highest long-term returns of any major asset class. Over the past century, the U.S. stock market has averaged around 10% annual returns before inflation. That said, this average includes periods of euphoric growth and devastating crashes. If you're investing in broad index funds tracking the market, projecting 7-10% for long-term calculations is reasonable—but know that any given year could be far from that average.
                </p>
                <p className="mt-4">
                  Individual stocks can be much more volatile. Some deliver life-changing returns, while others go to zero. Unless you're an experienced investor who thoroughly researches companies, most financial advisors recommend sticking with diversified funds rather than trying to pick winning stocks yourself.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Bonds and Fixed Income</h4>
                <p>
                  Bonds represent loans you make to governments or corporations. In exchange, they pay you interest—typically less than stocks, but with more stability. Government bonds are generally considered very safe but offer modest returns, often 2-4% annually. Corporate bonds pay more, sometimes 4-6%, but carry higher risk since companies can default.
                </p>
                <p className="mt-4">
                  Many investors use bonds to balance their portfolios, accepting lower returns in exchange for reduced volatility. As you approach retirement or other financial goals, shifting more assets into bonds can help preserve your wealth even if the stock market takes a tumble.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Real Estate Investments</h4>
                <p>
                  Real estate offers another avenue for building wealth, whether through rental properties, REITs (Real Estate Investment Trusts), or property appreciation. Returns vary wildly based on location, property type, and management quality. Some investors have built fortunes through real estate, while others have faced foreclosures and financial ruin.
                </p>
                <p className="mt-4">
                  Direct property ownership involves ongoing expenses—maintenance, property taxes, insurance, and potential vacancy periods—which eat into returns. REITs offer real estate exposure without the headaches of being a landlord, typically yielding 4-8% annually between dividends and appreciation.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Certificates of Deposit and Savings Accounts</h4>
                <p>
                  On the safer end of the spectrum, CDs and high-yield savings accounts offer guaranteed returns with virtually no risk of loss (at least up to FDIC limits). Returns are modest, though—often just 1-5% annually depending on interest rate environments and account terms. These vehicles work well for emergency funds or short-term savings goals, but they typically can't keep pace with inflation over long periods.
                </p>

                <h3 className="text-xl font-bold mb-3 text-slate-800 mt-8">Factors That Impact Your Investment Results</h3>
                <p>
                  While calculators provide helpful projections, real-world investing involves variables that are difficult to model with precision.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Time Horizon: Your Greatest Advantage</h4>
                <p>
                  Time is the single most powerful factor in wealth accumulation. Someone who starts investing at 25 will likely end up with far more wealth than someone who starts at 35, even if they invest the same amounts. Those extra ten years give compound interest more time to work its magic.
                </p>
                <p className="mt-4">
                  Consider two investors: Sarah starts investing $500 monthly at age 25 and stops at 35, contributing $60,000 total. Mike starts at 35 and continues until 65, contributing $180,000—three times more. Assuming 7% annual returns, Sarah's early start means she ends up with nearly as much money as Mike, despite contributing far less. Starting early beats contributing more, though doing both is ideal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Inflation: The Silent Wealth Eroder</h4>
                <p>
                  Your calculator might show impressive future balances, but inflation gradually reduces purchasing power over time. If your investments grow 6% annually but inflation runs at 3%, your real return is only 3%. That $200,000 you accumulate over ten years won't buy as much in the future as it does today.
                </p>
                <p className="mt-4">
                  This is why letting money sit in checking accounts is actually a losing strategy—even though the dollar amount stays the same, its value shrinks year after year. Investing helps your wealth grow faster than inflation erodes it, preserving and increasing your purchasing power over time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Taxes: Don't Forget Uncle Sam</h4>
                <p>
                  Investment returns shown in calculators are typically pre-tax figures. Depending on your account type and tax situation, you might owe federal and state taxes on investment gains, dividends, and interest. Traditional retirement accounts like 401(k)s and IRAs defer taxes until withdrawal, while Roth accounts let you withdraw tax-free in retirement after paying taxes upfront.
                </p>
                <p className="mt-4">
                  Taxable investment accounts face capital gains taxes when you sell appreciated assets. Long-term gains (assets held over a year) are taxed at preferential rates, currently 0%, 15%, or 20% depending on income level. Short-term gains are taxed as ordinary income at your marginal rate, which could be as high as 37% for high earners. This tax treatment encourages long-term investing over frequent trading.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Fees and Expenses</h4>
                <p>
                  Many investors overlook the impact of fees, but they can significantly reduce long-term returns. If you're paying a financial advisor 1% of assets annually, plus another 0.5% in fund expense ratios, that 1.5% comes right off the top of your returns year after year.
                </p>
                <p className="mt-4">
                  Over decades, high fees can cost you hundreds of thousands of dollars. That's why low-cost index funds have become so popular—they deliver market returns while charging as little as 0.03% annually. A seemingly small difference in fees has an enormous impact when compound interest is involved.
                </p>

                <h3 className="text-xl font-bold mb-3 text-slate-800 mt-8">Making Investment Calculations Work for You</h3>
                <p>
                  Now that you understand how the numbers work, here's how to apply this knowledge practically.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Setting Realistic Expectations</h4>
                <p>
                  One common mistake is assuming investment returns will be smooth and consistent. Markets don't work that way. You'll experience years when your portfolio surges 20% or more, and others when it drops by double digits. The historical averages only appear over long periods—short-term results will vary dramatically.
                </p>
                <p className="mt-4">
                  When using an investment calculator, consider running multiple scenarios with different return assumptions. What happens if you average 4% instead of 7%? What if you can only contribute half as much as planned? Building a range of outcomes helps you make more resilient financial plans that can withstand various economic environments.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Starting Small is Better Than Not Starting</h4>
                <p>
                  Many people delay investing because they think they need substantial amounts to begin. That's a costly mistake. Even $50 monthly contributions grow significantly over time thanks to compound interest. Most brokerages now offer commission-free trading and no account minimums, removing traditional barriers to entry.
                </p>
                <p className="mt-4">
                  The important thing is developing the habit of regular investing. You can always increase contributions as your income grows. Someone who starts with $100 monthly and gradually increases to $500 will likely end up wealthier than someone who waits until they can "afford" $500 and starts years later.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Automating Your Success</h4>
                <p>
                  The investors who accumulate the most wealth typically aren't the ones constantly monitoring markets and timing trades. They're the ones who set up automatic contributions and stick with their plan through market ups and downs. Automation removes emotion from investing, which is crucial because emotional decisions often lead to buying high and selling low—the opposite of what builds wealth.
                </p>
                <p className="mt-4">
                  Set up automatic transfers from your checking account to your investment account on the same day you get paid. Treat investing like a required expense, not an optional activity you do with whatever's left at the end of the month. This approach ensures you consistently invest regardless of market conditions or how you're feeling about the economy.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Reviewing and Adjusting Your Plan</h4>
                <p>
                  While automation is powerful, you shouldn't set it and completely forget it. Review your investments at least annually to ensure your asset allocation still matches your goals and risk tolerance. As you age or your financial situation changes, you might need to adjust your strategy.
                </p>
                <p className="mt-4">
                  Life events like marriage, children, home purchases, or career changes often warrant revisiting your investment plan. Major market moves might also call for rebalancing—selling some assets that have grown disproportionately and buying others to maintain your target allocation. Just resist the temptation to make dramatic changes based on short-term market movements or financial media hysteria.
                </p>

                <h3 className="text-xl font-bold mb-3 text-slate-800 mt-8">Common Investment Mistakes to Avoid</h3>
                <p>
                  Understanding what not to do can be just as valuable as knowing what to do.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Chasing Past Performance</h4>
                <p>
                  Just because an investment or fund delivered exceptional returns last year doesn't mean it will repeat that performance. In fact, funds that top the charts one year often underperform in subsequent years. Focus on fundamentals—low fees, diversification, and alignment with your goals—rather than chasing whatever's hot right now.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Trying to Time the Market</h4>
                <p>
                  Professional investors with teams of analysts and sophisticated algorithms struggle to consistently time market highs and lows. Individual investors attempting this strategy usually end up buying too late (after markets have already risen) and selling too late (after they've already fallen). Time in the market beats timing the market almost every time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Ignoring Diversification</h4>
                <p>
                  Putting all your investment dollars into a single stock or sector is incredibly risky, even if you're convinced it's a sure thing. History is littered with "sure things" that went bankrupt. Spreading investments across different asset classes, sectors, and geographic regions reduces risk without necessarily sacrificing returns.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-6">Letting Emotions Drive Decisions</h4>
                <p>
                  When markets crash, it's terrifying to watch your portfolio value plummet. The instinct is to sell everything and hide in cash until things "calm down." But this locks in losses and misses the recovery. Similarly, when markets soar, people pile in at peak prices. Successful investing requires maintaining discipline through both euphoria and panic.
                </p>

                <h3 className="text-xl font-bold mb-3 text-slate-800 mt-8">Taking Action on Your Investment Journey</h3>
                <p>
                  Calculators and knowledge are useful, but they mean nothing without action. If you haven't started investing yet, open an account today—even if you can only contribute a small amount. If you're already investing, review whether you're contributing enough to meet your long-term goals.
                </p>
                <p className="mt-4">
                  The investment calculator above gives you a roadmap for what's possible. The specific numbers you input—starting amount, monthly contributions, expected returns, time horizon—are all variables you can influence to some degree. You might not control market returns, but you absolutely control how much you save and how long you let compound interest work for you.
                </p>
                <p className="mt-4">
                  Remember that investing is a marathon, not a sprint. Small, consistent actions repeated over many years lead to substantial wealth accumulation. The person who invests modestly but consistently for 30 years will likely end up far wealthier than someone who makes sporadic large contributions or constantly chases get-rich-quick schemes.
                </p>
                <p className="mt-4">
                  Your future financial security depends on decisions you make today. Take advantage of the power of compound interest, start as early as possible, contribute regularly, diversify your investments, keep fees low, and maintain discipline through market volatility. Follow these principles, and you'll be well on your way to achieving your financial goals—whether that's a comfortable retirement, funding your children's education, or achieving financial independence.
                </p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy and reliability.
          </p>
        </div>
      </footer>
    </div>
  );
}
