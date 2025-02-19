"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Web Development Session",
      date: "2024-02-15",
      time: "14:00",
      participants: 3,
      type: "Teaching",
    },
    {
      id: 2,
      title: "Gardening Workshop",
      date: "2024-02-16",
      time: "10:00",
      participants: 5,
      type: "Learning",
    },
    // Add more events as needed
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("/ti.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-white/30 to-emerald-500/10 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-8 space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold text-gray-800">Your Schedule</h1>
          <motion.div
            whileHover={{ x: 5, color: "rgb(132, 204, 22)" }}
            className="flex items-center text-gray-600 hover:text-lime-600 cursor-pointer transition-colors duration-300"
          >
            <span className="text-lg">Add New Event</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-6 bg-white/60 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Upcoming Events
            </h2>
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                }}
                className="bg-white/60 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      event.type === "Teaching"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
                <motion.div
                  className="mt-3 flex items-center text-lime-600 text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div
          variants={itemVariants}
          className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Todays Schedule
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-lime-200" />
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="ml-10 relative mb-8 last:mb-0"
              >
                <div className="absolute -left-6 top-0 h-4 w-4 rounded-full bg-lime-500" />
                <div className="bg-white/70 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Meeting with John Doe
                      </h3>
                      <p className="text-sm text-gray-600">
                        Discussion about web development project
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">10:00 AM</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
