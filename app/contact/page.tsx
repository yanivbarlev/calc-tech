"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowLeft, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Using Formspree - free service that forwards form submissions to email
      // You'll need to verify your email at https://formspree.io/
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xnnlqzop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Contact Form: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try emailing us directly at yaniv.bl+calc@gmail.com");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calc-Tech.com
              </span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Mail className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have a question, suggestion, or found an issue? We'd love to hear from you!
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* FAQ Card */}
              <Card className="border-2 rounded-2xl shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Common Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Calculator bug reports or errors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Feature requests or suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>General questions or feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Partnership inquiries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Technical support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Response Time Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-slate-700">
                  <strong className="text-blue-700">Response Time:</strong> We aim to respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 rounded-2xl shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6 text-blue-600" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                      <Button
                        onClick={() => setStatus("idle")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="h-12"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Your Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="h-12"
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a subject...</option>
                          <option value="Bug Report">Bug Report</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="General Question">General Question</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Partnership">Partnership Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          required
                          rows={6}
                          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                        />
                      </div>

                      {/* Error Message */}
                      {status === "error" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Message
                          </span>
                        )}
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>We read every message personally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Response within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Your feedback helps improve our calculators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>We value your privacy and never share your information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
