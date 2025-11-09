"use client";

import { useState, useEffect } from "react";
import type { Metadata } from 'next';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowLeft, DollarSign, Calendar, Percent, ArrowUpDown } from "lucide-react";

interface InflationResults {
  equivalentValue: number;
  totalInflation: number;
  inflationRate: number;
  purchasingPowerChange: number;
  averageAnnualInflation: number;
  valueChange: number;
}

interface FlatRateResults {
  futureValue?: number;
  pastValue?: number;
  totalChange: number;
}

export default function InflationCalculator() {
  // Historical CPI Calculator
  const [initialAmount, setInitialAmount] = useState<string>("100");
  const [startYear, setStartYear] = useState<string>("2000");
  const [endYear, setEndYear] = useState<string>("2024");

  // Forward Flat Rate Calculator
  const [forwardAmount, setForwardAmount] = useState<string>("1000");
  const [forwardRate, setForwardRate] = useState<string>("3");
  const [forwardYears, setForwardYears] = useState<string>("10");

  // Backward Flat Rate Calculator
  const [backwardAmount, setBackwardAmount] = useState<string>("1000");
  const [backwardRate, setBackwardRate] = useState<string>("3");
  const [backwardYears, setBackwardYears] = useState<string>("10");

  const [results, setResults] = useState<InflationResults | null>(null);
  const [forwardResults, setForwardResults] = useState<FlatRateResults | null>(null);
  const [backwardResults, setBackwardResults] = useState<FlatRateResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Simplified CPI data (actual implementation would use comprehensive historical data)
  const getCPIForYear = (year: number): number => {
    const cpiData: { [key: number]: number } = {
      1990: 130.7,
      1995: 152.4,
      2000: 172.2,
      2005: 195.3,
      2010: 218.1,
      2015: 237.0,
      2020: 258.8,
      2021: 271.0,
      2022: 292.7,
      2023: 304.7,
      2024: 315.2
    };

    // Linear interpolation for missing years
    const knownYears = Object.keys(cpiData).map(Number).sort((a, b) => a - b);
    if (cpiData[year]) return cpiData[year];

    const lowerYear = knownYears.filter(y => y <= year).pop() || knownYears[0];
    const upperYear = knownYears.filter(y => y >= year).shift() || knownYears[knownYears.length - 1];

    if (lowerYear === upperYear) return cpiData[lowerYear];

    const ratio = (year - lowerYear) / (upperYear - lowerYear);
    return cpiData[lowerYear] + ratio * (cpiData[upperYear] - cpiData[lowerYear]);
  };

  const calculateInflation = () => {
    const amount = parseFloat(initialAmount) || 100;
    const start = parseInt(startYear) || 2000;
    const end = parseInt(endYear) || 2024;

    if (start >= end) return;

    const startCPI = getCPIForYear(start);
    const endCPI = getCPIForYear(end);

    const equivalentValue = amount * (endCPI / startCPI);
    const totalInflation = ((endCPI - startCPI) / startCPI) * 100;
    const yearsDiff = end - start;
    const averageAnnualInflation = totalInflation / yearsDiff;
    const valueChange = equivalentValue - amount;
    const purchasingPowerChange = ((equivalentValue - amount) / amount) * 100;

    setResults({
      equivalentValue,
      totalInflation,
      inflationRate: totalInflation,
      purchasingPowerChange,
      averageAnnualInflation,
      valueChange
    });
    setHasCalculated(true);
  };

  const calculateForwardRate = () => {
    const amount = parseFloat(forwardAmount) || 1000;
    const rate = parseFloat(forwardRate) || 3;
    const years = parseFloat(forwardYears) || 10;

    const futureValue = amount * Math.pow(1 + rate / 100, years);
    const totalChange = ((futureValue - amount) / amount) * 100;

    setForwardResults({
      futureValue,
      totalChange
    });
  };

  const calculateBackwardRate = () => {
    const amount = parseFloat(backwardAmount) || 1000;
    const rate = parseFloat(backwardRate) || 3;
    const years = parseFloat(backwardYears) || 10;

    const pastValue = amount / Math.pow(1 + rate / 100, years);
    const totalChange = ((amount - pastValue) / pastValue) * 100;

    setBackwardResults({
      pastValue,
      totalChange
    });
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateInflation();
      calculateForwardRate();
      calculateBackwardRate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number) => {
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calc-Tech.com
              </span>
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
            <TrendingUp className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Inflation Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the impact of inflation on purchasing power over time using historical CPI data or custom inflation rates
          </p>
        </div>

        {/* Historical CPI Calculator */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Historical CPI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Initial Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Year
                  </label>
                  <Input
                    type="number"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="2000"
                    min="1990"
                    max="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Year
                  </label>
                  <Input
                    type="number"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="2024"
                    min="1990"
                    max="2024"
                  />
                </div>

                <Button
                  onClick={calculateInflation}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Inflation
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Equivalent Value</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.equivalentValue)}</p>
                    <p className="text-emerald-100">
                      {formatCurrency(parseFloat(initialAmount))} in {startYear} equals this amount in {endYear}
                    </p>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Percent className="h-5 w-5 text-emerald-600" />
                        Inflation Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Inflation</span>
                        <span className="font-semibold text-rose-600">{formatPercent(results.totalInflation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Average Annual Rate</span>
                        <span className="font-semibold">{formatPercent(results.averageAnnualInflation)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Value Change</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.valueChange)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-slate-600">Purchasing Power Loss</span>
                        <span className="font-bold text-lg text-rose-600">{formatPercent(results.purchasingPowerChange)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-teal-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-slate-600 mb-1">Years Analyzed</p>
                        <p className="text-2xl font-bold text-slate-800">{parseInt(endYear) - parseInt(startYear)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-slate-600 mb-1">Inflation Impact</p>
                        <p className="text-lg font-semibold text-slate-800">
                          Your money lost {formatPercent(Math.abs(results.purchasingPowerChange))} of its value
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Calculate Historical Inflation
                </h3>
                <p className="text-slate-500">
                  Enter values to see how inflation affected purchasing power
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Forward & Backward Flat Rate Calculators */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Forward Calculator */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-6 w-6" />
                Forward Flat Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Initial Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={forwardAmount}
                    onChange={(e) => setForwardAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Inflation Rate (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={forwardRate}
                    onChange={(e) => setForwardRate(e.target.value)}
                    className="pr-7"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Years
                </label>
                <Input
                  type="number"
                  value={forwardYears}
                  onChange={(e) => setForwardYears(e.target.value)}
                />
              </div>

              <Button
                onClick={calculateForwardRate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4"
              >
                Calculate Future Value
              </Button>

              {forwardResults && forwardResults.futureValue && (
                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-slate-600 mb-2">Future Value</p>
                  <p className="text-3xl font-bold text-blue-700 mb-2">
                    {formatCurrency(forwardResults.futureValue)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Total increase: {formatPercent(forwardResults.totalChange)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Backward Calculator */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-6 w-6 rotate-180" />
                Backward Flat Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    type="number"
                    value={backwardAmount}
                    onChange={(e) => setBackwardAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Inflation Rate (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={backwardRate}
                    onChange={(e) => setBackwardRate(e.target.value)}
                    className="pr-7"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Years Ago
                </label>
                <Input
                  type="number"
                  value={backwardYears}
                  onChange={(e) => setBackwardYears(e.target.value)}
                />
              </div>

              <Button
                onClick={calculateBackwardRate}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4"
              >
                Calculate Past Value
              </Button>

              {backwardResults && backwardResults.pastValue && (
                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <p className="text-sm text-slate-600 mb-2">Historical Value</p>
                  <p className="text-3xl font-bold text-purple-700 mb-2">
                    {formatCurrency(backwardResults.pastValue)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Total change: {formatPercent(backwardResults.totalChange)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Inflation and Your Money</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Inflation?</h3>
                <p>
                  Inflation is one of those economic concepts that touches everyone's life, whether you're actively thinking about it or not. In simple terms, inflation measures how much the general level of prices for goods and services increases over time. When inflation is happening, each dollar you have buys a little less than it did before. That's why your grandparents probably tell stories about buying candy for a nickel—what seemed like pocket change back then would barely register on today's price tags.
                </p>
                <p className="mt-3">
                  The U.S. government tracks inflation primarily through something called the Consumer Price Index, or CPI. This index is maintained by the Bureau of Labor Statistics, and it measures the average change in prices that urban consumers pay for a basket of goods and services. Think of it as taking a shopping cart filled with typical purchases—food, housing, transportation, medical care, entertainment—and checking the total cost month after month, year after year.
                </p>
                <p className="mt-3">
                  Here's something most people don't realize: moderate inflation is actually considered healthy for the economy. Most economists and central bankers target an inflation rate of around 2-3% annually. Why? Because a small amount of inflation encourages people and businesses to spend and invest their money rather than just sitting on it. If you knew your money would be worth less next year, you'd probably be more motivated to put it to work today.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Three Faces of Inflation</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Demand-Pull Inflation</h4>
                <p>
                  This type happens when there's simply too much money chasing too few goods. Imagine everyone suddenly gets a big raise at the same time—there's more money in people's pockets, so demand for products and services shoots up. But if businesses can't ramp up production fast enough to meet this surge in demand, they start raising prices instead. It's basic supply and demand in action.
                </p>
                <p className="mt-3">
                  You see this play out in real estate markets all the time. When a city becomes the "hot new place to live," demand for housing explodes while the supply of homes remains relatively fixed in the short term. Prices climb because there are more buyers than available properties. The same principle applies across the entire economy when demand outpaces supply.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Cost-Push Inflation</h4>
                <p>
                  Cost-push inflation works from the other direction—it starts with production costs rather than consumer demand. When the price of raw materials goes up, or when workers successfully negotiate higher wages, businesses face increased costs to produce their goods. To maintain their profit margins, they pass these higher costs along to consumers through price increases.
                </p>
                <p className="mt-3">
                  Think about what happens when oil prices spike. Transportation costs rise for practically everything, because almost all goods need to be shipped somewhere. Manufacturers using petroleum-based materials see their input costs climb. Even if consumer demand hasn't changed at all, prices throughout the economy tend to creep upward because production has become more expensive.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Built-In Inflation</h4>
                <p>
                  Sometimes inflation creates its own momentum through what economists call the wage-price spiral. It works like this: when prices rise, workers naturally want higher wages to maintain their standard of living. Employers grant these wage increases, but then they raise their prices to cover the higher labor costs. Those price increases lead workers to demand even higher wages, and the cycle continues.
                </p>
                <p className="mt-3">
                  This type of inflation is particularly stubborn because it's based on expectations and behavior patterns. Once people expect inflation to continue, they act in ways that actually perpetuate it. Unions negotiate contracts with built-in cost-of-living adjustments, businesses preemptively raise prices, and suddenly what started as moderate inflation becomes entrenched.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Inflation Goes Off the Rails</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Hyperinflation: The Economic Nightmare</h4>
                <p>
                  While normal inflation means prices gradually increase over years, hyperinflation is a completely different beast. We're talking about price increases so rapid and severe that money becomes essentially worthless almost overnight. The textbook definition is when inflation exceeds 50% in a single month—but that dry statistic doesn't capture the absolute chaos it creates.
                </p>
                <p className="mt-3">
                  Germany's experience in the early 1920s remains the go-to example. At the peak of the crisis in 1923, prices were doubling every couple of days. People needed wheelbarrows full of cash just to buy bread. Workers demanded to be paid twice a day so they could rush out and spend their wages before they lost even more value. It got so absurd that some people used banknotes as wallpaper because the paper was literally worth more than the money printed on it.
                </p>
                <p className="mt-3">
                  More recently, Zimbabwe experienced hyperinflation so extreme that by 2008, the country was printing 100 trillion dollar notes. Venezuela's ongoing crisis has forced millions to flee the country as their life savings evaporated. These aren't just economic statistics—they represent real human suffering, destroyed savings, and shattered economies.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Deflation: When Prices Fall</h4>
                <p>
                  You might think falling prices would be great news, but economists actually worry about deflation even more than moderate inflation. Here's why: when people expect prices to keep dropping, they postpone purchases. Why buy that car today if it'll be cheaper next month? But when everyone delays spending, businesses sell less, which forces them to cut prices further and lay off workers. Those newly unemployed people spend even less, and you end up in what's called a deflationary spiral.
                </p>
                <p className="mt-3">
                  Japan struggled with deflation for nearly two decades starting in the 1990s, in what became known as the "Lost Decades." Despite interest rates at zero and massive government stimulus, the Japanese economy stagnated because consumers and businesses kept holding back on spending, waiting for even lower prices. It's incredibly difficult to break out of this pattern once it takes hold.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Measuring Inflation: The CPI and Beyond</h3>
                <p>
                  The Consumer Price Index is probably the most watched inflation measure in the United States, but it's not the only one. The CPI tracks price changes for a market basket of about 80,000 items across more than 200 categories. Every month, data collectors visit stores and service establishments to record prices for everything from gasoline to hospital visits to college tuition.
                </p>
                <p className="mt-3">
                  But here's something important to understand: the CPI represents average price changes across all consumers. Your personal inflation rate might be quite different depending on what you buy. If you don't own a car, fluctuations in gasoline prices don't affect you the same way they hit someone with a long commute. If you're healthy and rarely need medical care, healthcare cost increases matter less to your budget than they do for someone managing a chronic condition.
                </p>
                <p className="mt-3">
                  That's why the government also publishes various versions of the CPI. There's the core CPI, which excludes volatile food and energy prices to show underlying inflation trends. There's a version specifically tracking urban consumers versus all consumers. Economists and policymakers look at all these measures together to get a complete picture of what's happening with prices.
                </p>
                <p className="mt-3">
                  Beyond the CPI, other important inflation indicators include the Producer Price Index (which tracks wholesale prices before they reach consumers), the Personal Consumption Expenditures Price Index (the Federal Reserve's preferred measure), and the GDP deflator (which captures price changes across the entire economy). Each has its own strengths and weaknesses, but together they help paint a comprehensive picture of inflation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Protecting Your Wealth from Inflation</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Commodities and Hard Assets</h4>
                <p>
                  Throughout history, people have turned to tangible assets to preserve wealth during inflationary periods. Gold is the classic example—it's been used as a store of value for thousands of years precisely because governments can't simply print more of it. When paper currency loses purchasing power, gold tends to maintain its value or even increase in price.
                </p>
                <p className="mt-3">
                  But gold isn't the only commodity that serves as an inflation hedge. Other precious metals like silver and platinum, agricultural products, oil and natural gas, and industrial metals all tend to rise in price during inflationary periods. The logic is straightforward: these are real, physical goods with inherent value and limited supply. As the purchasing power of money declines, it takes more dollars to buy the same amount of these commodities.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Treasury Inflation-Protected Securities (TIPS)</h4>
                <p>
                  If you want protection from inflation without the volatility of commodities, TIPS are worth considering. These are bonds issued by the U.S. Treasury with a special feature: both the principal value and interest payments adjust upward with inflation as measured by the CPI. So if inflation runs at 3%, your TIPS investment automatically increases by 3% to preserve your purchasing power.
                </p>
                <p className="mt-3">
                  The trade-off is that TIPS typically offer lower initial yields than regular Treasury bonds. You're essentially paying for that inflation protection through reduced baseline returns. But for conservative investors who prioritize capital preservation over maximum growth, TIPS can provide valuable peace of mind and a guaranteed real rate of return.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Real Estate and Other Real Assets</h4>
                <p>
                  Real estate has historically been one of the most effective inflation hedges for average investors. Property values and rents both tend to rise with inflation, and if you have a fixed-rate mortgage, you're paying back your loan with dollars that are worth progressively less. That's a significant advantage.
                </p>
                <p className="mt-3">
                  Other real assets like infrastructure, farmland, and even collectibles can also serve as inflation hedges, though each comes with its own risks and considerations. The key characteristic they all share is that they're tangible assets with intrinsic value that exists independently of any currency.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Equities and Business Ownership</h4>
                <p>
                  Stocks represent ownership in companies that can often raise their prices along with inflation, passing increased costs through to customers. Well-established businesses with strong brands and pricing power tend to weather inflation better than others. Companies that own hard assets or natural resources can be particularly effective inflation hedges.
                </p>
                <p className="mt-3">
                  That said, not all stocks perform well during inflationary periods. High inflation often leads to higher interest rates, which can depress stock valuations. The key is focusing on quality companies with the ability to maintain profit margins even as their input costs rise.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Great Inflation Debates</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Keynesian Economics</h4>
                <p>
                  Economists have been arguing about the causes and cures for inflation for generations. The Keynesian school, named after British economist John Maynard Keynes, believes that inflation primarily results from demand outpacing supply. When the economy is running too hot—unemployment is low, consumers are spending freely, businesses are operating at full capacity—prices naturally rise.
                </p>
                <p className="mt-3">
                  Keynesians argue that governments can and should manage inflation through fiscal policy. During inflationary periods, the government should reduce spending, increase taxes, or both to cool down demand. Conversely, during recessions with falling prices, governments should spend more and cut taxes to stimulate demand. The goal is using the government's fiscal power to smooth out the boom-and-bust cycles.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Monetarism</h4>
                <p>
                  The monetarist school, championed by Milton Friedman, takes a different view. Friedman famously declared that "inflation is always and everywhere a monetary phenomenon." In other words, inflation happens when too much money chases too few goods. The primary culprit isn't government spending or wages or commodity prices—it's the money supply.
                </p>
                <p className="mt-3">
                  Monetarists believe central banks should focus on maintaining steady, predictable growth in the money supply. They're generally skeptical of activist fiscal policy, arguing that government intervention often makes problems worse rather than better. Instead, they advocate for clear rules and consistent monetary policy that the private sector can plan around.
                </p>
                <p className="mt-3">
                  The reality is that modern central banking incorporates insights from both schools of thought, along with newer theories and empirical research. The Federal Reserve monitors both demand conditions and money supply growth, along with dozens of other indicators, in making its policy decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Inflation in the Modern Era</h3>
                <p>
                  For Americans who came of age after 1990, high inflation has been more of a history lesson than a lived experience—at least until recently. From the early 1990s through 2020, inflation in the United States generally hovered between 1-3% annually. The Federal Reserve had seemingly mastered the art of keeping prices stable without choking off growth.
                </p>
                <p className="mt-3">
                  Then came the COVID-19 pandemic and its aftermath. Supply chains seized up while government stimulus checks flooded the economy with cash. Russia's invasion of Ukraine disrupted global energy and food markets. Suddenly, inflation spiked to levels not seen since the early 1980s, peaking above 9% in 2022. Younger workers experienced sticker shock at gas stations and grocery stores, getting their first real taste of what sustained inflation feels like.
                </p>
                <p className="mt-3">
                  This recent experience has rekindled debates about inflation's causes and remedies. Was it primarily too much money chasing too few goods, as monetarists would argue? Or was it supply disruptions and cost shocks beyond any central bank's control? Should the Federal Reserve have acted sooner with interest rate hikes, or would that have unnecessarily damaged the economic recovery? These questions don't have simple answers, which is why inflation remains one of the most studied and debated topics in economics.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Practical Implications for Your Financial Life</h3>
                <p>
                  Understanding inflation isn't just an academic exercise—it has real implications for your financial decisions. If you're saving for retirement that's 30 years away, even modest 3% annual inflation means you'll need almost 2.5 times as much money in nominal terms to have the same purchasing power. That's why financial advisors emphasize investing for growth rather than just stashing cash in a savings account.
                </p>
                <p className="mt-3">
                  When you're comparing investment returns or making financial plans, always think in terms of real returns (after inflation) rather than nominal returns. A savings account paying 2% interest sounds better than one paying 0.5%—until you realize that if inflation is running at 3%, you're actually losing purchasing power in both cases. The 2% account is just losing ground more slowly.
                </p>
                <p className="mt-3">
                  Inflation also affects major life decisions. Is it better to take out a mortgage or pay cash for a house? In an inflationary environment, borrowing at a fixed rate can work in your favor since you repay the loan with dollars that are worth less than when you borrowed them. On the other hand, if deflation occurs, you're stuck paying back the loan with dollars that are worth more, which works against you.
                </p>
                <p className="mt-3">
                  The bottom line is that inflation is an unavoidable feature of modern economic life. You can't stop it, but you can plan for it. Build inflation assumptions into your long-term financial projections. Diversify your assets to include some inflation hedges. And remember that the numbers you see in your bank account matter less than what those dollars can actually buy—which is what inflation is all about.
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
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-blue-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
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
