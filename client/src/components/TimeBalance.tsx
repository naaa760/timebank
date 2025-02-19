"use client";

import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  RotateCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface TimeBalanceStats {
  currentBalance: number;
  earnedToday: number;
  spentWeek: number;
}

export default function TimeBalance() {
  const { state } = useDashboard();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotations, setRotations] = useState(0);

  if (state.loading.profile) {
    return <Skeleton className="h-[280px] w-full rounded-xl" />;
  }

  if (state.error.profile) {
    return <div className="text-red-500">{state.error.profile}</div>;
  }

  // This would typically fetch the balance from an API
  const stats: TimeBalanceStats = {
    currentBalance: 25.5,
    earnedToday: 2,
    spentWeek: 4.5,
  };

  const handleFlip = () => {
    if (rotations < 2) {
      setIsFlipped(!isFlipped);
      setRotations((prev) => prev + 1);
    }
  };

  return (
    <div className="relative perspective-1000">
      <motion.div
        className="relative w-full cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleFlip}
      >
        {/* Front side */}
        <div
          className={`${
            isFlipped ? "backface-hidden" : ""
          } bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary flex items-center">
              <Clock className="mr-2 h-6 w-6" />
              Time Balance
            </h2>
            <RotateCw
              className={`h-5 w-5 text-primary/60 hover:text-primary transition-colors ${
                rotations >= 2 ? "opacity-50" : "cursor-pointer"
              }`}
            />
          </div>
          <div className="grid gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between space-x-4 bg-white/30 p-4 rounded-lg backdrop-blur-md hover:bg-white/40 transition-colors duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Balance
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {state.profile?.timeCredits} hours
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last updated</p>
                <p className="text-sm font-medium">Today at 14:30</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-green-100/80 p-4 rounded-lg hover:bg-green-100 transition-colors duration-300"
              >
                <div className="bg-green-500/20 p-2 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-green-800">
                    Earned Today
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    +{stats.earnedToday}h
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-orange-100/80 p-4 rounded-lg hover:bg-orange-100 transition-colors duration-300"
              >
                <div className="bg-orange-500/20 p-2 rounded-full">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-800">
                    Spent This Week
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    -{stats.spentWeek}h
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          className={`absolute inset-0 backface-hidden rotateY-180 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary flex items-center">
              <Clock className="mr-2 h-6 w-6" />
              Statistics
            </h2>
            <RotateCw
              className={`h-5 w-5 text-primary/60 hover:text-primary transition-colors ${
                rotations >= 2 ? "opacity-50" : "cursor-pointer"
              }`}
            />
          </div>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/30 p-4 rounded-lg backdrop-blur-md"
            >
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Average
              </p>
              <p className="text-2xl font-bold text-primary">15.5 hours</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Add some CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
