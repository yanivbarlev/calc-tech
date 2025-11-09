"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, BarChart3, TrendingUp, Plus, X } from "lucide-react";

interface StatisticsResults {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  range: number;
  variance: number;
  standardDeviation: number;
  populationVariance: number;
  populationStdDev: number;
  min: number;
  max: number;
  sortedData: number[];
}

export default function StandardDeviationCalculator() {
  const [dataInput, setDataInput] = useState<string>("2, 4, 6, 8, 10");
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [isSample, setIsSample] = useState<boolean>(true);

  const [results, setResults] = useState<StatisticsResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const parseData = (input: string): number[] => {
    // Split by commas, spaces, or line breaks
    const values = input
      .split(/[,\s\n]+/)
      .map((val) => parseFloat(val.trim()))
      .filter((val) => !isNaN(val));
    return values;
  };

  const calculateStatistics = () => {
    const data = parseData(dataInput);

    if (data.length === 0) {
      alert("Please enter valid numerical data!");
      return;
    }

    setDataPoints(data);

    const n = data.length;
    const sorted = [...data].sort((a, b) => a - b);

    // Sum
    const sum = data.reduce((acc, val) => acc + val, 0);

    // Mean
    const mean = sum / n;

    // Median
    let median: number;
    if (n % 2 === 0) {
      median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    } else {
      median = sorted[Math.floor(n / 2)];
    }

    // Mode
    const frequency: { [key: number]: number } = {};
    data.forEach((val) => {
      frequency[val] = (frequency[val] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter((key) => frequency[parseFloat(key)] === maxFrequency)
      .map((key) => parseFloat(key));

    // Range
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Variance and Standard Deviation
    const squaredDiffs = data.map((val) => Math.pow(val - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((acc, val) => acc + val, 0);

    // Sample statistics (n-1)
    const variance = n > 1 ? sumSquaredDiffs / (n - 1) : 0;
    const standardDeviation = Math.sqrt(variance);

    // Population statistics (n)
    const populationVariance = sumSquaredDiffs / n;
    const populationStdDev = Math.sqrt(populationVariance);

    setResults({
      count: n,
      sum,
      mean,
      median,
      mode: maxFrequency > 1 ? mode : [],
      range,
      variance,
      standardDeviation,
      populationVariance,
      populationStdDev,
      min,
      max,
      sortedData: sorted
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateStatistics();
    }
  }, []);

  const addQuickData = (type: 'random' | 'sequence') => {
    if (type === 'random') {
      const randomData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
      setDataInput(randomData.join(', '));
    } else {
      setDataInput('1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
    }
  };

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
            <BarChart3 className="h-4 w-4" />
            Statistics Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Standard Deviation Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate mean, variance, standard deviation, and other statistical measures for your data set
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Data Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Data Input
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Enter Your Data
                  </label>
                  <textarea
                    value={dataInput}
                    onChange={(e) => setDataInput(e.target.value)}
                    placeholder="2, 4, 6, 8, 10"
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Separate values with commas, spaces, or line breaks
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Quick Fill
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => addQuickData('sequence')}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      1-10
                    </Button>
                    <Button
                      onClick={() => addQuickData('random')}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Random
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Data Type
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="sample"
                        name="dataType"
                        checked={isSample}
                        onChange={() => setIsSample(true)}
                        className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="sample" className="text-sm font-medium text-slate-700">
                        Sample (uses n-1)
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="population"
                        name="dataType"
                        checked={!isSample}
                        onChange={() => setIsSample(false)}
                        className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label htmlFor="population" className="text-sm font-medium text-slate-700">
                        Population (uses n)
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Use sample if your data is a subset of a larger population
                  </p>
                </div>

                <Button
                  onClick={calculateStatistics}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Statistics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Statistics */}
                <Card className="border-2 border-cyan-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
                    <h3 className="text-xl font-semibold mb-6">Primary Statistics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-cyan-100 mb-1">Mean (Average)</p>
                        <p className="text-4xl font-bold">{results.mean.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-100 mb-1">
                          {isSample ? 'Sample Std Dev' : 'Population Std Dev'}
                        </p>
                        <p className="text-4xl font-bold">
                          {isSample
                            ? results.standardDeviation.toFixed(4)
                            : results.populationStdDev.toFixed(4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-cyan-100 mb-1">
                          {isSample ? 'Sample Variance' : 'Population Variance'}
                        </p>
                        <p className="text-4xl font-bold">
                          {isSample
                            ? results.variance.toFixed(4)
                            : results.populationVariance.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Detailed Statistics */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                      <CardTitle className="text-lg">Basic Measures</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Count (n):</span>
                        <span className="font-semibold text-slate-800">{results.count}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Sum:</span>
                        <span className="font-semibold text-slate-800">{results.sum.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Mean:</span>
                        <span className="font-semibold text-slate-800">{results.mean.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Median:</span>
                        <span className="font-semibold text-slate-800">{results.median.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Mode:</span>
                        <span className="font-semibold text-slate-800">
                          {results.mode.length > 0 ? results.mode.join(', ') : 'No mode'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                      <CardTitle className="text-lg">Range & Spread</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Minimum:</span>
                        <span className="font-semibold text-slate-800">{results.min.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Maximum:</span>
                        <span className="font-semibold text-slate-800">{results.max.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Range:</span>
                        <span className="font-semibold text-slate-800">{results.range.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Sample Std Dev:</span>
                        <span className="font-semibold text-slate-800">
                          {results.standardDeviation.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Population Std Dev:</span>
                        <span className="font-semibold text-slate-800">
                          {results.populationStdDev.toFixed(4)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sorted Data */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Sorted Data ({results.count} values)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex flex-wrap gap-2">
                        {results.sortedData.map((val, index) => (
                          <span
                            key={index}
                            className="bg-white text-slate-700 px-3 py-1 rounded-md text-sm font-mono border border-slate-200"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Formulas */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Formulas Used</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Mean</h4>
                      <div className="bg-slate-50 p-3 rounded font-mono text-sm">
                        μ = Σx / n = {results.sum.toFixed(4)} / {results.count} = {results.mean.toFixed(4)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Sample Variance</h4>
                      <div className="bg-slate-50 p-3 rounded font-mono text-sm">
                        s² = Σ(x - μ)² / (n - 1) = {results.variance.toFixed(4)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Sample Standard Deviation</h4>
                      <div className="bg-slate-50 p-3 rounded font-mono text-sm">
                        s = √(s²) = √{results.variance.toFixed(4)} = {results.standardDeviation.toFixed(4)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Population Standard Deviation</h4>
                      <div className="bg-slate-50 p-3 rounded font-mono text-sm">
                        σ = √(Σ(x - μ)² / n) = {results.populationStdDev.toFixed(4)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your data values and click "Calculate Statistics"
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">Understanding Standard Deviation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Standard Deviation?</h3>
                <p>
                  Standard deviation is a measure of how spread out numbers are from their average (mean). A low standard deviation indicates that values tend to be close to the mean, while a high standard deviation indicates that values are spread out over a wider range. It's one of the most commonly used measures of variability in statistics.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Sample vs. Population</h3>
                <p>
                  <strong>Population Standard Deviation</strong> is used when you have data for an entire population. The formula divides by n (the total number of values).
                </p>
                <p className="mt-3">
                  <strong>Sample Standard Deviation</strong> is used when you have data for a sample of a larger population. The formula divides by (n-1) instead of n. This is called Bessel's correction and provides a better estimate of the population standard deviation from a sample.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Variance</h3>
                <p>
                  Variance is the average of the squared differences from the mean. Standard deviation is simply the square root of variance. While variance is useful in many statistical calculations, standard deviation is often preferred for interpretation because it's in the same units as the original data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Mean, Median, and Mode</h3>
                <p>
                  <strong>Mean</strong> is the arithmetic average of all values. It's sensitive to outliers (extreme values).
                </p>
                <p className="mt-2">
                  <strong>Median</strong> is the middle value when data is sorted. It's more resistant to outliers than the mean.
                </p>
                <p className="mt-2">
                  <strong>Mode</strong> is the most frequently occurring value(s) in the dataset. A dataset can have no mode, one mode, or multiple modes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The 68-95-99.7 Rule</h3>
                <p>
                  For normally distributed data, approximately 68% of values fall within one standard deviation of the mean, 95% fall within two standard deviations, and 99.7% fall within three standard deviations. This empirical rule is useful for understanding the distribution of data and identifying outliers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Real-World Applications</h3>
                <p>
                  Standard deviation is used extensively in quality control (manufacturing tolerances), finance (measuring investment risk and volatility), education (standardizing test scores), weather forecasting (variability in predictions), and scientific research (assessing experimental reliability). Understanding variability is crucial for making informed decisions in virtually any field that deals with data.
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
