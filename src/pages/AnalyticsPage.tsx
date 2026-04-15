import { useInvestments } from '@/hooks/useInvestments';
import { motion } from 'framer-motion';
import PortfolioStatCard from '@/components/portfolio/PortfolioStatCard';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import PortfolioChart from '@/components/portfolio/PortfolioChart';
import { BarChart3, TrendingUp, Shield, Target } from 'lucide-react';

const AnalyticsPage = () => {
  const { data: investments } = useInvestments();

  const totalValue = investments?.reduce((sum, inv) => sum + inv.current_price * inv.quantity, 0) ?? 0;
  const totalCost = investments?.reduce((sum, inv) => sum + inv.purchase_price * inv.quantity, 0) ?? 0;
  const roi = totalCost > 0 ? ((totalValue - totalCost) / totalCost * 100) : 0;

  const uniqueTypes = new Set(investments?.map(i => i.asset_type)).size;
  const riskScore = uniqueTypes >= 4 ? 'Low' : uniqueTypes >= 2 ? 'Medium' : 'High';

  const sorted = [...(investments ?? [])].sort((a, b) => {
    const aP = a.purchase_price > 0 ? (a.current_price - a.purchase_price) / a.purchase_price : 0;
    const bP = b.purchase_price > 0 ? (b.current_price - b.purchase_price) / b.purchase_price : 0;
    return bP - aP;
  });
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Portfolio performance metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PortfolioStatCard title="ROI" value={`${roi >= 0 ? '+' : ''}${roi.toFixed(1)}%`} changeType={roi >= 0 ? 'positive' : 'negative'} icon={<BarChart3 className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Risk Level" value={riskScore} change={`${uniqueTypes} asset types`} changeType={riskScore === 'Low' ? 'positive' : riskScore === 'Medium' ? 'neutral' : 'negative'} icon={<Shield className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Best Performer" value={best?.asset_symbol ?? '-'} change={best ? `${((best.current_price - best.purchase_price) / best.purchase_price * 100).toFixed(1)}%` : undefined} changeType="positive" icon={<TrendingUp className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Worst Performer" value={worst?.asset_symbol ?? '-'} change={worst ? `${((worst.current_price - worst.purchase_price) / worst.purchase_price * 100).toFixed(1)}%` : undefined} changeType="negative" icon={<Target className="w-5 h-5 text-primary" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PerformanceChart />
        <PortfolioChart />
      </div>

      <div className="glass-card p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-xs text-muted-foreground">Total Invested</p><p className="text-lg font-heading font-bold text-foreground">{formatCurrency(totalCost)}</p></div>
          <div><p className="text-xs text-muted-foreground">Current Value</p><p className="text-lg font-heading font-bold text-foreground">{formatCurrency(totalValue)}</p></div>
          <div><p className="text-xs text-muted-foreground">Number of Holdings</p><p className="text-lg font-heading font-bold text-foreground">{investments?.length ?? 0}</p></div>
          <div><p className="text-xs text-muted-foreground">Asset Types</p><p className="text-lg font-heading font-bold text-foreground">{uniqueTypes}</p></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
