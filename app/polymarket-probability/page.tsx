"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, Target, ArrowRight } from "lucide-react";

type Mode = "priceToProb" | "probToPrice";

interface SingleResult {
  impliedProbability: number;
  trueOdds: string;
  noSideProbability: number;
  breakevenWinRate: number;
  decimalOdds: number;
  price: number;
}

interface BatchRow {
  price: number;
  impliedProbability: number;
  trueOdds: string;
  fairValue: string;
}

export default function PolymarketProbabilityCalculator() {
  const [mode, setMode] = useState<Mode>("priceToProb");
  const [marketPrice, setMarketPrice] = useState<string>("0.65");
  const [probabilityInput, setProbabilityInput] = useState<string>("65");
  const [batchInput, setBatchInput] = useState<string>("");

  const [result, setResult] = useState<SingleResult | null>(null);
  const [batchResults, setBatchResults] = useState<BatchRow[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const computeFromPrice = (price: number): SingleResult => {
    const clamped = Math.min(Math.max(price, 0.01), 0.99);
    const impliedProb = clamped * 100;
    const decimalOdds = 1 / clamped;
    const fractionalNumerator = Math.round((1 - clamped) * 100);
    const fractionalDenominator = Math.round(clamped * 100);
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(fractionalNumerator, fractionalDenominator);
    const trueOdds = `${fractionalNumerator / g}/${fractionalDenominator / g}`;
    return {
      impliedProbability: impliedProb,
      trueOdds,
      noSideProbability: 100 - impliedProb,
      breakevenWinRate: impliedProb,
      decimalOdds,
      price: clamped,
    };
  };

  const calculate = () => {
    if (mode === "priceToProb") {
      const price = parseFloat(marketPrice) || 0.65;
      setResult(computeFromPrice(price));
    } else {
      const prob = parseFloat(probabilityInput) || 65;
      const clampedProb = Math.min(Math.max(prob, 1), 99);
      const price = clampedProb / 100;
      setResult(computeFromPrice(price));
    }

    // Batch
    if (batchInput.trim()) {
      const values = batchInput
        .split(/[,\n]+/)
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v) && v >= 0.01 && v <= 0.99);
      setBatchResults(
        values.map((price) => {
          const r = computeFromPrice(price);
          return {
            price,
            impliedProbability: r.impliedProbability,
            trueOdds: r.trueOdds,
            fairValue: `$${price.toFixed(2)}`,
          };
        })
      );
    } else {
      setBatchResults([]);
    }

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

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
            <TrendingUp className="h-4 w-4" />
            Prediction Market Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Polymarket Probability Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert Polymarket share prices to implied probabilities and true odds, or find the fair market price for any probability estimate
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar - Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Market Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Mode Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Conversion Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={mode === "priceToProb" ? "default" : "outline"}
                      onClick={() => setMode("priceToProb")}
                      className={`text-xs py-2 ${
                        mode === "priceToProb"
                          ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                          : ""
                      }`}
                    >
                      Price <ArrowRight className="h-3 w-3 mx-1" /> Prob
                    </Button>
                    <Button
                      variant={mode === "probToPrice" ? "default" : "outline"}
                      onClick={() => setMode("probToPrice")}
                      className={`text-xs py-2 ${
                        mode === "probToPrice"
                          ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white"
                          : ""
                      }`}
                    >
                      Prob <ArrowRight className="h-3 w-3 mx-1" /> Price
                    </Button>
                  </div>
                </div>

                {mode === "priceToProb" ? (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Market Price ($0.01 - $0.99)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={marketPrice}
                        onChange={(e) => setMarketPrice(e.target.value)}
                        className="pl-7"
                        placeholder="0.65"
                        min="0.01"
                        max="0.99"
                        step="0.01"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Probability (1% - 99%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={probabilityInput}
                        onChange={(e) => setProbabilityInput(e.target.value)}
                        className="pr-8"
                        placeholder="65"
                        min="1"
                        max="99"
                        step="1"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                  </div>
                )}

                {/* Batch Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Batch Prices (optional)
                  </label>
                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[80px] resize-y"
                    placeholder="0.65, 0.42, 0.88&#10;or one per line"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Comma or newline separated prices
                  </p>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-6 text-lg"
                >
                  Convert
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area - Results */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* Primary Result - Implied Probability */}
                <Card className="border-2 border-orange-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Implied Probability</h3>
                    </div>
                    <p className="text-5xl font-bold mb-3">
                      {result.impliedProbability.toFixed(1)}%
                    </p>
                    {/* Probability Bar */}
                    <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                      <div
                        className="bg-white rounded-full h-4 transition-all duration-500"
                        style={{ width: `${result.impliedProbability}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-orange-100">
                      <span>YES {result.impliedProbability.toFixed(1)}%</span>
                      <span>NO {result.noSideProbability.toFixed(1)}%</span>
                    </div>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        True Odds
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Decimal Odds:</span>
                        <span className="font-semibold text-lg text-orange-600">
                          {result.decimalOdds.toFixed(3)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Fractional Odds:</span>
                        <span className="font-semibold">{result.trueOdds}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Market Price:</span>
                        <span className="font-semibold">${result.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Target className="h-5 w-5 text-orange-600" />
                        Position Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">No Side Probability:</span>
                        <span className="font-semibold text-lg text-orange-600">
                          {result.noSideProbability.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Breakeven Win Rate:</span>
                        <span className="font-semibold">{result.breakevenWinRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Potential Payout:</span>
                        <span className="font-semibold">
                          ${(1).toFixed(2)} per share
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Indicator */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-orange-100">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {result.impliedProbability >= 80
                            ? "High Confidence Market"
                            : result.impliedProbability >= 50
                            ? "Moderate Confidence Market"
                            : result.impliedProbability >= 20
                            ? "Low-Moderate Confidence"
                            : "Low Confidence Market"}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {result.impliedProbability >= 80
                            ? "The market strongly favors YES. Shares are expensive, reflecting high certainty. Potential profit per share is small but probability of payout is high."
                            : result.impliedProbability >= 50
                            ? "The market leans YES but with meaningful uncertainty. There is moderate upside on a YES position if the event resolves in your favor."
                            : result.impliedProbability >= 20
                            ? "The market leans NO. YES shares are cheap, offering high potential return per share but lower probability of payout."
                            : "The market strongly favors NO. YES shares are very cheap with high potential multiples, but the market considers this outcome unlikely."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Batch Results Table */}
                {batchResults.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
                      <CardTitle className="text-lg">Batch Conversion Results</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-slate-50">
                              <th className="text-left px-4 py-3 font-semibold text-slate-700">Price</th>
                              <th className="text-left px-4 py-3 font-semibold text-slate-700">Implied Probability</th>
                              <th className="text-left px-4 py-3 font-semibold text-slate-700">True Odds</th>
                              <th className="text-left px-4 py-3 font-semibold text-slate-700">Fair Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {batchResults.map((row, i) => (
                              <tr key={i} className="border-b last:border-b-0 hover:bg-orange-50/50">
                                <td className="px-4 py-3 font-medium">${row.price.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-slate-200 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full h-2"
                                        style={{ width: `${row.impliedProbability}%` }}
                                      ></div>
                                    </div>
                                    <span>{row.impliedProbability.toFixed(1)}%</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{row.trueOdds}</td>
                                <td className="px-4 py-3">{row.fairValue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Convert
                </h3>
                <p className="text-slate-500">
                  Enter a market price or probability and click convert to see the implied odds
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Understanding Polymarket Probabilities</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Polymarket Prices Represent Probabilities</h3>
                <p className="mb-4">
                  On Polymarket, every event has YES and NO shares that trade between $0.01 and $0.99. The price of a YES share directly reflects the market&apos;s collective estimate of the probability that an event will occur. If YES shares for an event are trading at $0.65, the market is saying there is approximately a 65% chance that event happens. This is because each share pays out exactly $1.00 if the event resolves YES, and $0.00 if it resolves NO. So at $0.65, you are paying 65 cents for the chance to win a dollar, implying the market believes the chance of winning is around 65%.
                </p>
                <p className="mb-4">
                  The relationship is elegantly simple: price equals implied probability (when expressed as a decimal). A $0.80 share implies 80% probability. A $0.15 share implies 15%. This one-to-one mapping makes prediction markets remarkably intuitive once you understand the basic concept. The market price aggregates the beliefs of all participants, each putting real money behind their estimates, which tends to produce surprisingly well-calibrated probabilities over time.
                </p>
                <p>
                  The complementary NO side always exists as well. If YES is at $0.65, then NO shares represent a bet that the event will not happen. In a perfectly efficient market, YES plus NO would equal exactly $1.00. In practice, the combined cost may be slightly above $1.00 due to the spread or market-making fees, which introduces a small overround. Understanding both sides of a market is essential for finding the best entry points for your positions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Market Efficiency and When Prices Diverge from True Probability</h3>
                <p className="mb-4">
                  Prediction markets are often praised for their accuracy, but they are not infallible. Market prices can diverge from true probabilities for several reasons. Thin liquidity is one of the most common causes: when few participants are trading a market, a single large order can push the price significantly without reflecting a genuine change in the underlying probability. Low-volume markets are particularly susceptible to this kind of distortion, so it is important to check trading volume before treating a price as a reliable probability estimate.
                </p>
                <p className="mb-4">
                  Behavioral biases also play a role. Participants tend to overweight dramatic or emotionally charged outcomes, which can push prices on sensational events higher than the true probability warrants. Conversely, boring or slowly unfolding events may be underpriced because they attract less attention and trading activity. Recency bias is another factor: if an event recently seemed more likely due to a news cycle, the market price may overshoot and take time to correct even after the temporary catalyst fades.
                </p>
                <p>
                  Time value and opportunity cost can also cause divergence. Even if a market is correctly priced at $0.92, holding that position ties up capital for potentially months waiting for resolution. Some traders demand a discount for that illiquidity, which can keep prices slightly below their true implied probability. Recognizing these structural factors helps you identify situations where the market price may not perfectly reflect the actual probability, creating potential opportunities for informed participants.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using Implied Probability to Find Value</h3>
                <p className="mb-4">
                  The core skill in prediction market trading is comparing the market&apos;s implied probability to your own estimate of the true probability. If you believe an event has a 75% chance of occurring but the market prices it at $0.60 (implying 60%), you have identified what traders call positive expected value. Your edge is the 15 percentage point gap between your estimate and the market price. Over many such bets, consistently finding and exploiting these gaps is how skilled participants generate returns.
                </p>
                <p className="mb-4">
                  Converting prices to probabilities using this calculator is the first step in that analysis. Once you have the implied probability, you can compare it against base rates, polling data, historical precedent, or your own domain expertise. The key is to be honest with yourself about the precision of your own estimates. If the market says 60% and you think 62%, that is probably not a meaningful edge. But if you have strong reasons to believe the true probability is 75% or higher, that gap may represent a genuine opportunity.
                </p>
                <p>
                  It is equally important to consider the NO side. If YES shares at $0.85 imply an 85% probability, then NO shares at around $0.15 imply a 15% chance the event does not happen. If you believe the true probability of failure is closer to 25%, buying NO shares may offer better expected value than buying YES in a market where you agree the event is likely. Always evaluate both sides of a market before committing capital.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Overround: When YES + NO Exceeds $1.00</h3>
                <p className="mb-4">
                  In a theoretically perfect market, the price of YES shares plus the price of NO shares would equal exactly $1.00. In reality, the combined cost often exceeds $1.00 by a small amount. This excess is called the overround (also known as the vig or vigorish in traditional betting). If YES trades at $0.65 and NO at $0.37, the combined cost is $1.02, meaning there is a 2-cent overround. This represents the implicit cost of trading in that market.
                </p>
                <p className="mb-4">
                  The overround exists because of bid-ask spreads and the mechanics of how market makers profit. It means that the raw share prices slightly overstate the probabilities when added together. The true implied probabilities should be normalized by dividing each price by the total combined price. In the example above, the true implied YES probability would be $0.65 / $1.02 = 63.7%, not 65%. For most practical purposes the difference is small, but for precise analysis or when comparing across markets, normalizing for the overround gives you more accurate probability estimates.
                </p>
                <p>
                  When the overround is large, it signals either an illiquid market or one with high uncertainty where market makers are demanding wider spreads for protection. A tight overround close to $1.00 indicates an efficient, well-traded market. Monitoring the overround can itself be informative: a suddenly widening spread might indicate that new information is arriving and the market is uncertain about the correct price, while a tightening spread suggests consensus is forming.
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
                    <div className="text-sm text-slate-500">Calculate expected value of positions</div>
                  </div>
                </Link>

                <Link href="/polymarket-arbitrage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Arbitrage Calculator</div>
                    <div className="text-sm text-slate-500">Find risk-free arbitrage opportunities</div>
                  </div>
                </Link>

                <Link href="/polymarket-kelly" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Kelly Criterion</div>
                    <div className="text-sm text-slate-500">Optimal position sizing</div>
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
            &copy; 2025 Calc-Tech.com. All rights reserved. Made with &hearts; for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
