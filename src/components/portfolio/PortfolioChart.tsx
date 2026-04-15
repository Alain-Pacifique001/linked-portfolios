import { useInvestments } from '@/hooks/useInvestments';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  'hsl(200, 80%, 55%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 65%, 60%)',
  'hsl(160, 70%, 45%)',
  'hsl(0, 72%, 55%)',
];

const PortfolioChart = () => {
  const { data: investments } = useInvestments();

  if (!investments?.length) return null;

  const grouped = investments.reduce<Record<string, number>>((acc, inv) => {
    const val = inv.current_price * inv.quantity;
    acc[inv.asset_type] = (acc[inv.asset_type] || 0) + val;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Math.round(value * 100) / 100,
  }));

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="glass-card p-5">
      <h3 className="font-heading font-semibold text-foreground mb-4">Asset Allocation</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 14%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 20%, 95%)',
              }}
            />
            <Legend
              formatter={(value) => <span style={{ color: 'hsl(215, 15%, 55%)' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;
