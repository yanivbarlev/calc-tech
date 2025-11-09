"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingDown, CreditCard, Percent, PiggyBank, AlertCircle, Plus, Trash2 } from "lucide-react";

interface Debt {
  id: number;
  name: string;
  balance: string;
  monthlyPayment: string;
  interestRate: string;
}

interface DebtConsolidationResults {
  // Current Debts Summary
  currentTotalDebt: number;
  currentMonthlyPayment: number;
  currentTotalInterest: number;
  currentPayoffMonths: number;
  currentWeightedAPR: number;

  // Consolidation Loan Summary
  consolidationMonthlyPayment: number;
  consolidationTotalInterest: number;
  consolidationPayoffMonths: number;
  consolidationRealAPR: number;
  consolidationLoanFee: number;

  // Comparison
  monthlySavings: number;
  totalInterestSavings: number;
  timeSavingsMonths: number;
  isWorthwhile: boolean;
}

export default function DebtConsolidationCalculator() {
  // State management for debts
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit Card 1", balance: "8000", monthlyPayment: "200", interestRate: "18.99" },
    { id: 2, name: "Credit Card 2", balance: "5000", monthlyPayment: "150", interestRate: "21.99" },
    { id: 3, name: "Personal Loan", balance: "12000", monthlyPayment: "350", interestRate: "14.5" },
  ]);

  // Consolidation loan inputs
  const [loanAmount, setLoanAmount] = useState<string>("25000");
  const [loanInterestRate, setLoanInterestRate] = useState<string>("9.5");
  const [loanTermYears, setLoanTermYears] = useState<string>("5");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [loanFeeType, setLoanFeeType] = useState<"percentage" | "dollar">("percentage");
  const [loanFeeValue, setLoanFeeValue] = useState<string>("3");

  const [results, setResults] = useState<DebtConsolidationResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const addDebt = () => {
    const newId = Math.max(...debts.map(d => d.id), 0) + 1;
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: "",
      monthlyPayment: "",
      interestRate: ""
    }]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof Debt, value: string) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculate = () => {
    // Parse consolidation loan inputs
    const loanAmountValue = parseFloat(loanAmount) || 0;
    const loanRate = parseFloat(loanInterestRate) / 100 || 0;
    const termYears = parseFloat(loanTermYears) || 0;
    const termMonths = parseFloat(loanTermMonths) || 0;
    const totalTermMonths = termYears * 12 + termMonths;

    // Calculate loan fee
    let loanFee = 0;
    if (loanFeeType === "percentage") {
      loanFee = loanAmountValue * (parseFloat(loanFeeValue) / 100);
    } else {
      loanFee = parseFloat(loanFeeValue) || 0;
    }

    // Parse current debts
    const validDebts = debts.filter(d =>
      parseFloat(d.balance) > 0 &&
      parseFloat(d.monthlyPayment) > 0 &&
      parseFloat(d.interestRate) > 0
    );

    // Calculate current debt totals
    let currentTotalDebt = 0;
    let currentTotalMonthlyPayment = 0;
    let weightedRateSum = 0;

    validDebts.forEach(debt => {
      const balance = parseFloat(debt.balance);
      const payment = parseFloat(debt.monthlyPayment);
      const rate = parseFloat(debt.interestRate) / 100;

      currentTotalDebt += balance;
      currentTotalMonthlyPayment += payment;
      weightedRateSum += balance * rate;
    });

    const currentWeightedAPR = currentTotalDebt > 0 ? (weightedRateSum / currentTotalDebt) * 100 : 0;

    // Calculate current payoff time and total interest
    let currentTotalInterest = 0;
    let maxPayoffMonths = 0;

    validDebts.forEach(debt => {
      let balance = parseFloat(debt.balance);
      const monthlyPayment = parseFloat(debt.monthlyPayment);
      const monthlyRate = parseFloat(debt.interestRate) / 100 / 12;

      let months = 0;
      let totalInterest = 0;

      while (balance > 0.01 && months < 600) { // Max 50 years
        const interest = balance * monthlyRate;
        const principal = Math.min(monthlyPayment - interest, balance);

        if (principal <= 0) {
          months = 600; // Can't pay off with current payment
          break;
        }

        totalInterest += interest;
        balance -= principal;
        months++;
      }

      currentTotalInterest += totalInterest;
      maxPayoffMonths = Math.max(maxPayoffMonths, months);
    });

    // Calculate consolidation loan payment
    const monthlyRate = loanRate / 12;
    let consolidationMonthlyPayment = 0;

    if (totalTermMonths > 0 && loanAmountValue > 0) {
      if (monthlyRate === 0) {
        consolidationMonthlyPayment = loanAmountValue / totalTermMonths;
      } else {
        consolidationMonthlyPayment =
          (loanAmountValue * monthlyRate * Math.pow(1 + monthlyRate, totalTermMonths)) /
          (Math.pow(1 + monthlyRate, totalTermMonths) - 1);
      }
    }

    // Calculate total consolidation cost
    const consolidationTotalPaid = consolidationMonthlyPayment * totalTermMonths;
    const consolidationTotalInterest = consolidationTotalPaid - loanAmountValue;

    // Calculate real APR including fees
    const totalAmountPaid = consolidationTotalPaid + loanFee;
    const consolidationRealAPR = loanFee > 0 && totalTermMonths > 0
      ? ((totalAmountPaid - loanAmountValue) / loanAmountValue / (totalTermMonths / 12)) * 100
      : loanRate * 100;

    // Calculate savings
    const monthlySavings = currentTotalMonthlyPayment - consolidationMonthlyPayment;
    const totalInterestSavings = (currentTotalInterest + loanFee) - (consolidationTotalInterest + loanFee);
    const timeSavingsMonths = maxPayoffMonths - totalTermMonths;

    // Determine if consolidation is worthwhile (simple heuristic)
    const isWorthwhile = consolidationRealAPR < currentWeightedAPR && monthlySavings > 0;

    setResults({
      currentTotalDebt,
      currentMonthlyPayment: currentTotalMonthlyPayment,
      currentTotalInterest,
      currentPayoffMonths: maxPayoffMonths,
      currentWeightedAPR,
      consolidationMonthlyPayment,
      consolidationTotalInterest,
      consolidationPayoffMonths: totalTermMonths,
      consolidationRealAPR,
      consolidationLoanFee: loanFee,
      monthlySavings,
      totalInterestSavings,
      timeSavingsMonths,
      isWorthwhile
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
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
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl">
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
            Debt Consolidation Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Compare your current debts with a consolidation loan to see if combining your debts can save you money and simplify your payments
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Debts Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Current Debts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 max-h-[500px] overflow-y-auto">
                {debts.map((debt, index) => (
                  <div key={debt.id} className="p-4 bg-slate-50 rounded-xl space-y-3 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Debt {index + 1}</span>
                      {debts.length > 1 && (
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Debt Name
                      </label>
                      <Input
                        type="text"
                        value={debt.name}
                        onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                        placeholder="e.g., Credit Card"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Remaining Balance ($)
                      </label>
                      <Input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                        placeholder="0"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Monthly Payment ($)
                      </label>
                      <Input
                        type="number"
                        value={debt.monthlyPayment}
                        onChange={(e) => updateDebt(debt.id, 'monthlyPayment', e.target.value)}
                        placeholder="0"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                        placeholder="0"
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  onClick={addDebt}
                  variant="outline"
                  className="w-full gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Debt
                </Button>
              </CardContent>
            </Card>

            {/* Consolidation Loan Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-6 w-6" />
                  Consolidation Loan
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="25000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={loanInterestRate}
                    onChange={(e) => setLoanInterestRate(e.target.value)}
                    placeholder="9.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Term (Years)
                    </label>
                    <Input
                      type="number"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Term (Months)
                    </label>
                    <Input
                      type="number"
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Fee/Points
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant={loanFeeType === "percentage" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoanFeeType("percentage")}
                      className={loanFeeType === "percentage" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      Percentage
                    </Button>
                    <Button
                      type="button"
                      variant={loanFeeType === "dollar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoanFeeType("dollar")}
                      className={loanFeeType === "dollar" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      Dollar Amount
                    </Button>
                  </div>
                  <div className="relative">
                    {loanFeeType === "percentage" && (
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    )}
                    {loanFeeType === "dollar" && (
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                    )}
                    <Input
                      type="number"
                      step="0.01"
                      value={loanFeeValue}
                      onChange={(e) => setLoanFeeValue(e.target.value)}
                      placeholder="0"
                      className={loanFeeType === "dollar" ? "pl-7" : "pr-7"}
                    />
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Savings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Recommendation Card */}
                <Card className={`border-2 rounded-2xl shadow-lg overflow-hidden ${
                  results.isWorthwhile ? 'border-emerald-200' : 'border-amber-200'
                }`}>
                  <div className={`p-8 text-white ${
                    results.isWorthwhile
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {results.isWorthwhile ? 'Consolidation Recommended' : 'Consider Carefully'}
                      </h3>
                    </div>
                    <p className="text-lg">
                      {results.isWorthwhile
                        ? 'Based on the numbers, debt consolidation could save you money and simplify your payments.'
                        : 'The consolidation loan may not provide significant savings. Review the details below carefully.'}
                    </p>
                  </div>
                </Card>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Debts Summary */}
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <CreditCard className="h-5 w-5 text-slate-600" />
                        Current Debts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Debt:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatCurrency(results.currentTotalDebt)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Monthly Payment:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatCurrency(results.currentMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Weighted APR:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatPercent(results.currentWeightedAPR)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Interest:</span>
                        <span className="text-lg font-bold text-red-600">
                          {formatCurrency(results.currentTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Payoff Time:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatMonths(results.currentPayoffMonths)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Consolidation Loan Summary */}
                  <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                      <CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Consolidation Loan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Loan Amount:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatCurrency(parseFloat(loanAmount) || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Monthly Payment:</span>
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(results.consolidationMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Real APR (with fees):</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatPercent(results.consolidationRealAPR)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Interest:</span>
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(results.consolidationTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Payoff Time:</span>
                        <span className="text-lg font-bold text-slate-800">
                          {formatMonths(results.consolidationPayoffMonths)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Loan Fee:</span>
                        <span className="text-lg font-bold text-amber-600">
                          {formatCurrency(results.consolidationLoanFee)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Savings Summary */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-6 w-6" />
                      Your Potential Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">Monthly Savings</div>
                        <div className={`text-3xl font-bold ${results.monthlySavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {results.monthlySavings > 0 ? '+' : ''}{formatCurrency(results.monthlySavings)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">per month</div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">Total Interest Savings</div>
                        <div className={`text-3xl font-bold ${results.totalInterestSavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {results.totalInterestSavings > 0 ? '+' : ''}{formatCurrency(results.totalInterestSavings)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">over loan life</div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">Time Savings</div>
                        <div className={`text-3xl font-bold ${results.timeSavingsMonths > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {results.timeSavingsMonths > 0 ? '+' : ''}{Math.round(results.timeSavingsMonths)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">months faster payoff</div>
                      </div>
                    </div>
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
                  Enter your debt information and consolidation loan details, then click Calculate to see your potential savings
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Debt Consolidation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Debt Consolidation?</h3>
                <p>
                  Debt consolidation is essentially rolling multiple debts into one single loan. Think of it like cleaning up your financial mess by putting everything into one neat package. Instead of juggling five credit card payments with different due dates and interest rates, you'd have just one monthly payment to worry about. The goal here isn't just simplification—though that's a huge benefit—it's also about potentially lowering your overall interest rate and monthly payment.
                </p>
                <p className="mt-3">
                  When you consolidate, you're taking out a new loan to pay off several existing debts. This new loan ideally has a lower interest rate than what you're currently paying across all your debts. You might save hundreds or even thousands of dollars over the life of the loan, depending on your situation. But—and this is important—consolidation isn't a magic fix for financial troubles. It's a tool that works best when you've got a solid plan to avoid running up new debt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Consolidation Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Secured Loans</h4>
                <p>
                  Secured loans use your assets as collateral, which means you're putting something valuable on the line—typically your home. Home equity loans and home equity lines of credit (HELOCs) fall into this category. The advantage? You'll generally get lower interest rates because the lender has less risk. Your house backs up your promise to repay. The downside is obvious: if you can't make your payments, you could lose your home. That's a serious risk you shouldn't take lightly.
                </p>
                <p className="mt-3">
                  Home equity loans work particularly well if you've built up substantial equity in your property and you're disciplined about repayment. Many people use them to consolidate high-interest credit card debt. Just remember—your home is on the line here. Make sure you're confident you can handle the payments before going this route.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Unsecured Personal Loans</h4>
                <p>
                  These loans don't require collateral, which means your assets aren't at risk if things go south. Banks, credit unions, and online lenders all offer personal consolidation loans. The interest rate depends heavily on your credit score and financial history. People with excellent credit might snag rates in the single digits, while those with fair or poor credit could see rates approaching 20% or higher.
                </p>
                <p className="mt-3">
                  Personal loans usually come with fixed rates and fixed payment schedules, which makes budgeting easier. You'll know exactly what you owe each month and when the loan will be paid off. That predictability is valuable when you're trying to get your finances back on track.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Balance Transfer Credit Cards</h4>
                <p>
                  Here's an interesting option: some credit cards offer promotional periods with 0% APR on balance transfers, sometimes for 12-18 months. If you can pay off your consolidated debt before that promotional period ends, you could save a ton on interest. The catch is that you need good credit to qualify, and there's usually a balance transfer fee (typically 3-5% of the amount transferred).
                </p>
                <p className="mt-3">
                  This strategy requires discipline. You've got to be realistic about whether you can pay off the balance before the promotional rate expires. If you can't, you'll be hit with the card's regular interest rate, which is often quite high. It's a great tool for the right person, but it's not for everyone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Key Considerations Before Consolidating</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Fees and Costs Matter</h4>
                <p>
                  Don't get so focused on the interest rate that you ignore the fees. Origination fees, closing costs, balance transfer fees—they all eat into your savings. A loan with a 9% interest rate and a 5% origination fee might actually cost you more than a 10% loan with no fees. Our calculator factors in loan fees to give you the real APR, which is what you should be looking at when comparing options.
                </p>
                <p className="mt-3">
                  As a general rule, if fees push your effective interest rate above what you're currently paying on average, consolidation probably isn't worth it. Do the math carefully, and don't let a lender downplay the impact of fees.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Process Takes Time</h4>
                <p>
                  Consolidating debt isn't instant. You'll need to apply for the loan, wait for approval, and then use those funds to pay off your existing debts. This process can take several weeks. During that time, you still need to make your regular debt payments to avoid late fees and credit score damage. Plan accordingly and keep enough cash on hand to cover your obligations during the transition.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Term Extension Effects</h4>
                <p>
                  Here's something people often overlook: a longer loan term means lower monthly payments, but you'll pay more interest over time. Let's say you currently have debts that would be paid off in three years, but you consolidate into a five-year loan. Sure, your monthly payment drops, but you're making payments for two extra years. Even with a lower interest rate, you might end up paying more total interest.
                </p>
                <p className="mt-3">
                  That said, sometimes a lower monthly payment is exactly what you need to stay afloat. If you're struggling to make ends meet, the breathing room from a lower payment might be worth the extra interest cost. Just go into it with your eyes open about the trade-off.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Credit Score Impact</h4>
                <p>
                  Consolidation can affect your credit score in several ways. Initially, you might see a small dip because you're applying for new credit (hard inquiry) and opening a new account. However, if consolidation helps you pay off credit cards without closing them, your credit utilization ratio improves, which is good for your score. Over time, making consistent on-time payments on your consolidation loan will help rebuild your credit.
                </p>
                <p className="mt-3">
                  One warning: don't close your old credit card accounts after paying them off through consolidation. That reduces your available credit and can hurt your credit utilization ratio. Keep them open, just don't use them—or use them sparingly and pay them off immediately.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Credit Utilization Ratios</h4>
                <p>
                  Your credit utilization ratio—how much of your available credit you're using—makes up about 30% of your FICO score. If you use a personal loan to pay off credit cards, your credit card utilization drops to zero (assuming you don't run up new balances). That can give your credit score a nice boost. But if you consolidate multiple credit cards into one new credit card, you're still using credit, just in a different form, so the impact is less dramatic.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Root Cause Problem</h3>
                <p>
                  Let's be real for a second: consolidation doesn't fix bad spending habits. If you got into debt because you consistently spend more than you earn, consolidation alone won't solve that problem. In fact, it might make things worse if you see those zero-balance credit cards as an invitation to start charging again.
                </p>
                <p className="mt-3">
                  Before you consolidate, take a hard look at your budget and spending patterns. What got you into debt in the first place? Was it a temporary setback like a medical emergency, or is it ongoing lifestyle spending that exceeds your income? If it's the latter, you need to address that fundamental issue first. Create a realistic budget, track your spending, and commit to living within your means.
                </p>
                <p className="mt-3">
                  Debt consolidation works best as part of a comprehensive financial plan. It's a tool for managing existing debt more efficiently, not a substitute for financial discipline. Use it wisely, combine it with better money management habits, and you'll set yourself up for long-term success. Rush into it without changing your underlying behavior, and you'll likely end up right back where you started—or worse.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Consolidation Makes Sense</h3>
                <p>
                  Debt consolidation is a smart move when you can secure a significantly lower interest rate than what you're currently paying. If you're carrying balances on cards with 20%+ APRs and you qualify for a consolidation loan at 10%, that's substantial savings. It also makes sense if you're overwhelmed by multiple payments and due dates. Simplifying to one payment can reduce stress and help you stay organized.
                </p>
                <p className="mt-3">
                  You're also a good candidate if you have a plan to avoid accumulating new debt. Maybe you've experienced a positive change in your financial situation—a raise, a side hustle, or simply better budgeting skills. Consolidation can help you accelerate your debt payoff and move forward with confidence.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When to Avoid Consolidation</h3>
                <p>
                  Skip consolidation if the fees and interest rate don't actually save you money. Run the numbers honestly. If your real APR after fees is higher than your current weighted average, you're not getting a deal. Also avoid it if you haven't addressed the spending issues that created the debt in the first place. You'll just end up with a consolidation loan and maxed-out credit cards again.
                </p>
                <p className="mt-3">
                  Be wary if you're considering a secured loan but aren't confident about making payments. Putting your home at risk to consolidate unsecured credit card debt is a dangerous game. If there's any chance you can't handle the payments, don't do it. Finally, if you're close to paying off your current debts anyway, the hassle of consolidating might not be worth the minimal savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  Our calculator helps you compare your current debt situation with a potential consolidation loan. Start by entering all your existing debts—balances, monthly payments, and interest rates. Be thorough here; the more accurate your inputs, the better your results. Then enter the details of the consolidation loan you're considering: loan amount, interest rate, term, and any fees.
                </p>
                <p className="mt-3">
                  The calculator will show you side-by-side comparisons of your monthly payment, total interest paid, and payoff timeline. Pay special attention to the "real APR" figure, which accounts for loan fees. This is your true cost of borrowing. If the real APR is lower than your current weighted average APR and the monthly payment fits your budget, consolidation might be worth pursuing.
                </p>
                <p className="mt-3">
                  Remember, though—the calculator is a tool, not a decision-maker. Use it to inform your choice, but also consider factors it can't measure, like your confidence in maintaining financial discipline and whether you're ready to commit to a structured repayment plan. Numbers matter, but so does your personal readiness for change.
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
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/loan" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Calculator className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Loan Calculator</div>
                      <div className="text-xs text-slate-500">Calculate loan payments</div>
                    </div>
                  </div>
                </Link>

                <Link href="/mortgage" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                      <div className="text-xs text-slate-500">Calculate mortgage payments</div>
                    </div>
                  </div>
                </Link>

                <Link href="/percentage" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Percent className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Percentage Calculator</div>
                      <div className="text-xs text-slate-500">Calculate percentages</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
