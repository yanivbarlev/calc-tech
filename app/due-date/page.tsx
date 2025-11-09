"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Baby, Calendar, Clock } from "lucide-react";

interface DueDateResults {
  dueDate: Date;
  conceptionDate: Date;
  currentWeek: number;
  currentDay: number;
  firstTrimesterEnd: Date;
  secondTrimesterEnd: Date;
  thirdTrimesterEnd: Date;
  daysRemaining: number;
  weeksRemaining: number;
}

interface Milestone {
  week: number;
  title: string;
  description: string;
  passed: boolean;
}

export default function DueDateCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<string>("lmp");
  const [lastPeriodDate, setLastPeriodDate] = useState<string>("");
  const [conceptionDate, setConceptionDate] = useState<string>("");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("");
  const [gestationalAge, setGestationalAge] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<string>("28");

  const [results, setResults] = useState<DueDateResults | null>(null);

  const calculateDueDate = () => {
    let dueDate = new Date();
    let conceptionDate = new Date();
    let lmpDate = new Date();

    if (calculationMethod === "lmp" && lastPeriodDate) {
      lmpDate = new Date(lastPeriodDate);
      const cycle = parseInt(cycleLength) || 28;
      const ovulationDay = cycle - 14; // Ovulation is typically 14 days before next period

      // Due date using Naegele's rule: LMP + 280 days
      dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      // Conception date
      conceptionDate = new Date(lmpDate.getTime() + ovulationDay * 24 * 60 * 60 * 1000);
    } else if (calculationMethod === "conception" && conceptionDate) {
      conceptionDate = new Date(conceptionDate);
      // Due date is 266 days after conception
      dueDate = new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000);
      // Calculate LMP (14 days before conception)
      lmpDate = new Date(conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    } else if (calculationMethod === "ultrasound" && ultrasoundDate && gestationalAge) {
      const ultrasound = new Date(ultrasoundDate);
      const weeksAtUltrasound = parseInt(gestationalAge);
      // Calculate LMP from ultrasound data
      lmpDate = new Date(ultrasound.getTime() - weeksAtUltrasound * 7 * 24 * 60 * 60 * 1000);
      dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      conceptionDate = new Date(lmpDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    } else {
      return;
    }

    // Calculate trimester end dates
    const firstTrimesterEnd = new Date(lmpDate.getTime() + 13 * 7 * 24 * 60 * 60 * 1000);
    const secondTrimesterEnd = new Date(lmpDate.getTime() + 27 * 7 * 24 * 60 * 60 * 1000);
    const thirdTrimesterEnd = dueDate;

    // Calculate current gestational age
    const today = new Date();
    const daysSinceLMP = Math.floor((today.getTime() - lmpDate.getTime()) / (24 * 60 * 60 * 1000));
    const currentWeek = Math.floor(daysSinceLMP / 7);
    const currentDay = daysSinceLMP % 7;

    // Calculate days remaining
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    const weeksRemaining = Math.floor(daysRemaining / 7);

    setResults({
      dueDate,
      conceptionDate,
      currentWeek,
      currentDay,
      firstTrimesterEnd,
      secondTrimesterEnd,
      thirdTrimesterEnd,
      daysRemaining,
      weeksRemaining
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

  const getMilestones = (): Milestone[] => {
    if (!results) return [];

    const currentWeek = results.currentWeek;

    return [
      { week: 4, title: "Pregnancy Test", description: "Pregnancy can be detected", passed: currentWeek >= 4 },
      { week: 8, title: "First Heartbeat", description: "Baby's heartbeat can be detected", passed: currentWeek >= 8 },
      { week: 12, title: "End of First Trimester", description: "Risk of miscarriage decreases", passed: currentWeek >= 12 },
      { week: 20, title: "Halfway Point", description: "Anatomy scan typically performed", passed: currentWeek >= 20 },
      { week: 24, title: "Viability", description: "Baby could survive with medical help", passed: currentWeek >= 24 },
      { week: 28, title: "Third Trimester", description: "Final stretch begins", passed: currentWeek >= 28 },
      { week: 37, title: "Full Term", description: "Baby is considered full term", passed: currentWeek >= 37 },
      { week: 40, title: "Due Date", description: "Estimated delivery date", passed: currentWeek >= 40 }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-rose-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-600 to-rose-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent">
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
            <Baby className="h-4 w-4" />
            Pregnancy Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Due Date Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your pregnancy due date and track important milestones throughout your pregnancy
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-rose-600 text-white rounded-t-2xl">
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="lmp">Last Menstrual Period</option>
                    <option value="conception">Conception Date</option>
                    <option value="ultrasound">Ultrasound Date</option>
                  </select>
                </div>

                {calculationMethod === "lmp" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Day of Last Period
                      </label>
                      <Input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Average Cycle Length (days)
                      </label>
                      <Input
                        type="number"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                        placeholder="28"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Most women have 28-day cycles
                      </p>
                    </div>
                  </>
                )}

                {calculationMethod === "conception" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Conception Date
                    </label>
                    <Input
                      type="date"
                      value={conceptionDate}
                      onChange={(e) => setConceptionDate(e.target.value)}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      If you know when conception occurred
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
                    </div>
                  </>
                )}

                <Button
                  onClick={calculateDueDate}
                  className="w-full bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Due Date
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Due Date Card */}
                <Card className="border-2 border-purple-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-rose-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Baby className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Your Due Date</h3>
                    </div>
                    <p className="text-4xl font-bold mb-2">{formatDate(results.dueDate)}</p>
                    {results.daysRemaining > 0 ? (
                      <p className="text-purple-100">
                        {results.weeksRemaining} weeks and {results.daysRemaining % 7} days remaining ({results.daysRemaining} days)
                      </p>
                    ) : (
                      <p className="text-purple-100">
                        Past due date
                      </p>
                    )}
                  </div>
                </Card>

                {/* Current Week */}
                {results.currentWeek >= 0 && results.currentWeek <= 42 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-rose-50 border-b">
                      <CardTitle className="text-lg">You Are Currently</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <p className="text-6xl font-bold text-purple-600 mb-2">
                          {results.currentWeek}
                        </p>
                        <p className="text-2xl text-slate-700 mb-1">
                          Weeks {results.currentDay > 0 && `+ ${results.currentDay} days`}
                        </p>
                        <p className="text-slate-600">Pregnant</p>
                      </div>

                      {/* Trimester Progress */}
                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">
                            {results.currentWeek <= 13 ? "First Trimester" :
                             results.currentWeek <= 27 ? "Second Trimester" :
                             "Third Trimester"}
                          </span>
                          <span className="text-slate-600">
                            {Math.min(100, Math.round((results.currentWeek / 40) * 100))}% Complete
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-rose-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (results.currentWeek / 40) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Trimester Dates */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      Trimester Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">First Trimester Ends</div>
                        <div className="text-xs text-slate-500">Week 13</div>
                      </div>
                      <span className="font-semibold">{formatShortDate(results.firstTrimesterEnd)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Second Trimester Ends</div>
                        <div className="text-xs text-slate-500">Week 27</div>
                      </div>
                      <span className="font-semibold">{formatShortDate(results.secondTrimesterEnd)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <div>
                        <div className="font-medium text-slate-700">Third Trimester Ends</div>
                        <div className="text-xs text-slate-500">Week 40 (Due Date)</div>
                      </div>
                      <span className="font-semibold">{formatShortDate(results.thirdTrimesterEnd)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Pregnancy Milestones */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Pregnancy Milestones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {getMilestones().map((milestone, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          milestone.passed ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          milestone.passed ? 'bg-green-500' : 'bg-slate-300'
                        }`}>
                          {milestone.passed && (
                            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-slate-800">{milestone.title}</p>
                              <p className="text-sm text-slate-600">{milestone.description}</p>
                            </div>
                            <span className="text-sm font-medium text-slate-500">Week {milestone.week}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Important Note */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg">
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Important Reminder</h4>
                      <p className="text-sm text-slate-700">
                        Due dates are estimates. Only about 5% of babies are born on their exact due date. Most babies arrive within two weeks before or after. Your healthcare provider will monitor your pregnancy and provide the most accurate guidance for your specific situation.
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
                  Fill in the form and click "Calculate Due Date" to see your pregnancy timeline
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-rose-50 border-b">
              <CardTitle className="text-2xl">Understanding Your Due Date</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Due Dates Are Calculated</h3>
                <p>
                  The most common method for calculating your due date is Naegele's Rule, which adds 280 days (40 weeks) to the first day of your last menstrual period. This assumes a 28-day menstrual cycle with ovulation occurring on day 14. If your cycle is longer or shorter, the calculator adjusts for this.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Three Trimesters</h3>
                <p>
                  Pregnancy is divided into three trimesters, each lasting about three months. The first trimester (weeks 1-13) is a time of rapid development. The second trimester (weeks 14-27) is often called the "golden period" when many women feel their best. The third trimester (weeks 28-40) is when the baby gains most of their weight and prepares for birth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When Will You Actually Deliver?</h3>
                <p>
                  Despite what the name suggests, your "due date" is really more of a "due month." Studies show that only about 5% of babies are born on their exact due date. Most babies arrive within two weeks before or after the estimated due date. First-time mothers are slightly more likely to deliver after their due date, while women who have given birth before may deliver a bit earlier.
                </p>
                <p className="mt-3">
                  Your healthcare provider will use early ultrasounds to refine your due date, as measurements taken in the first trimester are the most accurate way to date a pregnancy. They'll continue to monitor your baby's growth throughout pregnancy to ensure everything is progressing normally.
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
            <Link href="/about" className="hover:text-purple-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-purple-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-purple-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-purple-600 transition-colors font-medium">
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
