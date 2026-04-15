import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import AuthPage from "@/pages/AuthPage";
import FinanceDashboard from "@/pages/FinanceDashboard";
import Expenses from "@/pages/Expenses";
import Budgets from "@/pages/Budgets";
import Savings from "@/pages/Savings";
import FinanceAIAdvisor from "@/pages/FinanceAIAdvisor";
import PortfolioDashboard from "@/pages/PortfolioDashboard";
import PortfolioPage from "@/pages/PortfolioPage";
import MarketDataPage from "@/pages/MarketDataPage";
import PortfolioAIAdvisor from "@/pages/PortfolioAIAdvisor";
import AnalyticsPage from "@/pages/AnalyticsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <AppLayout>
      <Routes>
        {/* Finance */}
        <Route path="/" element={<FinanceDashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/finance-advisor" element={<FinanceAIAdvisor />} />
        {/* Portfolio */}
        <Route path="/portfolio" element={<PortfolioDashboard />} />
        <Route path="/portfolio/manage" element={<PortfolioPage />} />
        <Route path="/market" element={<MarketDataPage />} />
        <Route path="/portfolio-advisor" element={<PortfolioAIAdvisor />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
