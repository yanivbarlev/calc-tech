"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import type { Metadata } from 'next';

interface SocialSecurityResults {
  optimalAge: number;
  monthlyBenefitAt62: number;
  monthlyBenefitAtFRA: number;
  monthlyBenefitAt70: number;
  lifetimeBenefitAt62: number;
  lifetimeBenefitAtFRA: number;
  lifetimeBenefitAt70: number;
  fullRetirementAge: number;
  reductionAt62: number;
  increaseAt70: number;
  breakEvenAge62vsFRA: number;
  breakEvenAgeFRAvs70: number;
}

export default function SocialSecurityCalculator() {
  const [birthYear, setBirthYear] = useState<string>("1960");
  const [lifeExpectancy, setLifeExpectancy] = useState<string>("85");
  const [fullMonthlyBenefit, setFullMonthlyBenefit] = useState<string>("2000");
  const [investmentReturn, setInvestmentReturn] = useState<string>("3");
  const [colaAdjustment, setColaAdjustment] = useState<string>("2.5");

  const [results, setResults] = useState<SocialSecurityResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const birth = parseInt(birthYear) || 1960;
    const lifeExp = parseInt(lifeExpectancy) || 85;
    const monthlyBenefit = parseFloat(fullMonthlyBenefit) || 2000;
    const invReturn = parseFloat(investmentReturn) || 3;
    const cola = parseFloat(colaAdjustment) || 2.5;

    // Determine Full Retirement Age (FRA) based on birth year
    let fullRetirementAge = 67;
    if (birth < 1943) {
      fullRetirementAge = 65;
    } else if (birth >= 1943 && birth <= 1954) {
      fullRetirementAge = 66;
    } else if (birth > 1954 && birth < 1960) {
      const monthsToAdd = (birth - 1954) * 2;
      fullRetirementAge = 66 + monthsToAdd / 12;
    } else {
      fullRetirementAge = 67;
    }

    // Calculate reduction for early claiming at 62
    // Reduction is approximately 5/9 of 1% per month for first 36 months,
    // then 5/12 of 1% for each additional month
    const monthsEarly = (fullRetirementAge - 62) * 12;
    let reductionPercentage;
    if (monthsEarly <= 36) {
      reductionPercentage = monthsEarly * (5 / 9) * 0.01;
    } else {
      reductionPercentage = (36 * (5 / 9) * 0.01) + ((monthsEarly - 36) * (5 / 12) * 0.01);
    }

    // Calculate increase for delayed claiming up to age 70
    // Approximately 8% per year (2/3 of 1% per month)
    const monthsDelayed = (70 - fullRetirementAge) * 12;
    const increasePercentage = monthsDelayed * (2 / 3) * 0.01;

    // Monthly benefits at different claiming ages
    const benefitAt62 = monthlyBenefit * (1 - reductionPercentage);
    const benefitAtFRA = monthlyBenefit;
    const benefitAt70 = monthlyBenefit * (1 + increasePercentage);

    // Calculate lifetime benefits with COLA and investment returns
    const calculateLifetimeBenefit = (
      startAge: number,
      monthlyAmount: number,
      endAge: number
    ): number => {
      let total = 0;
      const months = (endAge - startAge) * 12;

      for (let month = 1; month <= months; month++) {
        const year = Math.floor(month / 12);
        // Apply COLA annually
        const adjustedAmount = monthlyAmount * Math.pow(1 + cola / 100, year);
        // Apply investment return (monthly compounding)
        const futureValue = adjustedAmount * Math.pow(1 + invReturn / 100 / 12, months - month);
        total += futureValue;
      }

      return total;
    };

    const lifetimeBenefit62 = calculateLifetimeBenefit(62, benefitAt62, lifeExp);
    const lifetimeBenefitFRA = calculateLifetimeBenefit(fullRetirementAge, benefitAtFRA, lifeExp);
    const lifetimeBenefit70 = calculateLifetimeBenefit(70, benefitAt70, lifeExp);

    // Determine optimal age based on lifetime benefits
    let optimalAge = 62;
    let maxBenefit = lifetimeBenefit62;

    if (lifetimeBenefitFRA > maxBenefit) {
      optimalAge = Math.round(fullRetirementAge);
      maxBenefit = lifetimeBenefitFRA;
    }

    if (lifetimeBenefit70 > maxBenefit) {
      optimalAge = 70;
    }

    // Calculate break-even ages
    const calculateBreakEvenAge = (
      age1: number,
      benefit1: number,
      age2: number,
      benefit2: number
    ): number => {
      // Find age where cumulative benefits are equal
      const monthlyDifference = benefit2 - benefit1;
      const monthsEarlier = (age2 - age1) * 12;
      const totalMissed = benefit1 * monthsEarlier;

      const monthsToBreakEven = totalMissed / monthlyDifference;
      return age2 + (monthsToBreakEven / 12);
    };

    const breakEven62vsFRA = calculateBreakEvenAge(62, benefitAt62, fullRetirementAge, benefitAtFRA);
    const breakEvenFRAvs70 = calculateBreakEvenAge(fullRetirementAge, benefitAtFRA, 70, benefitAt70);

    setResults({
      optimalAge,
      monthlyBenefitAt62: benefitAt62,
      monthlyBenefitAtFRA: benefitAtFRA,
      monthlyBenefitAt70: benefitAt70,
      lifetimeBenefitAt62: lifetimeBenefit62,
      lifetimeBenefitAtFRA: lifetimeBenefitFRA,
      lifetimeBenefitAt70: lifetimeBenefit70,
      fullRetirementAge,
      reductionAt62: reductionPercentage * 100,
      increaseAt70: increasePercentage * 100,
      breakEvenAge62vsFRA: breakEven62vsFRA,
      breakEvenAgeFRAvs70: breakEvenFRAvs70
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
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
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Financial Planning Tools</div>
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
            <DollarSign className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Social Security Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Determine the optimal age to claim Social Security benefits and maximize your lifetime retirement income
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <Card className="border-2 rounded-2xl shadow-lg lg:col-span-1 h-fit sticky top-24">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Birth Year
                </label>
                <Input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="1960"
                  min="1943"
                  max="2005"
                />
                <p className="text-xs text-slate-500 mt-1">Enter your year of birth (1943-2005)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Life Expectancy (years)
                </label>
                <Input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(e.target.value)}
                  placeholder="85"
                  min="62"
                  max="100"
                />
                <p className="text-xs text-slate-500 mt-1">Expected lifespan (average is 77-85)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Monthly Benefit ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={fullMonthlyBenefit}
                    onChange={(e) => setFullMonthlyBenefit(e.target.value)}
                    placeholder="2000"
                    className="pl-7"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Your estimated benefit at full retirement age</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual Investment Return (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={investmentReturn}
                    onChange={(e) => setInvestmentReturn(e.target.value)}
                    placeholder="3"
                    className="pr-7"
                    min="0"
                    max="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Expected return if invested</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Annual COLA (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={colaAdjustment}
                    onChange={(e) => setColaAdjustment(e.target.value)}
                    placeholder="2.5"
                    className="pr-7"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Cost of living adjustment rate</p>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                Calculate Benefits
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Optimal Age Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Optimal Claiming Age</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{results.optimalAge}</p>
                    <p className="text-emerald-100">
                      Based on your life expectancy of {lifeExpectancy} years
                    </p>
                  </div>
                  <CardContent className="p-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-semibold mb-1">Your Full Retirement Age: {results.fullRetirementAge}</p>
                          <p>This is the age at which you're entitled to 100% of your calculated Social Security benefit based on your birth year of {birthYear}.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Benefits Comparison */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                      <DollarSign className="h-6 w-6 text-emerald-600" />
                      Monthly Benefit Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">Claim at Age 62</div>
                        <div className="text-2xl font-bold text-slate-800">{formatCurrency(results.monthlyBenefitAt62)}</div>
                        <div className="text-xs text-red-600 mt-1">
                          -{formatPercentage(results.reductionAt62)} reduction
                        </div>
                      </div>

                      <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-300">
                        <div className="text-sm text-emerald-700 mb-1 font-semibold">Full Retirement Age</div>
                        <div className="text-2xl font-bold text-emerald-800">{formatCurrency(results.monthlyBenefitAtFRA)}</div>
                        <div className="text-xs text-emerald-600 mt-1">
                          100% of benefit
                        </div>
                      </div>

                      <div className="bg-teal-50 rounded-xl p-4 border-2 border-teal-300">
                        <div className="text-sm text-teal-700 mb-1 font-semibold">Claim at Age 70</div>
                        <div className="text-2xl font-bold text-teal-800">{formatCurrency(results.monthlyBenefitAt70)}</div>
                        <div className="text-xs text-green-600 mt-1">
                          +{formatPercentage(results.increaseAt70)} increase
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lifetime Benefits */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                      Total Lifetime Benefits (Age {lifeExpectancy})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div>
                          <div className="font-semibold text-slate-700">Claiming at Age 62</div>
                          <div className="text-sm text-slate-500">Early claiming with {formatPercentage(results.reductionAt62)} reduction</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">{formatCurrency(results.lifetimeBenefitAt62)}</div>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        results.optimalAge === Math.round(results.fullRetirementAge)
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div>
                          <div className="font-semibold text-slate-700">
                            Claiming at Full Retirement Age ({results.fullRetirementAge})
                          </div>
                          <div className="text-sm text-slate-500">Full benefit amount</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-700">{formatCurrency(results.lifetimeBenefitAtFRA)}</div>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        results.optimalAge === 70
                          ? 'bg-teal-50 border-teal-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div>
                          <div className="font-semibold text-slate-700">Claiming at Age 70</div>
                          <div className="text-sm text-slate-500">Delayed claiming with {formatPercentage(results.increaseAt70)} increase</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-700">{formatCurrency(results.lifetimeBenefitAt70)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Break-Even Analysis */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                      Break-Even Age Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">Age 62 vs Full Retirement Age</span>
                        <span className="text-xl font-bold text-blue-700">
                          {results.breakEvenAge62vsFRA.toFixed(1)} years
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        If you live past age {results.breakEvenAge62vsFRA.toFixed(1)}, claiming at full retirement age provides more total benefits than claiming at 62.
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">Full Retirement Age vs Age 70</span>
                        <span className="text-xl font-bold text-purple-700">
                          {results.breakEvenAgeFRAvs70.toFixed(1)} years
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        If you live past age {results.breakEvenAgeFRAvs70.toFixed(1)}, waiting until 70 provides more total benefits than claiming at full retirement age.
                      </p>
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
                  Enter your information and click Calculate to see your optimal Social Security claiming strategy
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Social Security Benefits</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <p className="mb-4">
                  Deciding when to start collecting Social Security benefits is one of the most important financial decisions you'll make in retirement. The age you choose can significantly impact your monthly check and total lifetime benefits—potentially by hundreds of thousands of dollars. That's why it's crucial to understand how the system works and what claiming age makes the most sense for your situation.
                </p>
                <p>
                  Social Security gives you flexibility. You can start claiming as early as age 62 or delay until age 70, with each month you wait typically increasing your monthly benefit amount. But here's the catch: starting early means smaller monthly checks for life, while delaying means larger checks but fewer years to collect them. The sweet spot depends entirely on your health, financial needs, and how long you expect to live.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is Full Retirement Age?</h3>
                <p className="mb-4">
                  Full Retirement Age, or FRA, is the age when you're entitled to receive 100% of your Social Security benefit based on your lifetime earnings. Think of it as the baseline. If you were born in 1960 or later, your FRA is 67. For those born between 1943 and 1959, it gradually increases from 66 to 67 depending on your specific birth year.
                </p>
                <p className="mb-4">
                  Your FRA matters because it's the reference point for all the calculations. Claim before this age, and your benefit gets permanently reduced. Wait until after, and you earn delayed retirement credits that boost your monthly payment. The Social Security Administration designed the system this way to be roughly actuarially neutral—meaning that on average, you'd receive about the same total benefits regardless of when you claim, assuming you live to average life expectancy.
                </p>
                <p>
                  But that's just the average. Your personal situation—health status, family longevity, financial needs, and other income sources—can make one claiming age far more advantageous than another. That's where careful analysis comes in.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Early Claiming Penalty: Taking Benefits at 62</h3>
                <p className="mb-4">
                  Age 62 is the earliest you can claim Social Security retirement benefits, and it's the most popular claiming age. Why? Because many people need the income, want to retire early, or don't expect to live long enough to benefit from waiting. But claiming early comes at a steep cost.
                </p>
                <p className="mb-4">
                  If your FRA is 67 and you claim at 62, your benefit gets reduced by about 30%. That's a permanent reduction—you'll never get back to 100% of your calculated benefit amount. The reduction works out to roughly 5/9 of 1% per month for the first 36 months before your FRA, then 5/12 of 1% for each additional month. So someone entitled to $2,000 per month at age 67 would only receive around $1,400 if they claim at 62.
                </p>
                <p className="mb-4">
                  That said, claiming early isn't always the wrong choice. If you're in poor health, have a family history of shorter lifespans, or desperately need the income, getting five extra years of benefits (even at a reduced rate) might make sense. You'd collect payments longer, and if you don't make it to the break-even age—typically somewhere in your late 70s to early 80s—you could actually come out ahead financially.
                </p>
                <p>
                  Another consideration: what would you do with the extra money from claiming early? If you can invest it wisely and earn decent returns, you might be able to make up some of the difference. But if you just spend it, you're essentially trading long-term financial security for short-term cash flow.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Delayed Claiming Bonus: Waiting Until 70</h3>
                <p className="mb-4">
                  On the flip side, every month you delay claiming past your FRA earns you delayed retirement credits worth about 2/3 of 1% per month, or 8% per year. That means if you wait from age 67 to 70, your benefit increases by 24%. Using our earlier example, that $2,000 monthly benefit at FRA would grow to about $2,480 at age 70.
                </p>
                <p className="mb-4">
                  These delayed credits stop accumulating at age 70, so there's no financial benefit to waiting beyond that point. But if you're healthy, have longevity in your family, and don't need the income right away, delaying can be incredibly valuable. That extra 24% compounds over the rest of your life, providing larger annual cost-of-living adjustments and potentially much higher lifetime benefits if you live into your 80s or 90s.
                </p>
                <p className="mb-4">
                  The break-even age for waiting from FRA to 70 is typically around age 80-82. If you live past that age, you'll collect more in total benefits by waiting. And here's something many people don't realize: women live longer than men on average, making delayed claiming especially attractive for female retirees.
                </p>
                <p>
                  Of course, the math assumes you can afford to wait. If you need the money to live on and don't have other income sources or sufficient savings, the theoretical benefits of delaying won't matter much. The decision also gets more complex when you factor in spousal and survivor benefits, which we'll discuss shortly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Your Benefit Amount Gets Calculated</h3>
                <p className="mb-4">
                  Your Social Security benefit is based on your lifetime earnings, specifically the 35 highest-earning years of your career. The Social Security Administration takes those 35 years, adjusts them for wage inflation, and calculates your Average Indexed Monthly Earnings (AIME). Then they apply a progressive formula to determine your Primary Insurance Amount (PIA)—what you'd receive at your FRA.
                </p>
                <p className="mb-4">
                  The formula is weighted to help lower-income workers, replacing a higher percentage of their pre-retirement income than it does for higher earners. For 2024, the formula replaces 90% of the first $1,174 of AIME, 32% of AIME between $1,174 and $7,078, and 15% of AIME above that, up to the maximum taxable earnings cap.
                </p>
                <p className="mb-4">
                  What this means in practice: if you didn't work for 35 years, the missing years count as zeros, which pulls down your average. This especially affects people who took significant time off to raise children or who had inconsistent work histories. Working a few extra years to replace some low-earning or zero-earning years can meaningfully boost your benefit.
                </p>
                <p>
                  The maximum Social Security benefit in 2024 for someone retiring at FRA is around $3,800 per month, but very few people receive that much. The average retirement benefit is closer to $1,900 per month. To estimate your own benefit, check your Social Security statement online at ssa.gov or use the calculators the SSA provides.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Spousal and Survivor Benefits: The Couples Strategy</h3>
                <p className="mb-4">
                  If you're married, your Social Security claiming decision affects not just you but your spouse as well—both during your lifetime and after one of you passes away. This adds another layer of complexity but also creates opportunities for strategic planning.
                </p>
                <p className="mb-4">
                  A spouse can claim up to 50% of the higher earner's benefit amount if they claim at their own FRA. However, if they claim earlier, this spousal benefit is reduced, just like retirement benefits are. The spousal benefit doesn't earn delayed retirement credits, though, so there's no advantage to waiting past FRA to claim it.
                </p>
                <p className="mb-4">
                  Here's where survivor benefits come in. When one spouse dies, the surviving spouse can switch to receiving 100% of the deceased spouse's benefit if it's higher than their own. This is where delayed claiming can really pay off for couples. If the higher earner delays until 70, they lock in that maximized benefit amount for whichever spouse lives longer.
                </p>
                <p className="mb-4">
                  A common strategy: the higher earner delays claiming until 70 to maximize the survivor benefit, while the lower earner claims earlier (sometimes as early as 62) to bring in some cash flow during those years. This approach balances current income needs with long-term financial security for the surviving spouse.
                </p>
                <p>
                  Keep in mind that divorce doesn't necessarily mean you lose spousal benefits. If you were married for at least 10 years and haven't remarried, you may be eligible to claim benefits based on your ex-spouse's record without affecting their benefits at all.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Cost-of-Living Adjustments and Inflation Protection</h3>
                <p className="mb-4">
                  One of Social Security's most valuable features is its built-in inflation protection through annual Cost-of-Living Adjustments, or COLAs. Each year, the Social Security Administration reviews inflation data and adjusts benefits accordingly. In high-inflation years like 2023, the COLA was 8.7%—the largest increase in decades. In low-inflation years, the increase might be 1-2% or occasionally zero.
                </p>
                <p className="mb-4">
                  These adjustments are applied to your benefit amount, which means they compound over time. That's another reason why claiming age matters so much. If you start with a higher base amount (by delaying), each COLA increases that larger number, accelerating the growth of your benefit over the years.
                </p>
                <p>
                  Compare this to most pensions, which provide fixed payments with no inflation adjustment. Over a 20 or 30-year retirement, inflation can cut the purchasing power of a fixed payment in half. Social Security's COLA protection ensures your benefits keep pace with rising costs, making it an incredibly valuable source of guaranteed income.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Implications of Social Security Benefits</h3>
                <p className="mb-4">
                  Many retirees are surprised to learn that Social Security benefits can be taxable. Whether you'll owe federal income tax on your benefits depends on your "combined income"—which includes your adjusted gross income, any tax-exempt interest, and half of your Social Security benefits.
                </p>
                <p className="mb-4">
                  If you're single and your combined income exceeds $25,000 (or $32,000 for married couples filing jointly), up to 50% of your benefits become taxable. Above $34,000 for singles or $44,000 for couples, up to 85% of benefits can be taxed. Note that this doesn't mean you pay 85% in taxes—it means that 85% of your benefit is added to your taxable income and taxed at your regular rate.
                </p>
                <p className="mb-4">
                  The claiming age decision can affect your tax situation in subtle ways. If you claim early and continue working, you might trigger both the earnings test (which temporarily reduces benefits if you earn too much before FRA) and higher taxes on those benefits. If you delay claiming and draw down traditional IRA or 401(k) funds in the meantime, you might be able to do Roth conversions or manage your tax brackets more effectively.
                </p>
                <p>
                  Some states also tax Social Security benefits, though most don't. If you live in Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, Rhode Island, Utah, Vermont, or West Virginia, check your state's rules, as they may differ from federal taxation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Working While Receiving Benefits</h3>
                <p className="mb-4">
                  You can work and collect Social Security at the same time, but if you claim before reaching FRA, there's an earnings limit that can temporarily reduce your benefits. In 2024, if you're under FRA for the entire year, Social Security deducts $1 from your benefit for every $2 you earn above $22,320. In the year you reach FRA, the limit increases to $59,520, and the reduction is $1 for every $3 you earn over that amount.
                </p>
                <p className="mb-4">
                  Once you reach FRA, the earnings limit disappears entirely. You can earn as much as you want without any reduction to your Social Security benefits. This is one reason many people wait until FRA to claim if they plan to continue working.
                </p>
                <p className="mb-4">
                  Here's the good news: if your benefits are reduced because of the earnings test, you're not losing that money permanently. When you reach FRA, Social Security recalculates your benefit to credit you for the months when benefits were withheld. Essentially, they adjust your benefit upward as if you had claimed a bit later than you actually did.
                </p>
                <p>
                  Also, continuing to work while receiving Social Security can boost your future benefits if your current earnings are higher than some of the years used in your benefit calculation. Social Security automatically recalculates your benefit each year to include your latest earnings if they're among your highest 35 years.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Health Considerations and Life Expectancy</h3>
                <p className="mb-4">
                  Let's be honest—the biggest wildcard in the Social Security claiming decision is how long you're going to live. None of us know for certain, but we can make educated guesses based on our current health, family history, and lifestyle factors.
                </p>
                <p className="mb-4">
                  According to Social Security Administration data, a man reaching age 65 today can expect to live, on average, until about 84. A woman turning 65 can expect to reach 87. And about one out of every four 65-year-olds will live past age 90. These are just averages, of course. Your personal health situation and family history might suggest you'll live significantly longer or shorter.
                </p>
                <p className="mb-4">
                  If you have serious health issues or a family history of early mortality, claiming early makes more sense. Why wait for a larger benefit you might not live long enough to enjoy? On the other hand, if you're in excellent health, have already made it to your 60s without major issues, and have parents or grandparents who lived into their 90s, the math strongly favors delaying.
                </p>
                <p className="mb-4">
                  There's also a psychological aspect to consider. Some people worry that if they delay and die young, they'll have "lost" money. That's technically true in terms of total benefits collected, but it's worth remembering that Social Security is insurance against living too long, not a pure investment. The goal is to ensure you don't run out of money in old age, not to maximize every possible dollar.
                </p>
                <p>
                  For couples, the relevant life expectancy isn't just your own—it's the probability that at least one of you will live a long time. With two people, the odds are good that one of you will make it well into your 80s or beyond, making the delayed claiming strategy for the higher earner quite valuable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Break-Even Age Analysis</h3>
                <p className="mb-4">
                  The break-even age is the age at which the cumulative benefits from delaying catch up to what you would have received by claiming earlier. It's a useful concept for thinking through the trade-offs, though it shouldn't be the only factor in your decision.
                </p>
                <p className="mb-4">
                  If you're deciding between claiming at 62 versus your FRA of 67, the break-even age is typically around 78-80. If you live past that age, you'll have collected more total dollars by waiting until 67. If you don't make it to that age, claiming at 62 would have given you more total benefits.
                </p>
                <p className="mb-4">
                  For those weighing FRA versus age 70, the break-even age is usually around 80-82. Again, live past that point, and delaying wins. Die before then, and you'd have been better off claiming earlier.
                </p>
                <p className="mb-4">
                  Keep in mind that these break-even calculations often assume you're just letting the money sit in a checking account. If you're actually investing the money you receive from early claiming and earning a reasonable return, the break-even ages shift somewhat. Our calculator factors in investment returns and cost-of-living adjustments to give you a more realistic comparison.
                </p>
                <p>
                  Also remember that break-even analysis doesn't capture everything. It doesn't account for the value of longevity insurance—knowing you'll have higher income in your 80s and 90s when you're more likely to face high healthcare costs and may have exhausted other savings. For many people, that peace of mind is worth more than optimizing the break-even calculation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Other Income Sources and Your Claiming Strategy</h3>
                <p className="mb-4">
                  Your Social Security claiming decision doesn't happen in a vacuum. It needs to fit into your overall retirement income plan, including pensions, retirement account withdrawals, part-time work, rental income, and any other money sources you have.
                </p>
                <p className="mb-4">
                  If you have a generous pension or substantial retirement savings, you might have the flexibility to delay Social Security and maximize the benefit. You can live off your other assets in your 60s and treat Social Security as a kind of longevity insurance that kicks in at higher amounts when you need it most.
                </p>
                <p className="mb-4">
                  Conversely, if Social Security will be your primary income source and you don't have much saved, you might need to claim earlier simply to cover basic expenses. There's no point in delaying if it means depleting your savings or going into debt.
                </p>
                <p className="mb-4">
                  One sophisticated strategy involves doing partial Roth conversions in the years between retiring and claiming Social Security. If you retire at 62 but delay Social Security until 70, you have an eight-year window where you might be in a lower tax bracket. During those years, you could convert traditional IRA money to Roth IRAs, paying tax at relatively low rates, then enjoy tax-free withdrawals later while also receiving higher Social Security benefits.
                </p>
                <p>
                  Similarly, if you have health issues that might make you eligible for disability benefits before reaching early retirement age, that's a different calculation entirely. Social Security Disability Insurance (SSDI) has its own rules and benefit amounts, and it can sometimes make sense to claim SSDI and later switch to retirement benefits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Claiming Mistakes to Avoid</h3>
                <p className="mb-4">
                  Over the years, financial advisors have seen people make the same Social Security mistakes repeatedly. Here are some of the most common errors and how to avoid them:
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Claiming Too Early Without Considering Alternatives</h4>
                <p className="mb-4">
                  Many people claim at 62 simply because they can, without running the numbers or considering whether they could afford to wait. Take time to analyze your situation. Could you work a few more years? Draw down savings temporarily? Cut expenses? Even delaying by a year or two can make a meaningful difference.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Ignoring Spousal and Survivor Benefits</h4>
                <p className="mb-4">
                  Married couples often make claiming decisions independently without coordinating. The higher earner's claiming age sets the survivor benefit, which could be crucial if one spouse outlives the other by a decade or more. Run the numbers as a household, not as individuals.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Claiming While Still Working Before FRA</h4>
                <p className="mb-4">
                  If you claim before FRA and continue working, the earnings test can significantly reduce or even eliminate your benefits temporarily. Unless you're earning very little, it usually doesn't make sense to claim before FRA if you're still employed.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Not Checking Your Earnings Record</h4>
                <p className="mb-4">
                  Errors on your Social Security earnings record can reduce your benefit. Log in to ssa.gov and review your statement. If you spot missing or incorrect earnings, contact Social Security to get them corrected. This can take time, so don't wait until you're about to claim.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Forgetting About the Tax Torpedo</h4>
                <p className="mb-4">
                  The "tax torpedo" refers to how Social Security benefits can become taxable as your income increases, creating an effective marginal tax rate higher than you might expect. Factor in potential taxes when deciding how much income you'll actually have from Social Security.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making Your Decision</h3>
                <p className="mb-4">
                  There's no one-size-fits-all answer to when you should claim Social Security. The right age for you depends on your health, financial situation, family circumstances, and personal preferences. But by understanding how the system works and running the numbers for different scenarios, you can make an informed choice that aligns with your retirement goals.
                </p>
                <p className="mb-4">
                  Use this calculator to explore different claiming ages and see how they affect your monthly benefits and lifetime totals. Adjust the assumptions for life expectancy, investment returns, and COLA to reflect your situation. And remember that you can always revisit your plan as circumstances change.
                </p>
                <p className="mb-4">
                  If you're married, have a complex work history, or are dealing with disability or survivor benefits, consider consulting with a financial advisor or Social Security specialist who can help you navigate the nuances. The Social Security Administration also offers free counseling and can answer specific questions about your situation.
                </p>
                <p>
                  Ultimately, Social Security is a foundational piece of retirement income for most Americans. Taking the time to optimize your claiming strategy can pay dividends—quite literally—for the rest of your life.
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
                <Link href="/retirement" className="block p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-slate-800 mb-2">Retirement Calculator</h4>
                  <p className="text-sm text-slate-600">Plan your retirement savings and determine how much you need to retire comfortably</p>
                </Link>

                <Link href="/401k" className="block p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-slate-800 mb-2">401(k) Calculator</h4>
                  <p className="text-sm text-slate-600">Calculate your 401(k) growth and retirement savings potential with employer matching</p>
                </Link>

                <Link href="/ira" className="block p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-slate-800 mb-2">IRA Calculator</h4>
                  <p className="text-sm text-slate-600">Compare Traditional and Roth IRA contributions and tax implications</p>
                </Link>

                <Link href="/investment" className="block p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-slate-800 mb-2">Investment Calculator</h4>
                  <p className="text-sm text-slate-600">Project investment growth over time with regular contributions</p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with precision for your financial planning needs.
          </p>
          <p className="text-center text-xs text-slate-400 mt-2">
            Disclaimer: This calculator provides estimates only. Consult with a financial advisor or the Social Security Administration for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
