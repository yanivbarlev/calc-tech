"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  Shield,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<string>("16");
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);
  const [strength, setStrength] = useState<PasswordStrength | null>(null);

  const generatePassword = () => {
    const passwordLength = parseInt(length) || 16;

    let charset = "";
    const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowercase = "abcdefghjkmnpqrstuvwxyz";
    const numbers = "23456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similarChars = "il1Lo0O";
    const ambiguousChars = "{}[]()/\\'\"`~,;:.<>";

    let uppercaseChars = uppercase;
    let lowercaseChars = lowercase;
    let numberChars = numbers;
    let symbolChars = symbols;

    if (!excludeSimilar) {
      uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      numberChars = "0123456789";
    }

    if (excludeAmbiguous) {
      symbolChars = symbols.split("").filter(c => !ambiguousChars.includes(c)).join("");
    }

    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset.length === 0) {
      setPassword("Please select at least one character type");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(passwordLength);
    crypto.getRandomValues(array);

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
    setCopied(false);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    let feedback = "";

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    let label = "";
    let color = "";

    if (score <= 2) {
      label = "Weak";
      color = "text-red-600";
      feedback = "This password is too weak. Add more characters and variety.";
    } else if (score <= 4) {
      label = "Fair";
      color = "text-orange-600";
      feedback = "This password is okay but could be stronger. Try adding more character types.";
    } else if (score <= 6) {
      label = "Good";
      color = "text-yellow-600";
      feedback = "This is a good password. Consider making it longer for extra security.";
    } else {
      label = "Excellent";
      color = "text-green-600";
      feedback = "This is an excellent, strong password! Keep it safe.";
    }

    setStrength({ score, label, color, feedback });
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Password Generator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate strong, secure passwords with customizable options
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-2 border-emerald-200 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Generated Password
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={password}
                  readOnly
                  className="font-mono text-lg pr-24 h-14"
                  placeholder="Click 'Generate Password' to create a password"
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    disabled={!password}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={generatePassword}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {strength && (
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Password Strength:
                    </span>
                    <span className={`font-bold ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        strength.score <= 2
                          ? "bg-red-500"
                          : strength.score <= 4
                          ? "bg-orange-500"
                          : strength.score <= 6
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${(strength.score / 7) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600">{strength.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-lg">Password Options</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password Length: {length}
                </label>
                <input
                  type="range"
                  min="6"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>6</span>
                  <span>64</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    Include Uppercase Letters (A-Z)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    Include Lowercase Letters (a-z)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <span className="text-slate-700">Include Numbers (0-9)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <span className="text-slate-700">
                    Include Symbols (!@#$%...)
                  </span>
                </label>

                <div className="border-t pt-3 mt-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeSimilar}
                      onChange={(e) => setExcludeSimilar(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600"
                    />
                    <span className="text-slate-700">
                      Exclude Similar Characters (i, l, 1, L, o, 0, O)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer mt-3">
                    <input
                      type="checkbox"
                      checked={excludeAmbiguous}
                      onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600"
                    />
                    <span className="text-slate-700">
                      Exclude Ambiguous Symbols ({"{"}&#123;&#125;[]()/"'&lt;&gt;&#92;)
                    </span>
                  </label>
                </div>
              </div>

              <Button
                onClick={generatePassword}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Generate Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Password Security Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 text-slate-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <div className="font-semibold">Use Unique Passwords</div>
                    <div className="text-sm text-slate-600">
                      Never reuse passwords across different accounts. If one is
                      compromised, all others remain safe.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <div className="font-semibold">Longer is Stronger</div>
                    <div className="text-sm text-slate-600">
                      Passwords with 16+ characters are significantly more secure.
                      Length matters more than complexity.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <div className="font-semibold">Use a Password Manager</div>
                    <div className="text-sm text-slate-600">
                      Store passwords securely in a password manager. This lets
                      you use complex passwords without memorizing them.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <div className="font-semibold">Enable 2FA</div>
                    <div className="text-sm text-slate-600">
                      Enable two-factor authentication whenever possible for an
                      extra layer of security beyond passwords.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    5
                  </div>
                  <div>
                    <div className="font-semibold">Change Compromised Passwords</div>
                    <div className="text-sm text-slate-600">
                      If you suspect a password has been compromised, change it
                      immediately along with any other accounts using the same
                      password.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-2xl">About Password Security</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  How Strong Passwords Work
                </h3>
                <p>
                  Strong passwords protect your accounts by making them difficult
                  for attackers to guess or crack through brute force. A password
                  with uppercase, lowercase, numbers, and symbols creates billions
                  of possible combinations, making attacks impractical.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Common Password Mistakes
                </h3>
                <p>
                  Avoid using personal information (birthdays, names), common words
                  or phrases, sequential numbers or letters, or patterns on the
                  keyboard. These make passwords much easier to crack. Also never
                  use the same password on multiple sites.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Is This Generator Secure?
                </h3>
                <p>
                  Yes! This generator runs entirely in your browser using
                  cryptographically secure random number generation. No passwords
                  are sent to any server or stored anywhere. The password only
                  exists in your browser until you copy it or close the page.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Password Entropy
                </h3>
                <p>
                  Password strength is measured in "entropy" - the number of
                  possible combinations. A 16-character password with all character
                  types has about 95 bits of entropy, which would take trillions of
                  years to crack with current technology.
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
