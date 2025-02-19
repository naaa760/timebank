"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ["Features", "Pricing", "About", "Contact"];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      {/* Lime gradient background with transparency */}
      <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-lime-600/5 backdrop-blur-md rounded-full border border-lime-500/20" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/img3.png"
                alt="TiMBa Logo"
                width={36}
                height={36}
                className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-semibold text-gray-900 group-hover:text-lime-600 transition-colors">
                TiMBa
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-lime-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative group py-2"
              >
                <span className="text-gray-700 font-medium hover:text-lime-600 transition-colors duration-300">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Auth Links and Dashboard */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedOut>
              <SignInButton mode="modal">
                <span className="relative group cursor-pointer">
                  <span className="text-gray-700 font-medium hover:text-lime-600 transition-colors duration-300">
                    Sign In
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </span>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* Dashboard Link */}
              <Link href="/dashboard" className="relative group">
                <span className="text-gray-700 font-medium hover:text-lime-600 transition-colors duration-300">
                  Dashboard
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>

              {/* User Button */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 rounded-full border-2 border-lime-500/50 hover:border-lime-500 transition-colors duration-300",
                    userButtonPopoverCard:
                      "bg-white/90 backdrop-blur-sm shadow-xl border border-lime-500/20 rounded-2xl",
                    userButtonPopoverActions: "p-2",
                    userButtonPopoverActionButton:
                      "hover:bg-lime-50 text-gray-700 rounded-xl",
                    userButtonPopoverFooter: "hidden",
                    userButtonTrigger: "rounded-full hover:opacity-80",
                  },
                  variables: {
                    colorBackground: "white",
                    colorText: "#374151",
                    colorPrimary: "rgb(132, 204, 22)",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-2xl border border-lime-500/20 shadow-lg p-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <SignedOut>
                <SignInButton mode="modal">
                  <span className="block px-4 py-2 text-gray-700 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors">
                    Sign In
                  </span>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
