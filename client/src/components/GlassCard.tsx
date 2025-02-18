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
    <motion.div
      className="glass-card relative w-full h-[300px] rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background:
          "linear-gradient(135deg, rgba(192,192,192,0.2) 0%, rgba(211,211,211,0.08) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(211,211,211,0.25)",
        boxShadow:
          "0 8px 32px 0 rgba(192,192,192,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.25 : 0,
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.9) 0%, transparent 50%)`,
        }}
      />

      <div className="p-8 h-full flex flex-col justify-between">
        <div>
          <motion.span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              background: "rgba(211,211,211,0.15)",
              border: "1px solid rgba(211,211,211,0.3)",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Featured
          </motion.span>
          <motion.h2
            className="mt-4 text-4xl font-light tracking-tight text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Discover Innovation
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experience the future of design with our cutting-edge solutions
          </motion.p>
        </div>

        <motion.button
          className="w-fit px-6 py-3 rounded-full text-sm font-medium text-gray-100 transition-all duration-300"
          style={{
            background: "rgba(211,211,211,0.15)",
            border: "1px solid rgba(211,211,211,0.3)",
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
          whileHover={{
            scale: 1.02,
            background: "rgba(211,211,211,0.2)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};
