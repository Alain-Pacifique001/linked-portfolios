import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  { id: 1, name: "Grocery Store", category: "Food", amount: -85.20, date: "Today" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 4500.00, date: "Yesterday" },
  { id: 3, name: "Netflix", category: "Entertainment", amount: -15.99, date: "Mar 25" },
  { id: 4, name: "Electric Bill", category: "Utilities", amount: -120.00, date: "Mar 24" },
  { id: 5, name: "Freelance Payment", category: "Income", amount: 850.00, date: "Mar 23" },
];

const RecentTransactions = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-card-foreground mb-4">
        Recent Transactions
      </h3>
      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-lg p-3 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                tx.amount > 0 ? "bg-success/10" : "bg-destructive/10"
              }`}>
                {tx.amount > 0 ? (
                  <ArrowDownLeft className="h-4 w-4 text-success" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                tx.amount > 0 ? "text-success" : "text-card-foreground"
              }`}>
                {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
