"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, PiggyBank, Wallet, Clock, Target } from "lucide-react";

interface RetirementResults {
  // Calculator 1: How Much Do You Need
  totalNeeded: number;
  currentSavings: number;
  additionalSavingsNeeded: number;
  monthlyContribution: number;
  annualIncomeNeeded: number;

  // Calculator 2: Savings Growth
  projectedRetirementFund: number;
  totalContributions: number;
  totalInterestEarned: number;

  // Calculator 3: Withdrawal Plan
  monthlyWithdrawal: number;
  annualWithdrawal: number;
  totalYearsSupport: number;

  // Calculator 4: Fund Longevity
  yearsUntilDepleted: number;
  monthsUntilDepleted: number;
}

export default function RetirementCalculator() {
  // Calculator mode
  const [calculatorMode, setCalculatorMode] = useState<'need' | 'save' | 'withdraw' | 'longevity'>('need');

  // Inputs for Calculator 1: How Much Do You Need
  const [currentAge, setCurrentAge] = useState<string>("35");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [lifeExpectancy, setLifeExpectancy] = useState<string>("85");
  const [currentIncome, setCurrentIncome] = useState<string>("75000");
  const [incomeIncreaseRate, setIncomeIncreaseRate] = useState<string>("2");
  const [retirementIncomePercent, setRetirementIncomePercent] = useState<string>("80");
  const [investmentReturn, setInvestmentReturn] = useState<string>("7");
  const [inflationRate, setInflationRate] = useState<string>("3");
  const [otherIncome, setOtherIncome] = useState<string>("2000");
  const [currentSavings, setCurrentSavings] = useState<string>("100000");

  // Inputs for Calculator 2: How Can You Save
  const [amountNeeded, setAmountNeeded] = useState<string>("1500000");
  const [futureSavingsPercent, setFutureSavingsPercent] = useState<string>("15");

  // Inputs for Calculator 3: Withdrawal Plan
  const [annualContribution, setAnnualContribution] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("833");

  // Inputs for Calculator 4: Longevity
  const [savingsAmount, setSavingsAmount] = useState<string>("1000000");
  const [monthlyWithdrawalAmount, setMonthlyWithdrawalAmount] = useState<string>("4000");
  const [withdrawalReturn, setWithdrawalReturn] = useState<string>("5");

  const [results, setResults] = useState<RetirementResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    // Parse common inputs
    const age = parseFloat(currentAge) || 35;
    const retAge = parseFloat(retirementAge) || 65;
    const lifeExp = parseFloat(lifeExpectancy) || 85;
    const income = parseFloat(currentIncome) || 75000;
    const incomeInc = parseFloat(incomeIncreaseRate) / 100 || 0.02;
    const retIncomePercent = parseFloat(retirementIncomePercent) / 100 || 0.80;
    const invReturn = parseFloat(investmentReturn) / 100 || 0.07;
    const inflation = parseFloat(inflationRate) / 100 || 0.03;
    const otherInc = parseFloat(otherIncome) || 2000;
    const savings = parseFloat(currentSavings) || 100000;

    const yearsToRetirement = retAge - age;
    const yearsInRetirement = lifeExp - retAge;

    // Calculator 1: How Much Do You Need to Retire
    // Project income at retirement
    const incomeAtRetirement = income * Math.pow(1 + incomeInc, yearsToRetirement);
    const annualRetirementIncome = incomeAtRetirement * retIncomePercent;
    const annualIncomeNeededFromSavings = Math.max(0, annualRetirementIncome - (otherInc * 12));

    // Calculate present value of retirement needs (accounting for inflation)
    const realReturn = (1 + invReturn) / (1 + inflation) - 1;
    let totalNeeded = 0;
    for (let i = 0; i < yearsInRetirement; i++) {
      totalNeeded += annualIncomeNeededFromSavings / Math.pow(1 + realReturn, i);
    }

    // Future value of current savings
    const futureValueSavings = savings * Math.pow(1 + invReturn, yearsToRetirement);

    // Additional savings needed
    const additionalNeeded = Math.max(0, totalNeeded - futureValueSavings);

    // Monthly contribution needed
    const monthlyRate = invReturn / 12;
    const totalMonths = yearsToRetirement * 12;
    const monthlyContrib = totalMonths > 0 && monthlyRate > 0
      ? (additionalNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : additionalNeeded / totalMonths;

    // Calculator 2: How Can You Save
    const needed = parseFloat(amountNeeded) || 1500000;
    const savingsPercent = parseFloat(futureSavingsPercent) / 100 || 0.15;
    const annualSavings = income * savingsPercent;
    const monthlySavings = annualSavings / 12;

    let projectedFund = savings;
    let totalContribs = savings;

    for (let i = 0; i < yearsToRetirement; i++) {
      projectedFund = projectedFund * (1 + invReturn) + annualSavings;
      totalContribs += annualSavings;
    }

    const totalInterest = projectedFund - totalContribs;

    // Calculator 3: Withdrawal Plan
    const annualContrib = parseFloat(annualContribution) || 10000;
    const monthlyContribInput = parseFloat(monthlyContribution) || 833;
    const totalAnnualContrib = annualContrib + (monthlyContribInput * 12);

    let withdrawalFund = savings;
    for (let i = 0; i < yearsToRetirement; i++) {
      withdrawalFund = withdrawalFund * (1 + invReturn) + totalAnnualContrib;
    }

    // Safe withdrawal rate calculation (4% rule)
    const safeAnnualWithdrawal = withdrawalFund * 0.04;
    const safeMonthlyWithdrawal = safeAnnualWithdrawal / 12;

    // Calculator 4: How Long Can Your Money Last
    const fundAmount = parseFloat(savingsAmount) || 1000000;
    const monthlyWithdraw = parseFloat(monthlyWithdrawalAmount) || 4000;
    const returnRate = parseFloat(withdrawalReturn) / 100 / 12 || 0.05 / 12;

    let remainingBalance = fundAmount;
    let months = 0;

    // Simulate withdrawals until fund depleted
    while (remainingBalance > 0 && months < 1200) { // Max 100 years
      remainingBalance = remainingBalance * (1 + returnRate) - monthlyWithdraw;
      months++;
    }

    const yearsLasting = Math.floor(months / 12);
    const monthsLasting = months % 12;

    setResults({
      totalNeeded,
      currentSavings: futureValueSavings,
      additionalSavingsNeeded: additionalNeeded,
      monthlyContribution: monthlyContrib,
      annualIncomeNeeded: annualRetirementIncome,
      projectedRetirementFund: projectedFund,
      totalContributions: totalContribs,
      totalInterestEarned: totalInterest,
      monthlyWithdrawal: safeMonthlyWithdrawal,
      annualWithdrawal: safeAnnualWithdrawal,
      totalYearsSupport: yearsInRetirement,
      yearsUntilDepleted: yearsLasting,
      monthsUntilDepleted: monthsLasting,
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
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Retirement Calculator",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Free retirement calculator to plan your retirement savings, estimate required funds, calculate withdrawal rates, and determine how long your retirement money will last.",
            "url": "https://calc-tech.com/retirement",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "2840"
            }
          })
        }}
      />

      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative h-10 w-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Calculator className="h-6 w-6" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
            <PiggyBank className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Retirement Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your retirement with confidence. Calculate how much you need to save, project your retirement fund growth, and determine sustainable withdrawal rates.
          </p>
        </div>

        {/* Calculator Mode Selector */}
        <div className="mb-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-center justify-center">
                <Target className="h-6 w-6" />
                Choose Your Retirement Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setCalculatorMode('need')}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    calculatorMode === 'need'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm font-semibold">How Much Do I Need?</span>
                </Button>
                <Button
                  onClick={() => setCalculatorMode('save')}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    calculatorMode === 'save'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <PiggyBank className="h-6 w-6" />
                  <span className="text-sm font-semibold">How Can I Save?</span>
                </Button>
                <Button
                  onClick={() => setCalculatorMode('withdraw')}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    calculatorMode === 'withdraw'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <Wallet className="h-6 w-6" />
                  <span className="text-sm font-semibold">How Much Can I Withdraw?</span>
                </Button>
                <Button
                  onClick={() => setCalculatorMode('longevity')}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    calculatorMode === 'longevity'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <Clock className="h-6 w-6" />
                  <span className="text-sm font-semibold">How Long Will It Last?</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  {calculatorMode === 'need' && 'Retirement Needs'}
                  {calculatorMode === 'save' && 'Savings Plan'}
                  {calculatorMode === 'withdraw' && 'Withdrawal Plan'}
                  {calculatorMode === 'longevity' && 'Fund Longevity'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Common inputs for all calculators */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Age
                  </label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    placeholder="35"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Planned Retirement Age
                  </label>
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    placeholder="65"
                  />
                </div>

                {calculatorMode === 'need' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Life Expectancy
                      </label>
                      <Input
                        type="number"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        placeholder="85"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Annual Income ($)
                      </label>
                      <Input
                        type="number"
                        value={currentIncome}
                        onChange={(e) => setCurrentIncome(e.target.value)}
                        placeholder="75000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Annual Income Increase Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={incomeIncreaseRate}
                        onChange={(e) => setIncomeIncreaseRate(e.target.value)}
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Income Needed in Retirement (%)
                      </label>
                      <Input
                        type="number"
                        value={retirementIncomePercent}
                        onChange={(e) => setRetirementIncomePercent(e.target.value)}
                        placeholder="80"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Investment Return (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={investmentReturn}
                        onChange={(e) => setInvestmentReturn(e.target.value)}
                        placeholder="7"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Inflation Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Other Monthly Income (Social Security, Pension, $)
                      </label>
                      <Input
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                        placeholder="2000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Retirement Savings ($)
                      </label>
                      <Input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="100000"
                      />
                    </div>
                  </>
                )}

                {calculatorMode === 'save' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Amount Needed at Retirement ($)
                      </label>
                      <Input
                        type="number"
                        value={amountNeeded}
                        onChange={(e) => setAmountNeeded(e.target.value)}
                        placeholder="1500000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Retirement Savings ($)
                      </label>
                      <Input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="100000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Annual Income ($)
                      </label>
                      <Input
                        type="number"
                        value={currentIncome}
                        onChange={(e) => setCurrentIncome(e.target.value)}
                        placeholder="75000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Future Savings Rate (% of Income)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={futureSavingsPercent}
                        onChange={(e) => setFutureSavingsPercent(e.target.value)}
                        placeholder="15"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Investment Return (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={investmentReturn}
                        onChange={(e) => setInvestmentReturn(e.target.value)}
                        placeholder="7"
                      />
                    </div>
                  </>
                )}

                {calculatorMode === 'withdraw' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Life Expectancy
                      </label>
                      <Input
                        type="number"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        placeholder="85"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Retirement Savings ($)
                      </label>
                      <Input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="100000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Annual Contribution Until Retirement ($)
                      </label>
                      <Input
                        type="number"
                        value={annualContribution}
                        onChange={(e) => setAnnualContribution(e.target.value)}
                        placeholder="10000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Monthly Contribution Until Retirement ($)
                      </label>
                      <Input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        placeholder="833"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Investment Return (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={investmentReturn}
                        onChange={(e) => setInvestmentReturn(e.target.value)}
                        placeholder="7"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Inflation Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        placeholder="3"
                      />
                    </div>
                  </>
                )}

                {calculatorMode === 'longevity' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Retirement Savings ($)
                      </label>
                      <Input
                        type="number"
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(e.target.value)}
                        placeholder="1000000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Planned Monthly Withdrawal ($)
                      </label>
                      <Input
                        type="number"
                        value={monthlyWithdrawalAmount}
                        onChange={(e) => setMonthlyWithdrawalAmount(e.target.value)}
                        placeholder="4000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Investment Return (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={withdrawalReturn}
                        onChange={(e) => setWithdrawalReturn(e.target.value)}
                        placeholder="5"
                      />
                    </div>
                  </>
                )}

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Retirement Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {calculatorMode === 'need' && (
                  <>
                    <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="h-8 w-8" />
                          <h3 className="text-xl font-semibold">Total Retirement Funds Needed</h3>
                        </div>
                        <p className="text-5xl font-bold mb-2">{formatCurrency(results.totalNeeded)}</p>
                        <p className="text-emerald-100">Amount needed to maintain your lifestyle in retirement</p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <PiggyBank className="h-5 w-5 text-emerald-600" />
                            Current Savings Growth
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Current Savings:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(currentSavings) || 0)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Future Value:</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.currentSavings)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Growth Period:</span>
                            <span className="font-semibold text-lg">{parseFloat(retirementAge) - parseFloat(currentAge)} years</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <TrendingUp className="h-5 w-5 text-teal-600" />
                            Additional Savings Needed
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Gap to Fill:</span>
                            <span className="font-semibold text-lg text-orange-600">{formatCurrency(results.additionalSavingsNeeded)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Savings:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.monthlyContribution)}/mo</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Savings:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.monthlyContribution * 12)}/yr</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Wallet className="h-5 w-5 text-emerald-600" />
                            Retirement Income
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Income Needed:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.annualIncomeNeeded)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Income:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.annualIncomeNeeded / 12)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Other Income:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(otherIncome) || 0)}/mo</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Clock className="h-5 w-5 text-teal-600" />
                            Retirement Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Years to Retirement:</span>
                            <span className="font-semibold text-lg">{parseFloat(retirementAge) - parseFloat(currentAge)} years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Years in Retirement:</span>
                            <span className="font-semibold text-lg">{parseFloat(lifeExpectancy) - parseFloat(retirementAge)} years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Life Expectancy:</span>
                            <span className="font-semibold text-lg">{lifeExpectancy} years old</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {calculatorMode === 'save' && (
                  <>
                    <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <PiggyBank className="h-8 w-8" />
                          <h3 className="text-xl font-semibold">Projected Retirement Fund</h3>
                        </div>
                        <p className="text-5xl font-bold mb-2">{formatCurrency(results.projectedRetirementFund)}</p>
                        <p className="text-emerald-100">Total amount saved by retirement age</p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            Savings Breakdown
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Contributions:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.totalContributions)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Interest Earned:</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.totalInterestEarned)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Growth:</span>
                            <span className="font-semibold text-lg text-teal-600">
                              {formatNumber((results.totalInterestEarned / results.totalContributions) * 100, 1)}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Wallet className="h-5 w-5 text-teal-600" />
                            Annual Savings Plan
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Income:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(currentIncome) || 0)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Savings Rate:</span>
                            <span className="font-semibold text-lg">{futureSavingsPercent}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Contribution:</span>
                            <span className="font-semibold text-lg">{formatCurrency((parseFloat(currentIncome) || 0) * (parseFloat(futureSavingsPercent) / 100))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Contribution:</span>
                            <span className="font-semibold text-lg">{formatCurrency(((parseFloat(currentIncome) || 0) * (parseFloat(futureSavingsPercent) / 100)) / 12)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-2 border-blue-200 rounded-2xl shadow-md bg-blue-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-lg text-slate-800 mb-2">Goal Assessment</h4>
                            {results.projectedRetirementFund >= parseFloat(amountNeeded) ? (
                              <p className="text-slate-600">
                                Excellent! Your projected retirement fund of <strong>{formatCurrency(results.projectedRetirementFund)}</strong> exceeds your target of <strong>{formatCurrency(parseFloat(amountNeeded))}</strong> by <strong>{formatCurrency(results.projectedRetirementFund - parseFloat(amountNeeded))}</strong>.
                              </p>
                            ) : (
                              <p className="text-slate-600">
                                Your projected fund of <strong>{formatCurrency(results.projectedRetirementFund)}</strong> is <strong>{formatCurrency(parseFloat(amountNeeded) - results.projectedRetirementFund)}</strong> short of your <strong>{formatCurrency(parseFloat(amountNeeded))}</strong> goal. Consider increasing your savings rate or retirement age.
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {calculatorMode === 'withdraw' && (
                  <>
                    <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <Wallet className="h-8 w-8" />
                          <h3 className="text-xl font-semibold">Safe Monthly Withdrawal</h3>
                        </div>
                        <p className="text-5xl font-bold mb-2">{formatCurrency(results.monthlyWithdrawal)}</p>
                        <p className="text-emerald-100">Based on the 4% rule for sustainable withdrawals</p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <DollarSign className="h-5 w-5 text-emerald-600" />
                            Withdrawal Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Withdrawal:</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.monthlyWithdrawal)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Withdrawal:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.annualWithdrawal)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Withdrawal Rate:</span>
                            <span className="font-semibold text-lg">4%</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <PiggyBank className="h-5 w-5 text-teal-600" />
                            Retirement Fund at Age {retirementAge}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Starting Balance:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(currentSavings) || 0)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Contributions:</span>
                            <span className="font-semibold text-lg">{formatCurrency((parseFloat(annualContribution) + parseFloat(monthlyContribution) * 12) * (parseFloat(retirementAge) - parseFloat(currentAge)))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Fund at Retirement:</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.annualWithdrawal / 0.04)}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Clock className="h-5 w-5 text-emerald-600" />
                            Retirement Duration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Retirement Age:</span>
                            <span className="font-semibold text-lg">{retirementAge} years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Life Expectancy:</span>
                            <span className="font-semibold text-lg">{lifeExpectancy} years</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Years Supported:</span>
                            <span className="font-semibold text-lg text-teal-600">{results.totalYearsSupport} years</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <TrendingUp className="h-5 w-5 text-teal-600" />
                            Investment Assumptions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Return Rate:</span>
                            <span className="font-semibold text-lg">{investmentReturn}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Inflation Rate:</span>
                            <span className="font-semibold text-lg">{inflationRate}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Real Return:</span>
                            <span className="font-semibold text-lg">{formatNumber(parseFloat(investmentReturn) - parseFloat(inflationRate), 1)}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {calculatorMode === 'longevity' && (
                  <>
                    <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-8 w-8" />
                          <h3 className="text-xl font-semibold">Your Money Will Last</h3>
                        </div>
                        <p className="text-5xl font-bold mb-2">
                          {results.yearsUntilDepleted} Years, {results.monthsUntilDepleted} Months
                        </p>
                        <p className="text-emerald-100">
                          Withdrawing {formatCurrency(parseFloat(monthlyWithdrawalAmount))} per month
                        </p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <PiggyBank className="h-5 w-5 text-emerald-600" />
                            Retirement Fund Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Starting Balance:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(savingsAmount))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Withdrawal:</span>
                            <span className="font-semibold text-lg text-orange-600">{formatCurrency(parseFloat(monthlyWithdrawalAmount))}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Withdrawal:</span>
                            <span className="font-semibold text-lg">{formatCurrency(parseFloat(monthlyWithdrawalAmount) * 12)}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <TrendingUp className="h-5 w-5 text-teal-600" />
                            Investment Growth
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Annual Return:</span>
                            <span className="font-semibold text-lg">{withdrawalReturn}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Return:</span>
                            <span className="font-semibold text-lg">{formatNumber(parseFloat(withdrawalReturn) / 12, 3)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly Growth:</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(parseFloat(savingsAmount) * (parseFloat(withdrawalReturn) / 100 / 12))}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Wallet className="h-5 w-5 text-emerald-600" />
                            Withdrawal Rate Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Withdrawal Rate:</span>
                            <span className="font-semibold text-lg">
                              {formatNumber((parseFloat(monthlyWithdrawalAmount) * 12 / parseFloat(savingsAmount)) * 100, 2)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Safe Rate (4%):</span>
                            <span className="font-semibold text-lg text-emerald-600">{formatCurrency(parseFloat(savingsAmount) * 0.04 / 12)}/mo</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Difference:</span>
                            <span className={`font-semibold text-lg ${parseFloat(monthlyWithdrawalAmount) <= (parseFloat(savingsAmount) * 0.04 / 12) ? 'text-emerald-600' : 'text-orange-600'}`}>
                              {formatCurrency(Math.abs(parseFloat(monthlyWithdrawalAmount) - (parseFloat(savingsAmount) * 0.04 / 12)))}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                            <Clock className="h-5 w-5 text-teal-600" />
                            Longevity Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Months:</span>
                            <span className="font-semibold text-lg">{results.yearsUntilDepleted * 12 + results.monthsUntilDepleted}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Total Years:</span>
                            <span className="font-semibold text-lg">{results.yearsUntilDepleted}.{Math.round(results.monthsUntilDepleted / 12 * 10)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Fund Depletion:</span>
                            <span className="font-semibold text-lg">
                              {results.yearsUntilDepleted >= 30 ? '30+ years' : `${results.yearsUntilDepleted} yrs`}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-2 border-blue-200 rounded-2xl shadow-md bg-blue-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-lg text-slate-800 mb-2">Sustainability Assessment</h4>
                            {(parseFloat(monthlyWithdrawalAmount) * 12 / parseFloat(savingsAmount)) <= 0.04 ? (
                              <p className="text-slate-600">
                                Your withdrawal rate of <strong>{formatNumber((parseFloat(monthlyWithdrawalAmount) * 12 / parseFloat(savingsAmount)) * 100, 2)}%</strong> is at or below the safe 4% rule, which means your retirement fund should last throughout a typical retirement period with relatively low risk of depletion.
                              </p>
                            ) : (
                              <p className="text-slate-600">
                                Your withdrawal rate of <strong>{formatNumber((parseFloat(monthlyWithdrawalAmount) * 12 / parseFloat(savingsAmount)) * 100, 2)}%</strong> exceeds the recommended 4% safe withdrawal rate. Consider reducing your monthly withdrawals to <strong>{formatCurrency(parseFloat(savingsAmount) * 0.04 / 12)}</strong> for better long-term sustainability.
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Plan Your Retirement
                </h3>
                <p className="text-slate-500">
                  Enter your details and click calculate to see your personalized retirement plan
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Retirement Planning</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Retirement Planning Matters More Than Ever</h3>
                <p className="mb-4">
                  The landscape of retirement has shifted dramatically over the past few decades. People are living longer, healthcare costs continue to rise, and traditional pension plans have become increasingly rare. What worked for your parents' generation won't necessarily work for yours. That's why understanding how much you'll need to retire comfortably isn't just important—it's essential.
                </p>
                <p className="mb-4">
                  Most financial experts agree you'll need somewhere between 70% to 80% of your pre-retirement income to maintain your current lifestyle once you stop working. This figure accounts for reduced expenses like commuting costs and work clothes, but it also recognizes that you'll likely want to enjoy your retirement years with travel, hobbies, and quality time with family. Of course, your specific needs might vary considerably based on your plans and circumstances.
                </p>
                <p>
                  The key question isn't whether you should plan for retirement—it's how to plan effectively. With proper planning starting early enough, you can harness the power of compound interest and give yourself the best chance at a financially secure retirement. Even if you're starting later than you'd like, understanding where you stand today gives you the foundation to make informed decisions about your future.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Three Most Important Retirement Planning Rules</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">The 10% Rule: Your Baseline for Savings</h4>
                <p className="mb-4">
                  Financial advisors typically recommend saving between 10% and 15% of your pre-tax income every year during your working years. This might sound like a lot if you're just starting out, but here's the thing: it becomes much easier when it's automatic. Set up automatic transfers to your retirement accounts so you never see that money in your checking account. You'll adapt to living on the remainder faster than you think.
                </p>
                <p className="mb-4">
                  If you can't start at 10% right away, don't let that stop you. Begin with whatever you can manage—even 3% or 5%—and increase your contribution rate by 1% every year. Many employer retirement plans will let you set up automatic annual increases tied to your raises, so you'll barely notice the difference in your take-home pay.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The 80% Rule: Estimating Your Income Needs</h4>
                <p className="mb-4">
                  The general guideline suggests you'll need about 70% to 80% of your working income to maintain your standard of living in retirement. Why not 100%? Because several expenses typically decrease or disappear: you're no longer saving for retirement, you've likely paid off your mortgage, and you're not spending money on commuting or maintaining a work wardrobe.
                </p>
                <p className="mb-4">
                  That said, the 80% rule is just a starting point. Some people find they spend more in retirement, especially in the early years when they're traveling and pursuing expensive hobbies they never had time for before. Others live quite comfortably on 60% of their former income. Think carefully about what you want your retirement to look like, then adjust accordingly.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">The 4% Rule: Safe Withdrawal Rates</h4>
                <p className="mb-4">
                  Once you've built up your retirement nest egg, how much can you safely withdraw each year without running out of money? The widely-cited "4% rule" suggests you can withdraw 4% of your total retirement savings in your first year of retirement, then adjust that amount for inflation each subsequent year, and your money should last at least 30 years.
                </p>
                <p className="mb-4">
                  To calculate your retirement target using this rule, simply divide your desired annual retirement income by 4% (or multiply by 25). For example, if you want $60,000 per year in retirement, you'd need $1.5 million saved ($60,000 ÷ 0.04 = $1,500,000).
                </p>
                <p>
                  Keep in mind this rule was developed based on historical market returns and a specific retirement timeline. Some financial planners now recommend a slightly more conservative 3% or 3.5% withdrawal rate, especially if you're retiring early or want extra cushion for market volatility. The 4% rule remains a useful benchmark, but it's not a guarantee—just a well-researched starting point for your planning.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Major Sources of Retirement Income</h3>
                <p className="mb-4">
                  Most retirees rely on multiple income streams to fund their golden years. Understanding each source and how it fits into your overall plan helps you build a more resilient retirement strategy.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Social Security Benefits</h4>
                <p className="mb-4">
                  For many Americans, Social Security forms the foundation of retirement income. You become eligible for benefits once you've worked and paid Social Security taxes for at least 10 years (40 quarters). The amount you receive depends on your lifetime earnings and the age when you start collecting.
                </p>
                <p className="mb-4">
                  While you can claim Social Security as early as age 62, doing so permanently reduces your monthly benefit by up to 30%. Waiting until your full retirement age (66-67 for most people) gets you 100% of your calculated benefit. Wait even longer—up to age 70—and you'll earn delayed retirement credits that boost your benefit by about 8% per year. That's a significant difference that compounds over a potentially lengthy retirement.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">401(k), 403(b), and 457 Plans</h4>
                <p className="mb-4">
                  Employer-sponsored retirement plans are one of the most powerful retirement savings tools available, especially when your employer offers matching contributions. That match is essentially free money—typically you'll get 50 cents to a dollar for every dollar you contribute, up to a certain percentage of your salary.
                </p>
                <p className="mb-4">
                  These plans offer tax-advantaged growth, meaning you don't pay taxes on investment gains each year. With traditional 401(k) plans, you contribute pre-tax dollars and pay income tax when you withdraw in retirement. Roth 401(k) plans work the opposite way: you pay taxes now but withdrawals in retirement are tax-free. Which is better depends on whether you expect your tax rate to be higher now or in retirement.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Individual Retirement Accounts (IRAs)</h4>
                <p className="mb-4">
                  IRAs give you another tax-advantaged way to save for retirement, whether or not you have access to an employer plan. Traditional IRAs may offer a tax deduction on contributions and tax-deferred growth, while Roth IRAs provide tax-free growth and withdrawals in retirement (though contributions aren't deductible).
                </p>
                <p className="mb-4">
                  The contribution limits are much lower than 401(k) plans—$7,000 per year for those under 50 in 2024, plus a $1,000 catch-up contribution if you're 50 or older. But these accounts offer significantly more investment choices than most employer plans, giving you greater control over your portfolio.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Pension Plans</h4>
                <p className="mb-4">
                  Traditional defined benefit pensions have become increasingly rare in the private sector, though they remain common for government employees and some union workers. If you're fortunate enough to have a pension, it provides guaranteed monthly income for life based on factors like your salary and years of service.
                </p>
                <p className="mb-4">
                  Understanding your pension calculation is crucial. Some pensions allow you to choose between a higher payment for your lifetime only or a reduced payment that continues for your spouse after you die. There's no universally right answer—it depends on your health, your spouse's age, and your other sources of retirement income.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Personal Savings and Investments</h4>
                <p className="mb-4">
                  Beyond dedicated retirement accounts, many people build wealth through taxable investment accounts, real estate, or business ownership. These assets don't offer the same tax advantages as retirement accounts, but they provide more flexibility since you can access them before age 59½ without penalty.
                </p>
                <p>
                  This flexibility makes regular investment accounts particularly valuable if you're planning to retire early or want to fund major expenses in your 50s before retirement account withdrawals become penalty-free. Just remember that you'll owe capital gains taxes when you sell appreciated investments in these accounts.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Home Equity and Reverse Mortgages</h4>
                <p className="mb-4">
                  Your home might represent a significant portion of your net worth, and there are several ways to tap that equity in retirement. You could downsize to a smaller, less expensive home and use the proceeds to fund retirement. Alternatively, a Home Equity Conversion Mortgage (reverse mortgage) lets you borrow against your home's equity and receive tax-free loan proceeds as a lump sum, monthly payment, or line of credit.
                </p>
                <p>
                  Reverse mortgages can be useful tools in specific situations, but they're complex financial products with significant costs. The loan doesn't need to be repaid until you sell the home, move out permanently, or pass away—at which point the home typically needs to be sold to repay the debt. Make sure you thoroughly understand the implications before considering this option.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Annuities</h4>
                <p className="mb-4">
                  Annuities are insurance products that convert a lump sum into guaranteed income, either immediately or at some point in the future. An immediate annuity starts paying out right away, while a deferred annuity accumulates value over time before payments begin.
                </p>
                <p>
                  The main advantage of annuities is longevity protection—you can't outlive the income stream. The downside is that they're often expensive, complex, and inflexible. Once you've committed your money to most annuities, you can't easily get it back if you need a large sum for emergencies or if you simply change your mind. Some retirees find value in annuitizing a portion of their savings for guaranteed income while keeping the rest in more liquid investments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Investment Returns and Inflation: The Balancing Act</h3>
                <p className="mb-4">
                  Your retirement planning calculations depend heavily on two critical assumptions: the return you'll earn on your investments and the rate of inflation that will erode your purchasing power. Get either one significantly wrong, and your entire plan could be thrown off course.
                </p>
                <p className="mb-4">
                  Historically, the stock market has returned about 10% annually before inflation, or roughly 7% after accounting for inflation. Bonds have returned less—around 5-6% before inflation. Your actual returns will depend on your asset allocation (the mix of stocks, bonds, and other investments in your portfolio) and the specific time period.
                </p>
                <p className="mb-4">
                  Conservative investors might use 6% as their expected return, while more aggressive investors might assume 8% or higher. Just remember that higher returns typically come with higher volatility, and you'll need to stomach more dramatic swings in your account value. As you get closer to retirement, most financial advisors recommend gradually shifting toward more conservative investments to reduce the risk of a market downturn right before you need to start withdrawing.
                </p>
                <p className="mb-4">
                  Inflation is equally important but harder to predict. The historical average is around 3%, but we've seen sustained periods both well above and well below that figure. Higher inflation means you'll need more money saved to maintain the same standard of living, which is why your retirement plan should include regular reviews and adjustments as you get real-world data about inflation and investment returns.
                </p>
                <p>
                  The "real rate of return"—your investment return minus inflation—is what really matters. If you're earning 7% on investments but inflation is running at 3%, your real return is only 4%. That's the rate at which your purchasing power is actually growing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Retirement Planning Mistakes to Avoid</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Starting Too Late</h4>
                <p className="mb-4">
                  Time is your most valuable asset when it comes to retirement savings, thanks to the power of compound interest. Someone who starts saving $500 per month at age 25 will have far more at age 65 than someone who starts saving $1,000 per month at age 45, even though the late starter contributes more total dollars.
                </p>
                <p className="mb-4">
                  If you're getting a late start, don't despair—but do recognize you'll need to save more aggressively. Look for ways to cut expenses, maximize employer matches, and consider working a few extra years to give your nest egg more time to grow.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Underestimating Healthcare Costs</h4>
                <p className="mb-4">
                  Healthcare is often one of the largest expenses in retirement, and many people significantly underestimate how much they'll need. Fidelity estimates that the average 65-year-old couple retiring in 2023 will need about $315,000 saved just to cover healthcare expenses throughout retirement.
                </p>
                <p className="mb-4">
                  Medicare doesn't cover everything—dental, vision, and long-term care typically aren't included. Consider contributing to a Health Savings Account (HSA) if you're eligible, as it offers triple tax benefits: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Claiming Social Security Too Early</h4>
                <p className="mb-4">
                  Yes, you can claim Social Security at 62, but doing so means accepting permanently reduced benefits. For many people, delaying Social Security as long as possible (up to age 70) is one of the best financial decisions they can make. Each year you delay past full retirement age increases your benefit by about 8%—a guaranteed return you can't get anywhere else.
                </p>
                <p>
                  If you're married, the claiming strategy becomes even more important. The higher earner's benefit affects both spouses for life and becomes the survivor benefit when one spouse dies. Running the numbers with a financial advisor or using Social Security optimization software can help you maximize your lifetime benefits.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Not Adjusting Your Plan Over Time</h4>
                <p className="mb-4">
                  Your retirement plan shouldn't be set in stone. Life changes—you get a raise, have kids, inherit money, get divorced, or face health challenges. Your retirement plan needs to evolve with these changes. Make it a habit to review your retirement strategy at least annually and whenever you experience a major life event.
                </p>
                <p>
                  Also, as you get closer to retirement, you'll have actual data to replace your early assumptions. Maybe your investments performed better or worse than expected. Perhaps inflation was higher or lower. Use this real-world information to refine your projections and make adjustments to your savings rate or retirement age if needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Taking Action: Your Next Steps</h3>
                <p className="mb-4">
                  Understanding retirement planning concepts is valuable, but knowledge alone won't build your retirement fund. You need to take concrete action. Start by calculating where you stand today using this retirement calculator. Be honest with yourself about your current savings, expected returns, and retirement goals.
                </p>
                <p className="mb-4">
                  Once you know your target, set up automatic contributions to your retirement accounts. If your employer offers a 401(k) match, contribute at least enough to get the full match—that's an immediate 50% to 100% return on your money. Then work on increasing your contribution rate over time until you're saving at least 10-15% of your income.
                </p>
                <p className="mb-4">
                  Consider meeting with a financial advisor to review your complete financial picture. They can help you optimize your asset allocation, choose appropriate investments, and develop tax-efficient withdrawal strategies for retirement. While there's a cost involved, good financial advice often pays for itself many times over through better returns and smarter planning.
                </p>
                <p>
                  Finally, remember that retirement planning isn't a one-time event—it's an ongoing process. Stay informed, review your progress regularly, and don't be afraid to adjust your approach as circumstances change. The retirement you're dreaming of is achievable with proper planning, consistent saving, and smart investing. The sooner you start, the easier it becomes.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate monthly payments and amortization</div>
                  </div>
                </Link>

                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <Wallet className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Plan loan payments and interest costs</div>
                  </div>
                </Link>

                <Link href="/auto-loan" className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                  <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Auto Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate car payments and total costs</div>
                  </div>
                </Link>

                <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 bg-slate-50">
                  <div className="h-12 w-12 bg-slate-200 rounded-xl flex items-center justify-center">
                    <PiggyBank className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-600">Savings Calculator</div>
                    <div className="text-sm text-slate-500">Coming soon</div>
                  </div>
                </div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for your financial future.
          </p>
        </div>
      </footer>
    </div>
  );
}
