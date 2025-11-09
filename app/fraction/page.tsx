"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Divide, Plus, Minus, X, DivideSquare } from "lucide-react";

interface FractionResults {
  numerator: number;
  denominator: number;
  decimal: number;
  mixed?: {
    whole: number;
    numerator: number;
    denominator: number;
  };
  simplified: {
    numerator: number;
    denominator: number;
  };
  steps: string[];
}

export default function FractionCalculator() {
  const [fraction1Num, setFraction1Num] = useState<string>("1");
  const [fraction1Den, setFraction1Den] = useState<string>("2");
  const [fraction2Num, setFraction2Num] = useState<string>("1");
  const [fraction2Den, setFraction2Den] = useState<string>("3");
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+ ');

  const [results, setResults] = useState<FractionResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const simplifyFraction = (num: number, den: number): { numerator: number; denominator: number } => {
    if (den === 0) return { numerator: 0, denominator: 1 };

    const divisor = gcd(num, den);
    let simplifiedNum = num / divisor;
    let simplifiedDen = den / divisor;

    // Keep denominator positive
    if (simplifiedDen < 0) {
      simplifiedNum = -simplifiedNum;
      simplifiedDen = -simplifiedDen;
    }

    return { numerator: simplifiedNum, denominator: simplifiedDen };
  };

  const toMixedNumber = (num: number, den: number) => {
    if (den === 0) return null;

    const whole = Math.floor(Math.abs(num) / Math.abs(den));
    const remainder = Math.abs(num) % Math.abs(den);

    if (whole === 0) return null;

    return {
      whole: num < 0 ? -whole : whole,
      numerator: remainder,
      denominator: Math.abs(den)
    };
  };

  const calculateFraction = () => {
    const num1 = parseFloat(fraction1Num) || 0;
    const den1 = parseFloat(fraction1Den) || 1;
    const num2 = parseFloat(fraction2Num) || 0;
    const den2 = parseFloat(fraction2Den) || 1;

    let resultNum = 0;
    let resultDen = 1;
    const steps: string[] = [];

    steps.push(`Operation: ${num1}/${den1} ${operation} ${num2}/${den2}`);

    switch (operation) {
      case '+':
        // Addition: find common denominator
        const addLcm = lcm(den1, den2);
        const addNum1 = num1 * (addLcm / den1);
        const addNum2 = num2 * (addLcm / den2);
        resultNum = addNum1 + addNum2;
        resultDen = addLcm;

        steps.push(`Find common denominator: LCM(${den1}, ${den2}) = ${addLcm}`);
        steps.push(`Convert fractions: ${addNum1}/${addLcm} + ${addNum2}/${addLcm}`);
        steps.push(`Add numerators: ${addNum1} + ${addNum2} = ${resultNum}`);
        break;

      case '-':
        // Subtraction: find common denominator
        const subLcm = lcm(den1, den2);
        const subNum1 = num1 * (subLcm / den1);
        const subNum2 = num2 * (subLcm / den2);
        resultNum = subNum1 - subNum2;
        resultDen = subLcm;

        steps.push(`Find common denominator: LCM(${den1}, ${den2}) = ${subLcm}`);
        steps.push(`Convert fractions: ${subNum1}/${subLcm} - ${subNum2}/${subLcm}`);
        steps.push(`Subtract numerators: ${subNum1} - ${subNum2} = ${resultNum}`);
        break;

      case '*':
        // Multiplication: multiply straight across
        resultNum = num1 * num2;
        resultDen = den1 * den2;

        steps.push(`Multiply numerators: ${num1} × ${num2} = ${resultNum}`);
        steps.push(`Multiply denominators: ${den1} × ${den2} = ${resultDen}`);
        break;

      case '/':
        // Division: multiply by reciprocal
        resultNum = num1 * den2;
        resultDen = den1 * num2;

        steps.push(`Flip the second fraction: ${num2}/${den2} → ${den2}/${num2}`);
        steps.push(`Multiply: ${num1}/${den1} × ${den2}/${num2}`);
        steps.push(`Result: ${resultNum}/${resultDen}`);
        break;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const divisor = gcd(resultNum, resultDen);

    if (divisor > 1) {
      steps.push(`Simplify by dividing by GCD(${Math.abs(resultNum)}, ${Math.abs(resultDen)}) = ${divisor}`);
      steps.push(`Final result: ${simplified.numerator}/${simplified.denominator}`);
    }

    const mixed = toMixedNumber(simplified.numerator, simplified.denominator);
    const decimal = simplified.denominator !== 0 ? simplified.numerator / simplified.denominator : 0;

    setResults({
      numerator: resultNum,
      denominator: resultDen,
      decimal,
      mixed: mixed || undefined,
      simplified,
      steps
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateFraction();
    }
  }, []);

  const OperationButton = ({ op, label, icon }: { op: '+' | '-' | '*' | '/'; label: string; icon: React.ReactNode }) => (
    <Button
      type="button"
      variant={operation === op ? "default" : "outline"}
      onClick={() => setOperation(op)}
      className={`flex-1 ${operation === op
        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        : ""
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
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
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Divide className="h-4 w-4" />
            Math Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Fraction Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Add, subtract, multiply, and divide fractions with automatic simplification and step-by-step solutions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DivideSquare className="h-6 w-6" />
                  Fraction Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Fraction 1 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    First Fraction
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={fraction1Num}
                        onChange={(e) => setFraction1Num(e.target.value)}
                        placeholder="1"
                        className="text-center text-lg"
                      />
                      <p className="text-xs text-slate-500 mt-1 text-center">Numerator</p>
                    </div>
                    <div className="text-2xl text-slate-400">/</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={fraction1Den}
                        onChange={(e) => setFraction1Den(e.target.value)}
                        placeholder="2"
                        className="text-center text-lg"
                      />
                      <p className="text-xs text-slate-500 mt-1 text-center">Denominator</p>
                    </div>
                  </div>
                </div>

                {/* Operation Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Operation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <OperationButton op="+" label="Add" icon={<Plus className="h-4 w-4" />} />
                    <OperationButton op="-" label="Subtract" icon={<Minus className="h-4 w-4" />} />
                    <OperationButton op="*" label="Multiply" icon={<X className="h-4 w-4" />} />
                    <OperationButton op="/" label="Divide" icon={<Divide className="h-4 w-4" />} />
                  </div>
                </div>

                {/* Fraction 2 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Second Fraction
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={fraction2Num}
                        onChange={(e) => setFraction2Num(e.target.value)}
                        placeholder="1"
                        className="text-center text-lg"
                      />
                      <p className="text-xs text-slate-500 mt-1 text-center">Numerator</p>
                    </div>
                    <div className="text-2xl text-slate-400">/</div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={fraction2Den}
                        onChange={(e) => setFraction2Den(e.target.value)}
                        placeholder="3"
                        className="text-center text-lg"
                      />
                      <p className="text-xs text-slate-500 mt-1 text-center">Denominator</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateFraction}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
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
                <Card className="border-2 border-purple-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Result</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-purple-100 mb-2">Simplified Fraction</p>
                        <p className="text-5xl font-bold">
                          {results.simplified.numerator}/{results.simplified.denominator}
                        </p>
                      </div>
                      {results.mixed && (
                        <div className="border-t border-purple-400 pt-4">
                          <p className="text-sm text-purple-100 mb-2">Mixed Number</p>
                          <p className="text-3xl font-bold">
                            {results.mixed.whole} {results.mixed.numerator}/{results.mixed.denominator}
                          </p>
                        </div>
                      )}
                      <div className="border-t border-purple-400 pt-4">
                        <p className="text-sm text-purple-100 mb-2">Decimal</p>
                        <p className="text-3xl font-bold">{results.decimal.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Step by Step Solution */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Step-by-Step Solution</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {results.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-slate-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Original Result</h4>
                        <p className="text-2xl font-bold text-slate-700">
                          {results.numerator}/{results.denominator}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Percentage</h4>
                        <p className="text-2xl font-bold text-slate-700">
                          {(results.decimal * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Divide className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your fractions and select an operation to see the result
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">Understanding Fractions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Fraction?</h3>
                <p>
                  A fraction represents a part of a whole. It consists of two numbers: the numerator (top number) and the denominator (bottom number). The numerator indicates how many parts you have, while the denominator shows how many equal parts make up the whole. For example, in the fraction 3/4, you have 3 parts out of 4 total equal parts.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Adding and Subtracting Fractions</h3>
                <p>
                  To add or subtract fractions, they must have the same denominator (common denominator). If they don't, you need to find the least common multiple (LCM) of the denominators and convert both fractions. Once the denominators match, you simply add or subtract the numerators while keeping the denominator the same.
                </p>
                <p className="mt-3">
                  For example: 1/4 + 1/6. The LCM of 4 and 6 is 12. Convert: 3/12 + 2/12 = 5/12.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Multiplying Fractions</h3>
                <p>
                  Multiplying fractions is straightforward: multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator. Unlike addition and subtraction, you don't need a common denominator.
                </p>
                <p className="mt-3">
                  For example: 2/3 × 3/4 = (2 × 3)/(3 × 4) = 6/12 = 1/2 (simplified).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Dividing Fractions</h3>
                <p>
                  To divide fractions, multiply the first fraction by the reciprocal (flipped version) of the second fraction. The reciprocal of a fraction is created by swapping the numerator and denominator. This "multiply by the reciprocal" rule makes fraction division much simpler.
                </p>
                <p className="mt-3">
                  For example: 1/2 ÷ 3/4 = 1/2 × 4/3 = 4/6 = 2/3 (simplified).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Simplifying Fractions</h3>
                <p>
                  A fraction is simplified (or in lowest terms) when the numerator and denominator have no common factors other than 1. To simplify, find the greatest common divisor (GCD) of both numbers and divide both the numerator and denominator by it. Simplified fractions are easier to understand and work with.
                </p>
                <p className="mt-3">
                  For example: 12/18 can be simplified by dividing both by their GCD of 6, resulting in 2/3.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Mixed Numbers</h3>
                <p>
                  A mixed number combines a whole number and a proper fraction, like 2 1/2. When a fraction's numerator is larger than its denominator (an improper fraction like 5/2), it can be converted to a mixed number. Divide the numerator by the denominator: the quotient becomes the whole number, and the remainder over the original denominator becomes the fraction part.
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
