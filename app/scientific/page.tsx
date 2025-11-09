"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft, Sigma, Delete } from "lucide-react";

type OperatorType = '+' | '-' | '*' | '/' | '^' | null;

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<OperatorType>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<string[]>([]);

  const toRadians = (angle: number): number => {
    return angleMode === 'deg' ? (angle * Math.PI) / 180 : angle;
  };

  const fromRadians = (radians: number): number => {
    return angleMode === 'deg' ? (radians * 180) / Math.PI : radians;
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const performOperation = (nextOperator: OperatorType) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case '^':
          newValue = Math.pow(currentValue, inputValue);
          break;
      }

      const historyEntry = `${currentValue} ${operator} ${inputValue} = ${newValue}`;
      setHistory([historyEntry, ...history.slice(0, 9)]);

      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const equals = () => {
    performOperation(null);
    setOperator(null);
    setPreviousValue(null);
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sin':
        result = Math.sin(toRadians(value));
        break;
      case 'cos':
        result = Math.cos(toRadians(value));
        break;
      case 'tan':
        result = Math.tan(toRadians(value));
        break;
      case 'asin':
        result = fromRadians(Math.asin(value));
        break;
      case 'acos':
        result = fromRadians(Math.acos(value));
        break;
      case 'atan':
        result = fromRadians(Math.atan(value));
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = Math.pow(value, 3);
        break;
      case 'factorial':
        result = factorial(Math.floor(value));
        break;
      case 'reciprocal':
        result = value !== 0 ? 1 / value : 0;
        break;
      case 'exp':
        result = Math.exp(value);
        break;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const insertConstant = (constant: string) => {
    let value = 0;
    switch (constant) {
      case 'pi':
        value = Math.PI;
        break;
      case 'e':
        value = Math.E;
        break;
    }
    setDisplay(String(value));
    setWaitingForOperand(true);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const CalcButton = ({
    label,
    onClick,
    className = "",
    variant = "default"
  }: {
    label: string;
    onClick: () => void;
    className?: string;
    variant?: "default" | "operator" | "function" | "equals";
  }) => {
    const baseStyle = "h-14 text-lg font-semibold rounded-xl transition-all hover:scale-105 active:scale-95";
    const variantStyles = {
      default: "bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200",
      operator: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md",
      function: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md",
      equals: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md",
    };

    return (
      <Button
        onClick={onClick}
        className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      >
        {label}
      </Button>
    );
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sigma className="h-4 w-4" />
            Math Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Scientific Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Advanced calculator with trigonometric, logarithmic, and exponential functions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sigma className="h-6 w-6" />
                    Scientific Calculator
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={angleMode === 'deg' ? 'secondary' : 'outline'}
                      onClick={() => setAngleMode('deg')}
                      className={angleMode === 'deg' ? 'bg-white text-blue-600' : 'text-white border-white hover:bg-white/20'}
                    >
                      DEG
                    </Button>
                    <Button
                      size="sm"
                      variant={angleMode === 'rad' ? 'secondary' : 'outline'}
                      onClick={() => setAngleMode('rad')}
                      className={angleMode === 'rad' ? 'bg-white text-blue-600' : 'text-white border-white hover:bg-white/20'}
                    >
                      RAD
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Display */}
                <div className="bg-slate-900 rounded-xl p-6 mb-4">
                  <div className="text-right">
                    <div className="text-slate-400 text-sm mb-1 h-5">
                      {operator && previousValue !== null ? `${previousValue} ${operator}` : ''}
                    </div>
                    <div className="text-white text-4xl font-bold break-all">
                      {display}
                    </div>
                    {memory !== 0 && (
                      <div className="text-blue-400 text-sm mt-1">
                        Memory: {memory}
                      </div>
                    )}
                  </div>
                </div>

                {/* Memory and Special Functions */}
                <div className="grid grid-cols-6 gap-2">
                  <CalcButton label="MC" onClick={memoryClear} variant="function" />
                  <CalcButton label="MR" onClick={memoryRecall} variant="function" />
                  <CalcButton label="M+" onClick={memoryAdd} variant="function" />
                  <CalcButton label="M-" onClick={memorySubtract} variant="function" />
                  <CalcButton label="π" onClick={() => insertConstant('pi')} variant="function" />
                  <CalcButton label="e" onClick={() => insertConstant('e')} variant="function" />
                </div>

                {/* Scientific Functions Row 1 */}
                <div className="grid grid-cols-6 gap-2">
                  <CalcButton label="sin" onClick={() => scientificFunction('sin')} variant="function" />
                  <CalcButton label="cos" onClick={() => scientificFunction('cos')} variant="function" />
                  <CalcButton label="tan" onClick={() => scientificFunction('tan')} variant="function" />
                  <CalcButton label="x²" onClick={() => scientificFunction('square')} variant="function" />
                  <CalcButton label="x³" onClick={() => scientificFunction('cube')} variant="function" />
                  <CalcButton label="xʸ" onClick={() => performOperation('^')} variant="operator" />
                </div>

                {/* Scientific Functions Row 2 */}
                <div className="grid grid-cols-6 gap-2">
                  <CalcButton label="asin" onClick={() => scientificFunction('asin')} variant="function" />
                  <CalcButton label="acos" onClick={() => scientificFunction('acos')} variant="function" />
                  <CalcButton label="atan" onClick={() => scientificFunction('atan')} variant="function" />
                  <CalcButton label="√x" onClick={() => scientificFunction('sqrt')} variant="function" />
                  <CalcButton label="log" onClick={() => scientificFunction('log')} variant="function" />
                  <CalcButton label="ln" onClick={() => scientificFunction('ln')} variant="function" />
                </div>

                {/* Scientific Functions Row 3 */}
                <div className="grid grid-cols-6 gap-2">
                  <CalcButton label="n!" onClick={() => scientificFunction('factorial')} variant="function" />
                  <CalcButton label="1/x" onClick={() => scientificFunction('reciprocal')} variant="function" />
                  <CalcButton label="eˣ" onClick={() => scientificFunction('exp')} variant="function" />
                  <CalcButton label="%" onClick={percentage} variant="function" />
                  <CalcButton label="±" onClick={toggleSign} variant="function" />
                  <CalcButton label="C" onClick={clear} variant="operator" />
                </div>

                {/* Number Pad and Basic Operations */}
                <div className="grid grid-cols-4 gap-2">
                  <CalcButton label="7" onClick={() => inputDigit('7')} />
                  <CalcButton label="8" onClick={() => inputDigit('8')} />
                  <CalcButton label="9" onClick={() => inputDigit('9')} />
                  <CalcButton label="÷" onClick={() => performOperation('/')} variant="operator" />

                  <CalcButton label="4" onClick={() => inputDigit('4')} />
                  <CalcButton label="5" onClick={() => inputDigit('5')} />
                  <CalcButton label="6" onClick={() => inputDigit('6')} />
                  <CalcButton label="×" onClick={() => performOperation('*')} variant="operator" />

                  <CalcButton label="1" onClick={() => inputDigit('1')} />
                  <CalcButton label="2" onClick={() => inputDigit('2')} />
                  <CalcButton label="3" onClick={() => inputDigit('3')} />
                  <CalcButton label="-" onClick={() => performOperation('-')} variant="operator" />

                  <CalcButton label="0" onClick={() => inputDigit('0')} />
                  <CalcButton label="." onClick={inputDecimal} />
                  <CalcButton label="=" onClick={equals} variant="equals" />
                  <CalcButton label="+" onClick={() => performOperation('+')} variant="operator" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History and Info */}
          <div className="space-y-6">
            {/* History */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                <CardTitle className="text-lg">Calculation History</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {history.length > 0 ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {history.map((entry, index) => (
                      <div key={index} className="text-sm text-slate-600 p-2 bg-slate-50 rounded">
                        {entry}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">
                    No calculations yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Functions Guide */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="text-lg">Function Guide</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Trigonometric</h4>
                  <p className="text-slate-600">sin, cos, tan and their inverses (asin, acos, atan)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Logarithmic</h4>
                  <p className="text-slate-600">log (base 10), ln (natural log)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Powers</h4>
                  <p className="text-slate-600">x², x³, xʸ (any power), √x (square root)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Special</h4>
                  <p className="text-slate-600">n! (factorial), 1/x (reciprocal), eˣ (exponential)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Constants</h4>
                  <p className="text-slate-600">π (pi ≈ 3.14159), e (Euler's number ≈ 2.71828)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Memory</h4>
                  <p className="text-slate-600">MC (clear), MR (recall), M+ (add), M- (subtract)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">About Scientific Calculators</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">What is a Scientific Calculator?</h3>
                <p>
                  A scientific calculator is an advanced calculating device designed to handle mathematical operations beyond basic arithmetic. It includes functions for trigonometry, logarithms, exponents, roots, and more. Scientists, engineers, students, and mathematicians use these calculators to solve complex equations and perform advanced calculations quickly and accurately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Trigonometric Functions</h3>
                <p>
                  Trigonometric functions (sin, cos, tan) are essential for working with angles and triangles. These functions are used in fields ranging from physics and engineering to architecture and navigation. The calculator supports both degree and radian modes—degrees are more intuitive for everyday use (a right angle is 90°), while radians are preferred in higher mathematics and calculus (a right angle is π/2 radians).
                </p>
                <p className="mt-3">
                  The inverse trigonometric functions (asin, acos, atan) work backwards—they tell you what angle would produce a given sine, cosine, or tangent value. For example, if sin(30°) = 0.5, then asin(0.5) = 30°.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Logarithmic and Exponential Functions</h3>
                <p>
                  Logarithms are the inverse of exponents. While 10² = 100, log(100) = 2. The log button calculates base-10 logarithms, while ln calculates natural logarithms (base e). Natural logarithms are fundamental in calculus, compound interest calculations, and many scientific formulas.
                </p>
                <p className="mt-3">
                  The exponential function (eˣ) raises Euler's number (e ≈ 2.71828) to a power. This function appears throughout nature in growth and decay processes, from population growth to radioactive decay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Memory Functions</h3>
                <p>
                  Memory functions allow you to store values for later use, which is incredibly useful for multi-step calculations. M+ adds the current display to memory, M- subtracts it, MR recalls the stored value, and MC clears the memory. This lets you perform intermediate calculations without losing important values.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Order of Operations</h3>
                <p>
                  Scientific calculators follow the standard mathematical order of operations (PEMDAS/BODMAS): Parentheses/Brackets, Exponents/Orders, Multiplication and Division (left to right), Addition and Subtraction (left to right). Functions like sin, log, and sqrt are evaluated before multiplication and division.
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
