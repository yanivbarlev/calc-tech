"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Activity, TrendingUp, User } from "lucide-react";

interface BodyFatResults {
  bodyFatPercentage: number;
  bodyFatMass: number;
  leanBodyMass: number;
  category: string;
  categoryColor: string;
  description: string;
}

export default function BodyFatCalculator() {
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<string>("180");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("10");
  const [neck, setNeck] = useState<string>("15");
  const [waist, setWaist] = useState<string>("32");
  const [hip, setHip] = useState<string>("38");
  const [unit, setUnit] = useState<string>("imperial");

  const [results, setResults] = useState<BodyFatResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateBodyFat = () => {
    let heightInches = 0;
    let weightLbs = 0;
    let neckInches = 0;
    let waistInches = 0;
    let hipInches = 0;

    if (unit === "imperial") {
      heightInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      weightLbs = parseFloat(weight) || 0;
      neckInches = parseFloat(neck) || 0;
      waistInches = parseFloat(waist) || 0;
      hipInches = parseFloat(hip) || 0;
    } else {
      heightInches = (parseFloat(heightFeet) || 0) / 2.54;
      weightLbs = (parseFloat(weight) || 0) * 2.20462;
      neckInches = (parseFloat(neck) || 0) / 2.54;
      waistInches = (parseFloat(waist) || 0) / 2.54;
      hipInches = (parseFloat(hip) || 0) / 2.54;
    }

    // U.S. Navy Method
    let bodyFatPercentage = 0;

    if (gender === "male") {
      bodyFatPercentage =
        495 /
        (1.0324 - 0.19077 * Math.log10(waistInches - neckInches) + 0.15456 * Math.log10(heightInches)) -
        450;
    } else {
      bodyFatPercentage =
        495 /
        (1.29579 - 0.35004 * Math.log10(waistInches + hipInches - neckInches) + 0.22100 * Math.log10(heightInches)) -
        450;
    }

    const bodyFatMass = weightLbs * (bodyFatPercentage / 100);
    const leanBodyMass = weightLbs - bodyFatMass;

    // Determine category based on gender and age
    let category = "";
    let categoryColor = "";
    let description = "";

    if (gender === "male") {
      if (bodyFatPercentage < 6) {
        category = "Essential Fat";
        categoryColor = "text-blue-600";
        description = "This level is very low and may not be sustainable for most people.";
      } else if (bodyFatPercentage < 14) {
        category = "Athletes";
        categoryColor = "text-green-600";
        description = "Athletic body fat percentage. Common among competitive athletes.";
      } else if (bodyFatPercentage < 18) {
        category = "Fitness";
        categoryColor = "text-emerald-600";
        description = "Fit and healthy body fat percentage with visible muscle definition.";
      } else if (bodyFatPercentage < 25) {
        category = "Average";
        categoryColor = "text-yellow-600";
        description = "Average body fat percentage for men.";
      } else {
        category = "Obese";
        categoryColor = "text-red-600";
        description = "Higher than recommended. Consider consulting a healthcare provider.";
      }
    } else {
      if (bodyFatPercentage < 14) {
        category = "Essential Fat";
        categoryColor = "text-blue-600";
        description = "This level is very low and may not be sustainable for most women.";
      } else if (bodyFatPercentage < 21) {
        category = "Athletes";
        categoryColor = "text-green-600";
        description = "Athletic body fat percentage. Common among competitive athletes.";
      } else if (bodyFatPercentage < 25) {
        category = "Fitness";
        categoryColor = "text-emerald-600";
        description = "Fit and healthy body fat percentage.";
      } else if (bodyFatPercentage < 32) {
        category = "Average";
        categoryColor = "text-yellow-600";
        description = "Average body fat percentage for women.";
      } else {
        category = "Obese";
        categoryColor = "text-red-600";
        description = "Higher than recommended. Consider consulting a healthcare provider.";
      }
    }

    setResults({
      bodyFatPercentage,
      bodyFatMass,
      leanBodyMass,
      category,
      categoryColor,
      description
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateBodyFat();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-cyan-600 to-indigo-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Body Fat Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Estimate your body fat percentage using the U.S. Navy method based on circumference measurements
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Your Measurements
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="imperial">Imperial (lbs, inches)</option>
                    <option value="metric">Metric (kg, cm)</option>
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {unit === "imperial" ? "Weight (lbs)" : "Weight (kg)"}
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === "imperial" ? "180" : "82"}
                  />
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

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4">Circumference Measurements</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Neck ({unit === "imperial" ? "inches" : "cm"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        placeholder={unit === "imperial" ? "15" : "38"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Waist ({unit === "imperial" ? "inches" : "cm"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder={unit === "imperial" ? "32" : "81"}
                      />
                    </div>

                    {gender === "female" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Hip ({unit === "imperial" ? "inches" : "cm"})
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          value={hip}
                          onChange={(e) => setHip(e.target.value)}
                          placeholder={unit === "imperial" ? "38" : "97"}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={calculateBodyFat}
                  className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Body Fat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Body Fat Percentage Card */}
                <Card className="border-2 border-cyan-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Body Fat Percentage</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{results.bodyFatPercentage.toFixed(1)}%</p>
                    <p className={`text-2xl font-semibold ${results.categoryColor === "text-green-600" || results.categoryColor === "text-emerald-600" ? "text-green-200" : "text-white"}`}>
                      {results.category}
                    </p>
                  </div>
                </Card>

                {/* Body Composition */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Body Composition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Body Fat Mass</span>
                      <span className="font-semibold text-slate-800">
                        {results.bodyFatMass.toFixed(1)} {unit === "imperial" ? "lbs" : "kg"}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Lean Body Mass</span>
                      <span className="font-semibold text-slate-800">
                        {results.leanBodyMass.toFixed(1)} {unit === "imperial" ? "lbs" : "kg"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Information */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-slate-700">{results.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Body Fat Percentage Chart */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Body Fat Categories ({gender === "male" ? "Men" : "Women"})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {gender === "male" ? (
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Essential Fat</span>
                          <span className="text-slate-600">2-5%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Athletes</span>
                          <span className="text-slate-600">6-13%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Fitness</span>
                          <span className="text-slate-600">14-17%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Average</span>
                          <span className="text-slate-600">18-24%</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Obese</span>
                          <span className="text-slate-600">25%+</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Essential Fat</span>
                          <span className="text-slate-600">10-13%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Athletes</span>
                          <span className="text-slate-600">14-20%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Fitness</span>
                          <span className="text-slate-600">21-24%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Average</span>
                          <span className="text-slate-600">25-31%</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium">Obese</span>
                          <span className="text-slate-600">32%+</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Activity className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Measurements
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Body Fat" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-indigo-50 border-b">
              <CardTitle className="text-2xl">Understanding Body Fat</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Body Fat Percentage?</h3>
                <p>
                  Body fat percentage is the proportion of fat in your body compared to everything else (bones, muscles, organs, water, etc.). Unlike BMI, which only considers height and weight, body fat percentage gives you a more accurate picture of your body composition and health.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The U.S. Navy Method</h3>
                <p>
                  This calculator uses the U.S. Navy circumference method, which estimates body fat percentage based on measurements of your neck, waist, and (for women) hips, along with your height. While not as accurate as methods like DEXA scans or hydrostatic weighing, it's a convenient and reasonably accurate estimation method that you can do at home.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Body Fat Matters</h3>
                <p>
                  Having some body fat is essential for health - it protects organs, stores energy, and regulates hormones. However, too much body fat, especially around the abdomen, is associated with increased health risks including heart disease, diabetes, and certain cancers. On the other hand, too little body fat can lead to hormone imbalances, weakened immune function, and other health issues.
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
            <Link href="/about" className="hover:text-cyan-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-cyan-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-cyan-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-cyan-600 transition-colors font-medium">
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
