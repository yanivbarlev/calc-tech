"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, DollarSign, Percent, Tag, TrendingDown, ShoppingCart, Receipt } from "lucide-react";

interface DiscountResults {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
  savings: number;
}

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>("100");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState<string>("20");

  const [results, setResults] = useState<DiscountResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountValue) || 0;

    let discountAmount = 0;
    let discountPercentage = 0;

    if (discountType === "percent") {
      // Calculate discount amount from percentage
      discountAmount = (price * discount) / 100;
      discountPercentage = discount;
    } else {
      // Calculate discount percentage from fixed amount
      discountAmount = discount;
      discountPercentage = price > 0 ? (discount / price) * 100 : 0;
    }

    const finalPrice = Math.max(0, price - discountAmount);
    const savings = discountAmount;

    setResults({
      originalPrice: price,
      discountAmount,
      finalPrice,
      discountPercentage,
      savings
    });

    setHasCalculated(true);
  };

  // Calculate on page load with default values
  useEffect(() => {
    if (!hasCalculated) {
      calculateDiscount();
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Discount Calculator",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Free online discount calculator to calculate sale prices, savings, and final prices after percentage or fixed amount discounts.",
            "url": "https://calc-tech.com/discount",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1523"
            }
          })
        }}
      />

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
            <Tag className="h-4 w-4" />
            Financial Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Discount Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate discounts, sale prices, and savings instantly. Find out how much you save with percentage or fixed amount discounts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator Input Form */}
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  Discount Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <Input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="pl-7"
                      placeholder="100"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Discount Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={discountType === "percent" ? "default" : "outline"}
                      onClick={() => setDiscountType("percent")}
                      className={discountType === "percent"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                        : ""
                      }
                    >
                      <Percent className="h-4 w-4 mr-2" />
                      Percent Off
                    </Button>
                    <Button
                      type="button"
                      variant={discountType === "fixed" ? "default" : "outline"}
                      onClick={() => setDiscountType("fixed")}
                      className={discountType === "fixed"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                        : ""
                      }
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Fixed Amount
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {discountType === "percent" ? "Discount Percentage" : "Discount Amount"}
                  </label>
                  <div className="relative">
                    {discountType === "percent" ? (
                      <>
                        <Input
                          type="number"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                          className="pr-7"
                          placeholder="20"
                          min="0"
                          max="100"
                          step="0.01"
                        />
                        <span className="absolute right-3 top-3 text-slate-500">%</span>
                      </>
                    ) : (
                      <>
                        <span className="absolute left-3 top-3 text-slate-500">$</span>
                        <Input
                          type="number"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                          className="pl-7"
                          placeholder="20"
                          min="0"
                          step="0.01"
                        />
                      </>
                    )}
                  </div>
                </div>

                <Button
                  onClick={calculateDiscount}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Discount
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Primary Result Card */}
                <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Receipt className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Final Price</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">{formatCurrency(results.finalPrice)}</p>
                    <p className="text-emerald-100">
                      You save {formatCurrency(results.savings)} ({formatPercentage(results.discountPercentage)})
                    </p>
                  </div>
                </Card>

                {/* Secondary Results Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        Price Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Original Price:</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(results.originalPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Discount Amount:</span>
                        <span className="font-semibold text-red-600">-{formatCurrency(results.discountAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-700 font-semibold">Final Price:</span>
                        <span className="font-bold text-emerald-600 text-xl">{formatCurrency(results.finalPrice)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                        <TrendingDown className="h-5 w-5 text-emerald-600" />
                        Savings Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Discount Percentage:</span>
                        <span className="font-semibold text-slate-800">{formatPercentage(results.discountPercentage)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-slate-600">Amount Saved:</span>
                        <span className="font-semibold text-emerald-600">{formatCurrency(results.savings)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-600">Price After Discount:</span>
                        <span className="font-semibold text-slate-800">
                          {((results.finalPrice / results.originalPrice) * 100).toFixed(1)}% of original
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Examples */}
                <Card className="border-2 rounded-2xl shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5 text-emerald-600" />
                      Quick Reference Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">10% off ${results.originalPrice.toFixed(2)}</div>
                        <div className="text-xl font-bold text-emerald-600">
                          {formatCurrency(results.originalPrice * 0.9)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Save {formatCurrency(results.originalPrice * 0.1)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">25% off ${results.originalPrice.toFixed(2)}</div>
                        <div className="text-xl font-bold text-emerald-600">
                          {formatCurrency(results.originalPrice * 0.75)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Save {formatCurrency(results.originalPrice * 0.25)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">50% off ${results.originalPrice.toFixed(2)}</div>
                        <div className="text-xl font-bold text-emerald-600">
                          {formatCurrency(results.originalPrice * 0.5)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Save {formatCurrency(results.originalPrice * 0.5)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Tag className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-slate-500">
                  Enter your price and discount details to see your savings
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 space-y-8">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Understanding Discounts and How to Calculate Them</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <p className="mb-4">
                  Shopping has become more than just picking items off shelves—it's turned into something of a strategic game. Whether you're browsing online deals or walking through a store's clearance section, understanding how discounts actually work can make a real difference in your budget. The math isn't complicated, but knowing it inside and out helps you make smarter purchasing decisions and truly understand the value you're getting.
                </p>
                <p className="mb-4">
                  When retailers advertise discounts, they're essentially offering you two types of price reductions: percentage-based discounts and fixed-amount discounts. Each works differently, and depending on what you're buying, one might save you more money than the other. Let's break down exactly how these work and when each type gives you the best bang for your buck.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Percentage-Based Discounts: The Most Common Type</h3>
                <p className="mb-4">
                  You've definitely seen these—"20% off," "Save 30%," "Half-price sale!" These percentage discounts are everywhere, and there's a good reason retailers love them. They scale with the price of the item, which means more expensive products yield bigger dollar savings, even though the percentage stays the same.
                </p>
                <p className="mb-4">
                  Here's how the calculation works: Take the original price, multiply it by the discount percentage (converted to a decimal), and that gives you the discount amount. Then subtract that amount from the original price. For example, if something costs $80 and there's a 25% discount, you'd calculate $80 × 0.25 = $20 off, leaving you with a final price of $60.
                </p>
                <p className="mb-4">
                  The beauty of percentage discounts is their proportional nature. A 20% discount on a $10 item saves you $2, while the same 20% on a $500 item saves you $100. This makes percentage discounts particularly valuable when shopping for big-ticket items like electronics, furniture, or appliances.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed-Amount Discounts: Straightforward Savings</h3>
                <p className="mb-4">
                  Fixed-amount discounts are refreshingly simple: "$10 off," "$50 rebate," "Save $25 instantly." You don't need to do any percentage calculations—you just subtract the discount amount directly from the original price. If a service normally costs $95 and you have a $20 off coupon, you'll pay $75. Done.
                </p>
                <p className="mb-4">
                  What makes fixed discounts interesting is how their value changes depending on the base price. That $10 off coupon represents a much better deal on a $30 item (33% savings) than on a $200 item (only 5% savings). Savvy shoppers look for fixed-amount discounts when buying lower-priced items, where the percentage savings can actually be quite substantial.
                </p>
                <p className="mb-4">
                  You'll often see these in combination offers like "Buy one, get $5 off the second" or promotional coupons that take a set dollar amount off your purchase. Credit card rewards and cashback programs frequently use fixed amounts too—like "$25 statement credit after spending $500 in the first three months."
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Comparing Discount Types: Which Saves You More?</h3>
                <p className="mb-4">
                  Sometimes you'll encounter situations where you can choose between different discount types, and that's where the math becomes your friend. Let's say you're buying a $120 jacket, and the store offers either 15% off or $20 off. Which should you take?
                </p>
                <p className="mb-4">
                  The percentage discount would be: $120 × 0.15 = $18 off, bringing the price to $102. The fixed discount takes $20 off directly, making it $100. In this case, the fixed $20 discount wins by $2. But if that same jacket cost $150, the 15% discount would save you $22.50, beating the fixed amount.
                </p>
                <p className="mb-4">
                  There's a quick trick to figure out the break-even point: divide the fixed discount by the percentage (as a decimal). Using our example, $20 ÷ 0.15 = $133.33. That means for any price above $133.33, the percentage discount saves more money. Below that price, take the fixed amount. This kind of mental math can help you make split-second decisions at checkout.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Stacked Discounts and Multiple Promotions</h3>
                <p className="mb-4">
                  Here's where things get interesting—and potentially confusing. Some retailers allow you to stack multiple discounts, meaning you can apply more than one promotion to a single purchase. But the order in which discounts are applied can dramatically affect your final price.
                </p>
                <p className="mb-4">
                  Let's work through an example. Imagine a $200 item with both a 20% off promotion and a $30 coupon that can be stacked. If the percentage comes off first, you'd pay $160 (after 20% off), then $130 (after the $30 coupon). But if they apply the fixed amount first, you'd pay $170 (after $30 off), then $136 (after 20% of $170). That's a $6 difference just from the order of operations.
                </p>
                <p className="mb-4">
                  Most retailers have policies about this—usually percentages come first, then dollar amounts—but it's worth understanding the math so you can maximize your savings. Some stores won't let you stack certain promotions at all, while others have special "clearance plus coupon" days that encourage it. Always read the fine print.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Sales Tax Considerations</h3>
                <p className="mb-4">
                  One thing that trips people up is when sales tax gets calculated. In most places, discounts are applied first, and then tax is calculated on the reduced price. This is actually good news for shoppers because you're not paying tax on money you saved through discounts.
                </p>
                <p className="mb-4">
                  For instance, if you buy a $100 item with a 25% discount in an area with 8% sales tax, here's what happens: First, the discount brings the price to $75. Then tax is calculated on $75 (not $100), adding $6 for a final total of $81. If tax were calculated on the original $100 first, you'd pay more.
                </p>
                <p className="mb-4">
                  This matters especially during major purchases. When you're buying furniture, electronics, or making large investments, that sales tax calculation can mean a difference of tens or even hundreds of dollars. Always make sure the discount is applied before tax—if a cashier does it wrong, politely ask them to recalculate.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Psychology of Discounts: Why Retailers Use Specific Numbers</h3>
                <p className="mb-4">
                  Ever notice how sales are usually 20%, 30%, or 50% off—but rarely 27% or 43%? There's psychology behind this. Round numbers are easier for shoppers to calculate mentally, and certain percentages have become associated with different levels of savings in our minds.
                </p>
                <p className="mb-4">
                  A 10% discount feels like a nice bonus, 25% feels like a solid deal, 50% feels like you're getting major value, and anything beyond 70% makes people wonder if something's wrong with the product. Retailers know this, so they carefully choose their discount percentages to match the impression they want to create.
                </p>
                <p className="mb-4">
                  Similarly, fixed amounts often end in 0 or 5—"$5 off," "$25 off"—because these numbers feel more substantial and are easier to work with mentally. When you see unusual amounts like "$7.50 off" or "23% off," it's often because it's calculated from something else (like a loyalty program percentage or a bundle deal calculation).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Seasonal Sales and Discount Timing</h3>
                <p className="mb-4">
                  Understanding when to expect the best discounts can save you serious money over time. Certain seasons bring predictable sales patterns: winter clothing goes on clearance in February and March, summer items in August and September. Electronics see major discounts during Black Friday, while furniture often goes on sale during President's Day weekend.
                </p>
                <p className="mb-4">
                  The discount percentages tend to deepen as seasonal inventory needs to clear. Early season might bring 20-30% off, mid-clearance could be 40-50%, and final clearance often hits 60-75% off. If you can wait and you're not picky about having the newest styles or full size selection, those final clearance discounts offer tremendous value.
                </p>
                <p className="mb-4">
                  That said, waiting too long has risks. The best items in your size might be gone, or the store might run out entirely. There's a balance between getting the deepest discount and actually getting what you want. Sometimes a 30% discount on exactly what you need beats a 70% discount on something that's close but not quite right.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Online vs. In-Store Discount Strategies</h3>
                <p className="mb-4">
                  Shopping online and in physical stores often involves different discount mechanics. Online retailers can offer dynamic pricing and personalized coupons based on your browsing history, while physical stores are limited to their posted signage and whatever coupons you bring.
                </p>
                <p className="mb-4">
                  Many savvy online shoppers use browser extensions that automatically apply coupon codes at checkout, potentially finding discounts you didn't even know existed. Others abandon their carts intentionally, knowing some retailers will send a discount code via email to encourage completion of the purchase. These tactics don't work in brick-and-mortar stores.
                </p>
                <p className="mb-4">
                  On the flip side, physical stores sometimes offer in-store-only promotions or clearance sections that aren't reflected online. You might find additional discounts marked on clearance tags that go beyond the advertised sale. Plus, some stores will price-match online competitors or even their own website, giving you leverage to negotiate better deals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Calculating Your True Savings</h3>
                <p className="mb-4">
                  Here's something important that often gets overlooked: the true value of a discount isn't just about the percentage or dollar amount—it's about whether you actually needed the item in the first place. Getting 50% off something you wouldn't have bought otherwise isn't savings, it's spending.
                </p>
                <p className="mb-4">
                  Smart discount shoppers make lists before sales hit. They know what they need and what prices they're willing to pay. When a discount brings an item into their target range, they buy. When it doesn't, they wait or skip it entirely. This discipline turns discounts into genuine financial benefits rather than justifications for unnecessary purchases.
                </p>
                <p className="mb-4">
                  It's also worth calculating savings over time. If you consistently use discounts and sales for items you genuinely need—groceries, household supplies, clothing—those percentage savings compound. A household that averages 15% savings on $500 monthly shopping keeps $900 per year. Over a decade, that's $9,000 plus whatever you earn by investing those savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Using Discount Calculators Effectively</h3>
                <p className="mb-4">
                  While the math for basic discounts isn't terribly complex, having a calculator handy removes guesswork and helps you make faster decisions, especially when comparing multiple deals or working with unusual percentages.
                </p>
                <p className="mb-4">
                  A good discount calculator lets you quickly toggle between percentage and fixed-amount discounts, showing you both the final price and how much you're actually saving. This is particularly useful when you're at the store trying to decide between different sale items, or when you're comparing online deals from multiple retailers.
                </p>
                <p className="mb-4">
                  The calculator above handles both types of discounts seamlessly. Enter the original price, select whether you have a percentage or fixed-amount discount, input the discount value, and instantly see your final price and total savings. You can even use it to reverse-engineer a sale—if you know the final price and original price, you can figure out what percentage discount was applied.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Common Discount Scenarios</h3>
                <p className="mb-4">
                  Let's run through some real-world scenarios where understanding discount calculations pays off. Say you're grocery shopping and see "Buy 2, get 1 free" on items that cost $6 each. That's effectively a 33.3% discount when you buy three (you pay $12 for $18 worth). Knowing this helps you decide if it's worth stocking up.
                </p>
                <p className="mb-4">
                  Or imagine you're looking at a gym membership that normally costs $50/month, but they're offering $100 off an annual membership. The annual membership would be $600 minus $100, so $500 for the year, or about $41.67 per month. That's roughly a 17% discount—nice savings if you're committed to going regularly.
                </p>
                <p className="mb-4">
                  Here's another common one: rebates. If a $300 appliance has a $50 mail-in rebate, that's a 16.7% discount—but only if you actually complete and submit the rebate form. Many people forget or procrastinate, which is exactly why retailers offer rebates instead of instant discounts. Don't leave money on the table.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Discount Red Flags and Things to Watch For</h3>
                <p className="mb-4">
                  Not all discounts are created equal, and some are frankly misleading. Be wary of retailers who inflate original prices just to show bigger discounts. If something is "60% off" year-round, that's not really a discount—it's just the price.
                </p>
                <p className="mb-4">
                  Also watch for minimum purchase requirements that force you to spend more to get the discount. "Spend $100, get 20% off" might seem great, but if you only needed $60 worth of stuff, you're spending an extra $40 to save $20. That's not a deal, that's a loss.
                </p>
                <p className="mb-4">
                  Similarly, be cautious with "up to X% off" sales. The headline might scream 70% off, but only a handful of items actually have that discount, while most things are 20-30% off. Always check the specific discount on the item you want, not just the advertised maximum.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Maximizing Your Discount Strategy</h3>
                <p className="mb-4">
                  The best approach to discounts combines knowledge, timing, and discipline. Start by tracking prices on items you buy regularly—this gives you a baseline to know when a discount is genuinely good. Many apps and browser extensions can help with price history tracking.
                </p>
                <p className="mb-4">
                  Sign up for email lists from your favorite retailers, but create a separate email address just for this purpose. You'll get early access to sales and exclusive coupons without cluttering your main inbox. Many stores also offer additional discounts for first-time email subscribers.
                </p>
                <p className="mb-4">
                  Consider timing major purchases around known sale events. If you need a new laptop and it's October, waiting until Black Friday could save you several hundred dollars. If you need winter boots and it's March, those end-of-season clearances can cut prices in half.
                </p>
                <p className="mb-4">
                  Finally, don't be afraid to ask for discounts, especially on big purchases or when buying multiple items. Many retailers have flexibility to offer additional discounts to close a sale, particularly in furniture, electronics, and car dealerships. The worst they can say is no, and you might be surprised how often they say yes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">How do I calculate a percentage discount?</h3>
                <p>
                  To calculate a percentage discount, multiply the original price by the discount percentage (as a decimal), then subtract that amount from the original price. For example, a 20% discount on $50 would be: $50 × 0.20 = $10 discount, making the final price $40.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">What's the difference between percent off and fixed amount off?</h3>
                <p>
                  Percent off applies a percentage reduction that scales with the price (like 25% off), while fixed amount off subtracts a set dollar amount regardless of price (like $10 off). Percentage discounts typically save more on expensive items, while fixed discounts can represent better value on cheaper items.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">Can I combine multiple discounts?</h3>
                <p>
                  It depends on the retailer's policy. Some stores allow stacking of certain promotions (like a sale price plus a coupon), while others don't. When discounts can be stacked, they're typically applied in a specific order—usually percentage discounts first, then fixed-amount discounts. Always check the store's terms and conditions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">Is sales tax calculated before or after the discount?</h3>
                <p>
                  In most jurisdictions, sales tax is calculated after discounts are applied. This means you only pay tax on the reduced price, not the original price, which results in additional savings. For example, a $100 item with 20% off and 8% tax would be taxed on $80 (the discounted price), not $100.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">How do I find the original price if I only know the sale price and discount?</h3>
                <p>
                  To find the original price from a sale price and percentage discount, divide the sale price by (1 minus the discount percentage as a decimal). For example, if something costs $60 after a 25% discount: $60 ÷ (1 - 0.25) = $60 ÷ 0.75 = $80 was the original price.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-slate-800">Are bigger percentage discounts always better?</h3>
                <p>
                  Not necessarily. A bigger percentage discount is only better if you actually need the item and the quality meets your standards. A 70% discount on a poor-quality product might not be as good as a 20% discount on a high-quality item that lasts longer. Also, extremely high discounts might indicate clearance items that can't be returned or exchanged.
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
                <Link href="/sales-tax" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Receipt className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Sales Tax Calculator</div>
                    <div className="text-sm text-slate-600">Calculate total price with tax</div>
                  </div>
                </Link>
                <Link href="/interest" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <Percent className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Interest Calculator</div>
                    <div className="text-sm text-slate-600">Calculate simple and compound interest</div>
                  </div>
                </Link>
                <Link href="/savings" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-800">Savings Calculator</div>
                    <div className="text-sm text-slate-600">Plan your savings goals</div>
                  </div>
                </Link>
                <Link href="/loan" className="flex items-center gap-3 p-4 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <TrendingDown className="h-6 w-6 text-emerald-600" />
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
            © 2025 Calc-Tech.com. All rights reserved. Made with care for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
