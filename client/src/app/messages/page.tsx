"use client";

import { motion } from "framer-motion";

export default function MessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-bold mb-4"
      >
        Messages
      </motion.h1>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <p className="text-muted-foreground">Coming soon...</p>
      </motion.div>
    </motion.div>
  );
}
