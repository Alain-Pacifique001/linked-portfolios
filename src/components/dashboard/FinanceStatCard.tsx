import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FinanceStatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index?: number;
}

const FinanceStatCard = ({ title, value, change, changeType = "neutral", icon: Icon, index = 0 }: FinanceStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/20 transition-colors duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-heading text-2xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      {change && (
        <p className={`mt-3 text-xs font-medium ${
          changeType === "positive" ? "text-success" : changeType === "negative" ? "text-destructive" : "text-muted-foreground"
        }`}>
          {change}
        </p>
      )}
    </motion.div>
  );
};

export default FinanceStatCard;
