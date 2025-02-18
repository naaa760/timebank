"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {["Features", "Pricing", "About", "Contact"].map((item) => (
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
          <div className="flex items-center space-x-8">
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
      </div>
    </nav>
  );
};
