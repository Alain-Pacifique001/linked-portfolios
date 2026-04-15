import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Budget {
  id: number;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

const colors: Record<string, string> = {
  Food: "hsl(160, 70%, 45%)",
  Transport: "hsl(200, 80%, 55%)",
  Entertainment: "hsl(280, 65%, 60%)",
  Utilities: "hsl(38, 92%, 50%)",
  Shopping: "hsl(0, 72%, 55%)",
  Health: "hsl(160, 50%, 55%)",
};

const initialBudgets: Budget[] = [
  { id: 1, category: "Food", limit: 800, spent: 540, color: colors.Food },
  { id: 2, category: "Transport", limit: 400, spent: 320, color: colors.Transport },
  { id: 3, category: "Entertainment", limit: 200, spent: 180, color: colors.Entertainment },
  { id: 4, category: "Utilities", limit: 300, spent: 250, color: colors.Utilities },
  { id: 5, category: "Shopping", limit: 500, spent: 120, color: colors.Shopping },
];

const categoriesList = ["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health", "Other"];

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: "Food", limit: "" });

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  const handleAdd = () => {
    if (!newBudget.limit) return;
    setBudgets((prev) => [...prev, { id: Date.now(), category: newBudget.category, limit: parseFloat(newBudget.limit), spent: 0, color: colors[newBudget.category] || "hsl(215, 15%, 55%)" }]);
    setNewBudget({ category: "Food", limit: "" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Budgets</h1>
          <p className="text-sm text-muted-foreground mt-1">Set and manage monthly spending limits.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> New Budget</Button></DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="font-heading">Create Budget</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <Select value={newBudget.category} onValueChange={(v) => setNewBudget((p) => ({ ...p, category: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{categoriesList.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
              </Select>
              <Input type="number" placeholder="Monthly limit ($)" value={newBudget.limit} onChange={(e) => setNewBudget((p) => ({ ...p, limit: e.target.value }))} className="bg-secondary border-border" />
              <Button onClick={handleAdd} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent / Total Budget</p>
            <p className="font-heading text-xl font-bold text-card-foreground">
              ${totalSpent.toLocaleString()} <span className="text-muted-foreground font-normal text-base">/ ${totalBudget.toLocaleString()}</span>
            </p>
          </div>
          <span className={`text-sm font-semibold ${totalSpent / totalBudget > 0.8 ? "text-destructive" : "text-success"}`}>
            {((totalSpent / totalBudget) * 100).toFixed(0)}% used
          </span>
        </div>
        <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {budgets.map((budget, i) => {
          const pct = (budget.spent / budget.limit) * 100;
          const isOver = pct > 90;
          return (
            <motion.div key={budget.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: budget.color }} />
                  <span className="font-heading text-sm font-semibold text-card-foreground">{budget.category}</span>
                </div>
                <span className={`text-xs font-medium ${isOver ? "text-destructive" : "text-muted-foreground"}`}>{pct.toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(pct, 100)} className="h-1.5 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${budget.spent} spent</span>
                <span>${budget.limit - budget.spent} remaining</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
