"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Home, DollarSign, TrendingUp, PiggyBank, AlertCircle } from "lucide-react";

interface AffordabilityResults {
  maxHomePrice: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHOA: number;
  monthlyInsurance: number;
  frontEndRatio: number;
  backEndRatio: number;
  maxMonthlyPayment: number;
  monthlyGrossIncome: number;
}

interface BudgetResults {
  maxHomePrice: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHOA: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  totalMonthlyPayment: number;
}

export default function HouseAffordabilityCalculator() {
  // Calculator mode
  const [calculatorMode, setCalculatorMode] = useState<'income' | 'budget'>('income');

  // Income-based calculator inputs
  const [annualIncome, setAnnualIncome] = useState<string>("85000");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("7.0");
  const [monthlyDebt, setMonthlyDebt] = useState<string>("500");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [propertyTaxPercent, setPropertyTaxPercent] = useState<string>("1.2");
  const [hoaFee, setHOAFee] = useState<string>("100");
  const [insurance, setInsurance] = useState<string>("150");
  const [dtiRatio, setDTIRatio] = useState<string>("36");
  const [frontEndRatio, setFrontEndRatio] = useState<string>("28");

  // Budget-based calculator inputs
  const [monthlyBudget, setMonthlyBudget] = useState<string>("2500");
  const [budgetLoanTerm, setBudgetLoanTerm] = useState<string>("30");
  const [budgetInterestRate, setBudgetInterestRate] = useState<string>("7.0");
  const [budgetDownPaymentPercent, setBudgetDownPaymentPercent] = useState<string>("20");
  const [budgetPropertyTaxPercent, setBudgetPropertyTaxPercent] = useState<string>("1.2");
  const [budgetHOAFee, setBudgetHOAFee] = useState<string>("100");
  const [budgetInsurance, setBudgetInsurance] = useState<string>("150");
  const [budgetMaintenance, setBudgetMaintenance] = useState<string>("1.0");

  const [incomeResults, setIncomeResults] = useState<AffordabilityResults | null>(null);
  const [budgetResults, setBudgetResults] = useState<BudgetResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateIncomeBased = () => {
    const income = parseFloat(annualIncome) || 85000;
    const term = parseFloat(loanTerm) || 30;
    const rate = parseFloat(interestRate) / 100 || 0.07;
    const debt = parseFloat(monthlyDebt) || 500;
    const downPmt = parseFloat(downPaymentPercent) / 100 || 0.20;
    const propTax = parseFloat(propertyTaxPercent) / 100 || 0.012;
    const hoa = parseFloat(hoaFee) || 100;
    const ins = parseFloat(insurance) || 150;
    const backEndDTI = parseFloat(dtiRatio) / 100 || 0.36;
    const frontEndDTI = parseFloat(frontEndRatio) / 100 || 0.28;

    const monthlyGrossIncome = income / 12;

    // Calculate maximum monthly housing payment based on front-end ratio
    const maxHousingPaymentFrontEnd = monthlyGrossIncome * frontEndDTI;

    // Calculate maximum monthly housing payment based on back-end ratio
    const maxHousingPaymentBackEnd = (monthlyGrossIncome * backEndDTI) - debt;

    // Use the more conservative (lower) of the two
    const maxMonthlyPayment = Math.min(maxHousingPaymentFrontEnd, maxHousingPaymentBackEnd);

    // Subtract HOA and insurance from max payment to get remaining for P&I + property tax
    const remainingForPIandTax = maxMonthlyPayment - hoa - ins;

    // Use iterative approach to find max home price
    let homePrice = 100000;
    let step = 50000;
    let iterations = 0;
    const maxIterations = 100;

    while (iterations < maxIterations) {
      const loanAmt = homePrice * (1 - downPmt);

      // Calculate monthly principal and interest
      const monthlyRate = rate / 12;
      const numPayments = term * 12;
      const monthlyPI = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                       (Math.pow(1 + monthlyRate, numPayments) - 1);

      // Calculate monthly property tax
      const monthlyPropTax = (homePrice * propTax) / 12;

      const totalPIandTax = monthlyPI + monthlyPropTax;

      if (Math.abs(totalPIandTax - remainingForPIandTax) < 10) {
        break;
      }

      if (totalPIandTax > remainingForPIandTax) {
        homePrice -= step;
        step = step / 2;
      } else {
        homePrice += step;
      }

      iterations++;
    }

    // Calculate final values
    const finalLoanAmount = homePrice * (1 - downPmt);
    const finalDownPayment = homePrice * downPmt;
    const monthlyRate = rate / 12;
    const numPayments = term * 12;
    const monthlyPI = finalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyPropTax = (homePrice * propTax) / 12;
    const totalMonthlyPayment = monthlyPI + monthlyPropTax + hoa + ins;

    const actualFrontEndRatio = (totalMonthlyPayment / monthlyGrossIncome) * 100;
    const actualBackEndRatio = ((totalMonthlyPayment + debt) / monthlyGrossIncome) * 100;

    setIncomeResults({
      maxHomePrice: homePrice,
      downPayment: finalDownPayment,
      loanAmount: finalLoanAmount,
      monthlyPayment: totalMonthlyPayment,
      monthlyPrincipalInterest: monthlyPI,
      monthlyPropertyTax: monthlyPropTax,
      monthlyHOA: hoa,
      monthlyInsurance: ins,
      frontEndRatio: actualFrontEndRatio,
      backEndRatio: actualBackEndRatio,
      maxMonthlyPayment: maxMonthlyPayment,
      monthlyGrossIncome: monthlyGrossIncome
    });

    setHasCalculated(true);
  };

  const calculateBudgetBased = () => {
    const budget = parseFloat(monthlyBudget) || 2500;
    const term = parseFloat(budgetLoanTerm) || 30;
    const rate = parseFloat(budgetInterestRate) / 100 || 0.07;
    const downPmt = parseFloat(budgetDownPaymentPercent) / 100 || 0.20;
    const propTax = parseFloat(budgetPropertyTaxPercent) / 100 || 0.012;
    const hoa = parseFloat(budgetHOAFee) || 100;
    const ins = parseFloat(budgetInsurance) || 150;
    const maint = parseFloat(budgetMaintenance) / 100 || 0.01;

    // Subtract fixed monthly costs from budget
    const remainingForPIandTax = budget - hoa - ins;

    // Use iterative approach to find max home price
    let homePrice = 100000;
    let step = 50000;
    let iterations = 0;
    const maxIterations = 100;

    while (iterations < maxIterations) {
      const loanAmt = homePrice * (1 - downPmt);

      // Calculate monthly principal and interest
      const monthlyRate = rate / 12;
      const numPayments = term * 12;
      const monthlyPI = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                       (Math.pow(1 + monthlyRate, numPayments) - 1);

      // Calculate monthly property tax
      const monthlyPropTax = (homePrice * propTax) / 12;

      // Calculate monthly maintenance
      const monthlyMaint = (homePrice * maint) / 12;

      const totalPIandTaxAndMaint = monthlyPI + monthlyPropTax + monthlyMaint;

      if (Math.abs(totalPIandTaxAndMaint - remainingForPIandTax) < 10) {
        break;
      }

      if (totalPIandTaxAndMaint > remainingForPIandTax) {
        homePrice -= step;
        step = step / 2;
      } else {
        homePrice += step;
      }

      iterations++;
    }

    // Calculate final values
    const finalLoanAmount = homePrice * (1 - downPmt);
    const finalDownPayment = homePrice * downPmt;
    const monthlyRate = rate / 12;
    const numPayments = term * 12;
    const monthlyPI = finalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyPropTax = (homePrice * propTax) / 12;
    const monthlyMaint = (homePrice * maint) / 12;
    const totalMonthlyPayment = monthlyPI + monthlyPropTax + hoa + ins + monthlyMaint;

    setBudgetResults({
      maxHomePrice: homePrice,
      downPaymentAmount: finalDownPayment,
      loanAmount: finalLoanAmount,
      monthlyPrincipalInterest: monthlyPI,
      monthlyPropertyTax: monthlyPropTax,
      monthlyHOA: hoa,
      monthlyInsurance: ins,
      monthlyMaintenance: monthlyMaint,
      totalMonthlyPayment: totalMonthlyPayment
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      if (calculatorMode === 'income') {
        calculateIncomeBased();
      } else {
        calculateBudgetBased();
      }
    }
  }, [calculatorMode]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatCurrencyDetailed = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const results = calculatorMode === 'income' ? incomeResults : budgetResults;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "House Affordability Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate how much house you can afford based on your income and budget. Free online calculator with detailed debt-to-income ratios and monthly payment breakdowns.",
    "url": "https://calc-tech.com/house-affordability",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2847"
    }
  };

  return (
    <>
      <Head>
        <title>House Affordability Calculator - Free Online Home Affordability Tool | Calc-Tech.com</title>
        <meta name="description" content="Calculate how much house you can afford based on your income and budget. Free online affordability calculator with detailed DTI ratios, monthly payment breakdowns, and expert guidance." />
        <meta name="keywords" content="house affordability calculator, home affordability, how much house can I afford, mortgage affordability, DTI calculator, debt-to-income ratio, home buying calculator" />
        <link rel="canonical" href="https://calc-tech.com/house-affordability" />
        <meta property="og:title" content="House Affordability Calculator - Calc-Tech.com" />
        <meta property="og:description" content="Calculate how much house you can afford based on your income and budget. Get instant results with detailed monthly payment breakdowns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calc-tech.com/house-affordability" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="House Affordability Calculator - Calc-Tech.com" />
        <meta name="twitter:description" content="Calculate how much house you can afford based on your income and budget. Free online tool with instant results." />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Home className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            House Affordability Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover how much house you can afford based on your income and budget. Get instant calculations with detailed breakdowns of monthly payments and debt-to-income ratios.
          </p>
        </div>

        {/* Calculator Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => {
              setCalculatorMode('income');
              setHasCalculated(false);
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              calculatorMode === 'income'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-300'
            }`}
          >
            Income-Based
          </Button>
          <Button
            onClick={() => {
              setCalculatorMode('budget');
              setHasCalculated(false);
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              calculatorMode === 'budget'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-300'
            }`}
          >
            Budget-Based
          </Button>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  {calculatorMode === 'income' ? 'Income Details' : 'Budget Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {calculatorMode === 'income' ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Annual Household Income (Before Tax)
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
                        Monthly Debt Payments
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={monthlyDebt}
                          onChange={(e) => setMonthlyDebt(e.target.value)}
                          className="pl-7"
                          placeholder="500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Loan Term (Years)
                        </label>
                        <Input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Interest Rate
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="pr-7"
                            placeholder="7.0"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Down Payment
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(e.target.value)}
                          className="pr-7"
                          placeholder="20"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Property Tax Rate (Annual)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={propertyTaxPercent}
                          onChange={(e) => setPropertyTaxPercent(e.target.value)}
                          className="pr-7"
                          placeholder="1.2"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Monthly HOA Fee
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={hoaFee}
                            onChange={(e) => setHOAFee(e.target.value)}
                            className="pl-7"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Monthly Insurance
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                            className="pl-7"
                            placeholder="150"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Front-End Ratio
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="1"
                            value={frontEndRatio}
                            onChange={(e) => setFrontEndRatio(e.target.value)}
                            className="pr-7"
                            placeholder="28"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Back-End Ratio (DTI)
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="1"
                            value={dtiRatio}
                            onChange={(e) => setDTIRatio(e.target.value)}
                            className="pr-7"
                            placeholder="36"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Monthly Budget for House
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={monthlyBudget}
                          onChange={(e) => setMonthlyBudget(e.target.value)}
                          className="pl-7"
                          placeholder="2500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Loan Term (Years)
                        </label>
                        <Input
                          type="number"
                          value={budgetLoanTerm}
                          onChange={(e) => setBudgetLoanTerm(e.target.value)}
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Interest Rate
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            value={budgetInterestRate}
                            onChange={(e) => setBudgetInterestRate(e.target.value)}
                            className="pr-7"
                            placeholder="7.0"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Down Payment
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={budgetDownPaymentPercent}
                          onChange={(e) => setBudgetDownPaymentPercent(e.target.value)}
                          className="pr-7"
                          placeholder="20"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Property Tax Rate (Annual)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={budgetPropertyTaxPercent}
                          onChange={(e) => setBudgetPropertyTaxPercent(e.target.value)}
                          className="pr-7"
                          placeholder="1.2"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Monthly HOA Fee
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={budgetHOAFee}
                            onChange={(e) => setBudgetHOAFee(e.target.value)}
                            className="pl-7"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Monthly Insurance
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <Input
                            type="number"
                            value={budgetInsurance}
                            onChange={(e) => setBudgetInsurance(e.target.value)}
                            className="pl-7"
                            placeholder="150"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Maintenance Cost (Annual %)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={budgetMaintenance}
                          onChange={(e) => setBudgetMaintenance(e.target.value)}
                          className="pr-7"
                          placeholder="1.0"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={calculatorMode === 'income' ? calculateIncomeBased : calculateBudgetBased}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Affordability
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Home className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Maximum Home Price</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {formatCurrency(results.maxHomePrice)}
                    </p>
                    <p className="text-emerald-100">
                      Based on your {calculatorMode === 'income' ? 'income and debt ratios' : 'monthly budget'}
                    </p>
                  </div>
                </Card>

                {/* Down Payment and Loan Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <PiggyBank className="h-5 w-5 text-emerald-600" />
                        Down Payment Required
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-emerald-600">
                        {formatCurrency(calculatorMode === 'income' ? (results as AffordabilityResults).downPayment : (results as BudgetResults).downPaymentAmount)}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        {calculatorMode === 'income' ? downPaymentPercent : budgetDownPaymentPercent}% of home price
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Loan Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-emerald-600">
                        {formatCurrency(results.loanAmount)}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        Principal to be financed
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Payment Breakdown */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                      Monthly Payment Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-slate-700 font-medium">Principal & Interest</span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrencyDetailed(results.monthlyPrincipalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-slate-700 font-medium">Property Tax</span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrencyDetailed(results.monthlyPropertyTax)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-slate-700 font-medium">HOA/Co-op Fee</span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrencyDetailed(results.monthlyHOA)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-slate-700 font-medium">Insurance</span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrencyDetailed(results.monthlyInsurance)}
                      </span>
                    </div>
                    {'monthlyMaintenance' in results && (
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-700 font-medium">Maintenance</span>
                        <span className="text-lg font-semibold text-slate-800">
                          {formatCurrencyDetailed(results.monthlyMaintenance)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 bg-emerald-50 p-4 rounded-lg">
                      <span className="text-lg font-bold text-slate-800">Total Monthly Payment</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {formatCurrencyDetailed(calculatorMode === 'income' ? (results as AffordabilityResults).monthlyPayment : (results as BudgetResults).totalMonthlyPayment)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* DTI Ratios (Income-based only) */}
                {calculatorMode === 'income' && 'frontEndRatio' in results && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-emerald-600" />
                        Debt-to-Income Ratios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-700 font-medium">Front-End Ratio (Housing Costs)</span>
                          <span className="text-lg font-semibold text-slate-800">
                            {formatPercent(results.frontEndRatio)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(results.frontEndRatio, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Recommended: 28% or less</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-700 font-medium">Back-End Ratio (Total Debt)</span>
                          <span className="text-lg font-semibold text-slate-800">
                            {formatPercent(results.backEndRatio)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(results.backEndRatio, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Recommended: 36% or less</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <p className="text-sm text-blue-800">
                          <strong>Monthly Gross Income:</strong> {formatCurrencyDetailed(results.monthlyGrossIncome)}
                        </p>
                        <p className="text-sm text-blue-800 mt-1">
                          <strong>Max Monthly Payment:</strong> {formatCurrencyDetailed(results.maxMonthlyPayment)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Home className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your details and click calculate to see how much house you can afford
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding House Affordability</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Determines How Much House You Can Afford?</h3>
                <p>
                  When you're thinking about buying a home, figuring out what you can actually afford isn't as simple as looking at the sticker price. There's a whole web of financial factors that come into play, and understanding them can mean the difference between finding your dream home and getting in over your head financially.
                </p>
                <p className="mt-3">
                  The most important thing to know is that lenders look at your complete financial picture. They're not just interested in your income—they want to see how much debt you're carrying, what kind of down payment you can make, and whether you'll be able to handle all the ongoing costs of homeownership. That's where the concept of affordability gets interesting, because it's really about balancing what you want with what makes sense for your long-term financial health.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The 28/36 Rule: A Time-Tested Guideline</h3>
                <p>
                  You've probably heard people throw around percentages when talking about mortgages, and there's good reason for that. The 28/36 rule has been around for decades because it works as a solid baseline for most homebuyers. Here's what it actually means in practice.
                </p>
                <p className="mt-3">
                  The first number—28%—is your front-end ratio. This is the maximum percentage of your gross monthly income that should go toward housing costs. We're talking about everything: your mortgage payment (principal and interest), property taxes, homeowners insurance, and any HOA fees. So if you're bringing home $7,000 a month before taxes, you'd want to keep your total housing costs at or below $1,960.
                </p>
                <p className="mt-3">
                  The second number—36%—is your back-end ratio, which looks at your total debt picture. This includes your housing costs plus all your other recurring monthly debts: car payments, student loans, credit card minimums, personal loans, you name it. Using that same $7,000 monthly income, your total debt payments shouldn't exceed $2,520.
                </p>
                <p className="mt-3">
                  Now, here's something important to understand—these aren't hard and fast rules carved in stone. They're guidelines that conventional lenders use, and you might qualify for different ratios depending on your situation. But they exist for a reason: they leave you with enough breathing room in your budget for savings, emergencies, and actually enjoying your life.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Different Loan Types, Different Rules</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Conventional Loans</h4>
                <p>
                  Conventional loans are what most people think of when they imagine a "normal" mortgage. These are loans that aren't backed by the government, and they typically stick pretty closely to that 28/36 rule we just talked about. Fannie Mae and Freddie Mac—the two big players that buy most conventional mortgages—use these ratios as their standard.
                </p>
                <p className="mt-3">
                  The thing about conventional loans is that they can be pretty flexible if you've got strong credit and a solid financial profile. Some lenders might stretch those ratios a bit if everything else looks good. But generally speaking, if you're going the conventional route, you're looking at putting down at least 3% to 20% of the purchase price, and you'll need decent credit to get approved.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">FHA Loans</h4>
                <p>
                  FHA loans are backed by the Federal Housing Administration, and they're designed to help people who might not qualify for conventional financing. The debt-to-income ratios are a bit more generous here—you're looking at 31% for the front-end ratio and 43% for the back-end. That extra wiggle room can make a real difference when you're trying to qualify.
                </p>
                <p className="mt-3">
                  The trade-off? You'll need to pay mortgage insurance, both upfront (1.75% of the loan amount) and monthly. This insurance protects the lender if you default, but it also means your monthly payment will be higher than you might expect. On the plus side, FHA loans accept lower credit scores and smaller down payments—sometimes as little as 3.5%—which makes them attractive for first-time buyers or people rebuilding their credit.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">VA Loans</h4>
                <p>
                  If you're a veteran or active-duty service member, VA loans can be an incredible deal. These loans, guaranteed by the U.S. Department of Veterans Affairs, don't use a front-end ratio at all. Instead, they focus solely on a back-end ratio, and they allow up to 41% of your gross income to go toward total debt.
                </p>
                <p className="mt-3">
                  Even better, VA loans don't require a down payment in most cases, and you won't pay monthly mortgage insurance. There is a funding fee (usually around 2.3% for first-time users with no down payment), but that can be rolled into the loan amount. For eligible borrowers, this is often the most affordable path to homeownership.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Beyond the Mortgage: The Hidden Costs of Homeownership</h3>
                <p>
                  Here's where a lot of first-time buyers get surprised—the mortgage payment is just the beginning. When you own a home, you're responsible for everything that goes wrong, and trust me, things will go wrong. That water heater doesn't last forever. The roof will eventually need replacing. The HVAC system will pick the hottest day of summer to die.
                </p>
                <p className="mt-3">
                  A good rule of thumb is to budget about 1% of your home's value annually for maintenance and repairs. On a $300,000 home, that's $3,000 a year, or $250 a month. Some years you'll spend less, some years you'll spend more, but over time it averages out. This doesn't include improvements or renovations you might want to do—this is just keeping the place running.
                </p>
                <p className="mt-3">
                  Then there's property tax, which varies wildly depending on where you live. In some states, you might pay less than 0.5% of your home's value annually. In others, you could be looking at 2% or more. That's a huge difference—on a $400,000 home, you could be paying anywhere from $2,000 to $8,000 a year just in property taxes.
                </p>
                <p className="mt-3">
                  Don't forget homeowners insurance, which typically runs $1,000 to $2,000 annually for most homes, though it can be much higher in areas prone to natural disasters. And if you're in a condo or planned community, HOA fees can add another $100 to $500 per month (or even more in luxury buildings).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Down Payment Dilemma</h3>
                <p>
                  There's this persistent myth that you need 20% down to buy a house. While putting down 20% has its advantages—mainly avoiding private mortgage insurance (PMI)—it's absolutely not required for most loans. In fact, the median down payment for first-time buyers is around 6%.
                </p>
                <p className="mt-3">
                  That said, your down payment amount significantly affects your monthly payment and overall loan costs. Put down 20% on a $350,000 home, and you're financing $280,000. Put down 5%, and you're financing $332,500. At a 7% interest rate over 30 years, that's the difference between a monthly principal and interest payment of about $1,863 versus $2,209.
                </p>
                <p className="mt-3">
                  Plus, if you put down less than 20% on a conventional loan, you'll pay PMI until you reach 20% equity. This usually adds another $50 to $200 to your monthly payment, depending on your loan amount and credit score. It's not the end of the world—it gets you into a home sooner—but it's something to factor into your affordability calculations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Interest Rates: The Silent Budget Killer</h3>
                <p>
                  Interest rates might seem like just another number on your loan documents, but they have an enormous impact on affordability. A single percentage point difference can change your monthly payment by hundreds of dollars and add tens of thousands to what you pay over the life of the loan.
                </p>
                <p className="mt-3">
                  Let's look at a concrete example. On a $300,000 loan, here's what different interest rates mean for your monthly principal and interest payment:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>At 6%: $1,799 per month</li>
                  <li>At 7%: $1,996 per month</li>
                  <li>At 8%: $2,201 per month</li>
                </ul>
                <p className="mt-3">
                  Over 30 years, the difference between 6% and 8% is nearly $145,000 in total interest paid. That's not a typo—one hundred and forty-five thousand dollars. This is why even a small improvement in your interest rate, whether through better credit scores, a larger down payment, or buying discount points, can make such a significant difference.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Strategies to Increase Your Buying Power</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Improve Your Credit Score</h4>
                <p>
                  Your credit score is one of the most powerful levers you can pull to increase affordability. The difference between a 680 credit score and a 760 score might be half a percentage point or more on your interest rate. On a $350,000 loan, that could save you $100+ per month and allow you to qualify for a more expensive home.
                </p>
                <p className="mt-3">
                  The good news is that improving your credit isn't rocket science. Pay your bills on time, keep your credit card balances low (ideally under 30% of your limits), don't close old accounts, and avoid opening new credit right before applying for a mortgage. If you've got six months to a year before you want to buy, you can make meaningful improvements to your score.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Reduce Your Existing Debt</h4>
                <p>
                  Remember that back-end debt-to-income ratio? Every dollar of monthly debt you eliminate is a dollar that can go toward your mortgage payment instead. If you're paying $400 a month on a car loan, paying that off before you buy could increase your home-buying budget by $50,000 or more, depending on interest rates.
                </p>
                <p className="mt-3">
                  This is where strategic thinking comes in. It might make sense to postpone buying for six months if it means you can pay off a credit card or two. The improvement to your debt-to-income ratio could mean the difference between affording the home you actually want and settling for something less.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Increase Your Down Payment</h4>
                <p>
                  Every additional dollar you put down is a dollar you don't have to borrow. It's also a dollar that won't accrue interest over the next 30 years. Plus, a larger down payment can sometimes help you qualify for better interest rates, creating a double benefit.
                </p>
                <p className="mt-3">
                  If you're getting help from family members, this can be particularly impactful. Many first-time homebuyer programs also offer down payment assistance grants or low-interest loans. These programs vary by location, but they're worth researching—free money is free money.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Consider a Co-Borrower</h4>
                <p>
                  Adding another person's income to your mortgage application can significantly increase your buying power. This could be a spouse, partner, or even a family member who's willing to co-own the property with you. Just remember that both people are equally responsible for the mortgage, and both people's credit and debt profiles will be considered.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When to Stretch and When to Play It Safe</h3>
                <p>
                  Here's the thing about affordability calculations—they tell you what you can qualify for, not necessarily what you should buy. Just because a lender will give you a loan doesn't mean you should take every penny of it.
                </p>
                <p className="mt-3">
                  Think about your lifestyle and financial goals. Do you want to travel? Do you have expensive hobbies? Are you planning to have kids soon? Do you need to save for retirement more aggressively? All of these things require money, and they're hard to do if you're house-poor—spending so much on your mortgage that there's nothing left for anything else.
                </p>
                <p className="mt-3">
                  On the flip side, there are times when stretching makes sense. If you're buying in a market where prices are rising quickly, getting in now—even if it's tight—might be better than waiting and getting priced out entirely. If you're in a stable career with good prospects for income growth, you might grow into a payment that feels tight today. If you're buying in an area with excellent schools that will save you private school tuition, the extra housing cost might be worth it.
                </p>
                <p className="mt-3">
                  The key is to be honest with yourself about your situation. Look at your actual spending habits, not some idealized version of how you think you should spend money. If you know you like eating out regularly or taking vacations, don't pretend you'll suddenly become a hermit just because you bought a house.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator Effectively</h3>
                <p>
                  This calculator gives you two different approaches to figuring out affordability, and both are valuable depending on where you're starting from.
                </p>
                <p className="mt-3">
                  The income-based calculator is great when you want to understand the maximum you could qualify for based on traditional lending standards. It takes your income, existing debts, and desired down payment, then calculates backward to figure out the most expensive home you could buy while staying within healthy debt-to-income ratios. This is useful for setting your overall budget and understanding what's realistic in your price range.
                </p>
                <p className="mt-3">
                  The budget-based calculator works differently. It starts with a monthly payment amount that you're comfortable with and works backward to determine what price home that payment can support. This approach is often more intuitive—you know what you can afford to pay each month, and you want to see what that translates to in terms of actual home prices.
                </p>
                <p className="mt-3">
                  Try running the numbers both ways. You might find that the income-based calculation says you can afford more than you're comfortable spending, which is valuable information. Or you might discover that your target monthly budget doesn't support homes in the neighborhoods you're considering, which means you need to adjust either your budget or your expectations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Final Thoughts on Affordability</h3>
                <p>
                  Buying a home is probably the biggest financial decision you'll ever make, and getting the affordability calculation right is crucial. Take your time with this. Run different scenarios. See what happens if interest rates change by a percentage point. Look at what a larger down payment could do for you. Understand how different debt ratios affect your options.
                </p>
                <p className="mt-3">
                  Most importantly, remember that these calculations are just the starting point. They tell you what's possible mathematically, but only you can decide what's comfortable emotionally and financially. The best home price for you is one that lets you sleep at night, enjoy your life, and work toward your other financial goals—not just the maximum amount someone will lend you.
                </p>
                <p className="mt-3">
                  Good luck with your home search. With realistic expectations and solid financial planning, you'll find something that fits both your dreams and your budget.
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
                <Link href="/mortgage" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Home className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Mortgage Calculator</div>
                    <div className="text-sm text-slate-600">Calculate monthly payments</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Compare loan options</div>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with accuracy and care for your financial planning needs.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
