import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  saved: number;
  icon: string;
}

const initialGoals: SavingsGoal[] = [
  { id: 1, name: "Emergency Fund", target: 10000, saved: 6700, icon: "🛡️" },
  { id: 2, name: "Vacation", target: 3000, saved: 1200, icon: "✈️" },
  { id: 3, name: "New Laptop", target: 2000, saved: 1800, icon: "💻" },
  { id: 4, name: "Car Down Payment", target: 5000, saved: 720, icon: "🚗" },
];

const Savings = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "" });

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  const handleAdd = () => {
    if (!newGoal.name || !newGoal.target) return;
    setGoals((prev) => [...prev, { id: Date.now(), name: newGoal.name, target: parseFloat(newGoal.target), saved: 0, icon: "🎯" }]);
    setNewGoal({ name: "", target: "" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Savings Goals</h1>
          <p className="text-sm text-muted-foreground mt-1">Track progress toward your financial goals.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Goal</Button></DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="font-heading">Create Savings Goal</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <Input placeholder="Goal name" value={newGoal.name} onChange={(e) => setNewGoal((p) => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" />
              <Input type="number" placeholder="Target amount ($)" value={newGoal.target} onChange={(e) => setNewGoal((p) => ({ ...p, target: e.target.value }))} className="bg-secondary border-border" />
              <Button onClick={handleAdd} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <Target className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Saved</p>
            <p className="font-heading text-2xl font-bold text-card-foreground">
              ${totalSaved.toLocaleString()} <span className="text-muted-foreground font-normal text-base">/ ${totalTarget.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {goals.map((goal, i) => {
          const pct = (goal.saved / goal.target) * 100;
          return (
            <motion.div key={goal.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-card-foreground">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary">{pct.toFixed(0)}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }} transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }} className="h-full rounded-full gradient-primary" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;
