"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowLeft, DollarSign, Calendar, Percent, Clock } from "lucide-react";

interface FutureValueResults {
  futureValue: number;
  presentValue: number;
  totalDeposits: number;
  totalInterest: number;
  numberOfPeriods: number;
}

interface ScheduleEntry {
  period: number;
  startingBalance: number;
  deposit: number;
  interest: number;
  endingBalance: number;
}

export default function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState<string>("10000");
  const [periodicDeposit, setPeriodicDeposit] = useState<string>("500");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [numberOfPeriods, setNumberOfPeriods] = useState<string>("120");
  const [depositTiming, setDepositTiming] = useState<"end" | "beginning">("end");

  const [results, setResults] = useState<FutureValueResults | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateFutureValue = () => {
    const pv = parseFloat(presentValue) || 0;
    const pmt = parseFloat(periodicDeposit) || 0;
    const rate = parseFloat(interestRate) || 0;
    const n = parseInt(numberOfPeriods) || 0;

    const periodicRate = rate / 100;

    // Calculate future value of present value (lump sum)
    const fvOfPV = pv * Math.pow(1 + periodicRate, n);

    // Calculate future value of periodic deposits
    let fvOfPMT = 0;
    if (pmt !== 0 && periodicRate !== 0) {
      if (depositTiming === "end") {
        // Ordinary annuity (deposits at end of period)
        fvOfPMT = pmt * ((Math.pow(1 + periodicRate, n) - 1) / periodicRate);
      } else {
        // Annuity due (deposits at beginning of period)
        fvOfPMT = pmt * ((Math.pow(1 + periodicRate, n) - 1) / periodicRate) * (1 + periodicRate);
      }
    } else if (pmt !== 0) {
      // If rate is 0, simple multiplication
      fvOfPMT = pmt * n;
    }

    const totalFV = fvOfPV + fvOfPMT;
    const totalDeposits = pmt * n;
    const totalInterest = totalFV - pv - totalDeposits;

    setResults({
      futureValue: totalFV,
      presentValue: pv,
      totalDeposits: totalDeposits,
      totalInterest: totalInterest,
      numberOfPeriods: n
    });

    // Generate schedule
    const scheduleData: ScheduleEntry[] = [];
    let balance = pv;

    for (let period = 1; period <= n; period++) {
      const startingBalance = balance;

      let deposit = 0;
      let interest = 0;

      if (depositTiming === "beginning") {
        deposit = pmt;
        balance += deposit;
        interest = balance * periodicRate;
        balance += interest;
      } else {
        interest = balance * periodicRate;
        balance += interest;
        deposit = pmt;
        balance += deposit;
      }

      scheduleData.push({
        period,
        startingBalance,
        deposit,
        interest,
        endingBalance: balance
      });
    }

    setSchedule(scheduleData);
    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateFutureValue();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
            <TrendingUp className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Future Value Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate what your investment will be worth in the future with compound interest and regular contributions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Starting Amount (PV)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={presentValue}
                      onChange={(e) => setPresentValue(e.target.value)}
                      className="pl-7"
                      placeholder="10000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Initial principal investment</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Periodic Deposit (PMT)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={periodicDeposit}
                      onChange={(e) => setPeriodicDeposit(e.target.value)}
                      className="pl-7"
                      placeholder="500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Regular contribution amount</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate per Period (I/Y)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="pr-7"
                      placeholder="6"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Yield rate per period</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Periods (N)
                  </label>
                  <Input
                    type="number"
                    value={numberOfPeriods}
                    onChange={(e) => setNumberOfPeriods(e.target.value)}
                    placeholder="120"
                  />
                  <p className="text-xs text-slate-500 mt-1">Count of compounding cycles (e.g., 120 months = 10 years)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Deposit Timing
                  </label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={depositTiming === "end" ? "default" : "outline"}
                      onClick={() => setDepositTiming("end")}
                      className={depositTiming === "end" ? "flex-1 bg-gradient-to-r from-emerald-600 to-teal-600" : "flex-1"}
                    >
                      End of Period
                    </Button>
                    <Button
                      type="button"
                      variant={depositTiming === "beginning" ? "default" : "outline"}
                      onClick={() => setDepositTiming("beginning")}
                      className={depositTiming === "beginning" ? "flex-1 bg-gradient-to-r from-emerald-600 to-teal-600" : "flex-1"}
                    >
                      Beginning
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">When deposits are made each period</p>
                </div>

                <Button
                  onClick={calculateFutureValue}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Future Value
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Future Value Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Future Value (FV)</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.futureValue)}</p>
                    <p className="text-emerald-100">
                      Total value after {results.numberOfPeriods} periods
                    </p>
                  </div>
                </Card>

                {/* Summary Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Investment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Starting Amount (PV)</span>
                        <span className="font-semibold">{formatCurrency(results.presentValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Deposits</span>
                        <span className="font-semibold">{formatCurrency(results.totalDeposits)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Contributions</span>
                        <span className="font-semibold">{formatCurrency(results.presentValue + results.totalDeposits)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Total Interest Earned</span>
                        <span className="font-bold text-lg text-emerald-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Percent className="h-5 w-5 text-teal-600" />
                        Growth Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Interest Rate</span>
                        <span className="font-semibold">{interestRate}% per period</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Number of Periods</span>
                        <span className="font-semibold">{results.numberOfPeriods}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Growth Ratio</span>
                        <span className="font-semibold">
                          {((results.futureValue / (results.presentValue + results.totalDeposits)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Deposit Timing</span>
                        <span className="font-bold capitalize">{depositTiming === "end" ? "End of Period" : "Beginning"}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Schedule Table */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-emerald-600" />
                        Growth Schedule
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
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Period</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Starting Balance</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Deposit</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Interest</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Ending Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.slice(0, 24).map((entry) => (
                              <tr key={entry.period} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-3 px-4">{entry.period}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.startingBalance)}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.deposit)}</td>
                                <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(entry.interest)}</td>
                                <td className="py-3 px-4 text-right font-semibold">{formatCurrency(entry.endingBalance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-center text-slate-500 text-sm mt-4">
                          Showing first {Math.min(24, schedule.length)} of {schedule.length} total periods
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your investment details and click "Calculate Future Value" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Future Value</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Future Value?</h3>
                <p>
                  Future value is a fundamental concept in finance that answers a simple question: what will my money be worth down the road? It's essentially a way to look ahead and see how today's investments will grow over time, assuming they earn interest or returns at a steady rate. The concept applies to everything from savings accounts and retirement funds to business investments and educational savings plans.
                </p>
                <p className="mt-3">
                  Think of it this way—if you put $10 into an account that pays 6% interest annually, you'll have $10.60 at the end of the year. That $10.60 is the future value of your $10 investment after one year at a 6% rate. While this example is straightforward, future value calculations become more interesting when you factor in compound interest over multiple periods and regular contributions along the way.
                </p>
                <p className="mt-3">
                  The beauty of future value calculations is that they help you understand the real purchasing power of your money over time. A dollar today isn't worth the same as a dollar tomorrow—that's the core principle behind the time value of money. By calculating future value, you can make informed decisions about saving, investing, and planning for long-term financial goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Time Value of Money</h3>
                <p>
                  Here's a concept that underpins much of modern finance: money available right now is worth more than the identical amount in the future. Why? Because money you have today can be invested to earn returns, whereas future money can't start working for you until you actually receive it.
                </p>
                <p className="mt-3">
                  This principle shows up everywhere in financial products. When you take out a mortgage, the lender is essentially giving you a large sum today that you'll pay back over decades. They charge interest because they're forgoing the opportunity to invest that money elsewhere. Similarly, when you invest in bonds or certificates of deposit, you're lending your money with the expectation of getting back more than you put in.
                </p>
                <p className="mt-3">
                  The time value of money relies on five interconnected variables: future value (FV), present value (PV), interest rate (I/Y), number of periods (N), and periodic payment (PMT). When you know any four of these, you can calculate the fifth. This interconnectedness makes future value calculators incredibly versatile—they work just as well for figuring out car loans and student debt as they do for planning retirement savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Breaking Down the Formula</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Present Value (PV)</h4>
                <p>
                  This is simply the amount you're starting with—your initial investment or lump sum. In our calculator, it's the "Starting Amount." If you're opening a new investment account with $5,000, that's your present value. It serves as the foundation that will grow over time through compound interest.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Periodic Payment (PMT)</h4>
                <p>
                  These are the regular contributions you make to your investment. You might add $200 every month to your retirement account or $1,000 quarterly to a college savings fund. The frequency doesn't matter as long as it's consistent and matches your compounding period. Regular contributions can dramatically increase your future value because each deposit starts earning its own compound interest from the moment it's made.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rate (I/Y)</h4>
                <p>
                  This represents the yield or growth rate per period. If you're calculating monthly growth with an annual interest rate, you'll need to divide the annual rate by 12. For example, a 6% annual rate becomes 0.5% per month. The interest rate is probably the most crucial variable in your calculation—even small differences in rates can lead to vastly different outcomes over long periods.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Number of Periods (N)</h4>
                <p>
                  This is how many times your investment will compound. If you're investing monthly for 10 years, that's 120 periods. If you're compounding quarterly for 5 years, that's 20 periods. The more frequently interest compounds, the faster your money grows, though the effect is most noticeable over longer time frames.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Deposit Timing</h4>
                <p>
                  This detail often gets overlooked, but it matters more than you might think. When payments are made at the beginning of each period (called an "annuity due"), they have a full period to earn interest before the next payment arrives. Payments made at the end of each period (an "ordinary annuity") start earning interest one period later. Over many years, this timing difference can result in noticeably different final values—typically, beginning-of-period payments will give you a slightly higher future value.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Compound Interest Works</h3>
                <p>
                  Compound interest is often called the eighth wonder of the world, and for good reason. Unlike simple interest, which only pays returns on your original investment, compound interest pays returns on both your initial principal and all the interest you've accumulated. In other words, you earn interest on your interest, creating a snowball effect that accelerates your wealth over time.
                </p>
                <p className="mt-3">
                  Let's say you invest $1,000 at a 10% annual rate. After the first year, you'll have $1,100. In year two, you don't just earn 10% on your original $1,000—you earn it on the full $1,100, giving you $1,210. By year three, you're earning returns on $1,210, and so on. This exponential growth is why starting to invest early, even with small amounts, can be so powerful.
                </p>
                <p className="mt-3">
                  The frequency of compounding also matters. Money that compounds monthly will grow faster than money that compounds annually at the same stated interest rate, because the interest gets added back to the principal more frequently. That's why APY (annual percentage yield) is often higher than APR (annual percentage rate)—APY accounts for the effect of compounding within the year.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World Applications</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Retirement Planning</h4>
                <p>
                  Future value calculations are essential for retirement planning. If you're 30 years old and plan to retire at 65, you have 35 years for your investments to grow. By calculating the future value of your current savings plus regular monthly contributions, you can determine whether you're on track to meet your retirement goals or if you need to save more aggressively.
                </p>
                <p className="mt-3">
                  For instance, if you start with $20,000 in a retirement account, contribute $500 monthly, and earn an average annual return of 7% (compounded monthly), you'll have accumulated over $800,000 by retirement. Understanding this helps you see the tremendous impact of consistent saving over long periods.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Education Savings</h4>
                <p>
                  Parents often use future value calculations to plan for their children's college expenses. If you know you'll need $100,000 in 18 years, you can work backwards to figure out how much you need to save each month, assuming a certain rate of return. This makes abstract goals concrete and actionable.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Business Investments</h4>
                <p>
                  Companies use future value calculations to evaluate potential investments and projects. If a business is considering whether to invest $1 million in new equipment that will generate steady returns over 10 years, calculating the future value of those returns helps determine if the investment makes financial sense compared to alternative uses of that capital.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan and Debt Analysis</h4>
                <p>
                  While we typically think of future value in terms of investments, it also applies to debts. When you take out a loan, the lender is calculating the future value of the money they're lending you to determine how much interest to charge. Understanding this calculation from both sides helps you make better decisions about borrowing and lending.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Starting Early</h3>
                <p>
                  One of the most important lessons from future value calculations is the dramatic advantage of starting early. Because of compound interest's exponential nature, someone who starts investing at 25 will end up with significantly more money at retirement than someone who starts at 35, even if the later starter contributes more money overall.
                </p>
                <p className="mt-3">
                  Consider two people saving for retirement: Person A starts at age 25, contributes $300 monthly for 10 years (total contribution: $36,000), then stops contributing but leaves the money invested until age 65. Person B waits until age 35, then contributes $300 monthly for 30 years straight until age 65 (total contribution: $108,000). Assuming a 7% annual return, Person A will likely have more money at retirement despite contributing only one-third as much, purely because their money had an extra 10 years to compound.
                </p>
                <p className="mt-3">
                  This illustrates why financial advisors constantly emphasize the importance of starting retirement savings as early as possible, even if you can only afford small contributions. Time is your most valuable asset when it comes to building wealth through investments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Inflation and Real Returns</h3>
                <p>
                  When thinking about future value, it's crucial to consider inflation. The nominal future value tells you how many dollars you'll have, but the real future value tells you what those dollars will actually buy. If your investment grows at 6% annually but inflation runs at 3%, your real rate of return is only about 3%.
                </p>
                <p className="mt-3">
                  This is why financial planners typically recommend assuming conservative return rates in your calculations. While the stock market has historically averaged returns of around 10% annually, accounting for inflation brings the real return closer to 7%. Using overly optimistic projections can lead to falling short of your financial goals.
                </p>
                <p className="mt-3">
                  Some calculators offer options to input expected inflation rates, which then calculate your real future value after adjusting for purchasing power. This gives you a more accurate picture of whether your savings will actually support the lifestyle you're planning for in retirement or when funding future expenses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Assumptions and Limitations</h3>
                <p>
                  Future value calculators are incredibly useful, but they're based on assumptions that may not perfectly reflect reality. Most calculators assume a constant rate of return, but actual investment returns fluctuate year by year. The stock market might return 20% one year and lose 10% the next. Over long periods, these variations tend to average out, but short-term volatility is something to keep in mind.
                </p>
                <p className="mt-3">
                  Similarly, these calculators assume you'll make regular contributions exactly as planned. Life happens—you might need to reduce or pause contributions during financial hardships, or you might be able to increase them when you get a raise. Your actual results will depend on your ability to stick to your savings plan through various life circumstances.
                </p>
                <p className="mt-3">
                  Tax considerations are another factor that basic future value calculators don't account for. Money in a traditional IRA grows tax-deferred but will be taxed when withdrawn, while Roth IRA contributions are taxed upfront but grow tax-free. These tax treatments significantly impact the real value you'll have available to spend in the future.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using the Calculator Effectively</h3>
                <p>
                  To get the most out of a future value calculator, it's helpful to run multiple scenarios. Try calculating with optimistic, realistic, and conservative return assumptions to see a range of possible outcomes. This gives you a better sense of uncertainty and helps you plan more robustly.
                </p>
                <p className="mt-3">
                  You can also work backwards from a goal. If you know you want $1 million in 30 years, you can adjust the periodic payment amount to see what monthly contribution will get you there at different interest rates. This reverse engineering approach helps you set concrete, achievable savings targets.
                </p>
                <p className="mt-3">
                  Don't forget to revisit your calculations periodically. As you get closer to your goal date, you'll want to update your assumptions with actual performance data and adjust your contributions if you're falling behind or getting ahead of plan. Future value is a planning tool, not a prediction—your actual results will depend on staying engaged with your finances and making adjustments as needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Related Financial Concepts</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Present Value</h4>
                <p>
                  While future value tells you what money will be worth in the future, present value works in reverse—it tells you what future money is worth today. If someone promises to pay you $10,000 in five years, what's that really worth right now? Present value calculations answer this question by discounting future cash flows back to today's dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Net Present Value (NPV)</h4>
                <p>
                  This concept extends present value to evaluate investments that involve multiple cash flows over time. It's commonly used in business to decide whether a project is worth pursuing. If the net present value is positive, the investment is expected to generate more value than it costs.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Internal Rate of Return (IRR)</h4>
                <p>
                  The IRR is the interest rate at which the present value of an investment's costs equals the present value of its benefits. It's a way to standardize the performance of different investments so you can compare them on equal footing. An investment with a higher IRR is generally more attractive, assuming similar risk levels.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Historical Context</h3>
                <p>
                  The mathematical foundations of future value calculations trace back centuries, but their widespread practical application is relatively modern. Before the advent of computers and calculators, performing these calculations by hand was tedious and error-prone, limiting their use to professional financiers and actuaries.
                </p>
                <p className="mt-3">
                  The democratization of financial planning really took off in the latter half of the 20th century as personal computers became common and financial literacy programs expanded. Today, anyone with internet access can instantly calculate the future value of their savings and make informed decisions about their financial future—a capability that was once reserved for those who could afford professional financial advisors.
                </p>
                <p className="mt-3">
                  This accessibility has transformed personal finance. More people now participate in retirement planning through 401(k)s and IRAs, understanding that small, consistent contributions made early in their careers can grow into substantial nest eggs. The concept of compound interest has moved from an academic curiosity to a practical tool that millions use to plan for major life goals.
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
