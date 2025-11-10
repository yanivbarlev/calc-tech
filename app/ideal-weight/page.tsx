"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Target, TrendingUp, Activity } from "lucide-react";

interface IdealWeightResults {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  healthyRange: { min: number; max: number };
}

export default function IdealWeightCalculator() {
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("10");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [unit, setUnit] = useState<string>("imperial");

  const [results, setResults] = useState<IdealWeightResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateIdealWeight = () => {
    let heightInchesCalc = 0;

    if (unit === "imperial") {
      heightInchesCalc = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
    } else {
      heightInchesCalc = (parseFloat(heightFeet) || 0) / 2.54;
    }

    const heightCm = heightInchesCalc * 2.54;

    // Calculate using different formulas
    let robinson = 0;
    let miller = 0;
    let devine = 0;
    let hamwi = 0;

    if (gender === "male") {
      // Robinson (1983)
      robinson = 52 + 1.9 * (heightInchesCalc - 60);
      // Miller (1983)
      miller = 56.2 + 1.41 * (heightInchesCalc - 60);
      // Devine (1974)
      devine = 50 + 2.3 * (heightInchesCalc - 60);
      // Hamwi (1964)
      hamwi = 48 + 2.7 * (heightInchesCalc - 60);
    } else {
      // Robinson (1983)
      robinson = 49 + 1.7 * (heightInchesCalc - 60);
      // Miller (1983)
      miller = 53.1 + 1.36 * (heightInchesCalc - 60);
      // Devine (1974)
      devine = 45.5 + 2.3 * (heightInchesCalc - 60);
      // Hamwi (1964)
      hamwi = 45.5 + 2.2 * (heightInchesCalc - 60);
    }

    // Calculate healthy weight range based on BMI (18.5-24.9)
    const heightMeters = heightCm / 100;
    const minHealthyWeight = 18.5 * heightMeters * heightMeters;
    const maxHealthyWeight = 24.9 * heightMeters * heightMeters;

    // Convert to lbs if imperial
    let minWeight = minHealthyWeight;
    let maxWeight = maxHealthyWeight;

    if (unit === "imperial") {
      minWeight = minHealthyWeight * 2.20462;
      maxWeight = maxHealthyWeight * 2.20462;
    } else {
      robinson = robinson * 0.453592;
      miller = miller * 0.453592;
      devine = devine * 0.453592;
      hamwi = hamwi * 0.453592;
    }

    setResults({
      robinson: unit === "imperial" ? robinson : robinson,
      miller: unit === "imperial" ? miller : miller,
      devine: unit === "imperial" ? devine : devine,
      hamwi: unit === "imperial" ? hamwi : hamwi,
      healthyRange: { min: minWeight, max: maxWeight }
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateIdealWeight();
    }
  }, []);

  const formatWeight = (value: number) => {
    return `${value.toFixed(1)} ${unit === "imperial" ? "lbs" : "kg"}`;
  };

  const averageIdealWeight = results
    ? (results.robinson + results.miller + results.devine + results.hamwi) / 4
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Ideal Weight Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your ideal body weight using multiple scientific formulas and find your healthy weight range
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Unit System
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="imperial">Imperial (feet, inches, lbs)</option>
                    <option value="metric">Metric (cm, kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Height
                  </label>
                  {unit === "imperial" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Input
                          type="number"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          placeholder="5"
                        />
                        <p className="text-xs text-slate-500 mt-1">Feet</p>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          placeholder="10"
                        />
                        <p className="text-xs text-slate-500 mt-1">Inches</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="178"
                      />
                      <p className="text-xs text-slate-500 mt-1">Centimeters</p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={calculateIdealWeight}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Ideal Weight
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Average Ideal Weight Card */}
                <Card className="border-2 border-violet-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Average Ideal Weight</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{formatWeight(averageIdealWeight)}</p>
                    <p className="text-violet-100">
                      Based on multiple scientific formulas
                    </p>
                  </div>
                </Card>

                {/* Healthy Weight Range */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Healthy Weight Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-green-600">
                        {formatWeight(results.healthyRange.min)} - {formatWeight(results.healthyRange.max)}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">Based on BMI 18.5 - 24.9</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Formulas */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Ideal Weight by Formula</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Robinson Formula (1983)</div>
                        <div className="text-xs text-slate-500">Most commonly used</div>
                      </div>
                      <span className="font-semibold text-lg">{formatWeight(results.robinson)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Miller Formula (1983)</div>
                        <div className="text-xs text-slate-500">Similar to Robinson</div>
                      </div>
                      <span className="font-semibold text-lg">{formatWeight(results.miller)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Devine Formula (1974)</div>
                        <div className="text-xs text-slate-500">Used in medication dosing</div>
                      </div>
                      <span className="font-semibold text-lg">{formatWeight(results.devine)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <div>
                        <div className="font-medium text-slate-700">Hamwi Formula (1964)</div>
                        <div className="text-xs text-slate-500">Quick estimation method</div>
                      </div>
                      <span className="font-semibold text-lg">{formatWeight(results.hamwi)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Note */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg">
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Important Note</h4>
                      <p className="text-sm text-slate-700">
                        These formulas provide estimates based on height and gender. Your ideal weight depends on many factors including muscle mass, bone density, body composition, and overall health. Consult with a healthcare provider for personalized guidance.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Information
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Ideal Weight" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border-b">
              <CardTitle className="text-2xl">Understanding Ideal Weight</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Ideal Body Weight?</h3>
                <p>
                  Ideal body weight is an estimate of what a healthy weight should be for your height. It's used in medical settings for medication dosing, nutritional assessments, and health evaluations. However, it's important to understand that "ideal" weight is just one measure of health.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Formulas Explained</h3>
                <p>
                  This calculator uses four well-established formulas developed by different researchers. The Robinson and Miller formulas are modifications of earlier work and are commonly used today. The Devine formula is frequently used in clinical settings for medication dosing. The Hamwi formula provides a quick estimation method.
                </p>
                <p className="mt-3">
                  All these formulas were originally designed for heights between 5 feet and 6 feet tall, but they can be applied to a wider range with reasonable accuracy. They don't account for frame size, muscle mass, or other individual factors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Beyond the Numbers</h3>
                <p>
                  Your health isn't determined by a single number on a scale. Factors like body composition (muscle vs. fat), fitness level, nutrition quality, genetics, and overall well-being are equally important. Athletes with significant muscle mass may weigh more than these formulas suggest while being extremely healthy.
                </p>
                <p className="mt-3">
                  Use these calculations as a general guideline, but focus on sustainable healthy habits rather than achieving a specific number. Regular exercise, balanced nutrition, adequate sleep, and stress management contribute more to long-term health than hitting an "ideal" weight.
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
            <Link href="/about" className="hover:text-violet-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-violet-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-violet-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-violet-600 transition-colors font-medium">
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
