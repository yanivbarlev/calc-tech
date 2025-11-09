"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Shuffle, List, Hash } from "lucide-react";

export default function RandomNumberGenerator() {
  const [minValue, setMinValue] = useState<string>("1");
  const [maxValue, setMaxValue] = useState<string>("100");
  const [quantity, setQuantity] = useState<string>("1");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortResults, setSortResults] = useState<boolean>(false);

  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<{ numbers: number[]; timestamp: string }[]>([]);

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumbers = () => {
    const min = parseInt(minValue) || 0;
    const max = parseInt(maxValue) || 100;
    const count = parseInt(quantity) || 1;

    if (min > max) {
      alert("Minimum value cannot be greater than maximum value!");
      return;
    }

    if (!allowDuplicates && count > (max - min + 1)) {
      alert(`Cannot generate ${count} unique numbers from a range of ${max - min + 1} numbers!`);
      return;
    }

    const numbers: number[] = [];
    const usedNumbers = new Set<number>();

    for (let i = 0; i < count; i++) {
      let randomNum: number;

      if (allowDuplicates) {
        randomNum = generateRandomNumber(min, max);
      } else {
        do {
          randomNum = generateRandomNumber(min, max);
        } while (usedNumbers.has(randomNum));
        usedNumbers.add(randomNum);
      }

      numbers.push(randomNum);
    }

    const finalNumbers = sortResults ? [...numbers].sort((a, b) => a - b) : numbers;
    setGeneratedNumbers(finalNumbers);

    // Add to history
    const timestamp = new Date().toLocaleTimeString();
    setHistory([{ numbers: finalNumbers, timestamp }, ...history.slice(0, 9)]);
  };

  const copyToClipboard = () => {
    const text = generatedNumbers.join(', ');
    navigator.clipboard.writeText(text);
  };

  const calculateStats = () => {
    if (generatedNumbers.length === 0) return null;

    const sum = generatedNumbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / generatedNumbers.length;
    const min = Math.min(...generatedNumbers);
    const max = Math.max(...generatedNumbers);
    const sorted = [...generatedNumbers].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    return { sum, avg, min, max, median };
  };

  const stats = calculateStats();

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
            <Shuffle className="h-4 w-4" />
            Utility Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Random Number Generator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate random numbers with customizable ranges, quantities, and options
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Generator Settings */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-6 w-6" />
                  Generator Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Minimum Value
                  </label>
                  <Input
                    type="number"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Maximum Value
                  </label>
                  <Input
                    type="number"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    How Many Numbers?
                  </label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="duplicates"
                      checked={allowDuplicates}
                      onChange={(e) => setAllowDuplicates(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="duplicates" className="text-sm font-medium text-slate-700">
                      Allow Duplicate Numbers
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="sort"
                      checked={sortResults}
                      onChange={(e) => setSortResults(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                      Sort Results (Low to High)
                    </label>
                  </div>
                </div>

                <Button
                  onClick={generateNumbers}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  <Shuffle className="mr-2 h-5 w-5" />
                  Generate Numbers
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Numbers */}
            {generatedNumbers.length > 0 ? (
              <>
                <Card className="border-2 border-indigo-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Generated Numbers</h3>
                      <Button
                        onClick={copyToClipboard}
                        variant="secondary"
                        size="sm"
                        className="bg-white text-indigo-600 hover:bg-indigo-50"
                      >
                        Copy All
                      </Button>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex flex-wrap gap-3">
                        {generatedNumbers.map((num, index) => (
                          <div
                            key={index}
                            className="bg-white text-indigo-600 font-bold text-2xl px-6 py-3 rounded-lg shadow-md"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Statistics */}
                {stats && generatedNumbers.length > 1 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                      <CardTitle className="text-lg">Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Sum</div>
                          <div className="text-2xl font-bold text-slate-800">{stats.sum}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Average</div>
                          <div className="text-2xl font-bold text-slate-800">{stats.avg.toFixed(2)}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Median</div>
                          <div className="text-2xl font-bold text-slate-800">{stats.median.toFixed(2)}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Minimum</div>
                          <div className="text-2xl font-bold text-slate-800">{stats.min}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Maximum</div>
                          <div className="text-2xl font-bold text-slate-800">{stats.max}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <div className="text-sm text-slate-600 mb-1">Count</div>
                          <div className="text-2xl font-bold text-slate-800">{generatedNumbers.length}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* History */}
                {history.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <List className="h-5 w-5" />
                        Generation History
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {history.map((entry, index) => (
                          <div key={index} className="bg-slate-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-500">{entry.timestamp}</span>
                              <span className="text-xs font-semibold text-indigo-600">
                                {entry.numbers.length} number{entry.numbers.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="text-sm text-slate-700 font-mono">
                              {entry.numbers.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Shuffle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Generate
                </h3>
                <p className="text-slate-500">
                  Configure your settings and click "Generate Numbers" to get started
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">About Random Number Generation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Random Number Generator?</h3>
                <p>
                  A random number generator (RNG) is a tool that produces numbers that lack any predictable pattern. Our generator uses JavaScript's built-in Math.random() function, which is a pseudo-random number generator (PRNG). While not truly random in the mathematical sense, it's more than sufficient for everyday applications like games, lotteries, sampling, and decision-making.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Uses for Random Numbers</h3>
                <p>
                  Random number generators have countless practical applications: selecting lottery numbers, creating secure passwords, conducting random sampling for surveys or research, simulating dice rolls or card draws for games, generating test data for software development, creating random seating arrangements, selecting raffle winners, and making impartial decisions when you need to choose randomly from options.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Understanding the Options</h3>
                <p>
                  <strong>Allow Duplicates:</strong> When enabled, the same number can appear multiple times in your results. This is like rolling dice where you can get the same number on multiple rolls. When disabled, each number will be unique, which is useful for things like drawing lottery numbers or randomly ordering a list.
                </p>
                <p className="mt-3">
                  <strong>Sort Results:</strong> This option automatically arranges your generated numbers from lowest to highest. This can make it easier to analyze your results or check if specific numbers were generated.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">True Randomness vs Pseudo-Randomness</h3>
                <p>
                  True random number generators use physical phenomena (like atmospheric noise or radioactive decay) to produce genuinely unpredictable numbers. Pseudo-random number generators use mathematical algorithms with a starting value (seed) to generate sequences of numbers that appear random and pass statistical tests for randomness, but are technically deterministic. For most everyday purposes, pseudo-random numbers work perfectly well.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tips for Using This Generator</h3>
                <p>
                  For lottery numbers, disable duplicates and set your range to match your lottery (e.g., 1-49 for many lotteries). For dice simulation, set the range to 1-6. For coin flips, use 0-1 or 1-2. If you need many random numbers for data analysis, generate them in larger batches and use the statistics panel to verify the distribution looks reasonable. Remember that with true randomness, patterns will occasionally appear—that's normal!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Statistical Note</h3>
                <p>
                  Over a large number of generations, each number in your range should appear with roughly equal frequency (uniform distribution). However, in small samples, you may see clustering or gaps. This is expected with random generation. The law of large numbers tells us that as you generate more numbers, the distribution will approach uniformity.
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
