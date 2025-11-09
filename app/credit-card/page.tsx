"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, CreditCard, DollarSign, Calendar, TrendingDown, AlertCircle, Info } from "lucide-react";

interface CreditCardResults {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  monthlyPaymentRequired?: number;
  payoffDate: Date;
}

export default function CreditCardCalculator() {
  const [balance, setBalance] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("18.5");
  const [paymentMethod, setPaymentMethod] = useState<"amount" | "timeframe">("amount");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("150");
  const [payoffYears, setPayoffYears] = useState<string>("3");
  const [payoffMonths, setPayoffMonths] = useState<string>("0");

  const [results, setResults] = useState<CreditCardResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const balanceNum = parseFloat(balance) || 5000;
    const rateNum = parseFloat(interestRate) || 18.5;
    const monthlyRate = rateNum / 100 / 12;

    if (balanceNum <= 0 || rateNum < 0) {
      return;
    }

    let monthsToPayoff = 0;
    let totalInterestPaid = 0;
    let totalAmountPaid = 0;
    let monthlyPaymentRequired = 0;

    if (paymentMethod === "amount") {
      // Calculate payoff time based on fixed monthly payment
      const paymentNum = parseFloat(monthlyPayment) || 150;

      // Minimum payment check
      const minPayment = Math.max(15, balanceNum * 0.01 + balanceNum * monthlyRate);

      if (paymentNum < minPayment) {
        // If payment is too low, the debt will never be paid off
        setResults(null);
        setHasCalculated(true);
        return;
      }

      let remainingBalance = balanceNum;
      monthsToPayoff = 0;

      while (remainingBalance > 0.01 && monthsToPayoff < 600) {
        const interestCharge = remainingBalance * monthlyRate;
        const principalPayment = paymentNum - interestCharge;

        if (principalPayment <= 0) {
          // Payment doesn't cover interest, debt will never be paid off
          setResults(null);
          setHasCalculated(true);
          return;
        }

        totalInterestPaid += interestCharge;
        remainingBalance -= principalPayment;
        monthsToPayoff++;

        if (remainingBalance < 0) {
          // Adjust last payment
          totalAmountPaid += remainingBalance + paymentNum;
          remainingBalance = 0;
        } else {
          totalAmountPaid += paymentNum;
        }
      }

      monthlyPaymentRequired = paymentNum;
    } else {
      // Calculate monthly payment based on desired payoff timeframe
      const yearsNum = parseFloat(payoffYears) || 3;
      const monthsNum = parseFloat(payoffMonths) || 0;
      monthsToPayoff = yearsNum * 12 + monthsNum;

      if (monthsToPayoff <= 0) {
        return;
      }

      // Calculate required monthly payment using amortization formula
      if (monthlyRate === 0) {
        monthlyPaymentRequired = balanceNum / monthsToPayoff;
      } else {
        monthlyPaymentRequired = balanceNum * (monthlyRate * Math.pow(1 + monthlyRate, monthsToPayoff)) /
                                  (Math.pow(1 + monthlyRate, monthsToPayoff) - 1);
      }

      let remainingBalance = balanceNum;
      for (let i = 0; i < monthsToPayoff; i++) {
        const interestCharge = remainingBalance * monthlyRate;
        const principalPayment = monthlyPaymentRequired - interestCharge;
        totalInterestPaid += interestCharge;
        remainingBalance -= principalPayment;
        totalAmountPaid += monthlyPaymentRequired;
      }
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthsToPayoff);

    setResults({
      monthsToPayoff,
      yearsToPayoff: monthsToPayoff / 12,
      totalInterestPaid,
      totalAmountPaid,
      monthlyPaymentRequired,
      payoffDate
    });

    setHasCalculated(true);
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
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const setPresetPayment = (percentage: number) => {
    const balanceNum = parseFloat(balance) || 5000;
    const rateNum = parseFloat(interestRate) || 18.5;
    const monthlyRate = rateNum / 100 / 12;
    const interestAmount = balanceNum * monthlyRate;
    const payment = interestAmount + (balanceNum * percentage / 100);
    setMonthlyPayment(payment.toFixed(2));
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
            <CreditCard className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Credit Card Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your credit card payoff timeline and total interest costs. See how different payment strategies can save you thousands of dollars.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="border-2 rounded-2xl shadow-lg lg:col-span-1 h-fit sticky top-24">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Balance Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Credit Card Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="pl-7"
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Interest Rate Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Interest Rate (APR)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-7"
                    placeholder="18.5"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Payment Strategy
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "amount"}
                      onChange={() => setPaymentMethod("amount")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-700">Fixed Monthly Payment</div>
                      <div className="text-sm text-slate-500">Pay a specific amount each month</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "timeframe"}
                      onChange={() => setPaymentMethod("timeframe")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-700">Target Payoff Date</div>
                      <div className="text-sm text-slate-500">Pay off within a specific timeframe</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Inputs */}
              {paymentMethod === "amount" ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Payment
                  </label>
                  <div className="relative mb-3">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                      className="pl-7"
                      placeholder="150"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetPayment(1)}
                      className="text-xs"
                    >
                      Interest + 1%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetPayment(2)}
                      className="text-xs"
                    >
                      2%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetPayment(3)}
                      className="text-xs"
                    >
                      3%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetPayment(4)}
                      className="text-xs"
                    >
                      4%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPresetPayment(5)}
                      className="text-xs"
                    >
                      5%
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Desired Payoff Timeframe
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Years</label>
                      <Input
                        type="number"
                        value={payoffYears}
                        onChange={(e) => setPayoffYears(e.target.value)}
                        placeholder="3"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Months</label>
                      <Input
                        type="number"
                        value={payoffMonths}
                        onChange={(e) => setPayoffMonths(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <Button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Payoff
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {paymentMethod === "amount" ? "Time to Payoff" : "Required Monthly Payment"}
                      </h3>
                    </div>
                    {paymentMethod === "amount" ? (
                      <>
                        <p className="text-5xl font-bold mb-2">
                          {results.yearsToPayoff >= 1
                            ? `${Math.floor(results.yearsToPayoff)} ${Math.floor(results.yearsToPayoff) === 1 ? 'year' : 'years'}`
                            : `${results.monthsToPayoff} ${results.monthsToPayoff === 1 ? 'month' : 'months'}`}
                        </p>
                        {results.yearsToPayoff >= 1 && results.monthsToPayoff % 12 !== 0 && (
                          <p className="text-emerald-100 text-lg">
                            + {results.monthsToPayoff % 12} {results.monthsToPayoff % 12 === 1 ? 'month' : 'months'}
                          </p>
                        )}
                        <p className="text-emerald-100 mt-2">
                          Debt-free by {formatDate(results.payoffDate)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-5xl font-bold mb-2">
                          {formatCurrency(results.monthlyPaymentRequired || 0)}
                        </p>
                        <p className="text-emerald-100">per month</p>
                      </>
                    )}
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Interest */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Total Interest Paid
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatCurrency(results.totalInterestPaid)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        {((results.totalInterestPaid / parseFloat(balance)) * 100).toFixed(1)}% of original balance
                      </p>
                    </CardContent>
                  </Card>

                  {/* Total Amount */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Amount Paid
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-slate-800">
                        {formatCurrency(results.totalAmountPaid)}
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Principal + Interest over {results.monthsToPayoff} payments
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Breakdown */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <Info className="h-5 w-5 text-emerald-600" />
                      Payment Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Original Balance</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(parseFloat(balance))}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Interest Rate (APR)</span>
                        <span className="font-semibold text-slate-800">{parseFloat(interestRate).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Monthly Payment</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.monthlyPaymentRequired || parseFloat(monthlyPayment))}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Number of Payments</span>
                        <span className="font-semibold text-slate-800">{results.monthsToPayoff} months</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-700 font-medium">Total Cost</span>
                        <span className="font-bold text-emerald-600 text-xl">
                          {formatCurrency(results.totalAmountPaid)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Savings Tip */}
                {results.totalInterestPaid > 500 && (
                  <Card className="border-2 border-amber-200 bg-amber-50 rounded-2xl shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-amber-900 mb-2">Money-Saving Tip</h4>
                          <p className="text-amber-800 text-sm leading-relaxed">
                            You're paying <strong>{formatCurrency(results.totalInterestPaid)}</strong> in interest charges.
                            Consider increasing your monthly payment or transferring to a lower-rate card to save significantly
                            on interest costs and pay off your debt faster.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <CreditCard className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  {hasCalculated
                    ? "Your monthly payment is too low to pay off this balance. Please increase your payment amount."
                    : "Enter your credit card details and click Calculate to see your payoff plan"}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Credit Card Debt</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Credit Cards Really Work</h3>
                <p>
                  Credit cards offer incredible flexibility when it comes to borrowing money, but they come with a catch—interest rates
                  that can quickly spiral out of control if you're not careful. Unlike traditional loans where you make fixed payments
                  over a set period, credit cards give you the freedom to borrow as much as you want (up to your limit) and pay it back
                  on your own schedule. That flexibility sounds great until you realize that carrying a balance means you're getting
                  charged interest every single month on whatever you owe.
                </p>
                <p className="mt-4">
                  Most credit cards calculate interest using what's called the Average Daily Balance method. Here's how it works: your
                  card issuer tracks your balance every single day during your billing cycle, adds up all those daily balances, and
                  divides by the number of days in the cycle to get your average balance. Then they multiply that average by your daily
                  periodic rate (which is just your annual percentage rate divided by 365) and the number of days in your billing cycle.
                  The result? Your monthly interest charge.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Minimum Payments Keep You Trapped</h3>
                <p>
                  Here's something most people don't realize: if you only make the minimum payment on your credit card each month,
                  you could be paying off that debt for decades. Credit card companies typically set minimum payments somewhere around
                  1-3% of your balance, or a fixed dollar amount like $15 or $25—whichever is greater. Sounds reasonable, right? Wrong.
                </p>
                <p className="mt-4">
                  Let's say you've got a $5,000 balance on a card with an 18% APR. If you're making the typical minimum payment of
                  about 2% of your balance each month, you'll be stuck paying that card off for over 30 years, and you'll end up
                  paying more than $8,000 in interest alone. That's more than your original balance! The problem is that when your
                  payment is so small, most of it goes toward covering the monthly interest charge, leaving very little to actually
                  reduce your principal balance.
                </p>
                <p className="mt-4">
                  That's exactly why this calculator is so valuable. It shows you the real cost of different payment strategies. When
                  you bump up your monthly payment even a little bit—say from $100 to $150—you'll see dramatic differences in how
                  quickly you can become debt-free and how much interest you'll save.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding APR and Interest Rates</h3>
                <p>
                  Your credit card's Annual Percentage Rate (APR) is the yearly interest rate you're charged on any balance you carry.
                  But here's the thing—credit cards don't actually charge interest annually. They charge it monthly, using what's called
                  a daily periodic rate. To get your daily rate, card issuers divide your APR by 365 days. So if you have an 18% APR,
                  your daily rate is roughly 0.0493%.
                </p>
                <p className="mt-4">
                  That might not sound like much, but it adds up fast. Every day you carry a balance, you're accruing interest. And
                  because of the way compound interest works, you're not just paying interest on your original purchases—you're paying
                  interest on your interest. It's a snowball effect that can keep you stuck in debt far longer than you'd expect.
                </p>
                <p className="mt-4">
                  Different types of transactions can have different APRs too. Your regular purchases might have one rate, balance
                  transfers another, and cash advances yet another (usually the highest). Always check your card's terms to understand
                  exactly what you're being charged for different types of transactions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Strategies to Pay Off Credit Card Debt</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Avalanche Method</h4>
                <p>
                  If you've got multiple credit cards, the avalanche method can save you the most money in interest. Here's how it works:
                  you make minimum payments on all your cards except the one with the highest interest rate. On that card, you throw every
                  extra dollar you can afford. Once that high-rate card is paid off, you move to the card with the next-highest rate, and
                  so on. Mathematically, this approach minimizes the total interest you'll pay across all your cards.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Snowball Method</h4>
                <p>
                  The snowball method takes a different approach—instead of focusing on interest rates, you target the card with the
                  smallest balance first. Make minimum payments on everything else, but attack that smallest balance with everything you've
                  got. Once it's gone, take that payment amount and add it to the minimum on your next-smallest card. The psychological wins
                  of knocking out entire balances can be incredibly motivating, even if it doesn't save quite as much money as the avalanche
                  method.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Balance Transfers</h4>
                <p>
                  Balance transfer cards can be powerful tools if used correctly. Many cards offer 0% APR promotional periods—sometimes
                  12, 15, or even 18 months—on transferred balances. If you can transfer your high-interest debt to one of these cards
                  and pay it off during the promotional period, you'll save a ton on interest. Just watch out for balance transfer fees
                  (typically 3-5% of the amount transferred) and make sure you have a realistic plan to pay off the balance before the
                  promotional rate expires.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Automated Payments</h4>
                <p>
                  Setting up automatic payments is one of the simplest ways to ensure you never miss a payment (which can trigger penalty
                  APRs as high as 29.99%) and to maintain consistent progress toward becoming debt-free. Even if you can only automate the
                  minimum payment, it's better than risking late fees and credit score damage. But if possible, automate a fixed amount
                  that's higher than the minimum—something you can comfortably afford every month that will actually make a dent in your
                  principal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The True Cost of Cash Advances</h3>
                <p>
                  If there's one thing you should avoid with credit cards, it's cash advances. When you withdraw cash from an ATM using
                  your credit card or get a cash advance check from your card issuer, you're walking into a financial trap. Cash advances
                  typically come with three major costs that make them incredibly expensive.
                </p>
                <p className="mt-4">
                  First, there's usually an immediate fee—typically 3-5% of the advance amount or a minimum like $10, whichever is greater.
                  So if you take out $500, you might pay a $25 fee right off the bat. Second, cash advances usually carry a higher APR than
                  regular purchases—often 25% or more. Third, and this is the kicker—there's no grace period on cash advances. Interest
                  starts accruing immediately from the day you take the money, not at the end of your billing cycle like with purchases.
                </p>
                <p className="mt-4">
                  Add it all up, and you could easily pay 30% or more in effective interest on cash advances when you factor in fees and
                  immediate interest accrual. Unless you're in a genuine emergency with no other options, cash advances should be avoided
                  at all costs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Credit Cards Affect Your Credit Score</h3>
                <p>
                  Your credit card usage plays a massive role in determining your credit score, which affects everything from getting
                  approved for a mortgage to the interest rate you'll pay on a car loan. Two factors are especially important: payment
                  history and credit utilization.
                </p>
                <p className="mt-4">
                  Payment history makes up about 35% of your FICO credit score—it's the single biggest factor. Every time you make an
                  on-time payment, it helps your score. Every time you're late, it hurts. Just one payment that's 30 days or more overdue
                  can stay on your credit report for seven years and significantly damage your score.
                </p>
                <p className="mt-4">
                  Credit utilization—the percentage of your available credit you're actually using—accounts for about 30% of your score.
                  If you have a $10,000 credit limit and you're carrying a $9,000 balance, your utilization is 90%, which is terrible for
                  your score. Credit experts generally recommend keeping your utilization below 30%, and ideally below 10%. So paying down
                  your credit card debt doesn't just save you money on interest—it can also boost your credit score, which saves you money
                  on future loans.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Credit Cards Explained</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Cashback Cards</h4>
                <p>
                  Cashback cards give you money back on purchases—typically 1-2% on everything, with higher rates (3-5%) on specific
                  categories like gas, groceries, or dining. These work great if you pay off your balance every month, turning your
                  everyday spending into actual cash rewards. But if you carry a balance, the interest you're paying will quickly wipe
                  out any cashback you're earning.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Travel Rewards Cards</h4>
                <p>
                  Travel cards let you earn points or miles for flights, hotels, and other travel expenses. Many come with valuable perks
                  like airport lounge access, free checked bags, or travel insurance. The best ones can offer tremendous value—some people
                  earn enough points for free international flights worth thousands of dollars. But these cards often come with annual fees
                  ($95-$550 or more), so they only make sense if you travel regularly and can take advantage of the benefits.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Balance Transfer Cards</h4>
                <p>
                  These cards are specifically designed to help you pay off existing credit card debt. They offer promotional 0% APR periods
                  (usually 12-21 months) on transferred balances, giving you a window to pay down debt without accruing new interest. The
                  key is having a realistic plan to pay off the balance before the promotional period ends, or you'll be right back where
                  you started—possibly with an even higher interest rate.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Secured Cards</h4>
                <p>
                  If you have poor credit or no credit history, secured cards can help you build or rebuild your credit. You put down a
                  security deposit (typically $200-$500) which becomes your credit limit. As long as you use the card responsibly and make
                  on-time payments, you'll build positive credit history. After 12-18 months of responsible use, many secured cards will
                  graduate you to a regular unsecured card and return your deposit.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Store Cards</h4>
                <p>
                  Retail store cards can only be used at specific retailers and their partners. They often come with attractive initial
                  discounts—like 20% off your first purchase—but they typically carry much higher interest rates than general-purpose
                  cards (often 25-30% APR). Unless you're absolutely certain you'll pay off the balance every month, store cards usually
                  aren't worth it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Benefits of Being Debt-Free</h3>
                <p>
                  Getting out of credit card debt isn't just about the money you'll save on interest—though that alone can be life-changing.
                  It's about the freedom and peace of mind that comes with not owing anyone anything. When you're debt-free, every dollar
                  you earn is yours to keep and use as you see fit, rather than sending it off to credit card companies each month.
                </p>
                <p className="mt-4">
                  Think about what you could do with the money you're currently putting toward debt payments. You could build an emergency
                  fund, invest for retirement, save for a down payment on a house, or finally take that vacation you've been putting off.
                  The average American household with credit card debt carries around $6,000 in balances. At 18% APR with minimum payments,
                  that could mean paying $200+ every month for years. Imagine redirecting that $200 per month into investments that could
                  actually grow your wealth instead of enriching credit card companies.
                </p>
                <p className="mt-4">
                  Beyond the financial benefits, there's the emotional relief. Credit card debt can feel like a weight constantly pressing
                  down on you. It affects your sleep, your relationships, your stress levels, and your overall quality of life. Breaking
                  free from that weight is genuinely liberating, and it's absolutely achievable with a solid plan and commitment to following
                  through.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Credit Card Mistakes to Avoid</h3>
                <p>
                  Making only minimum payments is probably the biggest mistake people make with credit cards. As we discussed earlier,
                  minimum payments are specifically designed to keep you in debt as long as possible. Even bumping your payment up by
                  $25-50 per month can cut years off your payoff timeline and save you thousands in interest.
                </p>
                <p className="mt-4">
                  Another common mistake is closing old credit card accounts. It seems logical—you don't need the card anymore, so why
                  keep it open? But closing accounts can actually hurt your credit score in two ways. First, it reduces your total
                  available credit, which increases your credit utilization ratio. Second, it can reduce the average age of your credit
                  accounts, which is another factor in your credit score. Unless a card has a high annual fee you can't justify, it's
                  usually better to keep it open and just stop using it.
                </p>
                <p className="mt-4">
                  Finally, too many people use credit cards to finance a lifestyle they can't actually afford. Credit cards should be
                  a tool for convenience and rewards, not a way to buy things you couldn't otherwise afford. If you find yourself
                  regularly charging more than you can pay off each month, that's a red flag that you're living beyond your means. The
                  solution isn't a higher credit limit—it's a realistic budget and some tough choices about your spending.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This credit card calculator gives you two powerful ways to plan your debt payoff. If you know how much you can afford
                  to pay each month, enter that amount and the calculator will show you exactly when you'll be debt-free and how much
                  total interest you'll pay. This is incredibly useful for understanding the real cost of your current payment strategy.
                </p>
                <p className="mt-4">
                  Alternatively, if you have a target payoff date in mind—maybe you want to be debt-free in two years, or before a major
                  life event like buying a house or getting married—you can enter that timeframe and the calculator will tell you exactly
                  how much you need to pay each month to hit that goal. This approach lets you work backward from your goal to create a
                  realistic payment plan.
                </p>
                <p className="mt-4">
                  Try running multiple scenarios. See what happens if you increase your monthly payment by $50 or $100. Look at the
                  difference in total interest paid between a 3-year payoff and a 5-year payoff. Sometimes seeing the numbers in black
                  and white—realizing you could save $2,000 in interest by adding just $50 to your monthly payment—is the motivation you
                  need to make real changes to your spending and payment strategy.
                </p>
                <p className="mt-4">
                  Remember, the calculator uses industry-standard formulas based on the Average Daily Balance method that most credit
                  cards use. Your actual results might vary slightly depending on your card's specific terms, when you make payments
                  during the billing cycle, and whether you make any new purchases. But the calculator gives you a solid, accurate
                  estimate that you can use for planning and decision-making.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-lg mt-8">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Quick Tips for Success
                </h4>
                <ul className="space-y-2 text-emerald-800 text-sm">
                  <li>• Always pay more than the minimum, even if it's just $10 or $20 extra</li>
                  <li>• Set up automatic payments to ensure you never miss a due date</li>
                  <li>• Stop making new charges on cards you're trying to pay off</li>
                  <li>• Consider consolidating high-interest debt with a balance transfer card</li>
                  <li>• Use windfalls (tax refunds, bonuses, gifts) to make extra payments</li>
                  <li>• Track your progress monthly to stay motivated</li>
                  <li>• Once a card is paid off, redirect that payment to the next card</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Calculators */}
        <Card className="mt-8 border-2 rounded-2xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
            <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/loan" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-600">Loan Calculator</h4>
                <p className="text-sm text-slate-600">Calculate payments for personal loans</p>
              </Link>
              <Link href="/mortgage" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-600">Mortgage Calculator</h4>
                <p className="text-sm text-slate-600">Estimate home loan payments</p>
              </Link>
              <Link href="/interest" className="p-4 border-2 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-600">Interest Calculator</h4>
                <p className="text-sm text-slate-600">Calculate interest on savings or debt</p>
              </Link>
            </div>
          </CardContent>
        </Card>
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
