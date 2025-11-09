"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Home, ArrowLeft, DollarSign, Calendar, Percent, TrendingDown, PiggyBank, RefreshCw } from "lucide-react";

interface RefinanceResults {
  // Current Loan
  currentMonthlyPayment: number;
  currentRemainingBalance: number;
  currentTotalInterest: number;
  currentPayoffDate: string;

  // New Loan
  newMonthlyPayment: number;
  newLoanAmount: number;
  newTotalPayment: number;
  newTotalInterest: number;
  newPayoffDate: string;

  // Comparison
  monthlySavings: number;
  lifetimeSavings: number;
  totalClosingCosts: number;
  breakEvenMonths: number;
  breakEvenDate: string;
  upfrontCost: number;
}

export default function RefinanceCalculator() {
  // Current Loan Inputs
  const [knowBalance, setKnowBalance] = useState<boolean>(true);
  const [remainingBalance, setRemainingBalance] = useState<string>("350000");
  const [currentPayment, setCurrentPayment] = useState<string>("2500");
  const [originalLoanAmount, setOriginalLoanAmount] = useState<string>("400000");
  const [originalTerm, setOriginalTerm] = useState<string>("30");
  const [yearsRemaining, setYearsRemaining] = useState<string>("25");
  const [monthsRemaining, setMonthsRemaining] = useState<string>("0");
  const [currentRate, setCurrentRate] = useState<string>("7.0");

  // New Loan Inputs
  const [newTerm, setNewTerm] = useState<string>("30");
  const [newRate, setNewRate] = useState<string>("5.5");
  const [points, setPoints] = useState<string>("0");
  const [closingCosts, setClosingCosts] = useState<string>("3500");
  const [cashOut, setCashOut] = useState<string>("0");

  const [results, setResults] = useState<RefinanceResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRefinance = () => {
    // Parse inputs
    const balance = parseFloat(remainingBalance) || 350000;
    const payment = parseFloat(currentPayment) || 2500;
    const origAmount = parseFloat(originalLoanAmount) || 400000;
    const origYears = parseFloat(originalTerm) || 30;
    const yearsLeft = parseFloat(yearsRemaining) || 25;
    const monthsLeft = parseFloat(monthsRemaining) || 0;
    const currentRateVal = parseFloat(currentRate) || 7.0;

    const newYears = parseFloat(newTerm) || 30;
    const newRateVal = parseFloat(newRate) || 5.5;
    const pointsVal = parseFloat(points) || 0;
    const costsVal = parseFloat(closingCosts) || 3500;
    const cashOutVal = parseFloat(cashOut) || 0;

    // Calculate current loan details
    let currentBalance: number;
    let currentMonthlyPayment: number;

    if (knowBalance) {
      currentBalance = balance;
      currentMonthlyPayment = payment;
    } else {
      // Calculate from original loan
      const currentMonthlyRate = currentRateVal / 100 / 12;
      const totalMonths = origYears * 12;
      const monthsPaid = totalMonths - (yearsLeft * 12 + monthsLeft);

      currentMonthlyPayment = origAmount *
        (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, totalMonths)) /
        (Math.pow(1 + currentMonthlyRate, totalMonths) - 1);

      // Calculate remaining balance
      let bal = origAmount;
      for (let i = 0; i < monthsPaid; i++) {
        const interest = bal * currentMonthlyRate;
        const principal = currentMonthlyPayment - interest;
        bal -= principal;
      }
      currentBalance = Math.max(0, bal);
    }

    const currentMonthsRemaining = yearsLeft * 12 + monthsLeft;
    const currentTotalPayment = currentMonthlyPayment * currentMonthsRemaining;
    const currentTotalInterest = currentTotalPayment - currentBalance;

    // Calculate payoff dates
    const today = new Date();
    const currentPayoffDate = new Date(today.getFullYear(), today.getMonth() + currentMonthsRemaining);
    const currentPayoffDateStr = currentPayoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Calculate new loan details
    const pointsCost = currentBalance * (pointsVal / 100);
    const totalClosingCosts = costsVal + pointsCost;
    const newLoanAmount = currentBalance + cashOutVal;
    const upfrontCost = totalClosingCosts - cashOutVal;

    const newMonthlyRate = newRateVal / 100 / 12;
    const newNumPayments = newYears * 12;

    const newMonthlyPayment = newLoanAmount *
      (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumPayments)) /
      (Math.pow(1 + newMonthlyRate, newNumPayments) - 1);

    const newTotalPayment = newMonthlyPayment * newNumPayments;
    const newTotalInterest = newTotalPayment - newLoanAmount;

    const newPayoffDate = new Date(today.getFullYear(), today.getMonth() + newNumPayments);
    const newPayoffDateStr = newPayoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Calculate savings
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

    // Lifetime savings calculation (comparing total costs)
    const currentLifetimeCost = currentTotalPayment;
    const newLifetimeCost = newTotalPayment + totalClosingCosts;
    const lifetimeSavings = currentLifetimeCost - newLifetimeCost;

    // Break-even calculation
    const breakEvenMonths = totalClosingCosts / Math.abs(monthlySavings);
    const breakEvenDate = new Date(today.getFullYear(), today.getMonth() + Math.ceil(breakEvenMonths));
    const breakEvenDateStr = breakEvenDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setResults({
      currentMonthlyPayment,
      currentRemainingBalance: currentBalance,
      currentTotalInterest,
      currentPayoffDate: currentPayoffDateStr,

      newMonthlyPayment,
      newLoanAmount,
      newTotalPayment,
      newTotalInterest,
      newPayoffDate: newPayoffDateStr,

      monthlySavings,
      lifetimeSavings,
      totalClosingCosts,
      breakEvenMonths,
      breakEvenDate: breakEvenDateStr,
      upfrontCost
    });

    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateRefinance();
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
            <RefreshCw className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Refinance Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Compare your current loan with refinancing options to see potential savings, break-even points, and determine if refinancing makes financial sense
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Loan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Current Loan Section */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 border-b pb-2">Current Loan</h3>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={knowBalance}
                        onChange={() => setKnowBalance(true)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-sm font-medium text-slate-700">I know my remaining balance</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!knowBalance}
                        onChange={() => setKnowBalance(false)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-sm font-medium text-slate-700">I know the original loan amount</span>
                    </label>
                  </div>

                  {knowBalance ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Remaining Balance
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={remainingBalance}
                            onChange={(e) => setRemainingBalance(e.target.value)}
                            className="pl-7"
                            placeholder="350000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Current Monthly Payment
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={currentPayment}
                            onChange={(e) => setCurrentPayment(e.target.value)}
                            className="pl-7"
                            placeholder="2500"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Original Loan Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={originalLoanAmount}
                            onChange={(e) => setOriginalLoanAmount(e.target.value)}
                            className="pl-7"
                            placeholder="400000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Original Loan Term (years)
                        </label>
                        <Input
                          type="number"
                          value={originalTerm}
                          onChange={(e) => setOriginalTerm(e.target.value)}
                          placeholder="30"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Years Remaining
                          </label>
                          <Input
                            type="number"
                            value={yearsRemaining}
                            onChange={(e) => setYearsRemaining(e.target.value)}
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Months Remaining
                          </label>
                          <Input
                            type="number"
                            value={monthsRemaining}
                            onChange={(e) => setMonthsRemaining(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Interest Rate
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        className="pr-7"
                        placeholder="7.0"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                  </div>
                </div>

                {/* New Loan Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-bold text-slate-800 border-b pb-2">New Loan</h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      New Loan Term (years)
                    </label>
                    <Input
                      type="number"
                      value={newTerm}
                      onChange={(e) => setNewTerm(e.target.value)}
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      New Interest Rate
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        className="pr-7"
                        placeholder="5.5"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Points
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className="pr-7"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Points paid upfront to reduce rate
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Closing Costs & Fees
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={closingCosts}
                        onChange={(e) => setClosingCosts(e.target.value)}
                        className="pl-7"
                        placeholder="3500"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Appraisal, title, recording fees, etc.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cash Out Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={cashOut}
                        onChange={(e) => setCashOut(e.target.value)}
                        className="pl-7"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Additional cash borrowed (cash-out refinance)
                    </p>
                  </div>
                </div>

                <Button
                  onClick={calculateRefinance}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Refinance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Savings Summary */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {results.monthlySavings >= 0 ? 'Monthly Savings' : 'Monthly Increase'}
                      </h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {formatCurrency(Math.abs(results.monthlySavings))}
                    </p>
                    <p className="text-emerald-100">
                      {results.monthlySavings >= 0
                        ? 'You could save this much every month'
                        : 'Your payment would increase by this amount'}
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Lifetime Savings</p>
                        <p className={`text-2xl font-bold ${results.lifetimeSavings >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(Math.abs(results.lifetimeSavings))}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {results.lifetimeSavings >= 0 ? 'Total saved over life of loan' : 'Additional cost over life of loan'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Break-Even Point</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {formatNumber(results.breakEvenMonths)} months
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {results.breakEvenDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Side-by-Side Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Loan */}
                  <Card className="border-2 rounded-2xl shadow-md">
                    <CardHeader className="bg-slate-100">
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Home className="h-5 w-5 text-slate-600" />
                        Current Loan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-sm text-slate-600">Monthly Payment</span>
                        <span className="font-bold text-lg text-slate-800">
                          {formatCurrency(results.currentMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Remaining Balance</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.currentRemainingBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Interest</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.currentTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Payoff Date</span>
                        <span className="font-semibold text-slate-800">
                          {results.currentPayoffDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* New Loan */}
                  <Card className="border-2 border-emerald-200 rounded-2xl shadow-md">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                      <CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
                        <RefreshCw className="h-5 w-5 text-emerald-600" />
                        New Loan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                        <span className="text-sm text-slate-600">Monthly Payment</span>
                        <span className="font-bold text-lg text-emerald-600">
                          {formatCurrency(results.newMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">New Loan Amount</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.newLoanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Interest</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.newTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Payoff Date</span>
                        <span className="font-semibold text-slate-800">
                          {results.newPayoffDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cost Analysis */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                      Cost Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-slate-600">Total Closing Costs</span>
                          <span className="font-semibold text-slate-800">
                            {formatCurrency(results.totalClosingCosts)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-slate-600">Upfront Cost</span>
                          <span className="font-semibold text-slate-800">
                            {formatCurrency(results.upfrontCost)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-slate-600">Rate Reduction</span>
                          <span className="font-semibold text-emerald-600">
                            {formatNumber(parseFloat(currentRate) - parseFloat(newRate), 2)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-slate-600">Interest Savings</span>
                          <span className="font-semibold text-emerald-600">
                            {formatCurrency(results.currentTotalInterest - results.newTotalInterest)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Refinancing Recommendation */}
                    <div className={`mt-6 p-4 rounded-xl ${
                      results.lifetimeSavings > 0 && results.breakEvenMonths < 36
                        ? 'bg-emerald-50 border border-emerald-200'
                        : results.lifetimeSavings > 0
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <p className={`font-semibold mb-2 ${
                        results.lifetimeSavings > 0 && results.breakEvenMonths < 36
                          ? 'text-emerald-800'
                          : results.lifetimeSavings > 0
                          ? 'text-blue-800'
                          : 'text-amber-800'
                      }`}>
                        {results.lifetimeSavings > 0 && results.breakEvenMonths < 36
                          ? '✓ Refinancing Looks Beneficial'
                          : results.lifetimeSavings > 0
                          ? '⚠ Consider Long-Term Plans'
                          : '⚠ Refinancing May Not Save Money'}
                      </p>
                      <p className="text-sm text-slate-700">
                        {results.lifetimeSavings > 0 && results.breakEvenMonths < 36
                          ? `You'll break even in ${formatNumber(results.breakEvenMonths)} months and could save ${formatCurrency(results.lifetimeSavings)} over the life of the loan. This appears to be a good refinancing opportunity.`
                          : results.lifetimeSavings > 0
                          ? `While you could save ${formatCurrency(results.lifetimeSavings)} over time, it will take ${formatNumber(results.breakEvenMonths)} months to recoup closing costs. Make sure you plan to stay in the property long enough.`
                          : `Based on these numbers, refinancing would cost more over the loan's lifetime. Consider whether other benefits (like lower monthly payments or cash-out needs) justify the additional cost.`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <RefreshCw className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your loan details and click calculate to see if refinancing makes sense
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Loan Refinancing</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Refinancing?</h3>
                <p className="mb-4">
                  Refinancing means taking out a new loan to pay off your existing one. The new loan typically comes with different terms—maybe a lower interest rate, a different loan period, or both. Think of it as hitting the reset button on your mortgage or loan, but ideally under better conditions than you had before.
                </p>
                <p className="mb-4">
                  When you refinance, you're essentially swapping your old loan for a fresh one. The new lender pays off your original debt, and you start making payments on the new loan instead. While this sounds straightforward, the decision to refinance involves weighing multiple factors: interest rates, closing costs, how long you plan to keep the loan, and your current financial situation.
                </p>
                <p>
                  Most people refinance their mortgages, but you can refinance other types of loans too—car loans, student loans, personal loans, even credit card debt in some cases. The principle remains the same: you're looking for better terms that save you money or improve your financial flexibility.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Do People Refinance?</h3>
                <p className="mb-4">
                  The motivations for refinancing vary widely, but they generally fall into a few main categories. Understanding which reason applies to your situation helps you evaluate whether refinancing makes sense.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Lower Your Interest Rate</h4>
                <p className="mb-4">
                  This is the most common reason people refinance. If market interest rates have dropped since you took out your original loan, or if your credit score has improved significantly, you might qualify for a lower rate. Even a difference of half a percentage point can translate to substantial savings over the life of a loan. For instance, on a $300,000 mortgage, dropping from 7% to 6.5% could save you around $30,000 in interest over 30 years.
                </p>

                <h4 className="font-semibold text-lg mb-2">Reduce Monthly Payments</h4>
                <p className="mb-4">
                  Sometimes lowering your monthly payment takes priority over long-term savings. You might extend your loan term to spread payments over more years, reducing what you owe each month. This can free up cash flow for other expenses or investments. Keep in mind that extending the term usually means paying more interest overall, even if your monthly obligation drops.
                </p>

                <h4 className="font-semibold text-lg mb-2">Shorten Your Loan Term</h4>
                <p className="mb-4">
                  On the flip side, if your financial situation has improved, you might refinance to a shorter term—say, from a 30-year mortgage to a 15-year one. You'll build equity faster and pay significantly less interest over time. The tradeoff? Higher monthly payments. This strategy works well if you've gotten a raise, paid off other debts, or simply want to own your home outright sooner.
                </p>

                <h4 className="font-semibold text-lg mb-2">Access Cash Through Your Equity</h4>
                <p className="mb-4">
                  If you've built up equity in your home, a cash-out refinance lets you borrow against that value. You refinance for more than you owe and receive the difference as cash. People use this money for home improvements, debt consolidation, educational expenses, or other major purchases. Just remember that you're increasing your loan balance, which means higher payments or a longer payoff period.
                </p>

                <h4 className="font-semibold text-lg mb-2">Switch Between Fixed and Adjustable Rates</h4>
                <p className="mb-4">
                  Some borrowers refinance to change their loan type. If you have an adjustable-rate mortgage (ARM) and worry about future rate increases, refinancing to a fixed-rate loan locks in predictable payments. Conversely, if you have a fixed rate but plan to sell or refinance again in a few years, switching to an ARM might offer temporarily lower rates.
                </p>

                <h4 className="font-semibold text-lg mb-2">Consolidate Debt</h4>
                <p>
                  Refinancing can also serve as a debt consolidation tool. By rolling high-interest credit card debt or other loans into your mortgage at a lower rate, you simplify your finances and potentially save on interest. However, you're converting unsecured debt into secured debt—your home becomes collateral. Miss payments, and you risk foreclosure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Mortgage Refinancing</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Rate-and-Term Refinance</h4>
                <p className="mb-4">
                  This is the standard refinance. You're changing your interest rate, loan term, or both, but you're not borrowing extra money. Your new loan amount equals (or is very close to) what you still owe on the original mortgage. This type focuses purely on improving your loan terms—lower rates, better payment schedules, or moving from an ARM to a fixed rate.
                </p>

                <h4 className="font-semibold text-lg mb-2">Cash-Out Refinance</h4>
                <p className="mb-4">
                  Here you're refinancing for more than you currently owe and pocketing the difference. Let's say you owe $250,000 but your home is worth $400,000. You might refinance for $300,000, pay off the original $250,000, and receive $50,000 in cash (minus closing costs). Lenders typically require you to maintain at least 20% equity in your home, though requirements vary.
                </p>

                <h4 className="font-semibold text-lg mb-2">Cash-In Refinance</h4>
                <p className="mb-4">
                  Less common but sometimes strategic, a cash-in refinance involves bringing money to the table to reduce your loan balance. Why would you do this? To eliminate private mortgage insurance (PMI), qualify for better rates by lowering your loan-to-value ratio, or simply pay down principal faster. If you have the cash available and the numbers work out, it can be a smart move.
                </p>

                <h4 className="font-semibold text-lg mb-2">Streamline Refinance</h4>
                <p className="mb-4">
                  Available for FHA, VA, and USDA loans, streamline refinancing simplifies the process with reduced documentation and sometimes no appraisal. These programs exist to help borrowers with government-backed loans take advantage of lower rates without jumping through all the usual hoops. The catch is that you can only refinance into the same type of loan, and there are limits on how much you can borrow.
                </p>

                <h4 className="font-semibold text-lg mb-2">No-Closing-Cost Refinance</h4>
                <p>
                  This option rolls closing costs into your loan balance or exchanges them for a slightly higher interest rate. You avoid upfront out-of-pocket expenses, which can be attractive if you're short on cash. However, you'll pay more over time either through a larger loan or higher interest charges. It's convenient but not always the most economical choice in the long run.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Should You Consider Refinancing?</h3>
                <p className="mb-4">
                  Knowing when to refinance requires analyzing both market conditions and your personal circumstances. Here are scenarios where refinancing often makes sense.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rates Have Dropped</h4>
                <p className="mb-4">
                  The general rule of thumb used to be that refinancing made sense if you could reduce your rate by at least 1%. These days, even a 0.5% to 0.75% reduction can be worthwhile, especially on larger loan balances or if you plan to stay in the home long enough to recoup closing costs. Monitor mortgage rates and compare them to what you're currently paying.
                </p>

                <h4 className="font-semibold text-lg mb-2">Your Credit Score Has Improved</h4>
                <p className="mb-4">
                  If you've paid down debt, made consistent on-time payments, or corrected errors on your credit report, your score might have jumped significantly since you first borrowed. A higher credit score often qualifies you for better interest rates. Even if market rates haven't changed, your personal rate might improve based on your financial profile.
                </p>

                <h4 className="font-semibold text-lg mb-2">You Need to Lower Monthly Payments</h4>
                <p className="mb-4">
                  Life circumstances change. Maybe you've had a drop in income, faced unexpected medical bills, or need to redirect cash toward other priorities. Refinancing to extend your loan term reduces monthly payments, giving you breathing room. Just be aware that you'll pay more interest overall by stretching out the repayment period.
                </p>

                <h4 className="font-semibold text-lg mb-2">You Want to Pay Off Your Loan Faster</h4>
                <p className="mb-4">
                  If you've come into extra income—a promotion, inheritance, or successful business venture—refinancing to a shorter term accelerates equity building and saves substantial interest. Moving from a 30-year to a 15-year mortgage roughly doubles your monthly payment but can cut your total interest costs by more than half.
                </p>

                <h4 className="font-semibold text-lg mb-2">You Have an Adjustable-Rate Mortgage</h4>
                <p className="mb-4">
                  ARMs typically start with lower rates than fixed-rate mortgages, but those rates adjust periodically based on market conditions. If you're approaching a rate adjustment period and expect rates to rise, refinancing to a fixed rate protects you from payment increases. Conversely, if rates are falling, staying with an ARM might continue to work in your favor.
                </p>

                <h4 className="font-semibold text-lg mb-2">You've Built Significant Equity</h4>
                <p>
                  Whether through appreciation or paying down your loan, increased equity opens refinancing options. You might eliminate PMI once you reach 20% equity, access cash for home improvements or other expenses, or simply qualify for better loan terms thanks to a lower loan-to-value ratio.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Refinancing Costs</h3>
                <p className="mb-4">
                  Refinancing isn't free. You'll encounter various fees and expenses, collectively known as closing costs. These typically range from 2% to 6% of your loan amount, though they vary by lender and location.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Application and Origination Fees</h4>
                <p className="mb-4">
                  Lenders charge fees to process your application and originate the new loan. These might be separate line items or bundled together. Some lenders charge a flat fee; others charge a percentage of the loan amount. This is often negotiable, so don't hesitate to shop around or ask for fee waivers.
                </p>

                <h4 className="font-semibold text-lg mb-2">Appraisal Costs</h4>
                <p className="mb-4">
                  Most refinances require a new appraisal to determine your home's current value. Appraisals typically cost between $300 and $600, depending on your location and property size. Some streamline refinances waive this requirement, which saves you money and speeds up the process.
                </p>

                <h4 className="font-semibold text-lg mb-2">Title Search and Insurance</h4>
                <p className="mb-4">
                  Even though you already own your home, the new lender wants to verify clear title and protect their investment. Title search fees cover examining public records to ensure there are no liens or legal issues. Title insurance protects the lender if problems arise later. Together, these can run from $700 to $1,500 or more.
                </p>

                <h4 className="font-semibold text-lg mb-2">Points and Discount Fees</h4>
                <p className="mb-4">
                  You can pay points upfront to reduce your interest rate. Each point equals 1% of your loan amount and typically lowers your rate by about 0.25%. Whether buying points makes sense depends on how long you'll keep the loan. If you'll stay in the home for many years, the upfront cost pays off through lower monthly payments. If you might move or refinance again soon, points may not be worth it.
                </p>

                <h4 className="font-semibold text-lg mb-2">Miscellaneous Fees</h4>
                <p>
                  You'll also encounter smaller charges: credit report fees (around $25-50), flood certification ($15-25), recording fees ($50-250), inspection fees if required, and possibly attorney fees depending on your state. Individually these seem minor, but they add up. Review your loan estimate carefully to understand all charges.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Calculating Your Break-Even Point</h3>
                <p className="mb-4">
                  The break-even point tells you how long it takes to recoup your refinancing costs through monthly savings. This is crucial for deciding whether refinancing makes financial sense.
                </p>
                <p className="mb-4">
                  Here's how to calculate it: divide your total closing costs by your monthly savings. For example, if refinancing costs $5,000 and saves you $200 per month, your break-even point is 25 months (just over two years). If you plan to stay in your home longer than 25 months, refinancing saves you money. If you might move or refinance again within two years, you'd lose money on the deal.
                </p>
                <p className="mb-4">
                  The break-even calculation becomes more complex with cash-out refinances or when changing loan terms significantly. In those cases, you need to compare the total cost of both loans over their lifetimes, not just monthly payments. Our calculator handles these scenarios automatically, giving you a clear picture of long-term savings or costs.
                </p>
                <p>
                  Don't forget to factor in opportunity costs. Money spent on closing costs could have been invested elsewhere. Similarly, money saved through refinancing could be invested for additional returns. While these considerations complicate the math, they're worth thinking about if you're deciding between refinancing and alternative uses for your cash.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Potential Drawbacks of Refinancing</h3>
                <p className="mb-4">
                  While refinancing offers many benefits, it's not always the right move. Understanding the downsides helps you make an informed decision.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Closing Costs Can Be Substantial</h4>
                <p className="mb-4">
                  As mentioned, closing costs typically run 2-6% of your loan amount. On a $300,000 refinance, that's $6,000 to $18,000 out of pocket. Even if you roll these costs into your loan, you're borrowing more money and paying interest on those fees for years to come. If you move or refinance again before breaking even, you've lost money.
                </p>

                <h4 className="font-semibold text-lg mb-2">Extending Your Loan Term Can Cost More</h4>
                <p className="mb-4">
                  Lowering monthly payments by extending your loan term sounds appealing, but it's a long-term trap. You'll pay significantly more interest over the life of the loan. If you're five years into a 30-year mortgage and refinance to a new 30-year loan, you're resetting the clock to 35 years of total payments. The extra interest can dwarf any rate reduction savings.
                </p>

                <h4 className="font-semibold text-lg mb-2">Your Home Becomes Collateral for Consolidated Debt</h4>
                <p className="mb-4">
                  Using a cash-out refinance to pay off credit cards or other unsecured debt converts that debt into secured debt. If you can't make your mortgage payments, you risk foreclosure. You're also extending repayment over many years, which means paying more interest on that credit card debt than if you'd tackled it aggressively with a shorter-term repayment plan.
                </p>

                <h4 className="font-semibold text-lg mb-2">You Might Trigger Prepayment Penalties</h4>
                <p className="mb-4">
                  Some mortgages include prepayment penalties if you pay off the loan early. Refinancing counts as early payoff. Review your current loan agreement to see if this applies. Prepayment penalties can be substantial, potentially negating any savings from refinancing.
                </p>

                <h4 className="font-semibold text-lg mb-2">Credit Score Impact</h4>
                <p>
                  Applying for refinancing triggers a hard credit inquiry, which can temporarily lower your credit score by a few points. Opening a new loan also affects your credit mix and average account age. The impact is usually minor and short-lived, but if you're planning other major financial moves soon (like buying a car or applying for a new credit card), timing matters.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tips for Getting the Best Refinance Deal</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Shop Around with Multiple Lenders</h4>
                <p className="mb-4">
                  Don't settle for the first offer you receive. Different lenders offer different rates and fee structures. Get quotes from at least three to five lenders, including your current mortgage holder, online lenders, credit unions, and traditional banks. Comparing options can save you thousands of dollars. Make sure you're comparing apples to apples by getting loan estimates for the same loan type and term.
                </p>

                <h4 className="font-semibold text-lg mb-2">Improve Your Credit Score First</h4>
                <p className="mb-4">
                  Even small credit score improvements can unlock better interest rates. Before applying, check your credit report for errors and dispute any inaccuracies. Pay down credit card balances to improve your utilization ratio. Make all payments on time for several months leading up to your application. Sometimes waiting a few months to boost your score saves more money than refinancing immediately.
                </p>

                <h4 className="font-semibold text-lg mb-2">Consider the Timing</h4>
                <p className="mb-4">
                  Mortgage rates fluctuate constantly based on economic conditions, Federal Reserve policies, and market sentiment. While timing the market perfectly is impossible, staying informed about rate trends helps you act when opportunities arise. If rates are trending downward, waiting might make sense. If they're rising or have hit a low point, moving quickly could lock in favorable terms.
                </p>

                <h4 className="font-semibold text-lg mb-2">Negotiate Fees</h4>
                <p className="mb-4">
                  Many closing costs are negotiable. Ask lenders to waive or reduce origination fees, application fees, or processing charges. Some lenders offer promotions or incentives for certain types of borrowers. If you have a strong credit profile or a significant relationship with a bank, leverage that for better terms. The worst they can say is no, and you might save hundreds or thousands of dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2">Read the Fine Print</h4>
                <p className="mb-4">
                  Understand every detail of your refinance agreement before signing. Look for prepayment penalties on the new loan, adjustable-rate terms if applicable, mandatory escrow requirements, and any other conditions that might affect you. Ask questions about anything unclear. This is a major financial decision—take the time to fully comprehend what you're committing to.
                </p>

                <h4 className="font-semibold text-lg mb-2">Consider Paying Extra Toward Principal</h4>
                <p>
                  Instead of refinancing, another strategy for saving on interest is to make extra principal payments on your current loan. This won't lower your monthly payment, but it will reduce your total interest and shorten your loan term. If you're primarily motivated by paying off your mortgage faster or saving on interest, this approach avoids closing costs entirely. You can always refinance later if rates drop significantly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Refinancing Other Types of Loans</h3>
                <p className="mb-4">
                  While mortgages get the most attention, you can refinance other loan types with similar benefits and considerations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Auto Loans</h4>
                <p className="mb-4">
                  Auto loan refinancing can lower your interest rate or monthly payment, especially if your credit has improved since you bought the car. Keep in mind that cars depreciate rapidly, so you need sufficient equity for most lenders to approve a refinance. Also, extending the loan term on a depreciating asset risks owing more than the car is worth (being "upside down").
                </p>

                <h4 className="font-semibold text-lg mb-2">Student Loans</h4>
                <p className="mb-4">
                  Student loan refinancing, often called consolidation when combining multiple loans, can secure lower rates or simpler repayment terms. However, refinancing federal student loans with a private lender means losing federal protections: income-driven repayment plans, loan forgiveness programs, and deferment or forbearance options. Weigh the interest savings against these lost benefits carefully.
                </p>

                <h4 className="font-semibold text-lg mb-2">Personal Loans</h4>
                <p className="mb-4">
                  Personal loan refinancing works similarly to other loan types. If rates have dropped or your credit has improved, you might qualify for better terms. Since personal loans are typically shorter-term and smaller in amount, the savings potential may be less dramatic than with mortgages, but it can still be worthwhile.
                </p>

                <h4 className="font-semibold text-lg mb-2">Credit Card Debt</h4>
                <p>
                  While not traditional refinancing, balance transfer credit cards or personal loans can consolidate high-interest credit card debt at lower rates. Balance transfer cards often offer 0% introductory rates for 12-18 months, though they charge balance transfer fees (usually 3-5%). This strategy only works if you pay off the balance before the promotional period ends and avoid accumulating new credit card debt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making Your Decision</h3>
                <p className="mb-4">
                  Refinancing is a powerful financial tool when used wisely. The key is understanding your goals, calculating the real costs and savings, and being honest about your plans and timeline.
                </p>
                <p className="mb-4">
                  Start by clarifying what you want to achieve. Are you trying to lower monthly payments, save on interest, access cash, or pay off debt faster? Different goals point toward different refinancing strategies. Use our calculator to model various scenarios: different loan terms, interest rates, and cost structures. See how each option affects your monthly budget and long-term finances.
                </p>
                <p className="mb-4">
                  Consider your timeline. How long do you plan to stay in your home or keep the loan? If you might move or refinance again within a few years, a longer break-even period could mean losing money. Factor in life changes too—upcoming retirement, kids heading to college, potential job changes. These affect your ability to handle higher payments or your need for cash flow flexibility.
                </p>
                <p className="mb-4">
                  Don't forget about opportunity costs and alternative strategies. Could investing your cash elsewhere generate better returns than refinancing saves? Would making extra principal payments achieve your goals without closing costs? Sometimes the best financial move is doing nothing and sticking with your current loan.
                </p>
                <p>
                  Finally, work with reputable lenders and consider consulting a financial advisor for personalized guidance. Refinancing can save you tens of thousands of dollars or help you achieve important financial goals. But it requires careful analysis, honest assessment of your situation, and choosing the right loan structure for your needs. Take your time, run the numbers, and make an informed decision that supports your long-term financial well-being.
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
