"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Home, Car, CreditCard, ShoppingBag, Heart, GraduationCap, PiggyBank, TrendingUp } from "lucide-react";

interface BudgetResults {
  totalIncome: number;
  afterTaxIncome: number;
  totalExpenses: number;
  netIncome: number;
  savingsRate: number;
  housingPercent: number;
  transportationPercent: number;
  foodPercent: number;
  status: 'surplus' | 'balanced' | 'deficit';
}

export default function BudgetCalculator() {
  // Income States
  const [salary, setSalary] = useState<string>("75000");
  const [pension, setPension] = useState<string>("0");
  const [investmentIncome, setInvestmentIncome] = useState<string>("2400");
  const [otherIncome, setOtherIncome] = useState<string>("0");
  const [taxRate, setTaxRate] = useState<string>("25");

  // Housing & Utilities
  const [mortgage, setMortgage] = useState<string>("2000");
  const [propertyTax, setPropertyTax] = useState<string>("400");
  const [homeInsurance, setHomeInsurance] = useState<string>("150");
  const [utilities, setUtilities] = useState<string>("250");
  const [homeMaintenance, setHomeMaintenance] = useState<string>("200");

  // Transportation
  const [autoLoan, setAutoLoan] = useState<string>("450");
  const [autoInsurance, setAutoInsurance] = useState<string>("120");
  const [gasoline, setGasoline] = useState<string>("200");
  const [autoMaintenance, setAutoMaintenance] = useState<string>("100");
  const [parking, setParking] = useState<string>("50");

  // Debt Payments
  const [creditCards, setCreditCards] = useState<string>("200");
  const [studentLoans, setStudentLoans] = useState<string>("350");
  const [personalLoans, setPersonalLoans] = useState<string>("0");

  // Living Expenses
  const [groceries, setGroceries] = useState<string>("600");
  const [diningOut, setDiningOut] = useState<string>("300");
  const [clothing, setClothing] = useState<string>("150");
  const [householdSupplies, setHouseholdSupplies] = useState<string>("100");

  // Healthcare
  const [healthInsurance, setHealthInsurance] = useState<string>("400");
  const [medicalExpenses, setMedicalExpenses] = useState<string>("150");

  // Children & Education
  const [childcare, setChildcare] = useState<string>("0");
  const [tuition, setTuition] = useState<string>("0");
  const [childSupport, setChildSupport] = useState<string>("0");

  // Savings & Investments
  const [retirement401k, setRetirement401k] = useState<string>("625");
  const [collegeSavings, setCollegeSavings] = useState<string>("0");
  const [investments, setInvestments] = useState<string>("200");
  const [emergencyFund, setEmergencyFund] = useState<string>("300");

  // Miscellaneous
  const [pets, setPets] = useState<string>("100");
  const [gifts, setGifts] = useState<string>("100");
  const [entertainment, setEntertainment] = useState<string>("200");
  const [travel, setTravel] = useState<string>("150");
  const [otherExpenses, setOtherExpenses] = useState<string>("100");

  const [results, setResults] = useState<BudgetResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    // Parse income
    const monthlyIncome = (parseFloat(salary) || 0) / 12 +
                          (parseFloat(pension) || 0) +
                          (parseFloat(investmentIncome) || 0) / 12 +
                          (parseFloat(otherIncome) || 0);

    const taxRateDecimal = (parseFloat(taxRate) || 0) / 100;
    const afterTax = monthlyIncome * (1 - taxRateDecimal);

    // Calculate housing total
    const housingTotal = (parseFloat(mortgage) || 0) +
                        (parseFloat(propertyTax) || 0) +
                        (parseFloat(homeInsurance) || 0) +
                        (parseFloat(utilities) || 0) +
                        (parseFloat(homeMaintenance) || 0);

    // Calculate transportation total
    const transportationTotal = (parseFloat(autoLoan) || 0) +
                               (parseFloat(autoInsurance) || 0) +
                               (parseFloat(gasoline) || 0) +
                               (parseFloat(autoMaintenance) || 0) +
                               (parseFloat(parking) || 0);

    // Calculate debt payments total
    const debtTotal = (parseFloat(creditCards) || 0) +
                     (parseFloat(studentLoans) || 0) +
                     (parseFloat(personalLoans) || 0);

    // Calculate living expenses total
    const livingTotal = (parseFloat(groceries) || 0) +
                       (parseFloat(diningOut) || 0) +
                       (parseFloat(clothing) || 0) +
                       (parseFloat(householdSupplies) || 0);

    // Calculate healthcare total
    const healthcareTotal = (parseFloat(healthInsurance) || 0) +
                           (parseFloat(medicalExpenses) || 0);

    // Calculate children & education total
    const childrenTotal = (parseFloat(childcare) || 0) +
                         (parseFloat(tuition) || 0) +
                         (parseFloat(childSupport) || 0);

    // Calculate savings & investments total
    const savingsTotal = (parseFloat(retirement401k) || 0) +
                        (parseFloat(collegeSavings) || 0) +
                        (parseFloat(investments) || 0) +
                        (parseFloat(emergencyFund) || 0);

    // Calculate miscellaneous total
    const miscTotal = (parseFloat(pets) || 0) +
                     (parseFloat(gifts) || 0) +
                     (parseFloat(entertainment) || 0) +
                     (parseFloat(travel) || 0) +
                     (parseFloat(otherExpenses) || 0);

    const totalExpenses = housingTotal + transportationTotal + debtTotal +
                         livingTotal + healthcareTotal + childrenTotal +
                         savingsTotal + miscTotal;

    const netIncome = afterTax - totalExpenses;
    const savingsRate = afterTax > 0 ? (savingsTotal / afterTax) * 100 : 0;
    const housingPercent = monthlyIncome > 0 ? (housingTotal / monthlyIncome) * 100 : 0;
    const transportationPercent = afterTax > 0 ? (transportationTotal / afterTax) * 100 : 0;
    const foodTotal = (parseFloat(groceries) || 0) + (parseFloat(diningOut) || 0);
    const foodPercent = afterTax > 0 ? (foodTotal / afterTax) * 100 : 0;

    let status: 'surplus' | 'balanced' | 'deficit' = 'balanced';
    if (netIncome > 100) status = 'surplus';
    else if (netIncome < -100) status = 'deficit';

    setResults({
      totalIncome: monthlyIncome,
      afterTaxIncome: afterTax,
      totalExpenses,
      netIncome,
      savingsRate,
      housingPercent,
      transportationPercent,
      foodPercent,
      status
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
    return `${value.toFixed(1)}%`;
  };

  return (
    <>
      <Head>
        <title>Budget Calculator - Free Monthly Budget Planner | Calc-Tech.com</title>
        <meta name="description" content="Create a comprehensive monthly budget with our free budget calculator. Track income, expenses, savings across all categories. Get personalized recommendations for financial wellness." />
        <meta name="keywords" content="budget calculator, monthly budget, budget planner, personal finance, income tracker, expense tracker, financial planning, savings calculator" />
        <link rel="canonical" href="https://calc-tech.com/budget" />
        <meta property="og:title" content="Budget Calculator - Calc-Tech.com" />
        <meta property="og:description" content="Create a comprehensive monthly budget with our free budget calculator. Track income, expenses, and savings across all categories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calc-tech.com/budget" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Budget Calculator - Calc-Tech.com" />
        <meta name="twitter:description" content="Create a comprehensive monthly budget with our free budget calculator. Track income, expenses, and savings across all categories." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Budget Calculator",
              "applicationCategory": "FinanceApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free online budget calculator to help you create a comprehensive monthly budget. Track income, expenses, and savings across all categories with personalized financial recommendations.",
              "url": "https://calc-tech.com/budget"
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
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
            <DollarSign className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Budget Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a comprehensive monthly budget plan. Track your income, expenses, and savings across all categories to achieve financial wellness.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Income Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="pl-7"
                      placeholder="75000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Pension/Social Security
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={pension}
                      onChange={(e) => setPension(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Investment Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={investmentIncome}
                      onChange={(e) => setInvestmentIncome(e.target.value)}
                      className="pl-7"
                      placeholder="2400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Other Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Income Tax Rate
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="pr-7"
                      placeholder="25"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Housing & Utilities Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-6 w-6" />
                  Housing & Utilities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mortgage/Rent
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={mortgage}
                      onChange={(e) => setMortgage(e.target.value)}
                      className="pl-7"
                      placeholder="2000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Property Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      className="pl-7"
                      placeholder="400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Home Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      className="pl-7"
                      placeholder="150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Utilities
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      className="pl-7"
                      placeholder="250"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Home Maintenance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={homeMaintenance}
                      onChange={(e) => setHomeMaintenance(e.target.value)}
                      className="pl-7"
                      placeholder="200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transportation Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-6 w-6" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Auto Loan Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={autoLoan}
                      onChange={(e) => setAutoLoan(e.target.value)}
                      className="pl-7"
                      placeholder="450"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Auto Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={autoInsurance}
                      onChange={(e) => setAutoInsurance(e.target.value)}
                      className="pl-7"
                      placeholder="120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Gasoline
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={gasoline}
                      onChange={(e) => setGasoline(e.target.value)}
                      className="pl-7"
                      placeholder="200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Auto Maintenance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={autoMaintenance}
                      onChange={(e) => setAutoMaintenance(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Parking/Tolls
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                      className="pl-7"
                      placeholder="50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Debt Payments Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Debt Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Credit Card Payments
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={creditCards}
                      onChange={(e) => setCreditCards(e.target.value)}
                      className="pl-7"
                      placeholder="200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student Loan Payments
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={studentLoans}
                      onChange={(e) => setStudentLoans(e.target.value)}
                      className="pl-7"
                      placeholder="350"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Personal Loans
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={personalLoans}
                      onChange={(e) => setPersonalLoans(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Living Expenses Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Living Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Groceries
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={groceries}
                      onChange={(e) => setGroceries(e.target.value)}
                      className="pl-7"
                      placeholder="600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Dining Out
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={diningOut}
                      onChange={(e) => setDiningOut(e.target.value)}
                      className="pl-7"
                      placeholder="300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Clothing
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={clothing}
                      onChange={(e) => setClothing(e.target.value)}
                      className="pl-7"
                      placeholder="150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Household Supplies
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={householdSupplies}
                      onChange={(e) => setHouseholdSupplies(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  Healthcare
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Health Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={healthInsurance}
                      onChange={(e) => setHealthInsurance(e.target.value)}
                      className="pl-7"
                      placeholder="400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Medical Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={medicalExpenses}
                      onChange={(e) => setMedicalExpenses(e.target.value)}
                      className="pl-7"
                      placeholder="150"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children & Education Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Children & Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Childcare
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={childcare}
                      onChange={(e) => setChildcare(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tuition
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={tuition}
                      onChange={(e) => setTuition(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Child Support
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={childSupport}
                      onChange={(e) => setChildSupport(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings & Investments Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-6 w-6" />
                  Savings & Investments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    401k/IRA Contributions
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={retirement401k}
                      onChange={(e) => setRetirement401k(e.target.value)}
                      className="pl-7"
                      placeholder="625"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={collegeSavings}
                      onChange={(e) => setCollegeSavings(e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Investments
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={investments}
                      onChange={(e) => setInvestments(e.target.value)}
                      className="pl-7"
                      placeholder="200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Emergency Fund
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={emergencyFund}
                      onChange={(e) => setEmergencyFund(e.target.value)}
                      className="pl-7"
                      placeholder="300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Miscellaneous Card */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Miscellaneous
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pets
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={pets}
                      onChange={(e) => setPets(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Gifts & Donations
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={gifts}
                      onChange={(e) => setGifts(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Entertainment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={entertainment}
                      onChange={(e) => setEntertainment(e.target.value)}
                      className="pl-7"
                      placeholder="200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Travel
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={travel}
                      onChange={(e) => setTravel(e.target.value)}
                      className="pl-7"
                      placeholder="150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Other Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculate Button */}
            <Button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg rounded-2xl shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Budget
            </Button>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className={`p-8 text-white ${
                    results.status === 'surplus' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                    results.status === 'deficit' ? 'bg-gradient-to-r from-rose-600 to-pink-600' :
                    'bg-gradient-to-r from-slate-600 to-slate-700'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Monthly Budget Summary</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.netIncome)}</p>
                    <p className="text-emerald-100">
                      {results.status === 'surplus' ? 'Monthly Surplus' :
                       results.status === 'deficit' ? 'Monthly Deficit' :
                       'Balanced Budget'}
                    </p>
                  </div>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Gross Monthly Income</div>
                        <div className="text-2xl font-bold text-slate-800">{formatCurrency(results.totalIncome)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">After-Tax Income</div>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(results.afterTaxIncome)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Total Monthly Expenses</div>
                        <div className="text-2xl font-bold text-rose-600">{formatCurrency(results.totalExpenses)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Savings Rate</div>
                        <div className="text-2xl font-bold text-teal-600">{formatPercent(results.savingsRate)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Health Indicators */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      Budget Health Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      results.housingPercent <= 30 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-700">Housing as % of Gross Income</span>
                        <span className={`text-xl font-bold ${results.housingPercent <= 30 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatPercent(results.housingPercent)}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {results.housingPercent <= 30 ? '✓ Within recommended 30% guideline' : '⚠ Exceeds recommended 30% guideline'}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      results.transportationPercent <= 15 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-700">Transportation as % of Income</span>
                        <span className={`text-xl font-bold ${results.transportationPercent <= 15 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatPercent(results.transportationPercent)}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {results.transportationPercent <= 15 ? '✓ Within recommended 15% guideline' : '⚠ Exceeds recommended 15% guideline'}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      results.foodPercent <= 15 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-700">Food as % of Income</span>
                        <span className={`text-xl font-bold ${results.foodPercent <= 15 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatPercent(results.foodPercent)}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {results.foodPercent <= 15 ? '✓ Within recommended 15% guideline' : '⚠ Exceeds recommended 15% guideline'}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      results.savingsRate >= 15 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-700">Savings Rate</span>
                        <span className={`text-xl font-bold ${results.savingsRate >= 15 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatPercent(results.savingsRate)}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {results.savingsRate >= 15 ? '✓ Meets recommended 15% minimum' : '⚠ Below recommended 15% minimum'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {(results.status === 'deficit' || results.housingPercent > 30 || results.savingsRate < 15) && (
                  <Card className="border-2 border-amber-200 rounded-2xl shadow-md bg-amber-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                        💡 Budget Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-slate-700">
                      {results.status === 'deficit' && (
                        <p>• Your expenses exceed your income. Consider reducing discretionary spending or finding ways to increase income.</p>
                      )}
                      {results.housingPercent > 30 && (
                        <p>• Your housing costs are above the recommended 30% of gross income. This may limit financial flexibility.</p>
                      )}
                      {results.savingsRate < 15 && (
                        <p>• Try to increase your savings rate to at least 15% for long-term financial security and retirement readiness.</p>
                      )}
                      {results.transportationPercent > 15 && (
                        <p>• Transportation costs are high. Consider carpooling, public transit, or a more fuel-efficient vehicle.</p>
                      )}
                      {results.foodPercent > 15 && (
                        <p>• Food expenses are elevated. Meal planning and reducing dining out can create significant savings.</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Analyze Your Budget
                </h3>
                <p className="text-slate-500">
                  Enter your income and expenses, then click Calculate to see your budget summary
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Personal Budgeting</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What Is a Budget and Why Does It Matter?</h3>
                <p className="mb-4">
                  Think of a budget as your financial roadmap. It's really just a plan that shows where your money comes from and where it goes each month. The goal isn't to restrict yourself—it's to make sure you're spending intentionally on things that matter while avoiding that sinking feeling when unexpected expenses pop up.
                </p>
                <p className="mb-4">
                  Most people who say budgeting doesn't work for them haven't actually tried tracking their spending for a full month. You'd be surprised how those daily coffee runs or streaming subscriptions add up. A budget brings all of this into focus, giving you control instead of leaving you wondering where your paycheck went.
                </p>
                <p>
                  The beauty of budgeting is that it works for everyone, whether you're making $30,000 or $300,000 a year. What changes is the scale, not the principle. Living within your means and planning for the future are universal concepts that lead to less stress and more freedom.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Core Components of Your Budget</h3>
                <p className="mb-4">
                  Every budget has two fundamental sides: money coming in (income) and money going out (expenses). On the income side, you're looking at your salary or wages, but don't forget about other sources. Maybe you have a side hustle, rental income from a property, dividend payments from investments, or even regular gifts from family. All of it counts and should be factored into your monthly total.
                </p>
                <p className="mb-4">
                  The expense side is where things get interesting. Housing typically takes the biggest bite—this includes your mortgage or rent, property taxes, insurance, and ongoing maintenance. Then there's transportation: car payments, insurance, gas, and upkeep. Don't overlook the smaller categories like groceries, healthcare, and entertainment. These so-called "minor" expenses can collectively represent a third of your budget if you're not careful.
                </p>
                <p>
                  One category that people often skip is savings and investments, but this should be treated as a mandatory expense, not an afterthought. Pay yourself first by automatically transferring money into retirement accounts, emergency funds, or investment portfolios. When you budget for savings upfront, you're much more likely to actually save.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The 50/30/20 Rule as a Starting Framework</h3>
                <p className="mb-4">
                  If you're new to budgeting, the 50/30/20 rule provides a simple starting point. The idea is to allocate 50% of your after-tax income to needs (housing, food, healthcare, transportation), 30% to wants (dining out, hobbies, travel, entertainment), and 20% to savings and debt repayment. It's not perfect for everyone, but it gives you reasonable guardrails.
                </p>
                <p className="mb-4">
                  That said, your actual situation might require adjustments. If you live in an expensive city like San Francisco or New York, housing alone could consume more than 50% of your income. In that case, you might need to cut back on wants or find creative ways to increase income. The rule is a guideline, not a straitjacket.
                </p>
                <p>
                  Keep in mind that debt repayment falls into the 20% bucket alongside savings. If you're carrying high-interest credit card debt, you'll want to prioritize paying that down aggressively while still maintaining a small emergency fund. Once you're debt-free, that 20% can shift entirely toward building wealth through investments and retirement savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Housing: The Biggest Line Item</h3>
                <p className="mb-4">
                  Financial advisors generally recommend keeping housing costs at or below 30% of your gross income. This includes your mortgage or rent, property taxes, homeowners insurance, HOA fees, and basic utilities. Go much higher than that, and you risk becoming "house poor"—where you can afford the roof over your head but little else.
                </p>
                <p className="mb-4">
                  If you're a renter, you have more flexibility to relocate if housing costs squeeze your budget too much. Homeowners have additional considerations like maintenance and repairs, which can be unpredictable. A good rule of thumb is to set aside 1-2% of your home's value annually for upkeep. That might sound like a lot, but when the water heater dies or the roof needs replacing, you'll be glad you planned ahead.
                </p>
                <p>
                  It's worth mentioning that many people stretch the 30% guideline, especially in hot real estate markets. While you can technically qualify for a mortgage that pushes you to 40% or even 50% of gross income, doing so leaves very little room for error. Job loss, medical emergencies, or even a desire to save for retirement become much harder when housing eats up half your paycheck.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Transportation Costs and Hidden Expenses</h3>
                <p className="mb-4">
                  Transportation often sneaks up on people. Your car payment might seem manageable, but then you add insurance, gas, maintenance, parking fees, and the occasional traffic ticket. Before you know it, you're spending 15-20% of your income just getting from point A to point B.
                </p>
                <p className="mb-4">
                  A common guideline is to keep total transportation costs under 15% of your income, with the car payment itself ideally below 10%. If you're financing a vehicle, remember that cars depreciate quickly. Borrowing $40,000 for a new car that'll be worth $25,000 in three years isn't a great financial move, especially if you're not maxing out retirement contributions.
                </p>
                <p>
                  Consider alternatives when possible. Public transportation, biking, or carpooling can dramatically reduce costs. Even if these options aren't feasible for your entire commute, using them a few days a week can make a noticeable difference. And if you live in a walkable city with good transit, you might be able to skip car ownership altogether and save thousands annually.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Food Spending: Groceries vs. Dining Out</h3>
                <p className="mb-4">
                  Food is one of those expense categories where there's huge variation based on lifestyle and priorities. Some people spend $200 a month on groceries and rarely eat out. Others drop $1,000+ between grocery stores and restaurants. Neither is inherently wrong, but you need to be honest about what works within your budget.
                </p>
                <p className="mb-4">
                  A reasonable target is to keep combined food costs—groceries plus dining out—under 15% of your after-tax income. For a household bringing home $5,000 per month, that's $750. If you're exceeding that, look for easy cuts. Bringing lunch to work instead of buying it, cooking at home a few extra nights per week, or choosing less expensive restaurants can free up hundreds of dollars.
                </p>
                <p>
                  Meal planning is one of the most effective strategies. When you know what you're cooking for the week, you buy only what you need and avoid the expensive habit of ordering takeout when there's "nothing in the fridge." It takes a little time upfront, but the savings and reduction in food waste make it worthwhile.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Debt Management and Repayment Strategy</h3>
                <p className="mb-4">
                  Not all debt is created equal. A mortgage at 3% interest is very different from credit card debt at 22%. Your budget should prioritize high-interest debt while making minimum payments on everything else. Once the expensive debt is gone, you can tackle the next-highest rate, snowballing your way to being debt-free.
                </p>
                <p className="mb-4">
                  Student loans occupy a middle ground. The interest rates can vary widely, and there may be tax benefits or income-driven repayment options. If you have federal student loans with low rates, it might make sense to pay them off slowly while investing more aggressively for retirement. Run the numbers based on your specific situation—there's no one-size-fits-all answer.
                </p>
                <p>
                  Personal loans and car loans should generally be paid off as quickly as your budget allows, especially if the interest rates are above 5-6%. Every dollar you pay toward principal is a dollar that stops accruing interest. It might not feel as exciting as buying something new, but the long-term financial relief is worth it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Building an Emergency Fund</h3>
                <p className="mb-4">
                  Life throws curveballs—job loss, medical emergencies, major home repairs, unexpected travel for family reasons. An emergency fund is your financial airbag, cushioning the blow when these events inevitably happen. Financial experts typically recommend saving three to six months' worth of living expenses.
                </p>
                <p className="mb-4">
                  If that sounds daunting, start smaller. Even $1,000 can cover most minor emergencies without forcing you onto a credit card. Once you hit that milestone, aim for one month of expenses, then three, then six. The key is to keep this money liquid and accessible—think high-yield savings account, not stocks or retirement accounts with withdrawal penalties.
                </p>
                <p>
                  Some people worry that holding cash in a savings account is "wasting" money since investment returns are higher. But that's the wrong way to think about it. Your emergency fund isn't an investment; it's insurance. The peace of mind knowing you can handle unexpected expenses without derailing your financial plan is invaluable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Retirement Savings and the Power of Starting Early</h3>
                <p className="mb-4">
                  Retirement might seem far away, but starting early makes a massive difference thanks to compound interest. A 25-year-old who saves $500 per month until 65 will accumulate significantly more than a 35-year-old saving $750 per month for the same retirement age, even though the older person contributes more in total.
                </p>
                <p className="mb-4">
                  If your employer offers a 401(k) match, contribute at least enough to capture the full match—it's literally free money. Beyond that, aim to save 15-20% of your gross income for retirement. This can be split between employer plans like 401(k)s and individual accounts like IRAs. The exact mix depends on your tax situation and available options.
                </p>
                <p>
                  Don't let perfect be the enemy of good. If 15% feels impossible right now, start with 5% and increase it by 1% each year. You'll barely notice the incremental changes, but over time you'll reach that target. The important thing is to start and stay consistent—time in the market beats trying to time the market.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Discretionary Spending and Lifestyle Inflation</h3>
                <p className="mb-4">
                  One of the biggest budget killers is lifestyle inflation—the tendency to increase spending as income rises. You get a raise and suddenly "need" a fancier car or bigger apartment. There's nothing wrong with enjoying your money, but if every raise leads to proportionally higher expenses, you'll never build wealth.
                </p>
                <p className="mb-4">
                  A smarter approach is to allocate raises strategically. Maybe you increase your standard of living a little, but put the bulk toward savings, investments, or paying down debt. This way you still feel the benefit of earning more while making real progress toward financial goals.
                </p>
                <p>
                  Entertainment, travel, hobbies, and dining out all fall under discretionary spending. These categories bring joy and make life worth living, so cutting them to zero isn't the answer. Instead, be intentional. Decide how much you want to spend on these things based on your values, and then stick to it. If travel is your passion, budget generously for that and cut back elsewhere. The key is conscious choice rather than mindless spending.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Healthcare and Insurance Planning</h3>
                <p className="mb-4">
                  Healthcare costs can wreck a budget if you're not prepared. Health insurance premiums are just the start—deductibles, copays, prescription medications, and uncovered services all add up. Make sure your budget includes a realistic estimate for medical expenses beyond what insurance covers.
                </p>
                <p className="mb-4">
                  If your employer offers a Health Savings Account (HSA) with a high-deductible health plan, it can be a powerful tool. HSAs offer triple tax benefits: contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are also tax-free. If you can afford to pay current medical expenses out of pocket, you can let your HSA grow and use it in retirement as a supplemental fund.
                </p>
                <p>
                  Don't forget about other types of insurance. Disability insurance protects your income if you're unable to work due to illness or injury. Life insurance provides for your dependents if something happens to you. Homeowners or renters insurance protects your property. These aren't exciting expenses, but they prevent catastrophic financial loss.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Children and Education Expenses</h3>
                <p className="mb-4">
                  Raising kids is expensive—there's no getting around it. From childcare and diapers to sports fees and college tuition, the costs add up quickly. If you have children or plan to, your budget needs to account for both current expenses and future educational costs.
                </p>
                <p className="mb-4">
                  Childcare is often one of the largest expenses for families with young kids, sometimes rivaling or exceeding housing costs. It's worth shopping around for quality options that fit your budget, and don't overlook potential tax benefits like the Child and Dependent Care Credit.
                </p>
                <p>
                  For college savings, 529 plans offer tax-advantaged growth for education expenses. Start small if needed—even $50 or $100 per month adds up over 18 years. That said, remember the oxygen mask principle: secure your own financial future (retirement) before fully funding your kids' college. They can borrow for education if necessary, but you can't borrow for retirement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tracking Your Budget Over Time</h3>
                <p className="mb-4">
                  Creating a budget is one thing; sticking to it is another. The first month or two, you'll probably discover your initial estimates were off. Maybe you underestimated how much you spend on gas, or forgot about annual subscriptions that hit in certain months. That's completely normal—budgeting is an iterative process.
                </p>
                <p className="mb-4">
                  Track your actual spending against your budgeted amounts. Most people are shocked by how much they spend in certain categories once they see the real numbers. This awareness alone often leads to positive changes without requiring strict willpower. You simply become more mindful about purchases.
                </p>
                <p>
                  There are plenty of tools to help with tracking. Spreadsheets work great if you like manual control. Apps like Mint, YNAB (You Need A Budget), or Personal Capital automate much of the process by connecting to your bank accounts and categorizing transactions. Find what works for you and stick with it—the best budget is the one you'll actually maintain.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Adjusting Your Budget for Life Changes</h3>
                <p className="mb-4">
                  Your budget shouldn't be static. As your life changes—new job, marriage, kids, buying a house, retirement—your budget needs to evolve too. What worked when you were single and renting won't work when you have a family and a mortgage.
                </p>
                <p className="mb-4">
                  Major life events are obvious triggers for budget updates, but you should also review your budget at least annually even if nothing dramatic has changed. Incomes typically rise over time, expenses shift, and priorities evolve. An annual review ensures your budget still aligns with your current reality and goals.
                </p>
                <p>
                  Don't be afraid to make adjustments mid-year if something isn't working. Rigidity can make budgeting feel like a chore instead of a helpful tool. If you consistently overspend in one category, either adjust the budgeted amount to be more realistic or identify specific steps to reduce that expense. The goal is a sustainable plan, not perfection.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Budgeting Mistakes to Avoid</h3>
                <p className="mb-4">
                  One of the biggest mistakes is being too restrictive. If your budget doesn't include any money for fun, you'll inevitably blow it and feel like a failure. Build in reasonable discretionary spending so you don't feel deprived. Personal finance is personal—what works for someone else might not work for you.
                </p>
                <p className="mb-4">
                  Another common pitfall is forgetting irregular expenses. Things like annual insurance premiums, holiday gifts, or car registration fees aren't monthly, but they still need to be budgeted. Divide the annual cost by 12 and set aside that amount each month so you're not scrambling when the bill comes due.
                </p>
                <p>
                  Finally, avoid the trap of obsessing over every penny. Yes, tracking spending is important, but if you're agonizing over whether to spend $3 on coffee while ignoring the fact that you're overpaying on car insurance by $50 a month, you're missing the forest for the trees. Focus on the big wins first, then optimize the details.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Psychological Benefits of Budgeting</h3>
                <p className="mb-4">
                  Beyond the obvious financial benefits, budgeting reduces stress and anxiety around money. When you have a plan, you stop worrying about whether you can afford something—you already know because you've allocated for it. There's a sense of control and empowerment that comes from understanding exactly where your money goes.
                </p>
                <p className="mb-4">
                  Budgeting also improves relationships. Money is one of the leading causes of stress in marriages and partnerships. When couples budget together, they're on the same page about goals, priorities, and spending. It eliminates the "my money vs. your money" dynamic and replaces it with "our plan."
                </p>
                <p>
                  Perhaps most importantly, budgeting helps you align your spending with your values. If family time is what matters most, your budget might prioritize experiences like vacations over material possessions. If financial independence is the goal, you might live below your means to invest aggressively. A budget is simply a tool to ensure your money supports the life you actually want to live.
                </p>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for financial wellness.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
