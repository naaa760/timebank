import { motion } from "framer-motion";
import Image from "next/image";

export const GlassCard = () => {
  return (
    <div className="w-full px-4 sm:px-0">
      <div
        className="glass-card relative w-full min-h-[200px] md:min-h-[300px] 
                   rounded-xl sm:rounded-3xl overflow-hidden mx-auto
                   max-w-[400px] sm:max-w-none
                   bg-white/10 backdrop-blur-md border border-white/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
        }}
      >
        {/* Background Image with animation */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/img4.png"
            alt="Innovation illustration"
            fill
            className="object-cover filter contrast-75 brightness-110"
          />
        </motion.div>

        {/* Additional animated image */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            scale: [1.05, 1, 1.05],
            rotate: [-1, 1, -1],
            y: [5, -5, 5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        >
          <Image
            src="/img5.png"
            alt="Additional illustration"
            fill
            className="object-cover filter contrast-75 brightness-105 transform-gpu"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Featured
            </span>

            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d2d2d] mb-4">
              Discover Innovation
            </h2>

            <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-[280px] sm:max-w-none">
              Experience the future of design with our cutting-edge solutions
            </p>
          </div>

          <button
            className="w-fit mt-6 px-5 py-2.5 rounded-full text-sm font-medium 
                     text-[#2d2d2d] transition-all duration-300
                     hover:bg-white/20"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
