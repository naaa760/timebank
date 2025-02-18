import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Update scroll state
  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", updateScrollState);
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: navBackground,
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced hover effect */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl">
              <Image
                src="/img3.png"
                alt="Logo"
                width={80}
                height={80}
                className="object-contain drop-shadow-md transition-all duration-300
                         group-hover:scale-110 group-hover:rotate-3"
                quality={100}
                priority
              />
            </div>
            <span
              className={`text-xl font-bold transition-all duration-300
                          ${isScrolled ? "text-gray-600" : "text-gray-200"}`}
            >
              Active
            </span>
          </Link>

          {/* Navigation Links with enhanced hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {["Features", "Pricing", "About", "Contact"].map((link) => (
              <Link
                key={link}
                href="#"
                className={`relative text-sm font-medium transition-all duration-300 
                        group py-2 ${
                          isScrolled ? "text-gray-500" : "text-gray-300"
                        } hover:text-gray-800`}
              >
                {link}
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-500 transform scale-x-0 
                              transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium
                       transition-all duration-300 
                       ${
                         isScrolled
                           ? "text-gray-600 hover:text-gray-900"
                           : "text-gray-300 hover:text-white"
                       }`}
            >
              Sign In
            </motion.button>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium
                       transition-all duration-300 
                       ${
                         isScrolled
                           ? "bg-[#2d2d2d] text-white hover:bg-[#1a1a1a]"
                           : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                       }`}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <svg
              className={`w-6 h-6 ${
                isScrolled ? "text-gray-600" : "text-gray-200"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Subtle border that appears on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"
        style={{
          opacity: useTransform(scrollY, [0, 100], [0, 1]),
        }}
      />
    </motion.nav>
  );
}
