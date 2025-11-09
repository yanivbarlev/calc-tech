"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Home, DollarSign, TrendingUp, CreditCard } from "lucide-react";

interface DownPaymentResults {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  closingCosts: number;
  loanAmount: number;
  monthlyPayment: number;
  totalUpfrontCash: number;
}

export default function DownPaymentCalculator() {
  // Input states
  const [homePrice, setHomePrice] = useState<string>("450000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [closingCostsPercent, setClosingCostsPercent] = useState<string>("3");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");

  const [results, setResults] = useState<DownPaymentResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const price = parseFloat(homePrice) || 450000;
    const downPercent = parseFloat(downPaymentPercent) || 20;
    const closingPercent = parseFloat(closingCostsPercent) || 3;
    const rate = parseFloat(interestRate) || 6.5;
    const years = parseFloat(loanTerm) || 30;

    // Calculate down payment
    const downPaymentAmount = (price * downPercent) / 100;

    // Calculate closing costs
    const closingCostsAmount = (price * closingPercent) / 100;

    // Calculate loan amount
    const loanAmt = price - downPaymentAmount;

    // Calculate monthly payment using mortgage formula
    const monthlyRate = (rate / 100) / 12;
    const numPayments = years * 12;
    const monthlyPmt = monthlyRate > 0
      ? (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmt / numPayments;

    // Total upfront cash needed
    const totalUpfront = downPaymentAmount + closingCostsAmount;

    setResults({
      homePrice: price,
      downPayment: downPaymentAmount,
      downPaymentPercent: downPercent,
      closingCosts: closingCostsAmount,
      loanAmount: loanAmt,
      monthlyPayment: monthlyPmt,
      totalUpfrontCash: totalUpfront,
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Calculator className="h-6 w-6 text-white" />
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
            <Home className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Down Payment Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate how much you need upfront to purchase a home, including down payment and closing costs
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-6 w-6" />
                  Home Purchase Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Home Price ($)
                  </label>
                  <Input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    placeholder="450000"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Down Payment (%)
                  </label>
                  <Input
                    type="number"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(e.target.value)}
                    placeholder="20"
                    className="text-lg"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Closing Costs (%)
                  </label>
                  <Input
                    type="number"
                    value={closingCostsPercent}
                    onChange={(e) => setClosingCostsPercent(e.target.value)}
                    placeholder="3"
                    className="text-lg"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                    className="text-lg"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loan Term (years)
                  </label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="30"
                    className="text-lg"
                  />
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Down Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Total Upfront Cash */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Total Upfront Cash Needed</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.totalUpfrontCash)}</p>
                    <p className="text-emerald-100">Down payment + closing costs combined</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Down Payment Breakdown */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Home className="h-5 w-5 text-emerald-600" />
                        Down Payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Amount</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.downPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Percentage</span>
                        <span className="font-semibold text-emerald-600">{formatPercent(results.downPaymentPercent)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Closing Costs */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <CreditCard className="h-5 w-5 text-emerald-600" />
                        Closing Costs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Amount</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.closingCosts)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Percentage</span>
                        <span className="font-semibold text-amber-600">{formatPercent(parseFloat(closingCostsPercent))}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Loan Details */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-slate-600">Home Price</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.homePrice)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-slate-600">Loan Amount</span>
                      <span className="font-semibold text-lg">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-slate-600">Monthly Payment</span>
                      <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Interest Rate</span>
                      <span className="font-semibold">{formatPercent(parseFloat(interestRate))}</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Home className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your home details and click calculate to see your down payment breakdown
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Down Payments</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is a Down Payment?</h3>
                <p className="mb-4">
                  When you're buying a home, the down payment represents the upfront portion of the total purchase price that you pay out of pocket. It's essentially your initial stake in the property, showing lenders you're financially invested in the purchase. Think of it as the first piece of your homeownership puzzle—the money you bring to the table before the bank steps in with a mortgage to cover the rest.
                </p>
                <p className="mb-4">
                  Down payments aren't just about homes, though. You'll encounter them when purchasing cars, boats, or other big-ticket items. But in real estate, they play a particularly crucial role because they directly impact everything from your monthly payments to whether you'll need additional insurance. The amount you put down can make or break your ability to secure favorable loan terms.
                </p>
                <p>
                  Here's what makes down payments interesting: they're both a hurdle and an opportunity. While saving up that initial chunk of cash can feel overwhelming—especially for first-time buyers—a larger down payment can save you thousands over the life of your loan. It's a balancing act between what you can afford now versus what you'll pay later.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Much Should You Put Down?</h3>
                <p className="mb-4">
                  The old rule of thumb says you should aim for 20% down. There's good reason for this benchmark—it's the magic number that lets you avoid Private Mortgage Insurance (PMI) on conventional loans. If you're buying a $450,000 home, that means coming up with $90,000 upfront. Sounds like a lot? It is. But here's the thing: you don't always have to hit that 20% mark.
                </p>
                <p className="mb-4">
                  Many lenders these days will work with down payments as low as 3% to 5% for conventional loans. Some government-backed programs go even lower. FHA loans, popular among first-time buyers, require just 3.5% down. VA loans for veterans and USDA loans for rural properties can offer zero-down options. The catch? Lower down payments typically mean higher monthly costs and additional fees.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Common Down Payment Percentages:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>20% or more:</strong> The traditional standard that avoids PMI and often gets you better interest rates. You'll have instant equity and lower monthly payments.</li>
                  <li><strong>10-15%:</strong> A solid middle ground that still shows financial strength while keeping some cash in reserve for moving costs and home improvements.</li>
                  <li><strong>5-10%:</strong> Increasingly common among buyers who want to get into the market sooner rather than later. You'll pay PMI, but you're building equity instead of paying rent.</li>
                  <li><strong>3-5%:</strong> Entry-level territory, especially for first-time buyers. FHA loans at 3.5% down have helped millions become homeowners, though you'll face higher overall costs.</li>
                  <li><strong>0-3%:</strong> Special programs like VA, USDA, or certain state first-time buyer programs. These can be game-changers if you qualify, though eligibility requirements are strict.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Real Cost: Beyond the Down Payment</h3>
                <p className="mb-4">
                  Here's where many first-time buyers get blindsided—the down payment is just part of your upfront costs. Closing costs typically add another 2% to 5% of the home's purchase price on top of your down payment. On a $450,000 home, that could mean an additional $9,000 to $22,500 you'll need at closing.
                </p>
                <p className="mb-4">
                  Closing costs cover a whole range of fees: loan origination charges, appraisal fees, title insurance, attorney fees, property taxes, homeowner's insurance, and various administrative charges. Some of these are negotiable, and in competitive markets, sellers sometimes agree to cover a portion. But you should plan as if you're covering everything yourself.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">What's Included in Closing Costs:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Loan origination fees:</strong> What the lender charges to process your mortgage, typically 0.5% to 1% of the loan amount</li>
                  <li><strong>Appraisal fee:</strong> Usually $300 to $500 for a professional to assess the home's value</li>
                  <li><strong>Title search and insurance:</strong> Protects against ownership disputes, often $1,000 to $3,000</li>
                  <li><strong>Home inspection:</strong> Not required but highly recommended, typically $300 to $500</li>
                  <li><strong>Property taxes and insurance:</strong> Prepaid amounts to establish your escrow account</li>
                  <li><strong>Recording fees:</strong> Local government charges for filing the deed and mortgage</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">PMI: The Down Payment Insurance</h3>
                <p className="mb-4">
                  Private Mortgage Insurance is something you'll want to understand if you're putting down less than 20%. Basically, PMI protects the lender—not you—in case you default on the loan. It typically costs between 0.5% and 1% of the loan amount annually, divided into monthly payments. On a $360,000 loan (80% of $450,000), that's roughly $150 to $300 added to your monthly payment.
                </p>
                <p className="mb-4">
                  Now, PMI isn't necessarily evil. It lets you buy a home sooner rather than waiting years to save a full 20% down payment. In markets where home prices are rising quickly, the equity you build might offset the PMI costs. Plus, you can request to have PMI removed once you reach 20% equity through payments or appreciation—though you'll need to be proactive about asking.
                </p>
                <p>
                  Some loans have built-in mortgage insurance that works differently. FHA loans, for instance, charge an upfront mortgage insurance premium plus annual premiums that stick around for the life of the loan in many cases. This makes refinancing an attractive option once you've built enough equity to switch to a conventional loan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Down Payment Strategies</h3>
                <p className="mb-4">
                  Saving for a down payment requires discipline, but there are proven approaches that work. The most straightforward method is to automate your savings—set up automatic transfers to a dedicated down payment fund every time you get paid. Even small amounts add up when you're consistent. Some people aim to save a percentage of their income (like 10-15%), while others prefer a fixed dollar amount.
                </p>
                <p className="mb-4">
                  Beyond saving, consider these alternatives: gifts from family members (most lenders allow this, though documentation is required), down payment assistance programs (many states and cities offer grants or low-interest loans), and retirement account loans or first-time buyer withdrawals. Some people also take on side gigs specifically to boost their down payment fund, or they sell assets they no longer need.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Smart Saving Tips:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>High-yield savings account:</strong> Keep your down payment fund in an account earning competitive interest, but make sure it's liquid when you need it</li>
                  <li><strong>Track your progress:</strong> Use our calculator regularly to see how different down payment amounts affect your monthly costs</li>
                  <li><strong>Budget backwards:</strong> Decide when you want to buy, calculate how much you need, and work backward to determine monthly savings targets</li>
                  <li><strong>Cut major expenses temporarily:</strong> Some buyers reduce discretionary spending for a year or two to supercharge their savings</li>
                  <li><strong>Take advantage of windfalls:</strong> Tax refunds, bonuses, and gift money can accelerate your timeline significantly</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Down Payments Affect Your Loan</h3>
                <p className="mb-4">
                  The relationship between your down payment and your mortgage terms is pretty straightforward: bigger down payments generally mean better deals. With 20% or more down, you're more likely to qualify for lower interest rates because you represent less risk to the lender. Even a quarter-point difference in your rate can translate to tens of thousands of dollars over a 30-year mortgage.
                </p>
                <p className="mb-4">
                  Your down payment also determines your loan-to-value ratio (LTV), which is simply the loan amount divided by the home's value. An 80% LTV (20% down) is considered ideal by most conventional lenders. Higher LTVs mean more risk, which is why lenders compensate with higher rates or additional insurance requirements. This ratio follows you throughout your mortgage—it affects refinancing options and your ability to tap into home equity later.
                </p>
                <p>
                  Monthly payments shrink as down payments grow, and not just because you're borrowing less. With a larger down payment, you're paying interest on a smaller principal, which compounds over time. Using our calculator, you can see exactly how a few percentage points in your down payment affects both your monthly budget and your total interest paid over the loan's lifetime.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">First-Time Buyer Programs</h3>
                <p className="mb-4">
                  If you've never owned a home before (or haven't in the past three years), you might qualify for special programs designed to make homeownership more accessible. These programs recognize that the down payment barrier is often what keeps qualified buyers out of the market. Many offer down payment assistance in the form of grants, second mortgages with deferred payments, or reduced-interest loans.
                </p>
                <p className="mb-4">
                  FHA loans remain the most popular option for first-timers, requiring just 3.5% down with credit scores as low as 580. Fannie Mae and Freddie Mac both offer 3% down programs for qualified buyers. State housing finance agencies run their own programs—some offering thousands in down payment grants that don't need to be repaid if you meet certain conditions, like staying in the home for a minimum period.
                </p>
                <p>
                  Don't overlook employer assistance either. Some companies, particularly in high-cost areas, provide down payment help as a recruiting or retention benefit. Teachers, healthcare workers, and public servants may find profession-specific programs offering better terms. The key is researching what's available in your area and for your situation—opportunities exist that many buyers never discover.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When to Put More (or Less) Down</h3>
                <p className="mb-4">
                  The decision of how much to put down isn't just mathematical—it's personal and depends on your complete financial picture. Putting more down makes sense when you're trying to avoid PMI, when you want the lowest possible monthly payment, or when you have substantial savings and are confident in your emergency fund. If mortgage rates are high, a larger down payment can offset some of that sting.
                </p>
                <p className="mb-4">
                  Conversely, putting less down might be smarter if you have high-interest debt to pay off, if you need cash reserves for home repairs and improvements, or if investment opportunities could earn you more than you'd save on mortgage interest. In rapidly appreciating markets, getting in sooner with a smaller down payment might build more wealth than waiting to save 20%. It's also worth considering that mortgage interest is tax-deductible, while the returns from some investments aren't guaranteed.
                </p>
                <p>
                  Ultimately, you want to balance immediate affordability with long-term financial health. A house-poor buyer who stretched to put 20% down but has no emergency fund is in a precarious position. Similarly, someone who could easily afford 20% down might be missing out on savings by putting down only the minimum. Run the numbers multiple ways, consider various scenarios, and choose what lets you sleep soundly at night.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p className="mb-4">
                  Our down payment calculator helps you see the full financial picture before you commit to a home purchase. Start by entering your target home price—be realistic based on your market. Then experiment with different down payment percentages to see how they affect your upfront cash needs and monthly payments. Don't forget to adjust the closing costs percentage based on what you're seeing in your area (your real estate agent can provide local estimates).
                </p>
                <p className="mb-4">
                  Interest rates make a huge difference, so use current market rates rather than wishful thinking. Check what rates you actually qualify for based on your credit score and financial situation. The loan term—typically 15 or 30 years—dramatically affects your monthly payment, with 15-year mortgages offering lower overall interest but higher monthly costs.
                </p>
                <p>
                  Try running multiple scenarios: your ideal down payment, your minimum comfortable down payment, and something in between. See how each affects your total upfront costs and monthly obligations. This gives you a range to work with when house hunting and helps you set realistic savings goals. Remember that these calculations are estimates—your actual costs may vary based on your specific lender, location, and loan type.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <Home className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 transition-colors">Mortgage Calculator</div>
                    <div className="text-sm text-slate-500">Calculate monthly mortgage payments</div>
                  </div>
                </Link>
                <Link href="/house-affordability" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 transition-colors">House Affordability</div>
                    <div className="text-sm text-slate-500">How much home can you afford?</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 transition-colors">Loan Calculator</div>
                    <div className="text-sm text-slate-500">General loan payment calculator</div>
                  </div>
                </Link>
                <Link href="/interest-rate" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold group-hover:text-emerald-600 transition-colors">Interest Rate Calculator</div>
                    <div className="text-sm text-slate-500">Calculate effective interest rates</div>
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
