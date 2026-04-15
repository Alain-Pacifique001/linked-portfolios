import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How can I reduce my monthly expenses?",
  "What's a good savings strategy for beginners?",
  "Analyze my spending patterns",
  "How much should I save for an emergency fund?",
];

const FinanceAIAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "Hi! I'm your AI financial advisor. I can help you analyze spending, optimize budgets, and plan your savings. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text?: string) => {
    const message = text || input;
    if (!message.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "This feature requires Lovable Cloud AI to be enabled for AI-powered responses. Once connected, I'll be able to analyze your finances and provide personalized advice!",
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="mb-4">
        <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> Finance AI Advisor
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Get personalized financial insights powered by AI.</p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-card shadow-card p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
              msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}>{msg.content}</div>
            {msg.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <User className="h-4 w-4 text-secondary-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="rounded-xl bg-secondary px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        {messages.length <= 1 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pt-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => handleSend(s)}
                className="rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm text-secondary-foreground hover:bg-secondary hover:border-primary/30 transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your finances..." className="bg-card border-border" />
        <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FinanceAIAdvisor;
