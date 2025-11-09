"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, TrendingDown, CreditCard, Target, X, Plus } from "lucide-react";

interface DebtItem {
  id: number;
  name: string;
  balance: string;
  minPayment: string;
  interestRate: string;
}

interface DebtPayoffResults {
  totalDebt: number;
  totalMinPayment: number;
  payoffMonths: number;
  payoffDate: string;
  totalInterestPaid: number;
  totalPaid: number;
  monthsSaved: number;
  interestSaved: number;
}

interface PayoffScheduleEntry {
  debtName: string;
  balance: number;
  rate: number;
  payoffMonth: number;
  totalInterest: number;
}

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: 1, name: "Credit Card 1", balance: "5000", minPayment: "150", interestRate: "18.99" },
    { id: 2, name: "Credit Card 2", balance: "3500", minPayment: "100", interestRate: "15.5" },
    { id: 3, name: "Personal Loan", balance: "8000", minPayment: "200", interestRate: "12.0" },
  ]);
  const [monthlyExtra, setMonthlyExtra] = useState<string>("200");
  const [yearlyExtra, setYearlyExtra] = useState<string>("1000");
  const [oneTimePayment, setOneTimePayment] = useState<string>("0");
  const [oneTimeMonth, setOneTimeMonth] = useState<string>("0");

  const [results, setResults] = useState<DebtPayoffResults | null>(null);
  const [payoffSchedule, setPayoffSchedule] = useState<PayoffScheduleEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const addDebt = () => {
    const newId = Math.max(...debts.map(d => d.id), 0) + 1;
    setDebts([...debts, { id: newId, name: "", balance: "", minPayment: "", interestRate: "" }]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof DebtItem, value: string) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculateDebtPayoff = () => {
    // Parse inputs
    const extraMonthly = parseFloat(monthlyExtra) || 0;
    const extraYearly = parseFloat(yearlyExtra) || 0;
    const oneTime = parseFloat(oneTimePayment) || 0;
    const oneTimeMonthNum = parseInt(oneTimeMonth) || 0;

    // Parse debts and sort by interest rate (highest first - avalanche method)
    const validDebts = debts
      .filter(d => parseFloat(d.balance) > 0 && parseFloat(d.minPayment) > 0)
      .map(d => ({
        name: d.name || "Unnamed Debt",
        balance: parseFloat(d.balance),
        minPayment: parseFloat(d.minPayment),
        rate: parseFloat(d.interestRate) / 100 / 12, // Monthly rate
        annualRate: parseFloat(d.interestRate),
      }))
      .sort((a, b) => b.rate - a.rate); // Sort by highest rate first

    if (validDebts.length === 0) return;

    const totalDebt = validDebts.reduce((sum, d) => sum + d.balance, 0);
    const totalMinPayment = validDebts.reduce((sum, d) => sum + d.minPayment, 0);

    // Calculate payoff with avalanche method
    let debtsCopy = validDebts.map(d => ({ ...d, remainingBalance: d.balance, totalInterest: 0 }));
    let month = 0;
    const schedule: PayoffScheduleEntry[] = [];
    let totalInterest = 0;

    // Calculate baseline (no extra payments)
    let baselineDebts = validDebts.map(d => ({ ...d, remainingBalance: d.balance }));
    let baselineMonth = 0;
    let baselineTotalInterest = 0;

    while (baselineDebts.some(d => d.remainingBalance > 0) && baselineMonth < 1200) {
      baselineMonth++;
      baselineDebts.forEach(debt => {
        if (debt.remainingBalance > 0) {
          const interest = debt.remainingBalance * debt.rate;
          baselineTotalInterest += interest;
          const principal = debt.minPayment - interest;
          debt.remainingBalance = Math.max(0, debt.remainingBalance - principal);
        }
      });
    }

    // Calculate with extra payments (avalanche method)
    while (debtsCopy.some(d => d.remainingBalance > 0) && month < 1200) {
      month++;

      // Add one-time payment if applicable
      let availableExtra = extraMonthly + (month === oneTimeMonthNum ? oneTime : 0);

      // Add yearly payment if applicable (assuming it comes in month 1 and every 12 months)
      if (month % 12 === 1) {
        availableExtra += extraYearly;
      }

      // Apply minimum payments and interest to all debts
      debtsCopy.forEach(debt => {
        if (debt.remainingBalance > 0) {
          const interest = debt.remainingBalance * debt.rate;
          totalInterest += interest;
          debt.totalInterest += interest;
          const principal = Math.min(debt.minPayment - interest, debt.remainingBalance);
          debt.remainingBalance = Math.max(0, debt.remainingBalance - principal);
        }
      });

      // Apply extra payment to highest interest rate debt (avalanche method)
      while (availableExtra > 0 && debtsCopy.some(d => d.remainingBalance > 0)) {
        const highestRateDebt = debtsCopy.find(d => d.remainingBalance > 0);
        if (!highestRateDebt) break;

        const payment = Math.min(availableExtra, highestRateDebt.remainingBalance);
        highestRateDebt.remainingBalance -= payment;
        availableExtra -= payment;

        // Record when debt is paid off
        if (highestRateDebt.remainingBalance === 0) {
          const originalDebt = validDebts.find(d => d.name === highestRateDebt.name);
          if (originalDebt) {
            schedule.push({
              debtName: highestRateDebt.name,
              balance: originalDebt.balance,
              rate: originalDebt.annualRate,
              payoffMonth: month,
              totalInterest: highestRateDebt.totalInterest,
            });
          }
        }
      }
    }

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear(), today.getMonth() + month);
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const totalPaid = totalDebt + totalInterest;
    const monthsSaved = baselineMonth - month;
    const interestSaved = baselineTotalInterest - totalInterest;

    setResults({
      totalDebt,
      totalMinPayment,
      payoffMonths: month,
      payoffDate: payoffDateStr,
      totalInterestPaid: totalInterest,
      totalPaid,
      monthsSaved: monthsSaved > 0 ? monthsSaved : 0,
      interestSaved: interestSaved > 0 ? interestSaved : 0,
    });

    setPayoffSchedule(schedule);
    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculateDebtPayoff();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
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
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </span>
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
            <CreditCard className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Debt Payoff Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a strategic plan to pay off your debts faster using the proven debt avalanche method
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Your Debts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Debts List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="border-2 border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Debt #{index + 1}</span>
                        {debts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDebt(debt.id)}
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Debt Name
                        </label>
                        <Input
                          type="text"
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                          placeholder="e.g., Credit Card"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Balance
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={debt.balance}
                            onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                            className="pl-7"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Minimum Payment
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={debt.minPayment}
                            onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)}
                            className="pl-7"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Interest Rate (APR)
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={debt.interestRate}
                            onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                            className="pr-7"
                            placeholder="0"
                            step="0.01"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addDebt}
                  variant="outline"
                  className="w-full border-2 border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Debt
                </Button>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-semibold text-slate-700">Extra Payments</h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Monthly Extra Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={monthlyExtra}
                        onChange={(e) => setMonthlyExtra(e.target.value)}
                        className="pl-7"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Yearly Extra Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={yearlyExtra}
                        onChange={(e) => setYearlyExtra(e.target.value)}
                        className="pl-7"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      One-Time Payment
                    </label>
                    <div className="relative mb-2">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={oneTimePayment}
                        onChange={(e) => setOneTimePayment(e.target.value)}
                        className="pl-7"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Apply in Month
                      </label>
                      <Input
                        type="number"
                        value={oneTimeMonth}
                        onChange={(e) => setOneTimeMonth(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateDebtPayoff}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Payoff Plan
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
                      <Calendar className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Debt-Free Date</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{results.payoffDate}</p>
                    <p className="text-emerald-100">You'll be debt-free in {formatMonths(results.payoffMonths)}</p>
                  </div>
                </Card>

                {/* Summary Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Debt
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Principal:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalDebt)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Interest Paid:</span>
                        <span className="font-semibold text-lg text-red-600">{formatCurrency(results.totalInterestPaid)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-slate-700 font-semibold">Total Paid:</span>
                        <span className="font-bold text-xl">{formatCurrency(results.totalPaid)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Monthly Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Minimum Required:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalMinPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Extra Payment:</span>
                        <span className="font-semibold text-lg text-emerald-600">{formatCurrency(parseFloat(monthlyExtra) || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-slate-700 font-semibold">Total Monthly:</span>
                        <span className="font-bold text-xl">{formatCurrency(results.totalMinPayment + (parseFloat(monthlyExtra) || 0))}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Savings from Extra Payments */}
                {results.monthsSaved > 0 && (
                  <Card className="border-2 border-emerald-200 rounded-2xl shadow-md bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
                        <Target className="h-5 w-5" />
                        Savings from Extra Payments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Time Saved:</span>
                        <span className="font-semibold text-lg text-emerald-700">{formatMonths(results.monthsSaved)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Interest Saved:</span>
                        <span className="font-bold text-xl text-emerald-700">{formatCurrency(results.interestSaved)}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payoff Schedule */}
                {payoffSchedule.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="text-xl">Payoff Schedule (Avalanche Method)</CardTitle>
                      <p className="text-sm text-slate-600 mt-2">Debts paid off in order of highest to lowest interest rate</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {payoffSchedule.map((item, index) => (
                          <div key={index} className="border-2 border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-lg text-slate-800">{item.debtName}</h4>
                                <p className="text-sm text-slate-600">Paid off in month {item.payoffMonth}</p>
                              </div>
                              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {item.rate.toFixed(2)}% APR
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-600">Original Balance:</span>
                                <p className="font-semibold">{formatCurrency(item.balance)}</p>
                              </div>
                              <div>
                                <span className="text-slate-600">Interest Paid:</span>
                                <p className="font-semibold text-red-600">{formatCurrency(item.totalInterest)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
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
                  Enter your debts and click Calculate to see your payoff plan
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Debt Payoff Strategies</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is the Debt Avalanche Method?</h3>
                <p>
                  The debt avalanche method is widely recognized as the most mathematically efficient way to eliminate debt. Here's how it works: you continue making minimum payments on all your debts while directing any extra money toward the debt with the highest interest rate. Once that debt is completely paid off, you take the total amount you were paying on it and apply it to the debt with the next-highest rate. This creates a cascading effect—hence the "avalanche" metaphor—where your available payment amount grows larger as each debt falls away.
                </p>
                <p className="mt-3">
                  The beauty of this approach lies in simple mathematics. High-interest debt costs you more money over time, so eliminating it first saves you the most in interest charges. For example, if you have a credit card charging 19.99% APR and a personal loan at 8%, paying off that credit card first means less of your money goes toward interest and more goes toward actually reducing your debt. Over the course of months or years, these savings can add up to thousands of dollars.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Does This Calculator Work?</h3>
                <p>
                  Our debt payoff calculator uses the avalanche method to create your personalized payoff plan. You start by entering each of your debts—the balance, minimum monthly payment, and annual percentage rate (APR). The calculator then sorts these debts from highest to lowest interest rate. This ordering is crucial because it determines which debt gets tackled first with any extra payments you can afford.
                </p>
                <p className="mt-3">
                  Next, you specify how much extra you can put toward debt each month. Maybe you've freed up $200 from your budget, or perhaps you're planning to apply a yearly bonus. The calculator simulates your payment schedule month by month, applying minimum payments to all debts and directing extra payments to the highest-rate debt. When that debt reaches zero, the payment you were making on it gets rolled into attacking the next debt on the list.
                </p>
                <p className="mt-3">
                  The results show you exactly when you'll be debt-free, how much interest you'll pay along the way, and—most importantly—how much time and money you're saving compared to just making minimum payments. This comparison can be eye-opening. Many people discover they can shave years off their debt timeline and save tens of thousands of dollars simply by adding a modest extra payment each month.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Understanding the Payoff Timeline</h4>
                <p>
                  Time is one of the most valuable aspects of debt repayment. The calculator provides a precise payoff date, showing you exactly when you'll make your final payment. But it's not just about reaching that finish line—it's about understanding the journey. The payoff schedule breaks down which debts disappear when, helping you see tangible progress milestones along the way. This visibility can be incredibly motivating when you're in the thick of debt repayment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Power of Extra Payments</h3>
                <p>
                  Even small additional payments can dramatically accelerate your journey to becoming debt-free. Consider this scenario: if you have $10,000 in credit card debt at 18% APR with a minimum payment of $200 per month, you'll be paying for over seven years and rack up more than $7,000 in interest charges. Now, add just $100 extra per month. Suddenly, you're done in less than four years and save over $4,000 in interest. That's the power we're talking about.
                </p>
                <p className="mt-3">
                  There are various ways to generate extra payments. Some people trim their entertainment budget, others sell items they no longer need, and many find creative ways to boost their income through side gigs. The key is consistency. A reliable $50 extra payment every single month often beats sporadic larger payments. It's like the difference between a steady stream wearing down a rock versus occasional waves—persistence wins.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Windfall Strategy</h4>
                <p>
                  Tax refunds, work bonuses, inheritance money, or other financial windfalls present golden opportunities. Rather than letting these lump sums slip through your fingers on discretionary spending, applying them directly to debt can leap you forward by months or even years. Our calculator lets you model one-time payments so you can see exactly how much acceleration a tax refund or bonus would provide. Sometimes seeing those numbers is all the motivation you need to make the smart choice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Avalanche vs. Snowball: Which Is Right for You?</h3>
                <p>
                  While the avalanche method saves you the most money, it's worth understanding the alternative: the debt snowball method. With snowball, you pay off debts from smallest balance to largest, regardless of interest rate. The appeal here is psychological. Eliminating a small debt quickly gives you a win, a sense of accomplishment that can fuel your motivation to keep going. Some people need that emotional boost more than they need maximum mathematical efficiency.
                </p>
                <p className="mt-3">
                  So which should you choose? If you're highly motivated by numbers and want to minimize interest payments, avalanche is your method. If you need quick wins to stay engaged and motivated, snowball might work better for you. There's no wrong answer—the best debt payoff strategy is the one you'll actually stick with. That said, for most people with significant high-interest debt, the avalanche method's financial advantages are too substantial to ignore.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">A Hybrid Approach</h4>
                <p>
                  Some financial experts suggest a hybrid strategy: use the snowball method to knock out one or two small debts quickly for that psychological win, then switch to avalanche for the remainder. This gives you early momentum while still capturing most of the interest savings. It's a practical compromise between pure math and human psychology.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Mistakes to Avoid</h3>
                <p>
                  One of the biggest mistakes people make when paying off debt is not addressing the root cause of how they got into debt in the first place. If overspending or poor budgeting created your debt, those habits need to change, or you'll just end up in the same situation again. Debt payoff should be paired with budget awareness and potentially some lifestyle adjustments.
                </p>
                <p className="mt-3">
                  Another pitfall is neglecting your emergency fund while aggressively paying down debt. We understand the urgency to become debt-free, but what happens if your car breaks down or you face a medical expense? Without an emergency cushion, you'll likely add new debt right when you're trying to eliminate the old. Most financial advisors recommend having at least $1,000 set aside before going all-in on debt repayment, then building a full 3-6 month emergency fund once you're debt-free.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Balance Transfer Caution</h4>
                <p>
                  Balance transfer credit cards offering 0% APR can seem like magic bullets for debt repayment. While they can be useful tools, they come with risks. Many people transfer balances but continue spending on credit cards, ending up with even more debt. Additionally, that promotional rate expires—often after 12-18 months. If you haven't paid off the balance by then, you're hit with the card's regular APR, which can be quite high. Balance transfers work best for disciplined borrowers who can pay off the debt during the promotional period and avoid accumulating new charges.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Staying Motivated During the Journey</h3>
                <p>
                  Debt repayment is a marathon, not a sprint. Depending on your situation, you might be looking at several years of consistent effort. Staying motivated over that timeframe requires strategy. One effective approach is to track your progress visually. Some people create charts showing their declining debt balance, others celebrate each time a debt is completely eliminated. Find what works for you and use it.
                </p>
                <p className="mt-3">
                  Community support can also make a huge difference. Online forums, local financial wellness groups, or even just accountability partners among friends and family can provide encouragement when you're tempted to stray from the plan. Sharing your goals and progress with others creates a sense of accountability that many people find helpful.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Rewarding Milestones</h4>
                <p>
                  While you're in debt repayment mode, it might seem counterintuitive to spend money on rewards, but small, budget-friendly celebrations can actually help maintain momentum. When you pay off a significant debt, treat yourself to a nice dinner (paid for in cash, of course) or a small purchase you've been wanting. The key is keeping rewards proportional and within your budget—you're celebrating progress, not undermining it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Happens After You're Debt-Free?</h3>
                <p>
                  Becoming debt-free is an incredible achievement, but it's not the finish line for your financial journey—it's more like the end of the beginning. Once you've eliminated your debt, you suddenly have a significant amount of money freed up each month. The temptation to inflate your lifestyle can be strong, but this is the perfect opportunity to build real wealth.
                </p>
                <p className="mt-3">
                  Consider continuing to "pay yourself" the same amount you were putting toward debt, but redirect it toward savings and investment goals. Build that full emergency fund if you haven't already. Maximize contributions to retirement accounts. Save for a down payment on a home if that's a goal. The discipline you've built during debt repayment becomes the foundation for building long-term financial security.
                </p>
                <p className="mt-3">
                  Many people who've successfully eliminated debt report a fundamental shift in their relationship with money. They become more intentional about spending, more confident about their financial futures, and more willing to delay gratification. These mindset changes often prove more valuable than the actual dollar amounts saved on interest payments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When to Seek Professional Help</h3>
                <p>
                  While calculators and self-directed plans work well for many people, some situations call for professional guidance. If you're dealing with multiple types of debt—student loans, mortgages, credit cards, medical bills—a certified financial planner can help you prioritize and create a comprehensive strategy. They can also help you understand whether options like debt consolidation or refinancing make sense for your specific circumstances.
                </p>
                <p className="mt-3">
                  If you're genuinely struggling to make minimum payments, nonprofit credit counseling agencies can be invaluable resources. They offer free or low-cost consultations and can sometimes negotiate with creditors on your behalf for lower interest rates or more manageable payment plans. Be cautious of for-profit debt settlement companies that charge high fees and can damage your credit—nonprofit agencies are almost always the better choice.
                </p>
                <p className="mt-3">
                  In extreme cases where debt has become truly unmanageable, bankruptcy might be worth discussing with an attorney. While it has serious long-term consequences for your credit, it also offers a path forward when you're truly overwhelmed. This should be a last resort, but for some people facing circumstances like medical bankruptcy, it can provide necessary relief and a fresh start.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Final Thoughts</h3>
                <p>
                  Debt doesn't have to be a permanent part of your life. With a solid plan, consistent effort, and the right tools to track your progress, you can systematically eliminate what you owe and build toward a more secure financial future. The debt avalanche method offers the most efficient path forward for most people, minimizing interest charges and getting you to debt-free status as quickly as possible.
                </p>
                <p className="mt-3">
                  Remember that everyone's financial situation is unique. What matters most isn't following someone else's exact timeline or matching their payment amounts—it's making steady progress toward your own goals. Start where you are, use what you have, and keep moving forward. Each payment brings you one step closer to financial freedom, and that's worth celebrating.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">How does the debt avalanche method save me money?</h4>
                <p className="text-slate-700">
                  The avalanche method targets high-interest debt first, which means less of your money goes toward interest charges over time. Since interest is calculated on your remaining balance, eliminating high-rate debts quickly reduces the total amount you'll pay. For example, paying off a 19% credit card before an 8% loan saves you 11% in interest on every dollar—and those percentage points add up to real savings over months and years.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">Should I pay off debt or save money first?</h4>
                <p className="text-slate-700">
                  This is a balancing act. Financial experts typically recommend having a small emergency fund ($1,000-$2,000) before aggressively attacking debt. This prevents you from taking on new debt when unexpected expenses arise. Once you have that cushion, focus on debt payoff. After you're debt-free, build your emergency fund to 3-6 months of expenses. If your employer offers a 401(k) match, contribute enough to get the full match—that's free money—then put extra funds toward debt.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">What if I can't afford extra payments right now?</h4>
                <p className="text-slate-700">
                  Even making just the minimum payments is progress—it's certainly better than missing payments and damaging your credit. Start by reviewing your budget to find even small amounts to redirect toward debt. Many people find $20-50 monthly by cutting subscriptions they rarely use, reducing dining out, or finding creative ways to lower utility bills. As your financial situation improves, you can increase extra payments. The calculator is here whenever you're ready to model different scenarios.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">How do I choose between avalanche and snowball methods?</h4>
                <p className="text-slate-700">
                  The avalanche method saves more money through lower interest charges, making it the mathematically optimal choice. However, the snowball method (paying smallest debts first) provides quicker psychological wins that some people need for motivation. If you're self-motivated and want maximum savings, choose avalanche. If you need frequent victories to stay engaged, snowball might work better. Some people use a hybrid: snowball for one or two small debts to build momentum, then switch to avalanche for the remainder.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">Should I include my mortgage in this calculation?</h4>
                <p className="text-slate-700">
                  Mortgages typically have much lower interest rates than credit cards or personal loans, so they usually shouldn't be your priority when using the avalanche method. Focus on eliminating high-interest consumer debt first. Once that's gone, you can decide whether to make extra mortgage payments or invest that money elsewhere. For many people, investing in retirement accounts or building wealth offers better returns than paying off a low-rate mortgage early, but personal circumstances and goals vary.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-800">What about debt consolidation loans?</h4>
                <p className="text-slate-700">
                  Debt consolidation can be helpful if it lowers your overall interest rate and simplifies payments, but it's not a magic solution. You're still paying off the same amount of debt—just potentially at a better rate and with one monthly payment instead of several. The danger is that some people consolidate their credit card debt, then run up their cards again, ending up with both the consolidation loan and new credit card balances. Consolidation works best when paired with changed spending habits and a commitment to not accumulating new debt.
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
                <Link href="/loan" className="block p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 mb-1">Loan Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate monthly payments and total interest for any loan</p>
                </Link>
                <Link href="/mortgage" className="block p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 mb-1">Mortgage Calculator</h4>
                  <p className="text-sm text-slate-600">Estimate your monthly mortgage payment with taxes and insurance</p>
                </Link>
                <Link href="/savings" className="block p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 mb-1">Savings Calculator</h4>
                  <p className="text-sm text-slate-600">See how your savings can grow with compound interest</p>
                </Link>
                <Link href="/interest" className="block p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 mb-1">Interest Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate simple and compound interest on any amount</p>
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
