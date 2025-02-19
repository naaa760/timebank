"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentTransactions() {
  const { state } = useDashboard();

  if (state.loading.transactions) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (state.error.transactions) {
    return <div className="text-red-500">{state.error.transactions}</div>;
  }

  return (
    <div className="space-y-4">
      {state.transactions.slice(0, 5).map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div>
            <h3 className="font-medium">{transaction.service}</h3>
            <p className="text-sm text-muted-foreground">
              with {transaction.with.name}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`font-medium ${
                transaction.type === "earned"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {transaction.type === "earned" ? "+" : "-"}
              {transaction.amount} hours
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {transaction.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
