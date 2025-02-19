"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Bell, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [notifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/services", label: "Services" },
    { href: "/community", label: "Community" },
    { href: "/messages", label: "Messages" },
    { href: "/calendar", label: "Calendar" },
  ];

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-md shadow-brown-500/20"
            : "bg-gradient-to-r from-white/50 via-white/60 to-white/50 backdrop-blur-sm"
        }
        rounded-2xl border border-brown-500/20 shadow-lg`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-lime-500/5 via-white/5 to-lime-500/5" />

      <div className="relative flex items-center justify-between px-6 h-16">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            href="/dashboard"
            className="font-bold text-xl bg-gradient-to-r from-brown-500 to-brown-600 
              bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            TimeBank
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  backdrop-blur-sm
                  ${
                    pathname === link.href
                      ? "bg-lime-500/10 text-brown-700 shadow-sm scale-105 border border-brown-500/20"
                      : "text-muted-foreground hover:bg-brown-50 hover:text-brown-600 hover:scale-105 hover:shadow-sm"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 w-64 rounded-full bg-white/50 border-brown-500/20 
                focus:border-brown-500/30 focus:ring-2 focus:ring-brown-500/20 transition-all
                placeholder:text-muted-foreground/70"
            />
          </div>

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-brown-50 hover:text-brown-600
              transition-all duration-200 backdrop-blur-sm"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full 
                bg-brown-500 text-white text-xs flex items-center justify-center 
                animate-pulse shadow-sm backdrop-blur-sm"
              >
                {notifications}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-brown-50 hover:text-brown-600
              transition-all duration-200 backdrop-blur-sm"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ring-2 ring-brown-500/20 
                  hover:ring-brown-500/40 hover:bg-brown-50 transition-all duration-200 
                  backdrop-blur-sm shadow-sm"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.fullName || ""}
                  />
                  <AvatarFallback>
                    {user?.fullName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 rounded-xl border border-brown-500/20 bg-white/80 
                backdrop-blur-md shadow-lg divide-y divide-brown-500/20"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer hover:bg-brown-50 hover:text-brown-600"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer hover:bg-brown-50 hover:text-brown-600"
                >
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
