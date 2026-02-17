"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, DollarSign, Target, AlertTriangle } from "lucide-react";

interface ArbitrageResults {
  totalCost: number;
  hasArbitrage: boolean;
  guaranteedPayout: number;
  guaranteedProfit: number;
  roi: number;
  yesAllocation: number;
  noAllocation: number;
  yesShares: number;
  noShares: number;
  payoutIfYes: number;
  payoutIfNo: number;
}

export default function PolymarketArbitrageCalculator() {
  const [yesPrice, setYesPrice] = useState<string>("0.52");
  const [noPrice, setNoPrice] = useState<string>("0.52");
  const [investmentAmount, setInvestmentAmount] = useState<string>("1000");

  const [results, setResults] = useState<ArbitrageResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const yes = parseFloat(yesPrice) || 0.52;
    const no = parseFloat(noPrice) || 0.52;
    const investment = parseFloat(investmentAmount) || 1000;

    const totalCost = yes + no;
    const hasArbitrage = totalCost < 1.0;

    // Optimal allocation to equalize payouts
    const yesAllocation = investment * yes / totalCost;
    const noAllocation = investment * no / totalCost;

    // Shares purchased
    const yesShares = yesAllocation / yes;
    const noShares = noAllocation / no;

    // Guaranteed payout (same regardless of outcome)
    const guaranteedPayout = investment / totalCost;
    const guaranteedProfit = guaranteedPayout - investment;
    const roi = (1 / totalCost - 1) * 100;

    // Payout scenarios (should be equal with optimal split)
    const payoutIfYes = yesShares; // each share pays $1 if yes wins
    const payoutIfNo = noShares;

    setResults({
      totalCost,
      hasArbitrage,
      guaranteedPayout,
      guaranteedProfit,
      roi,
      yesAllocation,
      noAllocation,
      yesShares,
      noShares,
      payoutIfYes,
      payoutIfNo,
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
            <TrendingUp className="h-4 w-4" />
            Prediction Markets Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Polymarket Arbitrage Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Detect arbitrage opportunities on Polymarket by comparing Yes and No prices. Find guaranteed profits when market prices are mispriced.
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
                  Market Prices
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Yes Price ($0.01 - $0.99)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={yesPrice}
                      onChange={(e) => setYesPrice(e.target.value)}
                      className="pl-7"
                      placeholder="0.52"
                      min="0.01"
                      max="0.99"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    No Price ($0.01 - $0.99)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={noPrice}
                      onChange={(e) => setNoPrice(e.target.value)}
                      className="pl-7"
                      placeholder="0.52"
                      min="0.01"
                      max="0.99"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Investment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="pl-7"
                      placeholder="1000"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-6 text-lg"
                >
                  Detect Arbitrage
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area - Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result - Arbitrage Status */}
                <Card className={`border-2 rounded-2xl shadow-lg overflow-hidden ${results.hasArbitrage ? 'border-emerald-200' : 'border-rose-200'}`}>
                  <div className={`p-8 text-white ${results.hasArbitrage ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-rose-600 to-red-600'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      {results.hasArbitrage ? (
                        <Target className="h-8 w-8" />
                      ) : (
                        <AlertTriangle className="h-8 w-8" />
                      )}
                      <h3 className="text-xl font-semibold">
                        {results.hasArbitrage ? 'Arbitrage Opportunity Found!' : 'No Arbitrage Opportunity'}
                      </h3>
                    </div>
                    {results.hasArbitrage ? (
                      <>
                        <p className="text-5xl font-bold mb-2">{formatCurrency(results.guaranteedProfit)}</p>
                        <p className="text-emerald-100">
                          Guaranteed profit with {formatPercentage(results.roi)} ROI on {formatCurrency(parseFloat(investmentAmount) || 1000)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-5xl font-bold mb-2">{formatPercentage(results.roi)}</p>
                        <p className="text-rose-100">
                          Combined price is ${results.totalCost.toFixed(4)} (must be below $1.00 for arbitrage). You would lose {formatCurrency(Math.abs(results.guaranteedProfit))} guaranteed.
                        </p>
                      </>
                    )}
                  </div>
                </Card>

                {/* Allocation Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-orange-600" />
                        Optimal Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Invest on Yes:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.yesAllocation)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Invest on No:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.noAllocation)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Yes Shares:</span>
                        <span className="font-semibold">{results.yesShares.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">No Shares:</span>
                        <span className="font-semibold">{results.noShares.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Target className="h-5 w-5 text-orange-600" />
                        Payout Scenarios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">If Yes Wins:</span>
                        <span className={`font-semibold text-lg ${results.hasArbitrage ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(results.payoutIfYes)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">If No Wins:</span>
                        <span className={`font-semibold text-lg ${results.hasArbitrage ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(results.payoutIfNo)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-600">Total Invested:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(investmentAmount) || 1000)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Guaranteed Profit:</span>
                        <span className={`font-semibold ${results.hasArbitrage ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatCurrency(results.guaranteedProfit)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Market Efficiency Indicator */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${results.totalCost < 0.98 ? 'bg-emerald-100' : results.totalCost <= 1.0 ? 'bg-amber-100' : 'bg-rose-100'}`}>
                        <TrendingUp className={`h-6 w-6 ${results.totalCost < 0.98 ? 'text-emerald-600' : results.totalCost <= 1.0 ? 'text-amber-600' : 'text-rose-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          Market Efficiency: Combined Price = ${results.totalCost.toFixed(4)}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {results.totalCost < 0.95
                            ? 'This market is significantly mispriced. A combined price this far below $1.00 represents a strong arbitrage opportunity. Double-check the prices are current before trading.'
                            : results.totalCost < 1.0
                            ? 'A small arbitrage window exists. After accounting for trading fees (typically 1-2%), the actual profit may be reduced or eliminated. Verify fee impact before executing.'
                            : results.totalCost === 1.0
                            ? 'The market is perfectly efficient. Yes and No prices sum to exactly $1.00, leaving no room for risk-free profit.'
                            : 'The market is overpriced (combined cost exceeds $1.00). This is common due to market maker spreads and fees built into the prices. No arbitrage opportunity exists.'}
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
                  Ready to Detect Arbitrage
                </h3>
                <p className="text-slate-500">
                  Enter the Yes and No prices from a Polymarket event and click detect to find arbitrage opportunities
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="text-2xl">Understanding Polymarket Arbitrage</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Arbitrage in Prediction Markets?</h3>
                <p className="mb-4">
                  Arbitrage in prediction markets refers to a situation where you can guarantee a risk-free profit by simultaneously buying both outcomes of a binary event. On platforms like Polymarket, every event resolves to either Yes or No. Each outcome has a price between $0.01 and $0.99, and the winning shares pay out exactly $1.00 each. In a perfectly efficient market, the Yes price plus the No price should equal exactly $1.00, because the probabilities of all outcomes must sum to 100%. When these prices sum to less than $1.00, you can buy both sides and lock in a guaranteed profit regardless of which outcome actually occurs.
                </p>
                <p>
                  For example, suppose a market asks whether a certain event will happen by the end of the year. If the Yes shares are priced at $0.45 and the No shares are priced at $0.50, the combined cost is only $0.95. That means for every $0.95 you spend buying one Yes share and one No share, you are guaranteed to receive $1.00 back when the market resolves. The $0.05 difference is your risk-free profit. Scale that up with a larger investment and the guaranteed return can be meaningful, even if the per-share margin is slim.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Do Arbitrage Opportunities Appear on Polymarket?</h3>
                <p className="mb-4">
                  Arbitrage opportunities on Polymarket typically arise from a few structural factors. First, the platform uses an order book model where different market makers and traders independently set prices for Yes and No shares. Since these are separate order books, there is no automatic mechanism forcing them to sum to exactly $1.00 at all times. When one side sees heavy selling pressure while the other side remains unchanged, the combined price can temporarily dip below the $1.00 threshold.
                </p>
                <p>
                  Second, rapid news events can cause prices on one side to move faster than the other. If breaking news makes the Yes outcome more likely, traders rush to buy Yes shares and the price spikes upward. But it may take a few seconds or minutes for the No side to adjust downward accordingly. During that window, the combined price might fall below $1.00, creating a brief arbitrage opportunity. High-frequency traders and bots actively scan for exactly these windows, which is why arbitrage gaps tend to be small and short-lived on active markets. Less liquid markets with fewer participants tend to have larger and longer-lasting mispricings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Fees and Slippage Affect Arbitrage Profits</h3>
                <p className="mb-4">
                  Before executing any arbitrage trade, it is critical to account for trading fees. Polymarket charges fees on trades, and these can eat into or completely eliminate a theoretical arbitrage profit. If the combined price of Yes and No is $0.98 and the platform charges a 2% fee on each side, your effective cost could exceed $1.00, turning what looked like a guaranteed profit into a guaranteed loss. Always calculate your net profit after fees before placing any trades.
                </p>
                <p>
                  Slippage is another practical concern. The prices you see in the order book are for a certain quantity of shares. If you try to buy a large number of shares, you may need to fill orders at progressively worse prices, pushing your average cost higher than the displayed price. This is especially relevant on less liquid markets where the order book is thin. The calculator above uses the prices you input directly, so always verify that sufficient liquidity exists at those prices for your intended investment size before trading.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Risks and Practical Considerations</h3>
                <p className="mb-4">
                  While arbitrage is theoretically risk-free, there are practical risks to be aware of. Execution risk is the most significant: prices can change between the time you place your Yes order and your No order, potentially eliminating the arbitrage window. Market resolution risk also exists in rare cases where a market may be voided or resolved ambiguously, though Polymarket has dispute resolution mechanisms to handle edge cases. Additionally, your capital is locked until the market resolves, which could be days, weeks, or months away. Even a guaranteed 3% profit looks less attractive if your money is locked up for six months.
                </p>
                <p>
                  Smart arbitrage traders focus on markets that are close to resolution (reducing capital lockup time), have sufficient liquidity (reducing slippage), and offer margins large enough to comfortably cover fees. They also use automated tools to detect and execute trades quickly, since manual detection and trading is usually too slow to capture the most profitable opportunities. This calculator helps you analyze whether a given price combination represents a genuine opportunity after you have already identified potentially mispriced markets.
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
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/roi" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">ROI Calculator</div>
                    <div className="text-sm text-slate-500">Calculate return on investment</div>
                  </div>
                </Link>

                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-500">Calculate investment growth over time</div>
                  </div>
                </Link>

                <Link href="/compound-interest" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Compound Interest Calculator</div>
                    <div className="text-sm text-slate-500">See how interest compounds over time</div>
                  </div>
                </Link>

                <Link href="/percentage" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-orange-300 hover:shadow-md transition-all">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Percentage Calculator</div>
                    <div className="text-sm text-slate-500">Calculate percentages and ratios</div>
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
