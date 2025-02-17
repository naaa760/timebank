"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brown-50 via-neutral-100 to-brown-100 overflow-hidden relative">
      {/* Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-silver/10 to-brown-200/20 z-0" />

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

      {/* Navigation - updated with new colors */}
      <nav className="flex justify-between items-center px-8 py-4 relative z-10 bg-gradient-to-r from-brown-900/5 via-transparent to-brown-900/5">
        <div className="flex items-center gap-2">
          <Image
            src="/clover-logo.png"
            alt="Clover Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold text-brown-800">TimeBank</span>
        </div>

        <div className="flex gap-8">
          <Link
            href="#product"
            className="text-brown-700 hover:text-brown-900 transition-colors"
          >
            Product
          </Link>
          <Link
            href="#reviews"
            className="text-brown-700 hover:text-brown-900 transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#benefits"
            className="text-brown-700 hover:text-brown-900 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#pricing"
            className="text-brown-700 hover:text-brown-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#changelog"
            className="text-brown-700 hover:text-brown-900 transition-colors"
          >
            Changelog
          </Link>
        </div>

        <button className="bg-gradient-to-r from-brown-800 to-brown-700 text-white px-6 py-2 rounded-lg hover:from-brown-700 hover:to-brown-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          Get Clover
        </button>
      </nav>

      {/* Hero Section - updated with new colors and effects */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-brown-100 via-silver-100 to-brown-100 text-brown-800 px-6 py-2 rounded-full inline-block mb-8 shadow-lg"
        >
          55,000+ trusted Businesses
        </motion.div>

        <motion.h1
          className="text-6xl font-semibold leading-tight mb-6 bg-gradient-to-r from-brown-900 via-brown-800 to-brown-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Put More Cash Back in Your
          <br />
          Business Pocket.
        </motion.h1>

        <motion.p
          className="text-brown-700 text-xl mb-12 max-w-3xl mx-auto"
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
          <button className="bg-gradient-to-r from-silver-200 to-silver-100 text-brown-800 px-6 py-3 rounded-lg hover:from-silver-100 hover:to-silver-200 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span className="material-icons">info</span>
            More Info
          </button>
          <button className="bg-gradient-to-r from-brown-800 to-brown-700 text-white px-6 py-3 rounded-lg hover:from-brown-700 hover:to-brown-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span className="material-icons">arrow_forward</span>
            Get Started
          </button>
        </motion.div>

        <motion.div
          className="mt-8 text-brown-600 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-brown-500">
            *No long-term commitment, cancel anytime.*
          </p>
          <p className="text-brown-500">
            *Instant savings first, monthly updates on the 1st.*
          </p>
        </motion.div>
      </section>

      {/* Remove the Framer badge section since we don't have the logo */}
      <div className="fixed bottom-4 right-4 bg-gradient-to-r from-brown-50 to-silver-50 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 backdrop-blur-sm">
        <span className="text-sm text-brown-800">Made with Neha</span>
      </div>
    </main>
  );
}
