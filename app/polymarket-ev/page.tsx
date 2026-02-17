"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, Target, Zap, BarChart3, Percent } from "lucide-react";

interface EVResults {
  expectedValue: number;
  shares: number;
  profitIfYes: number;
  roiIfWins: number;
  lossIfNo: number;
  edge: number;
  kellyFraction: number;
}

export default function PolymarketEVCalculator() {
  const [marketPrice, setMarketPrice] = useState<string>("0.65");
  const [trueProbability, setTrueProbability] = useState<string>("0.75");
  const [positionSize, setPositionSize] = useState<string>("100");

  const [results, setResults] = useState<EVResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const price = parseFloat(marketPrice) || 0.65;
    const trueProb = parseFloat(trueProbability) || 0.75;
    const size = parseFloat(positionSize) || 100;

    const clampedPrice = Math.max(0.01, Math.min(0.99, price));
    const clampedProb = Math.max(0.01, Math.min(0.99, trueProb));

    // Shares purchased = positionSize / marketPrice
    const shares = size / clampedPrice;

    // Profit if event resolves Yes: shares pay $1 each, minus cost
    const profitIfYes = shares * (1 - clampedPrice);

    // ROI if wins
    const roiIfWins = ((1 - clampedPrice) / clampedPrice) * 100;

    // Loss if event resolves No: lose entire position
    const lossIfNo = size;

    // Expected Value = P(yes) * profit - P(no) * loss
    const ev = clampedProb * profitIfYes - (1 - clampedProb) * lossIfNo;

    // Edge = true probability - market price
    const edge = (clampedProb - clampedPrice) * 100;

    // Kelly Criterion fraction: f = (bp - q) / b where b = odds, p = true prob, q = 1-p
    const b = (1 - clampedPrice) / clampedPrice; // decimal odds minus 1
    const kellyFraction = Math.max(0, (b * clampedProb - (1 - clampedProb)) / b) * 100;

    setResults({
      expectedValue: ev,
      shares,
      profitIfYes,
      roiIfWins,
      lossIfNo,
      edge,
      kellyFraction,
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
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatShares = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-xl shadow-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
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
            <Zap className="h-4 w-4" />
            Prediction Markets
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Polymarket EV Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the expected value of a Polymarket position to determine whether a bet has a positive or negative edge based on your estimated true probability
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar - Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Market Position
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Market Price (Yes Share)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={marketPrice}
                      onChange={(e) => setMarketPrice(e.target.value)}
                      className="pl-7"
                      placeholder="0.65"
                      step="0.01"
                      min="0.01"
                      max="0.99"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Current price of a Yes share (0.01 - 0.99)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your True Probability Estimate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={trueProbability}
                      onChange={(e) => setTrueProbability(e.target.value)}
                      placeholder="0.75"
                      step="0.01"
                      min="0.01"
                      max="0.99"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Your estimated probability the event happens (0.01 - 0.99)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Position Size
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={positionSize}
                      onChange={(e) => setPositionSize(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                      min="1"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Amount you plan to invest in dollars</p>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate EV
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area - Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Expected Value */}
                <Card className={`border-2 ${results.expectedValue >= 0 ? "border-emerald-200" : "border-rose-200"} rounded-2xl shadow-lg overflow-hidden`}>
                  <div className={`${results.expectedValue >= 0 ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-gradient-to-r from-rose-600 to-red-600"} p-8 text-white`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Expected Value (EV)</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.expectedValue)}</p>
                    <p className={`${results.expectedValue >= 0 ? "text-emerald-100" : "text-rose-100"} text-lg font-medium`}>
                      {results.expectedValue >= 0 ? "+EV Bet! This position has a positive expected value." : "-EV Bet. This position has a negative expected value."}
                    </p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Profit if Yes */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        If Event Resolves Yes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Shares Bought:</span>
                        <span className="font-semibold text-lg">{formatShares(results.shares)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Profit:</span>
                        <span className="font-semibold text-lg text-emerald-600">
                          {formatCurrency(results.profitIfYes)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">ROI:</span>
                        <span className="font-semibold text-emerald-600">
                          +{results.roiIfWins.toFixed(2)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loss if No */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-rose-600" />
                        If Event Resolves No
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Shares Lost:</span>
                        <span className="font-semibold text-lg">{formatShares(results.shares)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Loss:</span>
                        <span className="font-semibold text-lg text-rose-600">
                          -{formatCurrency(results.lossIfNo)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">ROI:</span>
                        <span className="font-semibold text-rose-600">-100.00%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Edge Indicator */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${results.edge >= 0 ? "bg-emerald-100" : "bg-rose-100"}`}>
                        <Percent className={`h-6 w-6 ${results.edge >= 0 ? "text-emerald-600" : "text-rose-600"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-1">
                          <h4 className="font-semibold text-slate-800">
                            Your Edge: {formatPercentage(results.edge)}
                          </h4>
                          {results.kellyFraction > 0 && (
                            <span className="text-sm text-slate-500">
                              Kelly Criterion: {results.kellyFraction.toFixed(1)}% of bankroll
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {results.edge >= 10
                            ? "Strong edge. The market appears to be significantly underpricing this outcome. Consider whether you have information or analysis that justifies this large discrepancy."
                            : results.edge >= 3
                            ? "Moderate edge. Your probability estimate is meaningfully higher than the market price. If your analysis is sound, this is a favorable position."
                            : results.edge >= 0
                            ? "Slim edge. The expected value is slightly positive, but the margin is thin. Transaction costs or small estimation errors could eliminate your edge."
                            : results.edge >= -5
                            ? "Slightly negative edge. The market price is higher than your probability estimate. This is not a favorable bet at the current price."
                            : "Significantly negative edge. The market is pricing this event much higher than your estimate. Avoid this position or consider buying No shares instead."}
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
                  Ready to Calculate EV
                </h3>
                <p className="text-slate-500">
                  Enter your market position details and click calculate to see the expected value
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Understanding Expected Value in Prediction Markets</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Expected Value and Why It Matters on Polymarket</h3>
                <p className="mb-4">
                  Expected Value (EV) is the single most important concept for anyone trading on prediction markets like Polymarket. In simple terms, EV tells you how much money you can expect to make (or lose) on average from a given position over the long run. It combines the probability of each outcome with the corresponding payoff to produce a single number that captures the overall quality of a bet. A positive EV means the bet is profitable on average; a negative EV means you're expected to lose money over time.
                </p>
                <p className="mb-4">
                  On Polymarket, you buy Yes or No shares at a market-determined price between $0.01 and $0.99. If the event resolves in your favor, each share pays out $1.00. If it doesn't, your shares are worth $0. The market price effectively represents the crowd's consensus probability of the event occurring. When you buy a Yes share at $0.65, the market is saying there's roughly a 65% chance the event happens. Your opportunity lies in identifying situations where you believe the true probability differs from the market price. That gap between your estimate and the market price is your edge, and EV quantifies exactly how valuable that edge is in dollar terms.
                </p>
                <p>
                  The formula is straightforward: multiply your estimated probability of winning by the profit you'd earn if you win, then subtract the probability of losing multiplied by the amount you'd lose. If you buy Yes shares at $0.65 with $100, you get about 153.85 shares. If the event happens, each share pays $0.35 in profit (the difference between $1.00 and $0.65), giving you $53.85 in profit. If it doesn't happen, you lose your $100. With a 75% true probability, your EV is (0.75 x $53.85) - (0.25 x $100) = $40.38 - $25.00 = $15.38. That positive EV of $15.38 means this is a profitable bet if your probability estimate is accurate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How to Estimate True Probabilities</h3>
                <p className="mb-4">
                  The entire EV calculation hinges on one critical input: your estimated true probability. If your probability estimate is wrong, your EV calculation will be wrong too, and you'll think you have an edge when you don't. This is the hardest part of prediction market trading, and it's where the real skill lies. There's no magic formula for estimating probabilities, but there are systematic approaches that can improve your accuracy.
                </p>
                <p className="mb-4">
                  Start with base rates. If you're evaluating a political market, look at historical data for similar situations. How often has the incumbent party won in comparable economic conditions? What do polling aggregates suggest? For sports markets, examine team statistics, recent form, and head-to-head records. For crypto or financial markets, study historical volatility and price action during similar macro environments. Base rates give you a starting point that's grounded in data rather than gut feeling.
                </p>
                <p>
                  Then adjust from the base rate using any unique information or analysis you have. Maybe the polls haven't captured a recent major event. Maybe a key player's injury hasn't been fully priced in. Maybe you have domain expertise that gives you insight the crowd lacks. The key is to be honest about how much your private information actually shifts the probability. Most people are overconfident in their unique insights. A good discipline is to ask yourself: "If I told a smart, informed person my reasoning, would they update their estimate by this much?" If the answer is no, you're probably overestimating your edge. Being well-calibrated matters far more than being confident.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When to Bet: Position Sizing and Risk Management</h3>
                <p className="mb-4">
                  Finding a positive EV opportunity is only half the battle. The other half is deciding how much to risk. Even a strongly +EV bet can ruin you if you bet too much and lose. This is where the Kelly Criterion comes in. Kelly tells you the optimal fraction of your bankroll to wager based on your edge and the odds. The formula produces the bet size that maximizes long-term growth while avoiding ruin. In practice, most experienced traders bet a fraction of Kelly (often half or quarter Kelly) because probability estimates are never perfectly accurate, and being more conservative protects you from estimation errors.
                </p>
                <p className="mb-4">
                  Consider the risk-reward asymmetry in prediction markets. When you buy a Yes share at $0.90, you're risking $0.90 to win $0.10. Even if you're right 95% of the time (a 5% edge), your wins are small and your losses are large. You need a long string of correct predictions to overcome a single loss. Conversely, buying at $0.10 risks $0.10 to win $0.90. Here, even a small edge translates to large percentage returns. This doesn't mean cheap shares are always better, but it does mean you should think carefully about the payoff structure, not just the EV, when sizing positions.
                </p>
                <p>
                  Finally, diversify across markets. Even with solid +EV bets, any single market can resolve against you. By spreading your capital across multiple uncorrelated +EV positions, you smooth out the variance and make it much more likely that your actual results converge toward your expected results. Think of it like a casino: any single hand of blackjack is uncertain, but over thousands of hands, the house edge reliably produces profit. You want to be the house, not the gambler putting everything on a single hand.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Related Polymarket Tools</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/polymarket-roi" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Polymarket ROI Calculator</div>
                    <div className="text-sm text-slate-500">Calculate returns on resolved positions</div>
                  </div>
                </Link>

                <Link href="/polymarket-kelly" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Kelly Criterion Calculator</div>
                    <div className="text-sm text-slate-500">Optimal position sizing for your bankroll</div>
                  </div>
                </Link>

                <Link href="/polymarket-arbitrage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Arbitrage Calculator</div>
                    <div className="text-sm text-slate-500">Find risk-free profit opportunities</div>
                  </div>
                </Link>

                <Link href="/roi" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">ROI Calculator</div>
                    <div className="text-sm text-slate-500">General return on investment calculator</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
