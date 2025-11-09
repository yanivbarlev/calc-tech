"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, TrendingDown, AlertCircle, Info } from "lucide-react";

interface RMDResults {
  currentAge: number;
  rmdAmount: number;
  distributionPeriod: number;
  remainingBalance: number;
  tableUsed: string;
}

interface ProjectionEntry {
  age: number;
  distributionPeriod: number;
  rmdAmount: number;
  endBalance: number;
}

// IRS Uniform Lifetime Table (for most people)
const uniformLifetimeTable: { [key: number]: number } = {
  72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
  80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
  88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
  96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2,
  104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5,
  111: 3.4, 112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5,
  119: 2.3, 120: 2.0
};

// Simplified Joint Life Table (spouse 10+ years younger)
const getJointLifeExpectancy = (age: number, spouseAge: number): number => {
  const ageDiff = age - spouseAge;
  if (ageDiff < 10) return uniformLifetimeTable[age] || 2.0;

  // Simplified calculation - actual table is more complex
  const baseExpectancy = uniformLifetimeTable[age] || 2.0;
  const adjustment = Math.min(ageDiff - 10, 20) * 0.5;
  return baseExpectancy + adjustment;
};

export default function RMDCalculator() {
  const currentYear = new Date().getFullYear();

  // Input states
  const [birthYear, setBirthYear] = useState<string>("1951");
  const [rmdYear, setRmdYear] = useState<string>(currentYear.toString());
  const [accountBalance, setAccountBalance] = useState<string>("500000");
  const [hasSpouseBeneficiary, setHasSpouseBeneficiary] = useState<string>("no");
  const [spouseBirthYear, setSpouseBirthYear] = useState<string>("1951");
  const [returnRate, setReturnRate] = useState<string>("5");

  // Results states
  const [results, setResults] = useState<RMDResults | null>(null);
  const [projections, setProjections] = useState<ProjectionEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showProjections, setShowProjections] = useState(false);

  const calculate = () => {
    const birthYearNum = parseInt(birthYear) || 1951;
    const rmdYearNum = parseInt(rmdYear) || currentYear;
    const balance = parseFloat(accountBalance) || 500000;
    const rate = parseFloat(returnRate) || 5;
    const hasSpouse = hasSpouseBeneficiary === "yes";
    const spouseBirthYearNum = parseInt(spouseBirthYear) || 1951;

    // Calculate current age
    const age = rmdYearNum - birthYearNum;

    // Determine which table to use
    let distributionPeriod: number;
    let tableUsed: string;

    if (hasSpouse) {
      const spouseAge = rmdYearNum - spouseBirthYearNum;
      const ageDifference = age - spouseAge;

      if (ageDifference >= 10) {
        distributionPeriod = getJointLifeExpectancy(age, spouseAge);
        tableUsed = "Joint Life and Last Survivor Expectancy Table";
      } else {
        distributionPeriod = uniformLifetimeTable[age] || 2.0;
        tableUsed = "Uniform Lifetime Table";
      }
    } else {
      distributionPeriod = uniformLifetimeTable[age] || 2.0;
      tableUsed = "Uniform Lifetime Table";
    }

    // Calculate RMD
    const rmdAmount = balance / distributionPeriod;
    const remainingBalance = balance - rmdAmount;

    setResults({
      currentAge: age,
      rmdAmount,
      distributionPeriod,
      remainingBalance,
      tableUsed
    });

    // Generate projections for future years
    generateProjections(age, balance, rate, hasSpouse, rmdYearNum - spouseBirthYearNum);

    setHasCalculated(true);
  };

  const generateProjections = (startAge: number, startBalance: number, rate: number, hasSpouse: boolean, spouseAge: number) => {
    const projectionList: ProjectionEntry[] = [];
    let currentBalance = startBalance;
    const rateDecimal = rate / 100;

    for (let i = 0; i < 46; i++) {
      const age = startAge + i;

      // Get distribution period
      let distributionPeriod: number;
      if (hasSpouse) {
        const currentSpouseAge = spouseAge + i;
        const ageDiff = age - currentSpouseAge;
        distributionPeriod = ageDiff >= 10
          ? getJointLifeExpectancy(age, currentSpouseAge)
          : uniformLifetimeTable[age] || 2.0;
      } else {
        distributionPeriod = uniformLifetimeTable[age] || 2.0;
      }

      // Calculate RMD for this year
      const rmdAmount = currentBalance / distributionPeriod;

      // Calculate end balance after RMD and growth
      const afterRMD = currentBalance - rmdAmount;
      const endBalance = afterRMD * (1 + rateDecimal);

      projectionList.push({
        age,
        distributionPeriod,
        rmdAmount,
        endBalance
      });

      currentBalance = endBalance;

      // Stop if balance is depleted
      if (endBalance <= 0) break;
    }

    setProjections(projectionList);
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

  const formatNumber = (value: number, decimals: number = 1) => {
    return value.toFixed(decimals);
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
            <DollarSign className="h-4 w-4" />
            Retirement Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            RMD Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your Required Minimum Distribution from retirement accounts using IRS life expectancy tables
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  RMD Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Year of Birth
                  </label>
                  <Input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="1951"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    RMD Year
                  </label>
                  <select
                    value={rmdYear}
                    onChange={(e) => setRmdYear(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Account Balance (Dec 31, Prior Year)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={accountBalance}
                      onChange={(e) => setAccountBalance(e.target.value)}
                      className="pl-7"
                      placeholder="500000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Spouse as Sole Beneficiary?
                  </label>
                  <select
                    value={hasSpouseBeneficiary}
                    onChange={(e) => setHasSpouseBeneficiary(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {hasSpouseBeneficiary === "yes" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Spouse's Year of Birth
                    </label>
                    <Input
                      type="number"
                      value={spouseBirthYear}
                      onChange={(e) => setSpouseBirthYear(e.target.value)}
                      placeholder="1951"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Annual Return (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={returnRate}
                      onChange={(e) => setReturnRate(e.target.value)}
                      className="pr-7"
                      placeholder="5"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate RMD
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
                      <TrendingDown className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Required Minimum Distribution</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.rmdAmount)}</p>
                    <p className="text-emerald-100">Amount you must withdraw for {rmdYear}</p>
                  </div>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600 mb-1">Your Age in {rmdYear}</p>
                        <p className="text-2xl font-bold text-slate-800">{results.currentAge}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600 mb-1">Distribution Period</p>
                        <p className="text-2xl font-bold text-slate-800">{formatNumber(results.distributionPeriod)} years</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Secondary Results */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Account Balance After RMD
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-emerald-600 mb-2">
                        {formatCurrency(results.remainingBalance)}
                      </p>
                      <p className="text-sm text-slate-600">
                        Remaining balance before growth
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Info className="h-5 w-5 text-emerald-600" />
                        IRS Table Used
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold text-slate-800 mb-2">
                        {results.tableUsed}
                      </p>
                      <p className="text-xs text-slate-600">
                        Based on your age and beneficiary status
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Important Notice */}
                <Card className="border-2 border-amber-200 bg-amber-50 rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">Important Deadline</h4>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Your RMD must be withdrawn by December 31, {rmdYear}. Missing this deadline can result in a 25% penalty on the amount not withdrawn (reducible to 10% if corrected within two years). First-time RMDs can be delayed until April 1 of the following year.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Projections Toggle */}
                <div className="text-center">
                  <Button
                    onClick={() => setShowProjections(!showProjections)}
                    variant="outline"
                    className="gap-2"
                  >
                    {showProjections ? "Hide" : "Show"} Future Projections
                  </Button>
                </div>

                {/* Projections Table */}
                {showProjections && projections.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="text-xl">46-Year RMD Projections</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">
                        Assuming {returnRate}% annual return and annual RMD withdrawals
                      </p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-slate-700">Age</th>
                              <th className="px-4 py-3 text-left font-semibold text-slate-700">Distribution Period</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Annual RMD</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Year-End Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {projections.map((entry, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="px-4 py-3 font-medium text-slate-800">{entry.age}</td>
                                <td className="px-4 py-3 text-slate-600">{formatNumber(entry.distributionPeriod)}</td>
                                <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                                  {formatCurrency(entry.rmdAmount)}
                                </td>
                                <td className="px-4 py-3 text-right text-slate-800 font-medium">
                                  {formatCurrency(entry.endBalance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate Your RMD
                </h3>
                <p className="text-slate-500">
                  Enter your details and click Calculate to see your required minimum distribution
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Required Minimum Distributions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Are Required Minimum Distributions?</h3>
                <p className="mb-4">
                  Required Minimum Distributions represent the minimum amount you must withdraw annually from certain retirement accounts once you reach a specific age. The IRS created this requirement to ensure that tax-advantaged retirement savings don't remain sheltered indefinitely—eventually, Uncle Sam wants his cut of those pre-tax dollars you've been stashing away.
                </p>
                <p className="mb-4">
                  Think of RMDs as the government's way of saying "time's up" on your tax deferral strategy. You've enjoyed years, maybe decades, of tax-free growth. Now it's time to start paying the piper. The beauty of the system, though, is that it's designed to gradually draw down your accounts over your expected lifetime rather than forcing massive withdrawals all at once.
                </p>
                <p>
                  The calculation itself uses IRS life expectancy tables, which might sound morbid but are actually quite practical. These tables estimate how many years you're statistically expected to live based on your current age. Your RMD is then calculated by dividing your account balance by this distribution period. As you age, the distribution period decreases, meaning you'll need to withdraw a larger percentage of your remaining balance each year.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Do RMDs Begin?</h3>
                <p className="mb-4">
                  Thanks to the SECURE Act 2.0 passed in 2022, the age for beginning RMDs has shifted upward. If you were born in 1951 or later, you don't need to start taking RMDs until age 73. That's an improvement from the previous age 72 requirement. Looking ahead, if you reach age 72 after December 31, 2032, that starting age bumps up again to 75.
                </p>
                <p className="mb-4">
                  Here's where timing gets a bit tricky: your very first RMD has some flexibility. You can delay it until April 1 of the year following the year you turn 73. That sounds generous, but there's a catch—if you wait, you'll need to take two distributions in that second year (one for the prior year and one for the current year). This double withdrawal might push you into a higher tax bracket, so most financial advisors suggest taking your first RMD by December 31 of the year you turn 73.
                </p>
                <p>
                  Every RMD after that first one follows a strict schedule: you must complete the withdrawal by December 31 each year. Miss that deadline, and you're looking at penalties that'll make you wish you'd set a calendar reminder.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 mt-4">Which Accounts Require RMDs?</h4>
                <p className="mb-3">
                  Not all retirement accounts play by the same rules when it comes to RMDs. Traditional IRAs, SEP IRAs, and SIMPLE IRAs all require minimum distributions. The same goes for most employer-sponsored plans like 401(k)s, 403(b)s, and 457(b) plans.
                </p>
                <p className="mb-3">
                  Roth IRAs stand apart as the exception—they don't require distributions during the owner's lifetime. That's one of their major advantages. Your Roth funds can continue growing tax-free for as long as you live. Of course, designated Roth accounts within 401(k) or 403(b) plans do have RMD requirements, though you can avoid this by rolling them over to a Roth IRA.
                </p>
                <p>
                  If you're still working at age 73 and don't own 5% or more of the company, you might be able to delay RMDs from your current employer's 401(k). This "still working" exception doesn't apply to IRAs or plans from previous employers, though.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How RMDs Are Calculated</h3>
                <p className="mb-4">
                  The calculation formula itself is refreshingly straightforward: divide your account balance as of December 31 of the prior year by your life expectancy factor from the appropriate IRS table. That's it. No complex algebra or mysterious coefficients.
                </p>
                <p className="mb-4">
                  Most people use the Uniform Lifetime Table, which assumes you have a beneficiary exactly 10 years younger than you (even if you don't). This assumption generally results in a longer distribution period and smaller required withdrawals. It's the IRS being somewhat generous with their assumptions.
                </p>
                <p className="mb-4">
                  However, if your sole beneficiary is your spouse and they're more than 10 years younger than you, you'll use the Joint Life and Last Survivor Expectancy Table instead. This table provides even longer distribution periods because statistically, one of you is likely to live quite a bit longer. The result? Smaller RMDs and more money staying in your account.
                </p>
                <p>
                  The distribution period decreases each year as you age. At 73, you might have a distribution period of 26.5 years, meaning you'd withdraw about 3.77% of your balance. By age 80, that period drops to 20.2 years, requiring roughly 4.95% annually. The percentages keep climbing as the years go by.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 mt-4">Multiple Accounts, Multiple Calculations</h4>
                <p className="mb-3">
                  Here's something that confuses people: if you have multiple IRAs, you must calculate the RMD for each one separately. The good news is you can total those amounts and withdraw the sum from any combination of your IRAs. You don't need to take a specific amount from each individual account.
                </p>
                <p>
                  The rules differ for 401(k)s and other employer plans, though. You must calculate and withdraw the RMD from each plan separately. You can't aggregate them like you can with IRAs. This distinction matters if you've accumulated several 401(k)s from different employers over your career.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Cost of Missing Your RMD</h3>
                <p className="mb-4">
                  The IRS doesn't mess around with RMD penalties. Originally set at a punishing 50% of the amount you failed to withdraw, the penalty was reduced to 25% under the SECURE Act 2.0. That's still substantial—if you were supposed to withdraw $10,000 and didn't, you'd owe $2,500 in penalties on top of regular income taxes.
                </p>
                <p className="mb-4">
                  There's a silver lining: if you catch the mistake and correct it within two years, that 25% penalty drops to 10%. The IRS basically gives you a discount for fixing your error relatively quickly. You'll need to file Form 5329 to report the missed RMD and pay the penalty.
                </p>
                <p>
                  Prevention beats correction every time. Set up automatic withdrawals if your custodian offers them, or at minimum, set multiple calendar reminders starting in October each year. Don't leave this to the last minute—custodians get swamped with RMD requests in December, and processing delays could cause you to miss the deadline.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Implications of RMDs</h3>
                <p className="mb-4">
                  RMDs count as ordinary income for tax purposes. They're added to your other income for the year and taxed at your marginal rate. This can create some uncomfortable situations. Maybe you don't need the money, but taking it out pushes you into a higher tax bracket or triggers taxes on your Social Security benefits.
                </p>
                <p className="mb-4">
                  The tax bite is unavoidable with traditional retirement accounts—that's the fundamental trade-off you made when you got the upfront deduction years ago. However, you do have some control over the timing and amount beyond the minimum. You can always take out more than the required amount if it makes sense for your tax situation.
                </p>
                <p>
                  Some retirees in lower tax brackets intentionally take larger distributions in their early retirement years, before RMDs begin. This strategy, sometimes called "filling up the bracket," converts more money at lower rates and can reduce future RMDs. It's particularly effective if you expect to be in a higher bracket later due to pension income, Social Security, or required distributions themselves.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 mt-4">Qualified Charitable Distributions</h4>
                <p className="mb-3">
                  Here's a clever workaround if you're charitably inclined: Qualified Charitable Distributions (QCDs) let you donate up to $100,000 per year directly from your IRA to qualified charities. These distributions count toward your RMD but aren't included in your taxable income.
                </p>
                <p>
                  For many retirees, especially those who don't itemize deductions, QCDs offer a better tax benefit than taking the RMD and then donating the money. You're satisfying your requirement while reducing your adjusted gross income, which can have ripple effects on Medicare premiums, Social Security taxation, and other income-tested benefits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Planning Strategies Around RMDs</h3>
                <p className="mb-4">
                  Smart retirement planning involves thinking about RMDs long before they become mandatory. Roth conversions during lower-income years can reduce the size of your traditional IRA, leading to smaller RMDs down the road. Yes, you'll pay taxes on the conversion amount now, but you're potentially avoiding higher taxes later.
                </p>
                <p className="mb-4">
                  The years between retirement and age 73 present a prime opportunity for strategic Roth conversions. You're no longer earning a salary pushing you into high brackets, but you haven't started RMDs yet. Many financial planners recommend converting enough each year to "fill up" your current tax bracket without spilling into the next one.
                </p>
                <p className="mb-4">
                  Asset location matters too. Keep in mind that your RMD is based on the total account value, regardless of what's invested in what. If you need to sell investments to meet your RMD, you might prefer to sell appreciated stocks from your taxable account for long-term capital gains treatment rather than pulling everything from the IRA at ordinary income rates.
                </p>
                <p>
                  Some people find that their RMDs exceed their spending needs, especially if they have pensions or other income sources. In this case, consider investing the after-tax portion in a taxable brokerage account. While you lose the tax shelter, you maintain market exposure and can pass these assets to heirs with a step-up in basis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Life Expectancy Tables Explained</h3>
                <p className="mb-4">
                  The IRS updates life expectancy tables periodically to reflect increasing longevity. The most recent update in 2022 reflected the reality that people are living longer, which means distribution periods increased and RMDs decreased slightly. If you're taking RMDs, this update probably saved you a bit in taxes.
                </p>
                <p className="mb-4">
                  The Uniform Lifetime Table is designed for single individuals and married people whose spouses aren't more than 10 years younger. It's called "uniform" because it uses the same life expectancy factors regardless of your actual marital status, assuming a hypothetical beneficiary exactly 10 years younger than you.
                </p>
                <p>
                  The Joint Life and Last Survivor Expectancy Table applies when your sole beneficiary is your spouse and they're more than a decade younger. This table recognizes that with a significant age gap, the younger spouse's life expectancy matters for distribution planning. The larger the age difference, the longer the combined life expectancy, and the smaller your RMD.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common RMD Mistakes to Avoid</h3>
                <p className="mb-4">
                  One of the most frequent errors is calculating based on the current year's ending balance rather than the previous December 31 balance. Your RMD for 2024 should be based on your account value on December 31, 2023. Using the wrong balance can lead to under-withdrawing, which triggers penalties.
                </p>
                <p className="mb-4">
                  Another mistake is forgetting about inherited IRAs. If you've inherited a traditional IRA, you might have RMD requirements even if you're under 73. The rules for inherited accounts are complex and changed significantly with the SECURE Act, so double-check your obligations if you're a beneficiary.
                </p>
                <p className="mb-4">
                  Some people also mess up the timing of their first RMD. Remember, you can delay that initial distribution until April 1 of the following year, but you'll still need to take your second RMD by December 31 of that same year. Taking two distributions in one year might not be the smartest tax move.
                </p>
                <p>
                  Don't forget to adjust your calculations if you turn 73 mid-year. Your RMD for that year is still due (by December 31 or April 1 of the next year), even though you weren't 73 for the entire year. The IRS doesn't prorate it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Working with Financial Professionals</h3>
                <p className="mb-4">
                  While RMD calculations aren't rocket science, the broader tax and retirement planning implications can be complex. A qualified financial advisor or tax professional can help you develop a comprehensive withdrawal strategy that considers RMDs alongside Social Security timing, pension decisions, health care costs, and estate planning goals.
                </p>
                <p className="mb-4">
                  Many brokerage firms and IRA custodians will calculate your RMD for you and even set up automatic distributions. That's convenient, but don't assume they're optimizing for your overall tax situation. They're calculating what you must take, not necessarily what you should take or how you should coordinate multiple accounts.
                </p>
                <p>
                  Tax planning is particularly crucial in the years leading up to RMDs. A good tax advisor can model different scenarios—perhaps delaying Social Security while doing Roth conversions, or strategically drawing down traditional IRAs before RMDs begin. These decisions can have six-figure implications over a retirement that might span 30 years or more.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Final Thoughts on RMD Planning</h3>
                <p className="mb-4">
                  Required Minimum Distributions represent a significant shift in your relationship with your retirement accounts. For decades, you've been accumulating and deferring taxes. Now you're required to systematically draw down those balances and face the tax consequences.
                </p>
                <p className="mb-4">
                  The good news is that with proper planning, RMDs don't have to be a burden. They can be incorporated into a thoughtful retirement income strategy that balances tax efficiency, spending needs, legacy goals, and investment management. Start planning before you're required to take distributions, understand your options, and don't be afraid to seek professional help.
                </p>
                <p>
                  Remember that this calculator provides estimates based on IRS tables and your inputs. Always verify your specific RMD amount with your account custodian and consult with tax professionals about your particular situation. The rules are subject to change, and individual circumstances vary widely. What works for one retiree might be completely inappropriate for another with different income sources, tax situations, and financial goals.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl">Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      Retirement Calculator
                    </div>
                    <div className="text-sm text-slate-600">Plan your retirement savings</div>
                  </div>
                </Link>
                <Link href="/401k" className="flex items-center gap-3 p-4 rounded-lg border-2 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <TrendingDown className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      401k Calculator
                    </div>
                    <div className="text-sm text-slate-600">Calculate 401k growth</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy.
          </p>
          <p className="text-center text-xs text-slate-400 mt-2">
            Based on IRS Publication 590-B. For U.S. residents only. Consult a tax professional for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
