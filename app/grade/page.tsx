"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  FileText,
  TrendingUp,
  Target,
} from "lucide-react";

interface Assignment {
  id: number;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

interface GradeResults {
  currentGrade: number;
  letterGrade: string;
  weightedAverage: number;
  pointsEarned: number;
  pointsPossible: number;
  percentageComplete: number;
  gradeNeeded: {
    forA: number;
    forB: number;
    forC: number;
  };
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: "Homework", score: "85", maxScore: "100", weight: "20" },
    { id: 2, name: "Midterm Exam", score: "78", maxScore: "100", weight: "30" },
    { id: 3, name: "Project", score: "92", maxScore: "100", weight: "25" },
  ]);

  const [finalExamWeight, setFinalExamWeight] = useState<string>("25");
  const [results, setResults] = useState<GradeResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        name: `Assignment ${assignments.length + 1}`,
        score: "0",
        maxScore: "100",
        weight: "10",
      },
    ]);
  };

  const removeAssignment = (id: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    }
  };

  const updateAssignment = (id: number, field: string, value: string) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment
      )
    );
  };

  const calculateGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    let pointsEarned = 0;
    let pointsPossible = 0;

    assignments.forEach((assignment) => {
      const score = parseFloat(assignment.score) || 0;
      const maxScore = parseFloat(assignment.maxScore) || 0;
      const weight = parseFloat(assignment.weight) || 0;

      if (maxScore > 0) {
        const percentage = (score / maxScore) * 100;
        totalWeightedScore += percentage * (weight / 100);
        totalWeight += weight;
        pointsEarned += score;
        pointsPossible += maxScore;
      }
    });

    const finalWeight = parseFloat(finalExamWeight) || 0;
    const currentWeightComplete = totalWeight;
    const percentageComplete = (currentWeightComplete / (currentWeightComplete + finalWeight)) * 100;

    // Calculate current grade (weighted average of completed work)
    const currentGrade = totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;

    // Calculate weighted average (including final exam weight in denominator)
    const weightedAverage = totalWeightedScore;

    const getLetterGrade = (grade: number) => {
      if (grade >= 93) return "A";
      if (grade >= 90) return "A-";
      if (grade >= 87) return "B+";
      if (grade >= 83) return "B";
      if (grade >= 80) return "B-";
      if (grade >= 77) return "C+";
      if (grade >= 73) return "C";
      if (grade >= 70) return "C-";
      if (grade >= 67) return "D+";
      if (grade >= 63) return "D";
      if (grade >= 60) return "D-";
      return "F";
    };

    // Calculate grade needed on final exam for target grades
    const calculateNeededGrade = (targetGrade: number) => {
      if (finalWeight === 0) return 0;
      const needed = ((targetGrade - weightedAverage) / finalWeight) * 100;
      return Math.max(0, Math.min(100, needed));
    };

    setResults({
      currentGrade,
      letterGrade: getLetterGrade(currentGrade),
      weightedAverage,
      pointsEarned,
      pointsPossible,
      percentageComplete,
      gradeNeeded: {
        forA: calculateNeededGrade(93),
        forB: calculateNeededGrade(83),
        forC: calculateNeededGrade(73),
      },
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateGrade();
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="h-4 w-4" />
            Education Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Grade Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your final grade and see what you need to score on remaining assignments
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Course Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Final Exam Weight (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={finalExamWeight}
                    onChange={(e) => setFinalExamWeight(e.target.value)}
                    placeholder="25"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Percentage of final grade from final exam
                  </p>
                </div>

                <Button
                  onClick={calculateGrade}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Grade
                </Button>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Grading Scale
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>A</span>
                      <span className="font-semibold">93-100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B</span>
                      <span className="font-semibold">83-92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C</span>
                      <span className="font-semibold">73-82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>D</span>
                      <span className="font-semibold">63-72%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F</span>
                      <span className="font-semibold">Below 63%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Assignments & Exams
                  </CardTitle>
                  <Button onClick={addAssignment} size="sm" variant="outline">
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div
                      key={assignment.id}
                      className="bg-slate-50 p-4 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">
                          Item {index + 1}
                        </span>
                        {assignments.length > 1 && (
                          <Button
                            onClick={() => removeAssignment(assignment.id)}
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
                            Name
                          </label>
                          <Input
                            type="text"
                            value={assignment.name}
                            onChange={(e) =>
                              updateAssignment(
                                assignment.id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Assignment name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Score
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={assignment.score}
                            onChange={(e) =>
                              updateAssignment(
                                assignment.id,
                                "score",
                                e.target.value
                              )
                            }
                            placeholder="85"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Max Score
                          </label>
                          <Input
                            type="number"
                            min="0"
                            value={assignment.maxScore}
                            onChange={(e) =>
                              updateAssignment(
                                assignment.id,
                                "maxScore",
                                e.target.value
                              )
                            }
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Weight (%)
                          </label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={assignment.weight}
                            onChange={(e) =>
                              updateAssignment(
                                assignment.id,
                                "weight",
                                e.target.value
                              )
                            }
                            placeholder="20"
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
                <Card className="border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Current Grade</h3>
                    </div>
                    <p className="text-7xl font-bold mb-2">
                      {results.currentGrade.toFixed(1)}%
                    </p>
                    <p className="text-3xl text-blue-100">
                      {results.letterGrade}
                    </p>
                  </div>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                    <CardTitle className="text-lg">Grade Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Points Earned
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {results.pointsEarned.toFixed(1)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Points Possible
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {results.pointsPossible.toFixed(1)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Course Complete
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {results.percentageComplete.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {parseFloat(finalExamWeight) > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Grade Needed on Final Exam
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-slate-800">
                                For an A (93%)
                              </div>
                              <div className="text-sm text-slate-600">
                                Minimum grade needed
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-green-700">
                              {results.gradeNeeded.forA.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-slate-800">
                                For a B (83%)
                              </div>
                              <div className="text-sm text-slate-600">
                                Minimum grade needed
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-700">
                              {results.gradeNeeded.forB.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-slate-800">
                                For a C (73%)
                              </div>
                              <div className="text-sm text-slate-600">
                                Minimum grade needed
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-amber-700">
                              {results.gradeNeeded.forC.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">About Grade Calculation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Weighted Grades
                </h3>
                <p>
                  Most courses use weighted grades where different types of
                  assignments contribute different percentages to your final grade.
                  For example, homework might be 20%, exams 50%, and projects 30%.
                  This calculator accounts for these weights to give you an accurate
                  picture of your grade.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Planning Your Studies
                </h3>
                <p>
                  Use this calculator to understand what grades you need on
                  remaining assignments to achieve your target grade. This helps you
                  prioritize your study time and set realistic goals. Remember that
                  grades above 100% are usually not possible, so if the calculator
                  shows you need more than 100%, that target grade may not be
                  achievable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Understanding Your Current Grade
                </h3>
                <p>
                  Your current grade represents your performance on completed work
                  so far. The weighted average includes the weight of incomplete
                  assignments (like the final exam) in the denominator, which is why
                  it may differ from your current grade. Both numbers are useful for
                  different purposes.
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
