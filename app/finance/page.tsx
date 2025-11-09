"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Calendar, Percent } from "lucide-react";

interface FinanceResults {
  calculatedValue: number;
  totalPayments: number;
  totalInterest: number;
  finalBalance: number;
}

type CalculationMode = 'FV' | 'PV' | 'PMT' | 'N' | 'IY';
type PaymentTiming = 'end' | 'beginning';

export default function FinanceCalculator() {
  // Calculation mode
  const [mode, setMode] = useState<CalculationMode>('FV');

  // Input states
  const [n, setN] = useState<string>("120"); // 10 years * 12 months
  const [iy, setIY] = useState<string>("6"); // 6% annual interest
  const [pv, setPV] = useState<string>("100000"); // $100,000 initial investment
  const [pmt, setPMT] = useState<string>("500"); // $500 monthly contribution
  const [py, setPY] = useState<string>("12"); // Monthly compounding
  const [cy, setCY] = useState<string>("12"); // Monthly payments
  const [pmtTiming, setPmtTiming] = useState<PaymentTiming>('end');

  const [results, setResults] = useState<FinanceResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Calculate based on selected mode
  const calculate = () => {
    // Parse inputs with defaults
    const numPeriods = parseFloat(n) || 120;
    const annualRate = parseFloat(iy) || 6;
    const presentValue = parseFloat(pv) || 100000;
    const payment = parseFloat(pmt) || 500;
    const periodsPerYear = parseFloat(py) || 12;
    const compoundingPerYear = parseFloat(cy) || 12;

    // Calculate periodic interest rate
    const periodicRate = (annualRate / 100) / periodsPerYear;

    let calculatedValue = 0;
    let totalPayments = 0;
    let totalInterest = 0;
    let finalBalance = 0;

    const adjustmentFactor = pmtTiming === 'beginning' ? (1 + periodicRate) : 1;

    switch (mode) {
      case 'FV': {
        // Future Value calculation
        // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r] * adjustment
        const pvFuture = presentValue * Math.pow(1 + periodicRate, numPeriods);
        const pmtFuture = payment * (((Math.pow(1 + periodicRate, numPeriods) - 1) / periodicRate)) * adjustmentFactor;

        calculatedValue = -(pvFuture + pmtFuture);
        totalPayments = payment * numPeriods;
        finalBalance = calculatedValue;
        totalInterest = calculatedValue - presentValue - totalPayments;
        break;
      }

      case 'PV': {
        // Present Value calculation
        // PV = FV / (1 + r)^n - PMT * [((1 + r)^n - 1) / r] / (1 + r)^n * adjustment
        const fvValue = parseFloat(pv) || 0;
        const pvFromFV = fvValue / Math.pow(1 + periodicRate, numPeriods);
        const pvFromPMT = payment * (((Math.pow(1 + periodicRate, numPeriods) - 1) / periodicRate)) / Math.pow(1 + periodicRate, numPeriods) * adjustmentFactor;

        calculatedValue = -(pvFromFV - pvFromPMT);
        totalPayments = payment * numPeriods;
        finalBalance = fvValue;
        totalInterest = finalBalance - Math.abs(calculatedValue) - totalPayments;
        break;
      }

      case 'PMT': {
        // Payment calculation
        // PMT = [r * (PV * (1 + r)^n + FV)] / [((1 + r)^n - 1)] / adjustment
        const fvValue = parseFloat(pv) || 0;
        const numerator = periodicRate * (presentValue * Math.pow(1 + periodicRate, numPeriods) + fvValue);
        const denominator = (Math.pow(1 + periodicRate, numPeriods) - 1) * adjustmentFactor;

        calculatedValue = -(numerator / denominator);
        totalPayments = calculatedValue * numPeriods;
        const pvFuture = presentValue * Math.pow(1 + periodicRate, numPeriods);
        const pmtFuture = calculatedValue * (((Math.pow(1 + periodicRate, numPeriods) - 1) / periodicRate)) * adjustmentFactor;
        finalBalance = -(pvFuture + pmtFuture);
        totalInterest = finalBalance - presentValue - totalPayments;
        break;
      }

      case 'N': {
        // Number of periods calculation (using logarithms)
        // n = ln[(PMT - FV * r) / (PMT + PV * r)] / ln(1 + r)
        const fvValue = parseFloat(pv) || 0;
        const adjustedPmt = payment * adjustmentFactor;

        if (periodicRate === 0) {
          calculatedValue = -(presentValue + fvValue) / adjustedPmt;
        } else {
          const numerator = Math.log((adjustedPmt - fvValue * periodicRate) / (adjustedPmt + presentValue * periodicRate));
          const denominator = Math.log(1 + periodicRate);
          calculatedValue = numerator / denominator;
        }

        totalPayments = payment * calculatedValue;
        const pvFuture = presentValue * Math.pow(1 + periodicRate, calculatedValue);
        const pmtFuture = payment * (((Math.pow(1 + periodicRate, calculatedValue) - 1) / periodicRate)) * adjustmentFactor;
        finalBalance = -(pvFuture + pmtFuture);
        totalInterest = finalBalance - presentValue - totalPayments;
        break;
      }

      case 'IY': {
        // Interest rate calculation (using Newton-Raphson approximation)
        // This is complex, so we'll use an iterative approach
        const fvValue = parseFloat(pv) || 0;
        let guess = 0.05; // Start with 5% as initial guess
        const tolerance = 0.000001;
        const maxIterations = 100;

        for (let i = 0; i < maxIterations; i++) {
          const adjustmentGuess = pmtTiming === 'beginning' ? (1 + guess) : 1;
          const pvCalc = presentValue * Math.pow(1 + guess, numPeriods);
          const pmtCalc = payment * (((Math.pow(1 + guess, numPeriods) - 1) / guess)) * adjustmentGuess;
          const fvCalc = -(pvCalc + pmtCalc);

          const error = fvCalc - fvValue;

          if (Math.abs(error) < tolerance) break;

          // Derivative approximation for Newton-Raphson
          const delta = 0.00001;
          const pvCalc2 = presentValue * Math.pow(1 + guess + delta, numPeriods);
          const pmtCalc2 = payment * (((Math.pow(1 + guess + delta, numPeriods) - 1) / (guess + delta))) * adjustmentGuess;
          const fvCalc2 = -(pvCalc2 + pmtCalc2);
          const derivative = (fvCalc2 - fvCalc) / delta;

          guess = guess - error / derivative;
        }

        calculatedValue = guess * periodsPerYear * 100; // Convert to annual percentage
        totalPayments = payment * numPeriods;
        const pvFuture = presentValue * Math.pow(1 + guess, numPeriods);
        const pmtFuture = payment * (((Math.pow(1 + guess, numPeriods) - 1) / guess)) * adjustmentFactor;
        finalBalance = -(pvFuture + pmtFuture);
        totalInterest = finalBalance - presentValue - totalPayments;
        break;
      }
    }

    setResults({
      calculatedValue,
      totalPayments,
      totalInterest,
      finalBalance
    });

    setHasCalculated(true);
  };

  // Auto-calculate on page load and when mode changes
  useEffect(() => {
    calculate();
  }, [mode]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(value));
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getModeLabel = (modeType: CalculationMode) => {
    const labels = {
      'FV': 'Future Value',
      'PV': 'Present Value',
      'PMT': 'Payment',
      'N': 'Number of Periods',
      'IY': 'Interest Rate'
    };
    return labels[modeType];
  };

  const getResultLabel = () => {
    const labels = {
      'FV': 'Future Value',
      'PV': 'Present Value',
      'PMT': 'Monthly Payment',
      'N': 'Number of Periods',
      'IY': 'Annual Interest Rate'
    };
    return labels[mode];
  };

  const formatResultValue = () => {
    if (!results) return '$0.00';

    switch (mode) {
      case 'FV':
      case 'PV':
      case 'PMT':
        return formatCurrency(results.calculatedValue);
      case 'N':
        return `${formatNumber(results.calculatedValue, 0)} periods`;
      case 'IY':
        return `${formatNumber(results.calculatedValue, 2)}%`;
      default:
        return formatCurrency(results.calculatedValue);
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Finance Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate time value of money problems including Present Value, Future Value, Payments, Interest Rates, and Number of Periods
          </p>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Select Calculation Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(['FV', 'PV', 'PMT', 'N', 'IY'] as CalculationMode[]).map((modeType) => (
                  <Button
                    key={modeType}
                    onClick={() => setMode(modeType)}
                    variant={mode === modeType ? 'default' : 'outline'}
                    className={mode === modeType
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
                      : 'hover:border-emerald-400'
                    }
                  >
                    {getModeLabel(modeType)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Input Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* N - Number of Periods */}
                {mode !== 'N' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Number of Periods (N)
                    </label>
                    <Input
                      type="number"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                      placeholder="120"
                    />
                  </div>
                )}

                {/* I/Y - Interest Rate */}
                {mode !== 'IY' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Annual Interest Rate (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={iy}
                        onChange={(e) => setIY(e.target.value)}
                        placeholder="6"
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                  </div>
                )}

                {/* PV - Present Value */}
                {mode !== 'PV' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Present Value (PV)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={pv}
                        onChange={(e) => setPV(e.target.value)}
                        placeholder="100000"
                        className="pl-8"
                      />
                    </div>
                  </div>
                )}

                {/* PMT - Payment */}
                {mode !== 'PMT' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Payment (PMT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={pmt}
                        onChange={(e) => setPMT(e.target.value)}
                        placeholder="500"
                        className="pl-8"
                      />
                    </div>
                  </div>
                )}

                {/* P/Y - Periods Per Year */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Periods Per Year (P/Y)
                  </label>
                  <Input
                    type="number"
                    value={py}
                    onChange={(e) => setPY(e.target.value)}
                    placeholder="12"
                  />
                  <p className="text-xs text-slate-500 mt-1">12 = Monthly, 4 = Quarterly, 1 = Annually</p>
                </div>

                {/* C/Y - Compounding Per Year */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compounding Per Year (C/Y)
                  </label>
                  <Input
                    type="number"
                    value={cy}
                    onChange={(e) => setCY(e.target.value)}
                    placeholder="12"
                  />
                </div>

                {/* Payment Timing */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Payment Timing
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setPmtTiming('end')}
                      variant={pmtTiming === 'end' ? 'default' : 'outline'}
                      className={pmtTiming === 'end' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                    >
                      End of Period
                    </Button>
                    <Button
                      onClick={() => setPmtTiming('beginning')}
                      variant={pmtTiming === 'beginning' ? 'default' : 'outline'}
                      className={pmtTiming === 'beginning' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : ''}
                    >
                      Beginning
                    </Button>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate {getModeLabel(mode)}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">{getResultLabel()}</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatResultValue()}</p>
                    <p className="text-emerald-100">Calculated based on your inputs</p>
                  </div>
                </Card>

                {/* Financial Summary */}
                <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-slate-600">Total Payments</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.totalPayments)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-slate-600">Total Interest</span>
                      <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-600">Final Balance</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.finalBalance)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Insights */}
                <Card className="border-2 rounded-2xl shadow-md bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Percent className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Time Value of Money</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {mode === 'FV' && 'Your initial investment combined with regular contributions will grow to the future value shown through the power of compound interest.'}
                          {mode === 'PV' && 'This present value represents what you need to invest today to reach your future goal, considering the interest rate and regular payments.'}
                          {mode === 'PMT' && 'This is the periodic payment required to achieve your financial goal based on the present value, future value, and interest rate.'}
                          {mode === 'N' && 'This shows how many periods it will take to reach your financial goal based on your current inputs and payment schedule.'}
                          {mode === 'IY' && 'This is the annual interest rate needed to achieve your financial goal given the present value, payments, and time period.'}
                        </p>
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
                  Enter your financial parameters and click Calculate to see results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding the Time Value of Money</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Makes Money Worth More Today?</h3>
                <p>
                  Here's something that might seem obvious once you think about it: a dollar in your pocket right now is worth more than a dollar promised to you five years from now. Why? Because money you have today can be put to work immediately. You could invest it, earn interest on it, or use it to generate income. That's the fundamental principle behind the time value of money, and it drives virtually every financial decision we make.
                </p>
                <p className="mt-4">
                  Think of it this way—if someone offered you $1,000 today or $1,000 in ten years, you'd probably take it now without hesitation. But what if they offered you $1,000 today or $1,500 in ten years? Suddenly the choice gets interesting. That's where financial calculations come in handy. They help you compare money across different time periods on an apples-to-apples basis.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Five Core Variables</h4>
                <p>
                  Every time value of money calculation involves five key variables, and if you know any four of them, you can calculate the fifth. These aren't just abstract concepts—they represent real financial decisions you make all the time.
                </p>

                <p className="mt-3">
                  <strong>Present Value (PV)</strong> represents what money is worth right now. This could be your initial investment, the amount you're borrowing, or the current value of an asset. When you're buying a house, the loan amount is the present value. When you're investing for retirement, whatever you put in today is the present value.
                </p>

                <p className="mt-3">
                  <strong>Future Value (FV)</strong> is what that money will grow to (or what you'll owe) at some point down the road. If you invest $10,000 today and it grows to $18,000 in fifteen years, that $18,000 is the future value. For loans, it's typically zero—you've paid everything back by the end.
                </p>

                <p className="mt-3">
                  <strong>Payment (PMT)</strong> captures those regular contributions or withdrawals you make along the way. This could be monthly mortgage payments, quarterly investment contributions, or annual withdrawals from a retirement account. The timing matters too—payments made at the beginning of each period actually have more time to grow than those made at the end.
                </p>

                <p className="mt-3">
                  <strong>Interest Rate (I/Y)</strong> determines how fast your money grows or how much you pay to borrow. This gets expressed as an annual percentage, but the calculator converts it to match your payment frequency. A 6% annual rate becomes 0.5% per month when you're making monthly payments. That conversion is crucial for accurate calculations.
                </p>

                <p className="mt-3">
                  <strong>Number of Periods (N)</strong> simply counts how many payment or compounding periods occur. If you're making monthly payments for 10 years, that's 120 periods. The more periods you have, the more opportunities for interest to compound—which can work dramatically in your favor for investments or against you for loans.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Compound Interest Changes Everything</h3>
                <p>
                  Let's talk about what makes these calculations so powerful: compound interest. When you earn interest on money, that interest gets added to your principal. Then, in the next period, you earn interest on the new, larger amount. This creates a snowball effect that can be absolutely transformative over long time periods.
                </p>

                <p className="mt-4">
                  Consider a simple example. You invest $100 at 10% annual interest. After one year, you have $110. That makes sense—you earned $10 in interest. But in year two, you don't just earn another $10. You earn 10% on $110, which is $11. Now you have $121. In year three, you earn $12.10, bringing you to $133.10. Notice how each year's interest payment gets bigger? That's compound interest at work.
                </p>

                <p className="mt-4">
                  Now imagine that same principle applied to monthly contributions over 30 years. The early contributions have three decades to compound. The ones you make halfway through still get 15 years of growth. Even contributions near the end benefit from some compounding. This is why starting early with retirement investing makes such an enormous difference—those extra years of compounding can literally be worth hundreds of thousands of dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Compounding Frequency Matters</h4>
                <p>
                  You might notice the calculator asks about compounding frequency separately from payment frequency. That's because they don't always match up. Your bank might compound interest daily even though you make monthly deposits. A loan might compound monthly even though you make biweekly payments.
                </p>

                <p className="mt-3">
                  More frequent compounding works in your favor when you're earning interest and against you when you're paying it. The difference between annual and daily compounding on a savings account isn't huge, but over decades, it adds up. On loans, it means a tiny bit more of each payment goes to interest rather than principal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World Applications</h3>
                <p>
                  These calculations aren't just academic exercises—they're the foundation for countless financial decisions. Understanding how to use them gives you power over your financial future.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Planning for Retirement</h4>
                <p>
                  Retirement planning is perhaps the most common use case. You might start with a question like: "If I'm 30 years old, have $20,000 saved, and can contribute $500 monthly, how much will I have at 65?" You'd enter $20,000 as present value, $500 as payment, assume some reasonable rate of return (maybe 7%), set the number of periods to 420 (35 years × 12 months), and calculate the future value.
                </p>

                <p className="mt-3">
                  The calculator might show you'll accumulate around $1.1 million. But here's where it gets interesting—what if you could bump those contributions to $750 per month? Or what if you started five years earlier? Running these scenarios shows you exactly what different choices cost or save you in real dollars.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Evaluating Investment Opportunities</h4>
                <p>
                  Suppose someone offers to sell you a rental property. They claim it generates $1,500 per month in net income and will be worth $400,000 when you sell it in 20 years. They want $300,000 for it today. Is that a good deal?
                </p>

                <p className="mt-3">
                  You can use the calculator to find out what rate of return that represents. Enter -$300,000 as present value (negative because you're paying it out), $1,500 as payment, $400,000 as future value (positive because you receive it), and 240 periods (20 years monthly). Calculate the interest rate, and you'll see this investment would yield around 7.5% annually. Whether that's good depends on your alternatives and risk tolerance, but now you can make an informed comparison.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Understanding Loan Payments</h4>
                <p>
                  When you take out a loan, the calculation determines your payment amount. The bank knows the present value (how much you're borrowing), the interest rate (what they're charging), and the term (how many payments). They calculate the payment amount that will bring the loan balance to zero over that period.
                </p>

                <p className="mt-3">
                  For a $250,000 mortgage at 6.5% over 30 years, the calculator shows monthly payments of about $1,580. Over those 360 payments, you'll pay nearly $569,000 total—more than double the original loan amount. That's why making extra principal payments can save you so much money. Each dollar of extra payment reduces the amount that compounds against you for potentially decades.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Comparing Different Financial Products</h4>
                <p>
                  Financial institutions love to make their products seem complicated, but these calculations cut through the marketing. If Bank A offers 5.5% compounded monthly and Bank B offers 5.6% compounded quarterly, which is better? Run both scenarios with the same present value and time period. The future values will tell you exactly which comes out ahead.
                </p>

                <p className="mt-3">
                  Same goes for comparing a lump sum investment versus regular contributions. Would you rather inherit $50,000 today or receive $500 per month for the next 15 years? The calculator gives you the objective answer based on whatever interest rate you could earn.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Payment Timing: Beginning vs. End of Period</h3>
                <p>
                  This might seem like a minor detail, but payment timing can make a meaningful difference, especially over long periods. Most loans assume payments at the end of each period—you use the money for a month, then pay for it. Most investments, though, work better when you contribute at the beginning of each period.
                </p>

                <p className="mt-4">
                  Think about it: if you contribute $1,000 at the beginning of January, it has the entire month to potentially earn returns. If you contribute on January 31st, it sits idle for that month. Over one month, the difference is tiny. Over 30 years of monthly contributions, beginning-of-period payments can result in thousands of dollars more growth.
                </p>

                <p className="mt-4">
                  For a concrete example, consider investing $500 monthly for 30 years at 7% annual return. With end-of-period payments, you'd accumulate about $566,000. Switch to beginning-of-period payments, and that jumps to approximately $569,000—an extra $3,000 just from timing. The effect is more pronounced at higher interest rates and longer time periods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Pitfalls and How to Avoid Them</h3>
                <p>
                  Even with a calculator doing the math, it's easy to make mistakes if you're not careful about your inputs. Here are the issues I see most often.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Mixing Up Signs</h4>
                <p>
                  Financial calculations use negative numbers for money going out and positive numbers for money coming in. If you're calculating a loan payment, the present value (loan amount) should typically be positive—you receive that money. The future value is usually zero or negative if there's a balloon payment. The calculator will show payments as negative because you're paying money out.
                </p>

                <p className="mt-3">
                  For investments, it's often the reverse. You put money in (negative present value and payments) to get money out later (positive future value). Getting these signs wrong will give you nonsensical results or error messages.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Mismatching Periods and Rates</h4>
                <p>
                  This is probably the single most common error. If you're making monthly payments, you need to convert years to months. A 30-year mortgage isn't 30 periods—it's 360. Similarly, make sure your interest rate matches your payment frequency. The calculator handles this conversion, but you need to input the annual rate and specify how many payments per year you're making.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Forgetting About Inflation</h4>
                <p>
                  These calculations show you nominal returns—what the numbers will actually say. But a million dollars thirty years from now won't buy what a million dollars buys today. If you're planning for long-term goals, you might want to use a "real" rate of return that accounts for inflation. If you expect 7% returns and 3% inflation, use 4% for more conservative planning.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Assuming Constant Returns</h4>
                <p>
                  The calculator assumes your interest rate stays constant, but real-world investments fluctuate. The stock market might average 7% over decades, but it rarely delivers exactly 7% in any given year. Some years it's up 20%, others it's down 15%. For rough planning, constant returns work fine. For precise retirement planning, you'd want to factor in volatility and sequence-of-returns risk.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Advanced Strategies and Insights</h3>
                <p>
                  Once you're comfortable with the basics, these calculations open up some sophisticated financial strategies. Let me share a few that can really move the needle on your financial outcomes.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The Power of Extra Payments</h4>
                <p>
                  On any loan, making extra principal payments has an outsized impact. Here's why: each extra dollar you pay goes entirely to principal, reducing the amount that compounds against you. You can calculate the effect by comparing two scenarios—one with your regular payment, another with an extra $100 or $200 per month.
                </p>

                <p className="mt-3">
                  On a $300,000 mortgage at 6% over 30 years, your base payment is about $1,799. Adding just $200 extra each month would pay off the loan in 23 years instead of 30, saving you over $60,000 in interest. That's the power of preventing interest from compounding on that extra $200 for potentially hundreds of months.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Arbitrage Opportunities</h4>
                <p>
                  Sometimes you can borrow at one rate and invest at a higher rate, making money on the difference. This sounds risky, and it absolutely can be, but there are conservative versions. If you have a mortgage at 3.5% and can reliably earn 7% in the stock market, you might be better off making minimum mortgage payments and investing the difference.
                </p>

                <p className="mt-3">
                  Calculate both scenarios: one where you pay extra on the mortgage, and one where you invest that money. Compare the final outcomes. Factor in that mortgage interest might be tax-deductible, making the effective rate even lower. Of course, investment returns aren't guaranteed like mortgage interest, so this involves accepting some risk for the potential of greater reward.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Finding Your Required Return</h4>
                <p>
                  Maybe you know you need $2 million for retirement, you have $100,000 saved, you can contribute $1,000 monthly, and you have 25 years until retirement. What rate of return do you need to achieve that goal? Calculate the interest rate, and the calculator might show you need about 6.8% annually.
                </p>

                <p className="mt-3">
                  That's useful information. Is 6.8% realistic for your investment strategy? If you're in conservative bonds yielding 4%, you know you need to either save more, work longer, or accept a lower retirement target. If you're in a diversified portfolio that historically averages 8%, you're probably on track. The calculation tells you whether your plan is feasible.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Present Value for Decision Making</h4>
                <p>
                  Present value calculations help you compare options that span different time periods. Should you take a job offering $80,000 per year for 5 years, or one offering $70,000 per year for 5 years plus a $50,000 bonus at the end? Convert everything to present value using a reasonable discount rate (maybe 5-7%), and suddenly you can compare them directly.
                </p>

                <p className="mt-3">
                  The same logic applies to legal settlements, lottery winnings (lump sum vs. annuity), pension options, and any other scenario where you're comparing money at different times. The present value tells you what everything is worth in today's dollars, making the comparison straightforward.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making These Calculations Work for You</h3>
                <p>
                  The real value in these tools isn't just getting one answer—it's exploring different scenarios. Maybe you're saving for a down payment on a house. Run the numbers with your current savings rate. Then try increasing it by 20%. See how much sooner you'd reach your goal. That might motivate you to cut some expenses or find additional income.
                </p>

                <p className="mt-4">
                  Or perhaps you're comparing whether to lease or buy a car. Calculate the present value of all the lease payments plus the residual value you'd need to buy it at the end. Compare that to the purchase price today. Which comes out better when you factor in the opportunity cost of the money?
                </p>

                <p className="mt-4">
                  The key is to play with the numbers. Change one variable at a time and watch how the others respond. That builds intuition about how money grows, how interest compounds, and where you can make the biggest impact on your financial outcomes. Over time, these calculations become second nature, and you'll find yourself automatically thinking in terms of present values, future values, and opportunity costs.
                </p>

                <p className="mt-4">
                  Remember that these are planning tools, not crystal balls. Interest rates fluctuate, markets go up and down, and life throws curveballs. But having a quantitative framework for making financial decisions beats guessing every time. Run the numbers, understand the trade-offs, and make informed choices. That's how you take control of your financial future.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate monthly mortgage payments</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate loan payments and terms</div>
                  </div>
                </Link>
                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-600">Project investment growth</div>
                  </div>
                </Link>
                <Link href="/interest" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <Percent className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Interest Calculator</div>
                    <div className="text-sm text-slate-600">Calculate simple and compound interest</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with precision for financial planning.
          </p>
        </div>
      </footer>
    </div>
  );
}
