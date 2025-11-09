"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Car, DollarSign, Percent, Calendar, TrendingUp, PieChart, FileText } from "lucide-react";

interface AutoLoanResults {
  monthlyPayment: number;
  totalLoanAmount: number;
  salesTax: number;
  upfrontPayment: number;
  totalOfPayments: number;
  totalInterest: number;
  totalCost: number;
  principalPercentage: number;
  interestPercentage: number;
}

interface AmortizationEntry {
  month: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

interface AnnualSummary {
  year: number;
  totalInterest: number;
  totalPrincipal: number;
  endingBalance: number;
}

export default function AutoLoanCalculator() {
  // Input states
  const [autoPrice, setAutoPrice] = useState<string>("30000");
  const [downPayment, setDownPayment] = useState<string>("6000");
  const [tradeInValue, setTradeInValue] = useState<string>("0");
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState<string>("0");
  const [salesTaxRate, setSalesTaxRate] = useState<string>("8");
  const [titleFees, setTitleFees] = useState<string>("300");
  const [interestRate, setInterestRate] = useState<string>("6");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("60");
  const [cashIncentives, setCashIncentives] = useState<string>("0");
  const [includeTaxesInLoan, setIncludeTaxesInLoan] = useState<boolean>(true);

  const [results, setResults] = useState<AutoLoanResults | null>(null);
  const [schedule, setSchedule] = useState<AmortizationEntry[]>([]);
  const [annualSchedule, setAnnualSchedule] = useState<AnnualSummary[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  const calculate = () => {
    // Parse inputs
    const price = parseFloat(autoPrice) || 30000;
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const owedOnTrade = parseFloat(amountOwedOnTradeIn) || 0;
    const taxRate = parseFloat(salesTaxRate) || 0;
    const fees = parseFloat(titleFees) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 60;
    const incentives = parseFloat(cashIncentives) || 0;

    // Calculate sales tax (on difference between car price and trade-in)
    const taxableAmount = price - tradeIn;
    const salesTax = (taxableAmount * taxRate) / 100;

    // Calculate total loan amount
    let loanAmount = price - down - tradeIn + owedOnTrade - incentives;

    if (includeTaxesInLoan) {
      loanAmount += salesTax + fees;
    }

    // Calculate upfront payment
    const upfront = down + tradeIn - owedOnTrade + (includeTaxesInLoan ? 0 : salesTax + fees);

    // Calculate monthly payment using amortization formula
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;

    if (rate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                       (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - loanAmount;
    const totalCost = upfront + totalPayments;

    const principalPct = (loanAmount / totalPayments) * 100;
    const interestPct = (totalInterest / totalPayments) * 100;

    setResults({
      monthlyPayment,
      totalLoanAmount: loanAmount,
      salesTax,
      upfrontPayment: upfront,
      totalOfPayments: totalPayments,
      totalInterest,
      totalCost,
      principalPercentage: principalPct,
      interestPercentage: interestPct
    });

    // Generate amortization schedule
    const scheduleData: AmortizationEntry[] = [];
    let balance = loanAmount;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      scheduleData.push({
        month: i,
        interest: interestPayment,
        principal: principalPayment,
        endingBalance: Math.max(0, balance)
      });
    }

    setSchedule(scheduleData);

    // Generate annual summary
    const annualData: AnnualSummary[] = [];
    const years = Math.ceil(months / 12);

    for (let year = 1; year <= years; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, months);

      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let i = startMonth; i < endMonth; i++) {
        if (scheduleData[i]) {
          yearInterest += scheduleData[i].interest;
          yearPrincipal += scheduleData[i].principal;
        }
      }

      annualData.push({
        year,
        totalInterest: yearInterest,
        totalPrincipal: yearPrincipal,
        endingBalance: scheduleData[endMonth - 1]?.endingBalance || 0
      });
    }

    setAnnualSchedule(annualData);
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
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
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Professional Calculation Tools</div>
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
            <Car className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Auto Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your monthly car payment, total loan cost, and view a complete amortization schedule
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-6 w-6" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Auto Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={autoPrice}
                      onChange={(e) => setAutoPrice(e.target.value)}
                      placeholder="30000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="6000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Trade-in Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={tradeInValue}
                      onChange={(e) => setTradeInValue(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Amount Owed on Trade-in
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={amountOwedOnTradeIn}
                      onChange={(e) => setAmountOwedOnTradeIn(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sales Tax Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="pr-7"
                      value={salesTaxRate}
                      onChange={(e) => setSalesTaxRate(e.target.value)}
                      placeholder="8"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title, Registration & Fees
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={titleFees}
                      onChange={(e) => setTitleFees(e.target.value)}
                      placeholder="300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (APR)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      className="pr-7"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="6"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term (Months)
                  </label>
                  <Input
                    type="number"
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(e.target.value)}
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Cash Incentives / Rebates
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      className="pl-7"
                      value={cashIncentives}
                      onChange={(e) => setCashIncentives(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeTaxes"
                    checked={includeTaxesInLoan}
                    onChange={(e) => setIncludeTaxesInLoan(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="includeTaxes" className="text-sm font-medium text-slate-700">
                    Include taxes and fees in loan
                  </label>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
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
                    <p className="text-emerald-100">For {loanTermMonths} months at {interestRate}% APR</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <FileText className="h-5 w-5 text-emerald-600" />
                        Loan Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Loan Amount:</span>
                        <span className="font-semibold">{formatCurrency(results.totalLoanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sales Tax:</span>
                        <span className="font-semibold">{formatCurrency(results.salesTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Upfront Payment:</span>
                        <span className="font-semibold">{formatCurrency(results.upfrontPayment)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Total Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total of Payments:</span>
                        <span className="font-semibold">{formatCurrency(results.totalOfPayments)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Interest:</span>
                        <span className="font-semibold text-orange-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Cost:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalCost)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Loan Breakdown */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <PieChart className="h-5 w-5 text-emerald-600" />
                      Loan Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-600">Principal</span>
                          <span className="font-semibold">{formatPercentage(results.principalPercentage)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                            style={{ width: `${results.principalPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-600">Interest</span>
                          <span className="font-semibold">{formatPercentage(results.interestPercentage)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full"
                            style={{ width: `${results.interestPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Amortization Schedule
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === 'monthly' ? 'default' : 'outline'}
                          onClick={() => setViewMode('monthly')}
                          className={viewMode === 'monthly' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                          size="sm"
                        >
                          Monthly
                        </Button>
                        <Button
                          variant={viewMode === 'annual' ? 'default' : 'outline'}
                          onClick={() => setViewMode('annual')}
                          className={viewMode === 'annual' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                          size="sm"
                        >
                          Annual
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      {viewMode === 'monthly' ? (
                        <div className="max-h-96 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50 sticky top-0">
                              <tr>
                                <th className="text-left p-3 font-semibold text-slate-700">Month</th>
                                <th className="text-right p-3 font-semibold text-slate-700">Interest</th>
                                <th className="text-right p-3 font-semibold text-slate-700">Principal</th>
                                <th className="text-right p-3 font-semibold text-slate-700">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {schedule.map((entry) => (
                                <tr key={entry.month} className="border-b hover:bg-slate-50">
                                  <td className="p-3">{entry.month}</td>
                                  <td className="text-right p-3">{formatCurrency(entry.interest)}</td>
                                  <td className="text-right p-3">{formatCurrency(entry.principal)}</td>
                                  <td className="text-right p-3 font-semibold">{formatCurrency(entry.endingBalance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left p-3 font-semibold text-slate-700">Year</th>
                              <th className="text-right p-3 font-semibold text-slate-700">Interest</th>
                              <th className="text-right p-3 font-semibold text-slate-700">Principal</th>
                              <th className="text-right p-3 font-semibold text-slate-700">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {annualSchedule.map((entry) => (
                              <tr key={entry.year} className="border-b hover:bg-slate-50">
                                <td className="p-3">{entry.year}</td>
                                <td className="text-right p-3">{formatCurrency(entry.totalInterest)}</td>
                                <td className="text-right p-3">{formatCurrency(entry.totalPrincipal)}</td>
                                <td className="text-right p-3 font-semibold">{formatCurrency(entry.endingBalance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Car className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your loan details and click Calculate Payment
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Auto Loans</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is an Auto Loan?</h3>
                <p>
                  An auto loan is a secured loan used to finance the purchase of a vehicle. When you take out a car loan, the lender provides you with the funds to buy the vehicle, and you agree to repay that amount—plus interest—over a specified period. The car itself serves as collateral, which means if you fail to make your payments, the lender has the right to repossess the vehicle.
                </p>
                <p className="mt-3">
                  Most auto loans are structured as installment loans, meaning you'll make fixed monthly payments until the loan is fully paid off. The payment schedule typically ranges from 24 to 84 months, though 60-month (5-year) terms remain the most common choice among buyers. Your monthly payment covers both the principal amount you borrowed and the interest charged by the lender.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">How Auto Loans Work</h4>
                <p>
                  The process starts when you apply for financing, either through a dealership, bank, credit union, or online lender. Your creditworthiness—determined largely by your credit score—plays a huge role in the interest rate you'll receive. Borrowers with excellent credit (scores above 750) can often secure rates below 5%, while those with poor credit might face rates exceeding 15% or even higher.
                </p>
                <p className="mt-3">
                  Here's what happens when you get approved: the lender pays the dealership or seller directly, and you become responsible for monthly payments according to the agreed-upon terms. Each payment you make reduces your loan balance while also covering the interest charges that accumulate based on your outstanding principal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Dealership Financing vs. Direct Lending</h3>
                <p>
                  You have two main paths when it comes to securing an auto loan: dealer financing or direct lending from a financial institution. Each approach has its advantages, and understanding the difference can save you thousands of dollars over the life of your loan.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Dealer Financing</h4>
                <p>
                  Dealerships offer the convenience of one-stop shopping. You pick your car, negotiate the price, and arrange financing all in the same place. The dealer typically works with multiple lenders and can shop your application around to find approval. They may also offer manufacturer incentives like 0% APR promotions or special rebates that aren't available through traditional banks.
                </p>
                <p className="mt-3">
                  That said, there's a catch. Dealers often mark up the interest rate they receive from lenders—this markup becomes additional profit for them. If a bank approves you at 5%, the dealer might quote you 6.5% and pocket the difference. Additionally, the pressure-cooker environment of a dealership can lead to rushed decisions you might later regret.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Direct Lending</h4>
                <p>
                  Getting pre-approved for an auto loan from a bank, credit union, or online lender before you start shopping gives you significant leverage. You'll know exactly how much you can afford, what interest rate you qualify for, and you can focus purely on negotiating the vehicle's price rather than getting caught up in monthly payment discussions.
                </p>
                <p className="mt-3">
                  Credit unions, in particular, often offer the most competitive rates because they're not-for-profit institutions. Online lenders have also become increasingly popular, with streamlined applications and quick approval processes. The downside? You'll need to handle more paperwork yourself, and you won't have access to those special manufacturer financing promotions that dealers sometimes offer.
                </p>
                <p className="mt-3">
                  Many financial experts recommend getting pre-approved through direct lending first, then seeing if the dealer can beat your rate. This strategy puts you in the driver's seat (no pun intended) and ensures you're getting the best possible deal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Auto Loan Costs and Fees</h3>
                <p>
                  The sticker price of a car is just the beginning. By the time you drive off the lot, you'll have paid for numerous additional costs—some unavoidable, others negotiable. Let's break down what you're really paying for.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Sales Tax</h4>
                <p>
                  Sales tax varies dramatically depending on where you live. Most states calculate it as a percentage of the vehicle's purchase price, with rates ranging from zero in states like Montana, New Hampshire, Oregon, Delaware, and Alaska, to over 9% in states like Tennessee and Louisiana when you factor in local taxes.
                </p>
                <p className="mt-3">
                  Here's where it gets interesting: in most states, sales tax is calculated on the difference between your new car's price and your trade-in value. So if you're buying a $30,000 car and trading in a vehicle worth $10,000, you'll only pay tax on the $20,000 difference. However, California, Hawaii, Kentucky, Maryland, Michigan, Virginia, and Washington D.C. don't offer this trade-in tax credit—you pay tax on the full purchase price regardless of your trade-in.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Title, Registration, and Documentation Fees</h4>
                <p>
                  Every state requires you to register your vehicle and transfer the title into your name. Registration fees vary widely, from under $50 in some states to several hundred dollars in others, especially for newer or more expensive vehicles. Some states also charge annual registration renewal fees based on the vehicle's value.
                </p>
                <p className="mt-3">
                  Documentation fees (sometimes called "doc fees") are charged by the dealer to process your paperwork. These can range from $100 to over $700, and they're often negotiable—though dealers might resist budging on them. Some states cap these fees, while others leave them completely unregulated.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Destination and Delivery Charges</h4>
                <p>
                  New cars come with destination fees that cover the cost of shipping the vehicle from the factory to the dealership. These typically run between $900 and $1,500 and are set by the manufacturer, not the dealer. You'll see this charge listed on the window sticker, and it's generally non-negotiable since every buyer of that model pays the same amount.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Dealer Add-ons and Extras</h4>
                <p>
                  This is where dealers often boost their profits. They might try to sell you extended warranties, gap insurance, paint protection, fabric protection, VIN etching, or various other products. Some of these can be valuable—gap insurance, for instance, covers the difference between what you owe and what insurance pays if your car is totaled—but many are overpriced or unnecessary.
                </p>
                <p className="mt-3">
                  Always ask for an itemized breakdown of any additional products or services. Many of these add-ons can be purchased later or from third-party providers at significant savings. Don't let yourself be rushed into buying something you don't need or understand.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Insurance Costs</h4>
                <p>
                  If you're financing a vehicle, your lender will require you to carry comprehensive and collision coverage (in addition to your state's minimum liability requirements). Insurance costs vary based on the vehicle, your driving record, age, location, and coverage levels, but you can expect to pay well over $1,000 annually for full coverage on a financed vehicle.
                </p>
                <p className="mt-3">
                  Before you commit to a particular car, get insurance quotes. That sporty coupe might seem affordable until you discover it costs twice as much to insure as a similar sedan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Auto Loan Strategies</h3>
                <p>
                  Getting a good deal on an auto loan requires preparation, patience, and a willingness to walk away if the numbers don't work. Here are some strategies that can save you thousands.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Improve Your Credit Before Applying</h4>
                <p>
                  Your credit score has an enormous impact on your interest rate. A buyer with a 750 credit score might get a 5% rate, while someone with a 620 score might face 12% or higher. On a $30,000 loan over 60 months, that's the difference between paying about $3,900 in interest versus $10,000.
                </p>
                <p className="mt-3">
                  If your credit isn't where you'd like it to be, consider waiting a few months while you pay down credit card balances, dispute any errors on your credit report, and make all your payments on time. Even a modest improvement in your score can qualify you for a significantly better rate.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Make a Substantial Down Payment</h4>
                <p>
                  The standard advice is to put down at least 20% on a new car and 10% on a used vehicle. This strategy serves multiple purposes: it reduces your monthly payment, lowers the total interest you'll pay, and helps ensure you won't be "underwater" on the loan (owing more than the car is worth).
                </p>
                <p className="mt-3">
                  New cars depreciate rapidly—often losing 20-30% of their value in the first year alone. If you finance the entire purchase price with little or no down payment, you could find yourself owing thousands more than the car is worth. This becomes particularly problematic if you need to sell the car or if it's totaled in an accident.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Keep the Loan Term Reasonable</h4>
                <p>
                  Longer loan terms mean lower monthly payments, which sounds attractive on the surface. However, they also mean paying substantially more interest over time and spending more years with a car payment. Additionally, longer terms increase the likelihood that you'll owe more than the car is worth for most of the loan period.
                </p>
                <p className="mt-3">
                  While 72-month and even 84-month loans have become more common, most financial advisors recommend sticking with 60 months or less. If you need a longer term to afford the payments, that's often a sign you're buying more car than you can comfortably afford.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Negotiate the Price, Not the Payment</h4>
                <p>
                  Dealers love to focus discussions on monthly payments rather than the total price of the vehicle. They might ask, "What monthly payment are you comfortable with?" and then structure the deal to hit that number—often by extending the loan term, adding hidden fees, or increasing the interest rate.
                </p>
                <p className="mt-3">
                  Instead, negotiate the out-the-door price of the vehicle separately from financing. Once you've agreed on a fair price, then discuss financing terms. This approach keeps things transparent and ensures you're not overpaying just to hit a particular monthly payment.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Consider Early Payoff</h4>
                <p>
                  Most auto loans don't have prepayment penalties, meaning you can pay off the loan early without additional charges. If you come into extra money—a bonus, tax refund, or inheritance—putting it toward your auto loan can save you significant interest charges.
                </p>
                <p className="mt-3">
                  Even making one extra payment per year can shave months off your loan term and reduce your total interest paid. Just make sure to specify that any extra payments should go toward the principal, not future interest charges.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Cash Incentives vs. Low Interest Rates</h4>
                <p>
                  Manufacturers sometimes offer a choice: take a cash rebate or qualify for a reduced interest rate. If you're deciding between, say, $2,500 cash back at 6% APR or 0% financing, you'll need to do the math to see which option saves you more money.
                </p>
                <p className="mt-3">
                  Generally speaking, if you qualify for a very low rate (under 2%) from another lender, taking the cash rebate makes sense. But if the promotional rate is 0% and you wouldn't otherwise qualify for anything close to that, the low rate often wins out. Use an auto loan calculator to compare the total costs of each scenario.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Alternatives to Traditional Auto Loans</h3>
                <p>
                  Financing a new car isn't the only option, and for many people, it's not even the best option. Let's explore some alternatives that might better suit your financial situation.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Buying a Quality Used Vehicle</h4>
                <p>
                  The single biggest advantage of buying used is avoiding the massive depreciation hit that new cars take. A three-year-old vehicle has already lost 40-50% of its original value, but it still has most of its useful life ahead of it—modern cars routinely last 200,000 miles or more with proper maintenance.
                </p>
                <p className="mt-3">
                  You'll also pay less in sales tax, registration fees, and insurance premiums. Many late-model used vehicles still have factory warranty coverage, and certified pre-owned (CPO) programs offer extended warranties and thorough inspections. The main downside is that used cars typically don't qualify for the lowest interest rates that new cars receive, though the difference is often offset by the lower purchase price.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Leasing</h4>
                <p>
                  Leasing essentially means you're renting the car for a set period (usually 2-3 years) and paying for the depreciation during that time rather than the full value of the vehicle. Monthly lease payments are typically lower than loan payments for the same car, and you'll always be driving a relatively new vehicle with the latest features and warranty coverage.
                </p>
                <p className="mt-3">
                  The trade-offs? You never own the vehicle, you're limited in how many miles you can drive annually (typically 10,000-15,000), and you'll have a perpetual car payment. Leasing works well if you like driving new cars, drive moderate miles, and don't want to deal with selling your vehicle every few years. It's a poor choice if you drive a lot, want to customize your vehicle, or hope to eventually eliminate car payments.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Paying Cash</h4>
                <p>
                  If you have the means to buy a car outright with cash, you'll enjoy several significant advantages. You'll avoid paying thousands in interest charges, you won't have a monthly payment eating into your budget, and you'll have complete ownership from day one. You can also negotiate more aggressively since dealers know cash deals close quickly and with less hassle.
                </p>
                <p className="mt-3">
                  That said, paying cash for a car ties up a substantial amount of money that could potentially earn more in investments than you'd pay in interest on a low-rate auto loan. If you can get financing at 3% but your investments return 8%, you might be better off taking the loan and keeping your cash invested.
                </p>
                <p className="mt-3">
                  Additionally, if paying cash would deplete your emergency fund or prevent you from contributing to retirement accounts, it's probably not the right move. Most financial planners suggest maintaining 3-6 months of expenses in easily accessible savings before tying up large sums in depreciating assets like vehicles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Auto Loan Mistakes to Avoid</h3>
                <p>
                  Even financially savvy people can make costly mistakes when financing a vehicle. Here are the most common pitfalls and how to avoid them.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Focusing Only on Monthly Payments</h4>
                <p>
                  This bears repeating because it's such a common trap. A dealer can make almost any car "affordable" on a monthly basis by extending the loan term to 72 or 84 months. But you'll pay far more in interest, and you'll be stuck with a car payment for six or seven years.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Rolling Negative Equity Into a New Loan</h4>
                <p>
                  If you still owe more on your current car than it's worth, some dealers will roll that negative equity into your new loan. This means you're starting your new loan already underwater, owing far more than the vehicle is worth. It's a recipe for financial trouble and should be avoided if at all possible.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Not Shopping Around for Rates</h4>
                <p>
                  Many buyers simply accept the first financing offer they receive, but rates can vary significantly between lenders. Get quotes from at least three sources—your bank, a credit union, and an online lender—before making a decision. The half-hour you spend comparison shopping could save you thousands of dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Skipping the Pre-Approval Process</h4>
                <p>
                  Walking into a dealership without pre-approval is like going to a negotiation without knowing your own budget. You lose leverage, and you're more likely to make emotional decisions rather than financial ones. Always know what you qualify for before you start shopping.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Buying More Car Than You Need</h4>
                <p>
                  The general rule of thumb is that all your vehicle expenses—payment, insurance, fuel, and maintenance—shouldn't exceed 15-20% of your take-home pay. If you're stretching beyond that to afford your dream car, you're likely setting yourself up for financial stress down the road.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Final Thoughts</h3>
                <p>
                  Taking out an auto loan is one of the most significant financial decisions you'll make, second only to a home mortgage for many people. The difference between a well-negotiated loan and a poor one can easily amount to $5,000 or more over the life of the loan.
                </p>
                <p className="mt-3">
                  Take your time, do your research, get pre-approved from multiple sources, and don't let anyone pressure you into a decision you're not comfortable with. Remember that there will always be another car and another deal. The key is finding the right balance between the vehicle you want and the payment you can comfortably afford without sacrificing your other financial goals.
                </p>
                <p className="mt-3">
                  Use this calculator to model different scenarios—change the down payment, adjust the loan term, or experiment with different interest rates to see how each factor affects your monthly payment and total cost. Armed with this information, you'll be able to walk into any dealership with confidence and secure the best possible financing for your next vehicle.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Calculator className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate home loan payments</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate personal loan details</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with precision for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
