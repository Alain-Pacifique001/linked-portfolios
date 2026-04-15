import { useInvestments } from '@/hooks/useInvestments';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  const { data: investments } = useInvestments();

  if (!investments?.length) return null;

  const sorted = [...investments].sort((a, b) => new Date(a.date_added).getTime() - new Date(b.date_added).getTime());

  let cumValue = 0;
  let cumCost = 0;
  const chartData = sorted.map((inv) => {
    cumValue += inv.current_price * inv.quantity;
    cumCost += inv.purchase_price * inv.quantity;
    return {
      date: new Date(inv.date_added).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(cumValue * 100) / 100,
      cost: Math.round(cumCost * 100) / 100,
    };
  });

  return (
    <div className="glass-card p-5">
      <h3 className="font-heading font-semibold text-foreground mb-4">Portfolio Performance</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradientValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="date" tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 20%, 95%)',
              }}
            />
            <Area type="monotone" dataKey="value" stroke="hsl(160, 70%, 45%)" fill="url(#gradientValue)" strokeWidth={2} name="Current Value" />
            <Area type="monotone" dataKey="cost" stroke="hsl(200, 80%, 55%)" fill="url(#gradientCost)" strokeWidth={2} name="Total Cost" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
