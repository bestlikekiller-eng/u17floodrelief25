import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Donation, DonationFormData, DonationStats } from '@/types/donation';
import { toast } from '@/hooks/use-toast';

export function useDonations(filterByCollector?: string) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DonationStats>({
    totalLKR: 0,
    sriLankaTotal: 0,
    uaeTotal: { aed: 0, lkr: 0 },
    germanyTotal: { eur: 0, lkr: 0 },
    pakistanTotal: { pkr: 0, lkr: 0 },
    otherCountries: [],
  });

  const fetchDonations = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterByCollector) {
        query = query.eq('collected_by', filterByCollector);
      }

      const { data, error } = await query;

      if (error) throw error;

      const typedData = (data || []).map(d => ({
        ...d,
        source_country: d.source_country as Donation['source_country'],
        collected_by: d.collected_by as Donation['collected_by'],
        amount: Number(d.amount),
        amount_lkr: Number(d.amount_lkr),
      }));

      setDonations(typedData);
      calculateStats(typedData);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch donations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (donationList: Donation[]) => {
    let totalLKR = 0;
    let sriLankaTotal = 0;
    let uaeAED = 0;
    let uaeLKR = 0;
    let germanyEUR = 0;
    let germanyLKR = 0;
    let pakistanPKR = 0;
    let pakistanLKR = 0;
    const otherMap: Record<string, { currency: string; amount: number; lkr: number }> = {};

    donationList.forEach((d) => {
      totalLKR += d.amount_lkr;

      if (d.source_country === 'Sri Lanka') {
        sriLankaTotal += d.amount_lkr;
      } else if (d.source_country === 'UAE') {
        uaeAED += d.amount;
        uaeLKR += d.amount_lkr;
      } else if (d.source_country === 'Germany') {
        germanyEUR += d.amount;
        germanyLKR += d.amount_lkr;
      } else if (d.source_country === 'Pakistan') {
        pakistanPKR += d.amount;
        pakistanLKR += d.amount_lkr;
      } else if (d.source_country === 'Other' && d.country_name) {
        const key = `${d.country_name}-${d.currency}`;
        if (!otherMap[key]) {
          otherMap[key] = { currency: d.currency, amount: 0, lkr: 0 };
        }
        otherMap[key].amount += d.amount;
        otherMap[key].lkr += d.amount_lkr;
      }
    });

    const otherCountries = Object.entries(otherMap).map(([key, value]) => ({
      country: key.split('-')[0],
      ...value,
    }));

    setStats({
      totalLKR,
      sriLankaTotal,
      uaeTotal: { aed: uaeAED, lkr: uaeLKR },
      germanyTotal: { eur: germanyEUR, lkr: germanyLKR },
      pakistanTotal: { pkr: pakistanPKR, lkr: pakistanLKR },
      otherCountries,
    });
  };

  const addDonation = async (formData: DonationFormData) => {
    try {
      const { error } = await supabase.from('donations').insert([formData]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Donation added successfully',
      });

      fetchDonations();
      return true;
    } catch (error) {
      console.error('Error adding donation:', error);
      toast({
        title: 'Error',
        description: 'Failed to add donation',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateDonation = async (id: string, formData: Partial<DonationFormData>) => {
    try {
      const { error } = await supabase
        .from('donations')
        .update(formData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Donation updated successfully',
      });

      fetchDonations();
      return true;
    } catch (error) {
      console.error('Error updating donation:', error);
      toast({
        title: 'Error',
        description: 'Failed to update donation',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteDonation = async (id: string) => {
    try {
      const { error } = await supabase.from('donations').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Donation deleted successfully',
      });

      fetchDonations();
      return true;
    } catch (error) {
      console.error('Error deleting donation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete donation',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchDonations();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations' },
        () => {
          fetchDonations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filterByCollector]);

  return {
    donations,
    loading,
    stats,
    addDonation,
    updateDonation,
    deleteDonation,
    refetch: fetchDonations,
  };
}
