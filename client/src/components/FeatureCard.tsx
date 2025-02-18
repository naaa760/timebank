import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      className="relative w-full min-h-[180px] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [-5, -25, -5], // More pronounced vertical movement
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      transition={{
        y: {
          duration: 1.5, // Faster duration for snappier movement
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5, // Increased delay between cards
        },
        opacity: { duration: 0.6 },
      }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 8px 32px 0 rgba(31,38,135,0.1), inset 0 1px 1px rgba(255,255,255,0.3)",
      }}
    >
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 4px 12px rgba(31,38,135,0.1)",
          }}
        >
          {icon}
        </motion.div>

        <h3 className="text-xl font-semibold text-[#2d2d2d] mb-2">{title}</h3>

        <p className="text-[#666666] text-sm leading-relaxed">{description}</p>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-white/40 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
