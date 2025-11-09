"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Percent, Info, Clock } from "lucide-react";

interface APRResults {
  realAPR: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPaid: number;
  nominalRate: number;
}

export default function APRCalculator() {
  // Input states
  const [loanAmount, setLoanAmount] = useState<string>("100000");
  const [loanTermYears, setLoanTermYears] = useState<string>("10");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("6.0");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("12");
  const [loanedFees, setLoanedFees] = useState<string>("0");
  const [upfrontFees, setUpfrontFees] = useState<string>("1500");

  const [results, setResults] = useState<APRResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    // Parse inputs with fallback defaults
    const principal = parseFloat(loanAmount) || 100000;
    const years = parseFloat(loanTermYears) || 0;
    const months = parseFloat(loanTermMonths) || 0;
    const totalMonths = years * 12 + months;
    const rate = (parseFloat(interestRate) || 6.0) / 100;
    const compounding = parseFloat(compoundingFrequency) || 12;
    const paymentFreq = parseFloat(paymentFrequency) || 12;
    const loaned = parseFloat(loanedFees) || 0;
    const upfront = parseFloat(upfrontFees) || 0;

    // Validate inputs
    if (principal <= 0 || totalMonths <= 0 || rate < 0) {
      return;
    }

    // Effective amount borrowed (includes loaned fees)
    const effectivePrincipal = principal + loaned;

    // Actual amount received (minus upfront fees)
    const actualReceived = principal - upfront;

    // Convert annual rate to periodic rate based on compounding
    const periodicRate = rate / compounding;

    // Convert to effective monthly rate
    const effectiveMonthlyRate = Math.pow(1 + periodicRate, compounding / 12) - 1;

    // Calculate monthly payment using standard loan formula
    const monthlyPayment = effectivePrincipal *
      (effectiveMonthlyRate * Math.pow(1 + effectiveMonthlyRate, totalMonths)) /
      (Math.pow(1 + effectiveMonthlyRate, totalMonths) - 1);

    // Total amount paid
    const totalPaid = monthlyPayment * totalMonths;

    // Total interest
    const totalInterest = totalPaid - effectivePrincipal;

    // Calculate APR using Newton's method
    // APR equation: actualReceived = sum of (payment / (1 + APR/12)^t) for t = 1 to totalMonths
    let aprGuess = rate; // Start with nominal rate
    const tolerance = 0.000001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const monthlyAPR = aprGuess / 12;
      let presentValue = 0;
      let derivative = 0;

      for (let t = 1; t <= totalMonths; t++) {
        const factor = Math.pow(1 + monthlyAPR, t);
        presentValue += monthlyPayment / factor;
        derivative -= t * monthlyPayment / ((1 + monthlyAPR) * factor);
      }

      const error = presentValue - actualReceived;

      if (Math.abs(error) < tolerance) {
        break;
      }

      aprGuess = aprGuess - (error / (derivative / 12));
    }

    const realAPR = aprGuess * 100;

    setResults({
      realAPR,
      monthlyPayment,
      totalPayments: totalMonths,
      totalInterest,
      totalPaid,
      nominalRate: rate * 100
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
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
        {/* Page Title Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            APR Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the true Annual Percentage Rate of your loan including all fees and charges
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <Card className="border-2 rounded-2xl shadow-lg lg:col-span-1 h-fit sticky top-24">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Loan Details
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
                  placeholder="100000"
                />
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
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Plus Months
                  </label>
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

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Interest Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="6.0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors"
                >
                  <option value="1">Annually</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="24">Semi-monthly</option>
                  <option value="26">Bi-weekly</option>
                  <option value="52">Weekly</option>
                  <option value="365">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Payment Frequency
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-emerald-400 focus:outline-none transition-colors"
                >
                  <option value="1">Yearly</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="24">Semi-monthly</option>
                  <option value="26">Bi-weekly</option>
                  <option value="52">Weekly</option>
                  <option value="365">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Loaned Fees ($)
                </label>
                <Input
                  type="number"
                  value={loanedFees}
                  onChange={(e) => setLoanedFees(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-slate-500 mt-1">Fees added to loan amount</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Upfront Fees ($)
                </label>
                <Input
                  type="number"
                  value={upfrontFees}
                  onChange={(e) => setUpfrontFees(e.target.value)}
                  placeholder="1500"
                />
                <p className="text-xs text-slate-500 mt-1">Fees paid upfront from loan</p>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                Calculate APR
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Percent className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Real APR</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatPercentage(results.realAPR)}</p>
                    <p className="text-emerald-100">Annual Percentage Rate (including all fees)</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Monthly Payment</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.monthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Number of Payments</span>
                        <span className="font-semibold text-lg">{results.totalPayments.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Nominal Rate</span>
                        <span className="font-semibold text-lg">{formatPercentage(results.nominalRate)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Total Costs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Total Interest</span>
                        <span className="font-semibold text-lg text-rose-600">{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Total Paid</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.totalPaid)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">APR Difference</span>
                        <span className="font-semibold text-lg text-amber-600">
                          {formatPercentage(results.realAPR - results.nominalRate)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Info Box */}
                <Card className="border-2 border-blue-200 bg-blue-50 rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-slate-700">
                          <strong>Real APR vs. Nominal Rate:</strong> The Real APR of {formatPercentage(results.realAPR)} is
                          {results.realAPR > results.nominalRate ? ' higher' : ' lower'} than the nominal interest rate
                          of {formatPercentage(results.nominalRate)} because it accounts for all fees and charges associated with the loan.
                          This gives you a more accurate picture of the true cost of borrowing.
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
                  Enter your loan details and click Calculate to see your real APR
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding APR</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is APR and Why Does It Matter?</h3>
                <p className="mb-4">
                  When you're shopping for a loan, you'll come across two important numbers: the interest rate and the APR (Annual Percentage Rate). While they might seem similar at first glance, they tell very different stories about what you'll actually pay. The interest rate is straightforward—it's the percentage charged on your principal loan amount. But APR? That's where things get interesting, and frankly, more useful for comparing loans.
                </p>
                <p className="mb-4">
                  Think of APR as the full cost of borrowing rolled into one annual percentage. It takes your interest rate and adds in all those annoying fees that lenders love to tack on: origination fees, processing charges, closing costs, and any other expenses required to get the loan. When you see an APR that's higher than the stated interest rate, you're looking at the real cost of your loan. This is precisely why savvy borrowers always compare APRs rather than just interest rates when they're loan shopping.
                </p>
                <p>
                  Here's a real-world scenario that illustrates why this matters. Let's say you're comparing two $100,000 loans. Lender A offers 6% interest with $500 in fees, while Lender B advertises 5.75% with $3,000 in fees. At first, Lender B looks better, right? Lower rate! But once you calculate the APR for both loans, you might discover that Lender A's total cost is actually lower. That's the power of understanding APR—it cuts through the marketing fluff and shows you what you'll really pay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">APR vs. Interest Rate: The Critical Distinction</h3>
                <p className="mb-4">
                  The fundamental difference between APR and interest rate comes down to what each one includes. Your interest rate is purely the cost of borrowing the principal—nothing more, nothing less. It's the percentage the lender charges you for the privilege of using their money. Simple enough, right?
                </p>
                <p className="mb-4">
                  APR, on the other hand, is comprehensive. It's designed to give you an apples-to-apples comparison between different loan offers by incorporating both the interest rate and the cost of fees spread out over the life of the loan. When a lender quotes you an APR, they're essentially saying, "If we took all the costs—interest, fees, charges—and converted them into one annual percentage, this is what you'd pay."
                </p>
                <p>
                  The gap between interest rate and APR can vary dramatically depending on the loan type and lender. For mortgages, where fees can run into thousands of dollars, you might see a significant spread. Personal loans with minimal fees might show only a slight difference. But don't let a small gap fool you into complacency. Even a difference of 0.25% on a large, long-term loan can translate to thousands of dollars over the repayment period.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of Fees That Impact Your APR</h3>
                <p className="mb-4">
                  Not all loan fees are created equal, and understanding which ones affect your APR helps demystify the calculation. Generally speaking, any fee that's required to get the loan will factor into the APR. This includes origination fees (those upfront charges for processing your loan), discount points (prepaid interest that lowers your rate), and various administrative fees like underwriting or processing charges.
                </p>
                <p className="mb-4">
                  For mortgage loans specifically, the APR calculation gets even more involved. You're looking at private mortgage insurance (PMI) if you put down less than 20%, mortgage broker fees if you use a broker, and sometimes even prepaid interest for the period between closing and your first payment. These all get baked into the APR, giving you a true picture of your borrowing costs.
                </p>
                <p className="mb-4">
                  However, some costs aren't included in APR calculations, which can be a bit confusing. Title insurance, appraisal fees, home inspection costs, and property surveys typically don't count toward APR because they're considered costs of buying the property rather than costs of the loan itself. Same goes for most third-party fees that aren't directly related to securing financing. Understanding this distinction helps explain why your APR might not capture absolutely every dollar you spend during the loan process.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed vs. Variable APR: What You Need to Know</h3>
                <p className="mb-4">
                  Just as loans can have fixed or variable interest rates, APRs come in both flavors too. A fixed APR means exactly what it sounds like—your rate stays constant for the entire loan term. You'll pay the same percentage year after year, which makes budgeting straightforward and eliminates uncertainty. Most people prefer fixed APRs for large, long-term loans because they provide predictability. You know exactly what you're signing up for, and no market fluctuations will catch you off guard.
                </p>
                <p className="mb-4">
                  Variable APRs, sometimes called adjustable rates, are a different beast altogether. These rates can change over time based on market conditions and specific index rates like the federal funds rate or LIBOR (now being phased out in favor of SOFR). Lenders typically advertise variable APRs with a lower starting rate than comparable fixed options, which can look attractive initially. The trade-off? Your monthly payment could increase if rates rise, potentially by a lot.
                </p>
                <p className="mb-4">
                  Variable APR loans often come with rate caps—limits on how much your rate can increase during each adjustment period and over the life of the loan. For example, you might see something like "2/6 caps," meaning your rate can't increase more than 2% per adjustment period or 6% total over the loan's lifetime. These protections are important, but even with caps, variable rates introduce uncertainty into your financial planning.
                </p>
                <p>
                  When should you consider a variable APR? If you plan to pay off the loan quickly—say, within a few years—you might benefit from that lower initial rate without experiencing many (or any) rate increases. Similarly, if you expect your income to rise significantly or you're comfortable with some payment fluctuation, variable rates can work in your favor. But for most long-term borrowing, especially when you're stretching your budget, fixed APRs provide peace of mind that's hard to beat.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How APR is Calculated</h3>
                <p className="mb-4">
                  The mathematics behind APR calculation can seem intimidating, but understanding the basic concept helps you make better decisions. Essentially, lenders work backward from your loan terms to find an effective rate that accounts for all costs. They start with the actual amount of money you receive (loan amount minus upfront fees), then factor in your payment schedule and the total amount you'll repay (including interest and financed fees).
                </p>
                <p className="mb-4">
                  Using an iterative mathematical process, they find the annual rate that makes the present value of all your future payments equal to the net amount you borrowed. This calculation assumes you'll keep the loan for its full term and make all payments on schedule. For monthly payments, the formula compounds the rate monthly, which is why you'll often see APR slightly higher than the simple interest rate even before fees are added.
                </p>
                <p>
                  Here's where it gets practical: if you're quoted a loan with 6% interest and $1,500 in upfront fees on a $100,000, 10-year loan, the lender calculates what rate would give you the same cost structure if those fees were spread out over 120 monthly payments rather than paid upfront. That's your APR—in this case, probably around 6.3% or so. The larger the fees relative to your loan amount and the shorter your loan term, the bigger the gap between your interest rate and APR.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">APR Limitations and Considerations</h3>
                <p className="mb-4">
                  While APR is incredibly useful for comparing loans, it's not perfect, and you should understand its limitations. The biggest assumption in APR calculations is that you'll keep the loan for its entire term. In reality, many borrowers refinance or pay off loans early—especially mortgages. When you do this, those upfront fees get spread over fewer payments, effectively increasing your true cost above what the original APR indicated.
                </p>
                <p className="mb-4">
                  Let's say you take out a mortgage with significant closing costs, then refinance after three years. Those thousands of dollars in fees were amortized over 30 years in the APR calculation, but you only benefited from them for three years. Your actual cost per year was much higher than the stated APR suggested. This is why some financial advisors recommend calculating a "true APR" based on how long you realistically expect to keep the loan.
                </p>
                <p className="mb-4">
                  For adjustable-rate loans, APR calculations become even more theoretical. Since future rate adjustments are unknown, lenders typically calculate APR assuming the initial rate stays constant—which obviously won't happen with a variable-rate loan. This makes APR comparisons between fixed and adjustable loans somewhat problematic. You're comparing a known fixed cost against a hypothetical variable cost that will almost certainly be different from what's advertised.
                </p>
                <p>
                  Another quirk: APR doesn't account for how often interest compounds. Two loans with the same APR but different compounding frequencies (monthly vs. daily, for example) will have slightly different actual costs. For most consumer loans this difference is minimal, but it's worth understanding that APR isn't the ultimate, final word on loan cost—it's a standardized comparison tool that works best when you're comparing similar loan products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using APR to Compare Loans Effectively</h3>
                <p className="mb-4">
                  When you're shopping for loans, APR becomes your best friend—but only if you use it correctly. The most important rule: compare APRs for the same loan terms and types. A 15-year mortgage APR won't be directly comparable to a 30-year mortgage APR because the fees get spread differently. Similarly, comparing a personal loan APR to a mortgage APR doesn't make much sense since they're fundamentally different products with different fee structures.
                </p>
                <p className="mb-4">
                  Start by getting loan estimates from multiple lenders for identical terms. Ask each one for the APR, not just the interest rate. When you see a lender advertising an attractively low rate but a much higher APR, that's your red flag that fees are substantial. Conversely, if a lender's APR is only slightly higher than the interest rate, you're looking at a low-fee loan—which might be ideal if you're uncertain about keeping the loan long-term.
                </p>
                <p className="mb-4">
                  Don't stop at APR, though. Ask about prepayment penalties, late fees, and any other costs that aren't captured in the APR calculation. Some lenders offset low APRs with aggressive penalty structures. Also consider the loan features beyond just cost. A slightly higher APR might be worth it if the lender offers better customer service, more flexible payment options, or the ability to modify loan terms down the road.
                </p>
                <p>
                  Finally, remember that your personal situation matters more than any advertised APR. If you know you'll pay off a loan early, the upfront fee structure matters more than APR. If you're taking a loan to your absolute maximum budget, stability (fixed rate) might trump a lower variable APR. Use APR as your starting point for comparison, but make your final decision based on the complete picture of what each loan offers and what your financial situation actually needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">APR for Different Loan Types</h3>
                <p className="mb-4">
                  Different types of loans handle APR differently, and knowing these distinctions helps you navigate specific borrowing situations. Mortgage APRs tend to be higher than the base interest rate because mortgages involve substantial upfront costs—often thousands of dollars in origination fees, points, and various closing charges. For a $300,000 mortgage, it's not uncommon to see $5,000 to $10,000 in total fees, which can add 0.25% to 0.5% or more to your APR depending on the loan term.
                </p>
                <p className="mb-4">
                  Auto loans typically show smaller gaps between interest rate and APR because dealerships and lenders compete heavily and often minimize fees to advertise lower rates. You might see APRs only 0.1% to 0.2% above the interest rate. However, watch out for dealer-arranged financing, where hidden fees in the paperwork can artificially inflate your APR compared to direct lender financing.
                </p>
                <p className="mb-4">
                  Personal loans vary widely. Traditional bank personal loans might have minimal fees and thus minimal APR markup, while online lenders sometimes charge origination fees of 1% to 6% of the loan amount, significantly impacting APR. Credit cards present a unique case—they typically advertise APR directly rather than separating it from interest rate, and card APRs usually don't include annual fees or late payment charges, focusing purely on the cost of carried balances.
                </p>
                <p>
                  Student loans are another special case. Federal student loans have fixed interest rates set by Congress and minimal fees (usually around 1% origination fee), resulting in APRs very close to the stated rate. Private student loans behave more like personal loans, with variable fees and APRs that reflect the lender's complete cost structure. For any loan type, the key is understanding which fees are typical for that product and which indicate you should probably shop elsewhere for better terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">APR and Your Credit Score Connection</h3>
                <p className="mb-4">
                  Your credit score plays a massive role in determining what APR you'll be offered, often making a bigger difference than any other factor. Lenders use your credit score as a primary indicator of risk—higher scores suggest you're more likely to repay on time, so lenders reward you with lower rates. The spread between excellent and poor credit can be dramatic. For example, on a mortgage, someone with a 760+ credit score might qualify for a 6% APR, while someone with a 620 score could be looking at 8% or higher—a difference that costs tens of thousands of dollars over a 30-year loan.
                </p>
                <p className="mb-4">
                  The interesting thing is that your credit score affects both the base interest rate and sometimes the fees, which means the APR impact is compounded. Some lenders charge higher origination fees to riskier borrowers in addition to higher interest rates. Others might require private mortgage insurance at lower credit scores, further increasing your effective APR. This creates a frustrating cycle where people who can least afford higher payments end up paying the most for credit.
                </p>
                <p>
                  The good news? You have more control over your credit score than you might think. Paying bills on time consistently, keeping credit utilization low (using less than 30% of available credit), and maintaining a mix of credit types all boost your score over time. Before applying for a major loan, it's often worth spending six months to a year improving your credit score—the APR reduction you'll earn can easily pay for any effort involved. Even a half-point reduction in APR on a large loan can save you thousands of dollars, making credit improvement one of the best investments you can make.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common APR Mistakes to Avoid</h3>
                <p className="mb-4">
                  One of the most common mistakes borrowers make is focusing exclusively on the monthly payment amount while ignoring APR. Lenders know that many people shop based on whether they can afford the monthly payment, so they'll extend loan terms to lower payments—even though this dramatically increases the total cost via higher APR and more interest over time. A $30,000 car loan at 7% APR over five years costs about $4,600 in interest, but stretch it to seven years and you'll pay nearly $6,500 in interest. The monthly payment might fit your budget better, but you're paying almost $2,000 extra for that convenience.
                </p>
                <p className="mb-4">
                  Another trap is believing that APR tells you everything about a loan's total cost. Remember, APR assumes you'll keep the loan for its full term and make exactly the scheduled payments. Pay extra? Your effective cost goes down. Refinance early? Your effective cost goes up because those upfront fees got spread over fewer payments than assumed. APR is a comparison tool, not a predictor of your actual costs unless you follow the exact payment schedule.
                </p>
                <p className="mb-4">
                  Many borrowers also make the mistake of not asking why there's a big gap between interest rate and APR. If you're quoted 5% interest but 6% APR, something significant is buried in the fees. Ask for an itemized breakdown. Sometimes these fees are negotiable, or you might discover charges for services you don't actually need. Lenders won't usually volunteer to remove fees, but asking can save you hundreds or thousands of dollars.
                </p>
                <p>
                  Finally, don't fall for the teaser rate trap with variable APR products. That low initial rate might look fantastic, but if it's significantly below market rates for similar products, it's almost certainly going to adjust upward soon—possibly dramatically. Always ask for the loan's lifetime cap and what the highest possible APR could be, then consider whether you could afford payments at that rate. If not, a variable APR product probably isn't right for you, regardless of how attractive the initial offer looks.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Calculator className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-500">Calculate loan payments and amortization</div>
                  </div>
                </Link>

                <Link href="/interest" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Interest Calculator</div>
                    <div className="text-sm text-slate-500">Compare simple and compound interest</div>
                  </div>
                </Link>

                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-500">Calculate monthly mortgage payments</div>
                  </div>
                </Link>

                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Calculator className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Auto Loan Calculator</div>
                    <div className="text-sm text-slate-500">Calculate car loan payments and costs</div>
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
            <Link href="/contact" className="hover:text-emerald-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors font-medium">
              Terms of Service
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
