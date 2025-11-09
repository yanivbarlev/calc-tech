"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Activity, TrendingUp, AlertCircle } from "lucide-react";

interface BMIResults {
  bmi: number;
  category: string;
  healthyWeightRange: { min: number; max: number };
  categoryColor: string;
  description: string;
}

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>("180");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("10");
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [unit, setUnit] = useState<string>("imperial");

  const [results, setResults] = useState<BMIResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateBMI = () => {
    let bmi = 0;
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unit === "imperial") {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      heightInMeters = totalInches * 0.0254;
      weightInKg = (parseFloat(weight) || 0) * 0.453592;
    } else {
      heightInMeters = (parseFloat(heightFeet) || 0) / 100; // cm to meters
      weightInKg = parseFloat(weight) || 0;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      bmi = weightInKg / (heightInMeters * heightInMeters);
    }

    let category = "";
    let categoryColor = "";
    let description = "";

    if (bmi < 18.5) {
      category = "Underweight";
      categoryColor = "text-blue-600";
      description = "Your BMI indicates you may be underweight. Consider consulting with a healthcare provider about healthy weight gain strategies.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal Weight";
      categoryColor = "text-green-600";
      description = "Congratulations! Your BMI falls within the healthy weight range. Maintain your current lifestyle with balanced nutrition and regular exercise.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      categoryColor = "text-yellow-600";
      description = "Your BMI indicates you may be overweight. Consider adopting healthier eating habits and increasing physical activity.";
    } else {
      category = "Obese";
      categoryColor = "text-red-600";
      description = "Your BMI indicates obesity. We recommend consulting with a healthcare provider to develop a personalized weight management plan.";
    }

    // Calculate healthy weight range
    const minHealthyBMI = 18.5;
    const maxHealthyBMI = 24.9;
    const heightSquared = heightInMeters * heightInMeters;

    let minWeight = minHealthyBMI * heightSquared;
    let maxWeight = maxHealthyBMI * heightSquared;

    if (unit === "imperial") {
      minWeight = minWeight * 2.20462; // kg to lbs
      maxWeight = maxWeight * 2.20462;
    }

    setResults({
      bmi,
      category,
      healthyWeightRange: { min: minWeight, max: maxWeight },
      categoryColor,
      description
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateBMI();
    }
  }, []);

  const formatWeight = (value: number) => {
    return `${value.toFixed(1)} ${unit === "imperial" ? "lbs" : "kg"}`;
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Activity className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            BMI Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) and discover your healthy weight range based on your height
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* BMI Result Card */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Your BMI</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">{results.bmi.toFixed(1)}</p>
                    <p className={`text-2xl font-semibold ${results.categoryColor === "text-green-600" ? "text-green-200" : "text-white"}`}>
                      {results.category}
                    </p>
                  </div>
                </Card>

                {/* BMI Scale */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">BMI Scale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-8 rounded-full overflow-hidden flex">
                        <div className="bg-blue-400 flex-1"></div>
                        <div className="bg-green-400 flex-1"></div>
                        <div className="bg-yellow-400 flex-1"></div>
                        <div className="bg-red-400 flex-1"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div>
                          <div className="font-semibold">Underweight</div>
                          <div className="text-slate-600">&lt; 18.5</div>
                        </div>
                        <div>
                          <div className="font-semibold">Normal</div>
                          <div className="text-slate-600">18.5 - 24.9</div>
                        </div>
                        <div>
                          <div className="font-semibold">Overweight</div>
                          <div className="text-slate-600">25 - 29.9</div>
                        </div>
                        <div>
                          <div className="font-semibold">Obese</div>
                          <div className="text-slate-600">&ge; 30</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Information */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      Health Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-slate-700">{results.description}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-slate-800 mb-3">Healthy Weight Range for Your Height</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {formatWeight(results.healthyWeightRange.min)} - {formatWeight(results.healthyWeightRange.max)}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        Based on a BMI of 18.5 - 24.9
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Activity className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Information
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate BMI" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">Understanding BMI</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is BMI?</h3>
                <p>
                  Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared. A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9.
                </p>
                <p className="mt-3">
                  BMI applies to most adults 18-65 years. For children and teens, BMI percentile is used instead because their body composition changes as they grow. BMI is a useful screening tool but it doesn't directly measure body fat or individual health.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Limitations of BMI</h3>
                <p>
                  While BMI is a useful indicator of healthy weight, it has limitations. It doesn't distinguish between muscle and fat mass, so athletes with high muscle mass may have a high BMI despite being very healthy. Similarly, elderly people may have a normal BMI but have lost muscle mass.
                </p>
                <p className="mt-3">
                  BMI also doesn't account for fat distribution, which is important for health risk. Someone with a lot of abdominal fat may have health risks even with a normal BMI. Other measurements like waist circumference and body composition analysis can provide additional insights.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Maintaining a Healthy Weight</h3>
                <p>
                  Achieving and maintaining a healthy weight involves a combination of regular physical activity, healthy eating patterns, adequate sleep, and stress management. Small, sustainable changes to your lifestyle are more effective than dramatic short-term diets.
                </p>
                <p className="mt-3">
                  If your BMI indicates you're outside the healthy range, consult with healthcare professionals who can provide personalized advice based on your individual circumstances, health history, and goals.
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
