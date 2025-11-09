"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  Boxes,
  Ruler,
  Package,
} from "lucide-react";

interface ConcreteResults {
  cubicYards: number;
  cubicFeet: number;
  cubicMeters: number;
  bags80lb: number;
  bags60lb: number;
  bags40lb: number;
  estimatedCost: {
    readyMix: number;
    bags80lb: number;
    bags60lb: number;
  };
}

export default function ConcreteCalculator() {
  const [shape, setShape] = useState<"slab" | "footing" | "column" | "stairs">("slab");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");

  // Slab dimensions
  const [length, setLength] = useState<string>("20");
  const [width, setWidth] = useState<string>("10");
  const [thickness, setThickness] = useState<string>("4");

  // Column dimensions
  const [diameter, setDiameter] = useState<string>("12");
  const [height, setHeight] = useState<string>("8");

  // Stairs
  const [steps, setSteps] = useState<string>("10");
  const [stepWidth, setStepWidth] = useState<string>("36");
  const [stepHeight, setStepHeight] = useState<string>("7");
  const [stepDepth, setStepDepth] = useState<string>("11");

  // Pricing
  const [readyMixPrice, setReadyMixPrice] = useState<string>("125");
  const [bag80lbPrice, setBag80lbPrice] = useState<string>("5");
  const [bag60lbPrice, setBag60lbPrice] = useState<string>("4");

  const [wasteFactor, setWasteFactor] = useState<string>("10");

  const [results, setResults] = useState<ConcreteResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateConcrete = () => {
    let volumeCubicFeet = 0;

    const len = parseFloat(length) || 0;
    const wid = parseFloat(width) || 0;
    const thick = parseFloat(thickness) || 0;
    const dia = parseFloat(diameter) || 0;
    const h = parseFloat(height) || 0;
    const numSteps = parseFloat(steps) || 0;
    const sWidth = parseFloat(stepWidth) || 0;
    const sHeight = parseFloat(stepHeight) || 0;
    const sDepth = parseFloat(stepDepth) || 0;

    switch (shape) {
      case "slab":
      case "footing":
        if (unit === "feet") {
          volumeCubicFeet = len * wid * (thick / 12); // thickness in inches to feet
        } else {
          // Convert meters to feet
          const lengthFt = len * 3.28084;
          const widthFt = wid * 3.28084;
          const thickFt = thick * 3.28084;
          volumeCubicFeet = lengthFt * widthFt * thickFt;
        }
        break;

      case "column":
        if (unit === "feet") {
          const radiusFt = dia / 12 / 2; // diameter in inches to feet radius
          volumeCubicFeet = Math.PI * radiusFt * radiusFt * h;
        } else {
          const lengthFt = dia * 3.28084;
          const heightFt = h * 3.28084;
          const radiusFt = lengthFt / 2;
          volumeCubicFeet = Math.PI * radiusFt * radiusFt * heightFt;
        }
        break;

      case "stairs":
        if (unit === "feet") {
          // Each step is a rectangular prism
          const stepVolume = (sWidth / 12) * (sDepth / 12) * (sHeight / 12);
          // Total volume = sum of all steps (triangular accumulation)
          volumeCubicFeet = (stepVolume * numSteps * (numSteps + 1)) / 2;
        } else {
          const widthFt = sWidth * 3.28084;
          const depthFt = sDepth * 3.28084;
          const heightFt = sHeight * 3.28084;
          const stepVolume = widthFt * depthFt * heightFt;
          volumeCubicFeet = (stepVolume * numSteps * (numSteps + 1)) / 2;
        }
        break;
    }

    // Add waste factor
    const waste = parseFloat(wasteFactor) || 0;
    volumeCubicFeet = volumeCubicFeet * (1 + waste / 100);

    const cubicYards = volumeCubicFeet / 27;
    const cubicMeters = volumeCubicFeet * 0.0283168;

    // Calculate bags needed
    // 80lb bag covers 0.6 cubic feet
    // 60lb bag covers 0.45 cubic feet
    // 40lb bag covers 0.3 cubic feet
    const bags80lb = Math.ceil(volumeCubicFeet / 0.6);
    const bags60lb = Math.ceil(volumeCubicFeet / 0.45);
    const bags40lb = Math.ceil(volumeCubicFeet / 0.3);

    // Calculate costs
    const readyMix = parseFloat(readyMixPrice) || 0;
    const price80 = parseFloat(bag80lbPrice) || 0;
    const price60 = parseFloat(bag60lbPrice) || 0;

    const estimatedCost = {
      readyMix: cubicYards * readyMix,
      bags80lb: bags80lb * price80,
      bags60lb: bags60lb * price60,
    };

    setResults({
      cubicYards,
      cubicFeet: volumeCubicFeet,
      cubicMeters,
      bags80lb,
      bags60lb,
      bags40lb,
      estimatedCost,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateConcrete();
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
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Boxes className="h-4 w-4" />
            Construction Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Concrete Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate the amount of concrete needed for your construction project
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-slate-500 to-gray-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-6 w-6" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Shape
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  >
                    <option value="slab">Slab/Floor</option>
                    <option value="footing">Footing</option>
                    <option value="column">Column/Cylinder</option>
                    <option value="stairs">Stairs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Unit System
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  >
                    <option value="feet">Feet & Inches</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>

                {(shape === "slab" || shape === "footing") && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Length ({unit === "feet" ? "feet" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Width ({unit === "feet" ? "feet" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Thickness ({unit === "feet" ? "inches" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {shape === "column" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Diameter ({unit === "feet" ? "inches" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Height ({unit === "feet" ? "feet" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {shape === "stairs" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Number of Steps
                      </label>
                      <Input
                        type="number"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Step Width ({unit === "feet" ? "inches" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={stepWidth}
                        onChange={(e) => setStepWidth(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Step Height ({unit === "feet" ? "inches" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={stepHeight}
                        onChange={(e) => setStepHeight(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Step Depth ({unit === "feet" ? "inches" : "meters"})
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={stepDepth}
                        onChange={(e) => setStepDepth(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Waste Factor (%)
                  </label>
                  <Input
                    type="number"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Typically 5-10% for spillage and uneven surfaces
                  </p>
                </div>

                <Button
                  onClick={calculateConcrete}
                  className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                <Card className="border-2 border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Boxes className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        Concrete Volume Needed
                      </h3>
                    </div>
                    <p className="text-6xl font-bold mb-2">
                      {results.cubicYards.toFixed(2)}
                    </p>
                    <p className="text-2xl text-slate-100">Cubic Yards</p>
                  </div>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                    <CardTitle className="text-lg">
                      Volume in Different Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Cubic Yards
                        </div>
                        <div className="text-2xl font-bold text-slate-700">
                          {results.cubicYards.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Cubic Feet
                        </div>
                        <div className="text-2xl font-bold text-slate-700">
                          {results.cubicFeet.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Cubic Meters
                        </div>
                        <div className="text-2xl font-bold text-slate-700">
                          {results.cubicMeters.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5 text-slate-600" />
                      Concrete Bags Needed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800">
                            80 lb Bags
                          </div>
                          <div className="text-sm text-slate-600">
                            (0.6 cubic feet per bag)
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-700">
                          {results.bags80lb}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800">
                            60 lb Bags
                          </div>
                          <div className="text-sm text-slate-600">
                            (0.45 cubic feet per bag)
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-700">
                          {results.bags60lb}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800">
                            40 lb Bags
                          </div>
                          <div className="text-sm text-slate-600">
                            (0.3 cubic feet per bag)
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-700">
                          {results.bags40lb}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        Estimated Cost
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const show = document.getElementById("pricing-section");
                          show?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Edit Prices
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">
                          Ready-Mix Concrete
                        </span>
                        <span className="text-xl font-bold text-green-600">
                          ${results.estimatedCost.readyMix.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">80 lb Bags</span>
                        <span className="text-xl font-bold text-green-600">
                          ${results.estimatedCost.bags80lb.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">60 lb Bags</span>
                        <span className="text-xl font-bold text-green-600">
                          ${results.estimatedCost.bags60lb.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg" id="pricing-section">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                    <CardTitle className="text-lg">Pricing (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Ready-Mix ($/cubic yard)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={readyMixPrice}
                          onChange={(e) => setReadyMixPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          80 lb Bag Price ($)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={bag80lbPrice}
                          onChange={(e) => setBag80lbPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          60 lb Bag Price ($)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={bag60lbPrice}
                          onChange={(e) => setBag60lbPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Boxes className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Project Dimensions
                </h3>
                <p className="text-slate-500">
                  Fill in the measurements and click Calculate
                </p>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
              <CardTitle className="text-2xl">
                About Concrete Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Ready-Mix vs Bagged Concrete
                </h3>
                <p>
                  For large projects (more than 1 cubic yard), ready-mix concrete
                  delivered by truck is usually more economical and convenient. For
                  smaller projects, bagged concrete mix is often easier to work
                  with. Consider the project size, accessibility, and timeline when
                  choosing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Waste Factor Importance
                </h3>
                <p>
                  Always account for waste when ordering concrete. Uneven ground,
                  spillage, and over-excavation can increase the amount needed. A
                  5-10% waste factor is standard, but use 10-15% for complex shapes
                  or if you're unsure about exact dimensions. It's better to have a
                  little extra than to run short mid-pour.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Standard Thicknesses
                </h3>
                <p>
                  Standard concrete slab thickness is 4 inches for sidewalks and
                  patios, 4-6 inches for driveways and garage floors, and 6-8 inches
                  for heavy vehicle areas. Footings are typically 8-12 inches thick
                  and twice the width of the foundation wall.
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
