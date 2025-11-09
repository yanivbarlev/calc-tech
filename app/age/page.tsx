"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Calendar, Cake, Clock } from "lucide-react";

interface AgeResults {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: {
    date: string;
    daysUntil: number;
    dayOfWeek: string;
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("1990-01-01");
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [results, setResults] = useState<AgeResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) {
      alert("Birth date cannot be in the future!");
      return;
    }

    // Calculate years, months, and days
    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total values
    const timeDiff = current.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate next birthday
    let nextBirthday = new Date(
      current.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday < current) {
      nextBirthday = new Date(
        current.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate()
      );
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dayOfWeek = nextBirthday.toLocaleDateString("en-US", {
      weekday: "long",
    });

    setResults({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
      totalMinutes,
      nextBirthday: {
        date: nextBirthday.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        daysUntil: daysUntilBirthday,
        dayOfWeek,
      },
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateAge();
    }
  }, []);

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
            <Calendar className="h-4 w-4" />
            Date & Time Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Age Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your exact age in years, months, days, and even minutes.
            Find out when your next birthday is!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Date Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Calculate Age As Of
                  </label>
                  <Input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Leave as today or choose a future/past date
                  </p>
                </div>

                <Button
                  onClick={calculateAge}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Age
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Main Age Result Card */}
                <Card className="border-2 border-purple-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Cake className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Your Age</h3>
                    </div>
                    <p className="text-5xl font-bold mb-3">
                      {results.years} Years
                    </p>
                    <p className="text-2xl text-purple-100">
                      {results.months} Months, {results.days} Days
                    </p>
                  </div>
                </Card>

                {/* Age in Different Units */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <CardTitle className="text-lg">
                      Age in Different Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Months
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {results.totalMonths.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Weeks
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {results.totalWeeks.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Days
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {results.totalDays.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Hours
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {results.totalHours.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl col-span-2">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Minutes
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {results.totalMinutes.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Birthday Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Cake className="h-5 w-5 text-purple-600" />
                      Next Birthday
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-slate-600 mb-2">Date</p>
                      <p className="text-xl font-bold text-purple-700">
                        {results.nextBirthday.date}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        ({results.nextBirthday.dayOfWeek})
                      </p>
                    </div>
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <p className="text-sm text-slate-600 mb-2">
                        Days Until Birthday
                      </p>
                      <p className="text-3xl font-bold text-pink-600">
                        {results.nextBirthday.daysUntil} days
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {results.nextBirthday.daysUntil === 0
                          ? "Happy Birthday!"
                          : `You'll be ${results.years + 1} years old`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Birth Date
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Age" to see your results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="text-2xl">About Age Calculation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  How Age is Calculated
                </h3>
                <p>
                  Age is calculated by finding the difference between your birth
                  date and the current date (or any specified date). The
                  calculator determines the number of complete years that have
                  passed, then calculates the remaining months and days. This
                  method ensures accuracy across different month lengths and
                  leap years.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Different Ways to Express Age
                </h3>
                <p>
                  While we typically express age in years, it can be useful to
                  know your age in other units. For example, knowing your age in
                  days can be interesting for milestones (like 10,000 days old),
                  while hours and minutes can put your lifetime into perspective.
                  Each unit provides a different way of understanding the passage
                  of time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Birthday Planning
                </h3>
                <p>
                  Knowing exactly how many days until your next birthday can help
                  with planning celebrations and setting goals. The calculator
                  also tells you what day of the week your birthday falls on,
                  which can be helpful for scheduling parties or taking time off
                  work.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Practical Uses
                </h3>
                <p>
                  Age calculators are useful for many purposes: determining
                  eligibility for age-restricted activities, calculating
                  retirement dates, figuring out school enrollment dates, or
                  simply satisfying curiosity about exact ages. They're
                  especially helpful when precise age in months and days matters,
                  such as for infant development milestones or legal age
                  requirements.
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
            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Sitemap
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors font-medium"
            >
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
