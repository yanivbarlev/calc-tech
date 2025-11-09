"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, Percent, TrendingUp, Clock } from "lucide-react";

interface PaymentResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principalAmount: number;
  payoffTime?: number; // months for fixed payment mode
  yearsToPayoff?: number;
  monthsRemaining?: number;
}

interface ScheduleEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function PaymentCalculator() {
  // Input states
  const [loanAmount, setLoanAmount] = useState<string>("200000");
  const [loanTerm, setLoanTerm] = useState<string>("15");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");

  // Mode toggle: 'fixed-term' or 'fixed-payment'
  const [calculationMode, setCalculationMode] = useState<'fixed-term' | 'fixed-payment'>('fixed-term');

  const [results, setResults] = useState<PaymentResults | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleView, setScheduleView] = useState<'monthly' | 'annual'>('monthly');
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    if (calculationMode === 'fixed-term') {
      calculateFixedTerm();
    } else {
      calculateFixedPayment();
    }
    setHasCalculated(true);
  };

  const calculateFixedTerm = () => {
    const principal = parseFloat(loanAmount) || 200000;
    const years = parseFloat(loanTerm) || 15;
    const rate = parseFloat(interestRate) || 6;

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const payment = monthlyRate === 0
      ? principal / numberOfPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = payment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment: payment,
      totalPayment,
      totalInterest,
      principalAmount: principal
    });

    // Generate amortization schedule
    generateSchedule(principal, payment, monthlyRate, numberOfPayments);
  };

  const calculateFixedPayment = () => {
    const principal = parseFloat(loanAmount) || 200000;
    const payment = parseFloat(monthlyPayment) || 2000;
    const rate = parseFloat(interestRate) || 6;

    const monthlyRate = rate / 100 / 12;

    // Calculate number of months needed
    // n = -ln(1 - r*P/M) / ln(1 + r)
    let numberOfPayments: number;

    if (monthlyRate === 0) {
      numberOfPayments = principal / payment;
    } else {
      if (payment <= principal * monthlyRate) {
        // Payment is too low to ever pay off the loan
        numberOfPayments = 999; // Max out at ~83 years
      } else {
        numberOfPayments = -Math.log(1 - monthlyRate * principal / payment) / Math.log(1 + monthlyRate);
      }
    }

    const totalPayment = payment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const years = Math.floor(numberOfPayments / 12);
    const months = Math.round(numberOfPayments % 12);

    setResults({
      monthlyPayment: payment,
      totalPayment,
      totalInterest,
      principalAmount: principal,
      payoffTime: numberOfPayments,
      yearsToPayoff: years,
      monthsRemaining: months
    });

    // Generate amortization schedule
    generateSchedule(principal, payment, monthlyRate, Math.ceil(numberOfPayments));
  };

  const generateSchedule = (
    principal: number,
    payment: number,
    monthlyRate: number,
    numberOfPayments: number
  ) => {
    const scheduleData: ScheduleEntry[] = [];
    let balance = principal;

    for (let i = 1; i <= numberOfPayments && balance > 0.01; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(payment - interestPayment, balance);
      const actualPayment = interestPayment + principalPayment;
      balance -= principalPayment;

      scheduleData.push({
        month: i,
        payment: actualPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
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
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  // Aggregate schedule for annual view
  const getAnnualSchedule = () => {
    const annual: ScheduleEntry[] = [];
    for (let year = 0; year < schedule.length / 12; year++) {
      const startMonth = year * 12;
      const endMonth = Math.min(startMonth + 12, schedule.length);
      const yearData = schedule.slice(startMonth, endMonth);

      annual.push({
        month: year + 1,
        payment: yearData.reduce((sum, m) => sum + m.payment, 0),
        principal: yearData.reduce((sum, m) => sum + m.principal, 0),
        interest: yearData.reduce((sum, m) => sum + m.interest, 0),
        balance: yearData[yearData.length - 1]?.balance || 0
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
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-normal pb-1">
                  Calc-Tech.com
                </h2>
                <p className="text-xs text-slate-500">Payment Calculator</p>
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
            Payment Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate monthly payments for loans or determine how long it will take to pay off debt with fixed payments
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Calculation Mode Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Calculation Mode
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={calculationMode === 'fixed-term' ? 'default' : 'outline'}
                      onClick={() => setCalculationMode('fixed-term')}
                      className={calculationMode === 'fixed-term' ?
                        'flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' :
                        'flex-1'}
                    >
                      Fixed Term
                    </Button>
                    <Button
                      variant={calculationMode === 'fixed-payment' ? 'default' : 'outline'}
                      onClick={() => setCalculationMode('fixed-payment')}
                      className={calculationMode === 'fixed-payment' ?
                        'flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' :
                        'flex-1'}
                    >
                      Fixed Payment
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {calculationMode === 'fixed-term'
                      ? 'Calculate monthly payment based on loan term'
                      : 'Calculate payoff time based on monthly payment'}
                  </p>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="200000"
                      className="pl-7"
                    />
                  </div>
                </div>

                {calculationMode === 'fixed-term' ? (
                  // Fixed Term Mode: Show loan term input
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="15"
                    />
                  </div>
                ) : (
                  // Fixed Payment Mode: Show monthly payment input
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Monthly Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                        placeholder="2000"
                        className="pl-7"
                      />
                    </div>
                  </div>
                )}

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (Annual)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="6"
                      className="pr-7"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {calculationMode === 'fixed-term' ? 'Monthly Payment' : 'Payoff Time'}
                      </h3>
                    </div>
                    {calculationMode === 'fixed-term' ? (
                      <>
                        <p className="text-5xl font-bold mb-2">{formatCurrency(results.monthlyPayment)}</p>
                        <p className="text-emerald-100">
                          {loanTerm} year loan at {interestRate}% interest
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-5xl font-bold mb-2">
                          {results.yearsToPayoff} years {results.monthsRemaining} months
                        </p>
                        <p className="text-emerald-100">
                          Total of {results.payoffTime?.toFixed(0)} monthly payments
                        </p>
                      </>
                    )}
                  </div>
                </Card>

                {/* Summary Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Total Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatCurrency(results.totalPayment)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Principal + Interest over loan term
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Percent className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        {((results.totalInterest / results.principalAmount) * 100).toFixed(1)}% of principal amount
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Principal Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatCurrency(results.principalAmount)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Original loan amount
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        {calculationMode === 'fixed-term' ? 'Loan Term' : 'Monthly Payment'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {calculationMode === 'fixed-term'
                          ? `${loanTerm} years`
                          : formatCurrency(results.monthlyPayment)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        {calculationMode === 'fixed-term'
                          ? `${parseFloat(loanTerm) * 12} monthly payments`
                          : 'Fixed payment amount'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Breakdown Visualization */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-xl">Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Principal</span>
                          <span className="text-sm font-semibold text-emerald-600">
                            {formatCurrency(results.principalAmount)}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                            style={{ width: `${(results.principalAmount / results.totalPayment) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Interest</span>
                          <span className="text-sm font-semibold text-teal-600">
                            {formatCurrency(results.totalInterest)}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                            style={{ width: `${(results.totalInterest / results.totalPayment) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Amortization Schedule</CardTitle>
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
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant={scheduleView === 'monthly' ? 'default' : 'outline'}
                          onClick={() => setScheduleView('monthly')}
                          size="sm"
                          className={scheduleView === 'monthly' ?
                            'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' :
                            ''}
                        >
                          Monthly
                        </Button>
                        <Button
                          variant={scheduleView === 'annual' ? 'default' : 'outline'}
                          onClick={() => setScheduleView('annual')}
                          size="sm"
                          className={scheduleView === 'annual' ?
                            'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' :
                            ''}
                        >
                          Annual
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50 border-b-2">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                                {scheduleView === 'monthly' ? 'Month' : 'Year'}
                              </th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Payment</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Principal</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Interest</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {(scheduleView === 'monthly' ? schedule : getAnnualSchedule()).slice(0, 12).map((entry, index) => (
                              <tr key={index} className="hover:bg-emerald-50 transition-colors">
                                <td className="px-4 py-3 text-slate-600">{entry.month}</td>
                                <td className="px-4 py-3 text-right font-medium">{formatCurrency(entry.payment)}</td>
                                <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(entry.principal)}</td>
                                <td className="px-4 py-3 text-right text-teal-600">{formatCurrency(entry.interest)}</td>
                                <td className="px-4 py-3 text-right font-semibold">{formatCurrency(entry.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {(scheduleView === 'monthly' ? schedule.length : getAnnualSchedule().length) > 12 && (
                          <p className="text-sm text-slate-500 mt-4 text-center">
                            Showing first 12 {scheduleView === 'monthly' ? 'months' : 'years'} of {scheduleView === 'monthly' ? schedule.length : getAnnualSchedule().length} total
                          </p>
                        )}
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
                  Enter your loan details and click Calculate to see your payment breakdown
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Loan Payments</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is a Payment Calculator?</h3>
                <p>
                  When you're taking out a loan—whether it's for a house, car, or personal expenses—one of the most important questions you'll have is: how much will I need to pay each month? That's exactly what a payment calculator helps you figure out. It takes the guesswork out of borrowing by showing you not just your monthly payment, but also how much interest you'll pay over time and when you'll finally be debt-free.
                </p>
                <p className="mt-3">
                  Think of it as your financial planning companion. Instead of signing loan documents without fully understanding the commitment, you can play around with different scenarios. What if you borrowed a little less? What if you paid extra each month? What if you found a loan with a lower interest rate? All these questions become crystal clear when you run the numbers through a payment calculator.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Two Main Calculation Modes</h4>
                <p>
                  Our payment calculator offers two distinct ways to look at your loan, depending on what matters most to you right now.
                </p>
                <p className="mt-3">
                  The <span className="font-semibold">Fixed Term mode</span> is probably what you'll use most often. This is when you know how long you want the loan to last—maybe 15 years for a mortgage or 5 years for a car loan. You enter the loan amount, the term, and the interest rate, and the calculator tells you what your monthly payment will be. It's straightforward and gives you the information you need to budget properly.
                </p>
                <p className="mt-3">
                  The <span className="font-semibold">Fixed Payment mode</span> flips things around. Let's say you have a credit card balance or personal loan, and you've decided you can afford to pay $500 every month. This mode tells you how long it will take to pay off the debt at that payment level. It's incredibly useful for debt payoff planning because it shows you the light at the end of the tunnel—and helps you see how much faster you could be debt-free if you increased your payment even slightly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Loan Payments Work</h3>
                <p>
                  Every loan payment you make is actually divided into two parts: principal and interest. Understanding this split is crucial because it affects how quickly you build equity and how much you ultimately pay for borrowing.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Principal vs. Interest</h4>
                <p>
                  The principal is simple—it's the actual amount you borrowed. If you took out a $200,000 mortgage, that's your principal. The interest is what the lender charges you for the privilege of using their money. It's calculated as a percentage of the remaining balance.
                </p>
                <p className="mt-3">
                  Here's where it gets interesting: in the early months and years of a loan, most of your payment goes toward interest, not principal. On a typical 15-year mortgage at 6%, your first payment might be split roughly 60/40 between interest and principal. But as time goes on and your balance decreases, that ratio flips. By the final years, you're paying mostly principal with just a small amount of interest.
                </p>
                <p className="mt-3">
                  This is why making extra payments early in a loan's life is so powerful. When you pay extra toward the principal, you reduce the balance that future interest is calculated on, creating a snowball effect that can save you thousands—or even tens of thousands—of dollars over the life of the loan.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Amortization Process</h4>
                <p>
                  Amortization is just a fancy word for the gradual process of paying off a debt through regular payments. An amortization schedule is like a roadmap showing exactly where each payment goes month by month. You'll see your balance slowly decrease, the interest portion shrinking, and the principal portion growing with each payment.
                </p>
                <p className="mt-3">
                  Looking at an amortization schedule can be eye-opening. You might discover that after five years of payments on a 30-year mortgage, you've only paid down 10% of the principal. This isn't because the bank is cheating you—it's just how the math works with compound interest. But knowing this can motivate you to make extra payments if you're able, dramatically shortening your loan term and saving money.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed Term Loans: What You Should Know</h3>
                <p>
                  Most traditional loans—mortgages, auto loans, student loans—operate on a fixed term basis. You agree upfront to pay the loan back over a specific number of years, and your monthly payment stays the same throughout (assuming you have a fixed interest rate).
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Choosing Your Loan Term</h4>
                <p>
                  The length of your loan term is a balancing act between two competing goals: keeping your monthly payment affordable and minimizing the total interest you pay. A longer term means lower monthly payments but more interest overall. A shorter term means higher monthly payments but substantial savings on interest.
                </p>
                <p className="mt-3">
                  Let's look at a real example. A $200,000 mortgage at 6% interest would cost you about $1,688 per month over 15 years. You'd pay roughly $103,800 in total interest. Stretch that same loan to 30 years, and your monthly payment drops to a more manageable $1,199—but you'll end up paying about $231,700 in interest. That's an extra $128,000 just to have smaller payments!
                </p>
                <p className="mt-3">
                  Most people go with whatever term keeps the monthly payment within their budget, and there's nothing wrong with that. But if you can afford it, choosing a shorter term—or making extra payments on a longer-term loan—can make a dramatic difference in your financial life.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Common Loan Terms by Type</h4>
                <p>
                  Different types of loans typically come with standard term options. Mortgages usually offer 15 or 30 years, though you can sometimes find 20 or 25-year options. Auto loans commonly range from 3 to 7 years, with 5 years being particularly popular. Personal loans tend to run anywhere from 2 to 5 years.
                </p>
                <p className="mt-3">
                  Keep in mind that longer terms aren't always available for all loan types. Car loans longer than 7 years are rare because the vehicle depreciates too quickly. And some lenders won't offer 30-year mortgages on less expensive properties because the loan amount doesn't justify the administrative costs of such a long-term commitment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed Payment Strategy: Getting Out of Debt Faster</h3>
                <p>
                  The fixed payment approach is particularly useful when you're dealing with credit card debt or want to create a debt payoff plan. Instead of asking "what's my minimum payment," you're asking "how fast can I get out of debt if I commit to paying X dollars every month?"
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Why This Approach Works</h4>
                <p>
                  Credit cards and some personal loans don't have fixed terms—they'll let you make minimum payments forever if you want. The problem is that minimum payments are designed to keep you in debt as long as possible, maximizing the lender's profit. If you only pay the minimum on a $10,000 credit card balance at 18% APR, you could be paying for 20+ years and end up paying more in interest than you originally borrowed.
                </p>
                <p className="mt-3">
                  By choosing a fixed payment amount—ideally well above the minimum—you take control. You might discover that paying $300 instead of $200 per month cuts your payoff time in half. That's the power of consistent, meaningful payments working in your favor rather than against you.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Setting Realistic Payment Goals</h4>
                <p>
                  When using the fixed payment calculator, be honest with yourself about what you can actually afford. It's better to set a payment you can stick to every month than to set an ambitious goal that you'll miss half the time. Consistency matters more than heroics.
                </p>
                <p className="mt-3">
                  Start by looking at your monthly budget. How much money is left after all your essential expenses? You'll want to put a meaningful chunk of that toward debt—maybe 30-50% if you're serious about getting out of debt quickly. But don't leave yourself with zero cushion, or you'll end up using credit cards again when unexpected expenses pop up.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Interest Rates: The Real Cost of Borrowing</h3>
                <p>
                  The interest rate is arguably the most important number in any loan. A difference of just 1% can mean thousands of dollars over the life of a mortgage or hundreds of dollars on a car loan. Understanding how interest rates work helps you shop for better loans and appreciate the value of paying down debt.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rate vs. APR</h4>
                <p>
                  You'll often see both an interest rate and an APR (Annual Percentage Rate) when shopping for loans, and they're not quite the same thing. The interest rate is simply the percentage charged on the borrowed amount. The APR includes the interest rate plus any fees, points, or other charges rolled into the loan, giving you a more accurate picture of the total cost.
                </p>
                <p className="mt-3">
                  For most purposes, the APR is the better number to focus on when comparing loans. Two lenders might offer the same interest rate, but if one charges significant origination fees and the other doesn't, their APRs will be different. The loan with the lower APR is the better deal, all else being equal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Fixed vs. Variable Rates</h4>
                <p>
                  Fixed interest rates stay the same throughout the loan term, giving you predictable payments that won't change. Variable rates (sometimes called adjustable rates) can go up or down based on market conditions, typically tied to an index like the prime rate or LIBOR.
                </p>
                <p className="mt-3">
                  Variable rates often start lower than fixed rates, which can be tempting. But they come with risk. If market rates increase, your payment goes up—sometimes dramatically. This was a painful lesson for many homeowners during the 2008 financial crisis when adjustable-rate mortgages reset to much higher rates.
                </p>
                <p className="mt-3">
                  As a general rule, fixed rates make sense when you plan to keep the loan for a long time and want payment stability. Variable rates might work if you're confident you'll pay off or refinance the loan before the rate can increase much, or if you can comfortably handle payment increases without financial stress.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making Extra Payments: A Powerful Strategy</h3>
                <p>
                  One of the most effective ways to save money and build wealth is to pay more than the minimum on your loans. Even small extra payments can have a surprisingly large impact when maintained consistently over time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Math Behind Extra Payments</h4>
                <p>
                  When you make an extra payment on a loan, that money typically goes entirely toward principal (check your loan terms to confirm). This reduces the balance that interest is calculated on for all future months, creating a compounding effect.
                </p>
                <p className="mt-3">
                  Let's say you have that $200,000 mortgage at 6% over 15 years. Your required payment is $1,688, but you decide to pay $2,000 every month—an extra $312. That additional $312 per month would let you pay off the mortgage about 3 years early and save roughly $20,000 in interest. That's a 7:1 return on your extra payments!
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Different Ways to Pay Extra</h4>
                <p>
                  You don't have to commit to a specific extra amount every month. Some people make one extra payment per year (maybe using a tax refund or bonus). Others round up their payment to a nice even number. Some add $50 or $100 whenever they have a good month financially.
                </p>
                <p className="mt-3">
                  Whatever approach you choose, the key is to make sure the extra money goes toward principal, not just prepaying future scheduled payments. Most online payment systems have an option to specify "extra principal payment" or similar. If you're mailing a check, write "apply to principal" in the memo line to be clear about your intent.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Frequently Asked Questions</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">How accurate are payment calculators?</h4>
                <p>
                  Payment calculators are highly accurate for the mathematical calculations—the monthly payment, total interest, and amortization schedule will match what you'd see with an actual loan (assuming you use the exact same numbers). However, they don't account for things like property taxes and insurance (for mortgages), late payment fees, or changes in variable interest rates. Use them for planning and comparison, but always verify the exact terms with your lender.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Should I choose a shorter loan term even if it means a higher payment?</h4>
                <p>
                  It depends on your financial situation. A shorter term saves you substantial interest and builds equity faster, but only if you can comfortably afford the higher payment. If the higher payment would strain your budget or prevent you from saving for emergencies and retirement, a longer term might make more sense. You can always pay extra on a longer-term loan to achieve similar savings without being locked into a higher required payment.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">What's a good interest rate?</h4>
                <p>
                  Interest rates vary widely depending on the type of loan, your credit score, and market conditions. As of 2024, mortgage rates typically range from 6-8%, auto loans from 5-10%, and personal loans from 8-15%. Credit cards can charge anywhere from 15-25% or more. The better your credit and the more secure the loan (secured loans like mortgages have lower rates than unsecured ones like credit cards), the better rate you'll qualify for.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Can I pay off a loan early without penalty?</h4>
                <p>
                  Most loans allow early payoff, but some have prepayment penalties—fees charged if you pay off the loan before a certain date. This is more common with mortgages than other loan types. Always ask about prepayment penalties before signing any loan documents. If your loan has one, calculate whether the interest savings from early payoff outweigh the penalty.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">How often should I recalculate my payments?</h4>
                <p>
                  For fixed-rate loans with set terms, you only need to calculate once unless you're considering refinancing or making extra payments. For variable-rate loans, it's smart to recalculate whenever the rate changes. If you're using the fixed payment strategy to pay down credit cards or other flexible debt, recalculate every few months to track your progress and potentially increase your payment as you free up more cash.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tips for Managing Your Loan Payments</h3>
                <p>
                  Successfully managing a loan goes beyond just understanding the numbers. Here are some practical strategies to help you stay on track and potentially save money.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Automate Your Payments</h4>
                <p>
                  Set up automatic payments from your checking account so you never miss a due date. Many lenders offer a small interest rate discount (typically 0.25%) if you use autopay. Just make sure you always have enough money in your account to cover the payment, or you'll face overdraft fees that wipe out any savings.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Pay Biweekly Instead of Monthly</h4>
                <p>
                  If you're paid biweekly, consider splitting your monthly payment in half and paying every two weeks instead. You'll make 26 half-payments per year, which equals 13 full monthly payments instead of 12. This extra payment per year goes directly to principal and can shorten a 30-year mortgage by 4-6 years.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Review Your Options Regularly</h4>
                <p>
                  Interest rates change, and so does your financial situation. If rates have dropped since you took out your loan, refinancing might save you money. If your income has increased, you might want to increase your payments. Review your loan annually to make sure it still makes sense for your current circumstances.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Build an Emergency Fund First</h4>
                <p>
                  Before you get aggressive about extra loan payments, make sure you have a basic emergency fund saved—at least $1,000, ideally 3-6 months of expenses. Without this cushion, an unexpected expense could force you to use high-interest credit cards, undermining your debt payoff progress.
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
                <Link href="/mortgage" className="group">
                  <div className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          Mortgage Calculator
                        </h3>
                        <p className="text-sm text-slate-500">Calculate home loan payments</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/loan" className="group">
                  <div className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calculator className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          Loan Calculator
                        </h3>
                        <p className="text-sm text-slate-500">Calculate any type of loan</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/auto-loan" className="group">
                  <div className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          Auto Loan Calculator
                        </h3>
                        <p className="text-sm text-slate-500">Calculate car loan payments</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/" className="group">
                  <div className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calculator className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          All Calculators
                        </h3>
                        <p className="text-sm text-slate-500">Browse all tools</p>
                      </div>
                    </div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accurate calculations.
          </p>
        </div>
      </footer>
    </div>
  );
}
