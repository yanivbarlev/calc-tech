"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Triangle, Ruler } from "lucide-react";

interface TriangleResults {
  sideA: number;
  sideB: number;
  sideC: number;
  angleA: number;
  angleB: number;
  angleC: number;
  area: number;
  perimeter: number;
  type: string;
  steps: string[];
}

export default function TriangleCalculator() {
  const [mode, setMode] = useState<'sss' | 'sas' | 'asa' | 'base-height'>('sss');

  // SSS: Three sides
  const [sideA, setSideA] = useState<string>("3");
  const [sideB, setSideB] = useState<string>("4");
  const [sideC, setSideC] = useState<string>("5");

  // SAS: Two sides and included angle
  const [side1, setSide1] = useState<string>("5");
  const [angle, setAngle] = useState<string>("60");
  const [side2, setSide2] = useState<string>("5");

  // ASA: Two angles and included side
  const [angleA, setAngleA] = useState<string>("60");
  const [sideAB, setSideAB] = useState<string>("5");
  const [angleB, setAngleB] = useState<string>("60");

  // Base and Height
  const [base, setBase] = useState<string>("4");
  const [height, setHeight] = useState<string>("3");

  const [results, setResults] = useState<TriangleResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
  };

  const toDegrees = (radians: number): number => {
    return (radians * 180) / Math.PI;
  };

  const calculateTriangle = () => {
    let a = 0, b = 0, c = 0;
    let angleADeg = 0, angleBDeg = 0, angleCDeg = 0;
    let area = 0;
    const steps: string[] = [];

    try {
      switch (mode) {
        case 'sss': {
          // Three sides known
          a = parseFloat(sideA) || 0;
          b = parseFloat(sideB) || 0;
          c = parseFloat(sideC) || 0;

          steps.push(`Given three sides: a = ${a}, b = ${b}, c = ${c}`);

          // Check triangle inequality
          if (a + b <= c || a + c <= b || b + c <= a) {
            alert("These sides cannot form a valid triangle!");
            return;
          }

          // Use cosine law to find angles
          // cos(A) = (b² + c² - a²) / (2bc)
          const cosA = (b * b + c * c - a * a) / (2 * b * c);
          angleADeg = toDegrees(Math.acos(cosA));

          const cosB = (a * a + c * c - b * b) / (2 * a * c);
          angleBDeg = toDegrees(Math.acos(cosB));

          angleCDeg = 180 - angleADeg - angleBDeg;

          steps.push(`Using Law of Cosines to find angles:`);
          steps.push(`Angle A = arccos((b² + c² - a²) / (2bc)) = ${angleADeg.toFixed(2)}°`);
          steps.push(`Angle B = arccos((a² + c² - b²) / (2ac)) = ${angleBDeg.toFixed(2)}°`);
          steps.push(`Angle C = 180° - A - B = ${angleCDeg.toFixed(2)}°`);

          // Heron's formula for area
          const s = (a + b + c) / 2;
          area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

          steps.push(`Using Heron's Formula: s = (a + b + c) / 2 = ${s.toFixed(2)}`);
          steps.push(`Area = √(s(s-a)(s-b)(s-c)) = ${area.toFixed(2)}`);
          break;
        }

        case 'sas': {
          // Two sides and included angle
          const s1 = parseFloat(side1) || 0;
          const ang = parseFloat(angle) || 0;
          const s2 = parseFloat(side2) || 0;

          steps.push(`Given two sides and included angle: a = ${s1}, angle C = ${ang}°, b = ${s2}`);

          // Use cosine law to find third side
          // c² = a² + b² - 2ab·cos(C)
          c = Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos(toRadians(ang)));
          a = s1;
          b = s2;
          angleCDeg = ang;

          steps.push(`Using Law of Cosines: c = √(a² + b² - 2ab·cos(C)) = ${c.toFixed(2)}`);

          // Find other angles
          const cosA = (b * b + c * c - a * a) / (2 * b * c);
          angleADeg = toDegrees(Math.acos(cosA));
          angleBDeg = 180 - angleADeg - angleCDeg;

          steps.push(`Angle A = ${angleADeg.toFixed(2)}°`);
          steps.push(`Angle B = 180° - A - C = ${angleBDeg.toFixed(2)}°`);

          // Area using: Area = (1/2)ab·sin(C)
          area = 0.5 * a * b * Math.sin(toRadians(angleCDeg));
          steps.push(`Area = (1/2) × a × b × sin(C) = ${area.toFixed(2)}`);
          break;
        }

        case 'asa': {
          // Two angles and included side
          const angA = parseFloat(angleA) || 0;
          const side = parseFloat(sideAB) || 0;
          const angB = parseFloat(angleB) || 0;

          angleADeg = angA;
          angleBDeg = angB;
          angleCDeg = 180 - angA - angB;

          if (angleCDeg <= 0) {
            alert("The sum of two angles cannot be >= 180°!");
            return;
          }

          steps.push(`Given two angles and included side: A = ${angA}°, c = ${side}, B = ${angB}°`);
          steps.push(`Angle C = 180° - A - B = ${angleCDeg.toFixed(2)}°`);

          c = side;

          // Use sine law to find other sides
          // a/sin(A) = b/sin(B) = c/sin(C)
          a = (c * Math.sin(toRadians(angleADeg))) / Math.sin(toRadians(angleCDeg));
          b = (c * Math.sin(toRadians(angleBDeg))) / Math.sin(toRadians(angleCDeg));

          steps.push(`Using Law of Sines:`);
          steps.push(`a = c × sin(A) / sin(C) = ${a.toFixed(2)}`);
          steps.push(`b = c × sin(B) / sin(C) = ${b.toFixed(2)}`);

          area = 0.5 * a * b * Math.sin(toRadians(angleCDeg));
          steps.push(`Area = (1/2) × a × b × sin(C) = ${area.toFixed(2)}`);
          break;
        }

        case 'base-height': {
          // Base and height
          const baseVal = parseFloat(base) || 0;
          const heightVal = parseFloat(height) || 0;

          steps.push(`Given base = ${baseVal} and height = ${heightVal}`);

          area = 0.5 * baseVal * heightVal;
          steps.push(`Area = (1/2) × base × height = ${area.toFixed(2)}`);

          // For right triangle assumption
          a = baseVal;
          b = heightVal;
          c = Math.sqrt(a * a + b * b);

          steps.push(`Assuming right triangle: hypotenuse c = √(a² + b²) = ${c.toFixed(2)}`);

          angleADeg = toDegrees(Math.atan(b / a));
          angleBDeg = toDegrees(Math.atan(a / b));
          angleCDeg = 90;

          steps.push(`Angle A = arctan(b/a) = ${angleADeg.toFixed(2)}°`);
          steps.push(`Angle B = arctan(a/b) = ${angleBDeg.toFixed(2)}°`);
          steps.push(`Angle C = 90°`);
          break;
        }
      }

      const perimeter = a + b + c;
      steps.push(`Perimeter = a + b + c = ${perimeter.toFixed(2)}`);

      // Determine triangle type
      let type = "";
      const sides = [a, b, c].sort((x, y) => x - y);
      const angles = [angleADeg, angleBDeg, angleCDeg];

      if (Math.abs(sides[0] - sides[1]) < 0.01 && Math.abs(sides[1] - sides[2]) < 0.01) {
        type = "Equilateral";
      } else if (
        Math.abs(sides[0] - sides[1]) < 0.01 ||
        Math.abs(sides[1] - sides[2]) < 0.01 ||
        Math.abs(sides[0] - sides[2]) < 0.01
      ) {
        type = "Isosceles";
      } else {
        type = "Scalene";
      }

      if (angles.some(ang => Math.abs(ang - 90) < 0.1)) {
        type += " Right";
      } else if (angles.some(ang => ang > 90)) {
        type += " Obtuse";
      } else {
        type += " Acute";
      }

      setResults({
        sideA: a,
        sideB: b,
        sideC: c,
        angleA: angleADeg,
        angleB: angleBDeg,
        angleC: angleCDeg,
        area,
        perimeter,
        type,
        steps
      });

      setHasCalculated(true);
    } catch (error) {
      alert("Error calculating triangle. Please check your inputs.");
    }
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateTriangle();
    }
  }, []);

  const ModeButton = ({
    value,
    label,
    description
  }: {
    value: typeof mode;
    label: string;
    description: string;
  }) => (
    <button
      type="button"
      onClick={() => setMode(value)}
      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
        mode === value
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 hover:border-blue-300"
      }`}
    >
      <div className="font-semibold text-slate-800">{label}</div>
      <div className="text-xs text-slate-600 mt-1">{description}</div>
    </button>
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Triangle className="h-4 w-4" />
            Geometry Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Triangle Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate triangle properties including sides, angles, area, and perimeter using various input methods
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-6 w-6" />
                  Input Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Mode Selection */}
                <div className="space-y-2">
                  <ModeButton
                    value="sss"
                    label="SSS - Three Sides"
                    description="Enter all three side lengths"
                  />
                  <ModeButton
                    value="sas"
                    label="SAS - Two Sides & Angle"
                    description="Two sides and the included angle"
                  />
                  <ModeButton
                    value="asa"
                    label="ASA - Two Angles & Side"
                    description="Two angles and the included side"
                  />
                  <ModeButton
                    value="base-height"
                    label="Base & Height"
                    description="For area calculation"
                  />
                </div>

                {/* Conditional Inputs */}
                <div className="border-t pt-6">
                  {mode === 'sss' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Side A
                        </label>
                        <Input
                          type="number"
                          value={sideA}
                          onChange={(e) => setSideA(e.target.value)}
                          placeholder="3"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Side B
                        </label>
                        <Input
                          type="number"
                          value={sideB}
                          onChange={(e) => setSideB(e.target.value)}
                          placeholder="4"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Side C
                        </label>
                        <Input
                          type="number"
                          value={sideC}
                          onChange={(e) => setSideC(e.target.value)}
                          placeholder="5"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'sas' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Side 1
                        </label>
                        <Input
                          type="number"
                          value={side1}
                          onChange={(e) => setSide1(e.target.value)}
                          placeholder="5"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Included Angle (degrees)
                        </label>
                        <Input
                          type="number"
                          value={angle}
                          onChange={(e) => setAngle(e.target.value)}
                          placeholder="60"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Side 2
                        </label>
                        <Input
                          type="number"
                          value={side2}
                          onChange={(e) => setSide2(e.target.value)}
                          placeholder="5"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'asa' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Angle A (degrees)
                        </label>
                        <Input
                          type="number"
                          value={angleA}
                          onChange={(e) => setAngleA(e.target.value)}
                          placeholder="60"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Included Side
                        </label>
                        <Input
                          type="number"
                          value={sideAB}
                          onChange={(e) => setSideAB(e.target.value)}
                          placeholder="5"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Angle B (degrees)
                        </label>
                        <Input
                          type="number"
                          value={angleB}
                          onChange={(e) => setAngleB(e.target.value)}
                          placeholder="60"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'base-height' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Base
                        </label>
                        <Input
                          type="number"
                          value={base}
                          onChange={(e) => setBase(e.target.value)}
                          placeholder="4"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Height
                        </label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="3"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={calculateTriangle}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Triangle
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Main Results */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Triangle Properties</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Type</p>
                        <p className="text-2xl font-bold">{results.type} Triangle</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Area</p>
                        <p className="text-2xl font-bold">{results.area.toFixed(2)} sq units</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Perimeter</p>
                        <p className="text-2xl font-bold">{results.perimeter.toFixed(2)} units</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Sides and Angles */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                      <CardTitle className="text-lg">Sides</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Side A:</span>
                        <span className="font-semibold text-slate-800">{results.sideA.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Side B:</span>
                        <span className="font-semibold text-slate-800">{results.sideB.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Side C:</span>
                        <span className="font-semibold text-slate-800">{results.sideC.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                      <CardTitle className="text-lg">Angles</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Angle A:</span>
                        <span className="font-semibold text-slate-800">{results.angleA.toFixed(2)}°</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Angle B:</span>
                        <span className="font-semibold text-slate-800">{results.angleB.toFixed(2)}°</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Angle C:</span>
                        <span className="font-semibold text-slate-800">{results.angleC.toFixed(2)}°</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Sum:</span>
                          <span className="font-semibold text-slate-800">
                            {(results.angleA + results.angleB + results.angleC).toFixed(2)}°
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step by Step */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                    <CardTitle className="text-lg">Calculation Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {results.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-slate-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Triangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Select an input method and enter your triangle measurements
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">Triangle Geometry Guide</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Triangle Fundamentals</h3>
                <p>
                  A triangle is a polygon with three sides and three angles. The sum of all angles in any triangle always equals 180 degrees. Triangles are classified by their sides (equilateral, isosceles, scalene) and by their angles (acute, right, obtuse).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Law of Cosines</h3>
                <p>
                  The Law of Cosines relates the lengths of a triangle's sides to the cosine of one of its angles. For a triangle with sides a, b, c and angle C opposite to side c: c² = a² + b² - 2ab·cos(C). This law is particularly useful when you know two sides and the included angle (SAS) or all three sides (SSS).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Law of Sines</h3>
                <p>
                  The Law of Sines states that the ratio of any side of a triangle to the sine of its opposite angle is constant: a/sin(A) = b/sin(B) = c/sin(C). This law is helpful when you know two angles and one side (ASA or AAS) or two sides and a non-included angle (SSA).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Area Formulas</h3>
                <p>
                  The most common formula for triangle area is (1/2) × base × height. However, there are other useful formulas: Heron's formula uses all three sides, the SAS formula uses two sides and the included angle [(1/2)ab·sin(C)], and for right triangles, you can use (1/2) × leg₁ × leg₂.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Triangle Types</h3>
                <p>
                  <strong>By sides:</strong> Equilateral (all sides equal), Isosceles (two sides equal), Scalene (no sides equal).
                  <strong> By angles:</strong> Acute (all angles less than 90°), Right (one 90° angle), Obtuse (one angle greater than 90°).
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
