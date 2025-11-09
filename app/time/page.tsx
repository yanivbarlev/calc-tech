"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  Clock,
  Plus,
  Minus,
  RefreshCw,
} from "lucide-react";

interface TimeResults {
  mode: string;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  formatted: string;
}

export default function TimeCalculator() {
  const [mode, setMode] = useState<"add" | "subtract" | "convert">("add");

  // Time 1
  const [hours1, setHours1] = useState<string>("2");
  const [minutes1, setMinutes1] = useState<string>("30");
  const [seconds1, setSeconds1] = useState<string>("0");

  // Time 2
  const [hours2, setHours2] = useState<string>("1");
  const [minutes2, setMinutes2] = useState<string>("45");
  const [seconds2, setSeconds2] = useState<string>("30");

  // Convert mode
  const [convertValue, setConvertValue] = useState<string>("120");
  const [convertFrom, setConvertFrom] = useState<string>("minutes");

  const [results, setResults] = useState<TimeResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateTime = () => {
    let totalSeconds = 0;
    let modeText = "";

    if (mode === "convert") {
      const value = parseFloat(convertValue) || 0;
      switch (convertFrom) {
        case "seconds":
          totalSeconds = value;
          break;
        case "minutes":
          totalSeconds = value * 60;
          break;
        case "hours":
          totalSeconds = value * 3600;
          break;
        case "days":
          totalSeconds = value * 86400;
          break;
      }
      modeText = "Time Conversion";
    } else {
      // Convert both times to seconds
      const time1InSeconds =
        (parseInt(hours1) || 0) * 3600 +
        (parseInt(minutes1) || 0) * 60 +
        (parseInt(seconds1) || 0);

      const time2InSeconds =
        (parseInt(hours2) || 0) * 3600 +
        (parseInt(minutes2) || 0) * 60 +
        (parseInt(seconds2) || 0);

      if (mode === "add") {
        totalSeconds = time1InSeconds + time2InSeconds;
        modeText = "Time Addition";
      } else {
        totalSeconds = time1InSeconds - time2InSeconds;
        modeText = "Time Subtraction";
      }

      // Handle negative results
      if (totalSeconds < 0) {
        totalSeconds = Math.abs(totalSeconds);
      }
    }

    // Convert back to hours, minutes, seconds
    const hours = Math.floor(totalSeconds / 3600);
    const remainingAfterHours = totalSeconds % 3600;
    const minutes = Math.floor(remainingAfterHours / 60);
    const seconds = Math.floor(remainingAfterHours % 60);

    const totalMinutes = totalSeconds / 60;
    const totalHours = totalSeconds / 3600;

    // Format as HH:MM:SS
    const formatted = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    setResults({
      mode: modeText,
      hours,
      minutes,
      seconds,
      totalSeconds,
      totalMinutes,
      totalHours,
      formatted,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateTime();
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
          ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
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
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="h-4 w-4" />
            Date & Time Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Time Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Add, subtract, and convert time units with precision
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Time Calculation
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
                      value="convert"
                      label="Convert Units"
                      icon={RefreshCw}
                    />
                  </div>
                </div>

                {/* Conditional Inputs */}
                <div className="border-t pt-6">
                  {mode === "convert" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Value to Convert
                        </label>
                        <Input
                          type="number"
                          value={convertValue}
                          onChange={(e) => setConvertValue(e.target.value)}
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          From Unit
                        </label>
                        <select
                          value={convertFrom}
                          onChange={(e) => setConvertFrom(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="seconds">Seconds</option>
                          <option value="minutes">Minutes</option>
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Time 1
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Input
                              type="number"
                              min="0"
                              value={hours1}
                              onChange={(e) => setHours1(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Hours
                            </p>
                          </div>
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={minutes1}
                              onChange={(e) => setMinutes1(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Minutes
                            </p>
                          </div>
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={seconds1}
                              onChange={(e) => setSeconds1(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Seconds
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Time 2
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Input
                              type="number"
                              min="0"
                              value={hours2}
                              onChange={(e) => setHours2(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Hours
                            </p>
                          </div>
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={minutes2}
                              onChange={(e) => setMinutes2(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Minutes
                            </p>
                          </div>
                          <div>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={seconds2}
                              onChange={(e) => setSeconds2(e.target.value)}
                              placeholder="0"
                            />
                            <p className="text-xs text-slate-500 mt-1 text-center">
                              Seconds
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={calculateTime}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
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
                <Card className="border-2 border-cyan-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">{results.mode}</h3>
                    </div>
                    <p className="text-6xl font-bold mb-3">
                      {results.formatted}
                    </p>
                    <p className="text-2xl text-cyan-100">
                      {results.hours}h {results.minutes}m {results.seconds}s
                    </p>
                  </div>
                </Card>

                {/* Breakdown Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">
                      Time in Different Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Hours
                        </div>
                        <div className="text-2xl font-bold text-cyan-700">
                          {results.totalHours.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Minutes
                        </div>
                        <div className="text-2xl font-bold text-cyan-700">
                          {results.totalMinutes.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Seconds
                        </div>
                        <div className="text-2xl font-bold text-cyan-700">
                          {results.totalSeconds.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Reference Card */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">
                      Time Unit Conversions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold text-slate-800">
                          1 Minute
                        </div>
                        <div className="text-slate-600">= 60 Seconds</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold text-slate-800">
                          1 Hour
                        </div>
                        <div className="text-slate-600">
                          = 60 Minutes = 3,600 Seconds
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold text-slate-800">1 Day</div>
                        <div className="text-slate-600">
                          = 24 Hours = 1,440 Minutes
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold text-slate-800">
                          1 Week
                        </div>
                        <div className="text-slate-600">
                          = 7 Days = 168 Hours
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Clock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Select a mode and enter time values to get started
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">
                About Time Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Time Arithmetic
                </h3>
                <p>
                  Time calculations are essential in many aspects of daily life,
                  from tracking work hours to planning projects. Unlike decimal
                  numbers, time uses a base-60 system (sexagesimal) where 60
                  seconds make a minute and 60 minutes make an hour. This
                  calculator handles all the conversions automatically.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Common Applications
                </h3>
                <p>
                  Time calculators are used for timesheet calculations, project
                  time tracking, cooking and baking recipes, exercise duration
                  tracking, travel time planning, meeting duration calculations,
                  and many other practical purposes where precise time
                  measurements matter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Time Zones and Daylight Saving
                </h3>
                <p>
                  Note that this calculator performs pure time arithmetic and
                  doesn't account for time zone differences or daylight saving
                  time changes. For calculations involving specific dates and
                  time zones, you may need additional considerations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Decimal Hours
                </h3>
                <p>
                  In some contexts, especially payroll and billing, time is
                  expressed as decimal hours (e.g., 2.5 hours instead of 2 hours
                  30 minutes). This calculator shows both formats, making it easy
                  to convert between standard time notation and decimal hours for
                  different purposes.
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
