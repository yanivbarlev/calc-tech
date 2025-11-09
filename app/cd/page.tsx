"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, TrendingUp, PiggyBank, DollarSign, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CDResults {
  endBalance: number;
  totalInterest: number;
  principal: number;
  effectiveRate: number;
  monthlyInterestAvg: number;
  totalMonths: number;
}

interface AccumulationEntry {
  month: number;
  year: number;
  deposit: number;
  interestEarned: number;
  endingBalance: number;
}

export default function CDCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("4.89");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("monthly");
  const [depositYears, setDepositYears] = useState<string>("3");
  const [depositMonths, setDepositMonths] = useState<string>("0");
  const [marginalTaxRate, setMarginalTaxRate] = useState<string>("0");

  const [results, setResults] = useState<CDResults | null>(null);
  const [schedule, setSchedule] = useState<AccumulationEntry[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculate = () => {
    const principal = parseFloat(initialDeposit) || 10000;
    const rate = (parseFloat(interestRate) || 4.89) / 100;
    const years = parseFloat(depositYears) || 3;
    const months = parseFloat(depositMonths) || 0;
    const taxRate = (parseFloat(marginalTaxRate) || 0) / 100;

    const totalMonths = years * 12 + months;
    const totalYears = totalMonths / 12;

    let compoundingsPerYear: number;
    let endBalance: number;

    // Calculate based on compounding frequency
    switch (compoundingFrequency) {
      case "annually":
        compoundingsPerYear = 1;
        endBalance = principal * Math.pow(1 + rate / compoundingsPerYear, compoundingsPerYear * totalYears);
        break;
      case "semiannually":
        compoundingsPerYear = 2;
        endBalance = principal * Math.pow(1 + rate / compoundingsPerYear, compoundingsPerYear * totalYears);
        break;
      case "quarterly":
        compoundingsPerYear = 4;
        endBalance = principal * Math.pow(1 + rate / compoundingsPerYear, compoundingsPerYear * totalYears);
        break;
      case "monthly":
        compoundingsPerYear = 12;
        endBalance = principal * Math.pow(1 + rate / compoundingsPerYear, compoundingsPerYear * totalYears);
        break;
      case "continuously":
        endBalance = principal * Math.exp(rate * totalYears);
        compoundingsPerYear = 0; // Special case
        break;
      default:
        compoundingsPerYear = 12;
        endBalance = principal * Math.pow(1 + rate / compoundingsPerYear, compoundingsPerYear * totalYears);
    }

    const totalInterest = endBalance - principal;
    const interestAfterTax = totalInterest * (1 - taxRate);
    const finalBalance = principal + interestAfterTax;

    const effectiveRate = ((endBalance / principal) ** (1 / totalYears) - 1) * 100;
    const monthlyInterestAvg = totalInterest / totalMonths;

    setResults({
      endBalance: taxRate > 0 ? finalBalance : endBalance,
      totalInterest: taxRate > 0 ? interestAfterTax : totalInterest,
      principal: principal,
      effectiveRate: effectiveRate,
      monthlyInterestAvg: monthlyInterestAvg,
      totalMonths: totalMonths,
    });

    // Generate accumulation schedule for monthly view
    if (compoundingFrequency !== "continuously") {
      const scheduleData: AccumulationEntry[] = [];
      let currentBalance = principal;
      const periodsPerMonth = compoundingsPerYear / 12;

      for (let month = 1; month <= totalMonths; month++) {
        const previousBalance = currentBalance;

        // Calculate interest for this month based on compounding frequency
        if (compoundingFrequency === "monthly") {
          currentBalance = previousBalance * (1 + rate / 12);
        } else if (compoundingFrequency === "quarterly" && month % 3 === 0) {
          currentBalance = previousBalance * (1 + rate / 4);
        } else if (compoundingFrequency === "semiannually" && month % 6 === 0) {
          currentBalance = previousBalance * (1 + rate / 2);
        } else if (compoundingFrequency === "annually" && month % 12 === 0) {
          currentBalance = previousBalance * (1 + rate);
        } else {
          // No compounding this month
          currentBalance = previousBalance;
        }

        const interestEarned = currentBalance - previousBalance;

        scheduleData.push({
          month: month,
          year: Math.floor((month - 1) / 12) + 1,
          deposit: month === 1 ? principal : 0,
          interestEarned: interestEarned,
          endingBalance: currentBalance,
        });
      }

      setSchedule(scheduleData);
    } else {
      setSchedule([]);
    }

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculate();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500">Financial Tools</div>
              </div>
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
            <PiggyBank className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            CD Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your certificate of deposit returns with different interest rates and compounding frequencies
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  CD Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Initial Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      className="pl-7"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Interest Rate (APY/APR)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="pr-7"
                      placeholder="4.89"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Compounding Frequency
                  </label>
                  <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually (APY)</SelectItem>
                      <SelectItem value="semiannually">Semiannually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly (APR)</SelectItem>
                      <SelectItem value="continuously">Continuously</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Years
                    </label>
                    <Input
                      type="number"
                      value={depositYears}
                      onChange={(e) => setDepositYears(e.target.value)}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Months
                    </label>
                    <Input
                      type="number"
                      value={depositMonths}
                      onChange={(e) => setDepositMonths(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Marginal Tax Rate (Optional)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={marginalTaxRate}
                      onChange={(e) => setMarginalTaxRate(e.target.value)}
                      className="pr-7"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-3 text-slate-500">%</span>
                  </div>
                </div>

                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate CD Returns
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Results */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Final CD Value</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.endBalance)}</p>
                    <p className="text-emerald-100">
                      After {results.totalMonths} months ({(results.totalMonths / 12).toFixed(1)} years)
                    </p>
                  </div>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Interest Earned</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {formatCurrency(results.totalInterest)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Initial Deposit</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {formatCurrency(results.principal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Breakdown Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Interest Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Effective Annual Rate:</span>
                        <span className="font-semibold text-slate-800">
                          {formatPercentage(results.effectiveRate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Average Monthly Interest:</span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(results.monthlyInterestAvg)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Interest as % of Principal:</span>
                        <span className="font-semibold text-slate-800">
                          {((results.totalInterest / results.principal) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        CD Term Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Total Months:</span>
                        <span className="font-semibold text-slate-800">{results.totalMonths}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Compounding:</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {compoundingFrequency}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Annual Rate:</span>
                        <span className="font-semibold text-emerald-600">
                          {formatPercentage(parseFloat(interestRate))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Accumulation Schedule */}
                {schedule.length > 0 && (
                  <Card className="border-2 rounded-2xl shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Accumulation Schedule</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSchedule(!showSchedule)}
                        >
                          {showSchedule ? "Hide" : "Show"} Details
                        </Button>
                      </div>
                    </CardHeader>
                    {showSchedule && (
                      <CardContent className="pt-6">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                                  Month
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                                  Year
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                                  Deposit
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                                  Interest
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                                  Balance
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {schedule.map((entry, index) => (
                                <tr
                                  key={index}
                                  className={`border-b hover:bg-slate-50 ${
                                    entry.month % 12 === 0 ? "bg-emerald-50 font-semibold" : ""
                                  }`}
                                >
                                  <td className="py-3 px-4 text-sm">{entry.month}</td>
                                  <td className="py-3 px-4 text-sm">{entry.year}</td>
                                  <td className="py-3 px-4 text-sm text-right">
                                    {entry.deposit > 0 ? formatCurrency(entry.deposit) : "-"}
                                  </td>
                                  <td className="py-3 px-4 text-sm text-right text-emerald-600">
                                    {formatCurrency(entry.interestEarned)}
                                  </td>
                                  <td className="py-3 px-4 text-sm text-right font-semibold">
                                    {formatCurrency(entry.endingBalance)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to Calculate</h3>
                <p className="text-slate-500">Enter your CD details and click calculate to see results</p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Certificates of Deposit</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Certificate of Deposit?</h3>
                <p>
                  A certificate of deposit, often called a CD, is a type of savings account where you deposit money for a fixed period in exchange for a guaranteed interest rate. Think of it as making a deal with your bank: you promise not to touch your money for a certain amount of time, and in return, the bank promises to pay you a better interest rate than you'd get with a regular savings account.
                </p>
                <p className="mt-3">
                  CDs are one of the safest investments you can make. They're insured by the FDIC up to $250,000 per depositor, per institution, which means your money is protected even if the bank fails. This makes them particularly attractive for conservative investors or anyone looking to preserve capital while earning a modest return.
                </p>
                <p className="mt-3">
                  The typical CD term ranges anywhere from three months to five years, though some banks offer terms as short as one month or as long as ten years. Generally speaking, the longer you're willing to lock up your money, the higher the interest rate you'll receive. That premium compensates you for giving up access to your funds during the CD's term.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How CD Interest Works</h3>
                <p>
                  When you open a CD, you'll encounter two important rate terms: APY and APR. The Annual Percentage Yield (APY) reflects the actual amount you'll earn in one year after accounting for compound interest. The Annual Percentage Rate (APR) is the simple interest rate without considering compounding effects. For CDs that compound monthly or quarterly, the APY will be slightly higher than the APR.
                </p>
                <p className="mt-3">
                  Compounding frequency makes a real difference in your returns. Let's say you invest $10,000 at 5% interest for one year. With annual compounding, you'd earn exactly $500. But with monthly compounding, you'd earn about $512 because each month's interest starts earning interest of its own. It's not a massive difference on smaller balances, but it adds up over time and with larger deposits.
                </p>
                <p className="mt-3">
                  Most banks credit your CD interest monthly, even if they only compound it quarterly or annually. This means you can see your balance growing throughout the term, which is satisfying to watch. Some institutions even allow you to transfer these interest payments to another account, though this typically results in a slightly lower APY.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Shopping for the Best CD Rates</h3>
                <p>
                  CD rates fluctuate based on broader economic conditions, particularly the Federal Reserve's monetary policy decisions. When the Fed raises interest rates to combat inflation, CD rates typically climb. Conversely, when the Fed cuts rates to stimulate economic growth, CD rates tend to fall. This means timing matters when you're shopping for a CD.
                </p>
                <p className="mt-3">
                  Online banks often offer significantly better CD rates than traditional brick-and-mortar institutions. They have lower overhead costs and can pass those savings on to depositors through higher yields. It's not unusual to find online CD rates that are 0.5% to 1% higher than what your local bank offers. Just make sure any institution you choose is FDIC-insured before opening an account.
                </p>
                <p className="mt-3">
                  Credit unions can also be excellent places to find competitive CD rates. They often refer to CDs as "share certificates," but they work the same way. Credit union deposits are insured by the NCUA (National Credit Union Administration) rather than the FDIC, but the protection is equivalent—up to $250,000 per depositor.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Early Withdrawal Penalties</h3>
                <p>
                  Here's the catch with CDs: if you need your money before the term ends, you'll typically pay an early withdrawal penalty. These penalties vary by institution and CD term, but they commonly range from three months of interest for shorter-term CDs to twelve months of interest for longer terms. In some cases, if you withdraw very early in the CD's life, you could actually lose some of your principal.
                </p>
                <p className="mt-3">
                  That's why it's crucial to only deposit money you're confident you won't need during the CD's term. Emergency funds, for instance, don't belong in CDs. You want those accessible at all times. CDs work best for money you're setting aside for a specific future goal—maybe a down payment on a house in two years, or a college tuition payment you know is coming in eighteen months.
                </p>
                <p className="mt-3">
                  Some banks offer "no-penalty CDs" that let you withdraw your money without fees, though these typically come with lower interest rates. There are also "liquid CDs" or "breakable CDs" that allow one penalty-free withdrawal. These options provide more flexibility but sacrifice some yield in exchange.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Types of CDs Available</h3>

                <h4 className="font-semibold text-lg mb-2 mt-4">Traditional CDs</h4>
                <p>
                  The standard CD comes with a fixed rate for the entire term. You deposit your money, it earns interest at the specified rate, and you get your principal plus interest back at maturity. Simple and straightforward, these make up the majority of CDs offered.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Bump-Up CDs</h4>
                <p>
                  These give you the option to "bump up" your interest rate once or twice during the CD's term if rates rise. You'll typically start with a slightly lower rate than a traditional CD, but you have protection against rising rates. If rates go up significantly, you can request the higher rate. If they don't, you're stuck with the lower rate.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Step-Up CDs</h4>
                <p>
                  Similar to bump-up CDs, but the rate increases happen automatically at predetermined intervals. For example, a three-year step-up CD might start at 3%, increase to 3.5% after one year, and jump to 4% after two years. These can be attractive in a rising rate environment.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Callable CDs</h4>
                <p>
                  These typically offer higher rates than traditional CDs, but there's a catch: the bank can "call" (terminate) the CD after an initial period if interest rates fall. You get your principal back plus any accrued interest, but you lose the high rate for the remaining term. The bank essentially has an escape clause.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Zero-Coupon CDs</h4>
                <p>
                  Instead of paying periodic interest, these CDs are purchased at a discount and mature at face value. For example, you might pay $9,000 for a zero-coupon CD that will be worth $10,000 at maturity. The $1,000 difference represents your interest earnings. These can have tax implications since you may owe taxes on the "phantom income" each year even though you haven't received any cash.
                </p>

                <h4 className="font-semibold text-lg mb-2 mt-4">Brokered CDs</h4>
                <p>
                  Sold through brokerage firms rather than directly by banks, these CDs can sometimes offer higher rates because brokers shop around among multiple banks. They're FDIC-insured just like regular CDs, but they work a bit differently. You can potentially sell a brokered CD before maturity on a secondary market, avoiding early withdrawal penalties, though you might get less than your principal if interest rates have risen since you bought it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">CD Laddering Strategy</h3>
                <p>
                  One of the smartest ways to use CDs is through a strategy called "laddering." Instead of putting all your money into a single CD, you split it across multiple CDs with different maturity dates. For example, you might divide $15,000 into three $5,000 CDs: one with a one-year term, one with a two-year term, and one with a three-year term.
                </p>
                <p className="mt-3">
                  Here's why this works well: you get access to some of your money each year when a CD matures, providing liquidity and flexibility. When the one-year CD matures, you can either use that money or reinvest it in a new three-year CD at current rates. The next year, when your original two-year CD matures, you do the same thing. Eventually, you have CDs maturing every year, all earning the higher rates that come with longer terms.
                </p>
                <p className="mt-3">
                  Laddering also protects you against interest rate risk. If rates are rising, you'll have money becoming available regularly that you can reinvest at higher rates. If rates are falling, you've already locked in good rates on your longer-term CDs. It's a balanced approach that works in various rate environments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tax Considerations</h3>
                <p>
                  CD interest is taxable as ordinary income in the year it's earned, even if you don't withdraw it. Your bank will send you a 1099-INT form each year showing how much interest you earned. This gets added to your taxable income and taxed at your marginal tax rate. For high earners, this can significantly reduce the effective return on a CD.
                </p>
                <p className="mt-3">
                  Let's run some numbers. If you're in the 24% federal tax bracket and you earn $500 in CD interest, you'll owe about $120 in federal taxes. Depending on where you live, you might owe state taxes too. So your after-tax return is actually $380, not $500. This is why it's important to consider your tax situation when comparing CDs to other investment options.
                </p>
                <p className="mt-3">
                  One strategy to defer taxes is opening a CD within an IRA (Individual Retirement Account). Traditional IRA CDs let you deduct your contribution from your current year's taxes, and the interest grows tax-deferred until retirement. Roth IRA CDs are funded with after-tax dollars, but all earnings are tax-free in retirement. Both options can make CDs more attractive from a tax perspective.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">When CDs Make Sense</h3>
                <p>
                  CDs shine in several specific situations. They're excellent for short to medium-term savings goals where you know exactly when you'll need the money. Saving for a wedding in two years? A 24-month CD ensures your money grows safely while you wait. Planning a vacation or major purchase? CDs provide predictable returns without market volatility.
                </p>
                <p className="mt-3">
                  They're also valuable as part of a diversified portfolio, particularly for retirees who need stable, predictable income. While stocks might offer higher long-term returns, CDs provide certainty that can be comforting when you're living off your savings. Many financial advisors recommend keeping 3-5 years of living expenses in safe assets like CDs if you're retired or approaching retirement.
                </p>
                <p className="mt-3">
                  However, CDs aren't ideal for everyone or every situation. If you're young and saving for retirement that's decades away, the stock market will almost certainly provide better returns over that time horizon. If you might need the money soon, a high-yield savings account offers comparable rates with complete flexibility. And if you're in a high tax bracket, municipal bonds might provide better after-tax returns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Alternatives to Consider</h3>
                <p>
                  High-yield savings accounts have become serious competitors to short-term CDs. Many online banks now offer savings account rates that match or exceed short-term CD rates, with the added benefit of liquidity. You can withdraw your money anytime without penalty, making them more flexible for emergency funds or money you might need on short notice.
                </p>
                <p className="mt-3">
                  Money market accounts provide another alternative, often with competitive rates and limited check-writing privileges. They're typically insured like savings accounts and CDs, offering the same safety while providing a bit more access to your funds. Some money market accounts even come with ATM cards.
                </p>
                <p className="mt-3">
                  For those willing to take on more risk in exchange for potentially higher returns, Treasury bonds and notes offer another option. These government securities are backed by the full faith and credit of the U.S. government, making them extremely safe. Treasury bonds typically pay higher rates than CDs for comparable terms, and the interest is exempt from state and local taxes. However, if you need to sell before maturity, the value can fluctuate based on current interest rates.
                </p>
                <p className="mt-3">
                  Corporate bonds can offer even higher yields, though they come with credit risk—the chance that the company might default. Investment-grade corporate bonds from stable companies can be a middle ground between the safety of CDs and the higher potential returns of stocks. Just remember that unlike CDs, bonds can lose value if interest rates rise and you need to sell before maturity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Making Your CD Decision</h3>
                <p>
                  Before opening a CD, start by asking yourself when you'll need the money. If there's any chance you'll need it before the term ends, choose a shorter-term CD or stick with a savings account. The penalty for early withdrawal can wipe out months or even years of interest earnings, making the CD worse than if you'd just kept the money in savings.
                </p>
                <p className="mt-3">
                  Shop around aggressively for the best rate. A difference of just 0.5% might not sound like much, but on a $25,000 CD over three years, that's an extra $375 in your pocket. Check online banks, credit unions, and comparison websites. Don't just accept whatever rate your current bank offers—chances are you can do better.
                </p>
                <p className="mt-3">
                  Consider your overall financial picture. Do you have an adequate emergency fund in easily accessible accounts? Are you maximizing tax-advantaged retirement contributions? CDs shouldn't come before these priorities. But once those bases are covered, CDs can be an excellent tool for safely growing money you'll need in the foreseeable future.
                </p>
                <p className="mt-3">
                  Finally, read the fine print carefully before committing. Understand the exact terms: when does the CD mature, how is interest credited, what's the penalty for early withdrawal, and what happens at maturity if you don't give instructions? Some banks automatically renew CDs at potentially lower rates unless you opt out, so mark your calendar and review your options as the maturity date approaches.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">The Bottom Line</h3>
                <p>
                  Certificates of deposit remain a cornerstone of conservative investing and smart cash management. They won't make you rich overnight, but that's not their purpose. They provide safety, predictability, and guaranteed returns—qualities that become increasingly valuable as you approach major financial goals or need stability in your portfolio.
                </p>
                <p className="mt-3">
                  In today's economic environment, where interest rates have risen from historic lows, CDs have become more attractive than they've been in over a decade. It's not uncommon to find five-year CDs paying 4% or more, which represents real purchasing power growth when inflation is moderate. For money you don't need immediately but want to preserve and grow safely, CDs deserve serious consideration.
                </p>
                <p className="mt-3">
                  Use this calculator to experiment with different scenarios. Try various deposit amounts, terms, and interest rates to see how your money could grow. Compare the results with other savings vehicles you're considering. Armed with this information and a clear understanding of how CDs work, you'll be well-equipped to decide if a certificate of deposit deserves a place in your financial strategy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl">Related Financial Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/savings" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Savings Calculator
                </Link>
                <Link href="/compound-interest" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Compound Interest Calculator
                </Link>
                <Link href="/investment" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Investment Calculator
                </Link>
                <Link href="/interest-rate" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Interest Rate Calculator
                </Link>
                <Link href="/roi" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  ROI Calculator
                </Link>
                <Link href="/retirement" className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Retirement Calculator
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
            <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500">
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy and simplicity.
          </p>
        </div>
      </footer>
    </div>
  );
}
