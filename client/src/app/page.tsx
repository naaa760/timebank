import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Background SVG decorations */}
      <div className="absolute inset-0 z-0">
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

      {/* Trusted businesses banner */}
      <div className="text-center mb-8">
        <span className="bg-[#e8ffd5] text-[#2d2d2d] px-4 py-2 rounded-full text-sm font-medium">
          55,000+ trusted Businesses
        </span>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-semibold text-[#2d2d2d] leading-tight mb-6">
              Put More Cash Back in Your Business Pocket.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Maximize savings with GreenClover, the AI-powered business card
              that optimizes every purchase, giving you unmatched value
              effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/more-info"
                className="px-6 py-3 bg-[#f4f4f4] text-[#2d2d2d] rounded-lg font-medium 
                             hover:bg-[#e8e8e8] transition-all duration-300"
              >
                More Info
              </Link>
              <Link
                href="/get-started"
                className="px-6 py-3 bg-[#2d2d2d] text-white rounded-lg font-medium 
                             hover:bg-[#404040] transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>*No long-term commitment, cancel anytime.*</p>
              <p>*Instant savings first, monthly updates on the 1st.*</p>
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
  );
}
