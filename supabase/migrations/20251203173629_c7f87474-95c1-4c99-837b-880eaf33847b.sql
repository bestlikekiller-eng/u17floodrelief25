-- Add Germany and Pakistan to source_country enum
ALTER TYPE public.source_country ADD VALUE IF NOT EXISTS 'Germany';
ALTER TYPE public.source_country ADD VALUE IF NOT EXISTS 'Pakistan';

-- Create storage bucket for mission photos
INSERT INTO storage.buckets (id, name, public) VALUES ('mission-photos', 'mission-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for mission photos
CREATE POLICY "Anyone can view mission photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'mission-photos');

CREATE POLICY "Anyone can upload mission photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'mission-photos');

CREATE POLICY "Anyone can update mission photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'mission-photos');

CREATE POLICY "Anyone can delete mission photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'mission-photos');

-- Create missions table
CREATE TABLE public.missions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  district TEXT NOT NULL,
  area TEXT NOT NULL,
  total_spent NUMERIC NOT NULL DEFAULT 0,
  mission_date DATE NOT NULL,
  remarks TEXT,
  volunteers_count INTEGER DEFAULT 0,
  volunteer_names TEXT[],
  drive_link TEXT,
  created_by TEXT NOT NULL DEFAULT 'Ayash',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

-- RLS policies for missions
CREATE POLICY "Missions are publicly readable"
ON public.missions FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert missions"
ON public.missions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update missions"
ON public.missions FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete missions"
ON public.missions FOR DELETE
USING (true);

-- Create mission_items table for item breakdowns
CREATE TABLE public.mission_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  total_price NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.mission_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mission items are publicly readable"
ON public.mission_items FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert mission items"
ON public.mission_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete mission items"
ON public.mission_items FOR DELETE
USING (true);

-- Create mission_photos table
CREATE TABLE public.mission_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  photo_type TEXT NOT NULL CHECK (photo_type IN ('receipt', 'item', 'proof')),
  photo_url TEXT NOT NULL,
  linked_item_id UUID REFERENCES public.mission_items(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.mission_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mission photos are publicly readable"
ON public.mission_photos FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert mission photos"
ON public.mission_photos FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete mission photos"
ON public.mission_photos FOR DELETE
USING (true);

-- Add trigger for updated_at on missions
CREATE TRIGGER update_missions_updated_at
BEFORE UPDATE ON public.missions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();