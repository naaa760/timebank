"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GlassCard } from "@/components/GlassCard";
import { motion } from "framer-motion";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-700 
                     ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage: 'url("/home.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main gradient overlay for entire page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/70" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Decorative gradient orbs that float throughout the page */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full 
                        bg-gradient-to-br from-[#e2d1c3]/40 via-[#fdfcfb]/20 to-transparent 
                        blur-[100px] animate-pulse-slow"
        />

        <div
          className="absolute bottom-1/4 left-0 w-[800px] h-[800px] rounded-full 
                        bg-gradient-to-tr from-[#e2d1c3]/30 via-[#fdfcfb]/10 to-transparent 
                        blur-[120px] animate-pulse-slow-reverse"
        />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <Navbar />

        {/* Main hero section */}
        <main
          className={`flex min-h-screen flex-col items-center justify-center transition-all duration-700 delay-300 transform
                       ${
                         isLoaded
                           ? "translate-y-0 opacity-100"
                           : "translate-y-10 opacity-0"
                       }`}
        >
          {/* Trusted businesses banner */}
          <div className="text-center mb-8">
            <span
              className="bg-[#e8ffd5] text-[#2d2d2d] px-4 py-2 rounded-full text-sm font-semibold
                            shadow-[0_2px_10px_rgba(132,204,22,0.2)]
                            drop-shadow-sm
                            border border-[#d1ffaa]"
            >
              55,000+ trusted Businesses
            </span>
          </div>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <h1
                  className="text-5xl md:text-6xl font-bold text-[#2d2d2d] leading-tight mb-6
                               drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]
                               [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)]"
                >
                  TimeBank: Where time is currency, and every skill counts.
                </h1>
                <p
                  className="text-lg text-gray-600 mb-8 max-w-2xl
                                drop-shadow-sm
                                [text-shadow:_0_1px_1px_rgb(255_255_255_/_80%)]"
                >
                  Maximize savings with GreenClover, the AI-powered business
                  card that optimizes every purchase, giving you unmatched value
                  effortlessly.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/more-info"
                    className="group relative px-8 py-3 bg-white/50 text-[#2d2d2d] rounded-lg font-semibold 
                             overflow-hidden transition-all duration-300
                             hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                             border border-white/50 backdrop-blur-sm"
                  >
                    <span className="relative z-10 group-hover:text-[#2d2d2d] transition-colors">
                      More Info
                    </span>
                    <div
                      className="absolute inset-0 bg-white/80 transform scale-x-0 group-hover:scale-x-100 
                                   transition-transform duration-300 origin-left"
                    ></div>
                  </Link>

                  <Link
                    href="/get-started"
                    className="group relative px-8 py-3 bg-[#2d2d2d]/90 text-white rounded-lg font-semibold 
                             overflow-hidden transition-all duration-300
                             hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                             border border-[#1a1a1a]/50 backdrop-blur-sm"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      Get Started
                    </span>
                    <div
                      className="absolute inset-0 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 
                                   transition-transform duration-300 origin-left"
                    ></div>
                  </Link>
                </div>

                <div className="mt-6 text-sm text-gray-500 space-y-2 font-medium">
                  <p className="drop-shadow-sm">
                    Empower Community: Share skills, build trust.
                  </p>
                  <p className="drop-shadow-sm">
                    Cashless Exchange: Trade time credits for services.
                  </p>
                </div>
              </div>

              {/* Right content - Animated Images */}
              <div className="flex-1 relative">
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/img1.png"
                    alt="Business savings illustration 1"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300 
                             animate-float"
                  />
                  <Image
                    src="/img2.png"
                    alt="Business savings illustration 2"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300 
                             animate-float-delayed"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Why Choose Us content */}
        <div className="py-16 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-[#84cc16] font-medium inline-flex items-center gap-2 mb-2">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L10 5.09L15.5 5.09L11 8.19L13 13.28L8 10.18L3 13.28L5 8.19L0.5 5.09L6 5.09L8 0Z" />
              </svg>
              THE CLOVER ADVANTAGES
            </span>
            <h2 className="text-3xl font-bold text-[#2d2d2d] mb-3">
              Why Choose Us?
            </h2>
            <p className="text-[#4a4a4a] text-base max-w-2xl">
              Leverage the power of AI to automatically optimize your purchases,
              ensuring you get the best value for your business with every
              transaction.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* AI-Optimized Savings */}
            <motion.div
              className="glass-card relative rounded-3xl overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(31,38,135,0.2)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                hover: { duration: 0.2 },
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow:
                  "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.2)",
              }}
            >
              <motion.div
                className="p-8 h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-12 h-12 bg-[#2d2d2d]/90 rounded-full flex items-center justify-center
                                 backdrop-blur-sm border border-white/20"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                  AI-Optimized Savings
                </h3>
                <p className="text-[#4a4a4a]">
                  Never miss an opportunity to save. Our AI dynamically adjusts
                  to maximize your savings on every purchase.
                </p>
              </motion.div>
            </motion.div>

            {/* Real-Time Insights */}
            <motion.div
              className="glass-card relative rounded-3xl overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(31,38,135,0.2)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                hover: { duration: 0.2 },
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow:
                  "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.2)",
              }}
            >
              <motion.div
                className="p-8 h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-12 h-12 bg-[#2d2d2d]/90 rounded-full flex items-center justify-center
                                 backdrop-blur-sm border border-white/20"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.5h-15V5h15v14.5z" />
                    </svg>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                  Real-Time Insights
                </h3>
                <p className="text-[#4a4a4a]">
                  Stay in control with detailed analytics. We provide
                  transparent spending reports and intelligent insights to guide
                  your financial decisions.
                </p>
              </motion.div>
            </motion.div>

            {/* Flexible Plans */}
            <motion.div
              className="glass-card relative rounded-3xl overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(31,38,135,0.2)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                hover: { duration: 0.2 },
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow:
                  "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.2)",
              }}
            >
              <motion.div
                className="p-8 h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-12 h-12 bg-[#2d2d2d]/90 rounded-full flex items-center justify-center
                                 backdrop-blur-sm border border-white/20"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3zm-7 2h2v2h-2V5zm-2 12h-2v-2h2v2z" />
                    </svg>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                  Flexible Plans
                </h3>
                <p className="text-[#4a4a4a]">
                  Adaptive plans adjust monthly, ensuring you always get the
                  best savings, rewards, and maximum optimal value for your
                  business needs.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Tags Slider */}
          <div className="mt-12 overflow-hidden relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-20 before:h-full before:bg-gradient-to-r before:from-[#f9fff0]/40 before:to-transparent before:z-10 after:content-[''] after:absolute after:right-0 after:top-0 after:w-20 after:h-full after:bg-gradient-to-l after:from-[#f9fff0]/40 after:to-transparent after:z-10">
            <div className="flex animate-scroll gap-6 py-4">
              {[
                "Automatic Adjustments",
                "Real-Time Reports",
                "Secure Transactions",
                "Dedicated Support",
                "Flexible Payments",
                "Smart Spending",
                "Customizable Plans",
                "Instant Savings",
              ].map((feature, index) => (
                <span
                  key={feature + index}
                  className="px-6 py-3 bg-white/40 backdrop-blur-sm text-[#4a4a4a] text-sm 
                           rounded-full whitespace-nowrap hover:bg-white/60 transition-all duration-300
                           border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.05)]
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5
                           flex-none"
                >
                  {feature}
                </span>
              ))}
              {/* Duplicate items for seamless loop */}
              {[
                "Automatic Adjustments",
                "Real-Time Reports",
                "Secure Transactions",
                "Dedicated Support",
                "Flexible Payments",
                "Smart Spending",
                "Customizable Plans",
                "Instant Savings",
              ].map((feature, index) => (
                <span
                  key={feature + "duplicate" + index}
                  className="px-6 py-3 bg-white/40 backdrop-blur-sm text-[#4a4a4a] text-sm 
                           rounded-full whitespace-nowrap hover:bg-white/60 transition-all duration-300
                           border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.05)]
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5
                           flex-none"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Unique Features content */}
        <div className="py-24 max-w-6xl mx-auto">
          {/* Section Header with Mount Animation */}
          <div className={`text-center mb-16 max-w-3xl mx-auto`}>
            <div className="overflow-hidden mb-2">
              <h2
                className={`text-3xl font-bold text-[#2d2d2d] ${plusJakarta.className}`}
              >
                Unique Features That Make a Difference
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="text-[#666666] text-base max-w-2xl mx-auto leading-relaxed">
                Focusing on innovation and usability, we provide tools that
                enhance productivity and drive success.
              </p>
            </div>
          </div>

          {/* Features Grid with Staggered Mount */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-[#ff6b3d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Seamless Integration",
                description: "Unite your apps for a cohesive workflow.",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-[#ff6b3d]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                  </svg>
                ),
                title: "Advance Reporting",
                description: "Reports customized to your metrics.",
              },
              {
                icon: "📝",
                title: "Quoting & Invoicing",
                description: "Generate quotes and invoices easily.",
              },
              {
                icon: "⚡",
                title: "Project Automation",
                description: "Simply automate follow-ups to drive results.",
              },
              {
                icon: "👥",
                title: "Audience Grouping",
                description: "Easily filter contacts for targeted marketing.",
              },
              {
                icon: "🔒",
                title: "Advanced Security",
                description: "Leading-edge security solutions for your data.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card relative rounded-3xl overflow-hidden h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(31,38,135,0.2)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  hover: { duration: 0.2 },
                }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow:
                    "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.2)",
                }}
              >
                <motion.div
                  className="p-8 h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-[80px] h-[80px] bg-gradient-to-br from-white/10 to-white/5 
                                   rounded-full flex items-center justify-center backdrop-blur-sm
                                   border border-white/20"
                    >
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3
                    className={`text-[24px] font-semibold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#666666] text-[17px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glass Card content */}
        <div className="py-24 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left side - Content */}
            <div className="lg:w-1/2">
              <h2
                className={`text-3xl font-bold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
              >
                Discover Our Innovation
              </h2>
              <p className="text-[#666666] text-base leading-relaxed mb-6 max-w-xl">
                Experience the future of design with our cutting-edge solutions
                that transform the way you work.
              </p>
            </div>

            {/* Right side - Glass Card */}
            <div className="lg:w-1/2">
              <GlassCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
