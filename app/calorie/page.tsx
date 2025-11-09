"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Flame, Target, Activity } from "lucide-react";

interface CalorieResults {
  bmr: number;
  sedentary: number;
  lightlyActive: number;
  moderatelyActive: number;
  veryActive: number;
  extraActive: number;
  maintainWeight: number;
  mildWeightLoss: number;
  weightLoss: number;
  extremeWeightLoss: number;
  mildWeightGain: number;
  weightGain: number;
  extremeWeightGain: number;
}

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<string>("180");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("10");
  const [activityLevel, setActivityLevel] = useState<string>("moderately");
  const [unit, setUnit] = useState<string>("imperial");

  const [results, setResults] = useState<CalorieResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateCalories = () => {
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

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure) based on activity level
    const sedentary = bmr * 1.2;
    const lightlyActive = bmr * 1.375;
    const moderatelyActive = bmr * 1.55;
    const veryActive = bmr * 1.725;
    const extraActive = bmr * 1.9;

    // Get maintenance calories based on selected activity level
    let maintainWeight = 0;
    switch (activityLevel) {
      case "sedentary":
        maintainWeight = sedentary;
        break;
      case "lightly":
        maintainWeight = lightlyActive;
        break;
      case "moderately":
        maintainWeight = moderatelyActive;
        break;
      case "very":
        maintainWeight = veryActive;
        break;
      case "extra":
        maintainWeight = extraActive;
        break;
      default:
        maintainWeight = moderatelyActive;
    }

    // Calculate weight loss/gain targets
    const mildWeightLoss = maintainWeight - 250;      // 0.5 lb/week
    const weightLoss = maintainWeight - 500;           // 1 lb/week
    const extremeWeightLoss = maintainWeight - 1000;   // 2 lb/week
    const mildWeightGain = maintainWeight + 250;       // 0.5 lb/week
    const weightGain = maintainWeight + 500;           // 1 lb/week
    const extremeWeightGain = maintainWeight + 1000;   // 2 lb/week

    setResults({
      bmr,
      sedentary,
      lightlyActive,
      moderatelyActive,
      veryActive,
      extraActive,
      maintainWeight,
      mildWeightLoss,
      weightLoss,
      extremeWeightLoss,
      mildWeightGain,
      weightGain,
      extremeWeightGain
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateCalories();
    }
  }, []);

  const formatCalories = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-orange-600 to-pink-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Flame className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Calorie Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your daily calorie needs based on your age, gender, weight, height, and activity level
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-t-2xl">
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="lightly">Lightly Active (1-3 days/week)</option>
                    <option value="moderately">Moderately Active (3-5 days/week)</option>
                    <option value="very">Very Active (6-7 days/week)</option>
                    <option value="extra">Extra Active (2x per day)</option>
                  </select>
                </div>

                <Button
                  onClick={calculateCalories}
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Calories
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Maintenance Calories Card */}
                <Card className="border-2 border-orange-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-600 to-pink-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Flame className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Maintenance Calories</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{formatCalories(results.maintainWeight)}</p>
                    <p className="text-orange-100">
                      Calories per day to maintain your current weight
                    </p>
                  </div>
                </Card>

                {/* BMR and Activity Levels */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Calories by Activity Level</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-700">Basal Metabolic Rate (BMR)</span>
                        <span className="text-xl font-bold text-blue-600">{formatCalories(results.bmr)}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Calories burned at rest</p>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Sedentary (little or no exercise)</span>
                      <span className="font-semibold">{formatCalories(results.sedentary)} cal/day</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Lightly Active (1-3 days/week)</span>
                      <span className="font-semibold">{formatCalories(results.lightlyActive)} cal/day</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Moderately Active (3-5 days/week)</span>
                      <span className="font-semibold">{formatCalories(results.moderatelyActive)} cal/day</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Very Active (6-7 days/week)</span>
                      <span className="font-semibold">{formatCalories(results.veryActive)} cal/day</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">Extra Active (2x per day)</span>
                      <span className="font-semibold">{formatCalories(results.extraActive)} cal/day</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Weight Goals */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-blue-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Weight Loss Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Mild Loss (0.5 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.mildWeightLoss)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Weight Loss (1 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.weightLoss)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Extreme Loss (2 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.extremeWeightLoss)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-4">
                        Note: Extreme weight loss is not recommended without medical supervision
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-green-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-600" />
                        Weight Gain Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Mild Gain (0.5 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.mildWeightGain)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Weight Gain (1 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.weightGain)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Extreme Gain (2 lb/week)</span>
                        <span className="font-semibold">{formatCalories(results.extremeWeightGain)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-4">
                        Combine with strength training for healthy muscle gain
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Flame className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Information
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Calories" to see your personalized results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50 border-b">
              <CardTitle className="text-2xl">Understanding Calories</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What are Calories?</h3>
                <p>
                  A calorie is a unit of energy. In nutrition, calories refer to the energy people get from the food and drink they consume, and the energy they use in physical activity. Calories are essential for human health - the key is consuming the right amount.
                </p>
                <p className="mt-3">
                  Everyone requires different amounts of energy each day depending on age, sex, size, and activity level. Your Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic life-sustaining functions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Mifflin-St Jeor Equation</h3>
                <p>
                  This calculator uses the Mifflin-St Jeor Equation, which is considered one of the most accurate methods for calculating BMR. The equation factors in your weight, height, age, and biological sex to determine your baseline caloric needs.
                </p>
                <p className="mt-3">
                  Your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR by an activity factor. This gives you the total number of calories you need to maintain your current weight based on your lifestyle.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Weight Management</h3>
                <p>
                  To lose weight, you need to create a caloric deficit by consuming fewer calories than you burn. A deficit of 500 calories per day typically results in losing about 1 pound per week. To gain weight, you need a caloric surplus.
                </p>
                <p className="mt-3">
                  However, not all calories are created equal. The source of your calories matters for your health. Focus on nutrient-dense foods like vegetables, fruits, whole grains, lean proteins, and healthy fats rather than just counting calories.
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
            <Link href="/about" className="hover:text-orange-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-orange-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-orange-600 transition-colors font-medium">
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
