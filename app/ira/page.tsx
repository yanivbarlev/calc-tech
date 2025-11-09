"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, PiggyBank, Calendar } from "lucide-react";

interface IRAResults {
  traditionalBalance: number;
  traditionalAfterTax: number;
  rothBalance: number;
  taxableBalance: number;
  yearsToRetirement: number;
  totalContributions: number;
  investmentGrowth: number;
  taxSavings: number;
}

interface YearlyData {
  age: number;
  year: number;
  traditionalBalance: number;
  rothBalance: number;
  taxableBalance: number;
}

export default function IRACalculator() {
  // Input states
  const [currentBalance, setCurrentBalance] = useState<string>("50000");
  const [annualContribution, setAnnualContribution] = useState<string>("6500");
  const [expectedReturn, setExpectedReturn] = useState<string>("7");
  const [currentAge, setCurrentAge] = useState<string>("35");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [currentTaxRate, setCurrentTaxRate] = useState<string>("24");
  const [retirementTaxRate, setRetirementTaxRate] = useState<string>("22");

  const [results, setResults] = useState<IRAResults | null>(null);
  const [yearlySchedule, setYearlySchedule] = useState<YearlyData[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculate = () => {
    // Parse inputs with defaults
    const balance = parseFloat(currentBalance) || 50000;
    const contribution = parseFloat(annualContribution) || 6500;
    const returnRate = (parseFloat(expectedReturn) || 7) / 100;
    const ageNow = parseFloat(currentAge) || 35;
    const ageRetire = parseFloat(retirementAge) || 65;
    const taxNow = (parseFloat(currentTaxRate) || 24) / 100;
    const taxRetire = (parseFloat(retirementTaxRate) || 22) / 100;

    // Validate inputs
    if (ageRetire <= ageNow) {
      return;
    }

    const years = ageRetire - ageNow;
    let traditionalBal = balance;
    let rothBal = balance;
    let taxableBal = balance;

    const schedule: YearlyData[] = [];
    const currentYear = new Date().getFullYear();

    // Year-by-year calculations
    for (let i = 0; i <= years; i++) {
      schedule.push({
        age: Math.round(ageNow + i),
        year: currentYear + i,
        traditionalBalance: traditionalBal,
        rothBalance: rothBal,
        taxableBalance: taxableBal
      });

      if (i < years) {
        // Traditional IRA: Pre-tax contributions grow tax-deferred
        traditionalBal = (traditionalBal + contribution) * (1 + returnRate);

        // Roth IRA: After-tax contributions grow tax-free
        // Contribution is reduced by current tax rate
        const rothContribution = contribution * (1 - taxNow);
        rothBal = (rothBal + rothContribution) * (1 + returnRate);

        // Taxable account: After-tax contributions, taxed on gains annually
        const taxableContribution = contribution * (1 - taxNow);
        const yearBeginBalance = taxableBal + taxableContribution;
        const gains = yearBeginBalance * returnRate;
        const taxOnGains = gains * taxNow; // Simplified: assumes ordinary income tax on all gains
        taxableBal = yearBeginBalance + gains - taxOnGains;
      }
    }

    const traditionalAfterTax = traditionalBal * (1 - taxRetire);
    const totalContributions = balance + (contribution * years);
    const traditionalGrowth = traditionalBal - totalContributions;
    const taxSavings = traditionalBal * taxRetire;

    setResults({
      traditionalBalance: traditionalBal,
      traditionalAfterTax: traditionalAfterTax,
      rothBalance: rothBal,
      taxableBalance: taxableBal,
      yearsToRetirement: years,
      totalContributions: totalContributions,
      investmentGrowth: traditionalGrowth,
      taxSavings: taxSavings
    });

    setYearlySchedule(schedule);
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

  const formatPercentage = (value: number) => {
    return `${value}%`;
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
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
            Traditional IRA Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your retirement savings growth with Traditional IRA, Roth IRA, and taxable account comparisons
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  IRA Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current IRA Balance ($)
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
                    Annual Before-Tax Contribution ($)
                  </label>
                  <Input
                    type="number"
                    value={annualContribution}
                    onChange={(e) => setAnnualContribution(e.target.value)}
                    placeholder="6500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Age
                  </label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    placeholder="35"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Retirement Age
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
                    Current Marginal Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={currentTaxRate}
                    onChange={(e) => setCurrentTaxRate(e.target.value)}
                    placeholder="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Expected Retirement Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={retirementTaxRate}
                    onChange={(e) => setRetirementTaxRate(e.target.value)}
                    placeholder="22"
                  />
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Retirement Balance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Traditional IRA */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Traditional IRA Balance at Retirement</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.traditionalBalance)}</p>
                    <p className="text-emerald-100">Before taxes • In {results.yearsToRetirement} years</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">After-Tax Balance</p>
                        <p className="text-2xl font-bold text-emerald-700">{formatCurrency(results.traditionalAfterTax)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Estimated Tax Owed</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(results.taxSavings)}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Account Type Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Roth IRA */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Roth IRA (Tax-Free)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-600">Balance at Retirement</p>
                        <p className="text-3xl font-bold text-emerald-600">{formatCurrency(results.rothBalance)}</p>
                        <p className="text-xs text-slate-500 mt-1">Tax-free withdrawals</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Taxable Account */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-slate-600" />
                        Regular Taxable Account
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-600">Balance at Retirement</p>
                        <p className="text-3xl font-bold text-slate-600">{formatCurrency(results.taxableBalance)}</p>
                        <p className="text-xs text-slate-500 mt-1">Taxed annually on gains</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Investment Summary */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      Investment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Contributions</p>
                        <p className="text-xl font-bold text-slate-800">{formatCurrency(results.totalContributions)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Investment Growth</p>
                        <p className="text-xl font-bold text-emerald-600">{formatCurrency(results.investmentGrowth)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Years to Retirement</p>
                        <p className="text-xl font-bold text-teal-600">{results.yearsToRetirement} years</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-600 mb-2">Account Comparison at Retirement:</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Traditional IRA (after-tax):</span>
                          <span className="font-bold text-emerald-600">{formatCurrency(results.traditionalAfterTax)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Roth IRA (tax-free):</span>
                          <span className="font-bold text-emerald-600">{formatCurrency(results.rothBalance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Taxable Account:</span>
                          <span className="font-bold text-slate-600">{formatCurrency(results.taxableBalance)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Schedule Toggle */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Year-by-Year Balance Schedule</CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => setShowSchedule(!showSchedule)}
                        className="text-sm"
                      >
                        {showSchedule ? 'Hide' : 'Show'} Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  {showSchedule && (
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-2">Age</th>
                              <th className="text-left py-2 px-2">Year</th>
                              <th className="text-right py-2 px-2">Traditional IRA</th>
                              <th className="text-right py-2 px-2">Roth IRA</th>
                              <th className="text-right py-2 px-2">Taxable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {yearlySchedule.map((entry, index) => (
                              <tr key={index} className="border-b hover:bg-emerald-50">
                                <td className="py-2 px-2">{entry.age}</td>
                                <td className="py-2 px-2">{entry.year}</td>
                                <td className="text-right py-2 px-2 font-medium text-emerald-700">
                                  {formatCurrency(entry.traditionalBalance)}
                                </td>
                                <td className="text-right py-2 px-2 font-medium text-emerald-600">
                                  {formatCurrency(entry.rothBalance)}
                                </td>
                                <td className="text-right py-2 px-2 font-medium text-slate-600">
                                  {formatCurrency(entry.taxableBalance)}
                                </td>
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
                <PiggyBank className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your details and click Calculate to see your retirement projections
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding IRAs and Retirement Savings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is an Individual Retirement Account?</h3>
                <p>
                  An Individual Retirement Account, commonly known as an IRA, represents one of the most powerful tools available for building long-term wealth and securing your financial future. Think of it as a special savings vehicle that the government incentivizes through tax benefits—essentially giving you a head start on retirement planning that you won't find with regular investment accounts.
                </p>
                <p className="mt-3">
                  The beauty of IRAs lies in their flexibility and accessibility. Unlike employer-sponsored 401(k) plans, you don't need to work for a specific company to open one. Anyone with earned income can establish an IRA, making it an excellent option for self-employed individuals, freelancers, or those whose employers don't offer retirement plans. Even if you do have access to a workplace retirement account, an IRA can supplement those savings and provide additional tax advantages.
                </p>
                <p className="mt-3">
                  What sets IRAs apart from typical savings or investment accounts is their tax treatment. Depending on which type you choose, you either get tax breaks now (with Traditional IRAs) or later (with Roth IRAs). This tax advantage compounds over time, potentially adding tens of thousands—or even hundreds of thousands—of dollars to your retirement nest egg compared to investing the same amounts in taxable accounts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Traditional IRA: Tax Benefits Now, Pay Later</h3>
                <p>
                  Traditional IRAs work on a simple but powerful premise: reduce your taxes today while your money grows tax-deferred until retirement. When you contribute to a Traditional IRA, those contributions may be tax-deductible, meaning they reduce your taxable income for the year. If you're in the 24% tax bracket and contribute $6,500, you could save $1,560 in taxes right away.
                </p>
                <p className="mt-3">
                  Here's where it gets interesting. That money doesn't just sit there—it grows through investments in stocks, bonds, mutual funds, or other assets you choose. Year after year, your investments compound without the drag of annual taxes on dividends, interest, or capital gains. It's like running a race where you don't have to stop and pay tolls along the way. By the time you reach retirement, this tax-deferred compounding can make a substantial difference in your final balance.
                </p>
                <p className="mt-3">
                  The catch? Eventually, you'll need to pay the piper. When you withdraw money from a Traditional IRA in retirement—typically after age 59½—those withdrawals are taxed as ordinary income at your then-current tax rate. The bet you're making is that you'll be in a lower tax bracket during retirement than you are during your working years, which is often the case for many people.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Required Minimum Distributions</h4>
                <p>
                  One aspect of Traditional IRAs that catches some people off guard is the requirement to start taking withdrawals once you reach age 73 (as of 2023). These Required Minimum Distributions, or RMDs, ensure the government eventually collects taxes on this money. The amount you must withdraw each year is calculated based on your account balance and life expectancy. If you don't take your RMD, you'll face a hefty penalty—25% of the amount you should have withdrawn (reduced to 10% if corrected within two years).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Roth IRA: Pay Taxes Now, Enjoy Tax-Free Later</h3>
                <p>
                  Roth IRAs flip the Traditional IRA model on its head. Instead of getting a tax deduction upfront, you contribute money that's already been taxed. That might not sound like a great deal at first, but here's the kicker: everything that happens after that contribution is tax-free. Your investments grow tax-free, and when you withdraw the money in retirement, you pay zero taxes on it—not on the contributions, not on the decades of investment growth, nothing.
                </p>
                <p className="mt-3">
                  This tax-free treatment in retirement is incredibly valuable, especially if you expect to be in a higher tax bracket later or if tax rates in general increase over time. Let's say you contribute $6,500 annually from age 35 to 65, and it grows to $600,000. With a Roth IRA, that entire $600,000 comes out tax-free. With a Traditional IRA, you might owe $132,000 or more in taxes (at a 22% rate), leaving you with significantly less spending power.
                </p>
                <p className="mt-3">
                  Roth IRAs also offer more flexibility than their traditional counterparts. You can withdraw your contributions (not the earnings) at any time without penalty or taxes, since you already paid taxes on that money. There are no Required Minimum Distributions during your lifetime, so you can let the money continue growing if you don't need it. This makes Roth IRAs an excellent estate planning tool—you can pass tax-free wealth to your heirs.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Income Limitations</h4>
                <p>
                  The main drawback of Roth IRAs is that not everyone can contribute to them directly. For 2024, if you're single and earn more than $161,000, or married filing jointly earning more than $240,000, you're phased out of direct Roth contributions. However, there's a workaround called a "backdoor Roth IRA" where you contribute to a Traditional IRA (which has no income limits for contributions, though deductibility may be limited) and then convert it to a Roth, paying taxes on the conversion.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">SEP IRA: For the Self-Employed and Small Business Owners</h3>
                <p>
                  If you're self-employed or own a small business, the Simplified Employee Pension (SEP) IRA offers a way to supercharge your retirement savings beyond what regular IRAs allow. These accounts function similarly to Traditional IRAs—contributions are tax-deductible and grow tax-deferred—but with dramatically higher contribution limits.
                </p>
                <p className="mt-3">
                  For 2024, you can contribute up to 25% of your compensation or $69,000, whichever is less. That's more than ten times the standard IRA contribution limit. This makes SEP IRAs particularly attractive for high-earning freelancers, consultants, or business owners who want to accelerate their retirement savings. The setup is straightforward, with minimal paperwork and administrative requirements compared to traditional pension plans.
                </p>
                <p className="mt-3">
                  If you have employees, there's a catch: you must contribute the same percentage of compensation for all eligible employees that you contribute for yourself. This can get expensive if you have a larger staff, but for solo entrepreneurs or those with just a spouse on the payroll, it's often an ideal solution.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">SIMPLE IRA: Small Business Retirement Plans Made Easy</h3>
                <p>
                  The SIMPLE IRA (Savings Incentive Match Plan for Employees) is designed for small businesses with 100 or fewer employees. It strikes a balance between the simplicity of IRAs and the higher contribution limits of 401(k) plans, without the complex administrative requirements that often come with traditional pension plans.
                </p>
                <p className="mt-3">
                  Employees can contribute up to $16,000 in 2024 ($19,500 if age 50 or older), and employers are required to contribute as well—either matching employee contributions dollar-for-dollar up to 3% of compensation, or making a flat 2% contribution for all eligible employees regardless of whether they contribute. This mandatory employer contribution is what makes SIMPLE IRAs particularly valuable for employees, though it can be a consideration for business owners evaluating costs.
                </p>
                <p className="mt-3">
                  Like Traditional IRAs, contributions are tax-deductible (for the employer) and tax-deferred (for growth), with taxes paid upon withdrawal in retirement. SIMPLE IRAs are relatively easy to set up and maintain, making them popular among small businesses that want to offer retirement benefits without the complexity of a full 401(k) plan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Choosing Between Traditional and Roth: The Tax Bracket Decision</h3>
                <p>
                  The fundamental question when choosing between Traditional and Roth IRAs boils down to this: will you be in a higher or lower tax bracket in retirement than you are now? If you expect to be in a lower bracket—perhaps you're currently in your peak earning years—a Traditional IRA's upfront deduction might make sense. If you're early in your career or expect higher taxes in the future, Roth contributions could be the better bet.
                </p>
                <p className="mt-3">
                  That said, the answer isn't always straightforward. Tax rates could change dramatically over the next few decades. Healthcare costs might push you into a higher bracket than expected. You might inherit money or have other income sources that affect your retirement tax situation. Many financial advisors suggest a hybrid approach: contribute to both Traditional and Roth accounts to create tax diversification, giving you flexibility in retirement to manage your tax burden strategically.
                </p>
                <p className="mt-3">
                  Consider your current situation too. If you're struggling to save and every dollar counts, the immediate tax break from a Traditional IRA contribution might free up cash flow you need now. If you have stable finances and can afford to pay taxes on contributions today, the Roth's tax-free growth could be worth more in the long run.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Investment Options: What Can You Actually Buy?</h3>
                <p>
                  One of the best features of IRAs is the vast universe of investment options available. Unlike some employer 401(k) plans that limit you to a handful of mutual funds, IRAs typically let you invest in individual stocks, bonds, mutual funds, exchange-traded funds (ETFs), certificates of deposit, and even certain alternative investments like real estate investment trusts (REITs) or precious metals.
                </p>
                <p className="mt-3">
                  Most people gravitate toward mutual funds or ETFs for their IRAs because these provide instant diversification across hundreds or thousands of securities. Index funds—which track market benchmarks like the S&P 500—have become particularly popular due to their low costs and solid long-term performance. You might allocate your IRA across a mix of U.S. stock funds, international stock funds, and bond funds, adjusting the mix based on your age and risk tolerance.
                </p>
                <p className="mt-3">
                  Younger investors can typically afford to be more aggressive, holding 80-90% stocks for maximum growth potential since they have decades for the account to recover from market downturns. As you approach retirement, you'll likely shift toward more conservative investments—perhaps 50-60% stocks and 40-50% bonds—to protect your accumulated wealth from major market swings right when you need to start withdrawing money.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Self-Directed IRAs for Alternative Investments</h4>
                <p>
                  For those interested in alternative investments, self-directed IRAs allow you to invest in assets like real estate, private companies, promissory notes, or even cryptocurrency (through certain custodians). These accounts require specialized custodians and come with additional rules and restrictions, but they offer opportunities for diversification beyond traditional securities. Just be aware that prohibited transactions—such as buying property you personally use or lending money to family members—can disqualify your entire IRA and trigger massive tax consequences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Contribution Limits and Deadlines</h3>
                <p>
                  For 2024, the standard IRA contribution limit is $7,000 for those under age 50, and $8,000 for those 50 and older (the extra $1,000 is called a "catch-up contribution"). These limits apply to your combined Traditional and Roth IRA contributions—you can't put $7,000 in each. However, you could split your contribution between the two account types, such as $4,000 to Traditional and $3,000 to Roth.
                </p>
                <p className="mt-3">
                  One helpful feature of IRA contributions is the extended deadline. Unlike 401(k) contributions that must be made by December 31st, you can make IRA contributions for a given tax year anytime up until Tax Day of the following year (typically April 15th). This gives you extra time to maximize your contributions and provides flexibility if you receive a year-end bonus or tax refund.
                </p>
                <p className="mt-3">
                  To contribute to an IRA, you need earned income—money from wages, salaries, tips, bonuses, or self-employment. Investment income like dividends, interest, or capital gains doesn't count. However, there's a special rule for non-working spouses: if you're married filing jointly, a working spouse can fund an IRA for a non-working spouse (called a spousal IRA) as long as the couple's combined earned income exceeds the total contributions to both IRAs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Early Withdrawal Rules and Exceptions</h3>
                <p>
                  Generally, you're supposed to leave your IRA money alone until age 59½. Withdraw before that, and you'll typically face a 10% early withdrawal penalty on top of regular income taxes (for Traditional IRAs) or taxes on earnings (for Roth IRAs). This penalty is designed to discourage people from raiding their retirement savings prematurely.
                </p>
                <p className="mt-3">
                  However, the IRS does provide several exceptions to this penalty. You can withdraw money penalty-free (though you may still owe taxes) for qualified first-time home purchases (up to $10,000), qualified education expenses for yourself or family members, certain unreimbursed medical expenses, health insurance premiums if you're unemployed, or if you become disabled. There's also a provision for substantially equal periodic payments based on your life expectancy, though this locks you into a rigid withdrawal schedule.
                </p>
                <p className="mt-3">
                  With Roth IRAs specifically, you can always withdraw your contributions without penalty or taxes since you already paid taxes on that money going in. It's only the earnings that face potential penalties and taxes if withdrawn early. This gives Roth IRAs a bit more flexibility as a financial safety net, though tapping them should still be a last resort given the decades of tax-free growth you'd be sacrificing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Starting Early</h3>
                <p>
                  Here's a scenario that illustrates why starting early matters so much. Let's say two people both retire at 65 with $500,000 in their IRAs, having earned an average 7% annual return. Person A started contributing $6,500 per year at age 25, contributing for 15 years ($97,500 total), then stopped and let it grow. Person B waited until age 40, contributed the same $6,500 annually for 25 years straight ($162,500 total), and ended up with less money despite contributing significantly more.
                </p>
                <p className="mt-3">
                  This is the magic of compound interest—earning returns on your returns. The earlier you start, the more time your money has to multiply. Even small contributions in your 20s can outgrow much larger contributions made later in life. This is why financial advisors often say the best time to start saving for retirement was yesterday, and the second-best time is today.
                </p>
                <p className="mt-3">
                  If you're young and think you can't afford to contribute much, start anyway. Even $100 a month adds up. Most IRA custodians let you set up automatic contributions from your checking account, making it painless—you won't even miss the money after a few months. As your income grows, increase your contributions. The habit of regular saving is often more valuable than the actual dollar amounts, especially when you're starting out.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common IRA Mistakes to Avoid</h3>
                <p>
                  One of the most common mistakes is contributing too much. Excess contributions—amounts over the annual limit—face a 6% penalty for each year they remain in the account. If you accidentally over-contribute, contact your IRA custodian immediately to withdraw the excess plus any earnings on it before your tax filing deadline (including extensions) to avoid the penalty.
                </p>
                <p className="mt-3">
                  Another frequent error is missing the income limits for Roth IRAs or the deductibility phase-outs for Traditional IRAs. If your income exceeds the thresholds and you contribute to a Roth, you'll need to remove the contribution or convert it to a Traditional IRA. If you deduct Traditional IRA contributions but aren't eligible due to income and workplace plan coverage, you'll owe back taxes plus penalties.
                </p>
                <p className="mt-3">
                  Don't forget to name beneficiaries and keep them updated. Your IRA assets pass directly to the beneficiaries you designate, bypassing your will. If you don't name beneficiaries or they're outdated (like an ex-spouse you forgot to remove), your IRA might not go to the people you intend. Review your beneficiary designations every few years or whenever you have major life changes like marriage, divorce, or the birth of children.
                </p>
                <p className="mt-3">
                  Finally, resist the temptation to be too conservative or too aggressive. Young investors who keep everything in cash or money market funds miss out on decades of growth potential. Conversely, retirees who remain 100% in stocks risk devastating losses right when they need the money. Find an appropriate asset allocation for your age and risk tolerance, and rebalance periodically to maintain it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This IRA calculator helps you compare how different account types—Traditional IRA, Roth IRA, and regular taxable accounts—might perform over time given your specific situation. The results show you not just the final balances, but how taxes affect your spending power in retirement, which is what really matters.
                </p>
                <p className="mt-3">
                  When using the calculator, be realistic with your expected return. While stocks have historically averaged around 10% annually, a more conservative 7-8% accounts for a diversified portfolio that includes bonds, especially as you near retirement. Your tax rates matter significantly—if you expect them to drop substantially in retirement, Traditional IRAs look more attractive. If you think they'll stay the same or increase, Roth IRAs might be better.
                </p>
                <p className="mt-3">
                  Pay attention to the year-by-year schedule if you want to see how your balance builds over time. This can be motivating, showing you the trajectory of your savings and helping you visualize what different contribution amounts might mean for your retirement lifestyle. Run multiple scenarios—what if you increase contributions by $100 monthly? What if you work two more years before retiring? Small changes can have surprisingly large impacts over decades.
                </p>
                <p className="mt-3">
                  Remember that this calculator makes certain simplifying assumptions. Real life involves market volatility, changing contribution amounts, potential career breaks, and tax law changes. Use these results as a planning guide rather than a precise prediction. The actual amounts may vary, but the principle holds: consistent contributions to tax-advantaged retirement accounts over many years is one of the most reliable paths to financial security in retirement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/401k" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">401(k) Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate employer-sponsored retirement savings</p>
                </Link>
                <Link href="/retirement" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">Retirement Calculator</h4>
                  <p className="text-sm text-slate-600">Plan your overall retirement income needs</p>
                </Link>
                <Link href="/investment" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">Investment Calculator</h4>
                  <p className="text-sm text-slate-600">Project investment growth over time</p>
                </Link>
                <Link href="/compound-interest" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">Compound Interest</h4>
                  <p className="text-sm text-slate-600">Understand the power of compounding returns</p>
                </Link>
                <Link href="/savings" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">Savings Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate regular savings growth</p>
                </Link>
                <Link href="/income-tax" className="block p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 mb-1">Income Tax Calculator</h4>
                  <p className="text-sm text-slate-600">Estimate your tax obligations</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy and financial planning.
          </p>
          <p className="text-center text-xs text-slate-400 mt-2">
            Disclaimer: This calculator provides estimates for educational purposes. Consult with a qualified financial advisor for personalized retirement planning advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
