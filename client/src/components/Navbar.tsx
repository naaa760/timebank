import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png" // Add your logo to public folder
              alt="Clover Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-[#2d2d2d]">Clover</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Product
            </Link>
            <Link
              href="/reviews"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/benefits"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/changelog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Changelog
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/get-clover"
            className="hidden md:inline-flex items-center px-4 py-2 bg-[#2d2d2d] text-white rounded-lg 
                     hover:bg-[#404040] transition-all duration-300 text-sm font-medium"
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
