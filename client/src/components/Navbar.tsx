import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white/50 backdrop-blur-md border-b border-white/10
                    shadow-[0_2px_15px_rgba(0,0,0,0.05)] transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced hover effect */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image
                src="/img3.png"
                alt="Timebank Logo"
                width={80}
                height={80}
                className="object-contain drop-shadow-md transition-all duration-300
                         filter contrast-125 brightness-105 group-hover:scale-110
                         group-hover:rotate-3"
                quality={100}
                priority
              />
            </div>
            <span
              className="text-xl font-bold text-[#2d2d2d] transition-all duration-300
                          group-hover:text-[#404040] group-hover:translate-x-0.5"
            >
              Timebank
            </span>
          </Link>

          {/* Navigation Links with enhanced hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/product", label: "Product" },
              { href: "/reviews", label: "Reviews" },
              { href: "/benefits", label: "Benefits" },
              { href: "/pricing", label: "Pricing" },
              { href: "/changelog", label: "Changelog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-700 hover:text-gray-900 transition-all duration-300 
                        font-medium group py-2"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0 
                              transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>

          {/* CTA Button with enhanced hover effect */}
          <Link
            href="/get-clover"
            className="hidden md:inline-flex items-center px-4 py-2 bg-[#2d2d2d]/90 text-white rounded-lg 
                     hover:bg-[#404040] transition-all duration-300 text-sm font-semibold relative
                     shadow-[0_2px_10px_rgba(0,0,0,0.1)] overflow-hidden group
                     hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                     border border-[#1a1a1a]/50 backdrop-blur-sm"
          >
            <span className="relative z-10">Get Started</span>
            <div
              className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#404040] to-[#505050] 
                         transform translate-x-full group-hover:translate-x-0 transition-transform 
                         duration-300"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
