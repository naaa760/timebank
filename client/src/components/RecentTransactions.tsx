import { Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Transaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  service: string;
  with: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

export default function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "earned",
      amount: 2,
      service: "Web Development",
      with: "John Doe",
      date: "2024-03-20",
      status: "completed",
    },
    {
      id: "2",
      type: "spent",
      amount: 1.5,
      service: "Language Tutoring",
      with: "Sarah Smith",
      date: "2024-03-19",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {tx.type === "earned" ? (
                <ArrowUpRight className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-orange-500" />
              )}
              <div>
                <p className="font-medium">{tx.service}</p>
                <p className="text-sm text-muted-foreground">with {tx.with}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  tx.type === "earned" ? "text-green-600" : "text-orange-600"
                }`}
              >
                {tx.type === "earned" ? "+" : "-"}
                {tx.amount}h
              </p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
