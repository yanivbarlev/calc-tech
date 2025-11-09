"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

interface GPAResults {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  letterGrade: string;
  classification: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course 1", grade: "A", credits: "3" },
    { id: 2, name: "Course 2", grade: "B", credits: "3" },
    { id: 3, name: "Course 3", grade: "A-", credits: "4" },
  ]);

  const [gradeScale, setGradeScale] = useState<"4.0" | "5.0">("4.0");
  const [results, setResults] = useState<GPAResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const gradePoints: { [key: string]: { "4.0": number; "5.0": number } } = {
    "A+": { "4.0": 4.0, "5.0": 5.0 },
    A: { "4.0": 4.0, "5.0": 5.0 },
    "A-": { "4.0": 3.7, "5.0": 4.7 },
    "B+": { "4.0": 3.3, "5.0": 4.3 },
    B: { "4.0": 3.0, "5.0": 4.0 },
    "B-": { "4.0": 2.7, "5.0": 3.7 },
    "C+": { "4.0": 2.3, "5.0": 3.3 },
    C: { "4.0": 2.0, "5.0": 3.0 },
    "C-": { "4.0": 1.7, "5.0": 2.7 },
    "D+": { "4.0": 1.3, "5.0": 2.3 },
    D: { "4.0": 1.0, "5.0": 2.0 },
    "D-": { "4.0": 0.7, "5.0": 1.7 },
    F: { "4.0": 0.0, "5.0": 0.0 },
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: `Course ${courses.length + 1}`,
        grade: "B",
        credits: "3",
      },
    ]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: string, value: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade]?.[gradeScale] || 0;
      totalQualityPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    let letterGrade = "F";
    let classification = "";

    if (gradeScale === "4.0") {
      if (gpa >= 3.7) {
        letterGrade = "A";
        classification = "Excellent";
      } else if (gpa >= 3.3) {
        letterGrade = "B+";
        classification = "Very Good";
      } else if (gpa >= 3.0) {
        letterGrade = "B";
        classification = "Good";
      } else if (gpa >= 2.7) {
        letterGrade = "B-";
        classification = "Above Average";
      } else if (gpa >= 2.0) {
        letterGrade = "C";
        classification = "Average";
      } else if (gpa >= 1.0) {
        letterGrade = "D";
        classification = "Below Average";
      } else {
        letterGrade = "F";
        classification = "Failing";
      }
    }

    setResults({
      gpa,
      totalCredits,
      totalQualityPoints,
      letterGrade,
      classification,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateGPA();
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
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="h-4 w-4" />
            Education Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            GPA Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your Grade Point Average based on course grades and credit
            hours
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  GPA Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Grade Scale
                  </label>
                  <select
                    value={gradeScale}
                    onChange={(e) => setGradeScale(e.target.value as "4.0" | "5.0")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="4.0">4.0 Scale (Standard)</option>
                    <option value="5.0">5.0 Scale (Weighted)</option>
                  </select>
                </div>

                <Button
                  onClick={calculateGPA}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate GPA
                </Button>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Grade Scale Reference
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>A / A+</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "4.0" : "5.0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>A-</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "3.7" : "4.7"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>B+</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "3.3" : "4.3"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>B</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "3.0" : "4.0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>B-</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "2.7" : "3.7"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>C+</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "2.3" : "3.3"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>C</span>
                      <span className="font-semibold">
                        {gradeScale === "4.0" ? "2.0" : "3.0"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    Course List
                  </CardTitle>
                  <Button onClick={addCourse} size="sm" variant="outline">
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="bg-slate-50 p-4 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">
                          Course {index + 1}
                        </span>
                        {courses.length > 1 && (
                          <Button
                            onClick={() => removeCourse(course.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Course Name
                          </label>
                          <Input
                            type="text"
                            value={course.name}
                            onChange={(e) =>
                              updateCourse(course.id, "name", e.target.value)
                            }
                            placeholder="Course name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Grade
                          </label>
                          <select
                            value={course.grade}
                            onChange={(e) =>
                              updateCourse(course.id, "grade", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {Object.keys(gradePoints).map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Credits
                          </label>
                          <Input
                            type="number"
                            step="0.5"
                            min="0"
                            value={course.credits}
                            onChange={(e) =>
                              updateCourse(course.id, "credits", e.target.value)
                            }
                            placeholder="3"
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
                <Card className="border-2 border-indigo-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Your GPA</h3>
                    </div>
                    <p className="text-7xl font-bold mb-2">
                      {results.gpa.toFixed(2)}
                    </p>
                    <p className="text-2xl text-indigo-100">
                      {results.classification}
                    </p>
                  </div>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Total Credits
                        </div>
                        <div className="text-2xl font-bold text-indigo-700">
                          {results.totalCredits}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Quality Points
                        </div>
                        <div className="text-2xl font-bold text-indigo-700">
                          {results.totalQualityPoints.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Letter Grade
                        </div>
                        <div className="text-2xl font-bold text-indigo-700">
                          {results.letterGrade}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">Understanding GPA</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  What is GPA?
                </h3>
                <p>
                  Grade Point Average (GPA) is a numerical representation of your
                  academic performance. It's calculated by dividing the total
                  quality points earned by the total number of credit hours
                  attempted. GPA is used by schools, scholarships, and employers to
                  evaluate academic achievement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  4.0 vs 5.0 Scale
                </h3>
                <p>
                  The 4.0 scale is the most common, where A = 4.0, B = 3.0, C = 2.0,
                  etc. Some schools use a 5.0 scale for weighted GPAs, often for
                  honors or AP classes, where A = 5.0. The weighted scale gives extra
                  points for more challenging courses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  GPA Classifications
                </h3>
                <p>
                  Generally, a GPA of 3.5-4.0 is considered excellent (often with
                  honors), 3.0-3.5 is good, 2.5-3.0 is average, and below 2.0 may be
                  concerning. Many colleges require a minimum 2.0 GPA to remain in
                  good standing, and competitive programs often require 3.0 or higher.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Cumulative vs Semester GPA
                </h3>
                <p>
                  Your cumulative GPA includes all courses throughout your academic
                  career, while semester GPA only includes courses from a single
                  term. This calculator can be used for either - just enter the
                  relevant courses. To calculate cumulative GPA, include all courses
                  from all semesters.
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
