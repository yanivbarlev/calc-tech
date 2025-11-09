"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingDown, DollarSign, PiggyBank, Calendar } from "lucide-react";
import type { Metadata } from 'next';

interface PresentValueResults {
  presentValue: number;
  futureValue: number;
  totalPrincipal: number;
  totalInterest: number;
  schedule: ScheduleEntry[];
}

interface ScheduleEntry {
  period: number;
  payment: number;
  interest: number;
  balance: number;
  accumulated: number;
}

export default function PresentValueCalculator() {
  // Future Value Mode (lump sum)
  const [futureValue, setFutureValue] = useState<string>("100000");
  const [periodsLumpSum, setPeriodsLumpSum] = useState<string>("10");
  const [interestRateLumpSum, setInterestRateLumpSum] = useState<string>("5");

  // Periodic Payment Mode
  const [periodicPayment, setPeriodicPayment] = useState<string>("1000");
  const [periodsPayment, setPeriodsPayment] = useState<string>("10");
  const [interestRatePayment, setInterestRatePayment] = useState<string>("5");
  const [paymentTiming, setPaymentTiming] = useState<"end" | "beginning">("end");

  // Results
  const [resultsLumpSum, setResultsLumpSum] = useState<PresentValueResults | null>(null);
  const [resultsPayment, setResultsPayment] = useState<PresentValueResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [activeTab, setActiveTab] = useState<"lumpsum" | "payment">("lumpsum");

  const calculateLumpSum = () => {
    const fv = parseFloat(futureValue) || 100000;
    const n = parseFloat(periodsLumpSum) || 10;
    const rate = (parseFloat(interestRateLumpSum) || 5) / 100;

    // Present Value = FV / (1 + r)^n
    const pv = fv / Math.pow(1 + rate, n);
    const totalInterest = fv - pv;

    // Generate schedule showing growth from PV to FV
    const schedule: ScheduleEntry[] = [];
    for (let i = 0; i <= n; i++) {
      const currentValue = pv * Math.pow(1 + rate, i);
      const periodInterest = i > 0 ? currentValue - (pv * Math.pow(1 + rate, i - 1)) : 0;

      schedule.push({
        period: i,
        payment: 0,
        interest: periodInterest,
        balance: currentValue,
        accumulated: currentValue
      });
    }

    setResultsLumpSum({
      presentValue: pv,
      futureValue: fv,
      totalPrincipal: pv,
      totalInterest: totalInterest,
      schedule: schedule
    });
  };

  const calculatePeriodicPayment = () => {
    const pmt = parseFloat(periodicPayment) || 1000;
    const n = parseFloat(periodsPayment) || 10;
    const rate = (parseFloat(interestRatePayment) || 5) / 100;

    // Present Value of Annuity formula
    // PV = PMT × [(1 - (1 + r)^(-n)) / r]
    // For annuity due (beginning): PV = PMT × [(1 - (1 + r)^(-n)) / r] × (1 + r)

    let pv: number;
    if (paymentTiming === "end") {
      pv = pmt * ((1 - Math.pow(1 + rate, -n)) / rate);
    } else {
      pv = pmt * ((1 - Math.pow(1 + rate, -n)) / rate) * (1 + rate);
    }

    // Calculate future value to show the growth
    let fv: number;
    if (paymentTiming === "end") {
      fv = pmt * ((Math.pow(1 + rate, n) - 1) / rate);
    } else {
      fv = pmt * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate);
    }

    const totalPrincipal = pmt * n;
    const totalInterest = fv - totalPrincipal;

    // Generate schedule
    const schedule: ScheduleEntry[] = [];
    let balance = 0;

    for (let i = 1; i <= n; i++) {
      let periodInterest: number;

      if (paymentTiming === "beginning") {
        balance += pmt;
        periodInterest = balance * rate;
        balance += periodInterest;
      } else {
        periodInterest = balance * rate;
        balance += periodInterest + pmt;
      }

      schedule.push({
        period: i,
        payment: pmt,
        interest: periodInterest,
        balance: balance,
        accumulated: balance
      });
    }

    setResultsPayment({
      presentValue: pv,
      futureValue: fv,
      totalPrincipal: totalPrincipal,
      totalInterest: totalInterest,
      schedule: schedule
    });
  };

  const calculate = () => {
    calculateLumpSum();
    calculatePeriodicPayment();
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const currentResults = activeTab === "lumpsum" ? resultsLumpSum : resultsPayment;

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
                <div className="text-xs text-slate-500">Free Financial Tools</div>
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
            Present Value Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the current worth of future money or periodic payments. Understand the time value of money and make informed financial decisions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Input Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Mode Tabs */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setActiveTab("lumpsum")}
                    className={`flex-1 ${
                      activeTab === "lumpsum"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Lump Sum
                  </Button>
                  <Button
                    onClick={() => setActiveTab("payment")}
                    className={`flex-1 ${
                      activeTab === "payment"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Payments
                  </Button>
                </div>

                {/* Lump Sum Inputs */}
                {activeTab === "lumpsum" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Future Value ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={futureValue}
                          onChange={(e) => setFutureValue(e.target.value)}
                          className="pl-7"
                          placeholder="100000"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Amount you'll receive in the future</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Number of Periods
                      </label>
                      <Input
                        type="number"
                        value={periodsLumpSum}
                        onChange={(e) => setPeriodsLumpSum(e.target.value)}
                        placeholder="10"
                      />
                      <p className="text-xs text-slate-500 mt-1">Years until you receive the money</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={interestRateLumpSum}
                          onChange={(e) => setInterestRateLumpSum(e.target.value)}
                          className="pr-7"
                          placeholder="5"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Annual interest or discount rate</p>
                    </div>
                  </>
                )}

                {/* Periodic Payment Inputs */}
                {activeTab === "payment" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Periodic Payment ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={periodicPayment}
                          onChange={(e) => setPeriodicPayment(e.target.value)}
                          className="pl-7"
                          placeholder="1000"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Amount paid each period</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Number of Periods
                      </label>
                      <Input
                        type="number"
                        value={periodsPayment}
                        onChange={(e) => setPeriodsPayment(e.target.value)}
                        placeholder="10"
                      />
                      <p className="text-xs text-slate-500 mt-1">Total number of payments</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={interestRatePayment}
                          onChange={(e) => setInterestRatePayment(e.target.value)}
                          className="pr-7"
                          placeholder="5"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Interest rate per period</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Payment Timing
                      </label>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setPaymentTiming("end")}
                          className={`flex-1 ${
                            paymentTiming === "end"
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          End of Period
                        </Button>
                        <Button
                          onClick={() => setPaymentTiming("beginning")}
                          className={`flex-1 ${
                            paymentTiming === "beginning"
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          Beginning
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">When payments are made</p>
                    </div>
                  </>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Present Value
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-8">
            {currentResults ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingDown className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Present Value</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(currentResults.presentValue)}</p>
                    <p className="text-emerald-100">Current worth of future {activeTab === "lumpsum" ? "amount" : "payments"}</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Future Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(currentResults.futureValue)}</p>
                      <p className="text-sm text-slate-500 mt-1">Total value at maturity</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Total Principal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(currentResults.totalPrincipal)}</p>
                      <p className="text-sm text-slate-500 mt-1">{activeTab === "lumpsum" ? "Initial investment" : "Total payments made"}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-emerald-600">{formatCurrency(currentResults.totalInterest)}</p>
                      <p className="text-sm text-slate-500 mt-1">Interest earned over time</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Discount Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatPercentage(((currentResults.futureValue - currentResults.presentValue) / currentResults.futureValue) * 100)}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">Relative discount from FV to PV</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Amortization Schedule */}
                {activeTab === "payment" && currentResults.schedule.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="text-xl">Payment Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-slate-200">
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Period</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Payment</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Interest</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentResults.schedule.map((entry) => (
                              <tr key={entry.period} className="border-b border-slate-100 hover:bg-emerald-50 transition-colors">
                                <td className="py-3 px-4 font-medium text-slate-700">{entry.period}</td>
                                <td className="py-3 px-4 text-right text-slate-600">{formatCurrency(entry.payment)}</td>
                                <td className="py-3 px-4 text-right text-emerald-600">{formatCurrency(entry.interest)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-slate-800">{formatCurrency(entry.balance)}</td>
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
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your values and click Calculate to see results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Present Value</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Present Value?</h3>
                <p>
                  Present value represents what future money is worth in today's dollars. It's one of the most fundamental concepts in finance because it acknowledges a simple truth: a dollar today is worth more than a dollar tomorrow. Why? Because money you have now can be invested to earn returns, making it grow over time. This principle underlies everything from retirement planning to corporate investment decisions.
                </p>
                <p className="mt-4">
                  Think of it this way—if someone promises to pay you $10,000 five years from now, you shouldn't treat that the same as receiving $10,000 today. The present value calculation tells you exactly what that future payment is worth right now, accounting for what you could have earned if you'd had the money all along. This helps you make apples-to-apples comparisons between money available at different times.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Time Value of Money Principle</h3>
                <p>
                  The time value of money (TVM) is the foundation of all present value calculations. At its core, TVM recognizes that money has earning potential. A thousand dollars invested today at a 5% annual return becomes $1,050 in a year. That means if someone offers you $1,050 a year from now, it's really only worth $1,000 in present value terms, assuming you could earn 5% elsewhere.
                </p>
                <p className="mt-4">
                  This concept affects nearly every financial decision you make. Should you take a lump sum pension payout or monthly payments? Is that investment property worth the asking price based on future rental income? Should you pay off debt or invest your money? All these questions require comparing money at different points in time, which is exactly what present value helps you do.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Key Variables in TVM Calculations</h4>
                <p>
                  Five variables work together in time value of money calculations: present value (PV), future value (FV), interest rate (I/Y), number of periods (N), and payment amount (PMT). When you know any four of these variables, you can solve for the fifth. Our calculator handles the math automatically, but understanding these relationships helps you make better financial decisions.
                </p>
                <p className="mt-3">
                  The interest rate you use matters tremendously. It should reflect your opportunity cost—what you could realistically earn elsewhere with similar risk. Using 10% when you could actually only earn 3% will make future money seem less valuable than it really is. Conservative estimates usually make more sense than optimistic ones when you're making real decisions with your money.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Present Value of a Lump Sum</h3>
                <p>
                  Calculating the present value of a single future payment is straightforward once you grasp the concept. If you'll receive $100,000 in ten years and could earn 5% annually on investments, you divide that future amount by (1.05) raised to the 10th power. This works out to about $61,391—meaning you should be indifferent between receiving $61,391 today or $100,000 in ten years, assuming that 5% rate holds true.
                </p>
                <p className="mt-4">
                  This calculation shows up constantly in real life. When you're offered a structured settlement, evaluating a bond, or considering a deferred compensation package, you need to know what those future payments are actually worth. The math reveals whether you're getting a good deal or leaving money on the table. Sometimes the nominally larger future amount is actually worth less than a smaller payment available today.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Discount Rate Selection</h4>
                <p>
                  Choosing the right discount rate (interest rate) is more art than science. For low-risk future payments, you might use current treasury yields. For riskier scenarios, you'd want a higher rate reflecting that uncertainty. If you're comparing to what you could earn in the stock market, historical returns of 7-10% might make sense, though past performance never guarantees future results.
                </p>
                <p className="mt-3">
                  Keep in mind that small changes in the discount rate create big differences over long time periods. A 10% rate instead of 5% cuts the present value of that $100,000 in ten years nearly in half, from $61,391 to just $38,554. That's why being thoughtful about your rate assumption matters so much, especially for long-term calculations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Present Value of Periodic Payments</h3>
                <p>
                  Many financial situations involve a series of regular payments rather than a single lump sum. Pensions, annuities, rental income, and lottery winnings often come as periodic payments. Calculating the present value of these payment streams requires summing up the present value of each individual payment, which the annuity formula handles efficiently.
                </p>
                <p className="mt-4">
                  The present value of an annuity depends on whether payments happen at the beginning or end of each period. Beginning-of-period payments (called an "annuity due") are worth slightly more because each payment has an extra period to earn interest. The difference might seem small, but it adds up—especially over many years. Our calculator lets you switch between these modes to see the exact impact.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Real-World Applications</h4>
                <p>
                  Understanding the present value of payment streams helps with major life decisions. When you win a lottery, you can choose between a lump sum today or annual payments spread over decades. The advertised jackpot represents all those future payments added together, not their present value. The lump sum option is typically 50-60% of the advertised amount because it accounts for the time value of money.
                </p>
                <p className="mt-3">
                  Similarly, pension decisions often come down to present value comparisons. You might be offered $500,000 today or $3,000 per month for life. Which is better depends on how long you'll live, what returns you could earn on a lump sum, and whether you need flexibility or guaranteed income. The present value calculation gives you an objective starting point for weighing these factors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Net Present Value (NPV) in Investment Decisions</h3>
                <p>
                  Net present value takes the concept further by comparing the present value of cash inflows against outflows. It's the gold standard for evaluating investments and capital expenditures. If an investment requires $100,000 today but generates cash flows with a present value of $150,000, the NPV is $50,000—suggesting it's worth pursuing.
                </p>
                <p className="mt-4">
                  Businesses use NPV constantly when deciding whether to buy equipment, develop new products, or acquire other companies. The principle works for personal decisions too. Should you invest in solar panels that cost $20,000 but save you $200 monthly for twenty years? Calculate the present value of those savings, subtract the upfront cost, and you'll know if the investment makes financial sense.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">NPV Decision Rules</h4>
                <p>
                  The rule of thumb is simple: pursue investments with positive NPV and reject those with negative NPV. If NPV is zero, you're exactly breaking even in present value terms. In reality, you'd probably want to see a meaningfully positive NPV to justify the effort and risk involved. Companies often set minimum NPV thresholds or compare projects to choose the best use of limited capital.
                </p>
                <p className="mt-3">
                  That said, NPV isn't the only consideration. Strategic value, risk factors, and non-financial benefits all matter. An investment with modest NPV might still be worth pursuing if it opens new markets or protects existing revenue streams. Still, knowing the NPV ensures you're making these tradeoffs with your eyes open rather than relying on gut feel alone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Inflation and Present Value</h3>
                <p>
                  Inflation quietly erodes the value of future money in ways that compound over time. If inflation runs 3% annually, something that costs $100 today will cost $134 in ten years. This means you need to think about both the nominal interest rate and the real (inflation-adjusted) rate when calculating present value for long-term planning.
                </p>
                <p className="mt-4">
                  The real interest rate is roughly the nominal rate minus inflation. If you can earn 6% on an investment but inflation is 3%, your real return is only about 3%. For present value calculations spanning decades—like retirement planning—using real rates gives you a clearer picture of actual purchasing power rather than just nominal dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Adjusting for Inflation</h4>
                <p>
                  You can handle inflation two ways: discount nominal cash flows at a nominal rate, or discount inflation-adjusted cash flows at a real rate. Both approaches should give you the same answer if done correctly. Most people find it easier to work with nominal figures and rates since that's how we typically think about money, but real rates help when you're focused on maintaining purchasing power.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Present Value Mistakes to Avoid</h3>
                <p>
                  One frequent error is mixing up interest rates—using annual rates for monthly calculations or vice versa. If you're calculating monthly payments, you need to divide the annual interest rate by 12 and multiply the number of years by 12. Getting this wrong throws off your entire calculation, sometimes dramatically.
                </p>
                <p className="mt-4">
                  Another mistake is ignoring taxes. Investment returns and interest payments often have tax implications that affect your actual, after-tax return. A 6% return in a taxable account might really only be 4.5% after taxes, depending on your tax bracket. For accurate present value calculations on real decisions, factor in the tax consequences.
                </p>
                <p className="mt-4">
                  Finally, people sometimes anchor too heavily on the calculated present value without considering the assumptions behind it. If your estimate assumes 8% annual returns for thirty years, recognize that's optimistic and actual results will vary. Run multiple scenarios with different assumptions to understand the range of possible outcomes rather than treating one calculation as gospel truth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Practical Tips for Using This Calculator</h3>
                <p>
                  Start by identifying whether you're dealing with a lump sum or periodic payments, then select the appropriate tab. For lump sum calculations, you only need three inputs: the future value you'll receive, how many periods until you receive it, and the interest rate. The calculator instantly shows you what that future amount is worth today.
                </p>
                <p className="mt-4">
                  For periodic payments, you'll specify the payment amount, number of periods, interest rate, and whether payments occur at the beginning or end of each period. The payment schedule table shows exactly how the value accumulates over time, helping you visualize the relationship between payments, interest, and total value.
                </p>
                <p className="mt-4">
                  Don't hesitate to experiment with different scenarios. Try adjusting the interest rate to see how sensitive your results are to that assumption. Compare beginning-of-period versus end-of-period payments. Play with different time horizons. This hands-on exploration builds intuition about how these variables interact and helps you make better financial decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Related Calculations and Further Learning</h3>
                <p>
                  Present value is closely related to several other financial calculations you might need. Future value works in the opposite direction, showing what money today will grow to over time. Internal rate of return (IRR) solves for the interest rate that makes an investment's NPV equal zero. Understanding these related concepts gives you a complete toolkit for financial analysis.
                </p>
                <p className="mt-4">
                  For more specific scenarios, we offer specialized calculators that build on present value principles. Our{" "}
                  <Link href="/investment" className="text-emerald-600 hover:underline font-medium">investment calculator</Link> helps you analyze specific investment opportunities.
                  The <Link href="/retirement" className="text-emerald-600 hover:underline font-medium">retirement calculator</Link> uses present value logic to determine how much you need to save.
                  And our <Link href="/loan" className="text-emerald-600 hover:underline font-medium">loan calculator</Link> applies these same principles to borrowing decisions.
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
            2025 Calc-Tech.com. All rights reserved. Made with care for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
