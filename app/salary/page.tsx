"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, ArrowLeft, Calendar, Clock, Briefcase, TrendingUp } from "lucide-react";

interface SalaryResults {
  hourly: number;
  daily: number;
  weekly: number;
  biWeekly: number;
  semiMonthly: number;
  monthly: number;
  quarterly: number;
  annual: number;
  adjustedHourly: number;
  adjustedDaily: number;
  adjustedWeekly: number;
  adjustedBiWeekly: number;
  adjustedSemiMonthly: number;
  adjustedMonthly: number;
  adjustedQuarterly: number;
  adjustedAnnual: number;
  totalWorkingDays: number;
  adjustedWorkingDays: number;
}

export default function SalaryCalculator() {
  const [salaryAmount, setSalaryAmount] = useState<string>("30");
  const [payFrequency, setPayFrequency] = useState<string>("hourly");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("5");
  const [holidaysPerYear, setHolidaysPerYear] = useState<string>("10");
  const [vacationDays, setVacationDays] = useState<string>("15");

  const [results, setResults] = useState<SalaryResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateSalary = () => {
    const amount = parseFloat(salaryAmount) || 0;
    const hoursWeek = parseFloat(hoursPerWeek) || 40;
    const daysWeek = parseFloat(daysPerWeek) || 5;
    const holidays = parseFloat(holidaysPerYear) || 0;
    const vacation = parseFloat(vacationDays) || 0;

    const hoursPerDay = hoursWeek / daysWeek;
    const weeksPerYear = 52;
    const totalWorkingDays = weeksPerYear * daysWeek;
    const adjustedWorkingDays = totalWorkingDays - holidays - vacation;

    let hourlyRate = 0;

    // Convert input to hourly rate first
    switch (payFrequency) {
      case "hourly":
        hourlyRate = amount;
        break;
      case "daily":
        hourlyRate = amount / hoursPerDay;
        break;
      case "weekly":
        hourlyRate = amount / hoursWeek;
        break;
      case "biweekly":
        hourlyRate = amount / (hoursWeek * 2);
        break;
      case "semimonthly":
        hourlyRate = (amount * 24) / (hoursWeek * weeksPerYear);
        break;
      case "monthly":
        hourlyRate = (amount * 12) / (hoursWeek * weeksPerYear);
        break;
      case "quarterly":
        hourlyRate = (amount * 4) / (hoursWeek * weeksPerYear);
        break;
      case "annual":
        hourlyRate = amount / (hoursWeek * weeksPerYear);
        break;
    }

    // Calculate unadjusted values
    const daily = hourlyRate * hoursPerDay;
    const weekly = daily * daysWeek;
    const biWeekly = weekly * 2;
    const annual = hourlyRate * hoursWeek * weeksPerYear;
    const monthly = annual / 12;
    const semiMonthly = annual / 24;
    const quarterly = annual / 4;

    // Calculate adjusted values (accounting for PTO)
    const adjustedAnnual = hourlyRate * hoursPerDay * adjustedWorkingDays;
    const adjustedHourly = hourlyRate; // Hourly rate doesn't change
    const adjustedDaily = daily; // Daily rate doesn't change
    const adjustedWeekly = (adjustedAnnual / weeksPerYear);
    const adjustedBiWeekly = adjustedWeekly * 2;
    const adjustedMonthly = adjustedAnnual / 12;
    const adjustedSemiMonthly = adjustedAnnual / 24;
    const adjustedQuarterly = adjustedAnnual / 4;

    setResults({
      hourly: hourlyRate,
      daily,
      weekly,
      biWeekly,
      semiMonthly,
      monthly,
      quarterly,
      annual,
      adjustedHourly,
      adjustedDaily,
      adjustedWeekly,
      adjustedBiWeekly,
      adjustedSemiMonthly,
      adjustedMonthly,
      adjustedQuarterly,
      adjustedAnnual,
      totalWorkingDays,
      adjustedWorkingDays
    });

    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculateSalary();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
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
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DollarSign className="h-4 w-4" />
            Financial Planning Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Salary Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Convert your salary between hourly, daily, weekly, monthly, and annual pay rates with adjustments for vacation and holidays
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Salary Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Salary Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={salaryAmount}
                      onChange={(e) => setSalaryAmount(e.target.value)}
                      className="pl-7"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pay Frequency
                  </label>
                  <select
                    value={payFrequency}
                    onChange={(e) => setPayFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="semimonthly">Semi-monthly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-700 mb-4">Work Schedule</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Hours per Week
                      </label>
                      <Input
                        type="number"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="40"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Days per Week
                      </label>
                      <Input
                        type="number"
                        value={daysPerWeek}
                        onChange={(e) => setDaysPerWeek(e.target.value)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Holidays per Year
                      </label>
                      <Input
                        type="number"
                        value={holidaysPerYear}
                        onChange={(e) => setHolidaysPerYear(e.target.value)}
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Vacation Days per Year
                      </label>
                      <Input
                        type="number"
                        value={vacationDays}
                        onChange={(e) => setVacationDays(e.target.value)}
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={calculateSalary}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Salary
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Annual Salary Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Annual Salary</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.annual)}</p>
                    <p className="text-emerald-100">
                      Adjusted (with PTO): {formatCurrency(results.adjustedAnnual)}
                    </p>
                  </div>
                </Card>

                {/* Unadjusted Salary Breakdown */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      Unadjusted Salary Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Hourly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.hourly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Daily</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.daily)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Weekly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.weekly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Bi-weekly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.biWeekly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Semi-monthly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.semiMonthly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Monthly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.monthly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Quarterly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.quarterly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Annual</span>
                        <span className="font-semibold text-emerald-600 text-lg">{formatCurrency(results.annual)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Adjusted Salary Breakdown */}
                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                      <Clock className="h-5 w-5 text-teal-600" />
                      Adjusted Salary (Accounting for Time Off)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        <strong>Working Days:</strong> {results.adjustedWorkingDays} days per year (out of {results.totalWorkingDays} total weekdays)
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Hourly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedHourly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Daily</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedDaily)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Weekly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedWeekly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Bi-weekly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedBiWeekly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Semi-monthly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedSemiMonthly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Monthly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedMonthly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Quarterly</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.adjustedQuarterly)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Annual</span>
                        <span className="font-semibold text-teal-600 text-lg">{formatCurrency(results.adjustedAnnual)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Your Salary Details
                </h3>
                <p className="text-slate-500">
                  Fill in the form and click "Calculate Salary" to see your personalized breakdown
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Your Salary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Salary?</h3>
                <p>
                  A salary represents the compensation you receive for your work, but it can be expressed in many different ways depending on how you're paid. Some people think in terms of their hourly wage, while others focus on their annual income. The truth is, these are all different perspectives on the same thing—your earning power. Understanding how to convert between these different pay periods helps you make better financial decisions, whether you're comparing job offers, budgeting your expenses, or negotiating a raise.
                </p>
                <p className="mt-3">
                  What makes salary calculations interesting is that they need to account for the reality of how we actually work. Nobody works every single day of the year—we take weekends off, celebrate holidays, and hopefully get some vacation time. The "unadjusted" salary is what you'd earn if you worked every weekday, while the "adjusted" salary accounts for your actual working days after subtracting holidays and vacation. This adjusted figure gives you a more realistic picture of your true earnings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Breaking Down Pay Frequencies</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Hourly Pay</h4>
                <p>
                  When you're paid by the hour, your earnings are directly tied to the time you spend working. This is common in retail, hospitality, and many entry-level positions. The advantage is straightforward—work more hours, earn more money. If you're making $30 per hour and work eight hours, you've earned $240 for that day. The calculation is simple and transparent.
                </p>
                <p className="mt-3">
                  However, hourly workers often face less predictable income. Your paycheck can vary from week to week depending on your schedule, which makes budgeting a bit more challenging. On the flip side, you might have opportunities for overtime pay, typically at 1.5 times your regular rate, which can significantly boost your earnings during busy periods.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Daily Rate</h4>
                <p>
                  Daily rates are popular among freelancers, consultants, and contract workers. Instead of tracking every hour, you charge a flat fee for a full day's work. This approach simplifies invoicing and often feels more professional than hourly billing. A typical workday is usually considered to be eight hours, so a daily rate of $240 would translate to $30 per hour.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Weekly and Bi-Weekly Pay</h4>
                <p>
                  Many employers pay their workers every week or every two weeks. Weekly paychecks mean 52 payments per year, while bi-weekly schedules result in 26 paychecks annually. Here's something interesting that catches people off guard—if you're paid bi-weekly, there are two months each year where you'll receive three paychecks instead of two. Those extra paycheck months can be great for catching up on bills or boosting your savings.
                </p>
                <p className="mt-3">
                  The main difference between these schedules is cash flow management. Weekly pay provides more frequent income, which some people find easier to budget with. Bi-weekly pay means slightly larger paychecks, but you need to stretch them a bit further.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Semi-Monthly vs. Monthly</h4>
                <p>
                  Semi-monthly pay means you receive 24 paychecks per year—typically on the 1st and 15th of each month, or the 15th and last day. This is different from bi-weekly pay, even though both result in paychecks twice a month most of the time. The key distinction is that semi-monthly paychecks are always the same amount and arrive on the same dates, whereas bi-weekly schedules shift based on the calendar.
                </p>
                <p className="mt-3">
                  Monthly pay is less common in the United States but more prevalent in other countries. You receive 12 paychecks per year, usually at the end or beginning of each month. While this means larger individual paychecks, it requires more disciplined budgeting since you need to make your money last the entire month.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Annual Salary</h4>
                <p>
                  When you're offered a salaried position, compensation is typically discussed in annual terms. Someone might say they make $62,400 per year, even though they never actually receive that amount in a single payment. This annual figure is then divided across your pay periods. The benefit of a salary is income stability—you know exactly what you'll earn regardless of how many hours you work in a given week.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Math Behind Salary Conversions</h3>
                <p>
                  Converting between different pay frequencies requires understanding a few key assumptions. The standard calculation uses a year with 52 weeks, which contains 260 weekdays if you work five days per week. Your hourly rate multiplied by your hours per week, then multiplied by 52 weeks, gives you your annual salary before accounting for time off.
                </p>
                <p className="mt-3">
                  Let's walk through a real example. Say you earn $30 per hour and work 40 hours per week across five days. That means you work eight hours per day. Your daily rate would be $240 (8 hours × $30). Your weekly income is $1,200 (40 hours × $30). Multiply that weekly figure by 52, and you get an annual salary of $62,400.
                </p>
                <p className="mt-3">
                  But here's where it gets interesting—that $62,400 assumes you work every single weekday all year long. In reality, most people get holidays and vacation time. If you have 10 paid holidays and 15 vacation days, that's 25 days you're not actually working. Subtract those from the 260 weekdays, and you're really working 235 days. At eight hours per day and $30 per hour, your adjusted annual income is $56,400.
                </p>
                <p className="mt-3">
                  This distinction matters when you're evaluating job offers or planning your finances. Two positions might advertise the same annual salary, but if one offers significantly more paid time off, you're actually getting paid more per hour worked at that job.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Why Time Off Matters</h3>
                <p>
                  The difference between unadjusted and adjusted salary highlights something important about employment compensation—it's not just about the base pay. Benefits like vacation time and holidays directly affect your effective hourly rate. Using our earlier example, the unadjusted calculation showed an annual salary of $62,400. After accounting for 25 days off, the adjusted figure is $56,400. That's a difference of $6,000.
                </p>
                <p className="mt-3">
                  Think about what this means when comparing job offers. Imagine two companies both offering $60,000 per year. Company A provides two weeks of vacation and six holidays. Company B offers four weeks of vacation and 12 holidays. Even though the advertised salary is identical, you're actually working fewer hours at Company B for the same annual compensation, making your effective hourly rate higher.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Standard U.S. Vacation and Holiday Policies</h4>
                <p>
                  In the United States, there's no federal requirement for employers to provide paid vacation or holidays, which sets America apart from most developed nations. Despite this, competitive companies typically offer somewhere between 10 and 20 vacation days per year, with newer employees starting at the lower end of that range.
                </p>
                <p className="mt-3">
                  For holidays, most businesses observe around 10 federal holidays—New Year's Day, Martin Luther King Jr. Day, Presidents' Day, Memorial Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, and Christmas. Some companies are more generous, while others offer fewer. It's not unusual for employees to negotiate additional vacation days as part of their compensation package, especially at higher levels.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Salaried vs. Hourly: What's the Difference?</h3>
                <p>
                  The distinction between salaried and hourly workers goes beyond just how you calculate pay. These classifications come with different legal protections and expectations. In the United States, this distinction is primarily governed by the Fair Labor Standards Act (FLSA), which determines whether you're "exempt" or "non-exempt" from overtime regulations.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Hourly Workers (Non-Exempt)</h4>
                <p>
                  If you're an hourly worker, you're typically classified as non-exempt, which means you're entitled to overtime pay. Any hours worked beyond 40 in a single workweek must be compensated at least 1.5 times your regular rate. Work 45 hours in a week at $30 per hour, and you'll earn your regular $1,200 for the first 40 hours, plus $225 for the additional five hours at $45 per hour.
                </p>
                <p className="mt-3">
                  Hourly workers also have more rigid protections around working time. Your employer must track your hours, provide meal breaks in many states, and pay you for every minute worked. This creates a clear boundary between work time and personal time.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Salaried Workers (Often Exempt)</h4>
                <p>
                  Salaried employees typically receive the same paycheck regardless of how many hours they work. If you're exempt from overtime, you might work 35 hours one week and 50 hours the next, but your compensation stays constant. This arrangement offers flexibility but can also mean unpaid extra hours during busy periods.
                </p>
                <p className="mt-3">
                  To be classified as exempt, you generally need to meet certain criteria: you must be paid at least $684 per week ($35,568 annually), receive your pay on a salary basis (meaning it doesn't fluctuate with hours worked), and perform exempt job duties. These duties typically involve executive, administrative, or professional work that requires discretion and independent judgment.
                </p>
                <p className="mt-3">
                  Not all salaried employees are exempt from overtime, though. Some receive a salary for the convenience of predictable paychecks but still qualify for overtime pay based on their job duties. This is something to clarify when accepting a salaried position.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using Salary Calculators Effectively</h3>
                <p>
                  A salary calculator is useful for more than just converting between pay periods. It's a powerful tool for financial planning and decision-making. When you're considering a new job, don't just look at the advertised salary—input the details into a calculator to understand what you'll actually take home per paycheck. Factor in the benefits, time off, and work schedule to get the complete picture.
                </p>
                <p className="mt-3">
                  These calculators are also valuable for freelancers and contractors setting their rates. If you want to earn the equivalent of a $75,000 annual salary but you're paid hourly and won't receive benefits or paid time off, you need to charge significantly more than $36 per hour to account for the time you won't be working and the benefits you'll need to provide yourself.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Budgeting with Your Results</h4>
                <p>
                  Once you know your salary across different time periods, you can build a realistic budget. If you're paid bi-weekly, knowing your monthly equivalent helps you plan for fixed monthly expenses like rent or car payments. Understanding your hourly rate makes it easier to evaluate whether overtime or a second job is worth your time.
                </p>
                <p className="mt-3">
                  Remember that the figures from a salary calculator represent gross pay—the amount before taxes and deductions. Your actual take-home pay will be lower after federal income tax, state income tax (if applicable), Social Security, Medicare, health insurance, retirement contributions, and other deductions. Most people take home somewhere between 70% and 80% of their gross salary, though this varies widely based on your situation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Negotiating Your Salary</h3>
                <p>
                  Understanding salary calculations gives you leverage when negotiating compensation. Instead of accepting a number at face value, you can discuss the full package—base pay, bonuses, vacation time, holidays, flexible scheduling, and other benefits. Sometimes employers have limited flexibility on base salary but can offer additional vacation days or other perks that effectively increase your total compensation.
                </p>
                <p className="mt-3">
                  When you receive a job offer, don't be afraid to ask for time to evaluate it. Use a salary calculator to break down the offer into different time periods. Compare it to your current compensation or other offers you're considering. Look at the adjusted figures that account for time off. This comprehensive analysis helps you make an informed decision rather than relying on gut feeling or the attractiveness of a large annual number.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Beyond Base Salary</h4>
                <p>
                  Total compensation extends well beyond your base salary. Health insurance can be worth thousands of dollars annually. Retirement benefits like employer 401(k) matching essentially increase your effective compensation. Stock options, profit sharing, bonuses, and commissions can substantially boost your earnings. Professional development opportunities, remote work options, and flexible scheduling have real monetary value even if they don't show up on your paycheck.
                </p>
                <p className="mt-3">
                  When evaluating a job opportunity, calculate the value of these additional benefits. An employer who matches 5% of your salary in your 401(k) is effectively giving you a 5% raise. Premium health insurance that costs your employer $15,000 annually but only costs you $3,000 in premiums represents $12,000 in additional compensation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Misconceptions About Salary</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Higher Salary Always Means More Money</h4>
                <p>
                  Not necessarily. A higher gross salary might push you into a higher tax bracket, reducing your take-home percentage. It might also come with fewer benefits, requiring you to spend more on health insurance or retirement savings. Sometimes a slightly lower salary with excellent benefits and generous time off is the better financial choice.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Bi-Weekly and Semi-Monthly Are the Same</h4>
                <p>
                  This is a common confusion. Bi-weekly means every two weeks (26 pay periods per year), while semi-monthly means twice per month (24 pay periods per year). If you're paid $2,000 bi-weekly, your annual salary is $52,000. If you're paid $2,000 semi-monthly, your annual salary is $48,000. The difference matters.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Salaried Workers Can't Get Overtime</h4>
                <p>
                  While many salaried workers are exempt from overtime, not all are. The exemption depends on your job duties and salary level, not just the fact that you receive a salary. Some salaried positions are non-exempt and qualify for overtime pay for hours worked beyond 40 per week.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Your Hourly Rate Is Your Annual Salary Divided by 2,000</h4>
                <p>
                  This shortcut (assuming 50 weeks of work at 40 hours per week) is close but not exact. It doesn't account for the actual 52 weeks in a year or your specific work schedule and time off. For precision, use the actual calculation based on your hours and days worked.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">International Perspectives on Salary and Benefits</h3>
                <p>
                  The United States has a unique approach to employment compensation compared to many other developed nations. In most European countries, employers are legally required to provide four to six weeks of paid vacation, paid sick leave, and paid parental leave. These benefits are considered standard rather than perks.
                </p>
                <p className="mt-3">
                  When comparing salaries internationally, you need to consider these benefit differences. A $70,000 salary in the U.S. might seem higher than a £50,000 salary in the UK (roughly $65,000), but the UK position likely includes significantly more time off, comprehensive healthcare through the National Health Service, and stronger employment protections. The effective value of the UK compensation package might actually exceed the U.S. offer.
                </p>
                <p className="mt-3">
                  Understanding these differences is particularly important if you're considering international job opportunities or working for a global company. What's considered generous in one country might be standard or even minimal in another.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
              <CardTitle className="text-xl">Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/income-tax" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Income Tax Calculator</div>
                    <div className="text-sm text-slate-600">Calculate your take-home pay</div>
                  </div>
                </Link>
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Retirement Calculator</div>
                    <div className="text-sm text-slate-600">Plan your retirement savings</div>
                  </div>
                </Link>
                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Briefcase className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-600">Calculate investment returns</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Loan Calculator</div>
                    <div className="text-sm text-slate-600">Calculate loan payments</div>
                  </div>
                </Link>
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
            © 2025 Calc-Tech.com. All rights reserved. Made with ❤️ for accuracy
          </p>
        </div>
      </footer>
    </div>
  );
}
