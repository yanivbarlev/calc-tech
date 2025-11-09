"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Zap, Activity, TrendingUp } from "lucide-react";

interface BMRResults {
  bmr: number;
  sedentary: number;
  lightlyActive: number;
  moderatelyActive: number;
  veryActive: number;
  extraActive: number;
}

export default function BMRCalculator() {
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<string>("180");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("10");
  const [unit, setUnit] = useState<string>("imperial");
  const [formula, setFormula] = useState<string>("mifflin");

  const [results, setResults] = useState<BMRResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateBMR = () => {
    const ageVal = parseFloat(age) || 0;
    let weightKg = 0;
    let heightCm = 0;

    if (unit === "imperial") {
      weightKg = (parseFloat(weight) || 0) * 0.453592;
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      heightCm = totalInches * 2.54;
    } else {
      weightKg = parseFloat(weight) || 0;
      heightCm = parseFloat(heightFeet) || 0;
    }

    let bmr = 0;

    if (formula === "mifflin") {
      // Mifflin-St Jeor Equation (more accurate)
      if (gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
      }
    } else {
      // Harris-Benedict Equation (revised)
      if (gender === "male") {
        bmr = 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageVal + 88.362;
      } else {
        bmr = 9.247 * weightKg + 3.098 * heightCm - 4.330 * ageVal + 447.593;
      }
    }

    // Calculate TDEE based on activity multipliers
    const sedentary = bmr * 1.2;
    const lightlyActive = bmr * 1.375;
    const moderatelyActive = bmr * 1.55;
    const veryActive = bmr * 1.725;
    const extraActive = bmr * 1.9;

    setResults({
      bmr,
      sedentary,
      lightlyActive,
      moderatelyActive,
      veryActive,
      extraActive
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateBMR();
    }
  }, []);

  const formatCalories = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-600 to-cyan-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
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
            <Zap className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            BMR Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your Basal Metabolic Rate - the number of calories your body burns at rest
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Formula
                  </label>
                  <select
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="mifflin">Mifflin-St Jeor (Recommended)</option>
                    <option value="harris">Harris-Benedict (Revised)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Unit System
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="imperial">Imperial (lbs, feet, inches)</option>
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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

                <Button
                  onClick={calculateBMR}
                  className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate BMR
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* BMR Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Your BMR</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{formatCalories(results.bmr)}</p>
                    <p className="text-emerald-100">
                      Calories burned per day at rest
                    </p>
                  </div>
                </Card>

                {/* What is BMR */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">What is BMR?</h4>
                      <p className="text-sm text-slate-700">
                        Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic life-sustaining functions like breathing, circulation, nutrient processing, and cell production while at complete rest.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Calorie Needs */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      Daily Calorie Needs (TDEE)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <p className="text-sm text-slate-600 mb-4">
                      Your Total Daily Energy Expenditure based on different activity levels:
                    </p>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Sedentary</div>
                        <div className="text-xs text-slate-500">Little or no exercise</div>
                      </div>
                      <span className="font-semibold text-lg">{formatCalories(results.sedentary)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Lightly Active</div>
                        <div className="text-xs text-slate-500">Exercise 1-3 times/week</div>
                      </div>
                      <span className="font-semibold text-lg">{formatCalories(results.lightlyActive)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Moderately Active</div>
                        <div className="text-xs text-slate-500">Exercise 3-5 times/week</div>
                      </div>
                      <span className="font-semibold text-lg">{formatCalories(results.moderatelyActive)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Very Active</div>
                        <div className="text-xs text-slate-500">Exercise 6-7 times/week</div>
                      </div>
                      <span className="font-semibold text-lg">{formatCalories(results.veryActive)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <div>
                        <div className="font-medium text-slate-700">Extra Active</div>
                        <div className="text-xs text-slate-500">Very intense exercise daily</div>
                      </div>
                      <span className="font-semibold text-lg">{formatCalories(results.extraActive)}</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Zap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Information
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate BMR" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-b">
              <CardTitle className="text-2xl">Understanding BMR</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Basal Metabolic Rate?</h3>
                <p>
                  Your Basal Metabolic Rate (BMR) represents the minimum amount of energy your body requires to perform essential physiological functions while at complete rest. This includes breathing, circulating blood, regulating body temperature, cell growth and repair, and processing nutrients.
                </p>
                <p className="mt-3">
                  BMR accounts for about 60-75% of your daily calorie expenditure. The remaining calories are burned through physical activity and the thermic effect of food (the energy required to digest and process the food you eat).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">BMR vs. TDEE</h3>
                <p>
                  While BMR tells you how many calories you burn at rest, your Total Daily Energy Expenditure (TDEE) accounts for all the calories you burn in a day, including physical activity. TDEE is calculated by multiplying your BMR by an activity factor.
                </p>
                <p className="mt-3">
                  To maintain your current weight, you should consume calories equal to your TDEE. To lose weight, consume fewer calories than your TDEE. To gain weight, consume more.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Factors Affecting BMR</h3>
                <p>
                  Several factors influence your BMR: muscle mass (more muscle = higher BMR), age (BMR decreases with age), gender (men typically have higher BMR), genetics, hormones, body composition, and environmental temperature. This is why the calculator asks for your age, gender, weight, and height.
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
            <Link href="/sitemap" className="hover:text-emerald-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors font-medium">
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
