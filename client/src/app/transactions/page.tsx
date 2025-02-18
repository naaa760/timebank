"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface Transaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  service: string;
  with: string;
  date: Date;
  status: "completed" | "pending" | "cancelled";
  description?: string;
}

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "earned" | "spent">("all");
  const [timeRange, setTimeRange] = useState("all");

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "earned",
      amount: 2,
      service: "Web Development",
      with: "John Doe",
      date: new Date("2024-03-20"),
      status: "completed",
      description: "Built a landing page",
    },
    {
      id: "2",
      type: "spent",
      amount: 1.5,
      service: "Language Tutoring",
      with: "Sarah Smith",
      date: new Date("2024-03-19"),
      status: "completed",
      description: "Spanish conversation practice",
    },
    // Add more mock transactions
  ];

  const stats = {
    totalEarned: transactions
      .filter((t) => t.type === "earned")
      .reduce((acc, t) => acc + t.amount, 0),
    totalSpent: transactions
      .filter((t) => t.type === "spent")
      .reduce((acc, t) => acc + t.amount, 0),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">
            Track your time credit earnings and spendings
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Balance
          </h3>
          <p className="text-3xl font-bold">
            {stats.totalEarned - stats.totalSpent} hours
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Earned
          </h3>
          <p className="text-3xl font-bold text-green-600">
            +{stats.totalEarned} hours
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total Spent
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            -{stats.totalSpent} hours
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Select
          value={filter}
          onValueChange={(value: "all" | "earned" | "spent") =>
            setFilter(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter transactions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="earned">Earned Only</SelectItem>
            <SelectItem value="spent">Spent Only</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="today">Today</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-4">
          {transactions
            .filter((tx) => filter === "all" || tx.type === filter)
            .map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {tx.type === "earned" ? (
                    <ArrowUpRight className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full" />
                  ) : (
                    <ArrowDownRight className="h-8 w-8 text-orange-500 bg-orange-50 p-1.5 rounded-full" />
                  )}
                  <div>
                    <h4 className="font-medium">{tx.service}</h4>
                    <p className="text-sm text-muted-foreground">
                      with {tx.with} • {format(tx.date, "PPP")}
                    </p>
                    {tx.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {tx.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.type === "earned"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {tx.type === "earned" ? "+" : "-"}
                    {tx.amount} hours
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.status}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
