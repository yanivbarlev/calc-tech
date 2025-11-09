"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Calendar, Percent, TrendingUp, CreditCard, Clock } from "lucide-react";

interface PersonalLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  totalInsurance: number;
  totalWithFees: number;
  realAPR: number;
  payoffDate: string;
}

interface AmortizationEntry {
  month: number;
  date: string;
  interest: number;
  principal: number;
  balance: number;
}

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("20000");
  const [interestRate, setInterestRate] = useState<string>("7.5");
  const [loanTermYears, setLoanTermYears] = useState<string>("5");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [originationFeeType, setOriginationFeeType] = useState<"percentage" | "fixed">("percentage");
  const [originationFeePercent, setOriginationFeePercent] = useState<string>("2");
  const [originationFeeFixed, setOriginationFeeFixed] = useState<string>("0");
  const [insurancePremium, setInsurancePremium] = useState<string>("0");

  const [results, setResults] = useState<PersonalLoanResults | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTermYears) || 0;
    const months = parseFloat(loanTermMonths) || 0;
    const insurance = parseFloat(insurancePremium) || 0;

    // Calculate origination fee
    let originationFee = 0;
    if (originationFeeType === "percentage") {
      const feePercent = parseFloat(originationFeePercent) || 0;
      originationFee = (principal * feePercent) / 100;
    } else {
      originationFee = parseFloat(originationFeeFixed) || 0;
    }

    const totalMonths = years * 12 + months;
    const monthlyRate = annualRate / 100 / 12;

    // Calculate monthly payment using amortization formula
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = principal / totalMonths;
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - principal;
    const totalInsurance = insurance * totalMonths;
    const totalWithFees = totalPayment + originationFee + totalInsurance;

    // Calculate Real APR (includes fees and insurance)
    // Real APR accounts for the fact that you receive less than the loan amount due to fees
    const effectivePrincipal = principal - originationFee;
    const totalCost = totalPayment + totalInsurance;
    const totalInterestWithFees = totalCost - effectivePrincipal;

    // Calculate effective monthly rate that would produce the same total cost
    let realAPR = annualRate;
    if (effectivePrincipal > 0 && totalMonths > 0) {
      // Simplified real APR calculation
      const avgMonthlyInterest = totalInterestWithFees / totalMonths;
      const avgBalance = effectivePrincipal / 2;
      const effectiveMonthlyRate = avgMonthlyInterest / avgBalance;
      realAPR = effectiveMonthlyRate * 12 * 100;
    }

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear(), today.getMonth() + totalMonths);
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount: principal,
      totalInsurance,
      totalWithFees,
      realAPR,
      payoffDate: payoffDateStr
    });

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let balance = principal;
    const startDate = new Date();

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + month);

      schedule.push({
        month,
        date: paymentDate.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        interest: interestPayment,
        principal: principalPayment,
        balance: Math.max(0, balance)
      });
    }

    setAmortization(schedule);
    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateLoan();
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
            <CreditCard className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Personal Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate monthly payments, compare total costs, and plan your personal loan with confidence
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Loan Details
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
                      placeholder="20000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (%)
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
                    Loan Term
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="number"
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(e.target.value)}
                        placeholder="5"
                      />
                      <p className="text-xs text-slate-500 mt-1">Years</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        placeholder="0"
                      />
                      <p className="text-xs text-slate-500 mt-1">Months</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4">Additional Costs</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Origination Fee
                      </label>
                      <div className="flex gap-2 mb-2">
                        <Button
                          variant={originationFeeType === "percentage" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOriginationFeeType("percentage")}
                          className="flex-1"
                        >
                          Percentage
                        </Button>
                        <Button
                          variant={originationFeeType === "fixed" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setOriginationFeeType("fixed")}
                          className="flex-1"
                        >
                          Fixed
                        </Button>
                      </div>
                      {originationFeeType === "percentage" ? (
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            value={originationFeePercent}
                            onChange={(e) => setOriginationFeePercent(e.target.value)}
                            className="pr-7"
                            placeholder="2"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      ) : (
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={originationFeeFixed}
                            onChange={(e) => setOriginationFeeFixed(e.target.value)}
                            className="pl-7"
                            placeholder="0"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Insurance Premium (Monthly)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={insurancePremium}
                          onChange={(e) => setInsurancePremium(e.target.value)}
                          className="pl-7"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateLoan}
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
                      Principal & Interest only
                    </p>
                    {parseFloat(insurancePremium) > 0 && (
                      <p className="text-emerald-100 mt-1">
                        Total with insurance: {formatCurrency(results.monthlyPayment + parseFloat(insurancePremium))}
                      </p>
                    )}
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
                        <span className="text-slate-600">Total Payments</span>
                        <span className="font-semibold">{formatCurrency(results.totalPayment)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Interest Rate</span>
                        <span className="font-bold">{formatPercentage(parseFloat(interestRate))}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        Total Cost Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Origination Fee</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            originationFeeType === "percentage"
                              ? (parseFloat(loanAmount) * parseFloat(originationFeePercent)) / 100
                              : parseFloat(originationFeeFixed)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Insurance</span>
                        <span className="font-semibold">{formatCurrency(results.totalInsurance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Payoff Date</span>
                        <span className="font-semibold">{results.payoffDate}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Total w/ Fees</span>
                        <span className="font-bold text-lg">{formatCurrency(results.totalWithFees)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Real APR Card */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <Percent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Real APR (includes fees)</p>
                          <p className="text-2xl font-bold text-slate-800">{formatPercentage(results.realAPR)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">vs. Stated Rate</p>
                        <p className="text-lg font-semibold text-slate-700">{formatPercentage(parseFloat(interestRate))}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Amortization Schedule */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-6 w-6 text-emerald-600" />
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
                <CreditCard className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your loan details and click "Calculate Loan" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Personal Loans</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Personal Loan?</h3>
                <p>
                  A personal loan is essentially borrowed money with a predetermined repayment schedule. Unlike a credit card where your balance and payments can fluctuate, personal loans come with fixed amounts, fixed interest rates, and fixed monthly payments. You borrow a specific sum—say, $20,000—and agree to pay it back over a set period with interest.
                </p>
                <p className="mt-3">
                  What makes personal loans particularly useful is their versatility. You're not restricted to using the money for a specific purchase like you would be with an auto loan or mortgage. Need to consolidate high-interest credit card debt? A personal loan can help. Facing unexpected medical bills? Same story. Planning a wedding or home renovation? Personal loans work for those situations too.
                </p>
                <p className="mt-3">
                  The predictability factor is huge. From day one, you'll know exactly how much you need to pay each month and when your final payment will be. This makes budgeting straightforward and takes away the guesswork that comes with revolving credit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Personal Loans Work</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Application Process</h4>
                <p>
                  Getting a personal loan starts with finding a lender and submitting an application. Most lenders will want to know about your income, employment history, existing debts, and credit score. They're essentially trying to answer one question: How likely are you to pay this money back?
                </p>
                <p className="mt-3">
                  You'll typically need to provide documentation like pay stubs, tax returns, or bank statements to verify your income. Some online lenders have streamlined this process significantly—you might get approved within hours or even minutes. Traditional banks tend to move more slowly but might offer better rates if you have an existing relationship with them.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rates and Your Credit</h4>
                <p>
                  Your interest rate is probably the most important number in your loan agreement. It determines how much extra you'll pay beyond the amount you borrowed. Lenders base this rate primarily on your creditworthiness—people with excellent credit scores might qualify for rates in the single digits, while those with poor credit could face rates of 20% or higher.
                </p>
                <p className="mt-3">
                  Here's something important to understand: even seemingly small differences in interest rates can add up to thousands of dollars over the life of a loan. A $20,000 loan at 7% versus 10% might only differ by about $30 per month in payments, but over five years, the higher rate costs you roughly $1,800 more in interest.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Terms and Repayment</h4>
                <p>
                  Personal loans typically come with terms ranging from two to seven years, though some lenders offer terms as short as one year or as long as twelve. Shorter terms mean higher monthly payments but less interest paid overall. Longer terms bring your monthly payment down but increase the total cost of borrowing.
                </p>
                <p className="mt-3">
                  Most personal loans use simple amortization, which means each payment you make includes both principal and interest. In the early months, a larger portion goes toward interest. As time passes, more of each payment chips away at the principal balance. This is why paying extra early in the loan can be so effective at reducing your total interest costs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Personal Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Secured vs. Unsecured Loans</h4>
                <p>
                  Most personal loans are unsecured, meaning they don't require collateral. You're not putting your car or house on the line. The lender is taking on more risk, which is why these loans typically have higher interest rates than secured loans like mortgages or auto loans.
                </p>
                <p className="mt-3">
                  Secured personal loans do exist, though they're less common. With these, you pledge an asset—maybe a savings account, certificate of deposit, or even your vehicle—as collateral. If you default, the lender can seize that asset. The upside is you'll usually get a lower interest rate since the lender's risk is reduced.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Traditional Bank Loans</h4>
                <p>
                  Banks and credit unions have been offering personal loans for decades. They tend to be more conservative in their lending criteria but often provide competitive rates, especially if you're already a customer. The application process might take longer—sometimes several days to a week—but you get the advantage of face-to-face service and the ability to discuss your situation with a real person.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Online and Peer-to-Peer Lending</h4>
                <p>
                  The rise of online lending platforms has transformed the personal loan landscape. These lenders operate entirely online, which means lower overhead costs that they can sometimes pass on to borrowers in the form of better rates. The application process is typically faster and more convenient—you can apply from your couch at midnight if you want.
                </p>
                <p className="mt-3">
                  Peer-to-peer lending takes this a step further by connecting borrowers directly with individual investors willing to fund their loans. These platforms act as intermediaries, handling the paperwork and payments. You might find more flexible terms or get approved even if traditional lenders turned you down, though rates can vary widely depending on your credit profile.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Uses for Personal Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Debt Consolidation</h4>
                <p>
                  This is probably the most popular reason people take out personal loans. If you're juggling multiple credit card balances with high interest rates—say, 18% to 25%—consolidating them into a single personal loan at 8% or 10% can save you serious money and simplify your finances. Instead of tracking multiple due dates and minimum payments, you make one payment each month.
                </p>
                <p className="mt-3">
                  The key is not to view consolidation as a free pass to rack up new credit card debt. Too many people consolidate, then charge up their cards again, ending up in an even worse position than before. Use consolidation as a fresh start and an opportunity to change your spending habits.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Medical Expenses</h4>
                <p>
                  Healthcare costs can hit hard and fast. Whether it's an unexpected surgery, ongoing treatment, or dental work, medical bills have a way of piling up. Many medical providers offer payment plans, but these sometimes come with their own interest charges. A personal loan might offer better terms, especially if you have good credit.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Home Improvements</h4>
                <p>
                  While home equity loans and lines of credit are common for renovation projects, personal loans offer an alternative that doesn't require using your home as collateral. They're particularly useful for smaller projects—maybe you're updating a bathroom or replacing your HVAC system—where the cost doesn't justify the more complex process of a home equity loan.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Major Purchases</h4>
                <p>
                  Need a new appliance? Planning a wedding? Looking to buy furniture for your new place? Personal loans can finance these expenses while letting you preserve your emergency fund. Just be mindful of whether the purchase truly justifies borrowing money and paying interest. A refrigerator that broke down? Probably worth it. New living room furniture when your current set works fine? Maybe reconsider.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding Fees and Costs</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Origination Fees</h4>
                <p>
                  Many lenders charge an origination fee, essentially a one-time charge for processing your loan. This typically ranges from 1% to 8% of your loan amount. Some lenders deduct this fee from your loan proceeds—so if you borrow $10,000 with a 3% fee, you actually receive $9,700, but you're paying interest on the full $10,000.
                </p>
                <p className="mt-3">
                  This is why the "Real APR" matters. A loan advertised at 7% with a 5% origination fee costs you more than a loan at 8% with no fee. Always compare the total cost, not just the interest rate.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Prepayment Penalties</h4>
                <p>
                  Some lenders charge fees if you pay off your loan early. This might seem counterintuitive—why penalize someone for paying you back?—but remember that lenders make money from interest. When you pay early, they lose out on that revenue.
                </p>
                <p className="mt-3">
                  Prepayment penalties are becoming less common, especially with online lenders, but they still exist. If you think there's any chance you'll want to pay off your loan ahead of schedule—maybe you're expecting a bonus or inheritance—make sure to choose a loan without this penalty.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Late Payment Fees</h4>
                <p>
                  Miss a payment, and you'll typically face a late fee, usually around $25 to $50. More importantly, late payments can damage your credit score, potentially affecting your ability to borrow in the future and the rates you'll be offered. Set up automatic payments if your lender offers them—it's an easy way to ensure you never miss a due date.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Insurance and Add-ons</h4>
                <p>
                  Some lenders offer optional insurance that pays off your loan if you die, become disabled, or lose your job. These products can provide peace of mind, but they also add to your costs. Read the terms carefully and consider whether you really need this coverage. You might already have life insurance or disability coverage through your employer that would serve the same purpose.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Improving Your Chances of Approval</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Check Your Credit First</h4>
                <p>
                  Before applying anywhere, get a copy of your credit report from all three major bureaus—Experian, Equifax, and TransUnion. You're entitled to one free report from each bureau every year through AnnualCreditReport.com. Look for errors or inaccuracies that might be dragging your score down. Disputing and correcting mistakes can sometimes boost your score significantly.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Reduce Your Debt-to-Income Ratio</h4>
                <p>
                  Lenders look at how much debt you're carrying relative to your income. If possible, pay down some existing debts before applying. Even small reductions in your credit card balances can improve this ratio and make you a more attractive borrower. As a general rule, try to keep your debt-to-income ratio below 40%.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Consider a Co-signer</h4>
                <p>
                  If your credit isn't great or your income is on the lower side, adding a co-signer with strong credit can help you qualify for better terms. Just understand that your co-signer is equally responsible for the debt. If you can't make payments, it affects their credit and they're legally obligated to pay.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Shop Around But Be Strategic</h4>
                <p>
                  Different lenders have different criteria and offer different rates. It pays to compare options, but be aware that each formal application typically results in a hard inquiry on your credit report, which can temporarily lower your score. Many lenders now offer pre-qualification with only a soft pull that doesn't affect your credit. Use these tools to compare offers before submitting formal applications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Alternatives to Personal Loans</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Credit Cards</h4>
                <p>
                  For smaller expenses you can pay off quickly, a credit card might make more sense than a personal loan. If you have good credit, you might qualify for a card with a 0% introductory APR period—sometimes lasting 12 to 18 months. This gives you interest-free borrowing if you can pay off the balance before the promotional period ends. Just be disciplined about it, because once that period expires, you'll face typical credit card rates that are often higher than personal loan rates.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Home Equity Loans or Lines of Credit</h4>
                <p>
                  If you own your home and have built up equity, you might be able to borrow against it at rates lower than most personal loans. The downside is that your home becomes collateral—defaulting could mean losing your house. These also typically involve closing costs and a more complex application process.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Borrowing from Family or Friends</h4>
                <p>
                  This can be the cheapest option if someone in your life is willing and able to help. Just approach it professionally—put the terms in writing, agree on a repayment schedule, and stick to it. Mixing money with personal relationships can get messy if things go wrong, so treat it as seriously as you would a loan from a bank.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Nonprofit Credit Counseling</h4>
                <p>
                  If you're struggling with debt, nonprofit credit counseling agencies can help. They might be able to negotiate with your creditors for lower interest rates or set up a debt management plan. These services are usually free or low-cost and can be a better option than taking out more debt.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Employer Assistance Programs</h4>
                <p>
                  Some employers offer emergency loans or hardship assistance to employees facing unexpected expenses. These programs might have more lenient terms than commercial lenders. Check with your HR department to see what's available.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making the Most of Your Personal Loan</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Borrow Only What You Need</h4>
                <p>
                  It's tempting to borrow a little extra when you're approved for more than you requested, but remember that you'll pay interest on every dollar. If you need $8,000, don't borrow $10,000 just because you can. That extra $2,000 will cost you significantly more than $2,000 by the time you pay it back.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Make Payments on Time</h4>
                <p>
                  This seems obvious, but it's crucial. Set up automatic payments if you can, or at minimum, set reminders. Consistent on-time payments build your credit score, while late payments damage it and trigger fees.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Pay Extra When Possible</h4>
                <p>
                  If you come into extra money—a tax refund, work bonus, or gift—consider putting some of it toward your loan principal. Even small extra payments can shorten your loan term and reduce total interest costs substantially. Just verify that your lender doesn't charge prepayment penalties first.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Use the Money Wisely</h4>
                <p>
                  Since personal loans are typically unsecured and can be used for almost anything, it's up to you to make sure you're borrowing for the right reasons. Using a loan to consolidate high-interest debt or handle a genuine emergency makes sense. Borrowing for a vacation or luxury purchase you don't really need? That's a recipe for regret once you're making payments for the next few years.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Red Flags to Watch For</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Guaranteed Approval Claims</h4>
                <p>
                  No legitimate lender can guarantee approval before reviewing your application. If someone promises approval regardless of your credit or financial situation, they're likely running a scam or offering terms so unfavorable that no informed borrower would accept them.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Upfront Fees</h4>
                <p>
                  Legitimate lenders might charge origination fees, but these are typically deducted from your loan proceeds or added to your balance. If someone asks you to pay money upfront before you receive your loan, walk away. That's a classic scam.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Pressure Tactics</h4>
                <p>
                  Reputable lenders give you time to review loan documents and consider your options. If someone is pressuring you to sign immediately or claiming an offer is only available for the next few hours, that's a warning sign. Take your time and don't let anyone rush you into a significant financial commitment.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Lack of Transparency</h4>
                <p>
                  All terms should be clearly spelled out in writing—interest rate, fees, payment schedule, penalties, everything. If a lender is vague about costs or unwilling to provide documentation, find someone else.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Auto Loan Calculator</p>
                    <p className="text-sm text-slate-600">Calculate car loan payments</p>
                  </div>
                </Link>
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Mortgage Calculator</p>
                    <p className="text-sm text-slate-600">Plan your home purchase</p>
                  </div>
                </Link>
                <Link href="/student-loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Student Loan Calculator</p>
                    <p className="text-sm text-slate-600">Manage education debt</p>
                  </div>
                </Link>
                <Link href="/credit-card" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Credit Card Calculator</p>
                    <p className="text-sm text-slate-600">Payoff strategies & interest</p>
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
