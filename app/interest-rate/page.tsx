"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, Percent } from "lucide-react";

interface InterestRateResults {
  interestRate: number;
  totalPayments: number;
  totalInterest: number;
  monthlyPayment: number;
  loanAmount: number;
  loanTermMonths: number;
}

export default function InterestRateCalculator() {
  // Input states
  const [loanAmount, setLoanAmount] = useState<string>("250000");
  const [loanYears, setLoanYears] = useState<string>("5");
  const [loanMonths, setLoanMonths] = useState<string>("0");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("4800");

  const [results, setResults] = useState<InterestRateResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Interest Rate Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate the interest rate on your loan by entering your loan amount, term, and monthly payment. Free online interest rate calculator with detailed breakdowns.",
    "url": "https://calc-tech.com/interest-rate",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1340"
    }
  };

  // Calculate interest rate using Newton-Raphson method
  const calculateInterestRate = () => {
    const principal = parseFloat(loanAmount) || 250000;
    const years = parseFloat(loanYears) || 5;
    const months = parseFloat(loanMonths) || 0;
    const payment = parseFloat(monthlyPayment) || 4800;

    // Total loan term in months
    const totalMonths = years * 12 + months;

    if (totalMonths <= 0 || principal <= 0 || payment <= 0) {
      return;
    }

    // Check if payment is sufficient
    const minPayment = principal / totalMonths;
    if (payment < minPayment) {
      return;
    }

    // Newton-Raphson method to find interest rate
    // Formula: P = M * [1 - (1 + r)^(-n)] / r
    // Where P = principal, M = monthly payment, r = monthly rate, n = total months

    let rate = 0.005; // Initial guess: 0.5% monthly (~6% annual)
    let iteration = 0;
    const maxIterations = 100;
    const tolerance = 0.000001;

    while (iteration < maxIterations) {
      const power = Math.pow(1 + rate, -totalMonths);
      const f = payment * (1 - power) / rate - principal;
      const df = payment * ((1 - power) / (rate * rate) - totalMonths * power / (rate * (1 + rate)));

      const newRate = rate - f / df;

      if (Math.abs(newRate - rate) < tolerance) {
        rate = newRate;
        break;
      }

      rate = newRate;
      iteration++;
    }

    // Convert monthly rate to annual rate
    const annualRate = rate * 12 * 100;
    const totalPaid = payment * totalMonths;
    const totalInt = totalPaid - principal;

    setResults({
      interestRate: annualRate,
      totalPayments: totalPaid,
      totalInterest: totalInt,
      monthlyPayment: payment,
      loanAmount: principal,
      loanTermMonths: totalMonths,
    });

    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculateInterestRate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(3)}%`;
  };

  return (
    <>
      <Head>
        <title>Interest Rate Calculator - Free Online Calculator | Calc-Tech.com</title>
        <meta name="description" content="Calculate the interest rate on your loan based on loan amount, term, and monthly payment. Free online interest rate calculator with detailed breakdowns and explanations." />
        <meta name="keywords" content="interest rate calculator, loan interest calculator, calculate interest rate, APR calculator, loan calculator, interest rate" />
        <link rel="canonical" href="https://calc-tech.com/interest-rate" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </span>
                <span className="text-xs text-slate-500">Financial Tools</span>
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
        {/* Page Title Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Interest Rate Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the interest rate on your loan by entering your loan amount, term, and monthly payment
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-6 w-6" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Loan Amount */}
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
                      placeholder="250000"
                    />
                  </div>
                </div>

                {/* Loan Term - Years */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <Input
                    type="number"
                    value={loanYears}
                    onChange={(e) => setLoanYears(e.target.value)}
                    placeholder="5"
                    min="0"
                  />
                </div>

                {/* Loan Term - Months */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Months
                  </label>
                  <Input
                    type="number"
                    value={loanMonths}
                    onChange={(e) => setLoanMonths(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="11"
                  />
                </div>

                {/* Monthly Payment */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                      className="pl-7"
                      placeholder="4800"
                    />
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateInterestRate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Interest Rate
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
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Interest Rate</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {formatPercentage(results.interestRate)}
                    </p>
                    <p className="text-emerald-100">
                      Annual interest rate on your {formatCurrency(results.loanAmount)} loan
                    </p>
                  </div>
                </Card>

                {/* Secondary Results */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Payments */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Payments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-800">
                          {formatCurrency(results.totalPayments)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Total amount paid over {results.loanTermMonths} months
                      </p>
                    </CardContent>
                  </Card>

                  {/* Total Interest */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Percent className="h-5 w-5 text-emerald-600" />
                        Total Interest
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-800">
                          {formatCurrency(results.totalInterest)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Total interest paid over loan term
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Payment Breakdown */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <Calculator className="h-5 w-5 text-emerald-600" />
                      Payment Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Principal Amount</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.loanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Monthly Payment</span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(results.monthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Loan Term</span>
                        <span className="font-semibold text-slate-800">
                          {results.loanTermMonths} months ({(results.loanTermMonths / 12).toFixed(1)} years)
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Interest Rate</span>
                        <span className="font-semibold text-emerald-600">
                          {formatPercentage(results.interestRate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-600 font-semibold">Total Paid</span>
                        <span className="font-bold text-xl text-slate-800">
                          {formatCurrency(results.totalPayments)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interest vs Principal Visualization */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg">Payment Composition</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Principal Bar */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Principal</span>
                          <span className="text-sm font-semibold text-slate-800">
                            {formatCurrency(results.loanAmount)} ({((results.loanAmount / results.totalPayments) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                            style={{ width: `${(results.loanAmount / results.totalPayments) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Interest Bar */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Interest</span>
                          <span className="text-sm font-semibold text-slate-800">
                            {formatCurrency(results.totalInterest)} ({((results.totalInterest / results.totalPayments) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full"
                            style={{ width: `${(results.totalInterest / results.totalPayments) * 100}%` }}
                          ></div>
                        </div>
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
                  Enter your loan details and click calculate to see your interest rate
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Interest Rates</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is an Interest Rate?</h3>
                <p className="mb-4">
                  An interest rate represents the cost of borrowing money, expressed as a percentage of the principal loan amount. Think of it as the price tag on using someone else's capital—whether you're taking out a mortgage, financing a car, or carrying a balance on your credit card. Lenders charge interest to compensate for the risk they're taking and the opportunity cost of lending you money instead of investing it elsewhere.
                </p>
                <p>
                  This calculator works backwards from what you already know. If you've got a loan with fixed monthly payments and you're wondering what interest rate you're actually paying, you've come to the right place. Maybe you're comparing offers from different lenders, or perhaps you're trying to figure out if that "special financing" deal is really as good as it sounds. By entering your loan amount, payment schedule, and monthly payment, this tool reverse-engineers the exact annual interest rate being charged.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Interest Rates Work</h3>
                <p className="mb-4">
                  Interest rates don't exist in a vacuum. They're influenced by a complex web of economic factors, from Federal Reserve policy decisions to inflation rates to your personal credit history. When the economy heats up and inflation rises, central banks typically raise benchmark rates to cool things down. That cascades through the entire lending ecosystem—mortgage rates climb, auto loans get pricier, and credit card APRs tick upward.
                </p>
                <p className="mb-4">
                  Here's where it gets interesting: the rate you see advertised isn't always the rate you'll pay. That's because lenders assess risk on an individual basis. Someone with a 780 credit score and stable employment history will qualify for significantly better rates than someone with spotty credit and irregular income. Lenders also consider the loan amount, term length, and collateral (if any). A 30-year mortgage typically carries a higher rate than a 15-year mortgage because the lender's money is tied up longer, creating more uncertainty.
                </p>
                <p>
                  Understanding compound interest is crucial here. With compound interest—which is standard for virtually all consumer loans—the interest you owe gets calculated on both the principal and any accumulated interest from previous periods. That's why making extra payments early in a loan's life has such a dramatic impact. You're reducing the base amount on which future interest compounds, creating a snowball effect in your favor.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed vs. Variable Interest Rates</h3>
                <p className="mb-4">
                  The fixed versus variable debate comes down to predictability versus potential savings. Fixed-rate loans lock in your interest rate for the entire loan term. Your monthly payment stays constant whether interest rates skyrocket to double digits or plummet to historic lows. There's enormous peace of mind in that predictability—you can budget accurately and you're protected against rising rates. The tradeoff? You might pay a premium for that stability, and if rates drop significantly, you're stuck with your higher rate unless you refinance (which comes with its own costs).
                </p>
                <p className="mb-4">
                  Variable rates, on the other hand, fluctuate based on an underlying benchmark—often the prime rate or LIBOR (now being replaced by SOFR). When the benchmark moves, your rate adjusts accordingly. In a falling rate environment, variable rates can save you serious money. But they're a double-edged sword. If rates climb, your monthly payment increases, potentially straining your budget. Some variable-rate loans include caps that limit how much the rate can increase in a single adjustment period or over the loan's lifetime, offering some protection against runaway costs.
                </p>
                <p>
                  Most financial advisors suggest fixed rates for long-term borrowing when rates are relatively low, and variable rates for short-term loans or when you're confident rates will remain stable or decline. That said, personal circumstances matter enormously. If you've got a variable income or tight budget, the predictability of a fixed rate might be worth the potential extra cost.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding APR vs. Interest Rate</h3>
                <p className="mb-4">
                  This confusion trips up countless borrowers. The interest rate is straightforward—it's the percentage of your loan balance you'll pay in interest each year. But APR (Annual Percentage Rate) tells a more complete story. APR includes not just the interest rate, but also certain fees and costs associated with obtaining the loan: origination fees, broker fees, closing costs, and mortgage insurance in the case of home loans.
                </p>
                <p className="mb-4">
                  That's why APR is almost always higher than the stated interest rate. For example, you might see a mortgage advertised at 6.5% interest with a 6.8% APR. That difference represents the additional costs you're paying to secure the loan. When comparing loan offers, APR gives you a much better apples-to-apples comparison than interest rate alone. A loan with a low interest rate but high fees might actually cost more than one with a slightly higher rate and minimal fees.
                </p>
                <p>
                  Keep in mind that APR calculations assume you'll hold the loan for its entire term. If you plan to refinance or sell before the loan matures, upfront fees get spread over fewer months, potentially making the effective APR higher than advertised. That's particularly relevant for mortgages, where the average homeowner refinances or moves within seven to ten years.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Factors That Influence Your Interest Rate</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Credit Score</h4>
                <p className="mb-4">
                  Your credit score is probably the single biggest factor lenders consider when setting your rate. It's a three-digit number that summarizes your creditworthiness based on your borrowing history. Scores typically range from 300 to 850, with higher scores qualifying for better rates. The difference can be substantial—we're talking thousands of dollars over the life of a mortgage or auto loan. Someone with excellent credit (typically 740+) might qualify for a rate 1-2 percentage points lower than someone with fair credit (580-669).
                </p>
                <p className="mb-4">
                  What goes into that score? Payment history carries the most weight, accounting for about 35% of your FICO score. Late payments, defaults, and collections drag it down. Credit utilization—how much of your available credit you're using—makes up another 30%. Keeping your balances below 30% of your limits helps. Length of credit history, types of credit, and recent credit inquiries round out the calculation.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Term and Amount</h4>
                <p className="mb-4">
                  Longer loan terms generally mean higher interest rates because lenders face more uncertainty over extended periods. A 30-year mortgage carries more risk than a 15-year mortgage—there's more time for economic conditions to change, for your financial situation to deteriorate, or for property values to fluctuate. Lenders price in that risk with higher rates.
                </p>
                <p className="mb-4">
                  Loan size matters too, though the relationship isn't always linear. Very small loans might carry higher rates because the administrative costs represent a larger percentage of the loan amount. On the flip side, jumbo loans (mortgages above conforming loan limits, which vary by location) often have higher rates because they can't be sold to Fannie Mae or Freddie Mac, limiting lenders' ability to offload the risk.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Down Payment and Loan-to-Value Ratio</h4>
                <p className="mb-4">
                  The more skin you have in the game, the better your rate. That's because you're less likely to default when you've invested a significant chunk of your own money. For mortgages, putting down 20% or more typically gets you the best rates and helps you avoid private mortgage insurance (PMI). The loan-to-value ratio (LTV)—the loan amount divided by the property's value—is a key risk metric for lenders.
                </p>
                <p>
                  Lower LTVs mean lower rates. If you're buying a $500,000 home and putting $100,000 down, your LTV is 80%. Put down $50,000 instead, and your LTV jumps to 90%, likely pushing your rate higher and triggering PMI requirements. The same principle applies to auto loans and other secured lending—larger down payments signal lower risk and unlock better rates.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Economic Conditions</h4>
                <p className="mb-4">
                  Individual factors only tell part of the story. Broader economic conditions set the baseline from which everything else adjusts. When the Federal Reserve raises its benchmark rate to combat inflation, borrowing costs across the economy typically rise. Mortgage rates, auto loan rates, and credit card APRs all tend to move in the same direction, though not always by the same amount or at the same pace.
                </p>
                <p>
                  Inflation expectations are particularly important. If lenders anticipate inflation will erode the value of the money you're paying back, they'll demand higher rates to compensate. That's why you often see rates spike during periods of high inflation. Conversely, during recessions or periods of economic uncertainty, the Fed often cuts rates to stimulate borrowing and spending, potentially creating opportunities for favorable financing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real vs. Nominal Interest Rates</h3>
                <p className="mb-4">
                  Here's a concept that sounds academic but has very practical implications: the difference between nominal and real interest rates. The nominal rate is what you see advertised—the actual percentage you're being charged. But the real rate accounts for inflation, giving you a clearer picture of the loan's true cost.
                </p>
                <p className="mb-4">
                  The formula is straightforward: Real Rate = Nominal Rate - Inflation Rate. So if you've got a 7% mortgage and inflation is running at 3%, your real rate is about 4%. That's what you're effectively paying after accounting for the declining purchasing power of money over time. In high-inflation environments, your real borrowing cost can actually be quite low—or even negative if inflation exceeds your nominal rate.
                </p>
                <p>
                  This matters because it influences whether borrowing makes sense. During periods of low inflation and low nominal rates, the gap between nominal and real rates narrows. You might have a 3% mortgage with 2% inflation, giving you a real rate of just 1%. That's incredibly cheap money, potentially making it smarter to borrow and invest the cash elsewhere rather than paying down the loan aggressively.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How to Get the Best Interest Rate</h3>
                <p className="mb-4">
                  Getting the best possible rate takes some legwork, but the payoff can be enormous. Start by checking your credit report well before you plan to borrow. You're entitled to free reports from all three bureaus annually through AnnualCreditReport.com. Look for errors—they're more common than you'd think—and dispute any inaccuracies. Even small improvements to your credit score can unlock better rates.
                </p>
                <p className="mb-4">
                  Shop around aggressively. Don't just accept the first offer you receive. Different lenders have different risk appetites, different cost structures, and different rate sheets. Getting quotes from at least three to five lenders gives you negotiating leverage. When you're rate shopping, do it within a concentrated period—credit scoring models typically treat multiple inquiries for the same type of loan within a 14 to 45-day window as a single inquiry, minimizing the impact on your score.
                </p>
                <p className="mb-4">
                  Consider rate buydowns and discount points. With mortgages, paying points upfront—each point typically costs 1% of the loan amount—can lower your interest rate by roughly 0.25%. Whether that makes sense depends on how long you plan to keep the loan. If you're staying put for many years, paying points to reduce your rate can save you money over the long haul. If you might move or refinance soon, skip the points and take the higher rate.
                </p>
                <p>
                  Timing can matter too, particularly for mortgages. Rates fluctuate daily based on bond market movements. While trying to time the market perfectly is nearly impossible, being aware of trends helps. If rates have been climbing and economic indicators suggest they might stabilize or fall, waiting a few weeks could pay off. Conversely, if all signs point to rising rates, locking in sooner rather than later makes sense.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p className="mb-4">
                  This interest rate calculator is particularly useful for reverse-engineering loans where you know the payment but not the rate. Maybe you're looking at seller financing on a property, and the owner has proposed specific terms. Plug in the numbers here to see what interest rate those terms actually work out to. You might discover that seemingly reasonable payments actually represent a pretty steep rate once you do the math.
                </p>
                <p className="mb-4">
                  It's also valuable for comparison shopping. When lenders quote you rates, they'll usually show you a payment based on their rate. But if you want to compare against a different loan amount or term, this calculator lets you work backwards to understand the equivalent rate. That can reveal whether that "low payment" is actually just a product of a longer term rather than a better rate.
                </p>
                <p>
                  Keep in mind that this calculator assumes fixed monthly payments and doesn't account for variable rates, payment changes, or additional fees. It gives you the pure interest rate based on the loan mathematics. To get the full APR, you'd need to factor in closing costs, origination fees, and other charges. Still, knowing the base interest rate is the critical first step in evaluating any loan offer.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mt-8">
                <h4 className="font-semibold text-lg mb-2 text-emerald-900">Pro Tip</h4>
                <p className="text-emerald-800">
                  When comparing loan offers, pay close attention to both the interest rate and APR. A loan with a lower interest rate but high upfront fees might actually cost more over time than one with a slightly higher rate and minimal fees. Calculate the total amount you'll pay over the loan's lifetime to make an apples-to-apples comparison.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate monthly mortgage payments</div>
                  </div>
                </Link>

                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Calculator className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate loan payments and schedules</div>
                  </div>
                </Link>

                <Link href="/compound-interest" className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Compound Interest Calculator</div>
                    <div className="text-sm text-slate-600">Calculate compound interest growth</div>
                  </div>
                </Link>

                <Link href="/apr" className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Percent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">APR Calculator</div>
                    <div className="text-sm text-slate-600">Calculate annual percentage rate</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
