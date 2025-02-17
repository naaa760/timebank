"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-hidden relative">
      {/* Background decorative images */}
      <motion.div
        className="absolute -left-20 top-40 z-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/img1.png"
          alt="Decorative coin"
          width={300}
          height={300}
          className="opacity-80"
        />
      </motion.div>

      <motion.div
        className="absolute right-0 top-20 z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/img2.png"
          alt="Decorative coin"
          width={300}
          height={300}
          className="opacity-80"
        />
      </motion.div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 relative z-10">
        <div className="flex items-center gap-2">
          <Image
            src="/clover-logo.png"
            alt="Clover Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold">TimeBank</span>
        </div>

        <div className="flex gap-8">
          <Link
            href="#product"
            className="hover:text-green-600 transition-colors"
          >
            Product
          </Link>
          <Link
            href="#reviews"
            className="hover:text-green-600 transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#benefits"
            className="hover:text-green-600 transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#pricing"
            className="hover:text-green-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#changelog"
            className="hover:text-green-600 transition-colors"
          >
            Changelog
          </Link>
        </div>

        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Get Clover
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-100 text-green-800 px-4 py-1 rounded-full inline-block mb-8"
        >
          55,000+ trusted Businesses
        </motion.div>

        <motion.h1
          className="text-6xl font-semibold leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Put More Cash Back in Your
          <br />
          Business Pocket.
        </motion.h1>

        <motion.p
          className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto"
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
          <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <span className="material-icons">info</span>
            More Info
          </button>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <span className="material-icons">arrow_forward</span>
            Get Started
          </button>
        </motion.div>

        <motion.div
          className="mt-8 text-gray-500 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>*No long-term commitment, cancel anytime.*</p>
          <p>*Instant savings first, monthly updates on the 1st.*</p>
        </motion.div>
      </section>

      {/* Made with Framer badge */}
      <div className="fixed bottom-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        <Image
          src="/framer-logo.png"
          alt="Framer Logo"
          width={20}
          height={20}
        />
      </div>
    </main>
  );
}
