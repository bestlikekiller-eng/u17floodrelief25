import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MissionItem {
  id: string;
  mission_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface MissionPhoto {
  id: string;
  mission_id: string;
  photo_type: 'receipt' | 'item' | 'proof';
  photo_url: string;
  linked_item_id: string | null;
  created_at: string;
}

export interface Mission {
  id: string;
  district: string;
  area: string;
  total_spent: number;
  mission_date: string;
  remarks: string | null;
  volunteers_count: number;
  volunteer_names: string[] | null;
  drive_link: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  items?: MissionItem[];
  photos?: MissionPhoto[];
}

export interface MissionFormData {
  district: string;
  area: string;
  total_spent: number;
  mission_date: string;
  remarks?: string;
  volunteers_count?: number;
  volunteer_names?: string[];
  drive_link?: string;
  created_by: string;
  items?: Omit<MissionItem, 'id' | 'mission_id' | 'created_at'>[];
}

export interface MissionStats {
  totalMissions: number;
  totalSpent: number;
}

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<MissionStats>({
    totalMissions: 0,
    totalSpent: 0,
  });

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const { data: missionsData, error: missionsError } = await supabase
        .from('missions')
        .select('*')
        .order('mission_date', { ascending: false });

      if (missionsError) throw missionsError;

      // Fetch items and photos for each mission
      const missionsWithDetails = await Promise.all(
        (missionsData || []).map(async (mission) => {
          const [{ data: items }, { data: photos }] = await Promise.all([
            supabase
              .from('mission_items')
              .select('*')
              .eq('mission_id', mission.id),
            supabase
              .from('mission_photos')
              .select('*')
              .eq('mission_id', mission.id),
          ]);

          return {
            ...mission,
            total_spent: Number(mission.total_spent),
            items: items || [],
            photos: photos || [],
          } as Mission;
        })
      );

      setMissions(missionsWithDetails);
      calculateStats(missionsWithDetails);
    } catch (error) {
      console.error('Error fetching missions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch missions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (missionList: Mission[]) => {
    const totalMissions = missionList.length;
    const totalSpent = missionList.reduce((sum, m) => sum + m.total_spent, 0);
    setStats({ totalMissions, totalSpent });
  };

  const addMission = async (formData: MissionFormData) => {
    try {
      const { items, ...missionData } = formData;

      const { data: mission, error: missionError } = await supabase
        .from('missions')
        .insert([missionData])
        .select()
        .single();

      if (missionError) throw missionError;

      // Add items if any
      if (items && items.length > 0) {
        const itemsWithMissionId = items.map((item) => ({
          ...item,
          mission_id: mission.id,
        }));

        const { error: itemsError } = await supabase
          .from('mission_items')
          .insert(itemsWithMissionId);

        if (itemsError) throw itemsError;
      }

      toast({
        title: 'Success',
        description: 'Mission added successfully',
      });

      fetchMissions();
      return true;
    } catch (error) {
      console.error('Error adding mission:', error);
      toast({
        title: 'Error',
        description: 'Failed to add mission',
        variant: 'destructive',
      });
      return false;
    }
  };

  const uploadPhoto = async (
    missionId: string,
    file: File,
    photoType: 'receipt' | 'item' | 'proof',
    linkedItemId?: string
  ) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${missionId}/${photoType}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('mission-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('mission-photos')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('mission_photos').insert([
        {
          mission_id: missionId,
          photo_type: photoType,
          photo_url: publicUrl,
          linked_item_id: linkedItemId || null,
        },
      ]);

      if (dbError) throw dbError;

      fetchMissions();
      return publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload photo',
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteMission = async (id: string) => {
    try {
      const { error } = await supabase.from('missions').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Mission deleted successfully',
      });

      fetchMissions();
      return true;
    } catch (error) {
      console.error('Error deleting mission:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete mission',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return {
    missions,
    loading,
    stats,
    addMission,
    uploadPhoto,
    deleteMission,
    refetch: fetchMissions,
  };
}
