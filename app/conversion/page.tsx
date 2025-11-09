"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  ArrowRight,
  Ruler,
  Weight,
  Thermometer,
  Zap,
} from "lucide-react";

type Category = "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "time" | "data";

interface ConversionUnit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

interface ConversionResults {
  from: string;
  to: string;
  value: number;
  result: number;
  formula: string;
}

export default function ConversionCalculator() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("meters");
  const [toUnit, setToUnit] = useState<string>("feet");
  const [results, setResults] = useState<ConversionResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const conversions: Record<Category, Record<string, ConversionUnit>> = {
    length: {
      meters: { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
      kilometers: { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      centimeters: { name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      millimeters: { name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      miles: { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      yards: { name: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      feet: { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      inches: { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    },
    weight: {
      kilograms: { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
      grams: { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      milligrams: { name: "Milligrams", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      pounds: { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      ounces: { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      tons: { name: "Metric Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
    temperature: {
      celsius: {
        name: "Celsius",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      fahrenheit: {
        name: "Fahrenheit",
        toBase: (v) => (v - 32) * 5/9,
        fromBase: (v) => v * 9/5 + 32,
      },
      kelvin: {
        name: "Kelvin",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    },
    area: {
      squareMeters: { name: "Square Meters", toBase: (v) => v, fromBase: (v) => v },
      squareKilometers: { name: "Square Kilometers", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      squareFeet: { name: "Square Feet", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      squareYards: { name: "Square Yards", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      acres: { name: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      hectares: { name: "Hectares", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    },
    volume: {
      liters: { name: "Liters", toBase: (v) => v, fromBase: (v) => v },
      milliliters: { name: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      gallons: { name: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      quarts: { name: "Quarts (US)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      pints: { name: "Pints (US)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      cups: { name: "Cups (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      cubicMeters: { name: "Cubic Meters", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
    speed: {
      metersPerSecond: { name: "Meters/Second", toBase: (v) => v, fromBase: (v) => v },
      kilometersPerHour: { name: "Kilometers/Hour", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      milesPerHour: { name: "Miles/Hour", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      knots: { name: "Knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    },
    time: {
      seconds: { name: "Seconds", toBase: (v) => v, fromBase: (v) => v },
      minutes: { name: "Minutes", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      hours: { name: "Hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      days: { name: "Days", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      weeks: { name: "Weeks", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      months: { name: "Months (30 days)", toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
      years: { name: "Years (365 days)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    },
    data: {
      bytes: { name: "Bytes", toBase: (v) => v, fromBase: (v) => v },
      kilobytes: { name: "Kilobytes (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      megabytes: { name: "Megabytes (MB)", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      gigabytes: { name: "Gigabytes (GB)", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      terabytes: { name: "Terabytes (TB)", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
    },
  };

  const convert = () => {
    const inputValue = parseFloat(value) || 0;
    const units = conversions[category];

    if (!units[fromUnit] || !units[toUnit]) return;

    const baseValue = units[fromUnit].toBase(inputValue);
    const result = units[toUnit].fromBase(baseValue);

    let formula = "";
    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        formula = `(${inputValue} × 9/5) + 32 = ${result.toFixed(2)}`;
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        formula = `(${inputValue} - 32) × 5/9 = ${result.toFixed(2)}`;
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        formula = `${inputValue} + 273.15 = ${result.toFixed(2)}`;
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        formula = `${inputValue} - 273.15 = ${result.toFixed(2)}`;
      } else {
        formula = `Conversion: ${inputValue} → ${result.toFixed(6)}`;
      }
    } else {
      const ratio = (result / inputValue).toFixed(6);
      formula = `${inputValue} × ${ratio} = ${result.toFixed(6)}`;
    }

    setResults({
      from: units[fromUnit].name,
      to: units[toUnit].name,
      value: inputValue,
      result,
      formula,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    const units = Object.keys(conversions[category]);
    if (!units.includes(fromUnit)) setFromUnit(units[0]);
    if (!units.includes(toUnit)) setToUnit(units[1] || units[0]);
  }, [category]);

  useEffect(() => {
    if (!hasCalculated) {
      convert();
    }
  }, []);

  const categoryIcons: Record<Category, any> = {
    length: Ruler,
    weight: Weight,
    temperature: Thermometer,
    area: Ruler,
    volume: Zap,
    speed: ArrowRight,
    time: Calculator,
    data: Zap,
  };

  const CategoryIcon = categoryIcons[category];

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
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Ruler className="h-4 w-4" />
            Conversion Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Unit Converter
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert between different units of measurement instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b">
              <CardTitle className="text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(conversions) as Category[]).map((cat) => {
                  const Icon = categoryIcons[cat];
                  return (
                    <Button
                      key={cat}
                      type="button"
                      variant={category === cat ? "default" : "outline"}
                      onClick={() => setCategory(cat)}
                      className={`${
                        category === cat
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                          : ""
                      } justify-start gap-2 capitalize`}
                    >
                      <Icon className="h-4 w-4" />
                      {cat}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <CategoryIcon className="h-6 w-6" />
                Convert {category.charAt(0).toUpperCase() + category.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Value
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    From
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-lg"
                  >
                    {Object.entries(conversions[category]).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    To
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-lg"
                  >
                    {Object.entries(conversions[category]).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={convert}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
              >
                Convert
              </Button>
            </CardContent>
          </Card>

          {results && (
            <>
              <Card className="border-2 border-violet-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm opacity-80 mb-1">From</div>
                      <div className="text-3xl font-bold">{results.value}</div>
                      <div className="text-lg opacity-90">{results.from}</div>
                    </div>
                    <ArrowRight className="h-8 w-8" />
                    <div className="text-center">
                      <div className="text-sm opacity-80 mb-1">To</div>
                      <div className="text-3xl font-bold">
                        {results.result.toFixed(6)}
                      </div>
                      <div className="text-lg opacity-90">{results.to}</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-2 rounded-2xl shadow-lg">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b">
                  <CardTitle className="text-lg">Calculation</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-slate-50 rounded-xl p-6 font-mono text-center">
                    {results.formula}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl shadow-lg">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b">
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {category === "length" && (
                      <>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 meter</div>
                          <div className="text-slate-600">= 3.28084 feet</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 kilometer</div>
                          <div className="text-slate-600">= 0.621371 miles</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 inch</div>
                          <div className="text-slate-600">= 2.54 centimeters</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 yard</div>
                          <div className="text-slate-600">= 0.9144 meters</div>
                        </div>
                      </>
                    )}
                    {category === "weight" && (
                      <>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 kilogram</div>
                          <div className="text-slate-600">= 2.20462 pounds</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 pound</div>
                          <div className="text-slate-600">= 16 ounces</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 ton</div>
                          <div className="text-slate-600">= 1000 kilograms</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">1 ounce</div>
                          <div className="text-slate-600">= 28.3495 grams</div>
                        </div>
                      </>
                    )}
                    {category === "temperature" && (
                      <>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">0°C</div>
                          <div className="text-slate-600">= 32°F = 273.15K</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">100°C</div>
                          <div className="text-slate-600">= 212°F = 373.15K</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">Body Temp</div>
                          <div className="text-slate-600">37°C = 98.6°F</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="font-semibold">Room Temp</div>
                          <div className="text-slate-600">20°C = 68°F</div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">About Unit Conversion</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Metric vs Imperial Systems
                </h3>
                <p>
                  The metric system (meters, liters, grams) is used by most
                  countries worldwide and is based on powers of 10, making
                  conversions straightforward. The imperial system (feet, gallons,
                  pounds) is primarily used in the United States and has more
                  complex conversion factors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Temperature Scales
                </h3>
                <p>
                  Celsius is based on water's freezing (0°C) and boiling (100°C)
                  points. Fahrenheit uses 32°F for freezing and 212°F for boiling.
                  Kelvin is the scientific standard, starting at absolute zero
                  (-273.15°C). Unlike other conversions, temperature requires
                  different formulas, not just multiplication.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Precision and Rounding
                </h3>
                <p>
                  Conversions often result in decimals. For practical purposes,
                  rounding to 2-3 decimal places is usually sufficient. In scientific
                  or engineering contexts, more precision may be needed. This
                  calculator shows up to 6 decimal places for accuracy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Common Use Cases
                </h3>
                <p>
                  Unit conversions are essential for cooking (recipes from different
                  countries), travel (understanding distances and temperatures),
                  science and engineering (standard units), construction (mixing
                  measurement systems), and online shopping (comparing products
                  listed in different units).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

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
