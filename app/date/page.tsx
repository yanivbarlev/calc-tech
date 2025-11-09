"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  Calendar,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

interface DateResults {
  mode: string;
  resultDate?: string;
  dayOfWeek?: string;
  difference?: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
  };
}

export default function DateCalculator() {
  const [mode, setMode] = useState<"add" | "subtract" | "difference">("add");
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // For add/subtract mode
  const [years, setYears] = useState<string>("0");
  const [months, setMonths] = useState<string>("0");
  const [days, setDays] = useState<string>("30");

  const [results, setResults] = useState<DateResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateDate = () => {
    let modeText = "";

    if (mode === "add" || mode === "subtract") {
      const date = new Date(startDate);
      const yearsToAdd = parseInt(years) || 0;
      const monthsToAdd = parseInt(months) || 0;
      const daysToAdd = parseInt(days) || 0;

      if (mode === "add") {
        date.setFullYear(date.getFullYear() + yearsToAdd);
        date.setMonth(date.getMonth() + monthsToAdd);
        date.setDate(date.getDate() + daysToAdd);
        modeText = "Date After Adding Time";
      } else {
        date.setFullYear(date.getFullYear() - yearsToAdd);
        date.setMonth(date.getMonth() - monthsToAdd);
        date.setDate(date.getDate() - daysToAdd);
        modeText = "Date After Subtracting Time";
      }

      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const resultDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setResults({
        mode: modeText,
        resultDate,
        dayOfWeek,
      });
    } else {
      // Difference mode
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        alert("Start date must be before end date!");
        return;
      }

      // Calculate difference
      let yearsDiff = end.getFullYear() - start.getFullYear();
      let monthsDiff = end.getMonth() - start.getMonth();
      let daysDiff = end.getDate() - start.getDate();

      if (daysDiff < 0) {
        monthsDiff--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        daysDiff += prevMonth.getDate();
      }

      if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
      }

      const timeDiff = end.getTime() - start.getTime();
      const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = totalDays * 24;

      setResults({
        mode: "Date Difference",
        difference: {
          years: yearsDiff,
          months: monthsDiff,
          days: daysDiff,
          totalDays,
          totalWeeks,
          totalHours,
        },
      });
    }

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateDate();
    }
  }, []);

  const ModeButton = ({
    value,
    label,
    icon: Icon,
  }: {
    value: typeof mode;
    label: string;
    icon: any;
  }) => (
    <Button
      type="button"
      variant={mode === value ? "default" : "outline"}
      onClick={() => setMode(value)}
      className={`${
        mode === value
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          : ""
      } justify-start gap-2`}
    >
      <Icon className="h-4 w-4" />
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
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="h-4 w-4" />
            Date & Time Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Date Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Add or subtract time from dates, or calculate the difference between
            two dates
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Date Calculation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Mode Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Calculation Mode
                  </label>
                  <div className="space-y-2">
                    <ModeButton value="add" label="Add Time" icon={Plus} />
                    <ModeButton
                      value="subtract"
                      label="Subtract Time"
                      icon={Minus}
                    />
                    <ModeButton
                      value="difference"
                      label="Find Difference"
                      icon={ArrowRight}
                    />
                  </div>
                </div>

                {/* Conditional Inputs */}
                <div className="border-t pt-6">
                  {mode === "difference" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Start Date
                        </label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          End Date
                        </label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Starting Date
                        </label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Years
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Months
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Days
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            placeholder="30"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={calculateDate}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
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
                <Card className="border-2 border-indigo-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">{results.mode}</h3>
                    </div>
                    {results.resultDate ? (
                      <>
                        <p className="text-4xl font-bold mb-2">
                          {results.resultDate}
                        </p>
                        <p className="text-2xl text-indigo-100">
                          {results.dayOfWeek}
                        </p>
                      </>
                    ) : (
                      <p className="text-4xl font-bold">
                        {results.difference?.years} Years, {results.difference?.months} Months, {results.difference?.days} Days
                      </p>
                    )}
                  </div>
                </Card>

                {/* Additional Details */}
                {results.difference && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                      <CardTitle className="text-lg">
                        Difference in Various Units
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">
                            Total Days
                          </div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {results.difference.totalDays.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">
                            Total Weeks
                          </div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {results.difference.totalWeeks.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">
                            Total Hours
                          </div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {results.difference.totalHours.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Examples Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                    <CardTitle className="text-lg">Common Uses</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3 text-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-100 rounded-full p-2 mt-1">
                          <Plus className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Project Deadlines</div>
                          <div className="text-sm text-slate-600">
                            Calculate delivery dates by adding days to start
                            dates
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-100 rounded-full p-2 mt-1">
                          <Minus className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Historical Events</div>
                          <div className="text-sm text-slate-600">
                            Find dates in the past by subtracting time
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-indigo-100 rounded-full p-2 mt-1">
                          <ArrowRight className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Time Tracking</div>
                          <div className="text-sm text-slate-600">
                            Calculate duration between important dates
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Select a mode and enter your dates to get started
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">
                About Date Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Adding and Subtracting Dates
                </h3>
                <p>
                  When adding or subtracting time from dates, the calculator
                  accounts for varying month lengths, leap years, and other
                  calendar irregularities. For example, adding one month to
                  January 31st gives you February 28th (or 29th in leap years)
                  since February doesn't have 31 days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Calculating Date Differences
                </h3>
                <p>
                  The difference between two dates can be expressed in multiple
                  ways. The calculator provides both the breakdown (years,
                  months, days) and the total in single units (days, weeks,
                  hours). This is useful for different contexts - legal documents
                  might need exact years and months, while project planning might
                  need total days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Practical Applications
                </h3>
                <p>
                  Date calculators are invaluable for project management,
                  determining due dates, calculating age or tenure, planning
                  events, tracking warranty periods, calculating loan terms, and
                  many other real-world scenarios where precise date arithmetic
                  is needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Business vs Calendar Days
                </h3>
                <p>
                  Note that this calculator counts all calendar days, including
                  weekends and holidays. For business day calculations (Monday
                  through Friday only), you would need to account for these
                  separately based on your specific requirements and locale.
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
