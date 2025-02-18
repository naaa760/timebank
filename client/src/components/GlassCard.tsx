import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const GlassCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = document.querySelector(".glass-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full px-4 sm:px-0">
      <motion.div
        className="glass-card relative w-full min-h-[200px] md:min-h-[300px] 
                   rounded-xl sm:rounded-3xl overflow-hidden mx-auto
                   max-w-[400px] sm:max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -10,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow:
            "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
        }}
      >
        {/* Hover gradient effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            transition: { duration: 0.2 },
          }}
        />

        {/* Mouse follow effect - Hide on mobile */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none hidden sm:block"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.9) 0%, transparent 50%)`,
          }}
        />

        <div className="p-6 sm:p-8 h-full flex flex-col justify-between relative z-10">
          <div>
            <motion.span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Featured
            </motion.span>

            <motion.h2
              className="mt-4 text-2xl md:text-4xl font-light tracking-tight text-[#2d2d2d]
                         leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.2 }}
            >
              Discover Innovation
            </motion.h2>

            <motion.p
              className="mt-3 text-base md:text-lg text-[#666666] leading-relaxed
                         max-w-[280px] sm:max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ x: 5 }}
              transition={{ delay: 0.3 }}
            >
              Experience the future of design with our cutting-edge solutions
            </motion.p>
          </div>

          <motion.button
            className="w-fit mt-6 px-5 py-2.5 rounded-full text-sm font-medium 
                       text-[#2d2d2d] transition-all duration-300"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
