"use client";
import { Navbar } from "@/components/dashboard/Navbar";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Video Background with darker contrast */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{
            filter: "contrast(1.2) brightness(0.4) saturate(1.4)", // Darkened brightness and increased contrast
            transform: "scale(1.02)",
          }}
        >
          <source src="/vid.mp4" type="video/mp4" />
        </video>

        {/* Animated Stars Layer */}
        <div className="absolute inset-0 z-[1]">
          <div className="stars-small" />
          <div className="stars-medium" />
          <div className="stars-large" />
        </div>

        {/* Enhanced Gradient Overlay with darker layers */}
        <div className="absolute inset-0 z-[2]">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-[2px]" />

          {/* Accent color gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-lime-900/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main className="pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>

        {/* Add the required CSS for star animations */}
        <style jsx>{`
          .stars-small,
          .stars-medium,
          .stars-large {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: block;
            background: transparent;
          }

          .stars-small {
            background-image: radial-gradient(
                2px 2px at 20px 30px,
                #fff,
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 50px 160px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0));
            background-size: 200px 200px;
            animation: sparkle 4s linear infinite;
            opacity: 0.3;
          }

          .stars-medium {
            background-image: radial-gradient(
                3px 3px at 50px 160px,
                #fff,
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(3px 3px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(3px 3px at 130px 80px, #fff, rgba(0, 0, 0, 0));
            background-size: 300px 300px;
            animation: sparkle 6s linear infinite;
            opacity: 0.4;
          }

          .stars-large {
            background-image: radial-gradient(
                4px 4px at 120px 120px,
                #fff,
                rgba(0, 0, 0, 0)
              ),
              radial-gradient(4px 4px at 180px 240px, #fff, rgba(0, 0, 0, 0)),
              radial-gradient(4px 4px at 240px 120px, #fff, rgba(0, 0, 0, 0));
            background-size: 400px 400px;
            animation: sparkle 8s linear infinite;
            opacity: 0.5;
          }

          @keyframes sparkle {
            from {
              transform: translateY(0px);
            }
            to {
              transform: translateY(-200px);
            }
          }
        `}</style>
      </div>
    </DashboardProvider>
  );
}
