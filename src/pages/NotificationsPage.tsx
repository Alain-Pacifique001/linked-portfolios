import { useNotifications } from '@/hooks/useNotifications';
import { usePriceAlerts } from '@/hooks/usePriceAlerts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BellOff, CheckCheck, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const typeIcons: Record<string, string> = {
  price_alert: '💰',
  profit_target: '🎯',
  market_news: '📰',
  ai_recommendation: '🤖',
  system: '⚙️',
};

const NotificationsPage = () => {
  const { data: notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const { data: alerts, addAlert, deleteAlert } = usePriceAlerts();
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertForm, setAlertForm] = useState({ asset_symbol: '', asset_name: '', target_price: 0, condition: 'above' as 'above' | 'below' });

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert.mutate(alertForm, {
      onSuccess: () => {
        setShowAlertForm(false);
        setAlertForm({ asset_symbol: '', asset_name: '', target_price: 0, condition: 'above' });
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => markAllAsRead.mutate()} disabled={unreadCount === 0}>
          <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
        </Button>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Price Alerts</h3>
          <Button variant="outline" size="sm" onClick={() => setShowAlertForm(!showAlertForm)}>
            <Plus className="w-4 h-4 mr-1" /> New Alert
          </Button>
        </div>

        {showAlertForm && (
          <form onSubmit={handleAddAlert} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 p-3 bg-secondary/50 rounded-lg">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Symbol</Label>
              <Input value={alertForm.asset_symbol} onChange={(e) => setAlertForm({ ...alertForm, asset_symbol: e.target.value.toUpperCase() })} placeholder="BTC" className="bg-secondary border-border h-9" required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input value={alertForm.asset_name} onChange={(e) => setAlertForm({ ...alertForm, asset_name: e.target.value })} placeholder="Bitcoin" className="bg-secondary border-border h-9" required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Price</Label>
              <Input type="number" step="0.01" value={alertForm.target_price || ''} onChange={(e) => setAlertForm({ ...alertForm, target_price: parseFloat(e.target.value) || 0 })} className="bg-secondary border-border h-9" required />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Condition</Label>
              <Select value={alertForm.condition} onValueChange={(v: 'above' | 'below') => setAlertForm({ ...alertForm, condition: v })}>
                <SelectTrigger className="bg-secondary border-border h-9"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="submit" size="sm" className="w-full h-9" disabled={addAlert.isPending}>Create</Button>
            </div>
          </form>
        )}

        {alerts?.length ? (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{alert.asset_symbol}</span>
                  <span className="text-xs text-muted-foreground">{alert.asset_name}</span>
                  <Badge variant="secondary" className="text-xs">{alert.condition === 'above' ? '↑' : '↓'} ${alert.target_price}</Badge>
                  {alert.is_triggered && <Badge className="bg-success text-success-foreground text-xs">Triggered</Badge>}
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteAlert.mutate(alert.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No price alerts set up yet.</p>
        )}
      </div>

      <div className="space-y-2">
        {notifications?.length ? (
          notifications.map((n) => (
            <div key={n.id} onClick={() => !n.is_read && markAsRead.mutate(n.id)}
              className={cn("glass-card p-4 flex items-start gap-3 cursor-pointer transition-all", !n.is_read && "border-primary/20 bg-primary/5")}>
              <span className="text-lg">{typeIcons[n.type] ?? '📌'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">{n.title}</span>
                  {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-8 text-center text-muted-foreground">
            <BellOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
