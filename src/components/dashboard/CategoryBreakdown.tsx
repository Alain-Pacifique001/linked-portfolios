import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Housing", value: 1200, color: "hsl(160, 70%, 45%)" },
  { name: "Food", value: 650, color: "hsl(200, 80%, 55%)" },
  { name: "Transport", value: 320, color: "hsl(280, 65%, 60%)" },
  { name: "Entertainment", value: 180, color: "hsl(38, 92%, 50%)" },
  { name: "Utilities", value: 250, color: "hsl(0, 72%, 55%)" },
];

const CategoryBreakdown = () => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="font-heading text-base font-semibold text-card-foreground mb-4">
        Spending by Category
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 18%, 12%)",
              border: "1px solid hsl(220, 14%, 18%)",
              borderRadius: "8px",
              color: "hsl(210, 20%, 95%)",
              fontSize: "13px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-card-foreground">
              ${item.value} ({((item.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
