"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GlassCard } from "@/components/GlassCard";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/FeatureCard";

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
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Cards */}
            <div className="lg:w-2/3 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-[#2d2d2d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                  ),
                  title: "Efficient Management",
                  description:
                    "Streamline your operations with our intuitive management tools",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-[#ff6b3d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Real-Time Insights",
                  description:
                    "Stay in control with detailed analytics. We provide transparent spending reports and intelligent insights to guide your financial decisions.",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-[#ff6b3d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.5h-15V5h15v14.5z" />
                    </svg>
                  ),
                  title: "Flexible Plans",
                  description:
                    "Adaptive plans adjust monthly, ensuring you always get the best savings, rewards, and maximum optimal value for your business needs.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card relative rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow:
                      "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                    whileHover={{
                      opacity: 0.6,
                      transition: { duration: 0.2 },
                    }}
                  />

                  <motion.div
                    className="p-8 h-full flex flex-col relative z-10"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="mb-6"
                      whileHover={{
                        rotate: 5,
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Icon container */}
                      <div
                        className="w-[80px] h-[80px] bg-gradient-to-br from-white/20 to-white/5 
                                   rounded-full flex items-center justify-center backdrop-blur-md
                                   border border-white/30 shadow-[0_4px_20px_rgba(31,38,135,0.15)]"
                      >
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      className={`text-[24px] font-semibold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-[#4a4a4a]">{feature.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Image */}
            <div className="lg:w-1/3">
              <motion.div
                className="relative w-full h-[400px] rounded-3xl overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotate: [-1, 1, -1],
                  transition: {
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.3,
                    },
                  },
                }}
              >
                <Image
                  src="/img5.png"
                  alt="Why Choose Us Illustration"
                  fill
                  className="object-cover rounded-3xl hover:filter hover:brightness-110 transition-all duration-300"
                />

                {/* Glass overlay */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </motion.div>
            </div>
          </div>
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
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(31,38,135,0.25)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 100%)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  hover: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                  whileHover={{
                    opacity: 0.6,
                    transition: { duration: 0.2 },
                  }}
                />

                <motion.div
                  className="p-8 h-full flex flex-col relative z-10"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{
                      rotate: 5,
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Icon container */}
                    <div
                      className="w-[80px] h-[80px] bg-gradient-to-br from-white/20 to-white/5 
                                 rounded-full flex items-center justify-center backdrop-blur-md
                                 border border-white/30 shadow-[0_4px_20px_rgba(31,38,135,0.15)]"
                    >
                      {feature.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className={`text-[24px] font-semibold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature.title}
                  </motion.h3>
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
            {/* Left side - Content and Feature Cards */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2
                  className={`text-3xl font-bold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
                >
                  Discover Our Innovation
                </h2>
                <p className="text-[#666666] text-base leading-relaxed mb-6 max-w-xl">
                  Experience the future of design with our cutting-edge
                  solutions that transform the way you work.
                </p>
              </div>
              {/* Feature Cards */}
              <div className="space-y-4">
                <FeatureCard
                  icon={
                    <svg
                      className="w-6 h-6 text-[#2d2d2d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                  }
                  title="Efficient Management"
                  description="Streamline your expense tracking with our intuitive management tools"
                  delay={0.1}
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-6 h-6 text-[#2d2d2d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                    </svg>
                  }
                  title="Smart Financial Tools"
                  description="Optimize your financial resources with intelligent insights and analytics"
                  delay={0.2}
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-6 h-6 text-[#2d2d2d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
                    </svg>
                  }
                  title="Performance Tracking"
                  description="Monitor and optimize your business performance in real-time"
                  delay={0.3}
                />
              </div>
            </div>

            {/* Right side - Glass Card */}
            <div className="lg:w-1/2">
              <GlassCard />
            </div>
          </div>
        </div>

        {/* Valuable Features Section */}
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#666666] mb-2 block">
              Valuable Features
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
            >
              Customizable Solutions for Every Need
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Adapt our platform to suit your unique business needs with
              flexible, scalable solutions designed to grow with you.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Real Time Analytics Card */}
            <div
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden
                         border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              {/* Image Container */}
              <div className="relative h-[240px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/book1.png"
                    alt="Real Time Analytics Interface"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-orange-500/10 backdrop-blur-sm rounded-xl">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold text-[#2d2d2d] ${plusJakarta.className}`}
                  >
                    Real Time Analytics
                  </h3>
                </div>

                <p className="text-[#666666] leading-relaxed">
                  Monitor result performance with real time insights. Track your
                  business metrics and make data-driven decisions.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2d2d2d]">
                    Learn more
                  </span>
                  <svg
                    className="w-4 h-4 text-[#2d2d2d] transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Scheduling Card - Similar structure */}
            <div
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden
                         border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/book2.png"
                    alt="Content Scheduling Interface"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-500/10 backdrop-blur-sm rounded-xl">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold text-[#2d2d2d] ${plusJakarta.className}`}
                  >
                    Content Scheduling
                  </h3>
                </div>

                <p className="text-[#666666] leading-relaxed">
                  Plan and schedule content across all platforms. Streamline
                  your workflow with our intuitive scheduling tools.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2d2d2d]">
                    Learn more
                  </span>
                  <svg
                    className="w-4 h-4 text-[#2d2d2d] transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Team Collaboration Card - Similar structure */}
            <div
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden
                         border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src="/book3.png"
                    alt="Team Collaboration Interface"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-purple-500/10 backdrop-blur-sm rounded-xl">
                    <svg
                      className="w-6 h-6 text-purple-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z" />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold text-[#2d2d2d] ${plusJakarta.className}`}
                  >
                    Team Collaboration
                  </h3>
                </div>

                <p className="text-[#666666] leading-relaxed">
                  Manage and improve campaigns efficiently. Work together
                  seamlessly with integrated collaboration tools.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2d2d2d]">
                    Learn more
                  </span>
                  <svg
                    className="w-4 h-4 text-[#2d2d2d] transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:w-5/12"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm font-semibold text-[#666666] mb-4 block"
              >
                Benefits
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`text-4xl font-bold text-[#2d2d2d] mb-6 ${plusJakarta.className}`}
              >
                Unlock a New Era of Operational Excellence and Innovation
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-[#666666] text-lg mb-8"
              >
                Unlock operational excellence and innovation with our advanced
                tools and streamlined processes.
              </motion.p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  "Robust Security",
                  "Customizable",
                  "Accessibility",
                  "Automated Efficiency",
                  "Centralized Data",
                ].map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm text-[#666666]
                             border border-white/50 hover:bg-white/60 transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="lg:w-7/12"
            >
              <div className="space-y-8">
                {[
                  {
                    icon: "👥",
                    title: "Expert Team",
                    description:
                      "An expert team ready to tackle your challenges with innovative solutions and proven strategies.",
                  },
                  {
                    icon: "⚡",
                    title: "Fast and Scalable",
                    description:
                      "Scale your business effortlessly with our SaaS, designed to grow alongside your evolving needs.",
                  },
                  {
                    icon: "🎯",
                    title: "Customizable for You",
                    description:
                      "Customize the platform to perfectly align with your business's unique requirements and goals.",
                  },
                  {
                    icon: "⚙️",
                    title: "Maximum Efficiency",
                    description:
                      "Maximize efficiency with integrated solutions that eliminate bottlenecks, saving time and costs.",
                  },
                  {
                    icon: "🤝",
                    title: "User Friendly",
                    description:
                      "A simple and accessible interface for users of all skill levels, making it easy to find what you need.",
                  },
                  {
                    icon: "🔒",
                    title: "Security You Can Trust",
                    description:
                      "Protect sensitive data with industry leading security to prevent unauthorized breaches.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 group relative"
                  >
                    {/* Orange Line Indicator */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "24px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="w-[3px] bg-gradient-to-b from-lime-500 to-lime-400/50 rounded-full"
                      />
                    </div>

                    {/* Icon with animated container */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-lime-500/10 to-lime-500/5
                                  border border-lime-500/20 group-hover:border-lime-500/40
                                  transition-all duration-300
                                  relative overflow-hidden"
                      >
                        {/* Animated gradient background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100
                                    bg-gradient-to-r from-lime-500/20 via-lime-400/10 to-lime-500/20"
                          animate={{
                            x: ["0%", "100%", "0%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        {/* Icon */}
                        <span className="text-2xl relative z-10">
                          {benefit.icon}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content with fade-in animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                    >
                      <h3
                        className={`text-xl font-semibold text-[#2d2d2d] mb-2 ${plusJakarta.className}`}
                      >
                        {benefit.title}
                      </h3>
                      <p className="text-[#666666] leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Pricing Section */}
        <div className="py-24 bg-gradient-to-b from-white/50 to-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 relative"
            >
              {/* Title with pen image */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <h2
                  className={`text-4xl font-bold text-[#2d2d2d] ${plusJakarta.className}`}
                >
                  Choose the Best Plan for Your Business
                </h2>
                <motion.div
                  className="relative w-20 h-20 md:w-28 md:h-28"
                  initial={{ rotate: -45, opacity: 0, scale: 0.5 }}
                  whileInView={{
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.2,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      rotate: [-2, 2, -2],
                      x: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/pen.png"
                      alt="Pen illustration"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500/20 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 right-0 w-3 h-3 bg-lime-500/20 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-1 -left-2 w-12 h-1.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.2), transparent)",
                    }}
                    animate={{
                      scaleX: [0, 1, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              <p className="text-[#666666] text-lg max-w-2xl mx-auto">
                Find the right plan for your needs, with flexible choices and
                transparent pricing details.
              </p>

              {/* Pricing Toggle */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <span
                  className={`text-sm font-medium ${plusJakarta.className} text-[#2d2d2d]`}
                >
                  Monthly
                </span>
                <div className="w-12 h-6 bg-white/50 rounded-full p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-[#2d2d2d] rounded-full" />
                </div>
                <span
                  className={`text-sm font-medium ${plusJakarta.className} text-[#666666]`}
                >
                  Yearly
                </span>
                <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Basic Plan",
                  description: "Small businesses",
                  price: "19",
                  features: [
                    "Contact Management",
                    "Task and Activity Tracking",
                    "Automation Workflows",
                    "Customizable Dashboards",
                    "24/7 Priority Support",
                  ],
                },
                {
                  name: "Basic Plan",
                  description: "Growing businesses",
                  price: "49",
                  popular: true,
                  features: [
                    "Contact Management",
                    "Task and Activity Tracking",
                    "Automation Workflows",
                    "Customizable Dashboards",
                    "24/7 Priority Support",
                  ],
                },
                {
                  name: "Enterprise Plan",
                  description: "Large businesses",
                  price: "99",
                  features: [
                    "Contact Management",
                    "Task and Activity Tracking",
                    "Automation Workflows",
                    "Customizable Dashboards",
                    "24/7 Priority Support",
                  ],
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className={`relative p-8 rounded-3xl overflow-hidden ${
                    plan.popular ? "bg-[#2d2d2d]" : "bg-white/10"
                  }`}
                  style={{
                    backdropFilter: "blur(12px)",
                    border: plan.popular
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.1)",
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="absolute top-4 right-4 px-3 py-1 bg-lime-500/20 rounded-full"
                    >
                      <span className="text-xs font-medium text-lime-600">
                        Popular
                      </span>
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    {/* Price animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      className="flex items-baseline mb-8"
                    >
                      <span
                        className={`text-4xl font-bold ${
                          plan.popular ? "text-white" : "text-[#2d2d2d]"
                        }`}
                      >
                        ${plan.price}
                      </span>
                      <span
                        className={`text-sm ml-2 ${
                          plan.popular ? "text-white/60" : "text-[#666666]"
                        }`}
                      >
                        /month
                      </span>
                    </motion.div>

                    {/* Button with hover effect */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-xl mb-8 transition-all duration-300 ${
                        plan.popular
                          ? "bg-white text-[#2d2d2d] hover:bg-white/90"
                          : "bg-[#2d2d2d] text-white hover:bg-[#2d2d2d]/90"
                      }`}
                    >
                      Get Started
                    </motion.button>

                    {/* Features list with staggered animation */}
                    <div className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <motion.svg
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                            className={`w-5 h-5 ${
                              plan.popular ? "text-white" : "text-[#2d2d2d]"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                          <span
                            className={`text-sm ${
                              plan.popular ? "text-white/80" : "text-[#666666]"
                            }`}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: plan.popular
                        ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Features included */}
            <div className="mt-16 text-center">
              <p className="text-[#666666] mb-8">All Plans Include</p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  "Email Support",
                  "Real-Time Collaboration",
                  "Document Sharing",
                  "Mobile App Access",
                ].map((feature, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm text-[#666666]
                     border border-white/50"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-[#666666] mb-4 block">
              Common Question
            </span>
            <h2
              className={`text-4xl font-bold text-[#2d2d2d] ${plusJakarta.className}`}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How can a Active benefit my business?",
                answer:
                  "It can boost efficiency, improve customer service, organize data better, and increase sales by offering insights into customer behavior and preferences.",
              },
              {
                question: "What kind of customer support do you provide?",
                answer:
                  "We offer 24/7 dedicated support through multiple channels including live chat, email, and phone. Our expert team is always ready to help you with any questions or concerns.",
              },
              {
                question: "Can I change or cancel my subscription?",
                answer:
                  "Yes, you can modify or cancel your subscription at any time. Changes will take effect in the next billing cycle, and we offer prorated refunds for unused time.",
              },
              {
                question: "Can I try the Active before making a purchase?",
                answer:
                  "Absolutely! We offer a 14-day free trial with full access to all features, allowing you to experience the platform before making a commitment.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden
                             border border-white/20 hover:border-white/30 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  style={{
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <motion.button
                    className="w-full text-left p-6 focus:outline-none"
                    onClick={() => {
                      /* Add toggle logic here */
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <motion.h3
                        className={`text-lg font-medium text-[#2d2d2d] ${plusJakarta.className}`}
                        layout
                      >
                        {faq.question}
                      </motion.h3>
                      <motion.div
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-lime-500/10 
                                   flex items-center justify-center group-hover:bg-lime-500/20
                                   transition-all duration-300"
                        whileHover={{ rotate: 180 }}
                      >
                        <svg
                          className="w-4 h-4 text-lime-600 transform group-hover:rotate-180 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-[#666666] text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.button>

                  {/* Gradient line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background:
                        "linear-gradient(to right, #84cc16, #84cc16/50)",
                      transformOrigin: "left",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ready to Transform Section */}
        <div className="py-24 relative overflow-hidden">
          {/* Background gradient with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-50/80 via-white/60 to-lime-50/40 backdrop-blur-md" />

          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-48 -right-48 w-96 h-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(132,204,22,0.1) 0%, rgba(132,204,22,0) 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(132,204,22,0.1) 0%, rgba(132,204,22,0) 70%)",
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className="text-center relative z-10">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-lime-500/10 
                             text-lime-700 border border-lime-500/20 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Elevate Your Business
                </motion.span>

                <motion.h2
                  className={`text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6 ${plusJakarta.className}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Ready to Transform
                  <br />
                  Your Customer Management?
                </motion.h2>

                <motion.p
                  className="text-[#666666] text-lg mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Sign up today and see the difference Active can make for your
                  business.
                </motion.p>

                {/* Email subscription form with glassmorphism */}
                <div className="relative max-w-xl mx-auto">
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -left-16 -top-10 z-20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative">
                      <Image
                        src="/avatar1.png"
                        alt="Team member"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white shadow-lg"
                      />
                      <motion.div
                        className="absolute -right-1 -bottom-1 w-4 h-4 bg-lime-500 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -right-12 -top-6 z-20"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative">
                      <Image
                        src="/avatar2.png"
                        alt="Team member"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white shadow-lg"
                      />
                      <motion.div
                        className="absolute -right-1 -bottom-1 w-3 h-3 bg-lime-500 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Form with enhanced glassmorphism */}
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="w-full px-6 py-4 rounded-full 
                               bg-white/40 backdrop-blur-xl
                               border border-white/60
                               text-[#2d2d2d] placeholder-[#666666]
                               outline-none focus:ring-2 focus:ring-lime-500/20
                               shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                               transition-all duration-300
                               hover:bg-white/50 focus:bg-white/50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="absolute right-2 px-6 py-2.5 
                               bg-gradient-to-r from-lime-500 to-lime-600
                               text-white rounded-full text-sm font-medium
                               hover:from-lime-600 hover:to-lime-700
                               transition-all duration-200
                               shadow-[0_4px_20px_rgba(132,204,22,0.3)]"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(132,204,22,0.2), transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black, transparent)",
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Logo and description */}
              <div className="col-span-2 md:col-span-1">
                <Image
                  src="/img3.png"
                  alt="Active Logo"
                  width={40}
                  height={40}
                  className="mb-4"
                />
                <p className="text-sm text-[#666666] max-w-xs">
                  Streamline workflows and grow your business with effective
                  lead management.
                </p>
                <p className="text-sm text-[#666666] mt-4">
                  hello.active@gmail.com
                </p>
              </div>

              {/* Footer links */}
              {[
                {
                  title: "Features",
                  links: ["Benefits", "Why Choose Us", "How To Use", "Pricing"],
                },
                {
                  title: "Pages",
                  links: [
                    "Homepage",
                    "Contact",
                    "404 Page",
                    "Terms & Conditions",
                  ],
                },
                {
                  title: "Social",
                  links: ["Twitter(x)", "Instagram", "LinkedIn", "Dribbble"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-[#2d2d2d] mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="text-sm text-[#666666] hover:text-[#2d2d2d] transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
