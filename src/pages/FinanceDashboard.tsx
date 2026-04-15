import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import FinanceStatCard from "@/components/dashboard/FinanceStatCard";
import SpendingChart from "@/components/dashboard/SpendingChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";

const stats = [
  { title: "Total Balance", value: "$24,563.00", change: "+2.5% from last month", changeType: "positive" as const, icon: Wallet },
  { title: "Monthly Income", value: "$5,350.00", change: "+$350 from last month", changeType: "positive" as const, icon: TrendingUp },
  { title: "Monthly Spending", value: "$2,847.19", change: "-12% from last month", changeType: "positive" as const, icon: TrendingDown },
  { title: "Total Savings", value: "$8,420.00", change: "67% of goal reached", changeType: "neutral" as const, icon: PiggyBank },
];

const FinanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <FinanceStatCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <CategoryBreakdown />
      </div>

      <RecentTransactions />
    </div>
  );
};

export default FinanceDashboard;
