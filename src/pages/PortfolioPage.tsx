import InvestmentTable from '@/components/portfolio/InvestmentTable';
import AddInvestmentDialog from '@/components/portfolio/AddInvestmentDialog';
import PortfolioChart from '@/components/portfolio/PortfolioChart';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Manage your investments</p>
        </div>
        <AddInvestmentDialog />
      </div>
      <PortfolioChart />
      <InvestmentTable />
    </motion.div>
  );
};

export default PortfolioPage;
