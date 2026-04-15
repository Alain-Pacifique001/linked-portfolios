import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PortfolioStatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  className?: string;
}

const PortfolioStatCard = ({ title, value, change, changeType = 'neutral', icon, className }: PortfolioStatCardProps) => (
  <div className={cn("glass-card p-5 animate-slide-up", className)}>
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        {change && (
          <p className={cn(
            "text-xs font-medium",
            changeType === 'positive' && 'text-success',
            changeType === 'negative' && 'text-destructive',
            changeType === 'neutral' && 'text-muted-foreground',
          )}>
            {change}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

export default PortfolioStatCard;
