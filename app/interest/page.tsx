"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, PiggyBank, Calendar } from "lucide-react";

interface InterestResults {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjusted: number;
  afterTax: number;
}

interface ScheduleEntry {
  period: number;
  deposit: number;
  interest: number;
  balance: number;
}

export default function InterestCalculator() {
  // Input states
  const [principal, setPrincipal] = useState<string>("25000");
  const [annualContribution, setAnnualContribution] = useState<string>("5000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [years, setYears] = useState<string>("5");
  const [months, setMonths] = useState<string>("0");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12");
  const [contributionTiming, setContributionTiming] = useState<string>("end");
  const [taxRate, setTaxRate] = useState<string>("0");
  const [inflationRate, setInflationRate] = useState<string>("0");

  const [results, setResults] = useState<InterestResults | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleView, setScheduleView] = useState<'monthly' | 'annual'>('annual');

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const annualAdd = parseFloat(annualContribution) || 0;
    const monthlyAdd = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const totalYears = (parseFloat(years) || 0) + (parseFloat(months) || 0) / 12;
    const n = parseFloat(compoundingFrequency) || 12;
    const taxRateVal = (parseFloat(taxRate) || 0) / 100;
    const inflationRateVal = (parseFloat(inflationRate) || 0) / 100;
    const isBeginning = contributionTiming === "beginning";

    if (P < 0 || r < 0 || totalYears <= 0) {
      return;
    }

    // Calculate total periods
    const totalPeriods = Math.ceil(totalYears * n);
    const periodsPerYear = n;

    // Annual contribution converted to per-period
    const annualPerPeriod = annualAdd / periodsPerYear;
    const monthlyPerPeriod = monthlyAdd * (12 / periodsPerYear);
    const contributionPerPeriod = annualPerPeriod + monthlyPerPeriod;

    // Interest rate per period
    const ratePerPeriod = r / n;

    let balance = P;
    let totalInterestEarned = 0;
    let totalContributionsValue = annualAdd * totalYears + monthlyAdd * 12 * totalYears;

    const scheduleData: ScheduleEntry[] = [];

    // Calculate period by period
    for (let period = 1; period <= totalPeriods; period++) {
      let periodStart = balance;

      // Add contribution at beginning if selected
      if (isBeginning && contributionPerPeriod > 0) {
        balance += contributionPerPeriod;
      }

      // Calculate interest for this period
      const periodInterest = balance * ratePerPeriod;
      balance += periodInterest;
      totalInterestEarned += periodInterest;

      // Add contribution at end if selected
      if (!isBeginning && contributionPerPeriod > 0) {
        balance += contributionPerPeriod;
      }

      // Add to schedule
      scheduleData.push({
        period,
        deposit: contributionPerPeriod,
        interest: periodInterest,
        balance: balance
      });
    }

    const endingBalance = balance;
    const totalPrincipalValue = P;

    // Calculate tax on interest
    const taxAmount = totalInterestEarned * taxRateVal;
    const afterTaxBalance = endingBalance - taxAmount;

    // Calculate inflation-adjusted value
    const inflationAdjusted = afterTaxBalance / Math.pow(1 + inflationRateVal, totalYears);

    setResults({
      endingBalance,
      totalPrincipal: totalPrincipalValue,
      totalContributions: totalContributionsValue,
      totalInterest: totalInterestEarned,
      inflationAdjusted,
      afterTax: afterTaxBalance
    });

    setSchedule(scheduleData);
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getPercentage = (part: number, total: number) => {
    return total > 0 ? ((part / total) * 100).toFixed(1) : "0.0";
  };

  // Group schedule by year for annual view
  const getAnnualSchedule = () => {
    const annual: ScheduleEntry[] = [];
    const periodsPerYear = parseFloat(compoundingFrequency) || 12;

    for (let i = 0; i < schedule.length; i += periodsPerYear) {
      const yearEnd = Math.min(i + periodsPerYear - 1, schedule.length - 1);
      const yearData = schedule[yearEnd];

      // Sum deposits and interest for the year
      let yearDeposits = 0;
      let yearInterest = 0;

      for (let j = i; j <= yearEnd; j++) {
        yearDeposits += schedule[j].deposit;
        yearInterest += schedule[j].interest;
      }

      annual.push({
        period: Math.floor(i / periodsPerYear) + 1,
        deposit: yearDeposits,
        interest: yearInterest,
        balance: yearData.balance
      });
    }

    return annual;
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Free Online Calculators</div>
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
            Interest Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate compound interest growth with flexible contributions and compounding frequencies
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-6 w-6" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Initial Investment ($)
                  </label>
                  <Input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="25000"
                    min="0"
                    step="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Contribution ($)
                  </label>
                  <Input
                    type="number"
                    value={annualContribution}
                    onChange={(e) => setAnnualContribution(e.target.value)}
                    placeholder="5000"
                    min="0"
                    step="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Contribution ($)
                  </label>
                  <Input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Years
                    </label>
                    <Input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="5"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Months
                    </label>
                    <Input
                      type="number"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                      placeholder="0"
                      min="0"
                      max="11"
                      step="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semiannually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="24">Semimonthly</option>
                    <option value="26">Biweekly</option>
                    <option value="52">Weekly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contribution Timing
                  </label>
                  <select
                    value={contributionTiming}
                    onChange={(e) => setContributionTiming(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="end">End of Period</option>
                    <option value="beginning">Beginning of Period</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tax Rate on Interest (%)
                  </label>
                  <Input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Inflation Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Interest
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Final Balance</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.endingBalance)}</p>
                    <p className="text-emerald-100">After {years} years and {months} months</p>
                  </div>
                </Card>

                {/* Breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Balance Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Initial Investment</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.totalPrincipal)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Total Contributions</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.totalContributions)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Interest Earned</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-700 font-semibold">Total</span>
                        <span className="font-bold text-emerald-600 text-lg">{formatCurrency(results.endingBalance)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Composition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Initial Investment</span>
                          <span className="text-sm font-semibold">{getPercentage(results.totalPrincipal, results.endingBalance)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(results.totalPrincipal, results.endingBalance)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Contributions</span>
                          <span className="text-sm font-semibold">{getPercentage(results.totalContributions, results.endingBalance)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(results.totalContributions, results.endingBalance)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Interest</span>
                          <span className="text-sm font-semibold">{getPercentage(results.totalInterest, results.endingBalance)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(results.totalInterest, results.endingBalance)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Adjusted Values */}
                {(parseFloat(taxRate) > 0 || parseFloat(inflationRate) > 0) && (
                  <Card className="border-2 rounded-2xl shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Adjusted Values
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {parseFloat(taxRate) > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b">
                          <span className="text-slate-600">After-Tax Balance</span>
                          <span className="font-semibold text-slate-800">{formatCurrency(results.afterTax)}</span>
                        </div>
                      )}
                      {parseFloat(inflationRate) > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Inflation-Adjusted Value</span>
                          <span className="font-semibold text-slate-800">{formatCurrency(results.inflationAdjusted)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Schedule Toggle */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <Button
                      onClick={() => setShowSchedule(!showSchedule)}
                      variant="outline"
                      className="w-full"
                    >
                      {showSchedule ? 'Hide' : 'Show'} Accumulation Schedule
                    </Button>

                    {showSchedule && (
                      <div className="mt-6">
                        {/* View Toggle */}
                        <div className="flex gap-2 mb-4">
                          <Button
                            variant={scheduleView === 'annual' ? 'default' : 'outline'}
                            onClick={() => setScheduleView('annual')}
                            className={scheduleView === 'annual' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                          >
                            Annual
                          </Button>
                          <Button
                            variant={scheduleView === 'monthly' ? 'default' : 'outline'}
                            onClick={() => setScheduleView('monthly')}
                            className={scheduleView === 'monthly' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                          >
                            Period by Period
                          </Button>
                        </div>

                        {/* Schedule Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                              <tr>
                                <th className="text-left p-3 font-semibold text-slate-700">
                                  {scheduleView === 'annual' ? 'Year' : 'Period'}
                                </th>
                                <th className="text-right p-3 font-semibold text-slate-700">Contribution</th>
                                <th className="text-right p-3 font-semibold text-slate-700">Interest</th>
                                <th className="text-right p-3 font-semibold text-slate-700">Balance</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {(scheduleView === 'annual' ? getAnnualSchedule() : schedule).map((entry) => (
                                <tr key={entry.period} className="hover:bg-slate-50">
                                  <td className="p-3 text-slate-700">{entry.period}</td>
                                  <td className="p-3 text-right text-slate-700">{formatCurrency(entry.deposit)}</td>
                                  <td className="p-3 text-right text-emerald-600">{formatCurrency(entry.interest)}</td>
                                  <td className="p-3 text-right font-semibold text-slate-800">{formatCurrency(entry.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
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
                  Enter your investment details and click Calculate
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Interest Calculations</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Makes Interest Compound?</h3>
                <p>
                  When your money earns interest, you're essentially being paid for lending it out—whether to a bank, the government through bonds, or another entity. The real magic happens with compound interest, where you earn returns not just on your original investment, but on all the interest that's already accumulated too. Think of it like a snowball rolling down a hill, picking up more snow as it goes.
                </p>
                <p className="mt-4">
                  Let's say you invest $25,000 at a 5% annual rate. After the first year, you'll have earned $1,250 in interest. But here's where it gets interesting: in year two, you're earning 5% on $26,250 (your original amount plus that first year's interest), not just the original $25,000. That means $1,312.50 in interest for year two. This compounding effect accelerates over time, which is why Einstein allegedly called compound interest "the eighth wonder of the world."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Simple Interest vs. Compound Interest</h3>
                <p>
                  It's worth understanding the difference between simple and compound interest, because they work very differently. Simple interest is calculated only on your principal—the initial amount you invested. If you put $10,000 into an account with 4% simple interest for five years, you'd earn exactly $400 every single year. After five years, you'd have $12,000 total.
                </p>
                <p className="mt-4">
                  Compound interest, on the other hand, recalculates based on your growing balance. With that same $10,000 at 4% compounded annually for five years, you'd end up with about $12,166.53—an extra $166.53 compared to simple interest. The difference might not seem huge in this example, but extend that timeline to 20 or 30 years, or add regular contributions, and compound interest absolutely crushes simple interest in terms of growth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Compounding Frequency Affects Your Returns</h3>
                <p>
                  Here's something that surprises a lot of people: how often your interest compounds makes a real difference. Most folks think "annual" means once per year, and that's correct—but your investment could compound semiannually (twice a year), quarterly (four times), monthly (12 times), or even daily (365 times).
                </p>
                <p className="mt-4">
                  The more frequently interest compounds, the more you'll earn, though the gains start to plateau at higher frequencies. For instance, $10,000 at 5% for 10 years gives you $16,288.95 with annual compounding. Switch to monthly compounding and you get $16,470.09—nearly $200 more. Jump to daily compounding and it's $16,486.65. So yes, daily is better than annual, but the difference between daily and monthly is pretty small.
                </p>
                <p className="mt-4">
                  What matters more than obsessing over compounding frequency is the interest rate itself and how long you let your money grow. A slightly higher rate or a few extra years invested will almost always beat out marginal gains from more frequent compounding.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Regular Contributions</h3>
                <p>
                  While a solid initial investment is great, regular contributions can supercharge your long-term growth. Even modest monthly or annual deposits add up significantly over time, especially when they're also earning compound interest. This is the foundation of strategies like dollar-cost averaging for retirement accounts.
                </p>
                <p className="mt-4">
                  Consider this: if you start with $25,000 and add $5,000 every year for five years at 5% interest, you'll end up with around $60,600. Without those contributions, your $25,000 would only grow to about $31,900. Those contributions more than doubled what you'd get from the initial investment alone. The key is consistency—making those deposits year after year compounds your wealth in ways that sporadic investing just can't match.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Beginning vs. End of Period Contributions</h3>
                <p>
                  You might have noticed the option to choose when contributions are made—at the beginning or end of each compounding period. This might seem like a minor detail, but it actually impacts your final balance, especially with longer timeframes.
                </p>
                <p className="mt-4">
                  When you contribute at the beginning of each period, that money has the entire period to earn interest. With end-of-period contributions, you're essentially losing out on one period's worth of interest on each deposit. For a single year, the difference is small. But over decades? It adds up. Beginning-of-period contributions generally result in higher returns—sometimes several percentage points more of your total portfolio by retirement age.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Fixed vs. Variable Interest Rates</h3>
                <p>
                  When you're working with any interest-bearing investment or loan, you'll encounter fixed or variable rates. A fixed rate stays the same for the entire term—what you see is what you get. This makes planning straightforward since you know exactly what to expect. Certificates of deposit (CDs), certain bonds, and traditional savings accounts typically offer fixed rates.
                </p>
                <p className="mt-4">
                  Variable rates, also called floating rates, change based on market conditions or benchmark rates (like the federal funds rate or LIBOR). These can work in your favor when rates rise, but they also mean uncertainty. Some savings accounts and money market accounts use variable rates, as do adjustable-rate mortgages on the loan side. For calculators like this one, we assume a fixed rate to give you predictable projections, but remember that real-world returns might fluctuate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Implications on Investment Growth</h3>
                <p>
                  It's easy to get excited about projected returns and forget that Uncle Sam wants a cut. Interest income is typically taxable, and the rate depends on your tax bracket and the type of account. Interest from savings accounts, CDs, and bonds is usually taxed as ordinary income, which can be anywhere from 10% to 37% federally, plus state taxes in many cases.
                </p>
                <p className="mt-4">
                  However, some investments offer tax advantages. Municipal bonds, for instance, are often exempt from federal taxes (and sometimes state taxes too, if you live in the issuing state). Retirement accounts like 401(k)s and traditional IRAs let your money grow tax-deferred, meaning you don't pay taxes on the interest until you withdraw in retirement. Roth IRAs go even further—you pay taxes upfront, but all future growth and withdrawals are tax-free.
                </p>
                <p className="mt-4">
                  When using this calculator, you can input an estimated tax rate to see how much you'll keep after taxes. This gives you a more realistic picture of your actual returns, which is especially important for taxable accounts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Impact of Inflation on Real Returns</h3>
                <p>
                  Even if your investment is growing nicely on paper, inflation quietly eats away at your purchasing power. If you earn 5% interest annually but inflation runs at 3%, your "real" return is only about 2%. That's why it's crucial to think beyond nominal returns and consider inflation-adjusted growth.
                </p>
                <p className="mt-4">
                  The inflation rate option in this calculator helps you understand what your money will actually be worth in future dollars. Let's say you accumulate $50,000 over 10 years, but inflation averaged 3% during that time. In today's dollars, that $50,000 might only have the purchasing power of around $37,200. Still better than not investing at all, but it's a sobering reminder that you need returns that outpace inflation to truly build wealth.
                </p>
                <p className="mt-4">
                  Historically, U.S. inflation has averaged around 3% per year, though it can spike higher (like in the early 1980s or recent years) or drop lower (during certain economic periods). Accounting for inflation in your planning ensures you're not fooled by big nominal numbers that might not translate to real-world buying power.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Rule of 72: Quick Mental Math for Doubling</h3>
                <p>
                  Here's a handy trick investors have used for decades: the Rule of 72. This simple formula lets you estimate how long it'll take for your investment to double at a given interest rate. Just divide 72 by your annual rate. So at 6% interest, your money doubles in roughly 12 years (72 ÷ 6). At 8%, it's about 9 years.
                </p>
                <p className="mt-4">
                  While it's not perfectly precise—especially at very high or very low rates—the Rule of 72 is remarkably accurate for rates between 5% and 10%, which covers most real-world scenarios. It's a useful mental shortcut when you're evaluating investment opportunities or retirement timelines without pulling out a calculator (ironic, given what you're reading right now).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Where Compound Interest Works Best</h3>
                <p>
                  Compound interest shines brightest in long-term, tax-advantaged accounts where you can reinvest earnings without interruption. Retirement accounts like 401(k)s, IRAs, and Roth IRAs are ideal because they let your money compound for decades without annual tax drag. The longer the timeline and the more consistently you contribute, the more dramatic the results.
                </p>
                <p className="mt-4">
                  High-yield savings accounts, certificates of deposit (CDs), and certain bonds also use compound interest, though the rates are typically more modest. These are better suited for shorter-term goals or emergency funds where you want stability and liquidity. The returns won't make you rich overnight, but they're safe and predictable, which has its own value.
                </p>
                <p className="mt-4">
                  On the flip side, compound interest can work against you with debt. Credit card balances, for example, compound interest on your debt, which is why carrying a balance month-to-month becomes so expensive so quickly. Understanding how compound interest works on both sides of the ledger—assets and liabilities—is fundamental to smart financial management.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Mistakes to Avoid</h3>
                <p>
                  One of the biggest mistakes people make with interest calculations is being overly optimistic about rates. Plugging in 10% or 12% annual returns might feel good, but it's not realistic for most conservative investments like savings accounts or bonds. Stocks have historically averaged around 10% before inflation, but they're volatile and don't guarantee that return every year. Be honest with your projections.
                </p>
                <p className="mt-4">
                  Another pitfall is ignoring fees and expenses. Mutual funds, ETFs, and managed accounts often charge annual fees that effectively lower your returns. A fund with a 1% expense ratio earning 7% annually is really only netting you 6%. Over decades, that 1% difference compounds into tens of thousands of dollars in lost growth.
                </p>
                <p className="mt-4">
                  Lastly, don't underestimate the importance of starting early. Thanks to compounding, someone who starts investing at 25 will likely end up with more wealth at 65 than someone who starts at 35—even if the late starter invests more money each month. Time is your greatest ally when it comes to compounding, and you can't get it back once it's gone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Practical Tips for Maximizing Growth</h3>
                <p>
                  If you want to get the most out of compound interest, start by automating your contributions. Setting up automatic transfers from your checking account to your investment or savings account removes the temptation to skip months and ensures consistency. Even small amounts add up—$100 a month for 30 years at 6% becomes over $100,000.
                </p>
                <p className="mt-4">
                  Take full advantage of employer matches in retirement accounts. If your employer matches 50% of your 401(k) contributions up to 6% of your salary, you're effectively getting a 50% instant return on that money before it even starts compounding. That's free money you shouldn't leave on the table.
                </p>
                <p className="mt-4">
                  Finally, periodically review your accounts and rebalance as needed. Market conditions change, and so do your financial goals. What worked at 30 might not work at 50. Staying engaged with your finances—without obsessively checking every day—keeps you on track toward your long-term objectives.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This interest calculator is designed to help you model different scenarios and understand how various factors influence your investment growth. Play around with the numbers: try different contribution amounts, compounding frequencies, and timeframes to see what makes the biggest difference. You might be surprised by what you discover.
                </p>
                <p className="mt-4">
                  The accumulation schedule breakdown shows you year-by-year (or period-by-period) exactly how your balance grows, which can be incredibly motivating. Seeing the numbers increase visibly helps reinforce the value of patience and consistency. You can also use the tax and inflation inputs to get a more realistic picture of your after-tax, inflation-adjusted wealth.
                </p>
                <p className="mt-4">
                  Remember, calculators like this provide projections based on assumptions—they're not guarantees. Real-world returns fluctuate, life happens, and plans change. But having a clear baseline to work from makes it much easier to set realistic goals and track your progress over time. Knowledge is power, especially when it comes to growing your wealth.
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
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate loan payments and interest</div>
                  </div>
                </Link>
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Plan your home loan payments</div>
                  </div>
                </Link>
                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Auto Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate car financing options</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
