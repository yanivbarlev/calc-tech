"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Briefcase,
  ArrowLeft,
  DollarSign,
  Calendar,
  Percent,
  TrendingUp,
  FileText,
  PieChart
} from "lucide-react";

interface BusinessLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalFees: number;
  interestPlusFees: number;
  realAPR: number;
  loanAmount: number;
  payoffDate: string;
}

interface AmortizationEntry {
  month: number;
  date: string;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("50000");
  const [interestRate, setInterestRate] = useState<string>("7.5");
  const [loanTermYears, setLoanTermYears] = useState<string>("5");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("monthly");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  const [originationFee, setOriginationFee] = useState<string>("1250");
  const [documentationFee, setDocumentationFee] = useState<string>("500");
  const [otherFees, setOtherFees] = useState<string>("250");

  const [results, setResults] = useState<BusinessLoanResults | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateBusinessLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTermYears) || 0;
    const months = parseFloat(loanTermMonths) || 0;
    const origFee = parseFloat(originationFee) || 0;
    const docFee = parseFloat(documentationFee) || 0;
    const otherFee = parseFloat(otherFees) || 0;

    const totalFees = origFee + docFee + otherFee;
    const totalMonths = (years * 12) + months;

    if (totalMonths === 0 || principal === 0) return;

    // Calculate payment based on compound and payment frequencies
    let monthlyRate: number;
    let paymentsPerYear: number;

    // Get compound frequency multiplier
    const compoundMap: { [key: string]: number } = {
      'annually': 1,
      'semi-annually': 2,
      'quarterly': 4,
      'monthly': 12,
      'semi-monthly': 24,
      'bi-weekly': 26,
      'weekly': 52,
      'daily': 365,
      'continuously': Infinity
    };

    // Get payment frequency multiplier
    const paymentMap: { [key: string]: number } = {
      'annually': 1,
      'semi-annually': 2,
      'quarterly': 4,
      'monthly': 12,
      'semi-monthly': 24,
      'bi-weekly': 26,
      'weekly': 52,
      'daily': 365,
      'interest-only': 0
    };

    const compoundPerYear = compoundMap[compoundFrequency] || 12;
    paymentsPerYear = paymentMap[paymentFrequency] || 12;

    // Calculate effective monthly rate
    if (compoundFrequency === 'continuously') {
      monthlyRate = Math.exp(rate / 100 / 12) - 1;
    } else {
      const periodicRate = rate / 100 / compoundPerYear;
      monthlyRate = Math.pow(1 + periodicRate, compoundPerYear / 12) - 1;
    }

    // Calculate payment based on payment frequency
    let paymentAmount: number;
    let totalNumPayments: number;

    if (paymentFrequency === 'interest-only') {
      // Interest-only payment
      paymentAmount = principal * monthlyRate;
      totalNumPayments = totalMonths;
    } else {
      // Regular amortizing loan
      const paymentRate = monthlyRate * (12 / paymentsPerYear);
      totalNumPayments = totalMonths * (paymentsPerYear / 12);

      paymentAmount = principal *
        (paymentRate * Math.pow(1 + paymentRate, totalNumPayments)) /
        (Math.pow(1 + paymentRate, totalNumPayments) - 1);
    }

    // For display purposes, convert to monthly equivalent
    const monthlyPayment = paymentAmount * (paymentsPerYear / 12);
    const totalPayment = paymentAmount * totalNumPayments;
    const totalInterest = totalPayment - principal;
    const interestPlusFees = totalInterest + totalFees;

    // Calculate Real APR (including fees)
    const effectiveAmount = principal - totalFees;
    const realAPR = ((totalInterest + totalFees) / effectiveAmount / (totalMonths / 12)) * 100;

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear(), today.getMonth() + totalMonths);
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      totalFees,
      interestPlusFees,
      realAPR,
      loanAmount: principal,
      payoffDate: payoffDateStr
    });

    // Generate amortization schedule (for monthly payments)
    const schedule: AmortizationEntry[] = [];
    let balance = principal;
    const startDate = new Date();

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = paymentFrequency === 'interest-only'
        ? (month === totalMonths ? balance : 0)
        : monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + month);

      schedule.push({
        month,
        date: paymentDate.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        payment: monthlyPayment,
        interest: interestPayment,
        principal: principalPayment,
        balance
      });
    }

    setAmortization(schedule);
    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateBusinessLoan();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(3)}%`;
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
            <Briefcase className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Business Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate monthly payments, total costs, and real APR for your business loan with detailed amortization schedule
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Loan Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
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
                      className="pl-7"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="pr-7"
                      placeholder="7.5"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="annually">Annually</option>
                    <option value="semi-annually">Semi-Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="semi-monthly">Semi-Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="continuously">Continuously</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Term (Years)
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
                      Months
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
                    Payment Frequency
                  </label>
                  <select
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="annually">Annually</option>
                    <option value="semi-annually">Semi-Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="semi-monthly">Semi-Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="interest-only">Interest Only</option>
                  </select>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    Additional Fees
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Origination Fee
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={originationFee}
                          onChange={(e) => setOriginationFee(e.target.value)}
                          className="pl-7"
                          placeholder="1250"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Documentation Fee
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={documentationFee}
                          onChange={(e) => setDocumentationFee(e.target.value)}
                          className="pl-7"
                          placeholder="500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Other Fees
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={otherFees}
                          onChange={(e) => setOtherFees(e.target.value)}
                          className="pl-7"
                          placeholder="250"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateBusinessLoan}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Loan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Monthly Payment Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Monthly Payment</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.monthlyPayment)}</p>
                    <p className="text-emerald-100">
                      Total of {Math.round((parseFloat(loanTermYears) * 12) + parseFloat(loanTermMonths))} payments
                    </p>
                  </div>
                </Card>

                {/* Summary Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Loan Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Loan Amount</span>
                        <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Interest</span>
                        <span className="font-semibold text-rose-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Fees</span>
                        <span className="font-semibold text-amber-600">{formatCurrency(results.totalFees)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Total Payment</span>
                        <span className="font-bold text-lg">{formatCurrency(results.totalPayment)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Cost Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Interest + Fees</span>
                        <span className="font-semibold text-rose-600">{formatCurrency(results.interestPlusFees)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Real APR</span>
                        <span className="font-bold text-emerald-600 text-lg">{formatPercentage(results.realAPR)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Payoff Date</span>
                        <span className="font-bold">{results.payoffDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Cost</span>
                        <span className="font-bold text-lg">{formatCurrency(results.totalPayment + results.totalFees)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cost Breakdown Visualization */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-6 w-6 text-emerald-600" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Principal</span>
                          <span className="text-sm font-semibold">{formatCurrency(results.loanAmount)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                            style={{
                              width: `${(results.loanAmount / (results.totalPayment + results.totalFees)) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Interest</span>
                          <span className="text-sm font-semibold">{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-rose-500 to-rose-600 h-3 rounded-full"
                            style={{
                              width: `${(results.totalInterest / (results.totalPayment + results.totalFees)) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Fees</span>
                          <span className="text-sm font-semibold">{formatCurrency(results.totalFees)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full"
                            style={{
                              width: `${(results.totalFees / (results.totalPayment + results.totalFees)) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Percent className="h-6 w-6 text-emerald-600" />
                        Amortization Schedule
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
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Month</th>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Payment</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Interest</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Principal</th>
                              <th className="text-right py-3 px-4 font-semibold text-slate-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {amortization.slice(0, 12).map((entry) => (
                              <tr key={entry.month} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-3 px-4">{entry.month}</td>
                                <td className="py-3 px-4">{entry.date}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.payment)}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.interest)}</td>
                                <td className="py-3 px-4 text-right">{formatCurrency(entry.principal)}</td>
                                <td className="py-3 px-4 text-right font-semibold">{formatCurrency(entry.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-center text-slate-500 text-sm mt-4">
                          Showing first 12 months of {amortization.length} total payments
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your business loan details and click Calculate to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Business Loans</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Business Loan?</h3>
                <p>
                  When you need capital to start, expand, or sustain your business operations, a business loan provides the financial fuel to make it happen. Unlike personal loans that fund individual needs, business loans are specifically designed for commercial purposes—purchasing equipment, hiring employees, expanding into new markets, managing cash flow, or refinancing existing debt. The fundamental structure mirrors other types of loans: you borrow a sum of money and pay it back over time with interest, but the terms and requirements can vary dramatically based on your business type, creditworthiness, and the lender's policies.
                </p>
                <p className="mt-3">
                  What makes business loans particularly interesting is their diversity. You might secure a traditional term loan from a bank, tap into a business line of credit for ongoing needs, leverage invoice financing to unlock cash tied up in accounts receivable, or pursue equipment financing where the machinery itself serves as collateral. Each option comes with its own advantages, drawbacks, and ideal use cases. The key is understanding which type aligns best with your specific business needs and financial situation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Business Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">SBA Loans</h4>
                <p>
                  Small Business Administration loans represent some of the most favorable financing options available to small businesses. The SBA doesn't actually lend money directly—instead, it guarantees a portion of loans made by approved lenders, which reduces the risk for banks and credit unions. This government backing allows lenders to offer longer repayment terms, lower interest rates, and smaller down payments than they might otherwise provide. The most popular program, the SBA 7(a) loan, can provide up to five million dollars for a wide range of business purposes.
                </p>
                <p className="mt-3">
                  That said, SBA loans aren't quick or easy to obtain. The application process involves substantial paperwork, and approval can take several weeks or even months. You'll need strong credit, a solid business plan, and often some collateral. But if you can navigate the requirements and wait for approval, the favorable terms—sometimes spanning up to 25 years with rates in the single digits—make the effort worthwhile for many business owners.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Conventional Business Loans</h4>
                <p>
                  When people think of business loans, they're usually picturing conventional term loans from banks or credit unions. These work much like mortgages: you receive a lump sum upfront and repay it in regular installments over a set period, typically one to ten years. The interest rate might be fixed, giving you predictable monthly payments, or variable, fluctuating with market conditions. Banks generally reserve their best rates for established businesses with strong financials, substantial collateral, and excellent credit scores.
                </p>
                <p className="mt-3">
                  The application process for conventional loans tends to be rigorous. Expect to provide detailed financial statements, tax returns, business plans, and cash flow projections. Many banks require at least two years of business history, though some will work with newer companies if the owners have strong personal credit and industry experience. Interest rates typically range from around 6% to 13%, depending on these factors and current market conditions.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Personal Loans for Business</h4>
                <p>
                  Sometimes the easiest path to business funding runs through your personal finances. Personal loans for business use offer a simpler application process, faster approval, and fewer documentation requirements than traditional business loans. This approach makes particular sense for sole proprietors, freelancers, or brand-new businesses that haven't established separate business credit. However, you're personally liable for repayment regardless of how your business performs, which means your personal assets and credit are on the line.
                </p>
                <p className="mt-3">
                  Personal loans typically come with higher interest rates than secured business loans but lower rates than credit cards. Amounts usually cap out around $50,000 to $100,000, and terms generally run from one to seven years. The approval decision hinges almost entirely on your personal credit score and debt-to-income ratio rather than your business metrics. For small amounts needed quickly—maybe to purchase initial inventory or cover startup costs—a personal loan can bridge the gap until you qualify for traditional business financing.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest-Only Loans</h4>
                <p>
                  Interest-only business loans create a unique payment structure where you initially pay just the interest charges without reducing the principal balance. This arrangement dramatically lowers your monthly obligations during the interest-only period, which typically lasts from six months to several years. Once that period ends, you either need to pay off the entire principal in a balloon payment or switch to regular amortizing payments that include both principal and interest.
                </p>
                <p className="mt-3">
                  This structure appeals to businesses expecting significant revenue growth or those using the loan for investments that won't generate returns immediately. Real estate developers often favor interest-only loans because they can make minimal payments while developing a property, then pay off the loan when they sell or refinance. The major risk is obvious: if you can't make that balloon payment or transition to higher monthly payments when the interest-only period ends, you could face serious financial trouble. These loans work best when you have a clear, realistic plan for handling that eventual shift.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Loan Costs and Fees</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rates and APR</h4>
                <p>
                  The interest rate represents what you pay to borrow money, but it doesn't tell the complete story of your loan's cost. That's where the Annual Percentage Rate comes in. APR includes both the interest rate and most fees associated with obtaining the loan, giving you a more accurate picture of what you're actually paying. For instance, you might see a loan advertised at 7% interest, but when you factor in origination fees and other charges, the APR might be closer to 8% or 9%.
                </p>
                <p className="mt-3">
                  Compounding frequency affects your effective interest rate too. A 7% rate compounded monthly costs more than 7% compounded annually because interest charges accumulate more frequently. Our calculator accounts for different compounding schedules—from annually to continuously—to show you precisely what you'll pay. When comparing loan offers, always look at the APR rather than just the stated interest rate, and make sure you're comparing the same compounding frequencies.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Origination Fees</h4>
                <p>
                  Most lenders charge an origination fee to process and fund your loan. This fee typically ranges from 1% to 5% of the loan amount, meaning a $50,000 loan might come with $500 to $2,500 in upfront costs. Some lenders deduct this fee from the loan proceeds, so you receive less than the full amount but still owe the entire principal. Others add it to the total you owe, increasing both your loan balance and your interest charges.
                </p>
                <p className="mt-3">
                  Origination fees aren't always negotiable, but it doesn't hurt to ask—especially if you have strong credit and multiple loan offers. Some lenders offer lower rates in exchange for higher fees or vice versa, so calculate the total cost both ways before deciding. A slightly higher interest rate with no origination fee might cost less over the loan's life than a lower rate with substantial upfront charges, particularly if you plan to pay off the loan early.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Documentation and Processing Fees</h4>
                <p>
                  Beyond origination fees, lenders often charge for various administrative tasks associated with your loan. Documentation fees cover the cost of preparing and processing your loan paperwork. Processing fees might include credit checks, title searches, appraisals, or legal reviews. These charges can range from a few hundred to several thousand dollars depending on the loan size and complexity.
                </p>
                <p className="mt-3">
                  Some of these fees are more negotiable than others. Documentation fees, for instance, are often just profit centers for lenders rather than actual costs. You might successfully negotiate them down or have them waived entirely if you're a strong borrower. Third-party costs like appraisals or credit reports are harder to eliminate, though you can sometimes shop around for these services yourself rather than using the lender's preferred vendors.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Other Common Fees</h4>
                <p>
                  The fee menu extends beyond origination and documentation. Many business loans include annual fees, late payment penalties, prepayment penalties, and maintenance charges. Annual fees are less common on traditional term loans but often appear on business lines of credit. Late fees typically kick in if you miss a payment deadline, usually calculated as a percentage of the overdue amount or a flat fee, whichever is higher.
                </p>
                <p className="mt-3">
                  Prepayment penalties deserve special attention because they can significantly affect your loan's flexibility. Some lenders charge fees if you pay off your loan early, reasoning that they're losing expected interest income. These penalties might apply for the entire loan term or just the first few years. If there's any chance you'll refinance or pay off the loan ahead of schedule—perhaps from a business sale or strong revenue growth—factor prepayment penalties heavily into your decision.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Payment Schedules and Amortization</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Monthly vs. Other Payment Frequencies</h4>
                <p>
                  While monthly payments dominate business lending, they're not your only option. Some lenders offer weekly, bi-weekly, or even daily payment schedules. These more frequent payment arrangements can work well if your business generates daily revenue—like a restaurant or retail store—allowing you to align loan payments with cash inflows. They also slightly reduce your total interest cost because you're paying down the principal more quickly.
                </p>
                <p className="mt-3">
                  Before committing to an unusual payment schedule, make sure it genuinely fits your cash flow patterns. A retail business with steady daily sales might thrive on weekly payments, but a consulting firm that invoices clients monthly could struggle. Missing frequent payments can rack up fees and damage your credit faster than missing the occasional monthly payment. The convenience and potential savings only matter if you can reliably make the payments on time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Understanding Your Amortization Schedule</h4>
                <p>
                  Your amortization schedule breaks down exactly where each payment goes throughout your loan's life. Early payments consist mostly of interest with relatively little going toward principal. As time passes, this ratio gradually reverses until your final payments are nearly all principal. This happens because interest charges are calculated on your remaining balance, which shrinks as you pay down the loan.
                </p>
                <p className="mt-3">
                  This structure has important implications for early repayment strategies. Extra payments made early in the loan term have an outsized impact on your total interest cost because they reduce the principal that accumulates interest over many years. Even small additional payments can shave months or years off your loan term and save thousands in interest. If you have surplus cash and no prepayment penalty, directing it toward your loan principal is often a smart move.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Qualifying for Business Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Credit Requirements</h4>
                <p>
                  Your credit score wields enormous influence over your loan options and terms. Traditional banks typically want to see business credit scores above 680 and personal scores above 700, though some alternative lenders accept scores in the 600s or even lower. Higher scores unlock lower interest rates, larger loan amounts, and better terms. The difference between a 650 score and a 750 score might mean paying 12% instead of 7%—a gap that translates to thousands of dollars on a substantial loan.
                </p>
                <p className="mt-3">
                  Building business credit takes time and deliberate effort. Start by establishing credit accounts in your business name, paying every bill on time, and keeping balances low relative to your credit limits. Register with business credit bureaus like Dun & Bradstreet, and make sure vendors report your payment history. Even if you're relying on personal credit now, building separate business credit creates options for the future and can eventually lead to better loan terms without putting your personal finances at risk.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Time in Business</h4>
                <p>
                  Lenders view established businesses as less risky than startups. Most traditional banks want to see at least two years of operating history, though some programs accept businesses as young as six months if other factors are strong. Newer businesses often turn to alternative lenders or SBA loans, which might have more flexible requirements but could come with higher rates or additional restrictions.
                </p>
                <p className="mt-3">
                  If your business is brand new, you're not entirely out of options. Strong personal credit can compensate for limited business history, particularly with personal loans or personally guaranteed business loans. Some lenders focus more on your monthly revenue or bank statements than your years in operation. Having substantial industry experience, even if your current business is new, can also sway lenders. And once you've been operating for a year or two with steady revenue, significantly more doors open.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Revenue and Profitability</h4>
                <p>
                  Lenders want confidence that you can comfortably afford your loan payments. They'll examine your revenue trends, profit margins, and cash flow to assess this. Many lenders look for monthly revenue of at least $10,000 to $25,000, though this varies by loan size and type. They'll also calculate your debt service coverage ratio—essentially whether your income exceeds your debts by a comfortable margin. A ratio above 1.25 means you're earning 25% more than needed to cover all debt obligations, which lenders view favorably.
                </p>
                <p className="mt-3">
                  Profitability matters, but cash flow often matters more. A business might show paper profits while struggling with cash flow due to slow-paying customers or seasonal fluctuations. Lenders increasingly focus on cash flow because it directly determines your ability to make loan payments. If your business has strong cash flow even without huge profits—common for service businesses with low overhead—you might still qualify for favorable financing.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Collateral</h4>
                <p>
                  Secured loans backed by collateral typically offer better rates than unsecured loans because the lender has recourse if you default. Equipment, real estate, inventory, or accounts receivable can all serve as collateral, depending on the loan type. The lender will appraise the collateral and usually lend a percentage of its value—often 70% to 80% for equipment or 50% to 70% for inventory.
                </p>
                <p className="mt-3">
                  Before pledging assets as collateral, understand the implications. If your business struggles and you can't repay the loan, you'll lose those assets. Some business owners prefer unsecured loans despite higher costs because they preserve flexibility and don't risk essential equipment or property. Others gladly trade that security for lower rates, especially if they're confident in their ability to repay. The right choice depends on your risk tolerance, alternative options, and how critical the pledged assets are to your operations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Strategic Borrowing Decisions</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">How Much Should You Borrow?</h4>
                <p>
                  Just because you qualify for a certain loan amount doesn't mean you should borrow it all. Calculate what you actually need for your specific purpose, then add a reasonable buffer for unexpected costs—maybe 10% to 20% extra. Borrowing more than necessary means paying unnecessary interest and potentially straining your cash flow with larger payments. On the flip side, borrowing too little might leave you unable to complete your planned project or force you to seek additional financing at less favorable terms.
                </p>
                <p className="mt-3">
                  Consider your debt service coverage carefully. Financial experts generally recommend keeping your total debt payments below 30% of your monthly revenue, though this varies by industry and circumstances. If taking on a new loan would push you above that threshold, you might be overleveraging your business. Remember that loans need to be repaid regardless of business performance—during slow months or economic downturns, you'll still owe the same amount.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Term Selection</h4>
                <p>
                  Shorter loan terms mean higher monthly payments but less total interest paid. Longer terms spread payments out, making them more manageable but increasing the overall cost. The sweet spot depends on your cash flow stability and risk tolerance. If you have strong, predictable cash flow, a shorter term saves money. If cash flow fluctuates or you're investing in something with uncertain returns, longer terms provide breathing room.
                </p>
                <p className="mt-3">
                  Try to match your loan term to the life of what you're financing. Equipment loans might span three to seven years—roughly the useful life of the equipment. Real estate loans could extend to 20 or 25 years. Working capital loans for inventory or short-term needs might be appropriate for just one to three years. This matching principle helps ensure you're not still paying for something after it's become obsolete or used up.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Fixed vs. Variable Rates</h4>
                <p>
                  Fixed rates provide predictability—your payment stays the same throughout the loan term, making budgeting straightforward. Variable rates might start lower but can increase if market interest rates rise, potentially making your payments unaffordable. In low-rate environments, fixed rates are often the safer choice because rates have more room to rise than fall. In high-rate environments, variable rates might be worth the risk if you expect rates to drop or plan to refinance soon.
                </p>
                <p className="mt-3">
                  If you choose a variable rate, understand the terms thoroughly. What index does it track? How often can it adjust? Are there caps on how much it can increase per adjustment or over the loan's life? These details determine whether you're taking a calculated risk or potentially setting yourself up for payment shock. Some variable-rate loans convert to fixed rates after an initial period, which can offer a middle ground between initial savings and long-term stability.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Mistakes to Avoid</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Ignoring the Total Cost</h4>
                <p>
                  Many borrowers focus exclusively on the monthly payment while overlooking the total amount they'll repay over the loan's life. A $50,000 loan at 8% for seven years means paying back roughly $67,000—$17,000 in interest alone. Sometimes a slightly higher monthly payment on a shorter term results in dramatically lower total costs. Always calculate and compare the total repayment amount, not just whether you can afford the monthly payment.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Underestimating Your Needs</h4>
                <p>
                  Running out of money halfway through a project or expansion is worse than not starting at all. You've already spent money and time without achieving your goal, and seeking additional financing mid-project often means accepting worse terms because you're desperate. It's better to borrow slightly more than you think you need upfront than to scramble for supplemental funding later. That said, don't swing too far in the other direction and burden your business with unnecessary debt.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Neglecting to Shop Around</h4>
                <p>
                  Different lenders offer vastly different terms for similar borrowers. One bank might quote 9% while another offers 7% for the identical loan. Online lenders, credit unions, community banks, and national banks all have different appetites for risk and different cost structures. Getting quotes from at least three to five lenders gives you leverage to negotiate and confidence that you're getting competitive terms. The hour or two spent gathering competing offers could save thousands of dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Forgetting About Fees</h4>
                <p>
                  A loan with a 6% interest rate and $5,000 in fees might cost more than one with a 7% rate and minimal fees. Always calculate the true APR including all fees, and consider how long you'll keep the loan. If you plan to refinance or pay off the loan in two years, upfront fees hurt more than they would over a ten-year term. Our calculator helps with this by computing the real APR that includes all your specified fees alongside the stated interest rate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This business loan calculator helps you understand the complete picture of what a loan will cost. Input your loan amount, interest rate, and term, then adjust the compounding and payment frequencies to match what lenders are offering. Don't forget to include all fees—origination, documentation, and any others you're aware of. The calculator computes not just your monthly payment but also your total interest cost, the combined impact of interest and fees, and the real APR that accounts for all costs.
                </p>
                <p className="mt-3">
                  Use the amortization schedule to see exactly how your payments break down month by month. This helps you understand how much you're actually paying toward principal versus interest at any point in the loan. Try different scenarios: what happens if you choose a shorter term? What if you make payments bi-weekly instead of monthly? How much do origination fees really cost when spread over the loan's life? These comparisons help you make informed decisions rather than just accepting whatever terms a lender initially offers.
                </p>
                <p className="mt-3">
                  Remember that calculators provide estimates based on the numbers you enter. Your actual loan might include additional costs or features not captured here. Use this tool to narrow your options and understand the general cost structure, then review the actual loan documents carefully before signing anything. The goal is to enter any loan agreement with your eyes open, fully understanding what you're committing to and confident that it serves your business's best interests.
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
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">General loan calculations</div>
                  </div>
                </Link>
                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Auto Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate vehicle financing</div>
                  </div>
                </Link>
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Home loan calculations</div>
                  </div>
                </Link>
                <Link href="/personal-loan" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Percent className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Personal Loan Calculator</div>
                    <div className="text-sm text-slate-600">Personal financing options</div>
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
