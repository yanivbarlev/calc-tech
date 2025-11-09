"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, Calendar, Target } from "lucide-react";

interface ROIResults {
  investmentGain: number;
  roi: number;
  annualizedROI: number;
  investmentLength: number;
}

export default function ROICalculator() {
  const [amountInvested, setAmountInvested] = useState<string>("50000");
  const [amountReturned, setAmountReturned] = useState<string>("70000");
  const [investmentYears, setInvestmentYears] = useState<string>("2");

  const [results, setResults] = useState<ROIResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const invested = parseFloat(amountInvested) || 50000;
    const returned = parseFloat(amountReturned) || 70000;
    const years = parseFloat(investmentYears) || 2;

    // Calculate investment gain
    const gain = returned - invested;

    // Calculate ROI percentage: (Gain / Cost) * 100
    const roiPercentage = (gain / invested) * 100;

    // Calculate annualized ROI: [(1 + ROI)^(1/years) - 1] * 100
    const annualizedROI = (Math.pow(1 + (roiPercentage / 100), 1 / years) - 1) * 100;

    setResults({
      investmentGain: gain,
      roi: roiPercentage,
      annualizedROI: annualizedROI,
      investmentLength: years,
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
            <TrendingUp className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            ROI Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your return on investment percentage and annualized ROI to evaluate investment performance across stocks, real estate, and business ventures
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar - Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Amount Invested
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={amountInvested}
                      onChange={(e) => setAmountInvested(e.target.value)}
                      className="pl-7"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Amount Returned
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={amountReturned}
                      onChange={(e) => setAmountReturned(e.target.value)}
                      className="pl-7"
                      placeholder="70000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Investment Length (Years)
                  </label>
                  <Input
                    type="number"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(e.target.value)}
                    placeholder="2"
                    step="0.1"
                  />
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate ROI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area - Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - ROI Percentage */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Return on Investment (ROI)</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatPercentage(results.roi)}</p>
                    <p className="text-emerald-100">
                      Your investment {results.roi >= 0 ? 'gained' : 'lost'} {formatCurrency(Math.abs(results.investmentGain))}
                    </p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Investment Gain */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Investment Gain/Loss
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Gain:</span>
                        <span className={`font-semibold text-lg ${results.investmentGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(results.investmentGain)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Amount Invested:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(amountInvested) || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Amount Returned:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(amountReturned) || 0)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Annualized ROI */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Time-Adjusted Returns
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Annualized ROI:</span>
                        <span className="font-semibold text-lg text-emerald-600">
                          {formatPercentage(results.annualizedROI)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Investment Period:</span>
                        <span className="font-semibold">{results.investmentLength} {results.investmentLength === 1 ? 'year' : 'years'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total ROI:</span>
                        <span className="font-semibold">{formatPercentage(results.roi)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Indicator */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${results.roi >= 0 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                        <TrendingUp className={`h-6 w-6 ${results.roi >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {results.roi >= 20 ? 'Excellent Return!' : results.roi >= 10 ? 'Good Return' : results.roi >= 0 ? 'Positive Return' : 'Negative Return'}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {results.roi >= 20
                            ? 'Your investment significantly outperformed typical market returns. This represents a strong investment performance.'
                            : results.roi >= 10
                            ? 'Your investment shows solid returns, performing well above many traditional investments.'
                            : results.roi >= 0
                            ? 'Your investment generated positive returns. The annualized ROI helps compare this to other time-period investments.'
                            : 'Your investment experienced a loss. Consider reviewing your investment strategy and risk tolerance.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate ROI
                </h3>
                <p className="text-slate-500">
                  Enter your investment details and click calculate to see your return on investment
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Return on Investment (ROI)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is ROI and Why Does It Matter?</h3>
                <p className="mb-4">
                  Return on Investment, commonly abbreviated as ROI, serves as one of the most fundamental metrics for evaluating investment performance. At its core, ROI tells you whether you made or lost money on an investment—and by how much. The beauty of this metric lies in its simplicity: it compares what you got back to what you originally put in, expressed as a percentage. That makes it incredibly easy to compare completely different types of investments, whether you're looking at stocks, real estate, business ventures, or even education.
                </p>
                <p className="mb-4">
                  The basic formula couldn't be more straightforward. You take your gain from the investment (which could be positive or negative), divide it by the original cost of the investment, and multiply by 100 to get a percentage. So if you invested $50,000 in a property renovation and sold it for $70,000, your gain is $20,000. Divide that by your initial $50,000 and you get 0.4, or 40% ROI. That simple calculation tells you that for every dollar you invested, you earned 40 cents in profit.
                </p>
                <p>
                  But here's where it gets interesting—and where many people stumble. While ROI is fantastically useful for quick comparisons, it has one critical limitation: it doesn't account for time. A 40% return sounds great, but did it take you one year to achieve that, or ten years? That's a massive difference in terms of actual investment performance, and it's why understanding both basic ROI and annualized ROI matters so much for making smart financial decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Time Problem: Why Basic ROI Isn't Enough</h3>
                <p className="mb-4">
                  Let's say two friends each invest $100,000. Sarah puts her money into a real estate development and earns a 50% return—she walks away with $150,000. Meanwhile, David invests in a tech startup and gets a 30% return, netting $130,000. At first glance, Sarah clearly won, right? Well, hold on. Sarah's real estate project took five years to complete, while David's tech investment paid out in just 18 months. When you account for time, the picture changes dramatically.
                </p>
                <p className="mb-4">
                  This is exactly why annualized ROI exists. It converts your total return into an equivalent annual rate, letting you compare investments with different time horizons on equal footing. The calculation uses compound interest principles—it essentially asks, "what steady annual return would have gotten me to this same endpoint?" For Sarah's 50% return over five years, that works out to about 8.45% annually. For David's 30% return over 1.5 years, it's roughly 18.56% per year. Suddenly, David's investment looks significantly better, even though the total return was smaller.
                </p>
                <p>
                  This matters tremendously in real-world decision making. Imagine you're choosing between investing in your business or buying stocks. Your business might promise a 100% return over five years, while the stock market historically averages about 10% annually. Without annualizing that business return (which comes out to about 14.87% per year), you might overestimate how attractive it is compared to simpler, more liquid stock investments. The annualized figure gives you the true apples-to-apples comparison you need.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World ROI Examples Across Different Investment Types</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Stock Market Investments</h4>
                <p className="mb-4">
                  When you invest in stocks, calculating ROI seems simple enough—buy at one price, sell at another. But smart investors factor in dividends too. Let's say you bought 100 shares of a company at $50 each (a $5,000 investment). Over three years, you received $600 in dividends, and the stock price rose to $70 per share. Your total return is $2,600 (the $2,000 stock price increase plus $600 in dividends). That's a 52% ROI, or about 15% annualized. Pretty solid, especially when you remember you can compare this directly to bond yields, savings accounts, or any other investment opportunity.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Real Estate Ventures</h4>
                <p className="mb-4">
                  Real estate ROI gets trickier because there are so many costs to consider. Sure, you bought that rental property for $300,000 and sold it for $400,000 five years later—that's a $100,000 gain. But what about the $30,000 you spent on renovations? The $2,000 annual property taxes? The maintenance costs, vacancy periods, and property management fees? When you add it all up, your actual invested amount might be closer to $360,000, and your net gain after selling costs might be $85,000. That brings your ROI down to about 23.6%, or roughly 4.3% annualized. Still profitable, but suddenly not quite the home run it first appeared to be.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Business Investments</h4>
                <p className="mb-4">
                  Starting or investing in a business requires careful ROI tracking because the timeline can be unpredictable. You might invest $50,000 in a food truck business, then reinvest profits for two years before finally taking distributions. After five years, you sell your stake for $150,000. Your total return is $100,000 on a $50,000 investment—that's 200% ROI, or about 24.6% annualized. Sounds amazing, until you factor in that you worked in the business, took financial risk, and had your capital tied up for five years. Comparing that annualized return to simply investing in index funds (around 10% historically) helps you see whether your time and effort paid off beyond just parking money in the market.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Education and Career Investments</h4>
                <p>
                  Here's an unconventional but important use of ROI—evaluating education expenses. Say you spend $80,000 on a specialized master's degree that takes two years to complete. Your salary jumps from $60,000 to $90,000 annually afterward. Over ten years (accounting for the two years of school and eight years working), that extra $30,000 per year totals $240,000 in additional earnings. Your ROI is 200%, or about 11.6% annualized. That helps you compare whether the degree was worth it versus other uses of that $80,000 and two years of your life. Of course, there are intangible benefits too, but the ROI gives you a financial baseline for the decision.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Pitfalls and Limitations of ROI Calculations</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The "What Counts as Cost?" Problem</h4>
                <p className="mb-4">
                  One of the biggest challenges with ROI is that different people calculate costs differently, which makes comparing ROIs across different sources nearly impossible sometimes. When someone tells you their investment property generated a 35% ROI, what did they include? Just the purchase price? Or did they factor in closing costs, renovations, property taxes, insurance, maintenance, vacancy periods, and selling costs? There's no universal standard, which means a 35% ROI from one investor might represent what another would calculate as 18% ROI.
                </p>
                <p className="mb-4">
                  This inconsistency particularly affects real estate and business investments. In contrast, stock investments tend to be more standardized—you buy, you sell, you count dividends, done. But with real estate or businesses, every investor makes different decisions about what to include. Some count their own labor as cost, others don't. Some include opportunity costs, others ignore them. The lesson here is to be extremely detailed and conservative when calculating your own ROI, and very skeptical when evaluating ROI claims from others.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Risk Isn't Reflected in ROI</h4>
                <p className="mb-4">
                  A 20% annual ROI sounds pretty similar whether it comes from government bonds or cryptocurrency speculation, right? Wrong. Those two investments carry wildly different risk levels, but ROI tells you nothing about that. Government bonds are about as safe as investments get—you're essentially guaranteed that return (assuming you hold to maturity). Crypto, on the other hand, could just as easily result in a -80% ROI as a +200% ROI. The expected ROI might be 20% in both cases, but the range of possible outcomes is vastly different.
                </p>
                <p className="mb-4">
                  This is why professional investors always consider risk-adjusted returns, not just raw ROI. They use metrics like the Sharpe ratio, which compares return to volatility, giving you a sense of whether higher returns actually compensate for higher risk. For your own investing, the takeaway is simple: never evaluate an investment on ROI alone. A lower, steadier return is often preferable to a higher, more volatile one, especially as you approach retirement or other important financial goals.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Timing Cash Flows: When Basic ROI Falls Short</h4>
                <p className="mb-4">
                  Imagine you invest $100,000 in a business partnership. In year one, you receive $20,000. Year two, another $20,000. Year three, the final $80,000 payout when you sell your stake. Your total return is $120,000 on a $100,000 investment—a clean 20% ROI. But compare that to a different investment: you put in $100,000, receive nothing for two years, then get $120,000 all at once in year three. Same 20% ROI, right? Technically yes, but actually no—these investments perform very differently.
                </p>
                <p>
                  The first investment lets you reinvest those early payouts. If you can reinvest the year one and year two payments at even modest returns, you'll end up far ahead of the second scenario where your money is locked up for three full years. This is where more sophisticated metrics like Internal Rate of Return (IRR) come into play—they account for the timing of cash flows, not just the total amounts. For complex investments with multiple cash flows over time, IRR gives you a more accurate picture than simple ROI. But for straightforward investments with just a single initial outlay and a single final return, basic ROI works just fine.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using ROI to Make Better Investment Decisions</h3>
                <p className="mb-4">
                  The real power of ROI isn't in the calculation itself—it's in how you use it to guide decisions. When you're comparing investment opportunities, calculating expected ROI (even if it's just an educated guess) forces you to think concretely about costs, returns, and timelines. It moves you from vague feelings like "this seems like a good opportunity" to specific numbers you can evaluate and compare.
                </p>
                <p className="mb-4">
                  Start by always calculating annualized ROI for anything beyond a one-year investment. That immediately makes different opportunities comparable. Then, consider the risk level—are you comfortable with the uncertainty involved? Next, think about liquidity. An investment promising 15% annualized ROI doesn't help much if you can't access the money for ten years and you might need it in five. Finally, factor in your own time and expertise. A 20% ROI on a rental property might not be worth it if you're spending ten hours a week dealing with tenants and maintenance, especially if you could earn a 12% ROI on a passive stock investment instead.
                </p>
                <p className="mb-4">
                  One particularly useful approach is to calculate the ROI you'd need to justify an investment. Let's say you're considering a business opportunity that requires $50,000 and significant time over three years. Your alternative is simply investing that money in an index fund at around 10% annually. Your business investment needs to return at least $66,550 (that's $50,000 growing at 10% for three years) just to break even with the simple alternative. That's a 33.1% total ROI, or about 10% annualized. Anything less, and you're better off with the index fund. Anything more starts to compensate you for the extra risk and effort.
                </p>
                <p>
                  Remember, ROI is a tool, not a crystal ball. Your actual returns will vary from your projections—often significantly. The value lies in the thinking process it forces you through. By estimating costs, projecting returns, and annualizing your expected ROI, you build a framework for comparing opportunities rationally. You might still make intuitive decisions based on factors beyond pure ROI (passion for a project, strategic value, personal growth), but at least you'll do so with clear eyes about the financial trade-offs involved.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Beyond the Numbers: When ROI Isn't Everything</h3>
                <p className="mb-4">
                  While ROI is tremendously useful, it's worth acknowledging that not every investment decision should come down to optimizing returns. Sometimes you invest in things for reasons that transcend financial metrics. You might invest in your education not just for salary increases, but for personal fulfillment and career satisfaction. You might invest in starting a business not just for ROI, but for independence and creative expression. You might invest in your community not for financial returns at all, but for social impact and legacy.
                </p>
                <p className="mb-4">
                  That said, even for these "beyond ROI" decisions, calculating the financial returns helps you understand what you're sacrificing or gaining financially. If your passion project business is actually generating a strong ROI, that's wonderful—you're doing what you love and getting paid fairly for it. If it's generating poor ROI, at least you know that explicitly and can decide whether the non-financial benefits justify the financial cost. The number isn't the entire decision, but it's important context.
                </p>
                <p>
                  The key is being honest about your priorities. If you tell yourself an investment is primarily about financial returns, hold it to ROI standards and compare it rigorously to alternatives. If you're investing for other reasons, acknowledge that upfront and be comfortable with potentially lower financial returns. What you want to avoid is fooling yourself—pretending something is a great financial investment when it's really about other values, or sacrificing what you care about because you're chasing ROI without considering what you're giving up. The calculator above helps you with the numbers. The thinking about what really matters beyond the numbers? That part's on you.
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
                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-500">Calculate investment growth over time</div>
                  </div>
                </Link>

                <Link href="/compound-interest" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Compound Interest Calculator</div>
                    <div className="text-sm text-slate-500">See how interest compounds over time</div>
                  </div>
                </Link>

                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Retirement Calculator</div>
                    <div className="text-sm text-slate-500">Plan your retirement savings</div>
                  </div>
                </Link>

                <Link href="/401k" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Target className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">401(k) Calculator</div>
                    <div className="text-sm text-slate-500">Estimate your 401(k) growth</div>
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
  );
}
