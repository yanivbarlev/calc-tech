"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Baby, Calendar, Heart } from "lucide-react";

interface ConceptionResults {
  conceptionDate: Date;
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  conceptionRangeStart: Date;
  conceptionRangeEnd: Date;
}

export default function ConceptionCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<string>("lmp");
  const [lastPeriodDate, setLastPeriodDate] = useState<string>("");
  const [dueDateInput, setDueDateInput] = useState<string>("");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("");
  const [gestationalAge, setGestationalAge] = useState<string>("");

  const [results, setResults] = useState<ConceptionResults | null>(null);

  const calculateConception = () => {
    let conceptionDate = new Date();
    let dueDate = new Date();

    if (calculationMethod === "lmp" && lastPeriodDate) {
      const lmp = new Date(lastPeriodDate);
      // Conception typically occurs about 14 days after LMP
      conceptionDate = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);
      // Due date is 280 days (40 weeks) from LMP
      dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    } else if (calculationMethod === "duedate" && dueDateInput) {
      dueDate = new Date(dueDateInput);
      // Work backwards: conception was 266 days before due date
      conceptionDate = new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000);
    } else if (calculationMethod === "ultrasound" && ultrasoundDate && gestationalAge) {
      const ultrasound = new Date(ultrasoundDate);
      const weeksAtUltrasound = parseInt(gestationalAge);
      // Calculate LMP from ultrasound data
      const lmp = new Date(ultrasound.getTime() - weeksAtUltrasound * 7 * 24 * 60 * 60 * 1000);
      conceptionDate = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);
      dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    } else {
      return;
    }

    // Calculate conception range (conception can occur 11-21 days after LMP)
    const conceptionRangeStart = new Date(conceptionDate.getTime() - 3 * 24 * 60 * 60 * 1000);
    const conceptionRangeEnd = new Date(conceptionDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    // Calculate current gestational age
    const today = new Date();
    const lmp = new Date(conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (24 * 60 * 60 * 1000));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;

    setResults({
      conceptionDate,
      dueDate,
      currentWeek,
      currentDay,
      conceptionRangeStart,
      conceptionRangeEnd
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-pink-600 to-rose-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Baby className="h-4 w-4" />
            Pregnancy Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Conception Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Estimate your conception date based on your last menstrual period, due date, or ultrasound information
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Calculation Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Calculate From
                  </label>
                  <select
                    value={calculationMethod}
                    onChange={(e) => setCalculationMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="lmp">Last Menstrual Period</option>
                    <option value="duedate">Due Date</option>
                    <option value="ultrasound">Ultrasound Date</option>
                  </select>
                </div>

                {calculationMethod === "lmp" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      First Day of Last Period
                    </label>
                    <Input
                      type="date"
                      value={lastPeriodDate}
                      onChange={(e) => setLastPeriodDate(e.target.value)}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Enter the first day of your last menstrual period
                    </p>
                  </div>
                )}

                {calculationMethod === "duedate" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={dueDateInput}
                      onChange={(e) => setDueDateInput(e.target.value)}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Enter your estimated due date
                    </p>
                  </div>
                )}

                {calculationMethod === "ultrasound" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Ultrasound Date
                      </label>
                      <Input
                        type="date"
                        value={ultrasoundDate}
                        onChange={(e) => setUltrasoundDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Gestational Age at Ultrasound (weeks)
                      </label>
                      <Input
                        type="number"
                        value={gestationalAge}
                        onChange={(e) => setGestationalAge(e.target.value)}
                        placeholder="8"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        How many weeks pregnant were you at the ultrasound?
                      </p>
                    </div>
                  </>
                )}

                <Button
                  onClick={calculateConception}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Conception Date
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Conception Date Card */}
                <Card className="border-2 border-pink-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Estimated Conception Date</h3>
                    </div>
                    <p className="text-3xl font-bold mb-2">{formatDate(results.conceptionDate)}</p>
                    <p className="text-pink-100">
                      Likely conception range: {formatShortDate(results.conceptionRangeStart)} - {formatShortDate(results.conceptionRangeEnd)}
                    </p>
                  </div>
                </Card>

                {/* Current Status */}
                {results.currentWeek >= 0 && results.currentWeek <= 42 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b">
                      <CardTitle className="text-lg">Current Pregnancy Status</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <p className="text-5xl font-bold text-pink-600 mb-2">
                          {results.currentWeek} <span className="text-2xl">weeks</span> {results.currentDay} <span className="text-2xl">days</span>
                        </p>
                        <p className="text-slate-600">Gestational Age</p>
                      </div>
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mt-4">
                        <p className="text-sm text-slate-700">
                          Based on the conception date, you are approximately {results.currentWeek} weeks and {results.currentDay} days pregnant.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Due Date */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Baby className="h-5 w-5 text-pink-600" />
                      Estimated Due Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-rose-600 mb-2">
                        {formatDate(results.dueDate)}
                      </p>
                      <p className="text-sm text-slate-600">
                        40 weeks from the first day of your last period
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Important Information */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg">
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Important Note</h4>
                      <p className="text-sm text-slate-700">
                        This calculator provides estimates based on average pregnancy durations. Conception dates can vary, and only 5% of babies are born on their exact due date. Most babies arrive within two weeks before or after the estimated due date. Always consult with your healthcare provider for accurate pregnancy dating and care.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Baby className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Information
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Conception Date" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b">
              <CardTitle className="text-2xl">Understanding Conception</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Conception Dating Works</h3>
                <p>
                  Conception typically occurs during ovulation, which for most women happens about 14 days after the first day of their last menstrual period. However, this can vary based on individual cycle length. Sperm can survive in the female reproductive tract for up to 5 days, so intercourse several days before ovulation can still result in pregnancy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Use Last Menstrual Period?</h3>
                <p>
                  Healthcare providers typically calculate pregnancy from the first day of your last menstrual period (LMP) rather than the actual conception date. This is because the LMP is usually more certain than the exact day of conception. This method assumes a 28-day cycle with ovulation on day 14, which is why pregnancy is calculated as 40 weeks (280 days) from the LMP.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Accuracy of Conception Calculators</h3>
                <p>
                  Conception calculators provide estimates based on average cycles and typical ovulation patterns. The actual conception date may vary by several days. Early ultrasounds (performed in the first trimester) provide more accurate pregnancy dating and may adjust your due date. Your healthcare provider will use various methods including ultrasound measurements and physical examinations to determine the most accurate due date.
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
            <Link href="/about" className="hover:text-pink-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-pink-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-pink-600 transition-colors font-medium">
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
