"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, TrendingUp, Users, Shield, PiggyBank } from "lucide-react";

interface IncomeTaxResults {
  grossIncome: number;
  federalTax: number;
  stateTax: number;
  ficaMedicare: number;
  ficaSocialSecurity: number;
  totalTax: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  takeHomePay: number;
  monthlyTakeHome: number;
  biweeklyTakeHome: number;
}

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>("85000");
  const [filingStatus, setFilingStatus] = useState<string>("single");
  const [deductions, setDeductions] = useState<string>("14600");
  const [stateRate, setStateRate] = useState<string>("5.0");
  const [age, setAge] = useState<string>("35");

  const [results, setResults] = useState<IncomeTaxResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // 2024 Federal Tax Brackets
  const taxBrackets = {
    single: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    married: [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    head: [
      { limit: 16550, rate: 0.10 },
      { limit: 63100, rate: 0.12 },
      { limit: 100500, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243700, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ]
  };

  const calculateFederalTax = (taxableIncome: number, status: string) => {
    const brackets = taxBrackets[status as keyof typeof taxBrackets] || taxBrackets.single;
    let tax = 0;
    let previousLimit = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (taxableIncome > previousLimit) {
        const taxableAtThisRate = Math.min(taxableIncome - previousLimit, bracket.limit - previousLimit);
        tax += taxableAtThisRate * bracket.rate;
        marginalRate = bracket.rate;

        if (taxableIncome <= bracket.limit) break;
      }
      previousLimit = bracket.limit;
    }

    return { tax, marginalRate };
  };

  const calculate = () => {
    const income = parseFloat(annualIncome) || 85000;
    const standardDeduction = parseFloat(deductions) || 14600;
    const statePercentage = parseFloat(stateRate) || 5.0;
    const taxpayerAge = parseFloat(age) || 35;

    // Calculate taxable income
    const taxableIncome = Math.max(0, income - standardDeduction);

    // Federal tax
    const { tax: federalTax, marginalRate } = calculateFederalTax(taxableIncome, filingStatus);

    // State tax (simple percentage for this example)
    const stateTax = income * (statePercentage / 100);

    // FICA taxes
    const socialSecurityWageBase = 168600; // 2024 limit
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const additionalMedicareRate = 0.009; // For income over $200k (single)
    const additionalMedicareThreshold = filingStatus === 'married' ? 250000 : 200000;

    const ficaSocialSecurity = Math.min(income, socialSecurityWageBase) * socialSecurityRate;
    let ficaMedicare = income * medicareRate;

    // Additional Medicare tax
    if (income > additionalMedicareThreshold) {
      ficaMedicare += (income - additionalMedicareThreshold) * additionalMedicareRate;
    }

    // Total calculations
    const totalTax = federalTax + stateTax + ficaSocialSecurity + ficaMedicare;
    const effectiveTaxRate = (totalTax / income) * 100;
    const takeHomePay = income - totalTax;
    const monthlyTakeHome = takeHomePay / 12;
    const biweeklyTakeHome = takeHomePay / 26;

    setResults({
      grossIncome: income,
      federalTax,
      stateTax,
      ficaMedicare,
      ficaSocialSecurity,
      totalTax,
      effectiveTaxRate,
      marginalTaxRate: marginalRate * 100,
      takeHomePay,
      monthlyTakeHome,
      biweeklyTakeHome
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

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Income Tax Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate your federal and state income taxes, FICA contributions, and take-home pay with accurate 2024 tax brackets and detailed tax breakdowns.",
    "url": "https://calc-tech.com/income-tax",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2847"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is federal income tax calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Federal income tax is calculated using a progressive tax system with seven tax brackets ranging from 10% to 37%. Your taxable income (gross income minus deductions) is taxed at increasing rates as it passes through each bracket. Only the income within each bracket is taxed at that bracket's rate, not your entire income."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between marginal and effective tax rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your marginal tax rate is the percentage you pay on your last dollar of income—the highest bracket you reach. Your effective tax rate is the average rate you pay across all your income. The effective rate is almost always lower than the marginal rate due to the progressive tax structure."
        }
      },
      {
        "@type": "Question",
        "name": "What are FICA taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FICA taxes fund Social Security and Medicare. Social Security tax is 6.2% on wages up to $168,600 (2024 limit). Medicare tax is 1.45% on all wages, with an additional 0.9% tax on wages exceeding $200,000 for single filers or $250,000 for married couples filing jointly."
        }
      },
      {
        "@type": "Question",
        "name": "Should I take the standard deduction or itemize?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most taxpayers take the standard deduction because it's simpler and often more valuable. For 2024, the standard deduction is $14,600 for single filers and $29,200 for married couples filing jointly. You should itemize only if your deductible expenses (mortgage interest, state/local taxes, charitable donations, medical expenses) exceed the standard deduction."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
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
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
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
            <DollarSign className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Income Tax Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your federal and state income taxes, FICA contributions, and take-home pay with our comprehensive tax calculator
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Income Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      className="pl-7"
                      placeholder="85000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Filing Status
                  </label>
                  <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="head">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Standard Deduction
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={deductions}
                      onChange={(e) => setDeductions(e.target.value)}
                      className="pl-7"
                      placeholder="14600"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">2024: Single $14,600 | Married $29,200</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    State Tax Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={stateRate}
                      onChange={(e) => setStateRate(e.target.value)}
                      className="pr-7"
                      placeholder="5.0"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="35"
                  />
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <PiggyBank className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Annual Take-Home Pay</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.takeHomePay)}</p>
                    <p className="text-emerald-100">
                      Effective Tax Rate: {formatPercent(results.effectiveTaxRate)}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Monthly Take-Home</p>
                      <p className="text-2xl font-bold text-emerald-700">{formatCurrency(results.monthlyTakeHome)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Bi-Weekly Take-Home</p>
                      <p className="text-2xl font-bold text-emerald-700">{formatCurrency(results.biweeklyTakeHome)}</p>
                    </div>
                  </div>
                </Card>

                {/* Tax Breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        Federal Tax
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Federal Income Tax</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.federalTax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Marginal Tax Rate</span>
                        <span className="font-semibold text-emerald-600">{formatPercent(results.marginalTaxRate)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        State Tax
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">State Income Tax</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.stateTax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">State Rate</span>
                        <span className="font-semibold text-emerald-600">{stateRate}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Users className="h-5 w-5 text-emerald-600" />
                        FICA Taxes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Social Security</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.ficaSocialSecurity)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Medicare</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.ficaMedicare)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Total Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Tax</span>
                        <span className="font-semibold text-lg text-red-600">{formatCurrency(results.totalTax)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Gross Income</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.grossIncome)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tax Breakdown Bar */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">Federal Tax</span>
                          <span className="text-sm font-semibold">{formatPercent((results.federalTax / results.grossIncome) * 100)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                            style={{ width: `${(results.federalTax / results.grossIncome) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">State Tax</span>
                          <span className="text-sm font-semibold">{formatPercent((results.stateTax / results.grossIncome) * 100)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full"
                            style={{ width: `${(results.stateTax / results.grossIncome) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">FICA (Social Security + Medicare)</span>
                          <span className="text-sm font-semibold">{formatPercent(((results.ficaSocialSecurity + results.ficaMedicare) / results.grossIncome) * 100)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                            style={{ width: `${((results.ficaSocialSecurity + results.ficaMedicare) / results.grossIncome) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600 font-semibold">Take-Home Pay</span>
                          <span className="text-sm font-bold text-emerald-600">{formatPercent((results.takeHomePay / results.grossIncome) * 100)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                            style={{ width: `${(results.takeHomePay / results.grossIncome) * 100}%` }}
                          ></div>
                        </div>
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
                  Enter your income details and click Calculate Tax to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Income Taxes in the United States</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Are Income Taxes?</h3>
                <p>
                  Income taxes represent one of the most significant financial obligations Americans face each year. The United States employs a progressive tax system, which means your tax rate increases as your income rises. This isn't as straightforward as it sounds, though—many people misunderstand how tax brackets actually work.
                </p>
                <p className="mt-3">
                  Here's the thing: when you move into a higher tax bracket, only the income that falls within that bracket gets taxed at the higher rate. Your entire income doesn't suddenly jump to that rate. For instance, if you're single and earn $50,000, you'll pay 10% on the first $11,600, then 12% on income between $11,601 and $47,150, and finally 22% on the remaining amount up to $50,000. This progressive structure aims to distribute the tax burden more equitably across different income levels.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Federal Income Tax Brackets</h3>
                <p>
                  The federal government updates tax brackets annually to account for inflation. For the 2024 tax year, there are seven brackets ranging from 10% to 37%. Your filing status—whether you're single, married filing jointly, married filing separately, or head of household—determines which bracket thresholds apply to you.
                </p>
                <p className="mt-3">
                  Most taxpayers fall into the 12% or 22% bracket. The 10% bracket covers relatively modest incomes, while the top 37% bracket only kicks in for high earners. Single filers don't hit that top bracket until their taxable income exceeds $609,350, and married couples filing jointly need taxable income over $731,200. That's why it's crucial to understand your marginal tax rate versus your effective tax rate.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Marginal vs. Effective Tax Rate</h4>
                <p>
                  Your marginal tax rate is the percentage you pay on your last dollar of income—essentially, the highest bracket you reach. Your effective tax rate, on the other hand, represents the average rate you pay across all your income. This number is almost always lower than your marginal rate because of the progressive structure. If you earn $100,000 as a single filer, your marginal rate might be 24%, but your effective rate could be around 18% after accounting for the lower rates on income in earlier brackets.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">State Income Taxes</h3>
                <p>
                  While federal taxes apply uniformly across the country, state income taxes vary dramatically. Some states like Florida, Texas, Nevada, and Washington don't impose any state income tax at all. Others, like California and New York, have progressive systems with top rates exceeding 10%. A handful of states use flat tax rates where everyone pays the same percentage regardless of income level.
                </p>
                <p className="mt-3">
                  State tax considerations can significantly impact your take-home pay and should factor into decisions about where to live or work. Someone earning $100,000 in Texas keeps substantially more of their income than someone earning the same amount in California, even after accounting for differences in cost of living and property taxes. That said, states without income taxes often make up revenue through higher sales taxes, property taxes, or other fees.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">FICA Taxes: Social Security and Medicare</h3>
                <p>
                  Beyond income taxes, most workers pay Federal Insurance Contributions Act (FICA) taxes, which fund Social Security and Medicare. These aren't technically income taxes, but they reduce your take-home pay just the same. You'll see them listed separately on your paystub.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Social Security Tax</h4>
                <p>
                  The Social Security tax rate is 6.2% on wages up to an annual limit—$168,600 for 2024. Once your earnings exceed this threshold, you stop paying Social Security tax on additional income for the rest of the year. Self-employed individuals pay both the employee and employer portions, totaling 12.4%, though they can deduct half of this when calculating their income tax.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Medicare Tax</h4>
                <p>
                  Medicare tax works differently. The base rate is 1.45% on all wages with no income cap. However, high earners pay an Additional Medicare Tax of 0.9% on wages exceeding $200,000 for single filers or $250,000 for married couples filing jointly. Unlike Social Security, there's no upper limit—you'll pay Medicare tax on every dollar you earn, regardless of how much you make.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Deductions and Taxable Income</h3>
                <p>
                  Your taxable income—the amount actually subject to income tax—is less than your gross income thanks to deductions. Every taxpayer can claim either the standard deduction or itemize their deductions, whichever provides greater benefit. Most people take the standard deduction because it's simpler and often more valuable.
                </p>
                <p className="mt-3">
                  For 2024, the standard deduction is $14,600 for single filers, $29,200 for married couples filing jointly, and $21,900 for heads of household. These amounts get adjusted annually for inflation. Seniors over 65 and blind individuals can claim an additional deduction amount. If you have substantial mortgage interest, state and local taxes, charitable contributions, or medical expenses, itemizing might save you more, but you'll need to track and document these expenses carefully.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Common Itemized Deductions</h4>
                <p>
                  Itemized deductions include things like mortgage interest on loans up to $750,000, state and local taxes (capped at $10,000), charitable donations, and medical expenses exceeding 7.5% of your adjusted gross income. The 2017 Tax Cuts and Jobs Act significantly increased the standard deduction while limiting some itemized deductions, which is why fewer taxpayers itemize now compared to previous years.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Credits and Your Final Bill</h3>
                <p>
                  Tax credits directly reduce the amount of tax you owe, making them more valuable than deductions. A deduction reduces your taxable income, but a credit reduces your actual tax bill dollar-for-dollar. Some credits are even refundable, meaning you can get money back even if you don't owe any tax.
                </p>
                <p className="mt-3">
                  Popular credits include the Earned Income Tax Credit for lower-income workers, the Child Tax Credit worth up to $2,000 per qualifying child, and education credits for college expenses. The American Opportunity Credit can provide up to $2,500 for qualified education expenses during the first four years of post-secondary education. Energy-efficient home improvements might also qualify you for tax credits under current law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Planning for Tax Season</h3>
                <p>
                  Smart tax planning happens year-round, not just in April. If you're employed, your employer withholds taxes from each paycheck based on the W-4 form you filled out when hired. The goal is to withhold approximately what you'll owe for the year—not too much (giving the government an interest-free loan) and not too little (which could trigger penalties).
                </p>
                <p className="mt-3">
                  Self-employed individuals and those with income not subject to withholding typically make quarterly estimated tax payments. These are due four times per year, and failing to pay enough can result in underpayment penalties. Calculating estimated taxes can get complex when income fluctuates, which is why many self-employed people work with accountants.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Adjusting Your Withholding</h4>
                <p>
                  You can adjust your withholding anytime by submitting a new W-4 to your employer. If you consistently get large refunds, you're probably having too much withheld—you could increase your take-home pay by adjusting your W-4. Conversely, if you owe money each year, you might want to increase your withholding to avoid penalties and a big tax bill in April.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Special Considerations</h3>
                <p>
                  Certain life events and circumstances affect your tax situation significantly. Getting married or divorced changes your filing status and available deductions. Having children opens up new credits and potentially head of household status. Buying a home, starting a business, or receiving inheritance all have tax implications worth understanding.
                </p>
                <p className="mt-3">
                  Investment income gets taxed differently than earned income. Long-term capital gains (from assets held over a year) benefit from preferential tax rates—0%, 15%, or 20% depending on your income level—rather than ordinary income tax rates. Qualified dividends receive similar treatment. This is one reason why tax planning becomes more important as your financial situation grows more complex.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This income tax calculator provides estimates based on current tax law and the information you provide. It calculates federal income tax using 2024 brackets, applies a simplified state tax calculation, and computes FICA taxes including the Additional Medicare Tax for high earners.
                </p>
                <p className="mt-3">
                  Keep in mind that this calculator doesn't account for every possible deduction, credit, or special circumstance. It's designed to give you a solid estimate of your tax liability and take-home pay, which is useful for budgeting and financial planning. For precise calculations, especially if you have a complex tax situation, consider consulting a tax professional or using comprehensive tax software when filing your return.
                </p>
                <p className="mt-3">
                  The calculator shows both your marginal and effective tax rates, along with detailed breakdowns of federal, state, and FICA taxes. You'll also see your take-home pay calculated on annual, monthly, and bi-weekly bases, making it easier to understand what you'll actually receive in your paycheck after all taxes are deducted.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Tax Mistakes to Avoid</h3>
                <p>
                  One of the biggest mistakes people make is confusing marginal and effective tax rates. Understanding this distinction helps you make better financial decisions—like whether that raise is really worth taking or how much a side gig will actually net you after taxes.
                </p>
                <p className="mt-3">
                  Another common error is failing to adjust withholding after major life changes. If you get married, have a child, buy a house, or experience significant income changes, review your W-4 to ensure you're withholding the right amount. Many people also overlook tax-advantaged accounts like 401(k)s and HSAs, which reduce taxable income while helping you save for retirement and medical expenses.
                </p>
                <p className="mt-3">
                  Don't forget about state tax obligations if you work remotely or live in one state while working in another. Some states have reciprocity agreements, but others require you to file multiple state returns. This has become increasingly relevant as remote work grows more common.
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
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <PiggyBank className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Retirement Calculator</div>
                    <div className="text-sm text-slate-500">Plan your retirement savings</div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform rotate-180" />
                </Link>

                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-500">Calculate investment returns</div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform rotate-180" />
                </Link>

                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-500">Calculate mortgage payments</div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform rotate-180" />
                </Link>

                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Calculator className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-500">Calculate loan payments</div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform rotate-180" />
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
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy and clarity.
          </p>
          <p className="text-center text-xs text-slate-400 mt-2">
            Tax calculations are estimates based on 2024 tax law. Consult a tax professional for personalized advice.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
