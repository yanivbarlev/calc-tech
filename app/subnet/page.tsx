"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowLeft,
  Network,
  Server,
  Globe,
} from "lucide-react";

interface SubnetResults {
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIP: string;
  lastUsableIP: string;
  totalAddresses: number;
  usableAddresses: number;
  subnetMask: string;
  wildcardMask: string;
  binarySubnetMask: string;
  ipClass: string;
  cidr: string;
  ipType: string;
}

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState<string>("192.168.1.100");
  const [subnetMask, setSubnetMask] = useState<string>("255.255.255.0");
  const [cidrNotation, setCidrNotation] = useState<string>("24");
  const [useSubnetMask, setUseSubnetMask] = useState<boolean>(true);

  const [results, setResults] = useState<SubnetResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [error, setError] = useState<string>("");

  const validateIP = (ip: string): boolean => {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  };

  const cidrToSubnetMask = (cidr: number): string => {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.max(0, Math.min(8, cidr - i * 8));
      mask.push((0xff << (8 - bits)) & 0xff);
    }
    return mask.join(".");
  };

  const subnetMaskToCIDR = (mask: string): number => {
    const parts = mask.split(".").map(Number);
    let cidr = 0;
    for (const part of parts) {
      cidr += part.toString(2).split("1").length - 1;
    }
    return cidr;
  };

  const calculateSubnet = () => {
    setError("");

    if (!validateIP(ipAddress)) {
      setError("Invalid IP address format");
      return;
    }

    let mask: string;
    let cidr: number;

    if (useSubnetMask) {
      if (!validateIP(subnetMask)) {
        setError("Invalid subnet mask format");
        return;
      }
      mask = subnetMask;
      cidr = subnetMaskToCIDR(mask);
    } else {
      cidr = parseInt(cidrNotation);
      if (cidr < 0 || cidr > 32) {
        setError("CIDR notation must be between 0 and 32");
        return;
      }
      mask = cidrToSubnetMask(cidr);
    }

    const ipParts = ipAddress.split(".").map(Number);
    const maskParts = mask.split(".").map(Number);

    // Calculate network address
    const networkParts = ipParts.map((ip, i) => ip & maskParts[i]);
    const networkAddress = networkParts.join(".");

    // Calculate broadcast address
    const wildcardParts = maskParts.map((m) => 255 - m);
    const broadcastParts = networkParts.map((n, i) => n | wildcardParts[i]);
    const broadcastAddress = broadcastParts.join(".");

    // Calculate first and last usable IPs
    const firstUsableParts = [...networkParts];
    firstUsableParts[3] += 1;
    const firstUsableIP = firstUsableParts.join(".");

    const lastUsableParts = [...broadcastParts];
    lastUsableParts[3] -= 1;
    const lastUsableIP = lastUsableParts.join(".");

    // Calculate total addresses
    const hostBits = 32 - cidr;
    const totalAddresses = Math.pow(2, hostBits);
    const usableAddresses = Math.max(0, totalAddresses - 2);

    // Binary subnet mask
    const binarySubnetMask = maskParts
      .map((part) => part.toString(2).padStart(8, "0"))
      .join(".");

    // Wildcard mask
    const wildcardMask = wildcardParts.join(".");

    // Determine IP class
    const firstOctet = ipParts[0];
    let ipClass = "";
    let ipType = "";

    if (firstOctet >= 1 && firstOctet <= 126) {
      ipClass = "A";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      ipClass = "B";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      ipClass = "C";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      ipClass = "D (Multicast)";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      ipClass = "E (Reserved)";
    }

    // Determine if private IP
    if (
      (firstOctet === 10) ||
      (firstOctet === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
      (firstOctet === 192 && ipParts[1] === 168)
    ) {
      ipType = "Private";
    } else if (firstOctet === 127) {
      ipType = "Loopback";
    } else {
      ipType = "Public";
    }

    setResults({
      networkAddress,
      broadcastAddress,
      firstUsableIP,
      lastUsableIP,
      totalAddresses,
      usableAddresses,
      subnetMask: mask,
      wildcardMask,
      binarySubnetMask,
      ipClass,
      cidr: `/${cidr}`,
      ipType,
    });

    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) {
      calculateSubnet();
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
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Network className="h-4 w-4" />
            Networking Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-normal pb-1">
            Subnet Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate network addresses, subnet masks, and IP ranges for your network
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="border-2 rounded-2xl shadow-lg sticky top-24">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-6 w-6" />
                  Network Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    IP Address
                  </label>
                  <Input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="192.168.1.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Input Method
                  </label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={useSubnetMask ? "default" : "outline"}
                      onClick={() => setUseSubnetMask(true)}
                      className={`flex-1 ${
                        useSubnetMask
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                          : ""
                      }`}
                    >
                      Subnet Mask
                    </Button>
                    <Button
                      type="button"
                      variant={!useSubnetMask ? "default" : "outline"}
                      onClick={() => setUseSubnetMask(false)}
                      className={`flex-1 ${
                        !useSubnetMask
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600"
                          : ""
                      }`}
                    >
                      CIDR
                    </Button>
                  </div>
                </div>

                {useSubnetMask ? (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Subnet Mask
                    </label>
                    <Input
                      type="text"
                      value={subnetMask}
                      onChange={(e) => setSubnetMask(e.target.value)}
                      placeholder="255.255.255.0"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      CIDR Notation
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="32"
                      value={cidrNotation}
                      onChange={(e) => setCidrNotation(e.target.value)}
                      placeholder="24"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Value between 0 and 32
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={calculateSubnet}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Subnet
                </Button>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Common Subnets
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>/24</span>
                      <span className="font-semibold">255.255.255.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>/16</span>
                      <span className="font-semibold">255.255.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>/8</span>
                      <span className="font-semibold">255.0.0.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                <Card className="border-2 border-cyan-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Server className="h-8 w-8" />
                      <h3 className="text-xl font-semibold">Network Address</h3>
                    </div>
                    <p className="text-5xl font-bold mb-2">
                      {results.networkAddress}
                    </p>
                    <p className="text-2xl text-cyan-100">
                      {results.cidr} - {results.ipClass} Class
                    </p>
                  </div>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Network Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-cyan-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Network Address
                        </div>
                        <div className="text-lg font-bold text-cyan-700">
                          {results.networkAddress}
                        </div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Broadcast Address
                        </div>
                        <div className="text-lg font-bold text-cyan-700">
                          {results.broadcastAddress}
                        </div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          First Usable IP
                        </div>
                        <div className="text-lg font-bold text-cyan-700">
                          {results.firstUsableIP}
                        </div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-1">
                          Last Usable IP
                        </div>
                        <div className="text-lg font-bold text-cyan-700">
                          {results.lastUsableIP}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg">Subnet Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-700 font-medium">
                          Subnet Mask
                        </span>
                        <span className="font-mono text-slate-900">
                          {results.subnetMask}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-700 font-medium">
                          Wildcard Mask
                        </span>
                        <span className="font-mono text-slate-900">
                          {results.wildcardMask}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-700 font-medium">
                          CIDR Notation
                        </span>
                        <span className="font-mono text-slate-900">
                          {results.cidr}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-700 font-medium">
                          IP Class
                        </span>
                        <span className="font-semibold text-slate-900">
                          {results.ipClass}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-slate-700 font-medium">
                          IP Type
                        </span>
                        <span className="font-semibold text-slate-900">
                          {results.ipType}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-700 font-medium">
                          Binary Subnet Mask
                        </span>
                        <span className="font-mono text-xs text-slate-900">
                          {results.binarySubnetMask}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 rounded-2xl shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-cyan-600" />
                      Address Capacity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">
                          Total Addresses
                        </div>
                        <div className="text-4xl font-bold text-cyan-700">
                          {results.totalAddresses.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">
                          Usable Hosts
                        </div>
                        <div className="text-4xl font-bold text-green-700">
                          {results.usableAddresses.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed rounded-2xl shadow-lg p-12 text-center">
                <Network className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Enter Network Details
                </h3>
                <p className="text-slate-500">
                  Enter an IP address and subnet mask to calculate
                </p>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-16">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
              <CardTitle className="text-2xl">About Subnetting</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  What is Subnetting?
                </h3>
                <p>
                  Subnetting is the practice of dividing a network into smaller
                  networks called subnets. It helps organize networks efficiently,
                  improve security, and optimize network performance. Each subnet
                  can be treated as a separate network with its own range of IP
                  addresses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  CIDR Notation
                </h3>
                <p>
                  CIDR (Classless Inter-Domain Routing) notation represents subnet
                  masks in a compact format. For example, /24 means the first 24
                  bits are the network portion, leaving 8 bits for hosts (256
                  addresses). Common notations: /24 = 255.255.255.0 (254 usable
                  hosts), /16 = 255.255.0.0 (65,534 usable hosts).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Private IP Ranges
                </h3>
                <p>
                  Private IP addresses are reserved for internal networks and not
                  routable on the public internet. The private ranges are: Class A
                  (10.0.0.0/8), Class B (172.16.0.0/12), and Class C
                  (192.168.0.0/16). These addresses can be used freely within
                  private networks.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">
                  Usable vs Total Addresses
                </h3>
                <p>
                  The total number of addresses in a subnet includes the network
                  address and broadcast address, which cannot be assigned to hosts.
                  Therefore, usable addresses = total addresses - 2. For example, a
                  /24 network has 256 total addresses but only 254 usable for
                  devices.
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
