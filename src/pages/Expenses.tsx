import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Expense {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "expense" | "income";
}

const initialExpenses: Expense[] = [
  { id: 1, name: "Grocery Store", category: "Food", amount: 85.20, date: "2026-03-27", type: "expense" },
  { id: 2, name: "Salary", category: "Income", amount: 4500.00, date: "2026-03-26", type: "income" },
  { id: 3, name: "Netflix", category: "Entertainment", amount: 15.99, date: "2026-03-25", type: "expense" },
  { id: 4, name: "Electric Bill", category: "Utilities", amount: 120.00, date: "2026-03-24", type: "expense" },
  { id: 5, name: "Freelance Work", category: "Income", amount: 850.00, date: "2026-03-23", type: "income" },
  { id: 6, name: "Gas Station", category: "Transport", amount: 45.00, date: "2026-03-22", type: "expense" },
  { id: 7, name: "Restaurant", category: "Food", amount: 62.50, date: "2026-03-21", type: "expense" },
  { id: 8, name: "Gym Membership", category: "Health", amount: 39.99, date: "2026-03-20", type: "expense" },
];

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Health", "Shopping", "Income", "Other"];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<{ name: string; category: string; amount: string; type: "expense" | "income" }>({ name: "", category: "Food", amount: "", type: "expense" });

  const filtered = expenses.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "all" || e.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleAdd = () => {
    if (!newExpense.name || !newExpense.amount) return;
    setExpenses((prev) => [
      { id: Date.now(), name: newExpense.name, category: newExpense.category, amount: parseFloat(newExpense.amount), date: new Date().toISOString().split("T")[0], type: newExpense.type },
      ...prev,
    ]);
    setNewExpense({ name: "", category: "Food", amount: "", type: "expense" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage your transactions.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="font-heading">Add Transaction</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <Input placeholder="Description" value={newExpense.name} onChange={(e) => setNewExpense((p) => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" />
              <Input type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense((p) => ({ ...p, amount: e.target.value }))} className="bg-secondary border-border" />
              <Select value={newExpense.category} onValueChange={(v) => setNewExpense((p) => ({ ...p, category: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
              </Select>
              <Select value={newExpense.type} onValueChange={(v: "expense" | "income") => setNewExpense((p) => ({ ...p, type: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAdd} className="w-full">Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40 bg-card border-border">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {filtered.map((tx, i) => (
          <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tx.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.type === "income" ? <ArrowDownLeft className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-destructive" />}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-card-foreground"}`}>
              {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
            </span>
          </motion.div>
        ))}
        {filtered.length === 0 && <p className="p-8 text-center text-muted-foreground text-sm">No transactions found.</p>}
      </div>
    </div>
  );
};

export default Expenses;
