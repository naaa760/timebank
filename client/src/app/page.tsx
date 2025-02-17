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

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/more-info"
                  className="group relative px-6 py-3 bg-[#f4f4f4] text-[#2d2d2d] rounded-lg font-semibold 
                               hover:bg-[#e8e8e8] transition-all duration-300 overflow-hidden
                               shadow-[0_2px_10px_rgba(0,0,0,0.06)]
                               hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                               border border-gray-200"
                >
                  <span className="relative z-10">More Info</span>
                  <div
                    className="absolute inset-0 w-0 bg-gradient-to-r from-gray-200 to-gray-300 
                                  transition-all duration-300 ease-out group-hover:w-full 
                                  group-active:bg-gray-400 -skew-x-12 origin-left"
                  ></div>
                </Link>
                <Link
                  href="/get-started"
                  className="group relative px-6 py-3 bg-[#2d2d2d] text-white rounded-lg font-semibold 
                               overflow-hidden transition-all duration-300
                               shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                               hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                               border border-[#1a1a1a]"
                >
                  <span className="relative z-10">Get Started</span>
                  <div
                    className="absolute inset-0 w-0 bg-gradient-to-r from-[#404040] to-[#505050] 
                                  transition-all duration-300 ease-out group-hover:w-full 
                                  group-active:bg-[#606060] -skew-x-12 origin-left"
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
    </div>
  );
}
