"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-white relative overflow-hidden transition-all duration-700 
                     ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Decorative Spiral Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top right spiral */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
          <div className="w-[600px] h-[600px] animate-slow-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <path
                d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="0.5"
                className="animate-draw-spiral"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Bottom left wave */}
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
          <div className="w-[800px] h-[800px] animate-slow-spin-reverse">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
              <path
                d="M0,50 Q25,40 50,50 T100,50 T150,50"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="0.8"
                className="animate-draw-wave"
              />
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8ffd5] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ffd5e8] rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 612 869"
        >
          <path
            d="M 5.486 1225.424 C 4.572 1058.169 71.005 692.917 344.053 569.983 C 617.101 447.048 625.8 141.968 596.019 4.784"
            fill="none"
            stroke="rgb(238, 195, 66)"
            strokeWidth="11"
            className="animate-draw"
          />
        </svg>
      </div>

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
                Maximize savings with GreenClover, the AI-powered business card
                that optimizes every purchase, giving you unmatched value
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

      {/* Why Choose Us section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]" />

        {/* Decorative elements */}
        <div className="absolute inset-0">
          {/* Floating orbs */}
          <div
            className="absolute top-20 right-40 w-[300px] h-[300px] rounded-full 
                          bg-gradient-to-br from-[#e2d1c3]/30 to-transparent blur-[60px] 
                          animate-float-slow"
          />
          <div
            className="absolute bottom-40 left-20 w-[400px] h-[400px] rounded-full 
                          bg-gradient-to-tr from-[#e2d1c3]/20 to-transparent blur-[80px] 
                          animate-float-slow-reverse"
          />

          {/* Subtle patterns */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#84cc16] text-sm font-medium inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#84cc16]" />
              THE CLOVER ADVANTAGES
              <span className="w-8 h-[1px] bg-[#84cc16]" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2d2d] mt-4 mb-6">
              Why Choose Us?
            </h2>
          </div>
        </div>
      </section>

      {/* Unique Features section */}
      <section className="py-32 relative overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]" />

        {/* Decorative elements */}
        <div className="absolute inset-0">
          {/* Animated gradient circles */}
          <div
            className="absolute -top-1/4 right-0 w-[800px] h-[800px] rounded-full 
                          bg-gradient-to-br from-[#e2d1c3]/40 via-[#fdfcfb]/20 to-transparent 
                          blur-[100px] animate-pulse-slow transform rotate-12"
          />

          <div
            className="absolute -bottom-1/4 left-0 w-[800px] h-[800px] rounded-full 
                          bg-gradient-to-tr from-[#e2d1c3]/30 via-[#fdfcfb]/10 to-transparent 
                          blur-[120px] animate-pulse-slow-reverse transform -rotate-12"
          />

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(226, 209, 195, ${
                  0.3 + Math.random() * 0.4
                })`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2
              className={`text-[40px] font-bold text-[#2d2d2d] mb-6 ${plusJakarta.className}
                            [text-shadow:_0_1px_1px_rgb(255_255_255_/_80%)]`}
            >
              Unique Features That Make a Difference
            </h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto leading-relaxed">
              Focusing on innovation and usability, we provide tools that
              enhance productivity and drive success.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
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
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-[32px] p-12 
                             transition-all duration-500 hover-glow feature-card
                             border border-[#e2d1c3]/20 shadow-[0_4px_30px_rgba(226,209,195,0.1)]
                             hover:shadow-[0_20px_40px_rgba(226,209,195,0.2)]
                             hover:-translate-y-2"
              >
                <div className="mb-10">
                  <div
                    className="w-[80px] h-[80px] bg-gradient-to-br from-white to-[#fdfcfb] 
                                rounded-full flex items-center justify-center
                                shadow-[0_8px_20px_rgba(226,209,195,0.15)] group-hover:scale-110 
                                transition-all duration-500 border border-[#e2d1c3]/20"
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3
                  className={`text-[24px] font-semibold text-[#2d2d2d] mb-4 ${plusJakarta.className}`}
                >
                  {feature.title}
                </h3>
                <p className="text-[#666666] text-[17px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
