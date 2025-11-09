"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, Percent, TrendingDown, GraduationCap, BookOpen, Clock } from "lucide-react";

interface StudentLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  payoffDate: string;
  totalMonths: number;
  interestSavings: number;
  newPayoffDate: string;
  timeSaved: number;
}

interface PaymentScheduleEntry {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  extraPayment: number;
}

export default function StudentLoanCalculator() {
  const [loanBalance, setLoanBalance] = useState<string>("35000");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [interestRate, setInterestRate] = useState<string>("4.5");
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<string>("0");
  const [extraYearlyPayment, setExtraYearlyPayment] = useState<string>("0");
  const [oneTimePayment, setOneTimePayment] = useState<string>("0");

  const [results, setResults] = useState<StudentLoanResults | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateStudentLoan = () => {
    const balance = parseFloat(loanBalance) || 0;
    const years = parseFloat(loanTerm) || 10;
    const rate = parseFloat(interestRate) || 0;
    const extraMonthly = parseFloat(extraMonthlyPayment) || 0;
    const extraYearly = parseFloat(extraYearlyPayment) || 0;
    const oneTime = parseFloat(oneTimePayment) || 0;

    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    // Calculate standard monthly payment using amortization formula
    const monthlyPayment = balance *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - balance;

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear() + years, today.getMonth());
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Generate payment schedule with extra payments
    const schedule: PaymentScheduleEntry[] = [];
    let remainingBalance = balance - oneTime; // Apply one-time payment immediately
    const startDate = new Date();
    let month = 0;
    let totalPaid = oneTime;
    let totalInterestPaid = 0;

    while (remainingBalance > 0.01 && month < numPayments * 2) {
      month++;
      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;

      // Add extra monthly payment
      let extraThisMonth = extraMonthly;

      // Add extra yearly payment (in month 12, 24, 36, etc.)
      if (month % 12 === 0) {
        extraThisMonth += extraYearly;
      }

      // Ensure we don't overpay
      if (principalPayment + extraThisMonth > remainingBalance) {
        principalPayment = remainingBalance;
        extraThisMonth = 0;
      }

      const totalPaymentThisMonth = monthlyPayment + extraThisMonth;
      remainingBalance -= (principalPayment + extraThisMonth);
      totalPaid += totalPaymentThisMonth;
      totalInterestPaid += interestPayment;

      const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + month);

      schedule.push({
        month,
        date: paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        payment: totalPaymentThisMonth,
        principal: principalPayment + extraThisMonth,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance),
        extraPayment: extraThisMonth
      });
    }

    const actualMonths = month;
    const newPayoffDate = new Date(startDate.getFullYear(), startDate.getMonth() + actualMonths);
    const newPayoffDateStr = newPayoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const interestSavings = totalInterest - totalInterestPaid;
    const timeSaved = numPayments - actualMonths;

    setResults({
      monthlyPayment,
      totalPayment: totalPaid,
      totalInterest: totalInterestPaid,
      loanAmount: balance,
      payoffDate: payoffDateStr,
      totalMonths: numPayments,
      interestSavings,
      newPayoffDate: newPayoffDateStr,
      timeSaved
    });

    setPaymentSchedule(schedule);
    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculateStudentLoan();
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
    return value.toLocaleString('en-US');
  };

  return (
    <>
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
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-normal pb-1">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-600">Professional Financial Tools</div>
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
            <GraduationCap className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Student Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your student loan payments, total interest costs, and discover how extra payments can save you thousands while cutting years off your repayment timeline.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Total Loan Balance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={loanBalance}
                      onChange={(e) => setLoanBalance(e.target.value)}
                      className="pl-7"
                      placeholder="35000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (%)
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

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">Extra Payments (Optional)</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Extra Monthly Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={extraMonthlyPayment}
                          onChange={(e) => setExtraMonthlyPayment(e.target.value)}
                          className="pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Extra Yearly Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={extraYearlyPayment}
                          onChange={(e) => setExtraYearlyPayment(e.target.value)}
                          className="pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        One-Time Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={oneTimePayment}
                          onChange={(e) => setOneTimePayment(e.target.value)}
                          className="pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateStudentLoan}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Payments
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-8">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Monthly Payment</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.monthlyPayment)}</p>
                    <p className="text-emerald-100">Standard monthly payment amount</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Interest Paid:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Payments:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-slate-600">Loan Amount:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.loanAmount)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Payoff Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Payoff Date:</span>
                        <span className="font-semibold">{results.newPayoffDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Months:</span>
                        <span className="font-semibold">{paymentSchedule.length} months</span>
                      </div>
                      {results.timeSaved > 0 && (
                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="text-emerald-600 font-medium">Time Saved:</span>
                          <span className="font-semibold text-emerald-600">{results.timeSaved} months</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Interest Savings Card (if applicable) */}
                {results.interestSavings > 0 && (
                  <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl">
                          <TrendingDown className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">Interest Savings</h3>
                          <p className="text-3xl font-bold text-emerald-600 mb-2">
                            {formatCurrency(results.interestSavings)}
                          </p>
                          <p className="text-slate-600">
                            By making extra payments, you'll save {formatCurrency(results.interestSavings)} in interest
                            and pay off your loan {results.timeSaved} months ({(results.timeSaved / 12).toFixed(1)} years) earlier!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2 text-slate-700">
                        <Clock className="h-6 w-6 text-emerald-600" />
                        Payment Schedule
                      </CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => setShowSchedule(!showSchedule)}
                        className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                      >
                        {showSchedule ? 'Hide' : 'Show'} Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  {showSchedule && (
                    <CardContent className="pt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-slate-200">
                              <th className="text-left py-3 px-2 font-semibold text-slate-700">Month</th>
                              <th className="text-left py-3 px-2 font-semibold text-slate-700">Date</th>
                              <th className="text-right py-3 px-2 font-semibold text-slate-700">Payment</th>
                              <th className="text-right py-3 px-2 font-semibold text-slate-700">Principal</th>
                              <th className="text-right py-3 px-2 font-semibold text-slate-700">Interest</th>
                              <th className="text-right py-3 px-2 font-semibold text-slate-700">Extra</th>
                              <th className="text-right py-3 px-2 font-semibold text-slate-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentSchedule.slice(0, 120).map((entry, index) => (
                              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-2 px-2">{entry.month}</td>
                                <td className="py-2 px-2">{entry.date}</td>
                                <td className="py-2 px-2 text-right">{formatCurrency(entry.payment)}</td>
                                <td className="py-2 px-2 text-right">{formatCurrency(entry.principal - entry.extraPayment)}</td>
                                <td className="py-2 px-2 text-right">{formatCurrency(entry.interest)}</td>
                                <td className="py-2 px-2 text-right text-emerald-600">
                                  {entry.extraPayment > 0 ? formatCurrency(entry.extraPayment) : '-'}
                                </td>
                                <td className="py-2 px-2 text-right font-medium">{formatCurrency(entry.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {paymentSchedule.length > 120 && (
                          <p className="text-center text-sm text-slate-500 mt-4">
                            Showing first 120 payments of {paymentSchedule.length} total
                          </p>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <GraduationCap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your loan details and click Calculate to see your payment schedule and potential savings
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Student Loans</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Are Student Loans?</h3>
                <p>
                  Student loans are financial instruments designed to help students cover the costs of higher education, including tuition, books, housing, and living expenses. Unlike other forms of borrowing, student loans typically offer more favorable terms—lower interest rates, deferred payment options, and flexible repayment plans. They've become a cornerstone of how millions of Americans finance their college education.
                </p>
                <p className="mt-3">
                  The thing is, not all student loans are created equal. You'll find two main categories: federal loans backed by the government and private loans from banks or financial institutions. Each comes with its own set of rules, benefits, and potential pitfalls. Understanding these differences can save you thousands of dollars over the life of your loan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Federal Student Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Direct Subsidized Loans</h4>
                <p>
                  These are need-based loans available to undergraduate students who demonstrate financial need. Here's what makes them special: the federal government pays the interest while you're in school at least half-time, during your grace period (usually six months after graduation), and during any deferment periods. It's essentially free money in the form of unpaid interest. For the 2024-2025 academic year, these loans carry a fixed interest rate of 5.50%.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Direct Unsubsidized Loans</h4>
                <p>
                  Unlike subsidized loans, you don't need to demonstrate financial need to qualify for these. They're available to both undergraduate and graduate students. The catch? Interest starts accruing from the day the loan is disbursed. You can choose to pay the interest while in school, or let it accumulate and get added to your principal balance (a process called capitalization). Graduate students face a slightly higher rate at 7.05% for unsubsidized loans.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Direct PLUS Loans</h4>
                <p>
                  These loans come in two flavors: Parent PLUS loans for parents of dependent undergraduate students, and Grad PLUS loans for graduate and professional students. They typically have higher interest rates (currently 8.05%) and require a credit check, though the requirements aren't as stringent as private loans. PLUS loans can cover the full cost of attendance minus any other financial aid received.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Direct Consolidation Loans</h4>
                <p>
                  If you're juggling multiple federal student loans, consolidation allows you to combine them into a single loan with one monthly payment. The new interest rate is the weighted average of your existing loans, rounded up to the nearest one-eighth of a percent. While this doesn't lower your interest rate, it can simplify repayment and potentially give you access to different repayment plans.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Private Student Loans: What You Should Know</h3>
                <p>
                  Private student loans fill the gap when federal aid doesn't cover your full education costs. Banks, credit unions, and online lenders offer these loans, and they typically base approval and interest rates on your creditworthiness (or your cosigner's if you're a student without established credit). Interest rates can be fixed or variable, and they're almost always higher than federal loan rates.
                </p>
                <p className="mt-3">
                  The key difference? Private loans lack the borrower protections that federal loans offer. You won't have access to income-driven repayment plans, loan forgiveness programs, or generous forbearance options. That's why financial experts universally recommend maxing out your federal loan options before turning to private lenders. If you do need private loans, shop around aggressively—rates can vary significantly between lenders.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Federal Repayment Plans Explained</h3>
                <p>
                  The federal government offers several repayment plans, each designed for different financial situations. Here's what you need to know about your options:
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Standard Repayment Plan</h4>
                <p>
                  This is the default plan—fixed payments over 10 years. It costs the least in total interest because you're paying off the loan quickly, but monthly payments are higher than extended or income-driven plans. Most borrowers who can afford it should stick with this plan.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Graduated Repayment Plan</h4>
                <p>
                  Payments start low and increase every two years, with the loan paid off in 10 years. This plan works if you expect your income to rise steadily, but you'll pay more interest overall compared to the standard plan because your early payments barely dent the principal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Extended Repayment Plan</h4>
                <p>
                  Available if you owe more than $30,000 in Direct Loans, this plan stretches payments over 25 years. Your monthly payment drops significantly, but you'll pay substantially more interest over the loan's life. It's a trade-off between cash flow and total cost.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Income-Driven Repayment Plans</h4>
                <p>
                  These plans (including IBR, PAYE, REPAYE, and ICR) cap your monthly payment at a percentage of your discretionary income, typically 10-20%. After 20-25 years of qualifying payments, any remaining balance is forgiven. The new SAVE plan, which replaces REPAYE, offers even more generous terms—single borrowers earning under about $32,800 have $0 monthly payments, and interest doesn't grow beyond what you pay each month.
                </p>
                <p className="mt-3">
                  Income-driven plans are fantastic if you're in public service (eligible for forgiveness after 10 years through PSLF) or if your debt is high relative to your income. However, if your income is solid and you're not pursuing forgiveness, you'll pay significantly more interest over time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Extra Payments</h3>
                <p>
                  Here's a secret that can save you thousands: making extra payments toward your student loans can dramatically reduce both your total interest and your repayment timeline. Even an extra $50 or $100 per month makes a real difference.
                </p>
                <p className="mt-3">
                  Let's say you have $35,000 in loans at 4.5% interest with a 10-year repayment term. Your standard monthly payment would be about $363. But if you paid an extra $100 per month, you'd save nearly $3,000 in interest and pay off the loan 2.5 years earlier. That's money in your pocket and years of freedom from debt.
                </p>
                <p className="mt-3">
                  The key is to specify that extra payments should go toward principal, not future payments. Most loan servicers let you do this online when making a payment. Otherwise, they might just advance your due date, which doesn't save you any interest.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Repayment Strategies</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Avalanche Method</h4>
                <p>
                  If you have multiple loans, pay minimums on everything and throw extra money at the loan with the highest interest rate. Once that's paid off, move to the next highest rate. This approach saves you the most money in interest.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Snowball Method</h4>
                <p>
                  Pay minimums on everything except your smallest loan balance, which you attack aggressively. Once it's gone, move to the next smallest. This approach costs slightly more in interest but provides psychological wins that help many people stay motivated.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Refinancing Considerations</h4>
                <p>
                  If you have good credit and steady income, refinancing your student loans with a private lender could lower your interest rate significantly. But be careful—refinancing federal loans means losing federal protections like income-driven repayment and forgiveness programs. Only refinance federal loans if you're absolutely certain you won't need those benefits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Questions About Student Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Should I pay off student loans early?</h4>
                <p>
                  It depends on your interest rate and other financial priorities. If your student loan rate is above 5-6%, paying it off aggressively usually makes sense. If it's below 4%, you might get better returns by investing that money instead, especially if you have access to employer 401(k) matching. Always keep an emergency fund of 3-6 months' expenses before aggressively paying down low-interest debt.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">What happens if I can't make my payments?</h4>
                <p>
                  Don't just stop paying. Contact your loan servicer immediately. For federal loans, you might qualify for deferment or forbearance, which temporarily pause payments. Income-driven repayment plans can also lower payments to as little as $0 if your income is low enough. Missing payments damages your credit and can lead to default, wage garnishment, and tax refund seizure.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">How does interest capitalization work?</h4>
                <p>
                  When unpaid interest gets added to your principal balance, that's capitalization. It happens at specific times: when a deferment or forbearance ends, when you leave an income-driven repayment plan, or when you fail to recertify your income. Once interest capitalizes, you're paying interest on interest, which significantly increases your total cost. The new SAVE plan eliminates capitalization in many situations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Is student loan forgiveness taxable?</h4>
                <p>
                  Currently, forgiveness through Public Service Loan Forgiveness (PSLF) is not taxable. However, forgiveness through income-driven repayment plans after 20-25 years is typically considered taxable income, though this could change with future legislation. Make sure to plan for this potential tax bomb if you're pursuing income-driven forgiveness.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Grace Periods and Deferment</h3>
                <p>
                  Most student loans come with a grace period—typically six months after you graduate, leave school, or drop below half-time enrollment. During this time, you're not required to make payments. For subsidized federal loans, interest doesn't accrue during the grace period. For unsubsidized and private loans, interest continues to build.
                </p>
                <p className="mt-3">
                  Even if you're not required to pay during your grace period, consider making interest-only payments if you can. This prevents that interest from capitalizing onto your principal balance when repayment begins. A few hundred dollars paid during your grace period can save you thousands over the life of your loan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This student loan calculator helps you understand the true cost of your education debt and visualize how different repayment strategies affect your timeline and total interest paid. Start by entering your current loan balance, interest rate, and term. The calculator will show your standard monthly payment and total interest.
                </p>
                <p className="mt-3">
                  Then experiment with the extra payment fields. Try adding $50, $100, or even $200 to your monthly payment and see how dramatically it changes your payoff date and interest savings. The payment schedule breaks down exactly where each dollar goes—principal, interest, and extra payments—month by month.
                </p>
                <p className="mt-3">
                  Use this tool to set realistic goals. Maybe you can't afford an extra $200 monthly right now, but you could swing $25. Every little bit helps, and seeing the concrete savings can motivate you to find room in your budget for those extra payments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/loan" className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 mb-1">Loan Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate payments for personal loans and other debt</p>
                </Link>
                <Link href="/interest" className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 mb-1">Interest Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate interest earned or paid on any amount</p>
                </Link>
                <Link href="/compound-interest" className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 mb-1">Compound Interest Calculator</h4>
                  <p className="text-sm text-slate-600">See how your investments grow with compound interest</p>
                </Link>
                <Link href="/savings" className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 mb-1">Savings Calculator</h4>
                  <p className="text-sm text-slate-600">Plan your savings goals and track progress</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy and simplicity.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
