import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, TrendingUp, Shield, PieChart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useInvestments } from '@/hooks/useInvestments';
import { cn } from '@/lib/utils';

type Message = { role: 'user' | 'assistant'; content: string };

const quickPrompts = [
  { icon: <TrendingUp className="w-4 h-4" />, label: 'Buy/Sell Recommendations', prompt: 'Based on my portfolio, what are your buy and sell recommendations? Analyze each position.' },
  { icon: <PieChart className="w-4 h-4" />, label: 'Diversification Tips', prompt: 'Analyze my portfolio diversification and suggest improvements.' },
  { icon: <Shield className="w-4 h-4" />, label: 'Risk Analysis', prompt: 'Perform a risk analysis of my current portfolio. Identify high-risk positions and suggest hedging strategies.' },
];

const PortfolioAIAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: investments } = useInvestments();

  const portfolioContext = investments?.length
    ? `My portfolio:\n${investments.map(i => `- ${i.asset_name} (${i.asset_symbol}): ${i.quantity} units, bought at $${i.purchase_price}, currently $${i.current_price}, P/L: $${i.profit_loss ?? 0}`).join('\n')}`
    : 'I have no investments in my portfolio yet.';

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: Message = { role: 'user', content };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setLoading(true);

    try {
      const resp = await supabase.functions.invoke('ai-advisor', {
        body: { messages: allMessages.map(m => ({ role: m.role, content: m.content })), portfolioContext },
      });
      if (resp.error) throw resp.error;
      setMessages(prev => [...prev, { role: 'assistant', content: resp.data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 h-[calc(100vh-3rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" /> Portfolio AI Advisor
        </h1>
        <p className="text-sm text-muted-foreground">Get AI-powered investment recommendations</p>
      </div>

      {messages.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickPrompts.map((qp) => (
            <button key={qp.label} onClick={() => sendMessage(qp.prompt)} className="glass-card p-4 text-left hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary">{qp.icon}<span className="font-medium text-sm">{qp.label}</span></div>
              <p className="text-xs text-muted-foreground line-clamp-2">{qp.prompt}</p>
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn("max-w-[80%] rounded-xl px-4 py-3 text-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'glass-card text-foreground')}>
              <pre className="whitespace-pre-wrap font-body">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-card px-4 py-3 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask about your portfolio..." className="bg-secondary border-border resize-none min-h-[44px] max-h-[120px]" rows={1} />
        <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} size="icon" className="shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PortfolioAIAdvisor;
