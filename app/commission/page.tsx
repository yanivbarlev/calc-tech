"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Award, Target, Briefcase, BarChart3 } from "lucide-react";

interface CommissionResults {
  totalCompensation: number;
  commissionAmount: number;
  baseSalary: number;
  effectiveCommissionRate: number;
}

export default function CommissionCalculator() {
  // Simple Commission Mode
  const [salesPrice, setSalesPrice] = useState<string>("50000");
  const [commissionRate, setCommissionRate] = useState<string>("5");

  // Base Salary Options
  const [hasBaseSalary, setHasBaseSalary] = useState(false);
  const [baseSalary, setBaseSalary] = useState<string>("30000");

  // Tiered Commission
  const [isTiered, setIsTiered] = useState(false);
  const [tier1Max, setTier1Max] = useState<string>("25000");
  const [tier1Rate, setTier1Rate] = useState<string>("3");
  const [tier2Max, setTier2Max] = useState<string>("50000");
  const [tier2Rate, setTier2Rate] = useState<string>("5");
  const [tier3Rate, setTier3Rate] = useState<string>("7");

  const [results, setResults] = useState<CommissionResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const sales = parseFloat(salesPrice) || 0;
    const rate = parseFloat(commissionRate) || 0;
    const base = hasBaseSalary ? (parseFloat(baseSalary) || 0) : 0;

    let commission = 0;

    if (isTiered && sales > 0) {
      // Tiered commission calculation
      const t1Max = parseFloat(tier1Max) || 0;
      const t1Rate = parseFloat(tier1Rate) || 0;
      const t2Max = parseFloat(tier2Max) || 0;
      const t2Rate = parseFloat(tier2Rate) || 0;
      const t3Rate = parseFloat(tier3Rate) || 0;

      // Tier 1
      if (sales <= t1Max) {
        commission = (sales * t1Rate) / 100;
      }
      // Tier 2
      else if (sales <= t2Max) {
        commission = (t1Max * t1Rate) / 100 + ((sales - t1Max) * t2Rate) / 100;
      }
      // Tier 3
      else {
        commission = (t1Max * t1Rate) / 100 + ((t2Max - t1Max) * t2Rate) / 100 + ((sales - t2Max) * t3Rate) / 100;
      }
    } else {
      // Simple commission calculation
      commission = (sales * rate) / 100;
    }

    const totalComp = base + commission;
    const effectiveRate = sales > 0 ? (commission / sales) * 100 : 0;

    setResults({
      totalCompensation: totalComp,
      commissionAmount: commission,
      baseSalary: base,
      effectiveCommissionRate: effectiveRate,
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
      minimumFractionDigits: 2
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
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500 font-medium">Financial Tools</div>
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
            Commission Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your sales commission, total compensation, and earnings potential with multiple commission structures
          </p>
        </div>

        {/* Calculator Section */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Commission Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Sales Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sales Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={salesPrice}
                      onChange={(e) => setSalesPrice(e.target.value)}
                      className="pl-7"
                      placeholder="50000"
                    />
                  </div>
                </div>

                {/* Commission Structure Toggle */}
                <div className="border-t pt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTiered}
                      onChange={(e) => setIsTiered(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm font-semibold text-slate-700">Use Tiered Commission Structure</span>
                  </label>
                </div>

                {!isTiered ? (
                  // Simple Commission Rate
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Commission Rate (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(e.target.value)}
                        className="pr-7"
                        placeholder="5"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-3 text-slate-500">%</span>
                    </div>
                  </div>
                ) : (
                  // Tiered Rates
                  <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm text-slate-700">Commission Tiers</h4>

                    {/* Tier 1 */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600">Tier 1: $0 - $</label>
                      <Input
                        type="number"
                        value={tier1Max}
                        onChange={(e) => setTier1Max(e.target.value)}
                        placeholder="25000"
                      />
                      <div className="relative">
                        <Input
                          type="number"
                          value={tier1Rate}
                          onChange={(e) => setTier1Rate(e.target.value)}
                          className="pr-7"
                          placeholder="3"
                          step="0.1"
                        />
                        <span className="absolute right-3 top-3 text-slate-500 text-sm">%</span>
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600">Tier 2: ${tier1Max} - $</label>
                      <Input
                        type="number"
                        value={tier2Max}
                        onChange={(e) => setTier2Max(e.target.value)}
                        placeholder="50000"
                      />
                      <div className="relative">
                        <Input
                          type="number"
                          value={tier2Rate}
                          onChange={(e) => setTier2Rate(e.target.value)}
                          className="pr-7"
                          placeholder="5"
                          step="0.1"
                        />
                        <span className="absolute right-3 top-3 text-slate-500 text-sm">%</span>
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600">Tier 3: ${tier2Max}+</label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={tier3Rate}
                          onChange={(e) => setTier3Rate(e.target.value)}
                          className="pr-7"
                          placeholder="7"
                          step="0.1"
                        />
                        <span className="absolute right-3 top-3 text-slate-500 text-sm">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Base Salary Toggle */}
                <div className="border-t pt-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBaseSalary}
                      onChange={(e) => setHasBaseSalary(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span className="text-sm font-semibold text-slate-700">Include Base Salary</span>
                  </label>
                </div>

                {hasBaseSalary && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Annual Base Salary ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">$</span>
                      <Input
                        type="number"
                        value={baseSalary}
                        onChange={(e) => setBaseSalary(e.target.value)}
                        className="pl-7"
                        placeholder="30000"
                      />
                    </div>
                  </div>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Commission
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Total Compensation</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.totalCompensation)}</p>
                    <p className="text-emerald-100">Your total earnings including all commission and base salary</p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Commission Amount */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Commission Earned
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-emerald-600">
                          {formatCurrency(results.commissionAmount)}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          Commission from sales of {formatCurrency(parseFloat(salesPrice) || 0)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Effective Rate */}
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <BarChart3 className="h-5 w-5 text-teal-600" />
                        Effective Commission Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-3xl font-bold text-teal-600">
                          {formatPercentage(results.effectiveCommissionRate)}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {isTiered ? 'Blended rate across all tiers' : 'Your commission rate on sales'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Base Salary (if applicable) */}
                  {hasBaseSalary && (
                    <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                          <Briefcase className="h-5 w-5 text-emerald-600" />
                          Base Salary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-3xl font-bold text-emerald-600">
                            {formatCurrency(results.baseSalary)}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            Guaranteed annual base compensation
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Commission Breakdown (if tiered) */}
                  {isTiered && (
                    <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                          <Target className="h-5 w-5 text-teal-600" />
                          Commission Structure
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Tier 1 (0-${tier1Max}):</span>
                            <span className="font-semibold">{tier1Rate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Tier 2 (${tier1Max}-${tier2Max}):</span>
                            <span className="font-semibold">{tier2Rate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Tier 3 (${tier2Max}+):</span>
                            <span className="font-semibold">{tier3Rate}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Earnings Insight */}
                <Card className="border-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-600 p-2 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Earnings Analysis</h4>
                        <p className="text-sm text-slate-700">
                          {hasBaseSalary
                            ? `Your total compensation of ${formatCurrency(results.totalCompensation)} includes a base salary of ${formatCurrency(results.baseSalary)} plus ${formatCurrency(results.commissionAmount)} in commission earnings.`
                            : `You'll earn ${formatCurrency(results.commissionAmount)} in commission on sales of ${formatCurrency(parseFloat(salesPrice) || 0)} at an effective rate of ${formatPercentage(results.effectiveCommissionRate)}.`
                          }
                          {isTiered && ` The tiered structure rewards higher sales volumes with increasing commission rates.`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your sales amount and commission details to see your earnings
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Sales Commission</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is a Commission?</h3>
                <p>
                  A commission represents a form of variable pay where salespeople earn compensation based directly on their sales performance. Think of it as a performance incentive—the more you sell, the more you earn. This payment structure aligns the interests of sales professionals with their employer's revenue goals, creating a powerful motivator for driving business growth.
                </p>
                <p className="mt-3">
                  Commissions work differently across industries and companies. Some positions offer commission-only compensation, where your entire income depends on sales. Others combine a base salary with commission, providing financial stability while still rewarding performance. The commission structure you're working with—whether simple percentage-based, tiered, or something more complex—fundamentally shapes your earning potential.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Commission Structures</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Commission-Only Compensation</h4>
                <p>
                  In a pure commission model, you earn money solely based on what you sell. There's no guaranteed base salary—your paycheck rises and falls with your sales performance. This structure appears frequently in real estate, insurance, and certain retail environments. While it carries more risk (a slow month means low earnings), it also offers unlimited upside potential. Top performers in commission-only roles often earn significantly more than they would in salaried positions.
                </p>
                <p className="mt-2">
                  Real estate agents typically work this way, earning around 2.5% to 3% of each home's sale price. Sell a $500,000 property, and you might take home $12,500 to $15,000 in commission. Of course, that sale might take months to close, and you'll have dry periods between transactions. Success requires self-discipline, strong sales skills, and the financial cushion to weather variable income.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Base Salary Plus Commission</h4>
                <p>
                  This hybrid approach combines the security of a guaranteed salary with performance-based earnings. You receive a fixed base pay—say, $40,000 annually—plus commission on your sales. The base salary covers your essential expenses while the commission rewards your sales achievements. Many companies prefer this structure because it provides employees with financial stability while maintaining strong sales incentives.
                </p>
                <p className="mt-2">
                  For example, an auto dealership might pay salespeople a $3,000 monthly base salary plus 1.5% commission on vehicle sales. Sell $200,000 worth of cars in a month, and you'd earn your $3,000 base plus another $3,000 in commission. Your total monthly compensation would be $6,000, or $72,000 annually. The base salary keeps bills paid during slow periods, while commission rewards exceptional performance.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Tiered Commission Structure</h4>
                <p>
                  Tiered commissions increase your earning rate as you hit higher sales volumes. Instead of earning the same percentage on every dollar sold, your commission rate rises with performance milestones. This structure powerfully motivates salespeople to exceed targets rather than coast once they've hit basic quotas.
                </p>
                <p className="mt-2">
                  Here's how a typical tiered structure might work: You earn 3% commission on sales up to $25,000, then 5% on sales between $25,000 and $50,000, and 7% on anything above $50,000. If you sell $60,000 worth of products, you'd calculate: ($25,000 × 3%) + ($25,000 × 5%) + ($10,000 × 7%) = $750 + $1,250 + $700 = $2,700 total commission. Notice how the higher tiers apply only to the sales within those ranges—you don't lose your lower-tier earnings when you advance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Commission Calculations Work</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Simple Commission Formula</h4>
                <p>
                  The basic commission calculation is straightforward: multiply your total sales by your commission rate. If you sell $100,000 worth of products at a 4% commission rate, you earn $4,000. The formula is: <strong>Commission = Sales Amount × Commission Rate</strong>.
                </p>
                <p className="mt-2">
                  Most commission rates are expressed as percentages, but some companies use fixed dollar amounts per unit sold. For instance, you might earn $50 for each software license you sell, regardless of the license price. In these cases, simply multiply the number of units by the per-unit commission: selling 40 licenses at $50 each nets you $2,000.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Tiered Commission Calculation</h4>
                <p>
                  Calculating tiered commissions requires working through each tier separately. You can't just apply the highest rate to your total sales—that would dramatically overstate your earnings. Instead, calculate the commission for each tier, then sum them up.
                </p>
                <p className="mt-2">
                  Let's walk through a detailed example. Suppose your commission structure is: 2% on the first $30,000, 4% from $30,001 to $60,000, and 6% above $60,000. You've sold $75,000 this period. Here's the breakdown:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Tier 1: $30,000 × 2% = $600</li>
                  <li>Tier 2: $30,000 × 4% = $1,200 (this tier covers $30,001-$60,000)</li>
                  <li>Tier 3: $15,000 × 6% = $900 (you sold $15,000 above $60,000)</li>
                  <li>Total Commission: $600 + $1,200 + $900 = $2,700</li>
                </ul>
                <p className="mt-2">
                  Your effective commission rate on $75,000 in sales is 3.6% ($2,700 ÷ $75,000). This blended rate sits between your lowest and highest tiers, reflecting the progressive structure.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Commission with Base Salary</h4>
                <p>
                  When you have both base salary and commission, your total compensation is simply the sum of both components. If your annual base is $45,000 and you earn $18,000 in commissions throughout the year, your total compensation is $63,000.
                </p>
                <p className="mt-2">
                  Companies structure this differently for payment timing. Some pay base salary bi-weekly and commission monthly after sales close. Others might hold commission until deals are fully paid by customers. Understanding your company's payment schedule matters for cash flow planning—you might make a big sale in January but not see the commission until February or March.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Maximizing Your Commission Earnings</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Understand Your Compensation Plan Thoroughly</h4>
                <p>
                  Too many salespeople never fully grasp their commission structure, leaving money on the table. Study your compensation plan carefully. Know exactly when tier thresholds kick in, whether team or individual sales count, and which products carry higher commission rates. Some companies pay different rates for new customers versus renewals, or for different product lines. Understanding these nuances helps you focus your efforts where they'll generate the highest returns.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Strategic Selling in Tiered Structures</h4>
                <p>
                  With tiered commission, timing your sales strategically can significantly boost earnings. If you're close to a tier threshold near the end of a commission period, pushing to close one more deal might vault you into a higher rate for all subsequent sales. That said, avoid the temptation to hold back sales from one period to inflate the next—most companies track this behavior, and it can damage trust with customers who need solutions now.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Track Your Performance Consistently</h4>
                <p>
                  Successful commissioned salespeople obsessively track their numbers. Know your daily, weekly, and monthly sales totals. Understand your conversion rates, average deal sizes, and sales cycle lengths. This data helps you forecast earnings, identify patterns, and spot opportunities. When you know you need $15,000 more in sales to hit the next commission tier, you can adjust your activity levels and focus accordingly.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Build a Pipeline for Consistent Income</h4>
                <p>
                  Commission income can swing wildly without proper pipeline management. A robust sales pipeline—with prospects at various stages of the buying process—smooths out those fluctuations. While you're closing this month's deals, you should be nurturing next month's opportunities and prospecting for the month after. This approach creates more predictable income streams, even in pure commission roles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Commission Scenarios</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Retail Sales Associate</h4>
                <p>
                  Retail commission structures often combine hourly wages with performance bonuses. You might earn $15 per hour plus 2% commission on personal sales. Work 160 hours monthly and sell $50,000 worth of merchandise, and you'd earn: (160 hours × $15) + ($50,000 × 2%) = $2,400 + $1,000 = $3,400 total. High-end retail, jewelry stores, and electronics retailers commonly use this model to motivate attentive customer service.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Software Sales Representative</h4>
                <p>
                  B2B software sales typically feature substantial base salaries—often $60,000 to $100,000—combined with commission rates of 5% to 10% on closed deals. The base salary reflects the longer sales cycles (deals might take 3-6 months to close) and the need for technical expertise. A software rep with a $70,000 base who closes $800,000 in annual sales at 8% commission would earn $70,000 + $64,000 = $134,000 total compensation.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Real Estate Agent</h4>
                <p>
                  Real estate commissions illustrate the high-risk, high-reward nature of commission-only work. Agents typically earn 2.5% to 3% of a home's sale price, though they often split this with their brokerage. Sell a $600,000 home at 3% commission, and the gross commission is $18,000. After a 50/50 brokerage split, you'd net $9,000. But you might work for months on that transaction, and you'll have expenses like marketing, licensing, and association fees. Successful agents close multiple transactions monthly to generate consistent six-figure incomes.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Financial Services Advisor</h4>
                <p>
                  Financial advisors often earn commissions on the products they sell—mutual funds, insurance policies, annuities—plus ongoing fees based on assets under management. A typical structure might pay 3% to 5% upfront commission when a client invests in certain products, plus 1% annually on managed assets. This creates both immediate and recurring income streams. An advisor managing $10 million in client assets at 1% annual fees earns $100,000 yearly from that portfolio alone, before any new sales commissions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Implications of Commission Income</h3>
                <p>
                  Commission income faces the same tax treatment as regular salary—it's ordinary income subject to federal and state income taxes, Social Security, and Medicare. However, the variable nature of commission can create some planning challenges. A huge commission check might push you into a higher tax bracket temporarily, increasing your effective tax rate for that period.
                </p>
                <p className="mt-3">
                  If you're earning substantial commission income, especially in a commission-only role, consider setting aside 25% to 35% of each commission check for taxes. This prevents nasty surprises at tax time. Work with a tax professional who understands commission-based compensation—they can help with quarterly estimated tax payments and might identify deductions for unreimbursed business expenses like client entertainment, home office costs, or continuing education.
                </p>
                <p className="mt-3">
                  Some commission-based professionals benefit from forming an S-corporation or LLC to potentially reduce self-employment tax burden, though this strategy requires careful planning and professional guidance. The tax savings must outweigh the administrative costs and complexity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Negotiating Your Commission Structure</h3>
                <p>
                  Commission structures aren't always set in stone, particularly for experienced sales professionals or when joining a new company. Understanding how to negotiate can significantly impact your lifetime earnings.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Research Industry Standards</h4>
                <p>
                  Before negotiating, research typical commission rates in your industry and role. What do competitors pay? What's standard for your experience level? Sales recruiters, industry associations, and online salary databases provide useful benchmarks. Walking into negotiations armed with data strengthens your position considerably.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Consider Total Compensation</h4>
                <p>
                  Don't fixate solely on commission rates—evaluate the complete package. A 5% commission rate with a $60,000 base might be more valuable than 7% commission with a $40,000 base, depending on realistic sales volumes. Also consider factors like quota attainability, territory quality, product-market fit, and support resources. A higher commission rate means little if you can't actually close deals.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Negotiate Accelerators</h4>
                <p>
                  Accelerators are bonus commission rates that kick in when you exceed quota. Instead of asking for a higher base rate, you might negotiate: "I'll accept the standard 5% rate, but I want 7% on everything above 120% of quota." This aligns your interests with the company's—they pay more only when you're driving exceptional results—and can dramatically increase top-performer earnings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Avoiding Common Commission Pitfalls</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Read the Fine Print</h4>
                <p>
                  Commission agreements sometimes contain clauses that reduce earnings in ways you might not expect. Watch for clawback provisions (you must return commission if a customer cancels within a certain period), caps on total commission earnings, or complex calculations that reduce effective rates. Understand exactly when commission is "earned" versus "paid"—some companies only pay after they receive customer payment, which could be months after you close a deal.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Document Everything</h4>
                <p>
                  Keep meticulous records of your sales, especially in commission-only or high-value roles. Track what you sold, when you sold it, to whom, and for how much. This documentation protects you if disputes arise about commission calculations. Unfortunately, commission disputes between employers and employees are common—your records provide crucial evidence if you need to challenge incorrect payments.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Understand Territory and Account Changes</h4>
                <p>
                  Companies sometimes reassign territories, accounts, or even past customers to other salespeople. What happens to your commission on existing accounts if you're moved to a new territory? What about deals you've been working on for months if you leave the company? These questions should be addressed clearly in your commission agreement before they become problems.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Is Commission-Based Work Right for You?</h3>
                <p>
                  Commission-based compensation isn't for everyone. It rewards self-motivated, results-oriented individuals who can handle income variability and thrive under performance pressure. If you need paycheck predictability for budgeting or stress heavily about financial uncertainty, a salaried position might suit you better.
                </p>
                <p className="mt-3">
                  That said, commission work offers substantial upside. Top performers often earn multiples of what they could make in salaried roles. You're directly rewarded for your effort and skill—work harder and smarter, and your income rises accordingly. There's something deeply satisfying about seeing your paycheck reflect your contributions directly.
                </p>
                <p className="mt-3">
                  Consider your personality, financial situation, and career goals. Do you enjoy sales and feel confident in your abilities? Can you manage variable income responsibly? Are you willing to invest in your skills through continuous learning? If so, commission-based work might offer the perfect blend of autonomy, achievement, and earning potential to build a rewarding career.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl">Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/salary" className="group p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">Salary Calculator</h4>
                  <p className="text-sm text-slate-600 mt-1">Convert between salary periods and formats</p>
                </Link>
                <Link href="/discount" className="group p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">Discount Calculator</h4>
                  <p className="text-sm text-slate-600 mt-1">Calculate discounts and final prices</p>
                </Link>
                <Link href="/sales-tax" className="group p-4 border-2 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">Sales Tax Calculator</h4>
                  <p className="text-sm text-slate-600 mt-1">Calculate sales tax and final totals</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
