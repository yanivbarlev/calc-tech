"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, PiggyBank, Target } from "lucide-react";
import type { Metadata } from 'next';

interface RetirementResults {
  retirementBalance: number;
  totalContributions: number;
  employerContributions: number;
  investmentGains: number;
  monthlyRetirementIncome: number;
  totalRetirementWithdrawals: number;
}

export default function FourOhOneKCalculator() {
  // Basic Information
  const [currentAge, setCurrentAge] = useState<string>("30");
  const [annualSalary, setAnnualSalary] = useState<string>("75000");
  const [currentBalance, setCurrentBalance] = useState<string>("50000");
  const [contributionPercent, setContributionPercent] = useState<string>("6");
  const [employerMatch, setEmployerMatch] = useState<string>("50");
  const [employerMatchLimit, setEmployerMatchLimit] = useState<string>("6");

  // Projections
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [lifeExpectancy, setLifeExpectancy] = useState<string>("85");
  const [salaryIncrease, setSalaryIncrease] = useState<string>("2.5");
  const [annualReturn, setAnnualReturn] = useState<string>("7");
  const [inflationRate, setInflationRate] = useState<string>("2.5");

  const [results, setResults] = useState<RetirementResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const age = parseFloat(currentAge) || 30;
    const salary = parseFloat(annualSalary) || 75000;
    const balance = parseFloat(currentBalance) || 50000;
    const contribPct = parseFloat(contributionPercent) || 6;
    const empMatch = parseFloat(employerMatch) || 50;
    const empMatchLim = parseFloat(employerMatchLimit) || 6;
    const retAge = parseFloat(retirementAge) || 65;
    const lifeExp = parseFloat(lifeExpectancy) || 85;
    const salInc = parseFloat(salaryIncrease) || 2.5;
    const annRet = parseFloat(annualReturn) || 7;
    const inflation = parseFloat(inflationRate) || 2.5;

    const yearsToRetirement = retAge - age;
    const yearsInRetirement = lifeExp - retAge;

    let currentSalary = salary;
    let accountBalance = balance;
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;

    // Accumulation phase
    for (let year = 0; year < yearsToRetirement; year++) {
      // Employee contribution
      const employeeContrib = currentSalary * (contribPct / 100);

      // Employer match calculation
      const employeeContribForMatch = Math.min(currentSalary * (empMatchLim / 100), employeeContrib);
      const employerContrib = employeeContribForMatch * (empMatch / 100);

      totalEmployeeContrib += employeeContrib;
      totalEmployerContrib += employerContrib;

      // Add contributions to balance
      accountBalance += employeeContrib + employerContrib;

      // Apply investment growth
      accountBalance *= (1 + annRet / 100);

      // Increase salary for next year
      currentSalary *= (1 + salInc / 100);
    }

    const retirementBalance = accountBalance;
    const investmentGains = retirementBalance - balance - totalEmployeeContrib - totalEmployerContrib;

    // Distribution phase - calculate monthly income
    const realReturnRate = ((1 + annRet / 100) / (1 + inflation / 100)) - 1;
    const monthlyRate = realReturnRate / 12;
    const totalMonths = yearsInRetirement * 12;

    let monthlyIncome = 0;
    if (monthlyRate > 0 && totalMonths > 0) {
      // Using annuity formula to calculate monthly withdrawal
      monthlyIncome = retirementBalance * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    } else if (totalMonths > 0) {
      // If no real return, simply divide balance by months
      monthlyIncome = retirementBalance / totalMonths;
    }

    const totalWithdrawals = monthlyIncome * totalMonths;

    setResults({
      retirementBalance,
      totalContributions: totalEmployeeContrib,
      employerContributions: totalEmployerContrib,
      investmentGains,
      monthlyRetirementIncome: monthlyIncome,
      totalRetirementWithdrawals: totalWithdrawals
    });

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
                <div className="text-xs text-slate-500">Financial Planning Tools</div>
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
            <PiggyBank className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            401(k) Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your retirement savings and estimate your 401(k) balance at retirement with employer matching
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Retirement Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Age
                      </label>
                      <Input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Annual Salary ($)
                      </label>
                      <Input
                        type="number"
                        value={annualSalary}
                        onChange={(e) => setAnnualSalary(e.target.value)}
                        placeholder="75000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current 401(k) Balance ($)
                      </label>
                      <Input
                        type="number"
                        value={currentBalance}
                        onChange={(e) => setCurrentBalance(e.target.value)}
                        placeholder="50000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Contribution (% of salary)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={contributionPercent}
                          onChange={(e) => setContributionPercent(e.target.value)}
                          placeholder="6"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Employer Match (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={employerMatch}
                          onChange={(e) => setEmployerMatch(e.target.value)}
                          placeholder="50"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">e.g., 50% means $0.50 per $1.00</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Employer Match Limit (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={employerMatchLimit}
                          onChange={(e) => setEmployerMatchLimit(e.target.value)}
                          placeholder="6"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Max % of salary employer will match</p>
                    </div>
                  </div>
                </div>

                {/* Projections */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    Projections
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Retirement Age
                      </label>
                      <Input
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="65"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Life Expectancy
                      </label>
                      <Input
                        type="number"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        placeholder="85"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Salary Increase (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={salaryIncrease}
                          onChange={(e) => setSalaryIncrease(e.target.value)}
                          placeholder="2.5"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Annual Return (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={annualReturn}
                          onChange={(e) => setAnnualReturn(e.target.value)}
                          placeholder="7"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Inflation Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(e.target.value)}
                          placeholder="2.5"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Retirement
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Projected Retirement Balance</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.retirementBalance)}</p>
                    <p className="text-emerald-100">Your estimated 401(k) balance at retirement</p>
                  </div>
                </Card>

                {/* Breakdown Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Contribution Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Your Contributions</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.totalContributions)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Employer Match</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.employerContributions)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Investment Gains</span>
                        <span className="font-semibold text-teal-600">{formatCurrency(results.investmentGains)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-700 font-semibold">Total Balance</span>
                        <span className="font-bold text-emerald-600">{formatCurrency(results.retirementBalance)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Retirement Income
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Monthly Income</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.monthlyRetirementIncome)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Annual Income</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.monthlyRetirementIncome * 12)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Total Withdrawals</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.totalRetirementWithdrawals)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Adjusted for inflation at {inflationRate}% annually
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Insights */}
                <Card className="border-2 border-emerald-100 rounded-2xl shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <CardTitle className="text-lg text-slate-700">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Employer Match Value</p>
                        <p className="text-sm text-slate-600">
                          Your employer will contribute {formatCurrency(results.employerContributions)} over your career.
                          That's essentially free money—make sure you're contributing enough to get the full match!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Power of Compound Growth</p>
                        <p className="text-sm text-slate-600">
                          Investment gains of {formatCurrency(results.investmentGains)} represent the power of compound returns.
                          Starting early and staying invested makes a huge difference.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">Retirement Planning Tip</p>
                        <p className="text-sm text-slate-600">
                          Financial advisors often recommend having 10-12 times your annual salary saved by retirement.
                          Review these projections regularly and adjust your contributions as needed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Plan Your Retirement
                </h3>
                <p className="text-slate-500">
                  Enter your information and click Calculate to see your projected retirement balance
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Your 401(k) Retirement Plan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is a 401(k) Plan?</h3>
                <p className="mb-4">
                  A 401(k) is an employer-sponsored retirement savings plan that lets you set aside money from each paycheck before taxes are taken out. Think of it as a special savings account designed specifically for your golden years. The name comes from Section 401(k) of the Internal Revenue Code, which created this type of plan back in 1978.
                </p>
                <p className="mb-4">
                  Here's what makes it attractive: when you contribute to a traditional 401(k), that money comes out of your paycheck before Uncle Sam takes his cut. So if you earn $75,000 and put away $6,000 in your 401(k), you'll only pay income tax on $69,000. That's an immediate tax benefit right there. The money then grows tax-deferred, meaning you won't owe taxes on investment gains until you start taking withdrawals in retirement.
                </p>
                <p>
                  Most employers who offer 401(k) plans also provide some form of matching contribution. This is essentially free money added to your retirement savings. For instance, your employer might match 50% of your contributions up to 6% of your salary. If you're making $75,000 and contributing 6% ($4,500), your employer would add another $2,250. That's a guaranteed 50% return on your investment before any market gains.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Employer Matching Actually Works</h3>
                <p className="mb-4">
                  Employer matching can seem confusing at first, but it's pretty straightforward once you break it down. Let's say your company offers a 50% match on contributions up to 6% of your salary. This means the company will put in 50 cents for every dollar you contribute, but only up to 6% of your total pay.
                </p>
                <p className="mb-4">
                  Using real numbers: if you make $60,000 annually and contribute 6% ($3,600), your employer adds 50% of that amount ($1,800). Your total annual contribution becomes $5,400 instead of just $3,600. That's a substantial boost to your retirement savings that doesn't cost you anything extra.
                </p>
                <p className="mb-4">
                  Here's the catch—you need to contribute enough to get the full match. If you only put in 3% using the example above, your employer would only match half of that 3%. You'd be leaving free money on the table. Financial experts almost universally agree that you should contribute at least enough to capture the full employer match. It's one of the few guaranteed returns you'll find anywhere.
                </p>
                <p>
                  Different companies structure their matches differently. Some might offer dollar-for-dollar matching up to 3%, while others might do 100% of the first 3% plus 50% of the next 2%. Make sure you understand your specific plan's matching formula so you can maximize this benefit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Starting Early</h3>
                <p className="mb-4">
                  Time is your greatest asset when it comes to retirement saving, and the math behind compound growth is genuinely remarkable. When your investment earnings generate their own earnings, the effect snowballs over time. Starting in your twenties versus your thirties can literally mean hundreds of thousands of dollars in difference by retirement age.
                </p>
                <p className="mb-4">
                  Consider this scenario: Two people both plan to retire at 65. Person A starts contributing $500 monthly to their 401(k) at age 25. Person B waits until 35 to start contributing the same amount. Assuming a 7% average annual return, Person A will have roughly $1.14 million at retirement. Person B, despite contributing for ten fewer years, will have only about $566,000—less than half.
                </p>
                <p className="mb-4">
                  That ten-year head start makes an enormous difference because of compound growth. Person A's early contributions have more time to grow and generate returns, which then generate their own returns. This is why financial advisors constantly emphasize starting retirement savings as early as possible, even if you can only afford small contributions initially.
                </p>
                <p>
                  Of course, starting late doesn't mean you should give up. You'll just need to contribute more aggressively to catch up. The important thing is to start now, wherever you are in your career, and be consistent with your contributions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Investment Options and Asset Allocation</h3>
                <p className="mb-4">
                  Your 401(k) isn't just a savings account—it's an investment account. The money you contribute gets invested in various options provided by your plan, typically including mutual funds, target-date funds, index funds, and sometimes company stock. How you allocate your money among these options can significantly impact your retirement balance.
                </p>
                <p className="mb-4">
                  Many people, especially those new to investing, feel overwhelmed by the array of choices. That's where target-date funds come in handy. These funds automatically adjust their investment mix based on when you plan to retire. If you're retiring around 2050, you'd choose a 2050 target-date fund. When you're young, these funds invest more heavily in stocks for growth potential. As you approach retirement, they gradually shift toward more conservative investments like bonds.
                </p>
                <p className="mb-4">
                  If you prefer more control, you can build your own portfolio using the available fund options. A common approach is to diversify across different asset classes—domestic stocks, international stocks, bonds, and perhaps some real estate or commodities. The general rule is that younger workers can afford to take more risk with higher stock allocations, while those closer to retirement should emphasize capital preservation with more bonds.
                </p>
                <p>
                  Pay attention to expense ratios—the annual fees charged by funds. A fund charging 1.5% annually versus one charging 0.5% might not sound like much, but over decades, that 1% difference can cost you tens of thousands of dollars in lost returns. Index funds typically offer the lowest expense ratios and often outperform actively managed funds over long periods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Contribution Limits and Catch-Up Contributions</h3>
                <p className="mb-4">
                  The IRS sets annual limits on how much you can contribute to your 401(k). For 2024, employees can contribute up to $23,000 in salary deferrals. This limit typically increases slightly each year to account for inflation. It's worth noting that this limit applies to your contributions only—employer matching doesn't count toward this cap.
                </p>
                <p className="mb-4">
                  Once you reach age 50, you're eligible for catch-up contributions, which allow you to save additional money beyond the standard limit. For 2024, the catch-up contribution limit is $7,500, bringing the total potential contribution to $30,500 for those 50 and older. This provision recognizes that older workers might need to save more aggressively as retirement approaches.
                </p>
                <p className="mb-4">
                  High earners should also be aware of the overall contribution limit, which includes both employee and employer contributions. For 2024, this combined limit is $69,000 (or $76,500 if you're 50 or older). Few people hit this ceiling, but it becomes relevant if you have a very generous employer match or profit-sharing arrangement.
                </p>
                <p>
                  While maxing out your 401(k) isn't feasible for everyone, it's a worthy goal if your budget allows. The tax advantages and compound growth potential make it one of the most powerful wealth-building tools available to working Americans.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Vesting Schedules: When Is the Money Really Yours?</h3>
                <p className="mb-4">
                  While your own contributions to a 401(k) are always 100% yours, employer matching contributions often come with strings attached through what's called a vesting schedule. Vesting determines when employer contributions actually belong to you. If you leave the company before you're fully vested, you might forfeit some or all of the employer match.
                </p>
                <p className="mb-4">
                  There are two main types of vesting schedules. Cliff vesting means you become fully vested all at once after a certain period—commonly three years. Under this arrangement, you'd get 0% of employer contributions if you leave before three years, but 100% if you stay past that point. Graded vesting happens incrementally, perhaps 20% per year over five years. After year one, you keep 20% of employer contributions; after year two, 40%; and so on until you're fully vested at five years.
                </p>
                <p className="mb-4">
                  Some employers offer immediate vesting, meaning employer contributions are yours right away. This is obviously the most employee-friendly option, but it's less common than vesting schedules. By law, all employer contributions must be fully vested within six years at most.
                </p>
                <p>
                  Vesting schedules can influence career decisions. If you're considering leaving a job and you're close to a vesting milestone, it might be worth staying a bit longer to secure those employer contributions. Conversely, if you're early in your vesting schedule and have a great opportunity elsewhere, the unvested amount might not be enough to outweigh the new opportunity's benefits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Early Withdrawals: Why You Should Avoid Them</h3>
                <p className="mb-4">
                  Your 401(k) is designed for retirement, and the tax code strongly discourages taking money out early. If you withdraw funds before age 59½, you'll typically face a 10% early withdrawal penalty on top of regular income taxes. So that $10,000 withdrawal could cost you $1,000 in penalties plus another $2,200 in taxes (assuming a 22% tax bracket), leaving you with only $6,800.
                </p>
                <p className="mb-4">
                  Beyond the immediate financial hit, early withdrawals destroy your long-term retirement prospects. That $10,000 you take out today could have grown to $76,000 over thirty years at a 7% return. You're essentially trading future financial security for current spending.
                </p>
                <p className="mb-4">
                  There are some exceptions to the early withdrawal penalty. If you leave your job at age 55 or later, you can take penalty-free withdrawals from that employer's plan (though you still owe income tax). Other exceptions include certain medical expenses, permanent disability, and qualified domestic relations orders in divorce cases. First-time home purchases allow a penalty-free withdrawal of up to $10,000 from an IRA, but not from a 401(k).
                </p>
                <p className="mb-4">
                  Many plans offer 401(k) loans as an alternative to withdrawals. You can typically borrow up to 50% of your vested balance (maximum $50,000) and repay yourself with interest over five years. While this avoids taxes and penalties, it's still problematic. You're removing money from investments during loan repayment, potentially missing market gains. If you leave your job, the outstanding loan balance often becomes due immediately, or it's treated as a taxable distribution.
                </p>
                <p>
                  The bottom line: treat your 401(k) as untouchable except in genuine emergencies. Build a separate emergency fund for unexpected expenses so you won't need to raid your retirement savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Required Minimum Distributions in Retirement</h3>
                <p className="mb-4">
                  You can't keep money in your 401(k) indefinitely. The IRS requires you to start taking distributions by April 1 following the year you turn 73 (this age increased from 72 under recent legislation). These are called Required Minimum Distributions, or RMDs. The amount is calculated based on your account balance and life expectancy using IRS tables.
                </p>
                <p className="mb-4">
                  For example, at age 73, your RMD divisor is 26.5. If your 401(k) balance is $500,000, you'd need to withdraw at least $18,868 that year ($500,000 ÷ 26.5). The divisor gets smaller each year as your life expectancy decreases, meaning required withdrawals gradually increase. These withdrawals count as ordinary income for tax purposes.
                </p>
                <p className="mb-4">
                  Failing to take your full RMD results in a hefty penalty—25% of the amount you should have withdrawn (reduced to 10% if you correct it quickly). If you were supposed to withdraw $20,000 but didn't, you'd owe a $5,000 penalty on top of the taxes you'll eventually pay.
                </p>
                <p>
                  You can always withdraw more than the minimum—RMDs are just the floor, not the ceiling. Many retirees take larger distributions to cover living expenses. If you're still working at 73, you can delay RMDs from your current employer's plan (but not IRAs or previous employers' plans) until you actually retire.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Traditional vs. Roth 401(k): Which Should You Choose?</h3>
                <p className="mb-4">
                  Many employers now offer a Roth 401(k) option alongside traditional 401(k)s. The key difference is when you pay taxes. Traditional 401(k) contributions are pre-tax (you pay taxes later in retirement), while Roth 401(k) contributions are made with after-tax dollars (withdrawals in retirement are tax-free).
                </p>
                <p className="mb-4">
                  If you expect to be in a higher tax bracket in retirement, Roth contributions make sense—pay taxes now at your current lower rate rather than later at a higher rate. This often benefits younger workers early in their careers. Conversely, if you're currently in a high tax bracket and expect lower income in retirement, traditional pre-tax contributions might be better.
                </p>
                <p className="mb-4">
                  Roth accounts have another advantage: they're not subject to RMDs during your lifetime. You can let the money grow indefinitely if you don't need it, making Roth accounts excellent for leaving wealth to heirs. Traditional 401(k)s force distributions starting at 73, whether you need the money or not.
                </p>
                <p className="mb-4">
                  You don't have to choose just one. Many people split contributions between traditional and Roth, creating tax diversification in retirement. This gives you flexibility—you can manage your taxable income in retirement by choosing which account to draw from based on your tax situation each year.
                </p>
                <p>
                  One important note: employer matching contributions always go into a traditional pre-tax account, even if you're making Roth contributions. This means you'll have both types of accounts regardless of your personal contribution choice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Happens to Your 401(k) When You Change Jobs?</h3>
                <p className="mb-4">
                  When you leave an employer, you have several options for your 401(k) balance. You can leave it where it is (if the balance exceeds $7,000), roll it over to your new employer's plan, roll it into an Individual Retirement Account (IRA), or cash it out (not recommended for reasons discussed earlier).
                </p>
                <p className="mb-4">
                  Leaving it with your former employer is the easiest option, requiring no action. However, you can't make new contributions, and you're stuck with that plan's investment options and fees. If you have multiple old 401(k)s from different jobs, managing them separately becomes cumbersome.
                </p>
                <p className="mb-4">
                  Rolling over to a new employer's plan consolidates your retirement savings in one place. This simplifies management and might give you access to better investment options or lower fees. The rollover must be done correctly to avoid taxes—ideally through a direct rollover where funds transfer directly between custodians.
                </p>
                <p className="mb-4">
                  Rolling over to an IRA often provides the most investment flexibility. IRAs typically offer thousands of investment choices compared to the dozen or so in most 401(k) plans. You also get more control over your assets. The downside is that IRAs don't allow loans, and you lose the age-55 penalty-free withdrawal option that 401(k)s provide.
                </p>
                <p>
                  Whatever you choose, avoid cashing out. Studies show that roughly 40% of people cash out their 401(k) when leaving a job, often spending the money rather than saving it. This derails retirement planning and triggers unnecessary taxes and penalties. Keep your retirement savings invested and working for your future.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Maximizing Your 401(k) Strategy</h3>
                <p className="mb-4">
                  Getting the most from your 401(k) requires more than just signing up. Start by contributing enough to capture the full employer match—it's the easiest money you'll ever make. Then, try to increase your contribution rate by at least 1% annually. You'll barely notice the difference in your paycheck, but over decades, it adds up substantially.
                </p>
                <p className="mb-4">
                  Whenever you get a raise, consider directing at least half of it to your 401(k). This lets you enjoy some benefit from the raise while accelerating your retirement savings. Many plans offer automatic annual increases, which make this effortless.
                </p>
                <p className="mb-4">
                  Review your investment allocations annually. As you age, your risk tolerance and time horizon change, so your investment mix should evolve accordingly. Rebalancing—selling appreciated assets and buying underperforming ones—helps maintain your target allocation and can actually boost returns over time.
                </p>
                <p className="mb-4">
                  Don't ignore your 401(k) statements. Review them at least quarterly to ensure contributions are being made correctly, investment performance aligns with expectations, and fees remain reasonable. Small fee differences compound dramatically over decades.
                </p>
                <p>
                  Finally, educate yourself continually about retirement planning. Your 401(k) is likely to be your largest asset besides your home. Understanding how it works, staying informed about tax law changes, and making thoughtful decisions will pay enormous dividends throughout your retirement years.
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
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <PiggyBank className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Retirement Calculator</h4>
                    <p className="text-sm text-slate-500">Plan your overall retirement needs</p>
                  </div>
                </Link>

                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors">Investment Calculator</h4>
                    <p className="text-sm text-slate-500">Calculate investment returns</p>
                  </div>
                </Link>

                <Link href="/compound-interest" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Compound Interest Calculator</h4>
                    <p className="text-sm text-slate-500">See how money grows over time</p>
                  </div>
                </Link>

                <Link href="/salary" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 group-hover:text-teal-600 transition-colors">Salary Calculator</h4>
                    <p className="text-sm text-slate-500">Convert between salary periods</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with precision for your financial planning needs.
          </p>
        </div>
      </footer>
    </div>
  );
}
