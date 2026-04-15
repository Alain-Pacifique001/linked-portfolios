import { useInvestments, Investment } from '@/hooks/useInvestments';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeColors: Record<string, string> = {
  stock: 'bg-chart-blue/10 text-chart-blue',
  crypto: 'bg-chart-yellow/10 text-chart-yellow',
  etf: 'bg-chart-purple/10 text-chart-purple',
  bond: 'bg-chart-green/10 text-chart-green',
  commodity: 'bg-warning/10 text-warning',
};

const InvestmentTable = () => {
  const { data: investments, isLoading, deleteInvestment } = useInvestments();

  if (isLoading) {
    return <div className="glass-card p-8 text-center text-muted-foreground">Loading investments...</div>;
  }

  if (!investments?.length) {
    return (
      <div className="glass-card p-8 text-center text-muted-foreground">
        No investments yet. Add your first investment to get started!
      </div>
    );
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Asset</TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground text-right">Qty</TableHead>
            <TableHead className="text-muted-foreground text-right">Buy Price</TableHead>
            <TableHead className="text-muted-foreground text-right">Current</TableHead>
            <TableHead className="text-muted-foreground text-right">P/L</TableHead>
            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((inv) => {
            const pl = inv.profit_loss ?? 0;
            const plPercent = inv.purchase_price > 0
              ? ((inv.current_price - inv.purchase_price) / inv.purchase_price * 100)
              : 0;
            const isPositive = pl >= 0;

            return (
              <TableRow key={inv.id} className="border-border">
                <TableCell>
                  <div>
                    <span className="font-medium text-foreground">{inv.asset_symbol}</span>
                    <p className="text-xs text-muted-foreground">{inv.asset_name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("text-xs capitalize", typeColors[inv.asset_type])}>
                    {inv.asset_type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-foreground">{inv.quantity}</TableCell>
                <TableCell className="text-right text-foreground">{formatCurrency(inv.purchase_price)}</TableCell>
                <TableCell className="text-right text-foreground">{formatCurrency(inv.current_price)}</TableCell>
                <TableCell className="text-right">
                  <div className={cn("flex items-center justify-end gap-1", isPositive ? "text-success" : "text-destructive")}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-sm font-medium">{formatCurrency(pl)}</span>
                    <span className="text-xs">({plPercent.toFixed(1)}%)</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteInvestment.mutate(inv.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvestmentTable;
