"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Home, ArrowLeft, DollarSign, Calendar, Percent, TrendingDown } from "lucide-react";

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  loanAmount: number;
  propertyTaxMonthly: number;
  propertyTaxTotal: number;
  insuranceMonthly: number;
  insuranceTotal: number;
  totalMonthly: number;
  totalOutOfPocket: number;
  payoffDate: string;
}

interface AmortizationEntry {
  month: number;
  date: string;
  interest: number;
  principal: number;
  balance: number;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>("1000000");
  const [downPayment, setDownPayment] = useState<string>("200000");
  const [loanTerm, setLoanTerm] = useState<string>("25");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [propertyTax, setPropertyTax] = useState<string>("800");
  const [homeInsurance, setHomeInsurance] = useState<string>("250");

  const [results, setResults] = useState<MortgageResults | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const years = parseFloat(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;

    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    // Calculate monthly payment using amortization formula
    const monthlyPayment = loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;

    const propertyTaxTotal = tax * numPayments;
    const insuranceTotal = insurance * numPayments;
    const totalMonthly = monthlyPayment + tax + insurance;
    const totalOutOfPocket = totalPayment + propertyTaxTotal + insuranceTotal;

    // Calculate payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear() + years, today.getMonth());
    const payoffDateStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount,
      propertyTaxMonthly: tax,
      propertyTaxTotal,
      insuranceMonthly: insurance,
      insuranceTotal,
      totalMonthly,
      totalOutOfPocket,
      payoffDate: payoffDateStr
    });

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let balance = loanAmount;
    const startDate = new Date();

    for (let month = 1; month <= numPayments; month++) {
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
      calculateMortgage();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
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
            <Home className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Mortgage Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your monthly mortgage payments, see your amortization schedule, and understand the true cost of homeownership
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
                    Home Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(e.target.value)}
                      className="pl-7"
                      placeholder="1000000"
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
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="pl-7"
                      placeholder="200000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {((parseFloat(downPayment) / parseFloat(homePrice)) * 100 || 0).toFixed(1)}% of home price
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="25"
                  />
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
                      placeholder="6.5"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4">Monthly Costs</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Property Tax (Monthly)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={propertyTax}
                          onChange={(e) => setPropertyTax(e.target.value)}
                          className="pl-7"
                          placeholder="800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Home Insurance (Monthly)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(e.target.value)}
                          className="pl-7"
                          placeholder="250"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateMortgage}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Mortgage
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
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.totalMonthly)}</p>
                    <p className="text-emerald-100">
                      Principal & Interest: {formatCurrency(results.monthlyPayment)}
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
                        <span className="text-slate-600">Down Payment</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(downPayment))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Interest</span>
                        <span className="font-semibold text-rose-600">{formatCurrency(results.totalInterest)}</span>
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
                        <TrendingDown className="h-5 w-5 text-blue-600" />
                        Additional Costs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Property Tax</span>
                        <span className="font-semibold">{formatCurrency(results.propertyTaxTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Home Insurance</span>
                        <span className="font-semibold">{formatCurrency(results.insuranceTotal)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Payoff Date</span>
                        <span className="font-bold">{results.payoffDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Out-of-Pocket</span>
                        <span className="font-bold text-lg">{formatCurrency(results.totalOutOfPocket)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

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
                <Home className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Loan Details
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Mortgage" to see your personalized results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Your Mortgage</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Mortgage?</h3>
                <p>
                  Think of a mortgage as a partnership between you and a lender. When you're ready to buy a home but don't have the full purchase price saved up, a lender steps in to help. They provide the funds to pay the seller, and you agree to pay them back over time—usually with interest. The home itself serves as collateral, which means if you can't make your payments, the lender has the right to take possession of the property.
                </p>
                <p className="mt-3">
                  Most people opt for a 30-year fixed-rate mortgage, which has become the standard in home financing. These loans account for roughly 70-90% of all mortgages in the United States. The "fixed-rate" part means your interest rate stays the same throughout the entire loan period, making it easier to budget since your monthly payment won't fluctuate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Breaking Down the Numbers</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Amount</h4>
                <p>
                  This is simply the difference between what you're paying for the house and what you're putting down as a down payment. So if you're buying a $400,000 home and putting down $80,000, you're borrowing $320,000 from the lender. It's worth using a house affordability calculator before you start shopping to get a realistic sense of what you can comfortably borrow based on your income and debts.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Down Payment</h4>
                <p>
                  The conventional wisdom says to put down 20% or more when buying a home. There's good reason for this—it typically gets you better loan terms and helps you avoid PMI (private mortgage insurance). That said, plenty of programs let you put down as little as 3% if that's what works for your situation. Just keep in mind that if you go below 20%, you'll likely have to pay for PMI until you've built up enough equity in your home—specifically, until your loan balance drops below 80% of what you originally paid for the property.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Loan Term</h4>
                <p>
                  You'll typically choose between 15, 20, or 30-year terms for your mortgage. Shorter loan periods generally come with lower interest rates, which can save you a considerable amount over the life of the loan. However, your monthly payments will be higher since you're paying off the same amount in less time. It's a trade-off between lower overall cost and monthly affordability.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Interest Rate</h4>
                <p>
                  With a fixed-rate mortgage, your interest rate remains constant from day one until you pay off the loan. If you see an advertised rate of 6% APR, that translates to about 0.5% interest charged each month on your remaining balance. Adjustable-rate mortgages (ARMs) work differently—they start with a fixed rate for an initial period, then adjust periodically based on market conditions. While ARMs might offer lower initial rates, they come with uncertainty about future payments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Hidden Costs of Homeownership</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Property Taxes</h4>
                <p>
                  Every state in the country requires property owners to pay taxes to their local government. These taxes fund essential services like schools, roads, and emergency services. On average, Americans pay around 1.1% of their home's value each year in property taxes, though this varies significantly by location. Some areas have much higher rates, while others are considerably lower.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Home Insurance</h4>
                <p>
                  Insurance protects you from the financial fallout of accidents, natural disasters, theft, and other unexpected events. Most policies also include personal liability coverage, which is crucial if someone gets injured on your property or if you're held responsible for damage that occurs off your property. Your lender will almost certainly require you to maintain insurance as long as you have a mortgage.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">PMI Insurance</h4>
                <p>
                  If you're putting down less than 20%, you'll need to pay for private mortgage insurance. This protects the lender (not you) in case you default on the loan. The good news is it's not permanent—once you've paid down your loan enough that you owe less than 80% or 78% of your home's value, you can typically stop paying PMI. The cost usually ranges from 0.3% to 1.9% of your loan amount annually.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">HOA Fees</h4>
                <p>
                  If you're buying a condo, townhouse, or a home in certain planned communities, you'll likely have to pay homeowners association fees. These fees cover the maintenance and improvement of shared spaces and community amenities. Annual HOA fees typically amount to less than 1% of your property's value, but they can vary widely depending on what services and amenities are included.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Maintenance and Upkeep</h4>
                <p>
                  One of the biggest surprises for first-time homeowners is how much it costs to maintain a house. Unlike renting, where your landlord handles repairs, you're now responsible for everything from fixing leaky faucets to replacing the roof. A common rule of thumb is to budget at least 1% of your home's value each year for maintenance and repairs. Some years you might spend less, others more, but it's better to be prepared.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What About Closing Costs?</h3>
                <p>
                  When you finalize your home purchase, you'll encounter a laundry list of fees collectively known as closing costs. These typically include attorney fees, title service charges, recording fees, survey costs, property transfer taxes, brokerage commissions, appraisal fees, inspection costs, home warranties, and prepaid insurance. While these costs usually fall on the buyer, they're often negotiable. For a $400,000 home purchase, it's not unusual to pay around $10,000 in closing costs, though this can vary based on your location and the specifics of your transaction.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Paying Off Your Mortgage Early</h3>
                <p>
                  Many homeowners wonder whether they should try to pay off their mortgage ahead of schedule. There are several strategies to consider:
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Making Extra Payments</h4>
                <p>
                  Any additional money you put toward your principal reduces your loan balance, which means you'll pay less interest overall and own your home sooner. Even relatively small extra payments can make a meaningful difference over time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Biweekly Payment Plans</h4>
                <p>
                  Instead of making one monthly payment, some people split their payment in half and pay every two weeks. Since there are 52 weeks in a year, this strategy results in 26 half-payments—the equivalent of 13 full monthly payments. That extra payment each year goes directly toward your principal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Refinancing</h4>
                <p>
                  When you refinance, you're essentially taking out a new loan to pay off your existing mortgage. People usually refinance to get a lower interest rate or to shorten their loan term. While this can save you money in the long run, keep in mind that you'll need to pay closing costs on the new loan, and shortening your term typically means higher monthly payments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Case For and Against Early Payoff</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Why Pay It Off Early?</h4>
                <p>
                  The most obvious benefit is paying less interest over the life of your loan. You'll also own your home outright sooner, which provides a tremendous sense of financial security and freedom. There's something psychologically powerful about not having that monthly mortgage payment hanging over your head.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Why Take Your Time?</h4>
                <p>
                  First, check if your loan has prepayment penalties—some lenders charge fees if you pay off your mortgage too quickly. These penalties are usually calculated as a percentage of your outstanding balance or as a specific number of months of interest. They typically decrease over time and often disappear entirely after five years.
                </p>
                <p className="mt-3">
                  Second, consider the opportunity cost. If your mortgage rate is relatively low, you might earn more by investing extra money in the stock market or other investments rather than paying down your mortgage. Additionally, the money you put into your mortgage becomes much less accessible—if you suddenly need cash, you can't just withdraw it from your home equity without going through a refinance or taking out a home equity loan.
                </p>
                <p className="mt-3">
                  Finally, if you itemize your tax deductions, the interest you pay on your mortgage might provide valuable tax benefits. Paying off your mortgage eliminates this deduction.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">A Brief History of Mortgages</h3>
                <p>
                  The mortgage system we know today is actually a relatively recent development. In the early 1900s, most people who wanted to buy a home had to come up with at least 50% as a down payment, then take out a three or five-year loan. At the end of that short period, they faced a balloon payment for the remaining balance. Under these strict conditions, only about four out of ten Americans could afford to own a home.
                </p>
                <p className="mt-3">
                  The Great Depression made things even worse—roughly one in four homeowners lost their homes. In response, the government created the Federal Housing Administration and Fannie Mae during the 1930s. These agencies introduced the revolutionary concept of 30-year mortgages with smaller down payment requirements, making homeownership accessible to millions more Americans.
                </p>
                <p className="mt-3">
                  After World War II, new government programs sparked a housing construction boom that lasted for decades. By 2001, the homeownership rate had climbed to a record 68.1%. The 2008 financial crisis was a major setback, leading to a federal takeover of Fannie Mae after billions in losses from widespread defaults. However, the agency returned to profitability by 2012 and continues to play a vital role in the housing market today, insuring millions of residential properties across the country.
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
