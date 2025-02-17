"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      {/* Midnight gradient overlay with silver shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-silver-200/5 to-silver-300/10 z-0" />

      {/* Glowing orbs in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-silver-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-silver-400/10 rounded-full blur-[100px]" />

      {/* Abstract corner decorations with img3.png - updated for midnight theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -left-20 -top-20 z-0"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-silver-500/20 to-transparent blur-2xl transform scale-110" />
          <Image
            src="/img3.png"
            alt="Abstract decoration"
            width={200}
            height={200}
            className="transform -rotate-45 opacity-60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-75"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 -top-20 z-0"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-silver-500/20 to-transparent blur-2xl transform scale-110" />
          <Image
            src="/img3.png"
            alt="Abstract decoration"
            width={200}
            height={200}
            className="transform rotate-45 opacity-60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-75"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -left-20 -bottom-20 z-0"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-silver-500/20 to-transparent blur-2xl transform scale-110" />
          <Image
            src="/img3.png"
            alt="Abstract decoration"
            width={200}
            height={200}
            className="transform rotate-[135deg] opacity-60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-75"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -right-20 -bottom-20 z-0"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tl from-silver-500/20 to-transparent blur-2xl transform scale-110" />
          <Image
            src="/img3.png"
            alt="Abstract decoration"
            width={200}
            height={200}
            className="transform -rotate-[135deg] opacity-60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-75"
          />
        </div>
      </motion.div>

      {/* Background decorative images - updated with new animations */}
      <motion.div
        className="absolute -left-20 top-40 z-0"
        initial={{ opacity: 0, x: -100, rotate: -20 }}
        animate={{ opacity: 0.9, x: 0, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/img1.png"
          alt="Decorative coin"
          width={300}
          height={300}
          className="opacity-80 drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute right-0 top-20 z-0"
        initial={{ opacity: 0, x: 100, rotate: 20 }}
        animate={{ opacity: 0.9, x: 0, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/img2.png"
          alt="Decorative coin"
          width={300}
          height={300}
          className="opacity-80 drop-shadow-2xl"
        />
      </motion.div>

      {/* Navigation - now with transparent glass effect */}
      <nav className="flex justify-between items-center px-8 py-4 relative z-10 bg-gray-900/20 backdrop-blur-sm border-b border-silver-500/10">
        <div className="flex items-center gap-2">
          <Image
            src="/clover-logo.png"
            alt="Clover Logo"
            width={32}
            height={32}
            className="brightness-90"
          />
          <span className="text-xl font-semibold text-silver-100">
            TimeBank
          </span>
        </div>

        <div className="flex gap-8">
          <Link
            href="#product"
            className="text-silver-300 hover:text-silver-100 transition-colors"
          >
            Product
          </Link>
          <Link
            href="#reviews"
            className="text-silver-300 hover:text-silver-100 transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#benefits"
            className="text-silver-300 hover:text-silver-100 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#pricing"
            className="text-silver-300 hover:text-silver-100 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#changelog"
            className="text-silver-300 hover:text-silver-100 transition-colors"
          >
            Changelog
          </Link>
        </div>

        <button className="bg-gradient-to-r from-silver-700 to-silver-600 text-white px-6 py-2 rounded-lg hover:from-silver-600 hover:to-silver-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Get Started
        </button>
      </nav>

      {/* Hero Section - updated for midnight theme */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800/50 via-silver-900/50 to-gray-800/50 text-silver-200 px-6 py-2 rounded-full inline-block mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-silver-500/10"
        >
          55,000+ trusted Businesses
        </motion.div>

        <motion.h1
          className="text-6xl font-semibold leading-tight mb-6 bg-gradient-to-r from-silver-200 via-silver-100 to-silver-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Put More Cash Back in Your
          <br />
          Business Pocket.
        </motion.h1>

        <motion.p
          className="text-silver-300 text-xl mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Maximize savings with GreenClover, the AI-powered business card that
          optimizes every purchase, giving you unmatched value effortlessly.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="bg-gradient-to-r from-gray-800 to-gray-700 text-silver-200 px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-silver-500/10">
            <span className="material-icons">info</span>
            More Info
          </button>
          <button className="bg-gradient-to-r from-silver-700 to-silver-600 text-white px-6 py-3 rounded-lg hover:from-silver-600 hover:to-silver-500 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <span className="material-icons">arrow_forward</span>
            Get Started
          </button>
        </motion.div>

        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-silver-400">
            *No long-term commitment, cancel anytime.*
          </p>
          <p className="text-silver-400">
            *Instant savings first, monthly updates on the 1st.*
          </p>
        </motion.div>
      </section>

      {/* Footer badge */}
      <div className="fixed bottom-4 right-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full px-4 py-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-silver-500/10">
        <span className="text-sm text-silver-300">Made with Neha</span>
      </div>
    </main>
  );
}
