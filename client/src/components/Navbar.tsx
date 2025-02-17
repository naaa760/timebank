import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100
                   shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png" // Add your logo to public folder
              alt="Clover Logo"
              width={32}
              height={32}
              className="w-8 h-8 drop-shadow-md"
            />
            <span
              className="text-xl font-bold text-[#2d2d2d]
                            [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)]"
            >
              Timebank
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium
                        drop-shadow-sm hover:drop-shadow"
            >
              Product
            </Link>
            <Link
              href="/reviews"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium
                        drop-shadow-sm hover:drop-shadow"
            >
              Reviews
            </Link>
            <Link
              href="/benefits"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium
                        drop-shadow-sm hover:drop-shadow"
            >
              Benefits
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium
                        drop-shadow-sm hover:drop-shadow"
            >
              Pricing
            </Link>
            <Link
              href="/changelog"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium
                        drop-shadow-sm hover:drop-shadow"
            >
              Changelog
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/get-clover"
            className="hidden md:inline-flex items-center px-4 py-2 bg-[#2d2d2d] text-white rounded-lg 
                     hover:bg-[#404040] transition-all duration-300 text-sm font-semibold
                     shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                     hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                     border border-[#1a1a1a]"
          >
            Get Clover
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
