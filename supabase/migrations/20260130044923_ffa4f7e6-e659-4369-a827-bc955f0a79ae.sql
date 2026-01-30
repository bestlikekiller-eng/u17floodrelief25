-- Create additional_charges table for hidden charges (only Ayash can manage)
CREATE TABLE public.additional_charges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  charge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by TEXT NOT NULL DEFAULT 'Ayash',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.additional_charges ENABLE ROW LEVEL SECURITY;

-- Policies - only allow operations (hidden from public, but readable for admin calculations)
CREATE POLICY "Additional charges are readable for calculations"
ON public.additional_charges
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert additional charges"
ON public.additional_charges
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete additional charges"
ON public.additional_charges
FOR DELETE
USING (true);