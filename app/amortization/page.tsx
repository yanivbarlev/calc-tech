"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, TrendingDown, FileText, Plus, Minus } from "lucide-react";

interface AmortizationResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: Date;
  schedule: ScheduleEntry[];
  annualSchedule: AnnualEntry[];
}

interface ScheduleEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  date: Date;
}

interface AnnualEntry {
  year: number;
  principal: number;
  interest: number;
  totalPayment: number;
  balance: number;
}

export default function AmortizationCalculator() {
  // Basic loan inputs
  const [loanAmount, setLoanAmount] = useState<string>("250000");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [startMonth, setStartMonth] = useState<string>("1");
  const [startYear, setStartYear] = useState<string>("2025");

  // Extra payment options
  const [showExtraPayments, setShowExtraPayments] = useState(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<string>("0");
  const [extraMonthlyStartMonth, setExtraMonthlyStartMonth] = useState<string>("1");
  const [extraYearlyPayment, setExtraYearlyPayment] = useState<string>("0");
  const [extraYearlyStartMonth, setExtraYearlyStartMonth] = useState<string>("1");

  const [results, setResults] = useState<AmortizationResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 250000;
    const years = parseFloat(loanTermYears) || 30;
    const months = parseFloat(loanTermMonths) || 0;
    const rate = parseFloat(interestRate) || 6.5;
    const startMo = parseInt(startMonth) || 1;
    const startYr = parseInt(startYear) || 2025;
    const extraMonthly = parseFloat(extraMonthlyPayment) || 0;
    const extraMonthlyStart = parseInt(extraMonthlyStartMonth) || 1;
    const extraYearly = parseFloat(extraYearlyPayment) || 0;
    const extraYearlyStart = parseInt(extraYearlyStartMonth) || 1;

    const totalMonths = years * 12 + months;
    const monthlyRate = rate / 100 / 12;

    // Calculate base monthly payment using amortization formula
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / totalMonths;
    } else {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Generate amortization schedule
    const schedule: ScheduleEntry[] = [];
    let balance = principal;
    let totalPaid = 0;
    let totalInterestPaid = 0;
    let currentDate = new Date(startYr, startMo - 1, 1);

    let monthNum = 1;
    while (balance > 0.01 && monthNum <= totalMonths * 2) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;

      // Add extra monthly payment if applicable
      let extraPayment = 0;
      if (extraMonthly > 0 && monthNum >= extraMonthlyStart) {
        extraPayment += extraMonthly;
      }

      // Add extra yearly payment if applicable (check if current month matches)
      if (extraYearly > 0 && monthNum >= extraYearlyStart) {
        const currentMonth = (startMo - 1 + monthNum - 1) % 12;
        const yearlyPaymentMonth = (extraYearlyStart - 1 + startMo - 1) % 12;
        if (currentMonth === yearlyPaymentMonth && monthNum > extraYearlyStart) {
          extraPayment += extraYearly;
        }
      }

      principalPayment += extraPayment;

      // Don't pay more than remaining balance
      if (principalPayment > balance) {
        principalPayment = balance;
      }

      const totalPayment = interestPayment + principalPayment;
      balance -= principalPayment;

      totalPaid += totalPayment;
      totalInterestPaid += interestPayment;

      schedule.push({
        month: monthNum,
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
        date: new Date(currentDate)
      });

      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      monthNum++;
    }

    // Generate annual summary
    const annualSchedule: AnnualEntry[] = [];
    let currentYear = startYr;
    let yearStartMonth = 1;

    while (yearStartMonth <= schedule.length) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      let yearPayment = 0;
      let yearEndBalance = 0;

      for (let i = yearStartMonth - 1; i < Math.min(yearStartMonth + 11, schedule.length); i++) {
        yearPrincipal += schedule[i].principal;
        yearInterest += schedule[i].interest;
        yearPayment += schedule[i].payment;
        yearEndBalance = schedule[i].balance;
      }

      annualSchedule.push({
        year: currentYear,
        principal: yearPrincipal,
        interest: yearInterest,
        totalPayment: yearPayment,
        balance: yearEndBalance
      });

      yearStartMonth += 12;
      currentYear++;
    }

    const payoffDate = schedule[schedule.length - 1]?.date || new Date();

    setResults({
      monthlyPayment,
      totalPayment: totalPaid,
      totalInterest: totalInterestPaid,
      payoffDate,
      schedule,
      annualSchedule
    });

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
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Amortization Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your loan payment schedule with detailed monthly and annual breakdowns. Visualize how each payment chips away at your principal and interest over time.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
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
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="250000"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Years</label>
                      <Input
                        type="number"
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(e.target.value)}
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Months</label>
                      <Input
                        type="number"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Month</label>
                      <select
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {months.map((month, idx) => (
                          <option key={idx} value={idx + 1}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Year</label>
                      <Input
                        type="number"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        placeholder="2025"
                      />
                    </div>
                  </div>
                </div>

                {/* Extra Payments Toggle */}
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => setShowExtraPayments(!showExtraPayments)}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    {showExtraPayments ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {showExtraPayments ? 'Hide' : 'Add'} Extra Payments
                  </Button>
                </div>

                {/* Extra Payments Section */}
                {showExtraPayments && (
                  <div className="space-y-4 pt-2 border-t">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Extra Monthly Payment ($)
                      </label>
                      <Input
                        type="number"
                        value={extraMonthlyPayment}
                        onChange={(e) => setExtraMonthlyPayment(e.target.value)}
                        placeholder="0"
                      />
                      <label className="block text-xs text-slate-600 mt-2 mb-1">
                        Start Month
                      </label>
                      <Input
                        type="number"
                        value={extraMonthlyStartMonth}
                        onChange={(e) => setExtraMonthlyStartMonth(e.target.value)}
                        placeholder="1"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Extra Yearly Payment ($)
                      </label>
                      <Input
                        type="number"
                        value={extraYearlyPayment}
                        onChange={(e) => setExtraYearlyPayment(e.target.value)}
                        placeholder="0"
                      />
                      <label className="block text-xs text-slate-600 mt-2 mb-1">
                        Payment Month
                      </label>
                      <select
                        value={extraYearlyStartMonth}
                        onChange={(e) => setExtraYearlyStartMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {months.map((month, idx) => (
                          <option key={idx} value={idx + 1}>{month}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Amortization
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Monthly Payment */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Monthly Payment</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.monthlyPayment)}</p>
                    <p className="text-emerald-100">Base payment (principal + interest)</p>
                  </div>
                </Card>

                {/* Summary Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(results.totalInterest)}</p>
                      <p className="text-sm text-slate-600 mt-2">Over life of loan</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(results.totalPayment)}</p>
                      <p className="text-sm text-slate-600 mt-2">Principal + Interest</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Payoff Date
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-slate-800">{formatDate(results.payoffDate)}</p>
                      <p className="text-sm text-slate-600 mt-2">{results.schedule.length} payments</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Amortization Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <FileText className="h-6 w-6 text-emerald-600" />
                        Amortization Schedule
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === 'monthly' ? 'default' : 'outline'}
                          onClick={() => setViewMode('monthly')}
                          className={viewMode === 'monthly' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                        >
                          Monthly
                        </Button>
                        <Button
                          variant={viewMode === 'annual' ? 'default' : 'outline'}
                          onClick={() => setViewMode('annual')}
                          className={viewMode === 'annual' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                        >
                          Annual
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {viewMode === 'monthly' ? (
                      <div className="overflow-x-auto">
                        <div className="max-h-[600px] overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-100 sticky top-0">
                              <tr>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Month</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                                <th className="px-4 py-3 text-right font-semibold text-slate-700">Payment</th>
                                <th className="px-4 py-3 text-right font-semibold text-slate-700">Principal</th>
                                <th className="px-4 py-3 text-right font-semibold text-slate-700">Interest</th>
                                <th className="px-4 py-3 text-right font-semibold text-slate-700">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.schedule.map((entry) => (
                                <tr key={entry.month} className="border-b border-slate-200 hover:bg-emerald-50">
                                  <td className="px-4 py-3 text-slate-800">{entry.month}</td>
                                  <td className="px-4 py-3 text-slate-600">{formatDate(entry.date)}</td>
                                  <td className="px-4 py-3 text-right text-slate-800">{formatCurrency(entry.payment)}</td>
                                  <td className="px-4 py-3 text-right text-emerald-600 font-medium">{formatCurrency(entry.principal)}</td>
                                  <td className="px-4 py-3 text-right text-rose-600">{formatCurrency(entry.interest)}</td>
                                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatCurrency(entry.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-100">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold text-slate-700">Year</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Principal Paid</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Interest Paid</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Total Payment</th>
                              <th className="px-4 py-3 text-right font-semibold text-slate-700">Ending Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.annualSchedule.map((entry) => (
                              <tr key={entry.year} className="border-b border-slate-200 hover:bg-emerald-50">
                                <td className="px-4 py-3 text-slate-800 font-medium">{entry.year}</td>
                                <td className="px-4 py-3 text-right text-emerald-600 font-medium">{formatCurrency(entry.principal)}</td>
                                <td className="px-4 py-3 text-right text-rose-600">{formatCurrency(entry.interest)}</td>
                                <td className="px-4 py-3 text-right text-slate-800">{formatCurrency(entry.totalPayment)}</td>
                                <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatCurrency(entry.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                  Enter your loan details and click Calculate to see your amortization schedule
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Loan Amortization</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Amortization?</h3>
                <p className="mb-4">
                  When you borrow money for something big—a house, a car, or even a business—chances are you'll be dealing with amortization. At its core, amortization is simply the process of paying off a debt over time through regular payments. But here's what makes it interesting: each payment you make isn't just going toward one thing. It's actually split between two parts—the principal (the actual amount you borrowed) and the interest (what the lender charges you for borrowing that money).
                </p>
                <p className="mb-4">
                  Think of it like a seesaw. In the beginning, most of your payment goes toward interest, with only a small portion chipping away at the principal. But as time goes on, that balance shifts. Gradually, more and more of each payment goes toward the principal, until eventually you've paid off the entire loan. This predictable structure is what makes amortization so powerful—you always know exactly when you'll be debt-free.
                </p>
                <p>
                  The word "amortization" actually comes from accounting, where it refers to spreading the cost of an intangible asset over its useful life. You'll hear it used in business contexts too, like when a company amortizes the cost of a patent or goodwill over several years. But for most people, amortization means one thing: the structured repayment of a loan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Loan Payments Break Down</h3>
                <p className="mb-4">
                  Every month when you make a loan payment, something fascinating happens behind the scenes. Your lender takes that payment and divides it into two buckets. First, they calculate the interest you owe based on your current balance. Whatever's left after paying the interest goes toward reducing your principal.
                </p>
                <p className="mb-4">
                  Here's a real-world example: let's say you have a $250,000 mortgage at 6.5% interest. Your first monthly payment might be around $1,580. Of that amount, roughly $1,354 goes to interest and only $226 goes to principal. That might seem discouraging at first—you're paying mostly interest! But stick with it. By year 10, that same $1,580 payment will split more evenly, with around $850 going to principal and $730 to interest. By year 20, you're looking at $1,200 toward principal and just $380 toward interest.
                </p>
                <p className="mb-4">
                  This shifting ratio happens because interest is always calculated on your remaining balance. As you chip away at the principal, there's less money for the interest to compound on. It's a beautiful mathematical dance that works in your favor over time—if you stick with the payment schedule.
                </p>
                <p>
                  That said, many people don't realize they can accelerate this process. Making extra principal payments—even small ones—can dramatically reduce the total interest you pay and shorten your loan term. We'll explore that more in a bit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Amortization vs. Revolving Debt</h3>
                <p className="mb-4">
                  Not all debt works the same way. Amortized loans are fundamentally different from revolving credit, like credit cards. With a credit card, you can borrow up to a certain limit, pay it down, and borrow again. Your payment varies based on your balance, and there's no fixed end date—you could theoretically keep the account open forever.
                </p>
                <p className="mb-4">
                  Amortized loans, on the other hand, have a clear beginning, middle, and end. You borrow a specific amount, make fixed payments, and eventually the debt is completely paid off. This structure provides certainty and discipline. You know exactly when you'll make your last payment, and you can see your progress month by month.
                </p>
                <p className="mb-4">
                  There's also a psychological benefit to amortization. Watching your principal balance shrink—especially in the later years when it drops faster—can be incredibly motivating. It's tangible progress toward financial freedom. Credit cards, by contrast, can feel like you're running on a hamster wheel, especially if you keep adding new charges.
                </p>
                <p>
                  That's why financial advisors often recommend tackling amortized debt strategically while being more cautious with revolving credit. The structure of amortization naturally pushes you toward becoming debt-free, whereas revolving credit requires more self-discipline to avoid perpetual debt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Reading Your Amortization Schedule</h3>
                <p className="mb-4">
                  When you take out an amortized loan, your lender will typically provide you with an amortization schedule—a detailed table showing exactly how each payment will be allocated over the life of the loan. This document is like a roadmap for your debt payoff journey, and it's worth understanding how to read it.
                </p>
                <p className="mb-4">
                  Most schedules show you several key pieces of information for each payment: the payment number (or date), the total payment amount, how much goes to principal, how much goes to interest, and your remaining balance. Looking at this table, you'll notice a clear pattern: interest payments start high and gradually decrease, while principal payments start low and increase over time.
                </p>
                <p className="mb-4">
                  One important thing to understand is that most basic amortization schedules assume you'll make exactly the scheduled payment every month with no extra principal payments. They also typically don't account for fees, insurance, or property taxes (in the case of mortgages). So while your actual monthly bill might be higher, the core principal and interest portion follows the amortization schedule precisely.
                </p>
                <p className="mb-4">
                  You can use your amortization schedule to make strategic decisions. For instance, if you're thinking about making an extra payment, you can look ahead to see how much interest you'll save by paying down principal early. Some people even find it motivating to cross off rows in their schedule as they make each payment—a visual reminder of their progress.
                </p>
                <p>
                  Keep in mind that amortization schedules are most accurate for fixed-rate loans. If you have an adjustable-rate mortgage or a loan with a variable interest rate, your schedule will only be accurate until the rate changes. At that point, the lender will recalculate your payments and provide an updated schedule.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Extra Payments</h3>
                <p className="mb-4">
                  Here's where things get exciting. Even though your amortization schedule assumes you'll make the minimum payment each month, you're usually free to pay more—and doing so can save you tens of thousands of dollars over the life of a loan.
                </p>
                <p className="mb-4">
                  When you make an extra payment and specify that it should go toward principal (this is important!), you're essentially jumping ahead in your amortization schedule. That extra money reduces your balance immediately, which means less interest accrues on your next payment. Over time, this snowballs into significant savings.
                </p>
                <p className="mb-4">
                  Let's look at a concrete example. Take that $250,000 mortgage at 6.5% we mentioned earlier. Over 30 years, you'd pay about $317,000 in interest—more than the original loan amount! But if you added just $100 to each monthly payment, you'd save roughly $55,000 in interest and pay off the loan five years earlier. That's the power of extra principal payments.
                </p>
                <p className="mb-4">
                  There are different strategies for making extra payments. Some people add a fixed amount to each monthly payment. Others make one extra payment per year (often using a tax refund or bonus). Still others make one-time lump sum payments when they have extra cash. All of these approaches work—it's just a matter of what fits your budget and goals.
                </p>
                <p>
                  One word of caution: before making extra payments, check if your loan has any prepayment penalties. Most modern mortgages and auto loans don't, but some personal loans and older mortgages do. You'll also want to make sure your lender applies extra payments to principal rather than simply crediting them toward future payments. A quick call to your lender can clarify this.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Business Amortization and Intangible Assets</h3>
                <p className="mb-4">
                  While most people think of amortization in terms of loans, the concept also plays a crucial role in business accounting. Companies use amortization to spread the cost of intangible assets—things like patents, trademarks, copyrights, and goodwill—over their useful lives.
                </p>
                <p className="mb-4">
                  This is similar to depreciation, which businesses use for physical assets like equipment and buildings. The key difference is that amortization applies to non-physical assets. For instance, if a company buys a patent for $100,000 that's valid for 20 years, they might amortize that cost at $5,000 per year. This spreads the expense across the period when the patent provides value, rather than taking a massive hit to profits in the year of purchase.
                </p>
                <p className="mb-4">
                  Startup costs are another area where business amortization comes into play. The IRS allows businesses to deduct up to $5,000 of startup costs in their first year, with the remainder amortized over 15 years. So if you spent $50,000 getting your business off the ground, you could deduct $5,000 immediately and then deduct $3,000 per year for the next 15 years.
                </p>
                <p>
                  Understanding business amortization is important for entrepreneurs and investors. It affects how a company's financial statements look, which in turn influences everything from tax liability to stock valuations. Just like with loan amortization, it's all about spreading costs over time in a way that accurately reflects economic reality.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed-Rate vs. Adjustable-Rate Amortization</h3>
                <p className="mb-4">
                  Most of what we've discussed assumes you have a fixed-rate loan, where your interest rate stays the same for the entire loan term. With fixed-rate loans, your amortization schedule is set in stone from day one—you know exactly what each payment will look like and when you'll be debt-free.
                </p>
                <p className="mb-4">
                  Adjustable-rate mortgages (ARMs) and other variable-rate loans work differently. These loans typically start with a fixed rate for a certain period (say, five years), then adjust periodically based on market conditions. When the rate changes, your lender recalculates your payment to ensure the loan will still be paid off by the original end date.
                </p>
                <p className="mb-4">
                  This means your amortization schedule isn't truly fixed with an ARM. If interest rates rise, your monthly payment increases to keep pace. If rates fall, your payment decreases. The principal-to-interest ratio at any given time depends on the current interest rate and how far along you are in the loan term.
                </p>
                <p className="mb-4">
                  ARMs can be a double-edged sword. In a falling interest rate environment, you benefit from lower payments. But if rates rise significantly, you could find yourself paying much more than you initially budgeted for. This unpredictability is why many people prefer fixed-rate loans, especially for long-term commitments like mortgages—the stability and predictability are worth the potential trade-off of a slightly higher initial rate.
                </p>
                <p>
                  If you do have an adjustable-rate loan, it's wise to keep an eye on when your rate will adjust and what the new payment might look like. Some people choose to refinance to a fixed-rate loan before the adjustment period begins, locking in predictability before their payments can increase.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Amortization Pitfalls to Avoid</h3>
                <p className="mb-4">
                  Understanding amortization is one thing; using that knowledge to your advantage is another. Here are some common mistakes people make—and how to avoid them.
                </p>
                <p className="mb-4">
                  First, many borrowers focus solely on the monthly payment without considering the total cost of the loan. A longer loan term means lower monthly payments, which sounds great. But it also means you'll pay significantly more interest over time. Before choosing a 30-year mortgage over a 15-year one, crunch the numbers to see the total difference. Sometimes that lower monthly payment isn't worth the extra decades of interest.
                </p>
                <p className="mb-4">
                  Second, some people are too aggressive with extra payments, draining their emergency fund or sacrificing other important financial goals. While paying off debt early is admirable, you don't want to leave yourself vulnerable to unexpected expenses or miss out on employer retirement contributions that offer a guaranteed return. Balance is key.
                </p>
                <p className="mb-4">
                  Third, borrowers sometimes forget to specify that extra payments should go toward principal. If you don't indicate this, some lenders will simply apply the extra money to future payments, which doesn't save you any interest. Always confirm with your lender how extra payments will be handled.
                </p>
                <p className="mb-4">
                  Finally, people often underestimate the psychological impact of debt. Even a mathematically optimal strategy can fail if it doesn't account for human behavior. If having debt keeps you up at night, it might be worth paying it off faster even if the math suggests investing that money elsewhere would yield higher returns. Your peace of mind has value too.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p className="mb-4">
                  This amortization calculator is designed to give you a complete picture of your loan repayment journey. You can input your basic loan details—amount, term, and interest rate—and instantly see your monthly payment along with a detailed breakdown of every single payment over the life of the loan.
                </p>
                <p className="mb-4">
                  The monthly view shows you exactly how each payment is divided between principal and interest, along with your remaining balance. This is incredibly useful for tracking your progress or seeing how your loan evolves over time. The annual view, on the other hand, gives you a high-level summary of how much you'll pay each year, making it easier to plan for the big picture.
                </p>
                <p className="mb-4">
                  One of the most powerful features is the ability to model extra payments. Try adding $100, $500, or even $1,000 to your monthly payment and watch how dramatically it changes your payoff date and total interest paid. You can also model yearly extra payments (like using an annual bonus) or one-time lump sum payments. This helps you make informed decisions about whether extra payments make sense for your situation.
                </p>
                <p className="mb-4">
                  Don't be afraid to play around with different scenarios. What if you chose a 15-year term instead of 30 years? What if you locked in a lower interest rate? What if you refinanced in five years? The calculator makes it easy to compare options side by side so you can choose the path that aligns with your financial goals.
                </p>
                <p>
                  Remember, this calculator assumes a fixed interest rate and doesn't account for fees, taxes, or insurance that might be part of your actual payment. For mortgages, your real monthly bill will likely be higher once you factor in property taxes and homeowners insurance. But the principal and interest portion—the core of your amortization schedule—will match what you see here.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate home loan payments</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">General loan payment calculator</div>
                  </div>
                </Link>
                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <TrendingDown className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Auto Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate car loan payments</div>
                  </div>
                </Link>
                <Link href="/interest" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <TrendingDown className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Interest Calculator</div>
                    <div className="text-sm text-slate-600">Calculate interest and growth</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with accuracy and care.
          </p>
        </div>
      </footer>
    </div>
  );
}
