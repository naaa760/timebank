"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, TrendingUp, TrendingDown } from "lucide-react";

interface TimeBalanceStats {
  currentBalance: number;
  earnedToday: number;
  spentWeek: number;
}

export default function TimeBalance() {
  const { state } = useDashboard();

  if (state.loading.profile) {
    return <Skeleton className="h-20 w-48" />;
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

  return (
    <div className="grid gap-4">
      <div className="flex items-center space-x-4 bg-white/50 p-4 rounded-lg backdrop-blur-sm">
        <CreditCard className="h-8 w-8 text-primary" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Current Balance
          </p>
          <p className="text-3xl font-bold text-primary">
            {state.profile?.timeCredits} hours
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-xs text-muted-foreground">Earned Today</p>
            <p className="text-lg font-semibold text-green-600">
              +{stats.earnedToday}h
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg">
          <TrendingDown className="h-5 w-5 text-orange-600" />
          <div>
            <p className="text-xs text-muted-foreground">Spent This Week</p>
            <p className="text-lg font-semibold text-orange-600">
              -{stats.spentWeek}h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
