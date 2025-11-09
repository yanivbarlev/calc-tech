"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Clock, Briefcase, DollarSign } from "lucide-react";

interface TimeEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
}

interface HoursResults {
  totalHours: number;
  totalMinutes: number;
  regularHours: number;
  overtimeHours: number;
  earnings: number;
  overtimeEarnings: number;
  totalEarnings: number;
  entries: Array<{
    date: string;
    hours: number;
    minutes: number;
  }>;
}

export default function HoursCalculator() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "17:00",
      breakMinutes: "30",
    },
  ]);

  const [hourlyRate, setHourlyRate] = useState<string>("25");
  const [regularHoursPerWeek, setRegularHoursPerWeek] = useState<string>("40");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<string>("1.5");

  const [results, setResults] = useState<HoursResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "17:00",
        breakMinutes: "30",
      },
    ]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const calculateHours = () => {
    let totalMinutes = 0;
    const calculatedEntries: Array<{ date: string; hours: number; minutes: number }> = [];

    entries.forEach((entry) => {
      if (!entry.startTime || !entry.endTime) return;

      const [startHour, startMin] = entry.startTime.split(":").map(Number);
      const [endHour, endMin] = entry.endTime.split(":").map(Number);

      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const breakMins = parseInt(entry.breakMinutes) || 0;

      let workedMinutes = endMinutes - startMinutes - breakMins;
      if (workedMinutes < 0) {
        workedMinutes += 24 * 60; // Handle overnight shifts
      }

      totalMinutes += workedMinutes;
      calculatedEntries.push({
        date: entry.date,
        hours: Math.floor(workedMinutes / 60),
        minutes: workedMinutes % 60,
      });
    });

    const totalHours = totalMinutes / 60;
    const regularLimit = parseFloat(regularHoursPerWeek) || 40;
    const rate = parseFloat(hourlyRate) || 0;
    const otMultiplier = parseFloat(overtimeMultiplier) || 1.5;

    const regularHours = Math.min(totalHours, regularLimit);
    const overtimeHours = Math.max(0, totalHours - regularLimit);

    const earnings = regularHours * rate;
    const overtimeEarnings = overtimeHours * rate * otMultiplier;
    const totalEarnings = earnings + overtimeEarnings;

    setResults({
      totalHours,
      totalMinutes,
      regularHours,
      overtimeHours,
      earnings,
      overtimeEarnings,
      totalEarnings,
      entries: calculatedEntries,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateHours();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Briefcase className="h-4 w-4" />
            Work & Productivity Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Hours Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate hours worked, track time entries, and compute earnings with overtime
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Timesheet Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Hourly Rate ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="25.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Regular Hours Per Week
                  </label>
                  <Input
                    type="number"
                    value={regularHoursPerWeek}
                    onChange={(e) => setRegularHoursPerWeek(e.target.value)}
                    placeholder="40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Overtime Multiplier
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={overtimeMultiplier}
                    onChange={(e) => setOvertimeMultiplier(e.target.value)}
                    placeholder="1.5"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Typically 1.5x for overtime
                  </p>
                </div>

                <Button
                  onClick={calculateHours}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Hours
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    Time Entries
                  </CardTitle>
                  <Button onClick={addEntry} size="sm" variant="outline">
                    Add Entry
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {entries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="bg-slate-50 p-4 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">
                          Entry {index + 1}
                        </span>
                        {entries.length > 1 && (
                          <Button
                            onClick={() => removeEntry(entry.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Date
                          </label>
                          <Input
                            type="date"
                            value={entry.date}
                            onChange={(e) =>
                              updateEntry(entry.id, "date", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Start Time
                          </label>
                          <Input
                            type="time"
                            value={entry.startTime}
                            onChange={(e) =>
                              updateEntry(entry.id, "startTime", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            End Time
                          </label>
                          <Input
                            type="time"
                            value={entry.endTime}
                            onChange={(e) =>
                              updateEntry(entry.id, "endTime", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Break (min)
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={entry.breakMinutes}
                            onChange={(e) =>
                              updateEntry(entry.id, "breakMinutes", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {results && (
              <>
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Total Earnings</h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">
                      ${results.totalEarnings.toFixed(2)}
                    </p>
                    <p className="text-2xl text-emerald-100">
                      {results.totalHours.toFixed(2)} hours worked
                    </p>
                  </div>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg">Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Regular Hours
                        </div>
                        <div className="text-2xl font-bold text-emerald-700">
                          {results.regularHours.toFixed(2)}
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          ${results.earnings.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Overtime Hours
                        </div>
                        <div className="text-2xl font-bold text-amber-700">
                          {results.overtimeHours.toFixed(2)}
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          ${results.overtimeEarnings.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg">Daily Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {results.entries.map((entry, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-slate-50 p-3 rounded-lg"
                        >
                          <span className="font-medium text-slate-700">
                            {new Date(entry.date + "T00:00").toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="font-bold text-emerald-700">
                            {entry.hours}h {entry.minutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">About Hours Calculator</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Timesheet Calculations
                </h3>
                <p>
                  This calculator helps you track work hours, calculate total time worked,
                  and compute earnings including overtime pay. It's perfect for freelancers,
                  contractors, employees verifying their paychecks, or employers calculating
                  payroll.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Overtime Rules
                </h3>
                <p>
                  In the United States, the Fair Labor Standards Act (FLSA) requires that
                  non-exempt employees receive overtime pay at a rate of 1.5 times their
                  regular rate for hours worked beyond 40 in a workweek. Some states have
                  additional overtime laws. Always check your local regulations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Break Time
                </h3>
                <p>
                  The calculator accounts for break time, which is typically unpaid. Federal
                  law doesn't require lunch or coffee breaks, but when breaks are given, short
                  breaks (5-20 minutes) are usually paid, while meal breaks (30+ minutes) are
                  typically unpaid.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

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
