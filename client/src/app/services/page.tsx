"use client";

import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ServiceCard from "@/components/ServiceCard";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    category: new Set<string>(),
    duration: new Set<string>(),
    availability: new Set<string>(),
  });

  const categories = [
    "Technology",
    "Education",
    "Health & Wellness",
    "Home & Garden",
    "Arts & Crafts",
    "Business",
  ];

  const durations = ["1-2 hours", "2-4 hours", "4-8 hours", "Full day"];

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const updated = new Set(prev[type]);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return { ...prev, [type]: updated };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold">Available Services</h1>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {(filters.category.size > 0 ||
                  filters.duration.size > 0 ||
                  filters.availability.size > 0) && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-lime-500 text-white text-xs flex items-center justify-center">
                    {filters.category.size +
                      filters.duration.size +
                      filters.availability.size}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Categories</h4>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={filters.category.has(category)}
                    onCheckedChange={() => toggleFilter("category", category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              <div className="border-t p-2">
                <h4 className="mb-2 text-sm font-medium">Duration</h4>
                {durations.map((duration) => (
                  <DropdownMenuCheckboxItem
                    key={duration}
                    checked={filters.duration.has(duration)}
                    onCheckedChange={() => toggleFilter("duration", duration)}
                  >
                    {duration}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              <div className="border-t p-2">
                <h4 className="mb-2 text-sm font-medium">Availability</h4>
                <DropdownMenuCheckboxItem
                  checked={filters.availability.has("available")}
                  onCheckedChange={() =>
                    toggleFilter("availability", "available")
                  }
                >
                  Available Now
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.availability.has("weekend")}
                  onCheckedChange={() =>
                    toggleFilter("availability", "weekend")
                  }
                >
                  Weekend Only
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex border rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid" ? "bg-primary text-white" : ""
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list" ? "bg-primary text-white" : ""
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-10 w-full md:w-96"
          />
        </div>
      </motion.div>

      {/* Services Grid/List */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ServiceCard />
        {/* More ServiceCards will be mapped here */}
      </motion.div>
    </motion.div>
  );
}
