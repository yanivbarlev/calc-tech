"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Calendar, PieChart } from "lucide-react";

interface LoanResults {
  paymentAmount: number;
  totalPayments: number;
  totalInterest: number;
  principalPercentage: number;
  interestPercentage: number;
}

interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  // Calculator type selection
  const [calculatorType, setCalculatorType] = useState<"amortized" | "deferred" | "bond">("amortized");

  // Input states
  const [loanAmount, setLoanAmount] = useState<string>("100000");
  const [loanTermYears, setLoanTermYears] = useState<string>("10");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("monthly");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");

  // Results states
  const [results, setResults] = useState<LoanResults | null>(null);
  const [schedule, setSchedule] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const getCompoundingPeriodsPerYear = (frequency: string): number => {
    const frequencies: { [key: string]: number } = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      semimonthly: 24,
      biweekly: 26,
      weekly: 52,
      daily: 365,
      continuously: -1 // Special case
    };
    return frequencies[frequency] || 12;
  };

  const getPaymentPeriodsPerYear = (frequency: string): number => {
    const frequencies: { [key: string]: number } = {
      yearly: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      semimonthly: 24,
      biweekly: 26,
      weekly: 52,
      daily: 365
    };
    return frequencies[frequency] || 12;
  };

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 100000;
    const years = parseFloat(loanTermYears) || 0;
    const months = parseFloat(loanTermMonths) || 0;
    const totalYears = years + months / 12;
    const annualRate = (parseFloat(interestRate) || 6) / 100;

    if (principal <= 0 || totalYears <= 0 || annualRate < 0) {
      return;
    }

    if (calculatorType === "amortized") {
      calculateAmortized(principal, totalYears, annualRate);
    } else if (calculatorType === "deferred") {
      calculateDeferred(principal, totalYears, annualRate);
    } else {
      calculateBond(principal, totalYears, annualRate);
    }

    setHasCalculated(true);
  };

  const calculateAmortized = (principal: number, years: number, annualRate: number) => {
    const compoundPerYear = getCompoundingPeriodsPerYear(compoundFrequency);
    const paymentPerYear = getPaymentPeriodsPerYear(paymentFrequency);
    const totalPayments = Math.round(years * paymentPerYear);

    // Convert annual rate to effective rate per payment period
    let ratePerPayment: number;

    if (compoundFrequency === "continuously") {
      // Continuous compounding: e^(rt/n) - 1
      ratePerPayment = Math.exp(annualRate / paymentPerYear) - 1;
    } else {
      // Regular compounding: (1 + r/m)^(m/n) - 1
      const ratePerCompound = annualRate / compoundPerYear;
      const compoundsPerPayment = compoundPerYear / paymentPerYear;
      ratePerPayment = Math.pow(1 + ratePerCompound, compoundsPerPayment) - 1;
    }

    // Calculate payment using amortization formula
    const payment = principal * (ratePerPayment * Math.pow(1 + ratePerPayment, totalPayments)) /
                    (Math.pow(1 + ratePerPayment, totalPayments) - 1);

    const totalPaid = payment * totalPayments;
    const totalInterest = totalPaid - principal;

    setResults({
      paymentAmount: payment,
      totalPayments: totalPaid,
      totalInterest: totalInterest,
      principalPercentage: (principal / totalPaid) * 100,
      interestPercentage: (totalInterest / totalPaid) * 100
    });

    // Generate amortization schedule
    generateAmortizationSchedule(principal, payment, ratePerPayment, totalPayments);
  };

  const calculateDeferred = (principal: number, years: number, annualRate: number) => {
    const compoundPerYear = getCompoundingPeriodsPerYear(compoundFrequency);
    const totalPeriods = years * compoundPerYear;

    let futureValue: number;

    if (compoundFrequency === "continuously") {
      // Continuous compounding: P * e^(rt)
      futureValue = principal * Math.exp(annualRate * years);
    } else {
      // Regular compounding: P * (1 + r/n)^(nt)
      const ratePerPeriod = annualRate / compoundPerYear;
      futureValue = principal * Math.pow(1 + ratePerPeriod, totalPeriods);
    }

    const totalInterest = futureValue - principal;

    setResults({
      paymentAmount: futureValue,
      totalPayments: futureValue,
      totalInterest: totalInterest,
      principalPercentage: (principal / futureValue) * 100,
      interestPercentage: (totalInterest / futureValue) * 100
    });

    setSchedule([]);
  };

  const calculateBond = (faceValue: number, years: number, annualRate: number) => {
    const compoundPerYear = getCompoundingPeriodsPerYear(compoundFrequency);
    const totalPeriods = years * compoundPerYear;

    let presentValue: number;

    if (compoundFrequency === "continuously") {
      // Continuous compounding: FV / e^(rt)
      presentValue = faceValue / Math.exp(annualRate * years);
    } else {
      // Regular compounding: FV / (1 + r/n)^(nt)
      const ratePerPeriod = annualRate / compoundPerYear;
      presentValue = faceValue / Math.pow(1 + ratePerPeriod, totalPeriods);
    }

    const totalInterest = faceValue - presentValue;

    setResults({
      paymentAmount: presentValue,
      totalPayments: faceValue,
      totalInterest: totalInterest,
      principalPercentage: (presentValue / faceValue) * 100,
      interestPercentage: (totalInterest / faceValue) * 100
    });

    setSchedule([]);
  };

  const generateAmortizationSchedule = (
    principal: number,
    payment: number,
    ratePerPayment: number,
    totalPayments: number
  ) => {
    const scheduleData: AmortizationEntry[] = [];
    let balance = principal;

    for (let period = 1; period <= totalPayments; period++) {
      const interestPayment = balance * ratePerPayment;
      const principalPayment = payment - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      scheduleData.push({
        period,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance
      });
    }

    setSchedule(scheduleData);
  };

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
    return `${value.toFixed(1)}%`;
  };

  const getFrequencyLabel = (frequency: string): string => {
    const labels: { [key: string]: string } = {
      annually: "Yearly",
      semiannually: "Every 6 Months",
      quarterly: "Quarterly",
      monthly: "Monthly",
      semimonthly: "Every Half Month",
      biweekly: "Every 2 Weeks",
      weekly: "Weekly",
      daily: "Daily",
      continuously: "Continuously",
      yearly: "Yearly"
    };
    return labels[frequency] || frequency;
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
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Professional Tools</div>
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
            Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate loan payments, compare different loan types, and generate detailed amortization schedules
          </p>
        </div>

        {/* Calculator Type Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          <Button
            variant={calculatorType === "amortized" ? "default" : "outline"}
            onClick={() => {
              setCalculatorType("amortized");
              setHasCalculated(false);
            }}
            className={calculatorType === "amortized" ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" : ""}
          >
            Amortized Loan
          </Button>
          <Button
            variant={calculatorType === "deferred" ? "default" : "outline"}
            onClick={() => {
              setCalculatorType("deferred");
              setHasCalculated(false);
            }}
            className={calculatorType === "deferred" ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" : ""}
          >
            Deferred Payment
          </Button>
          <Button
            variant={calculatorType === "bond" ? "default" : "outline"}
            onClick={() => {
              setCalculatorType("bond");
              setHasCalculated(false);
            }}
            className={calculatorType === "bond" ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" : ""}
          >
            Bond Calculator
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <Card className="border-2 rounded-2xl shadow-lg lg:col-span-1 h-fit sticky top-24">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                {calculatorType === "amortized" && "Loan Details"}
                {calculatorType === "deferred" && "Deferred Loan Details"}
                {calculatorType === "bond" && "Bond Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {calculatorType === "bond" ? "Face Value (Amount Due at Maturity)" : "Loan Amount"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="pl-7"
                    placeholder="100000"
                  />
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loan Term
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Years</label>
                    <Input
                      type="number"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(e.target.value)}
                      placeholder="10"
                      min="0"
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
                  Interest Rate
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-7"
                    placeholder="6"
                    step="0.01"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
              </div>

              {/* Compound Frequency */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Compound Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="annually">Annually (APY)</option>
                  <option value="semiannually">Semi-annually</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly (APR)</option>
                  <option value="semimonthly">Semi-monthly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                  <option value="continuously">Continuously</option>
                </select>
              </div>

              {/* Payment Frequency - Only for Amortized */}
              {calculatorType === "amortized" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Payment Frequency
                  </label>
                  <select
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="daily">Every Day</option>
                    <option value="weekly">Every Week</option>
                    <option value="biweekly">Every 2 Weeks</option>
                    <option value="semimonthly">Every Half Month</option>
                    <option value="monthly">Every Month</option>
                    <option value="quarterly">Every Quarter</option>
                    <option value="semiannually">Every 6 Months</option>
                    <option value="yearly">Every Year</option>
                  </select>
                </div>
              )}

              {/* Calculate Button */}
              <Button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {calculatorType === "amortized" && `${getFrequencyLabel(paymentFrequency)} Payment`}
                        {calculatorType === "deferred" && "Amount Due at Maturity"}
                        {calculatorType === "bond" && "Amount Received Today"}
                      </h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.paymentAmount)}</p>
                    <p className="text-emerald-100">
                      {calculatorType === "amortized" && "Fixed payment amount"}
                      {calculatorType === "deferred" && "Single lump sum payment"}
                      {calculatorType === "bond" && "Bond purchase price"}
                    </p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Payments */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        {calculatorType === "bond" ? "Face Value" : "Total Payment"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(results.totalPayments)}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {calculatorType === "amortized" && "Over entire loan term"}
                        {calculatorType === "deferred" && "Principal + Interest"}
                        {calculatorType === "bond" && "Amount due at maturity"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Total Interest */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">{formatCurrency(results.totalInterest)}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Cost of borrowing
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Breakdown Chart */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-emerald-600" />
                      Payment Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Visual representation */}
                      <div className="flex h-8 rounded-lg overflow-hidden">
                        <div
                          className="bg-emerald-500 flex items-center justify-center text-white text-sm font-medium"
                          style={{ width: `${results.principalPercentage}%` }}
                        >
                          {results.principalPercentage > 15 && formatPercentage(results.principalPercentage)}
                        </div>
                        <div
                          className="bg-teal-500 flex items-center justify-center text-white text-sm font-medium"
                          style={{ width: `${results.interestPercentage}%` }}
                        >
                          {results.interestPercentage > 15 && formatPercentage(results.interestPercentage)}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">Principal</p>
                            <p className="text-lg font-bold text-slate-800">
                              {formatCurrency(parseFloat(loanAmount) || 100000)}
                            </p>
                            <p className="text-xs text-slate-600">{formatPercentage(results.principalPercentage)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-teal-500 rounded"></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">Interest</p>
                            <p className="text-lg font-bold text-slate-800">
                              {formatCurrency(results.totalInterest)}
                            </p>
                            <p className="text-xs text-slate-600">{formatPercentage(results.interestPercentage)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule - Only for Amortized Loans */}
                {calculatorType === "amortized" && schedule.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle>Amortization Schedule</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSchedule(!showSchedule)}
                        >
                          {showSchedule ? "Hide Schedule" : "View Schedule"}
                        </Button>
                      </div>
                    </CardHeader>
                    {showSchedule && (
                      <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-slate-200">
                                <th className="text-left py-3 px-2 font-semibold text-slate-700">#</th>
                                <th className="text-right py-3 px-2 font-semibold text-slate-700">Payment</th>
                                <th className="text-right py-3 px-2 font-semibold text-slate-700">Principal</th>
                                <th className="text-right py-3 px-2 font-semibold text-slate-700">Interest</th>
                                <th className="text-right py-3 px-2 font-semibold text-slate-700">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schedule.slice(0, showSchedule ? undefined : 12).map((entry) => (
                                <tr key={entry.period} className="border-b border-slate-100 hover:bg-emerald-50">
                                  <td className="py-3 px-2 text-slate-600">{entry.period}</td>
                                  <td className="text-right py-3 px-2 font-medium text-slate-800">
                                    {formatCurrency(entry.payment)}
                                  </td>
                                  <td className="text-right py-3 px-2 text-emerald-600">
                                    {formatCurrency(entry.principal)}
                                  </td>
                                  <td className="text-right py-3 px-2 text-teal-600">
                                    {formatCurrency(entry.interest)}
                                  </td>
                                  <td className="text-right py-3 px-2 font-medium text-slate-800">
                                    {formatCurrency(entry.balance)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {!showSchedule && schedule.length > 12 && (
                            <div className="text-center py-4 text-slate-500 text-sm">
                              Showing first 12 of {schedule.length} payments. Click "View Schedule" to see all.
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
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
                  Enter your loan details and click Calculate to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Loans and How They Work</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <p>
                  Taking out a loan represents one of the most common financial decisions people make throughout their lives. Whether you're buying a home, financing education, purchasing a vehicle, or covering unexpected expenses, understanding how loans work can save you thousands of dollars and help you make smarter borrowing choices. This calculator helps you explore different loan structures and see exactly how your money gets allocated between principal and interest over time.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">The Three Main Types of Loans</h3>
                <p>
                  Loans aren't all created equal, and the structure you choose can dramatically impact your total costs. Our calculator covers three fundamental loan types that serve different financial needs and situations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Amortized Loans: The Most Common Structure</h4>
                <p>
                  When most people think of a loan, they're picturing an amortized loan. These loans feature fixed, regular payments that gradually chip away at both your principal balance and the accumulated interest. Each payment you make splits between these two components, though the ratio changes over time in an interesting way.
                </p>
                <p className="mt-3">
                  Early in your loan term, a larger portion of each payment goes toward interest charges. That's because interest gets calculated based on your outstanding balance, which starts at its highest point. As you continue making payments and reducing the principal, less interest accrues each period, so more of your payment can tackle the principal itself. This creates a snowball effect where you build equity faster as time goes on.
                </p>
                <p className="mt-3">
                  Mortgages represent the classic example of amortized loans, but you'll find this structure used for auto loans, personal loans, and many business loans as well. The predictability of fixed payments makes budgeting straightforward, and you can clearly see your debt decreasing with each payment you make.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Deferred Payment Loans: Pay Later Structures</h4>
                <p>
                  Sometimes called balloon loans or interest-only loans in certain contexts, deferred payment loans take a completely different approach. Instead of making regular payments throughout the loan term, you pay nothing until the loan matures. At that point, you owe a single lump sum that includes both the original principal and all the accumulated interest.
                </p>
                <p className="mt-3">
                  These loans serve specific purposes where you expect a large future payment—perhaps from an inheritance, property sale, or business transaction. Student loans sometimes operate similarly during school years, though they typically convert to amortized repayment schedules after graduation. The key thing to understand is that interest keeps compounding throughout the entire loan period, which can make the final payment substantially larger than the amount you initially borrowed.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Bonds and Zero-Coupon Notes</h4>
                <p>
                  Bonds flip the traditional loan concept on its head. Instead of borrowing money and paying it back with interest, you sell a bond for less than its face value today and promise to pay the full face value at maturity. The difference between what you receive now and what you pay later represents the interest cost.
                </p>
                <p className="mt-3">
                  This structure gets used in various financial contexts, from corporate borrowing to certain types of government securities. If you need money now but can guarantee a specific payment later, bonds offer a way to structure that arrangement. The buyer of your bond essentially lends you money at a discount, earning their return when you pay back the full amount.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">Interest Rates: The Cost of Borrowing</h3>
                <p>
                  Interest rates determine how much your loan actually costs beyond the principal amount you borrow. But understanding interest rates requires more than just looking at the advertised percentage—you need to grasp how compounding frequency and rate types interact.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">APR vs. APY: What's the Difference?</h4>
                <p>
                  You'll often encounter two different ways of expressing interest rates: APR (Annual Percentage Rate) and APY (Annual Percentage Yield). These aren't just different names for the same thing—they represent fundamentally different calculations that can make a significant difference in your actual costs.
                </p>
                <p className="mt-3">
                  APR typically refers to the simple annual rate without accounting for compounding within the year. If you have a 12% APR with monthly compounding, you're actually paying 1% interest each month. APY, on the other hand, accounts for compounding effects to show you the effective annual rate you'll really pay. With monthly compounding, that 12% APR translates to approximately 12.68% APY.
                </p>
                <p className="mt-3">
                  The difference might seem small, but over large loan amounts and long time periods, this compounding effect adds up. Always check whether you're looking at APR or APY, and understand the compounding frequency being used. Our calculator lets you explore different compounding schedules so you can see exactly how they affect your total costs.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">How Compounding Frequency Affects Your Loan</h3>
                <p>
                  Compounding frequency determines how often interest gets calculated and added to your loan balance. More frequent compounding means interest gets charged on previously accumulated interest more often, which increases your total costs.
                </p>
                <p className="mt-3">
                  Consider a $100,000 loan at 6% interest for 10 years. With annual compounding, you'd calculate interest once per year on the outstanding balance. With monthly compounding—the most common frequency for consumer loans—interest gets calculated and added twelve times per year. Daily compounding does this 365 times annually, and continuous compounding represents the mathematical limit where compounding happens infinitely often.
                </p>
                <p className="mt-3">
                  Each step up in compounding frequency increases your effective interest rate. That's why a mortgage with monthly compounding costs more than one with annual compounding, even if the stated APR stays the same. The impact grows larger with higher interest rates and longer loan terms, making it particularly important for big-ticket items like homes and commercial properties.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">Loan Term: Balancing Payment Size and Total Cost</h3>
                <p>
                  The length of your loan term creates a fundamental tradeoff that every borrower faces. Longer terms mean smaller monthly payments that fit more easily into your budget, but you'll pay substantially more interest over the life of the loan. Shorter terms demand higher monthly payments but dramatically reduce your total interest costs.
                </p>
                <p className="mt-3">
                  Let's make this concrete with an example. Borrow $100,000 at 6% interest with monthly compounding. Choose a 10-year term and your monthly payment will be around $1,110, with total interest of approximately $33,200. Stretch that same loan to 30 years and your monthly payment drops to a much more manageable $600—but now you'll pay roughly $115,800 in interest over the life of the loan. That's nearly $82,000 more in interest costs, more than doubling what you pay for the same amount borrowed.
                </p>
                <p className="mt-3">
                  The right choice depends on your financial situation and priorities. Can you afford higher monthly payments in exchange for massive long-term savings? Or do you need the breathing room of lower payments right now, even if it costs more over time? There's no universally correct answer, but understanding the tradeoff helps you make an informed decision rather than just picking whatever payment amount sounds affordable.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">Secured vs. Unsecured Loans</h3>
                <p>
                  Beyond the payment structure and interest calculations, loans fall into two broad categories based on whether they're backed by collateral. This distinction affects everything from interest rates to approval requirements to what happens if you can't repay.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Secured Loans: Lower Rates, Higher Stakes</h4>
                <p>
                  Secured loans require you to pledge an asset—called collateral—that the lender can seize if you fail to repay. Your home secures a mortgage, your car backs an auto loan, and business equipment might secure a commercial loan. This collateral reduces the lender's risk, which typically translates to lower interest rates and better terms for you.
                </p>
                <p className="mt-3">
                  The downside, of course, is that defaulting on a secured loan means losing the collateral. Miss enough mortgage payments and you'll face foreclosure. Stop paying your car loan and the lender will repossess your vehicle. This creates serious consequences for non-payment that go beyond just damaging your credit score.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Unsecured Loans: Convenience at a Cost</h4>
                <p>
                  Unsecured loans don't require collateral, relying instead on your creditworthiness and promise to repay. Credit cards, personal loans, and student loans typically fall into this category. Without collateral to reduce their risk, lenders charge higher interest rates to compensate for the increased chance of loss.
                </p>
                <p className="mt-3">
                  While you won't lose physical assets if you default on an unsecured loan, lenders can still pursue collection actions, damage your credit, and potentially sue you for repayment. The lack of collateral doesn't mean there are no consequences—it just changes what those consequences look like.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">The Five C's of Credit</h3>
                <p>
                  When lenders evaluate your loan application, they typically consider what's known as the Five C's of Credit. Understanding these factors helps you see your application from the lender's perspective and identify areas where you might strengthen your borrowing position.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Character: Your Credit History</h4>
                <p>
                  Character refers to your track record of repaying debts, as reflected in your credit score and credit report. Lenders want to know: Have you borrowed before? Did you repay on time? Any bankruptcies or major defaults in your past? A strong credit history signals that you take your obligations seriously and can be trusted to repay this new loan.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Capacity: Your Ability to Repay</h4>
                <p>
                  Do you earn enough income to cover the loan payments along with your other financial obligations? Lenders assess your debt-to-income ratio, employment stability, and income sources to determine whether you can realistically afford the payments. Even with perfect credit history, you might struggle to qualify if the loan payment would consume too much of your monthly income.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Capital: Your Financial Resources</h4>
                <p>
                  Capital represents your existing assets and savings. How much money do you have in the bank? What's your net worth? Do you have investments or other resources you could tap in an emergency? Greater capital gives lenders confidence that you could still make payments even if you hit a rough patch financially.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Collateral: Asset Security</h4>
                <p>
                  For secured loans, the value and quality of your collateral matters tremendously. A house in good condition in a stable neighborhood provides better security than a fixer-upper in a declining area. Similarly, a new car retains value better than an older vehicle with high mileage. Strong collateral can help you secure better rates and terms.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Conditions: Economic and Loan Context</h4>
                <p>
                  Conditions encompass both the broader economic environment and the specific purpose of your loan. Are we in a recession or a growth period? What are prevailing interest rates? What will you use the loan proceeds for? A loan to purchase inventory for a thriving business might get viewed more favorably than borrowing to cover existing debts, even if the dollar amounts are identical.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">Making Smart Borrowing Decisions</h3>
                <p>
                  Armed with an understanding of how loans work, you're better positioned to make borrowing decisions that serve your financial goals rather than just solving your immediate cash needs. Here are some key principles to keep in mind.
                </p>
                <p className="mt-3">
                  First, always shop around and compare offers from multiple lenders. Interest rates, fees, and terms can vary significantly, and the first offer you receive might not be the best available. Even a difference of half a percentage point in your rate can save thousands of dollars over a long-term loan.
                </p>
                <p className="mt-3">
                  Second, understand the total cost of borrowing, not just the monthly payment. A 30-year mortgage might have an affordable monthly payment, but you'll pay more than twice the home's original price by the time you finish paying it off. Sometimes paying a bit more each month makes tremendous financial sense in the long run.
                </p>
                <p className="mt-3">
                  Third, consider your ability to make extra payments or pay off the loan early. Many loans allow prepayment without penalties, which can dramatically reduce your total interest costs. Even small additional payments applied to principal can shorten your loan term by years and save substantial amounts of interest.
                </p>
                <p className="mt-3">
                  Finally, be realistic about your financial situation and future prospects. Borrowing at the absolute limit of what you can afford leaves no margin for error if your circumstances change. Job loss, medical emergencies, or other unexpected events happen to everyone eventually. Maintaining some financial cushion helps ensure a temporary setback doesn't spiral into a major crisis.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This loan calculator gives you powerful tools to explore different scenarios and understand exactly how various factors affect your borrowing costs. Don't just calculate your current situation and move on—experiment with different numbers to see how changes impact your results.
                </p>
                <p className="mt-3">
                  Try adjusting the loan term to see the tradeoff between monthly payments and total interest. Compare different interest rates to understand how much you might save by improving your credit score or shopping for better offers. Experiment with different compounding and payment frequencies to see their effects.
                </p>
                <p className="mt-3">
                  For amortized loans, review the amortization schedule to see how your payments divide between principal and interest over time. You'll notice that early payments go mostly to interest, which is why making extra principal payments early in your loan term provides the most benefit.
                </p>
                <p className="mt-3">
                  Remember that calculators provide estimates based on the numbers you input. Your actual loan might include additional fees, insurance requirements, or other costs not captured in these basic calculations. Always review the complete loan documents and ask questions about anything you don't understand before committing to a loan.
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
                <h3 className="font-semibold text-lg mb-2 text-slate-800">What's the difference between APR and APY?</h3>
                <p className="text-slate-600">
                  APR (Annual Percentage Rate) is the simple annual rate without accounting for compounding effects within the year. APY (Annual Percentage Yield) includes the impact of compounding, showing you the true effective annual rate you'll pay. With frequent compounding, APY is always higher than APR.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">How does compounding frequency affect my loan?</h3>
                <p className="text-slate-600">
                  More frequent compounding increases your effective interest rate because interest gets charged on previously accumulated interest more often. Monthly compounding costs more than annual compounding at the same stated rate, and daily compounding costs even more.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">Should I choose a longer or shorter loan term?</h3>
                <p className="text-slate-600">
                  Longer terms offer lower monthly payments but cost significantly more in total interest. Shorter terms require higher monthly payments but save thousands in interest costs. Choose based on your budget constraints and long-term financial goals.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">What happens if I make extra payments on my loan?</h3>
                <p className="text-slate-600">
                  Extra payments applied to principal reduce your outstanding balance, which decreases future interest charges and can significantly shorten your loan term. Even small additional payments made consistently can save thousands of dollars over a long-term loan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">How accurate is this calculator?</h3>
                <p className="text-slate-600">
                  This calculator provides accurate estimates based on standard loan formulas. However, actual loans may include additional fees, insurance costs, or other charges not reflected here. Always review complete loan documents before making final decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/mortgage"
                  className="flex items-center gap-3 p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all"
                >
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Mortgage Calculator</h3>
                    <p className="text-sm text-slate-600">Calculate home loan payments</p>
                  </div>
                </Link>

                <Link
                  href="/percentage"
                  className="flex items-center gap-3 p-4 border-2 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Percentage Calculator</h3>
                    <p className="text-sm text-slate-600">Calculate percentages easily</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
