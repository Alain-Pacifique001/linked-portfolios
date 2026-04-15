import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type Investment = {
  id: string;
  user_id: string;
  asset_name: string;
  asset_symbol: string;
  asset_type: string;
  purchase_price: number;
  current_price: number;
  quantity: number;
  profit_loss: number | null;
  date_added: string;
  updated_at: string;
};

export type InvestmentInsert = {
  asset_name: string;
  asset_symbol: string;
  asset_type: string;
  purchase_price: number;
  current_price?: number;
  quantity: number;
};

export const useInvestments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .order('date_added', { ascending: false });
      if (error) throw error;
      return data as Investment[];
    },
    enabled: !!user,
  });

  const addInvestment = useMutation({
    mutationFn: async (investment: InvestmentInsert) => {
      const { error } = await supabase
        .from('investments')
        .insert({ ...investment, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast.success('Investment added successfully');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateInvestment = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Investment> & { id: string }) => {
      const { error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast.success('Investment updated');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteInvestment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast.success('Investment deleted');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { ...query, addInvestment, updateInvestment, deleteInvestment };
};
