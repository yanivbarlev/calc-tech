"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, PiggyBank, ArrowLeft, DollarSign, TrendingUp, Percent, Calendar } from "lucide-react";

interface SavingsResults {
  endBalance: number;
  initialDeposit: number;
  totalContributions: number;
  totalInterest: number;
  percentInitial: number;
  percentContributions: number;
  percentInterest: number;
}

interface AccumulationEntry {
  year: number;
  startingBalance: number;
  annualContribution: number;
  interestEarned: number;
  endingBalance: number;
}

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<string>("20000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [interestRate, setInterestRate] = useState<string>("4.5");
  const [yearsToSave, setYearsToSave] = useState<string>("10");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12"); // Monthly
  const [contributionIncrease, setContributionIncrease] = useState<string>("0");

  const [results, setResults] = useState<SavingsResults | null>(null);
  const [schedule, setSchedule] = useState<AccumulationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateSavings = () => {
    const initial = parseFloat(initialDeposit) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(yearsToSave) || 0;
    const frequency = parseFloat(compoundingFrequency) || 12;
    const increase = parseFloat(contributionIncrease) || 0;

    // Calculate future value with compound interest
    const annualRate = rate / 100;
    const periodsPerYear = frequency;
    const totalPeriods = years * periodsPerYear;
    const periodicRate = annualRate / periodsPerYear;
    const contributionsPerYear = 12; // Monthly contributions

    let balance = initial;
    let totalContributions = 0;
    const yearlySchedule: AccumulationEntry[] = [];

    // Calculate year by year to track accumulation
    for (let year = 1; year <= years; year++) {
      const startBalance = balance;

      // Calculate annual contribution for this year (with increase from previous year)
      const yearMultiplier = Math.pow(1 + increase / 100, year - 1);
      const currentMonthlyContribution = monthly * yearMultiplier;
      const annualContribution = currentMonthlyContribution * contributionsPerYear;

      // Add contributions throughout the year with compound interest
      // Using future value of series formula adjusted for monthly contributions
      for (let month = 1; month <= 12; month++) {
        const monthsRemaining = (years - year) * 12 + (12 - month);
        const periodsForThisContribution = monthsRemaining * (periodsPerYear / 12);

        // Add contribution
        balance += currentMonthlyContribution;
        totalContributions += currentMonthlyContribution;

        // Apply interest for this period
        const periodsInMonth = periodsPerYear / 12;
        for (let i = 0; i < periodsInMonth; i++) {
          balance *= (1 + periodicRate);
        }
      }

      yearlySchedule.push({
        year,
        startingBalance: startBalance,
        annualContribution,
        interestEarned: balance - startBalance - annualContribution,
        endingBalance: balance
      });
    }

    const endBalance = balance;
    const totalInterest = endBalance - initial - totalContributions;

    // Calculate percentages
    const percentInitial = (initial / endBalance) * 100;
    const percentContributions = (totalContributions / endBalance) * 100;
    const percentInterest = (totalInterest / endBalance) * 100;

    setResults({
      endBalance,
      initialDeposit: initial,
      totalContributions,
      totalInterest,
      percentInitial,
      percentContributions,
      percentInterest
    });

    setSchedule(yearlySchedule);
    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateSavings();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(1) + '%';
  };

  const getCompoundingLabel = (freq: string) => {
    const labels: { [key: string]: string } = {
      '1': 'Annually',
      '2': 'Semi-annually',
      '4': 'Quarterly',
      '12': 'Monthly',
      '24': 'Semi-monthly',
      '26': 'Bi-weekly',
      '52': 'Weekly',
      '365': 'Daily'
    };
    return labels[freq] || 'Monthly';
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
            <PiggyBank className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Savings Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate how your savings will grow over time with compound interest and regular contributions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Savings Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Initial Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      className="pl-7"
                      placeholder="20000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="pl-7"
                      placeholder="500"
                    />
                  </div>
                </div>

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
                      className="pr-7"
                      placeholder="4.5"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Years to Save
                  </label>
                  <Input
                    type="number"
                    value={yearsToSave}
                    onChange={(e) => setYearsToSave(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="24">Semi-monthly</option>
                    <option value="26">Bi-weekly</option>
                    <option value="52">Weekly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Contribution Increase (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={contributionIncrease}
                      onChange={(e) => setContributionIncrease(e.target.value)}
                      className="pr-7"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Optional yearly increase in contribution amount
                  </p>
                </div>

                <Button
                  onClick={calculateSavings}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Savings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* End Balance Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Total Savings After {yearsToSave} Years</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.endBalance)}</p>
                    <p className="text-emerald-100">
                      Compounded {getCompoundingLabel(compoundingFrequency)}
                    </p>
                  </div>
                </Card>

                {/* Breakdown Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Savings Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Initial Deposit</span>
                        <span className="font-semibold">{formatCurrency(results.initialDeposit)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>({formatPercent(results.percentInitial)} of total)</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-slate-600">Total Contributions</span>
                        <span className="font-semibold">{formatCurrency(results.totalContributions)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>({formatPercent(results.percentContributions)} of total)</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-slate-600">Total Interest Earned</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>({formatPercent(results.percentInterest)} of total)</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Summary Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Money You Put In</span>
                        <span className="font-semibold">
                          {formatCurrency(results.initialDeposit + results.totalContributions)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Money You Earned</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Average Annual Return</span>
                        <span className="font-bold">{interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Growth</span>
                        <span className="font-bold text-lg">
                          {formatPercent((results.totalInterest / (results.initialDeposit + results.totalContributions)) * 100)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Accumulation Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-emerald-600" />
                        Year-by-Year Accumulation
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSchedule(!showSchedule)}
                      >
                        {showSchedule ? 'Hide' : 'Show'} Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  {showSchedule && (
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-slate-200">
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Starting Balance</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Contributions</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Interest</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Ending Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((entry) => (
                              <tr key={entry.year} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-3 px-4">{entry.year}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.startingBalance)}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.annualContribution)}</td>
                                <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(entry.interestEarned)}</td>
                                <td className="py-3 px-4 text-right font-semibold">{formatCurrency(entry.endingBalance)}</td>
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
                  Ready to Calculate Your Savings
                </h3>
                <p className="text-slate-500">
                  Enter your savings details and click "Calculate Savings" to see how your money will grow
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Building Your Financial Future Through Savings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding the Power of Compound Interest</h3>
                <p>
                  Here's something that might surprise you: the real magic of saving isn't just about how much you put away—it's about giving your money time to grow on itself. When you earn interest on your savings, that interest starts earning its own interest. This snowball effect, known as compound interest, becomes increasingly powerful the longer you let it work.
                </p>
                <p className="mt-3">
                  Think of it this way. If you save $20,000 today and add just $500 each month for ten years at a 4.5% annual return, you won't end up with $80,000 (which is what you'd have if you just added up all your contributions). Instead, you'll have over $92,000. That extra $12,000 didn't come from anywhere except the accumulated interest earning more interest over time.
                </p>
                <p className="mt-3">
                  Albert Einstein supposedly called compound interest "the eighth wonder of the world"—and whether he actually said it or not, the sentiment rings true. The person who understands it earns it; the person who doesn't pays it. When you're saving, you want to be on the earning side of that equation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Where Should You Keep Your Savings?</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Traditional Savings Accounts</h4>
                <p>
                  Most people start with a regular savings account at their bank, and there's good reason for that. These accounts are incredibly safe—the FDIC insures them up to $250,000 per depositor, per bank. That means even if your bank fails tomorrow, you won't lose your money (up to that limit).
                </p>
                <p className="mt-3">
                  The downside? Traditional savings accounts at brick-and-mortar banks typically offer pretty minimal interest rates. We're talking somewhere in the range of 0.01% to 0.10% annually at many major banks. At those rates, you're barely keeping pace with inflation, let alone growing your wealth. Still, for money you need to access quickly or for your emergency fund, the security and immediate availability make these accounts worth considering.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">High-Yield Savings Accounts</h4>
                <p>
                  Online banks have changed the game considerably. Without the overhead costs of maintaining physical branches, these institutions can offer interest rates that are sometimes 10 to 20 times higher than traditional banks. It's not uncommon to find high-yield savings accounts offering 4% or even 5% APY during periods of higher interest rates.
                </p>
                <p className="mt-3">
                  These accounts still carry FDIC insurance, so they're just as safe as traditional savings accounts. The main trade-off is that you usually can't walk into a branch to deposit or withdraw cash. Most transactions happen through electronic transfers, which might take a day or two to process. For most people's savings goals, that's a small inconvenience for significantly better returns.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Money Market Accounts</h4>
                <p>
                  Money market accounts sit somewhere between checking and savings accounts. They typically offer higher interest rates than traditional savings accounts (though often less than high-yield savings), and they come with some checking account features like check-writing privileges or a debit card.
                </p>
                <p className="mt-3">
                  The catch is that these accounts usually require higher minimum balances—sometimes $1,000 to $10,000 to open or to earn the advertised interest rate. If you drop below that minimum, you might face fees or see your interest rate decrease substantially. They're a solid option if you have a larger emergency fund or short-term savings goal and want easy access to your money.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Certificates of Deposit (CDs)</h4>
                <p>
                  If you're certain you won't need access to your money for a specific period, CDs can offer higher interest rates than savings accounts. You agree to leave your money untouched for a set term—anywhere from three months to five years—and in exchange, the bank gives you a guaranteed, usually higher, interest rate.
                </p>
                <p className="mt-3">
                  The key word there is "guaranteed." Unlike savings accounts where rates can fluctuate, your CD rate is locked in. That's great if rates are falling, but not so great if they're rising. And if you need your money before the term ends? You'll typically pay an early withdrawal penalty that eats into your interest earnings or even your principal in some cases.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Much Should You Be Saving?</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Emergency Fund Foundation</h4>
                <p>
                  Before you think about any other financial goal, you need an emergency fund. Life has a way of throwing curveballs—your car breaks down, you need an unexpected medical procedure, or you lose your job. Without savings to fall back on, these situations force you to rely on credit cards or loans, which only makes things worse.
                </p>
                <p className="mt-3">
                  Financial advisors typically recommend keeping three to six months' worth of living expenses in an easily accessible account. If you spend $3,000 per month on rent, food, utilities, and other essentials, you're looking at $9,000 to $18,000 in your emergency fund. That might sound daunting if you're starting from zero, but here's the thing—start with a smaller goal first.
                </p>
                <p className="mt-3">
                  Many experts suggest building up to $1,000 or $2,000 as your first milestone. That's enough to handle most minor emergencies without derailing your finances. Once you've got that cushion, gradually work your way up to the full three to six months. The exact amount depends on your situation—if you have variable income or work in a less stable industry, lean toward the higher end.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The 10% Rule</h4>
                <p>
                  A common guideline is to save at least 10% of your gross income. If you're earning $50,000 annually, that's $5,000 per year or about $417 per month going into savings. It's a straightforward rule that works for many people, though it's not a one-size-fits-all solution.
                </p>
                <p className="mt-3">
                  If you're just starting out or dealing with high-interest debt, 10% might not be realistic right away—and that's okay. Start with what you can, even if it's just 2% or 3%, and increase it gradually. On the flip side, if you're earning a comfortable income and have manageable expenses, you might want to push beyond 10%, especially if you have specific goals like early retirement or buying a home.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The 50-30-20 Budget Framework</h4>
                <p>
                  This approach divides your after-tax income into three categories: 50% for needs (housing, food, utilities, transportation), 30% for wants (dining out, entertainment, hobbies), and 20% for savings and debt repayment. It's more flexible than strict budgeting methods and gives you a clear framework for balancing current enjoyment with future security.
                </p>
                <p className="mt-3">
                  The beauty of this system is its simplicity. You don't need to track every single expense or feel guilty about spending on things you enjoy. As long as your essential expenses stay around half your income and you're putting a fifth toward your financial future, you're in decent shape. Of course, if you live in an expensive city where housing eats up more than 50% of your income, you might need to adjust these percentages.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making Your Savings Work Harder</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Automate Your Savings</h4>
                <p>
                  One of the best things you can do for your financial health is to make saving automatic. Set up a recurring transfer from your checking account to your savings account right after each paycheck hits. When the money moves automatically, you never have to make the decision to save—it just happens.
                </p>
                <p className="mt-3">
                  This approach leverages a psychological principle: we tend to adapt our spending to whatever money we can see in our checking account. If $500 gets transferred to savings before you really "see" it, you'll naturally adjust your spending to the amount that remains. It's painless saving, and it's remarkably effective.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Increase Contributions Over Time</h4>
                <p>
                  As your income grows through raises, promotions, or career changes, resist the temptation to inflate your lifestyle proportionally. Instead, direct at least half of any pay increase toward your savings. If you get a $200 monthly raise, bump up your automatic savings by $100.
                </p>
                <p className="mt-3">
                  This strategy, sometimes called "lifestyle creep prevention," lets you enjoy some benefits from your increased earnings while significantly accelerating your savings growth. Over time, even modest annual increases in your contribution rate can make an enormous difference in your final balance.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Take Advantage of Windfalls</h4>
                <p>
                  Tax refunds, work bonuses, inheritances, or monetary gifts—these windfalls present perfect opportunities to boost your savings. While it's fine to enjoy a portion of unexpected money, committing at least 50% to 75% of windfalls to your savings can give you a significant leap forward without affecting your regular budget.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Inflation Challenge</h3>
                <p>
                  Here's something important to keep in mind: inflation is constantly eroding the purchasing power of your money. If inflation runs at 3% annually and your savings account earns 0.5%, you're actually losing about 2.5% of your purchasing power each year. That $10,000 in your account will still show as $10,000 next year, but it'll buy less than it does today.
                </p>
                <p className="mt-3">
                  This is why finding accounts with competitive interest rates matters so much. At minimum, you want your savings rate to keep pace with inflation. Ideally, you want it to exceed inflation by a meaningful margin. During periods when interest rates are high, this is achievable with savings accounts. When rates are low, you might need to consider other options like I Bonds, which are government savings bonds specifically designed to protect against inflation.
                </p>
                <p className="mt-3">
                  That said, remember that your emergency fund and short-term savings goals should prioritize safety and accessibility over maximizing returns. Once you've got those bases covered, money you won't need for several years might be better suited for investment accounts where you have the potential for higher returns—though with correspondingly higher risk.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Savings Accounts Aren't Enough</h3>
                <p>
                  Savings accounts excel at preserving capital and providing liquidity, but they're not ideal for every financial goal. If you're saving for retirement that's decades away, or building wealth for long-term goals, the modest returns from even high-yield savings accounts probably won't get you where you need to go.
                </p>
                <p className="mt-3">
                  Historically, the stock market has returned around 10% annually over long periods, though with significant year-to-year volatility. For money you won't need for at least five to ten years, investing in a diversified portfolio of stocks and bonds typically offers better growth potential than savings accounts. The key is matching the risk level of your investments to your time horizon—the longer you have until you need the money, the more volatility you can generally tolerate.
                </p>
                <p className="mt-3">
                  A balanced approach often works best: keep three to six months of expenses in a savings account for emergencies, hold money for short-term goals (one to three years) in high-yield savings or CDs, and invest the rest in retirement accounts or taxable investment accounts based on your timeline and risk tolerance. This layered strategy gives you both security and growth potential.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Savings Mistakes to Avoid</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Keeping Too Much in Low-Interest Accounts</h4>
                <p>
                  While emergency funds belong in easily accessible savings accounts, keeping all your money there—especially if it's earning minimal interest—means you're missing out on better returns elsewhere. Once your emergency fund is fully funded, consider moving additional savings into higher-yield accounts or investments depending on your timeline for needing the money.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Not Shopping Around for Better Rates</h4>
                <p>
                  Many people open a savings account at their primary bank and never look elsewhere. That's convenient, but it's often costly. Interest rates vary dramatically between institutions, and moving your savings to a high-yield account at an online bank could literally earn you hundreds or thousands of dollars more over time with zero additional effort.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Dipping Into Savings for Non-Emergencies</h4>
                <p>
                  Your savings account isn't a slush fund for impulse purchases or lifestyle inflation. If you're regularly transferring money back from savings to checking to cover discretionary spending, you're sabotaging your progress. Be honest about what constitutes an emergency, and if you want money set aside for vacation or a new gadget, create a separate sinking fund for those purposes.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Ignoring Account Fees</h4>
                <p>
                  Some savings accounts charge monthly maintenance fees if your balance drops below a certain threshold or if you make more than a specific number of withdrawals. These fees can eat into your interest earnings or even exceed them if your balance is small. Read the fine print and choose accounts without fees, or make sure you can easily meet the requirements to avoid them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Psychology of Saving</h3>
                <p>
                  Saving money is as much a mental game as it is a mathematical one. You can know all the right numbers and strategies, but if you can't stick with the plan, they won't help you. This is why understanding your own psychology around money matters so much.
                </p>
                <p className="mt-3">
                  Some people are motivated by watching their balance grow—they check their savings account regularly and get a genuine thrill from seeing the number increase. Others find that constant checking makes them anxious or tempted to spend. If you're in the latter camp, set up automatic contributions and then try to forget about the account for months at a time. Let it grow in the background while you focus on other things.
                </p>
                <p className="mt-3">
                  Setting specific, meaningful goals also helps tremendously. "Save more money" is vague and uninspiring. "Save $15,000 for a down payment on a house by next December" gives you a concrete target to work toward. Break big goals into smaller milestones and celebrate when you hit them. Positive reinforcement makes the whole process more sustainable.
                </p>
                <p className="mt-3">
                  Finally, remember that personal finance is personal. What works for someone else might not work for you, and that's perfectly fine. The best savings strategy is the one you'll actually follow, even if it's not the theoretically optimal approach. Start where you are, use what you have, and do what you can—your future self will thank you for it.
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
