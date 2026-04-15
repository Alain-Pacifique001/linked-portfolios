import { useInvestments } from '@/hooks/useInvestments';
import PortfolioStatCard from '@/components/portfolio/PortfolioStatCard';
import PortfolioChart from '@/components/portfolio/PortfolioChart';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import InvestmentTable from '@/components/portfolio/InvestmentTable';
import AddInvestmentDialog from '@/components/portfolio/AddInvestmentDialog';
import { DollarSign, TrendingUp, BarChart3, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioDashboard = () => {
  const { data: investments } = useInvestments();

  const totalValue = investments?.reduce((sum, inv) => sum + inv.current_price * inv.quantity, 0) ?? 0;
  const totalCost = investments?.reduce((sum, inv) => sum + inv.purchase_price * inv.quantity, 0) ?? 0;
  const totalPL = totalValue - totalCost;
  const totalPLPercent = totalCost > 0 ? (totalPL / totalCost * 100) : 0;
  const assetCount = investments?.length ?? 0;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Portfolio Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your investment overview</p>
        </div>
        <AddInvestmentDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PortfolioStatCard title="Total Portfolio Value" value={formatCurrency(totalValue)} icon={<DollarSign className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Total P/L" value={formatCurrency(totalPL)} change={`${totalPLPercent >= 0 ? '+' : ''}${totalPLPercent.toFixed(1)}%`} changeType={totalPL >= 0 ? 'positive' : 'negative'} icon={<TrendingUp className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Total Invested" value={formatCurrency(totalCost)} icon={<BarChart3 className="w-5 h-5 text-primary" />} />
        <PortfolioStatCard title="Total Assets" value={String(assetCount)} icon={<Briefcase className="w-5 h-5 text-primary" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PerformanceChart />
        <PortfolioChart />
      </div>

      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Holdings</h2>
        <InvestmentTable />
      </div>
    </motion.div>
  );
};

export default PortfolioDashboard;
