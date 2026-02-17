"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, Target, Shield } from "lucide-react";

interface KellyResults {
  kellyFraction: number;
  fullKellyBet: number;
  halfKellyBet: number;
  quarterKellyBet: number;
  edge: number;
  expectedGrowthRate: number;
  odds: number;
  hasEdge: boolean;
}

export default function PolymarketKellyCalculator() {
  const [bankroll, setBankroll] = useState<string>("10000");
  const [marketPrice, setMarketPrice] = useState<string>("0.60");
  const [trueProbability, setTrueProbability] = useState<string>("0.70");

  const [results, setResults] = useState<KellyResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const bank = parseFloat(bankroll) || 10000;
    const mp = Math.min(0.99, Math.max(0.01, parseFloat(marketPrice) || 0.60));
    const tp = Math.min(0.99, Math.max(0.01, parseFloat(trueProbability) || 0.70));

    // Binary bet odds: buying YES at marketPrice pays 1/marketPrice, so net odds = (1 - marketPrice) / marketPrice
    const b = (1 - mp) / mp;
    const p = tp;
    const q = 1 - p;

    // Kelly fraction: f* = (b*p - q) / b
    const kellyFraction = (b * p - q) / b;
    const hasEdge = kellyFraction > 0;

    const fullKellyBet = hasEdge ? kellyFraction * bank : 0;
    const halfKellyBet = fullKellyBet / 2;
    const quarterKellyBet = fullKellyBet / 4;

    // Edge = true probability - market price (simplified for YES bets)
    const edge = (tp - mp) * 100;

    // Expected growth rate: g = p * ln(1 + f*b) + q * ln(1 - f)
    let expectedGrowthRate = 0;
    if (hasEdge && kellyFraction > 0 && kellyFraction < 1) {
      expectedGrowthRate = p * Math.log(1 + kellyFraction * b) + q * Math.log(1 - kellyFraction);
    }

    setResults({
      kellyFraction,
      fullKellyBet,
      halfKellyBet,
      quarterKellyBet,
      edge,
      expectedGrowthRate,
      odds: b,
      hasEdge,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Prediction Market Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Polymarket Kelly Criterion Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate optimal position sizes for Polymarket trades using the Kelly Criterion formula to maximize long-term bankroll growth while managing risk
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar - Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Position Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bankroll
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={bankroll}
                      onChange={(e) => setBankroll(e.target.value)}
                      className="pl-7"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Market Price (0.01 - 0.99)
                  </label>
                  <Input
                    type="number"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(e.target.value)}
                    placeholder="0.60"
                    step="0.01"
                    min="0.01"
                    max="0.99"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    The current YES price on Polymarket (e.g., 0.60 = 60 cents)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Estimated True Probability (0.01 - 0.99)
                  </label>
                  <Input
                    type="number"
                    value={trueProbability}
                    onChange={(e) => setTrueProbability(e.target.value)}
                    placeholder="0.70"
                    step="0.01"
                    min="0.01"
                    max="0.99"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Your estimate of the actual probability the event occurs
                  </p>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Kelly Bet
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area - Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Full Kelly Bet */}
                <Card className="border-2 border-orange-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className={`p-8 text-white ${results.hasEdge ? "bg-gradient-to-r from-orange-500 to-amber-600" : "bg-gradient-to-r from-slate-500 to-slate-600"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {results.hasEdge ? "Full Kelly Bet" : "No Edge Detected"}
                      </h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {results.hasEdge ? formatCurrency(results.fullKellyBet) : "$0.00"}
                    </p>
                    <p className="text-orange-100">
                      {results.hasEdge
                        ? `${formatPercentage(results.kellyFraction * 100)} of your bankroll`
                        : "The market price is equal to or higher than your estimated probability. Do not bet."}
                    </p>
                  </div>
                </Card>

                {/* Sizing Options Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Full Kelly */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        Full Kelly
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <span className="font-bold text-2xl text-orange-600">
                          {formatCurrency(results.fullKellyBet)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600 text-sm">% of Bankroll:</span>
                        <span className="font-semibold text-sm">
                          {formatPercentage(results.hasEdge ? results.kellyFraction * 100 : 0)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Maximum growth but highest volatility</p>
                    </CardContent>
                  </Card>

                  {/* Half Kelly */}
                  <Card className="border-2 border-amber-300 rounded-2xl shadow-md hover:shadow-lg transition-shadow ring-2 ring-amber-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Shield className="h-5 w-5 text-amber-600" />
                        Half Kelly
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Recommended</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <span className="font-bold text-2xl text-amber-600">
                          {formatCurrency(results.halfKellyBet)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600 text-sm">% of Bankroll:</span>
                        <span className="font-semibold text-sm">
                          {formatPercentage(results.hasEdge ? (results.kellyFraction * 100) / 2 : 0)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">75% of max growth, much lower variance</p>
                    </CardContent>
                  </Card>

                  {/* Quarter Kelly */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Shield className="h-5 w-5 text-green-600" />
                        Quarter Kelly
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <span className="font-bold text-2xl text-green-600">
                          {formatCurrency(results.quarterKellyBet)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600 text-sm">% of Bankroll:</span>
                        <span className="font-semibold text-sm">
                          {formatPercentage(results.hasEdge ? (results.kellyFraction * 100) / 4 : 0)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Conservative approach, minimal drawdowns</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Risk Analysis */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-orange-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Your Edge</div>
                        <div className={`text-xl font-bold ${results.edge > 0 ? "text-orange-600" : "text-rose-600"}`}>
                          {results.edge > 0 ? "+" : ""}{formatPercentage(results.edge)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">True prob minus market price</div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Expected Growth Rate</div>
                        <div className="text-xl font-bold text-amber-600">
                          {results.hasEdge ? formatPercentage(results.expectedGrowthRate * 100) : "0.00%"}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Per bet at full Kelly</div>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Implied Odds</div>
                        <div className="text-xl font-bold text-yellow-700">
                          {results.odds.toFixed(2)} : 1
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Net payout ratio on YES shares</div>
                      </div>
                    </div>

                    {results.hasEdge && results.kellyFraction > 0.25 && (
                      <div className="flex items-start gap-4 p-4 bg-rose-50 rounded-xl border border-rose-200">
                        <div className="p-2 bg-rose-100 rounded-lg">
                          <Shield className="h-5 w-5 text-rose-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-rose-800 mb-1">High Volatility Warning</h4>
                          <p className="text-sm text-rose-700">
                            Full Kelly suggests betting {formatPercentage(results.kellyFraction * 100)} of your bankroll. At this level, expect significant swings. Half Kelly or quarter Kelly is strongly recommended to reduce the risk of large drawdowns, especially if your probability estimate could be off by even a few percentage points.
                          </p>
                        </div>
                      </div>
                    )}

                    {!results.hasEdge && (
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <Shield className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">No Positive Edge</h4>
                          <p className="text-sm text-slate-600">
                            Your estimated true probability ({formatPercentage(parseFloat(trueProbability) * 100)}) does not exceed the market price ({formatPercentage(parseFloat(marketPrice) * 100)}). The Kelly Criterion recommends not placing this bet. Either the market is fairly priced or you need to reassess your probability estimate.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your bankroll, market price, and estimated probability to see optimal bet sizing
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Understanding Kelly Criterion for Polymarket</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is the Kelly Criterion and Why It Matters for Polymarket</h3>
                <p className="mb-4">
                  The Kelly Criterion is a mathematical formula developed by John L. Kelly Jr. at Bell Labs in 1956. It was originally designed for optimizing bets in information theory, but traders and gamblers quickly realized its power: it tells you exactly what fraction of your bankroll to wager on any bet where you believe you have an edge, in order to maximize the long-term growth rate of your capital.
                </p>
                <p className="mb-4">
                  On Polymarket, you are buying and selling shares in binary outcome markets. A YES share priced at $0.60 implies a 60% market probability that the event occurs. If you believe the true probability is actually 70%, you have a 10 percentage point edge. But knowing you have an edge is only half the battle. The critical question is how much to bet. Bet too little and you leave money on the table. Bet too much and a string of losses can devastate your bankroll, even when you have a genuine edge.
                </p>
                <p>
                  The Kelly formula answers this question precisely. For a binary bet where you pay the market price and receive $1 if your side wins, the formula is: f* = (b * p - q) / b, where b is the net odds you receive (calculated as (1 - marketPrice) / marketPrice), p is your estimated true probability of winning, and q is 1 - p. The result f* is the fraction of your bankroll you should bet. If f* is zero or negative, you have no edge and should not bet at all.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Half Kelly Is Usually the Better Choice</h3>
                <p className="mb-4">
                  Full Kelly sizing is mathematically optimal for maximizing long-term growth, but it comes with a brutal trade-off: extreme volatility. Under full Kelly, it is perfectly normal to experience drawdowns of 50% or more of your bankroll before recovering. Most people, even experienced traders, find this psychologically unbearable and end up abandoning their strategy at exactly the wrong time.
                </p>
                <p className="mb-4">
                  Half Kelly, which simply means betting half of what the full Kelly formula suggests, offers a compelling alternative. You sacrifice only about 25% of the theoretical maximum growth rate, but you cut the variance roughly in half. Your drawdowns become far more manageable, your equity curve is smoother, and you are much less likely to blow up from estimation errors. In practice, many professional bettors and traders consider half Kelly to be the true sweet spot between growth and survival.
                </p>
                <p>
                  There is another critical reason to use fractional Kelly on Polymarket specifically. The Kelly formula assumes you know the true probability exactly. In reality, your probability estimate is just that, an estimate. If you think an event has a 70% chance of occurring, the real probability might be 65% or 75%. Full Kelly is extremely sensitive to these estimation errors. Overestimating your edge by even a small amount can turn what should be a profitable strategy into a losing one. Fractional Kelly provides a natural buffer against this uncertainty.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How to Estimate Your Edge Accurately</h3>
                <p className="mb-4">
                  The entire Kelly system depends on having a genuine edge, which means your probability estimate needs to be better than the market consensus. This is harder than most people think. Polymarket prices aggregate the views of thousands of participants, many of whom are sophisticated. Consistently beating this collective wisdom requires either superior information, superior analysis, or faster reaction to new information.
                </p>
                <p className="mb-4">
                  One practical approach is to build a base rate from historical data. If you are betting on whether a political candidate will win, look at polling averages, prediction model outputs, and historical accuracy of similar polls. If you are betting on a corporate event, examine precedent from similar situations. The key is to ground your estimate in data rather than gut feeling. Gut feelings are systematically overconfident, which leads to overestimating your edge, which leads to overbetting.
                </p>
                <p>
                  A useful discipline is to ask yourself: if the market price is 60% and I think it should be 70%, what do I know that the market does not? If you cannot articulate a specific, concrete reason for your disagreement with the market, you probably do not have a real edge. Markets are not always right, but they are right often enough that the burden of proof should be on you to justify why you are smarter than the consensus in this particular case.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Mistakes with Kelly Sizing</h3>
                <p className="mb-4">
                  The most dangerous mistake is overestimating your edge. If you think you have a 15% edge but your real edge is only 5%, full Kelly will have you betting three times too much. Over many bets, this does not just reduce your returns. It can actually cause your bankroll to shrink. The math is unforgiving: overbetting by a factor of two relative to the true Kelly fraction produces zero expected growth, and overbetting by more than that produces negative expected growth. This is why fractional Kelly is so important as insurance against estimation error.
                </p>
                <p className="mb-4">
                  Another common mistake is ignoring correlated bets. If you have positions in five different markets that all depend on the same underlying event, such as several markets related to the outcome of a single election, you are effectively making one large bet, not five independent ones. Kelly sizing should be applied to your total exposure to correlated outcomes, not to each market individually. Failing to account for correlation leads to dramatically oversized positions.
                </p>
                <p className="mb-4">
                  A third mistake is applying Kelly to markets where you have no genuine informational edge. If you are simply looking at a market priced at 50% and guessing it should be 60% based on a hunch, the Kelly formula will happily tell you to bet 20% of your bankroll. But the formula is only as good as its inputs. Garbage probability estimates produce garbage bet sizes. Kelly does not create edge; it only helps you size bets optimally when you already have one.
                </p>
                <p>
                  Finally, many people forget that Kelly assumes you can make the same bet repeatedly. A single Polymarket position resolving once is not quite the same as the repeated-bet scenario Kelly was designed for. For one-off bets with no opportunity to learn and adjust, even more conservative sizing (quarter Kelly or less) makes sense, because you have no chance to recover from the variance of a single outcome.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Related Polymarket Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/polymarket-ev" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">EV Calculator</div>
                    <div className="text-sm text-slate-500">Calculate expected value of trades</div>
                  </div>
                </Link>

                <Link href="/polymarket-arbitrage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Arbitrage Calculator</div>
                    <div className="text-sm text-slate-500">Find risk-free arbitrage opportunities</div>
                  </div>
                </Link>

                <Link href="/polymarket-probability" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Probability Calculator</div>
                    <div className="text-sm text-slate-500">Convert odds and implied probabilities</div>
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
            <Link href="/about" className="hover:text-orange-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-orange-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-orange-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            &copy; 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
