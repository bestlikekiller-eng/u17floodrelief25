-- Create admins table with hardcoded credentials
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the two admins
INSERT INTO public.admins (username, password_hash) VALUES 
  ('Ayash', 'Ayash123@#'),
  ('Atheeq', 'Atheeq887&*');

-- Create source country enum
CREATE TYPE public.source_country AS ENUM ('Sri Lanka', 'UAE', 'Other');

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_country source_country NOT NULL,
  country_name TEXT, -- For 'Other' countries
  currency TEXT NOT NULL DEFAULT 'LKR',
  amount DECIMAL(15, 2) NOT NULL,
  amount_lkr DECIMAL(15, 2) NOT NULL, -- Converted/equivalent LKR amount
  donor_name TEXT, -- Optional name/description
  donation_date DATE NOT NULL,
  collected_by TEXT NOT NULL CHECK (collected_by IN ('Ayash', 'Atheeq')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Public can read admins for login verification (not passwords in real scenario, but simple auth here)
CREATE POLICY "Admins are readable for login" 
ON public.admins 
FOR SELECT 
USING (true);

-- Public can read all donations (transparency)
CREATE POLICY "Donations are publicly readable" 
ON public.donations 
FOR SELECT 
USING (true);

-- Anyone can insert donations (simplified - admin check done in app)
CREATE POLICY "Anyone can insert donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update donations (simplified - admin check done in app)
CREATE POLICY "Anyone can update donations" 
ON public.donations 
FOR UPDATE 
USING (true);

-- Anyone can delete donations (simplified - admin check done in app)
CREATE POLICY "Anyone can delete donations" 
ON public.donations 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for donations
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;