"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Receipt, TrendingUp, Info } from "lucide-react";

interface SalesTaxResults {
  beforeTax: number;
  taxRate: number;
  afterTax: number;
  taxAmount: number;
}

export default function SalesTaxCalculator() {
  // Input states
  const [beforeTaxPrice, setBeforeTaxPrice] = useState<string>("100");
  const [taxRate, setTaxRate] = useState<string>("7.5");
  const [afterTaxPrice, setAfterTaxPrice] = useState<string>("");
  const [calculationMode, setCalculationMode] = useState<"addTax" | "removeTax" | "findRate">("addTax");

  const [results, setResults] = useState<SalesTaxResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Calculate sales tax
  const calculate = () => {
    const before = parseFloat(beforeTaxPrice) || 0;
    const rate = parseFloat(taxRate) || 0;
    const after = parseFloat(afterTaxPrice) || 0;

    let resultBeforeTax = 0;
    let resultTaxRate = 0;
    let resultAfterTax = 0;
    let resultTaxAmount = 0;

    if (calculationMode === "addTax") {
      // Calculate final price from before-tax price and tax rate
      resultBeforeTax = before;
      resultTaxRate = rate;
      resultTaxAmount = (before * rate) / 100;
      resultAfterTax = before + resultTaxAmount;
    } else if (calculationMode === "removeTax") {
      // Calculate before-tax price from after-tax price and tax rate
      resultAfterTax = after;
      resultTaxRate = rate;
      resultBeforeTax = after / (1 + rate / 100);
      resultTaxAmount = after - resultBeforeTax;
    } else if (calculationMode === "findRate") {
      // Calculate tax rate from before and after prices
      resultBeforeTax = before;
      resultAfterTax = after;
      if (before > 0) {
        resultTaxAmount = after - before;
        resultTaxRate = (resultTaxAmount / before) * 100;
      }
    }

    setResults({
      beforeTax: resultBeforeTax,
      taxRate: resultTaxRate,
      afterTax: resultAfterTax,
      taxAmount: resultTaxAmount,
    });

    setHasCalculated(true);
  };

  // Auto-calculate on page load
  useEffect(() => {
    if (!hasCalculated) {
      calculate();
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(3)}%`;
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
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Calc-Tech.com
                </div>
                <div className="text-xs text-slate-500 -mt-1">Professional Tools</div>
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
            <Receipt className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Sales Tax Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate sales tax, determine pre-tax prices, or find tax rates with ease
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {/* Left Sidebar: Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Calculation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Calculation Mode Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    What do you want to calculate?
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setCalculationMode("addTax")}
                      className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                        calculationMode === "addTax"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Calculate Final Price (Add Tax)
                    </button>
                    <button
                      onClick={() => setCalculationMode("removeTax")}
                      className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                        calculationMode === "removeTax"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Calculate Original Price (Remove Tax)
                    </button>
                    <button
                      onClick={() => setCalculationMode("findRate")}
                      className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                        calculationMode === "findRate"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Find Tax Rate
                    </button>
                  </div>
                </div>

                {/* Input Fields Based on Mode */}
                {calculationMode === "addTax" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Before Tax Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={beforeTaxPrice}
                          onChange={(e) => setBeforeTaxPrice(e.target.value)}
                          placeholder="100.00"
                          className="pl-7"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Sales Tax Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={taxRate}
                          onChange={(e) => setTaxRate(e.target.value)}
                          placeholder="7.5"
                          className="pr-7"
                          step="0.001"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>
                  </>
                )}

                {calculationMode === "removeTax" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        After Tax Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={afterTaxPrice}
                          onChange={(e) => setAfterTaxPrice(e.target.value)}
                          placeholder="107.50"
                          className="pl-7"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Sales Tax Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={taxRate}
                          onChange={(e) => setTaxRate(e.target.value)}
                          placeholder="7.5"
                          className="pr-7"
                          step="0.001"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </div>
                    </div>
                  </>
                )}

                {calculationMode === "findRate" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Before Tax Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={beforeTaxPrice}
                          onChange={(e) => setBeforeTaxPrice(e.target.value)}
                          placeholder="100.00"
                          className="pl-7"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        After Tax Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={afterTaxPrice}
                          onChange={(e) => setAfterTaxPrice(e.target.value)}
                          placeholder="107.50"
                          className="pl-7"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
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
                      <Receipt className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">
                        {calculationMode === "addTax" && "Final Price (After Tax)"}
                        {calculationMode === "removeTax" && "Original Price (Before Tax)"}
                        {calculationMode === "findRate" && "Sales Tax Rate"}
                      </h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {calculationMode === "findRate"
                        ? formatPercentage(results.taxRate)
                        : formatCurrency(calculationMode === "addTax" ? results.afterTax : results.beforeTax)
                      }
                    </p>
                    <p className="text-emerald-100">
                      {calculationMode === "addTax" && `Tax Amount: ${formatCurrency(results.taxAmount)}`}
                      {calculationMode === "removeTax" && `Tax Amount: ${formatCurrency(results.taxAmount)}`}
                      {calculationMode === "findRate" && `Tax Amount: ${formatCurrency(results.taxAmount)}`}
                    </p>
                  </div>
                </Card>

                {/* Breakdown Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Price Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Before Tax:</span>
                        <span className="font-semibold text-lg">{formatCurrency(results.beforeTax)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Tax Amount:</span>
                        <span className="font-semibold text-lg text-emerald-600">{formatCurrency(results.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-emerald-50 -mx-6 px-6 rounded-lg">
                        <span className="text-slate-700 font-semibold">After Tax:</span>
                        <span className="font-bold text-xl text-emerald-700">{formatCurrency(results.afterTax)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        Tax Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Tax Rate:</span>
                        <span className="font-semibold text-lg">{formatPercentage(results.taxRate)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-600">Tax Percentage:</span>
                        <span className="font-semibold text-lg">{results.taxRate.toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Tax Multiplier:</span>
                        <span className="font-semibold text-lg">{(1 + results.taxRate / 100).toFixed(5)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Tip */}
                <Card className="border-2 border-blue-200 rounded-2xl shadow-md bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Quick Tip</h4>
                        <p className="text-sm text-blue-800">
                          {calculationMode === "addTax" && "To calculate the final price, multiply the before-tax price by (1 + tax rate/100)."}
                          {calculationMode === "removeTax" && "To find the original price, divide the after-tax price by (1 + tax rate/100)."}
                          {calculationMode === "findRate" && "The tax rate is calculated as: ((After Tax - Before Tax) / Before Tax) × 100."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Receipt className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your values and click Calculate to see the results
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Sales Tax</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is Sales Tax?</h3>
                <p>
                  Sales tax is a consumption-based tax that gets tacked onto the purchase price of goods and services. When you buy something at a store or online, the retailer collects this tax on behalf of the government and later remits it to the appropriate tax authority. Think of it as the government's way of generating revenue from consumer spending rather than income alone.
                </p>
                <p className="mt-3">
                  Unlike income tax that comes out of your paycheck, sales tax hits you at the point of purchase. You'll see it added to your receipt, and while it might seem like just another line item, these small percentages add up significantly over time. The rate you pay depends entirely on where you're making the purchase—both the state and sometimes even the city or county can impose their own rates.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">How Sales Tax Works in the United States</h3>
                <p>
                  Here's something that surprises many people: there's no federal sales tax in the United States. That's right—the federal government doesn't collect sales tax at all. Instead, this revenue stream belongs to state and local governments. Currently, 45 states impose some form of sales tax, while five states have chosen to go without: Alaska, Delaware, Montana, New Hampshire, and Oregon.
                </p>
                <p className="mt-3">
                  But here's where it gets interesting. Even in states without a statewide sales tax, local jurisdictions might still charge their own. Alaska, for instance, has no state-level sales tax, but many of its municipalities levy local sales taxes. The rates you'll encounter range from zero percent in those five tax-free states to over 10% in some California cities when you combine state, county, and city taxes together.
                </p>
                <p className="mt-3">
                  Sales tax represents a major revenue source for state governments—accounting for nearly one-third of their total income. States use these funds to pay for public services like education, infrastructure, emergency services, and healthcare programs. That's why you'll often see rates adjust during budget crises or when states need to fund major initiatives.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">State-by-State Sales Tax Rates</h3>
                <p>
                  The variation in sales tax rates across the country is pretty remarkable. California and Louisiana currently tie for the highest combined state and local rates, reaching up to 10.50% in some jurisdictions. Tennessee follows close behind with rates approaching 10%. On the flip side, states like Colorado and Alabama maintain relatively modest rates in the 4-5% range for their base state tax.
                </p>
                <p className="mt-3">
                  What makes this even more complex is that the statewide rate you see advertised is rarely what you actually pay. Most states allow counties and cities to add their own sales taxes on top of the state rate. So while Georgia's state sales tax might be 4%, you could easily pay 8% or more in Atlanta when local rates get factored in. This is why two stores selling the exact same item can charge different final prices depending on which side of a county line they're located.
                </p>
                <p className="mt-3">
                  Some states also apply different rates to different categories of goods. Food, medicine, and clothing often receive preferential treatment with reduced rates or complete exemptions. Pennsylvania, for example, doesn't tax most clothing, while Minnesota exempts clothing but taxes shoes. These quirks mean you really need to pay attention to what you're buying and where.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">A Brief History of Sales Tax</h3>
                <p>
                  Sales tax is actually a relatively modern invention in American history. Mississippi became the first state to implement a sales tax back in 1930, right in the thick of the Great Depression. Why then? States were desperately searching for new revenue sources as property tax collections plummeted and income tax revenues dried up. Sales tax offered a way to generate income even when people weren't making much money—as long as they were buying things, the state got its cut.
                </p>
                <p className="mt-3">
                  The concept of taxing consumption, however, goes way back. Remember the Boston Tea Party? That wasn't just about tea—it was a protest against taxation without representation. The British Crown was imposing taxes on goods imported to the colonies, and Americans weren't having it. This resistance to consumption taxes played a significant role in sparking the American Revolution. It's ironic that a country born partly from opposition to these taxes now relies on them so heavily at the state level.
                </p>
                <p className="mt-3">
                  After Mississippi broke the ice, other states quickly followed suit throughout the 1930s. By the 1940s, sales tax had become a standard feature of state revenue systems. The expansion continued through the decades, with states gradually increasing rates and expanding the types of goods and services subject to taxation. Today, it's such an ingrained part of American commerce that most people don't give it a second thought—until they see that final total on their receipt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">VAT and GST: Sales Tax Around the World</h3>
                <p>
                  While the United States sticks with its sales tax system, most of the world uses something different: Value Added Tax (VAT) or Goods and Services Tax (GST). Over 160 countries have adopted VAT systems, and while they might seem similar to sales tax on the surface, they work quite differently behind the scenes.
                </p>
                <p className="mt-3">
                  The key difference lies in how the tax gets collected. Sales tax hits all at once at the final point of sale to the consumer. VAT, on the other hand, gets collected at each stage of production and distribution. When a manufacturer sells to a wholesaler, VAT is collected. When the wholesaler sells to a retailer, more VAT is collected (though the wholesaler gets credit for the VAT they already paid). Finally, when the retailer sells to you, the consumer, the final VAT is added. Each business in the chain only pays tax on the value they added.
                </p>
                <p className="mt-3">
                  Countries that use VAT include virtually all of Europe, Australia, India, and Canada. GST works similarly to VAT and is used in countries like India, Singapore, Canada, Australia, and Malaysia. European VAT rates can be surprisingly high—Denmark and Sweden charge 25%, while Hungary tops out at 27%. Compared to these rates, American sales tax starts to look pretty reasonable.
                </p>
                <p className="mt-3">
                  For Americans traveling abroad, VAT can be a pleasant surprise in one way: many countries allow tourists to claim VAT refunds on purchases they take out of the country. So that 20% VAT you paid on your shopping spree in Paris? You might be able to get most of it back at the airport before you fly home. Just keep your receipts and fill out the paperwork at the tax refund counter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Calculating Sales Tax: The Math Behind It</h3>
                <p>
                  The math for calculating sales tax is straightforward, though many people still get tripped up by it. To find the final price including tax, you multiply the pre-tax price by one plus the tax rate as a decimal. For a 7.5% tax rate, you'd multiply by 1.075. So a $100 item becomes $100 × 1.075 = $107.50. The tax amount itself is simply $7.50.
                </p>
                <p className="mt-3">
                  Going backwards—removing tax from a total price—requires division instead. If you know the final price was $107.50 and the tax rate was 7.5%, divide $107.50 by 1.075 to get the pre-tax price of $100. This comes in handy when you're looking at a receipt and want to know how much of your money went to the actual product versus to taxes.
                </p>
                <p className="mt-3">
                  Finding the tax rate when you know both prices is just as simple. Subtract the pre-tax price from the after-tax price to get the tax amount, then divide that by the pre-tax price and multiply by 100. Using our example: ($107.50 - $100) / $100 × 100 = 7.5%. This calculation is useful when you're trying to compare effective tax rates between different purchases or locations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Sales Tax Deductions on Federal Returns</h3>
                <p>
                  Here's something many taxpayers don't realize: you can potentially deduct sales tax on your federal income tax return. There's a catch, though—actually, several catches. First, you need to itemize your deductions rather than taking the standard deduction. For many people, especially after the Tax Cuts and Jobs Act significantly increased standard deduction amounts, itemizing doesn't make financial sense anymore.
                </p>
                <p className="mt-3">
                  Second, you have to choose between deducting state and local income taxes OR sales taxes—you can't deduct both. For people living in states with no income tax, like Florida or Texas, deducting sales tax is a no-brainer. For everyone else, you'll need to calculate which deduction gives you the bigger benefit. Generally, high earners in high-tax states come out ahead deducting income taxes, while lower earners or big spenders might benefit more from the sales tax deduction.
                </p>
                <p className="mt-3">
                  If you decide to deduct sales tax, you have two options for calculating it. The easy way is to use the IRS's optional sales tax tables, which provide standard deduction amounts based on your income and family size. The more accurate (but much more tedious) method involves actually tracking every single purchase you made all year and calculating the exact sales tax you paid. Unless you made some really major purchases—like a car or boat—the optional tables are usually the way to go.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Online Shopping and Sales Tax</h3>
                <p>
                  For years, online shopping offered a sales tax loophole. If you bought something from an out-of-state retailer with no physical presence in your state, they didn't have to collect sales tax. This gave online retailers a significant price advantage over brick-and-mortar stores. Technically, consumers were supposed to voluntarily pay "use tax" on these purchases, but almost nobody did.
                </p>
                <p className="mt-3">
                  That all changed with the 2018 Supreme Court decision in South Dakota v. Wayfair. The court ruled that states can require online retailers to collect sales tax even without a physical presence in the state. Now, when you shop on Amazon or most other major online retailers, you'll see sales tax added to your purchase just like you would in a physical store. States have been quick to implement these requirements, and the days of tax-free online shopping are largely over.
                </p>
                <p className="mt-3">
                  This shift has been a huge win for state budgets, bringing in billions in previously uncollected tax revenue. It's also leveled the playing field between online and traditional retailers, though it's made online shopping a bit more expensive for consumers. Some small online sellers still might not collect tax if they don't meet certain sales thresholds in your state, but that's becoming increasingly rare as states lower their collection requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Sales Tax Exemptions</h3>
                <p>
                  Not everything you buy is subject to sales tax, even in states that have it. Most states exempt certain necessities to avoid taxing people on their basic needs. Groceries typically get a pass—though what counts as a "grocery" can get complicated. That rotisserie chicken from the deli might be taxed as prepared food, while raw chicken from the meat department isn't. Restaurant meals almost always get taxed, but take-out food treatment varies.
                </p>
                <p className="mt-3">
                  Prescription medications are generally tax-exempt in all states, though over-the-counter medicines might or might not be taxed depending on where you live. Medical devices and equipment often receive exemptions too, particularly if they're prescribed by a doctor. This makes sense from a policy perspective—you don't want to make healthcare any more expensive than it already is.
                </p>
                <p className="mt-3">
                  Some states exempt clothing and footwear, either entirely or up to a certain price point. New York, for instance, doesn't tax clothing and footwear under $110, but luxury items above that threshold are taxed. Pennsylvania exempts most clothing outright. These exemptions reflect policy decisions about what goods should be considered necessities versus luxuries. Back-to-school shopping seasons often feature temporary sales tax holidays where normally taxed items become exempt for a weekend, encouraging spending while giving families a break.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Sales Tax vs. Use Tax</h3>
                <p>
                  Use tax is sales tax's lesser-known cousin, and most people don't even realize it exists. When you buy something and the seller doesn't collect sales tax—maybe you bought it out of state or from a small online seller—you're technically supposed to pay use tax to your home state at the same rate as the sales tax. The difference is you remit it yourself rather than having the seller collect it.
                </p>
                <p className="mt-3">
                  In practice, almost nobody voluntarily pays use tax on small purchases. States know this, which is why they've been so aggressive about requiring online retailers to collect sales tax instead. However, use tax does matter for big-ticket items. If you buy a car in a state with no sales tax and bring it back to your high-tax home state, you can bet the DMV will assess use tax when you register it. Same goes for boats, RVs, and other vehicles that require registration.
                </p>
                <p className="mt-3">
                  Some states have started adding a line to income tax returns asking about untaxed out-of-state purchases, putting taxpayers on the honor system. Compliance remains low, but it's technically the law. Businesses, on the other hand, are much more likely to properly pay use tax on their purchases since their books get audited. State tax authorities conduct use tax audits specifically looking for taxable purchases where sales tax wasn't collected.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Special Sales Tax Considerations</h3>
                <p>
                  Certain types of purchases come with their own special sales tax rules. Cars are a prime example—when you buy a vehicle, you'll pay sales tax based on either the state where you register it or where you take delivery, depending on state law. Some states offer trade-in credits, meaning you only pay tax on the difference between the new car's price and your trade-in value. This can save thousands of dollars on a vehicle purchase.
                </p>
                <p className="mt-3">
                  Real estate transactions typically don't involve sales tax, but they often include other transaction taxes with different names. Transfer taxes, recording fees, and documentary stamps serve similar purposes but fall under different legal frameworks. When you buy a house, you'll pay these instead of sales tax. Construction materials, however, do get sales taxed when contractors buy them, and this cost gets passed along in the contractor's price.
                </p>
                <p className="mt-3">
                  Services present another tricky area. Historically, most states only taxed goods, not services. That's changing rapidly as state economies shift from manufacturing to service-based industries. Some states now tax everything from haircuts to gym memberships, while others maintain the traditional goods-only approach. Professional services like legal and medical care typically remain exempt, but landscaping, auto repair, and personal services are increasingly falling under the sales tax umbrella. If you're budgeting for a service, it's worth checking whether your state taxes it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Tips for Managing Sales Tax</h3>
                <p>
                  If you run a business, staying on top of sales tax collection and remittance is crucial. The penalties for getting it wrong can be severe—states take sales tax very seriously since it's such a major revenue source. Many businesses use automated sales tax software that calculates the correct rate based on the buyer's location and handles the filing. Given how complex rates have become, especially with online sales to multiple states, automation is often worth the investment.
                </p>
                <p className="mt-3">
                  For consumers, the biggest tip is to factor sales tax into your budgeting, especially for major purchases. That $500 laptop is actually going to cost you $535 or more depending on your local rate. Online price comparisons should account for sales tax too—a slightly higher-priced seller in a low-tax state might actually cost you less overall than a cheaper seller in a high-tax jurisdiction.
                </p>
                <p className="mt-3">
                  If you're moving to a new state, research the sales tax situation before you go. That lower income tax might be offset by a much higher sales tax, especially if you're a big spender. Similarly, if you're planning a major purchase, it might be worth timing it around travel to a low-tax or no-tax state. Just make sure you understand the use tax implications before you try to save money this way—states have gotten wise to people making big purchases across state lines to avoid tax.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Calculators Section */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Related Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/income-tax" className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Calculator className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Income Tax Calculator</div>
                    <div className="text-sm text-slate-600">Calculate federal and state income taxes</div>
                  </div>
                </Link>
                <Link href="/retirement" className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Retirement Calculator</div>
                    <div className="text-sm text-slate-600">Plan for your retirement savings</div>
                  </div>
                </Link>
                <Link href="/investment" className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Investment Calculator</div>
                    <div className="text-sm text-slate-600">Calculate investment returns</div>
                  </div>
                </Link>
                <Link href="/inflation" className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors group">
                  <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Receipt className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Inflation Calculator</div>
                    <div className="text-sm text-slate-600">Calculate purchasing power over time</div>
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
            <Link href="/about" className="hover:text-emerald-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors font-medium">
              Contact
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
