import React from "react";
import Link from "next/link";
import { FiLock, FiZap, FiShield, FiCode } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl">
              <FiLock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold  tracking-tight">
              Better Auth
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern authentication made simple. Secure, fast, and
              developer-friendly auth for your Next.js applications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all">
              Get Started
            </Link>
            <Link
              href="/sign~in"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
