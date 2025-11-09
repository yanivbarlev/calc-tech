"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Timer, TrendingUp, Activity } from "lucide-react";

interface PaceResults {
  paceMinPerMile: number;
  paceSecPerMile: number;
  paceMinPerKm: number;
  paceSecPerKm: number;
  speedMph: number;
  speedKmh: number;
  timeFor5k: string;
  timeFor10k: string;
  timeForHalfMarathon: string;
  timeForMarathon: string;
}

export default function PaceCalculator() {
  const [distance, setDistance] = useState<string>("5");
  const [distanceUnit, setDistanceUnit] = useState<string>("miles");
  const [hours, setHours] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("30");
  const [seconds, setSeconds] = useState<string>("0");

  const [results, setResults] = useState<PaceResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculatePace = () => {
    const dist = parseFloat(distance) || 0;
    const hrs = parseFloat(hours) || 0;
    const mins = parseFloat(minutes) || 0;
    const secs = parseFloat(seconds) || 0;

    // Convert everything to minutes
    const totalMinutes = hrs * 60 + mins + secs / 60;
    const totalSeconds = totalMinutes * 60;

    if (dist === 0 || totalMinutes === 0) {
      return;
    }

    // Convert distance to miles and km
    let distanceMiles = dist;
    let distanceKm = dist;

    if (distanceUnit === "miles") {
      distanceKm = dist * 1.60934;
    } else if (distanceUnit === "km") {
      distanceMiles = dist / 1.60934;
    } else if (distanceUnit === "meters") {
      distanceMiles = dist / 1609.34;
      distanceKm = dist / 1000;
    }

    // Calculate pace (min/mile and min/km)
    const paceMinutesPerMile = totalMinutes / distanceMiles;
    const paceMinutesPerKm = totalMinutes / distanceKm;

    const paceMinPerMile = Math.floor(paceMinutesPerMile);
    const paceSecPerMile = Math.round((paceMinutesPerMile - paceMinPerMile) * 60);

    const paceMinPerKm = Math.floor(paceMinutesPerKm);
    const paceSecPerKm = Math.round((paceMinutesPerKm - paceMinPerKm) * 60);

    // Calculate speed (mph and km/h)
    const speedMph = distanceMiles / (totalMinutes / 60);
    const speedKmh = distanceKm / (totalMinutes / 60);

    // Calculate race times
    const timeFor5k = formatTime((5 / distanceKm) * totalSeconds);
    const timeFor10k = formatTime((10 / distanceKm) * totalSeconds);
    const timeForHalfMarathon = formatTime((21.0975 / distanceKm) * totalSeconds);
    const timeForMarathon = formatTime((42.195 / distanceKm) * totalSeconds);

    setResults({
      paceMinPerMile,
      paceSecPerMile,
      paceMinPerKm,
      paceSecPerKm,
      speedMph,
      speedKmh,
      timeFor5k,
      timeFor10k,
      timeForHalfMarathon,
      timeForMarathon
    });

    setHasCalculated(true);
  };

  const formatTime = (totalSeconds: number): string => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculatePace();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-600 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Timer className="h-4 w-4" />
            Health & Fitness Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Pace Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your running or walking pace, speed, and predict race times for various distances
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Your Run/Walk
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Distance
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      step="0.01"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="5"
                    />
                    <select
                      value={distanceUnit}
                      onChange={(e) => setDistanceUnit(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="miles">Miles</option>
                      <option value="km">Kilometers</option>
                      <option value="meters">Meters</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="0"
                      />
                      <p className="text-xs text-slate-500 mt-1">Hours</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="30"
                      />
                      <p className="text-xs text-slate-500 mt-1">Minutes</p>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="0"
                      />
                      <p className="text-xs text-slate-500 mt-1">Seconds</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculatePace}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Pace
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-slate-700 mb-3 text-sm">Quick Distances</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDistance("5");
                        setDistanceUnit("km");
                      }}
                      className="text-xs"
                    >
                      5K
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDistance("10");
                        setDistanceUnit("km");
                      }}
                      className="text-xs"
                    >
                      10K
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDistance("21.0975");
                        setDistanceUnit("km");
                      }}
                      className="text-xs"
                    >
                      Half Marathon
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDistance("42.195");
                        setDistanceUnit("km");
                      }}
                      className="text-xs"
                    >
                      Marathon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Pace Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="h-6 w-6" />
                        <h3 className="text-lg font-semibold">Pace per Mile</h3>
                      </div>
                      <p className="text-5xl font-bold">
                        {results.paceMinPerMile}:{results.paceSecPerMile.toString().padStart(2, '0')}
                      </p>
                      <p className="text-green-100 text-sm mt-1">min/mile</p>
                    </div>
                  </Card>

                  <Card className="border-2 border-teal-200 rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="h-6 w-6" />
                        <h3 className="text-lg font-semibold">Pace per Kilometer</h3>
                      </div>
                      <p className="text-5xl font-bold">
                        {results.paceMinPerKm}:{results.paceSecPerKm.toString().padStart(2, '0')}
                      </p>
                      <p className="text-teal-100 text-sm mt-1">min/km</p>
                    </div>
                  </Card>
                </div>

                {/* Speed */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Miles per Hour (mph)</span>
                      <span className="font-semibold text-2xl text-slate-800">{results.speedMph.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-slate-600 font-medium">Kilometers per Hour (km/h)</span>
                      <span className="font-semibold text-2xl text-slate-800">{results.speedKmh.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Race Time Predictions */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      Race Time Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <p className="text-sm text-slate-600 mb-4">
                      Estimated finish times at this pace:
                    </p>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">5K (3.1 miles)</div>
                        <div className="text-xs text-slate-500">5 kilometers</div>
                      </div>
                      <span className="font-semibold text-lg">{results.timeFor5k}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">10K (6.2 miles)</div>
                        <div className="text-xs text-slate-500">10 kilometers</div>
                      </div>
                      <span className="font-semibold text-lg">{results.timeFor10k}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <div>
                        <div className="font-medium text-slate-700">Half Marathon</div>
                        <div className="text-xs text-slate-500">13.1 miles / 21.1 km</div>
                      </div>
                      <span className="font-semibold text-lg">{results.timeForHalfMarathon}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <div>
                        <div className="font-medium text-slate-700">Marathon</div>
                        <div className="text-xs text-slate-500">26.2 miles / 42.2 km</div>
                      </div>
                      <span className="font-semibold text-lg">{results.timeForMarathon}</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Timer className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Run Details
                </h3>
                <p className="text-slate-500">
                  Fill in the distance and time to calculate your pace and speed
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Pace</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Running Pace?</h3>
                <p>
                  Pace is the time it takes to cover a specific distance, typically measured as minutes per mile or minutes per kilometer. Unlike speed (which tells you how fast you're going), pace tells you how long it will take to complete your run. Most runners find pace more intuitive for planning their training and races.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using This Calculator</h3>
                <p>
                  Enter the distance you ran and the time it took you to complete it. The calculator will show you your pace per mile and per kilometer, your speed in mph and km/h, and predict your finish times for common race distances. These predictions assume you can maintain the same pace for longer distances.
                </p>
                <p className="mt-3">
                  Keep in mind that maintaining pace becomes more challenging over longer distances. Your 5K pace will typically be faster than your marathon pace. Use these predictions as general guidelines for setting goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Training Zones</h3>
                <p>
                  Different training paces serve different purposes. Easy runs should feel comfortable and conversational. Tempo runs are comfortably hard, at about your 10K race pace. Interval training involves short bursts at faster paces with recovery periods. Understanding your pace helps you train at the right intensity for your goals.
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
            <Link href="/about" className="hover:text-green-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/sitemap" className="hover:text-green-600 transition-colors font-medium">
              Sitemap
            </Link>
            <Link href="/terms" className="hover:text-green-600 transition-colors font-medium">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-green-600 transition-colors font-medium">
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
