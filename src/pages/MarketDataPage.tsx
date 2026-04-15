import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const popularAssets = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.50, change: 2.34, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3521.80, change: -1.12, type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 0.85, type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: 1.23, type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -2.15, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.25, change: 0.56, type: 'stock' },
  { symbol: 'SOL', name: 'Solana', price: 152.30, change: 5.67, type: 'crypto' },
  { symbol: 'AMZN', name: 'Amazon', price: 185.07, change: 1.82, type: 'stock' },
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 510.43, change: 0.42, type: 'etf' },
  { symbol: 'QQQ', name: 'Nasdaq-100 ETF', price: 438.62, change: 0.78, type: 'etf' },
];

const MarketDataPage = () => {
  const [search, setSearch] = useState('');

  const filtered = popularAssets.filter(
    (a) => a.symbol.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Market Data</h1>
        <p className="text-sm text-muted-foreground">Track real-time prices and trends</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="pl-10 bg-secondary border-border" />
      </div>

      <div className="text-xs text-muted-foreground glass-card p-3 border-warning/20">
        💡 Connect Alpha Vantage & CoinGecko API keys to get real-time data. Currently showing sample data.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((asset) => (
          <div key={asset.symbol} className="glass-card p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{asset.symbol}</span>
                  <Badge variant="secondary" className="text-xs capitalize">{asset.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{asset.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading font-semibold text-foreground">{formatCurrency(asset.price)}</p>
              <div className={cn("flex items-center justify-end gap-1 text-xs font-medium", asset.change >= 0 ? "text-success" : "text-destructive")}>
                {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {asset.change >= 0 ? '+' : ''}{asset.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketDataPage;
