import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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

      <main className="flex min-h-screen flex-col items-center justify-center">
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
      <section className="py-20 bg-[#f9fff0]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-[#84cc16] font-medium inline-flex items-center gap-2 mb-2">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L10 5.09L15.5 5.09L11 8.19L13 13.28L8 10.18L3 13.28L5 8.19L0.5 5.09L6 5.09L8 0Z" />
              </svg>
              THE CLOVER ADVANTAGES
            </span>
            <h2 className="text-[2.5rem] font-bold text-[#2d2d2d] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-[#4a4a4a] text-lg">
              Leverage the power of AI to automatically optimize your purchases,
              ensuring you get the best value for your business with every
              transaction.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI-Optimized Savings */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 
                          transition-all duration-300 
                          border border-[#e8ffd5] shadow-[0_2px_15px_-3px_rgba(132,204,22,0.05)]
                          hover:shadow-[0_8px_25px_-5px_rgba(132,204,22,0.15)]
                          hover:border-[#84cc16]/30 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                AI-Optimized Savings – No Effort Required
              </h3>
              <p className="text-[#4a4a4a]">
                Never miss an opportunity to save. Unlike traditional cards, our
                AI dynamically adjusts to maximize your savings on every
                purchase in real-time.
              </p>
            </div>

            {/* Real-Time Insights */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 
                          transition-all duration-300 
                          border border-[#e8ffd5] shadow-[0_2px_15px_-3px_rgba(132,204,22,0.05)]
                          hover:shadow-[0_8px_25px_-5px_rgba(132,204,22,0.15)]
                          hover:border-[#84cc16]/30 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.5h-15V5h15v14.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                Real-Time Insights – Smarter Spending
              </h3>
              <p className="text-[#4a4a4a]">
                Stay in control with detailed analytics. We provide transparent
                spending reports and intelligent insights to guide your
                financial decisions.
              </p>
            </div>

            {/* Flexible Plans */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 
                          transition-all duration-300 
                          border border-[#e8ffd5] shadow-[0_2px_15px_-3px_rgba(132,204,22,0.05)]
                          hover:shadow-[0_8px_25px_-5px_rgba(132,204,22,0.15)]
                          hover:border-[#84cc16]/30 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3zm-7 2h2v2h-2V5zm-2 12h-2v-2h2v2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                Flexible Plans – Tailored for You
              </h3>
              <p className="text-[#4a4a4a]">
                Adaptive plans adjust monthly, ensuring you always get the best
                savings, rewards, and maximum optimal value for your business
                needs.
              </p>
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
        </div>
      </section>
    </div>
  );
}
