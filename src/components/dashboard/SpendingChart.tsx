import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", spending: 2400, income: 4000 },
  { month: "Feb", spending: 1398, income: 3800 },
  { month: "Mar", spending: 3200, income: 4200 },
  { month: "Apr", spending: 2780, income: 4100 },
  { month: "May", spending: 1890, income: 3900 },
  { month: "Jun", spending: 2390, income: 4300 },
  { month: "Jul", spending: 2490, income: 4500 },
];

const SpendingChart = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-card-foreground mb-4">
        Income vs Spending
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="spendingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="month" stroke="hsl(215, 15%, 55%)" fontSize={12} />
          <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 18%, 12%)",
              border: "1px solid hsl(220, 14%, 18%)",
              borderRadius: "8px",
              color: "hsl(210, 20%, 95%)",
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="income" stroke="hsl(160, 70%, 45%)" fill="url(#incomeGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="spending" stroke="hsl(200, 80%, 55%)" fill="url(#spendingGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
