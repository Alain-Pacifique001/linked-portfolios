import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type PriceAlert = {
  id: string;
  user_id: string;
  asset_symbol: string;
  asset_name: string;
  target_price: number;
  condition: string;
  is_triggered: boolean;
  created_at: string;
};

export const usePriceAlerts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['price_alerts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('price_alerts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as PriceAlert[];
    },
    enabled: !!user,
  });

  const addAlert = useMutation({
    mutationFn: async (alert: Omit<PriceAlert, 'id' | 'user_id' | 'is_triggered' | 'created_at'>) => {
      const { error } = await supabase
        .from('price_alerts')
        .insert({ ...alert, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price_alerts'] });
      toast.success('Price alert created');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteAlert = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('price_alerts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price_alerts'] });
      toast.success('Alert deleted');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { ...query, addAlert, deleteAlert };
};
