import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import {
  LayoutDashboard, Receipt, PiggyBank, Target, Bot,
  Briefcase, TrendingUp, BarChart3, Brain, Bell,
  LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const financeItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/budgets', icon: PiggyBank, label: 'Budgets' },
  { to: '/savings', icon: Target, label: 'Savings' },
  { to: '/finance-advisor', icon: Bot, label: 'Finance AI' },
];

const portfolioItems = [
  { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
  { to: '/market', icon: TrendingUp, label: 'Market Data' },
  { to: '/portfolio-advisor', icon: Brain, label: 'Portfolio AI' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const renderNavItem = ({ to, icon: Icon, label }: typeof financeItems[0]) => {
    const isActive = location.pathname === to;
    return (
      <Link
        key={to}
        to={to}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
          isActive
            ? "bg-primary/10 text-primary font-medium shadow-glow"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="w-[18px] h-[18px] shrink-0" />
        {!collapsed && <span>{label}</span>}
        {!collapsed && label === 'Notifications' && unreadCount > 0 && (
          <Badge variant="destructive" className="ml-auto text-xs h-5 min-w-[20px] flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-60"
      )}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shrink-0">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-heading font-bold text-foreground text-lg tracking-tight">FinanceHub</span>
          )}
        </div>

        {/* Finance Section */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Finance</p>
          )}
          {financeItems.map(renderNavItem)}

          {!collapsed && (
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portfolio</p>
          )}
          {collapsed && <div className="my-2 border-t border-sidebar-border" />}
          {portfolioItems.map(renderNavItem)}
        </nav>

        {/* Collapse + Logout */}
        <div className="p-2 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent w-full transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-60"
      )}>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
