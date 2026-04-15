import { useState } from 'react';
import { useInvestments, InvestmentInsert } from '@/hooks/useInvestments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const assetTypes = [
  { value: 'stock', label: 'Stock' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'etf', label: 'ETF' },
  { value: 'bond', label: 'Bond' },
  { value: 'commodity', label: 'Commodity' },
];

const AddInvestmentDialog = () => {
  const { addInvestment } = useInvestments();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<InvestmentInsert>({
    asset_name: '',
    asset_symbol: '',
    asset_type: 'stock',
    purchase_price: 0,
    current_price: 0,
    quantity: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInvestment.mutate(form, {
      onSuccess: () => {
        setOpen(false);
        setForm({ asset_name: '', asset_symbol: '', asset_type: 'stock', purchase_price: 0, current_price: 0, quantity: 0 });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading">Add New Investment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Asset Name</Label>
              <Input
                value={form.asset_name}
                onChange={(e) => setForm({ ...form, asset_name: e.target.value })}
                placeholder="Apple Inc."
                className="bg-secondary border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Symbol</Label>
              <Input
                value={form.asset_symbol}
                onChange={(e) => setForm({ ...form, asset_symbol: e.target.value.toUpperCase() })}
                placeholder="AAPL"
                className="bg-secondary border-border"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Asset Type</Label>
            <Select value={form.asset_type} onValueChange={(v) => setForm({ ...form, asset_type: v })}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {assetTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Purchase Price</Label>
              <Input
                type="number"
                step="0.01"
                value={form.purchase_price || ''}
                onChange={(e) => setForm({ ...form, purchase_price: parseFloat(e.target.value) || 0 })}
                className="bg-secondary border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Current Price</Label>
              <Input
                type="number"
                step="0.01"
                value={form.current_price || ''}
                onChange={(e) => setForm({ ...form, current_price: parseFloat(e.target.value) || 0 })}
                className="bg-secondary border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Quantity</Label>
              <Input
                type="number"
                step="0.01"
                value={form.quantity || ''}
                onChange={(e) => setForm({ ...form, quantity: parseFloat(e.target.value) || 0 })}
                className="bg-secondary border-border"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={addInvestment.isPending}>
            {addInvestment.isPending ? 'Adding...' : 'Add Investment'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvestmentDialog;
