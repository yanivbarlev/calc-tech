"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Percent, TrendingUp, TrendingDown } from "lucide-react";

interface PercentageResults {
  mode: string;
  result: number;
  formula: string;
  explanation: string;
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'what-is' | 'is-what-percent' | 'percent-change' | 'increase' | 'decrease'>('what-is');

  // For "What is X% of Y"
  const [percentage, setPercentage] = useState<string>("25");
  const [ofValue, setOfValue] = useState<string>("200");

  // For "X is what percent of Y"
  const [partValue, setPartValue] = useState<string>("50");
  const [totalValue, setTotalValue] = useState<string>("200");

  // For percent change
  const [oldValue, setOldValue] = useState<string>("100");
  const [newValue, setNewValue] = useState<string>("150");

  // For increase/decrease
  const [baseValue, setBaseValue] = useState<string>("100");
  const [percentChange, setPercentChange] = useState<string>("20");

  const [results, setResults] = useState<PercentageResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculatePercentage = () => {
    let result = 0;
    let formula = "";
    let explanation = "";
    let modeText = "";

    switch (mode) {
      case 'what-is':
        const pct = parseFloat(percentage) || 0;
        const of = parseFloat(ofValue) || 0;
        result = (pct / 100) * of;
        formula = `(${pct} ÷ 100) × ${of} = ${result}`;
        explanation = `${pct}% of ${of} equals ${result}`;
        modeText = "What is X% of Y?";
        break;

      case 'is-what-percent':
        const part = parseFloat(partValue) || 0;
        const total = parseFloat(totalValue) || 0;
        result = total !== 0 ? (part / total) * 100 : 0;
        formula = `(${part} ÷ ${total}) × 100 = ${result.toFixed(2)}%`;
        explanation = `${part} is ${result.toFixed(2)}% of ${total}`;
        modeText = "X is what percent of Y?";
        break;

      case 'percent-change':
        const oldVal = parseFloat(oldValue) || 0;
        const newVal = parseFloat(newValue) || 0;
        result = oldVal !== 0 ? ((newVal - oldVal) / oldVal) * 100 : 0;
        formula = `((${newVal} - ${oldVal}) ÷ ${oldVal}) × 100 = ${result.toFixed(2)}%`;
        explanation = result >= 0
          ? `An increase of ${Math.abs(result).toFixed(2)}% from ${oldVal} to ${newVal}`
          : `A decrease of ${Math.abs(result).toFixed(2)}% from ${oldVal} to ${newVal}`;
        modeText = "Percentage Change";
        break;

      case 'increase':
        const base1 = parseFloat(baseValue) || 0;
        const inc = parseFloat(percentChange) || 0;
        result = base1 + (base1 * inc / 100);
        formula = `${base1} + (${base1} × ${inc} ÷ 100) = ${result}`;
        explanation = `${base1} increased by ${inc}% equals ${result}`;
        modeText = "Percentage Increase";
        break;

      case 'decrease':
        const base2 = parseFloat(baseValue) || 0;
        const dec = parseFloat(percentChange) || 0;
        result = base2 - (base2 * dec / 100);
        formula = `${base2} - (${base2} × ${dec} ÷ 100) = ${result}`;
        explanation = `${base2} decreased by ${dec}% equals ${result}`;
        modeText = "Percentage Decrease";
        break;
    }

    setResults({
      mode: modeText,
      result,
      formula,
      explanation
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculatePercentage();
    }
  }, []);

  const ModeButton = ({
    value,
    label
  }: {
    value: typeof mode;
    label: string;
  }) => (
    <Button
      type="button"
      variant={mode === value ? "default" : "outline"}
      onClick={() => setMode(value)}
      className={`${mode === value
        ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        : ""
      }`}
    >
      {label}
    </Button>
  );

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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Percent className="h-4 w-4" />
            Math Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Percentage Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate percentages, percentage changes, increases, and decreases with step-by-step explanations
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-6 w-6" />
                  Calculation Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Mode Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    What do you want to calculate?
                  </label>
                  <div className="space-y-2">
                    <ModeButton value="what-is" label="What is X% of Y?" />
                    <ModeButton value="is-what-percent" label="X is what % of Y?" />
                    <ModeButton value="percent-change" label="% Change" />
                    <ModeButton value="increase" label="% Increase" />
                    <ModeButton value="decrease" label="% Decrease" />
                  </div>
                </div>

                {/* Conditional Inputs Based on Mode */}
                <div className="border-t pt-6">
                  {mode === 'what-is' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Percentage (%)
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            placeholder="25"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Of Value
                        </label>
                        <Input
                          type="number"
                          value={ofValue}
                          onChange={(e) => setOfValue(e.target.value)}
                          placeholder="200"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'is-what-percent' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Part Value
                        </label>
                        <Input
                          type="number"
                          value={partValue}
                          onChange={(e) => setPartValue(e.target.value)}
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Total Value
                        </label>
                        <Input
                          type="number"
                          value={totalValue}
                          onChange={(e) => setTotalValue(e.target.value)}
                          placeholder="200"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'percent-change' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Original Value
                        </label>
                        <Input
                          type="number"
                          value={oldValue}
                          onChange={(e) => setOldValue(e.target.value)}
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          New Value
                        </label>
                        <Input
                          type="number"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          placeholder="150"
                        />
                      </div>
                    </div>
                  )}

                  {(mode === 'increase' || mode === 'decrease') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Base Value
                        </label>
                        <Input
                          type="number"
                          value={baseValue}
                          onChange={(e) => setBaseValue(e.target.value)}
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Percentage (%)
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={percentChange}
                            onChange={(e) => setPercentChange(e.target.value)}
                            placeholder="20"
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-3 text-slate-500">%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={calculatePercentage}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Main Result Card */}
                <Card className="border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Percent className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">{results.mode}</h3>
                    </div>
                    <p className="text-5xl font-bold mb-3">
                      {mode === 'is-what-percent' || mode === 'percent-change'
                        ? `${results.result.toFixed(2)}%`
                        : results.result.toFixed(2)
                      }
                    </p>
                    <p className="text-green-100 text-lg">{results.explanation}</p>
                  </div>
                </Card>

                {/* Formula Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <CardTitle className="text-lg">Formula Used</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-slate-50 rounded-xl p-6 font-mono text-lg text-center">
                      {results.formula}
                    </div>
                  </CardContent>
                </Card>

                {/* Examples Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <CardTitle className="text-lg">Common Percentage Calculations</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Finding 10%</div>
                        <div className="text-lg font-semibold text-slate-800">Divide by 10</div>
                        <div className="text-xs text-slate-500 mt-1">10% of 250 = 25</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Finding 50%</div>
                        <div className="text-lg font-semibold text-slate-800">Divide by 2</div>
                        <div className="text-xs text-slate-500 mt-1">50% of 250 = 125</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Finding 25%</div>
                        <div className="text-lg font-semibold text-slate-800">Divide by 4</div>
                        <div className="text-xs text-slate-500 mt-1">25% of 200 = 50</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">Finding 1%</div>
                        <div className="text-lg font-semibold text-slate-800">Divide by 100</div>
                        <div className="text-xs text-slate-500 mt-1">1% of 300 = 3</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Percent className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Select a calculation mode and enter your values
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="text-2xl">Understanding Percentages</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Percentage?</h3>
                <p>
                  A percentage is a way of expressing a number as a fraction of 100. The word "percent" comes from the Latin "per centum," meaning "by the hundred." Percentages are used everywhere in daily life—from calculating discounts and taxes to understanding statistics and financial data. The percent sign (%) is simply shorthand for "out of 100."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Basic Percentage Formulas</h3>
                <p>
                  <strong>Finding X% of Y:</strong> Multiply Y by X and divide by 100, or multiply Y by X/100. For example, 20% of 150 = 150 × (20/100) = 30.
                </p>
                <p className="mt-3">
                  <strong>Finding what percentage X is of Y:</strong> Divide X by Y and multiply by 100. For example, 30 is what % of 150? (30/150) × 100 = 20%.
                </p>
                <p className="mt-3">
                  <strong>Percentage Change:</strong> ((New Value - Old Value) / Old Value) × 100. If a value increases from 50 to 75, the change is ((75-50)/50) × 100 = 50% increase.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Percentage Increase and Decrease</h3>
                <p>
                  To increase a value by a percentage, multiply the original value by (1 + percentage/100). For example, to increase 200 by 15%, calculate 200 × 1.15 = 230.
                </p>
                <p className="mt-3">
                  To decrease a value by a percentage, multiply the original value by (1 - percentage/100). For example, to decrease 200 by 15%, calculate 200 × 0.85 = 170.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Percentage Shortcuts</h3>
                <p>
                  Some percentages are easy to calculate mentally. 10% of any number is just that number divided by 10. 50% is half. 25% is a quarter. 1% is dividing by 100. You can combine these: to find 15%, find 10% and 5% (which is half of 10%) and add them together.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World Applications</h3>
                <p>
                  Percentages are essential in finance (interest rates, investment returns), retail (discounts, sales tax), academics (test scores, grade percentages), health (body fat percentage, nutrition labels), and statistics (survey results, probability). Understanding how to calculate and interpret percentages helps you make informed decisions in virtually every aspect of life.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Important Note About Percentage Changes</h3>
                <p>
                  Percentage increases and decreases are not symmetrical. If a stock price drops 50% from $100 to $50, it needs to increase 100% (not 50%) to get back to $100. This is because the percentage is calculated based on different base values. Always pay attention to what the percentage is "of."
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
            © 2025 Calc-Tech.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
