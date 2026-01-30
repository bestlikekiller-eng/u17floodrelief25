import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AdditionalCharge {
  id: string;
  description: string;
  amount: number;
  charge_date: string;
  created_by: string;
  created_at: string;
}

export interface AdditionalChargeFormData {
  description: string;
  amount: number;
  charge_date: string;
}

export function useAdditionalCharges() {
  const [charges, setCharges] = useState<AdditionalCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCharges, setTotalCharges] = useState(0);

  const fetchCharges = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('additional_charges')
        .select('*')
        .order('charge_date', { ascending: false });

      if (error) throw error;

      const chargesData = (data || []).map(c => ({
        ...c,
        amount: Number(c.amount)
      }));
      
      setCharges(chargesData);
      setTotalCharges(chargesData.reduce((sum, c) => sum + c.amount, 0));
    } catch (error) {
      console.error('Error fetching additional charges:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCharge = async (formData: AdditionalChargeFormData) => {
    try {
      const { error } = await supabase
        .from('additional_charges')
        .insert([{
          ...formData,
          created_by: 'Ayash'
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Additional charge added',
      });

      fetchCharges();
      return true;
    } catch (error) {
      console.error('Error adding charge:', error);
      toast({
        title: 'Error',
        description: 'Failed to add charge',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteCharge = async (id: string) => {
    try {
      const { error } = await supabase
        .from('additional_charges')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Charge deleted',
      });

      fetchCharges();
      return true;
    } catch (error) {
      console.error('Error deleting charge:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete charge',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return {
    charges,
    loading,
    totalCharges,
    addCharge,
    deleteCharge,
    refetch: fetchCharges,
  };
}
