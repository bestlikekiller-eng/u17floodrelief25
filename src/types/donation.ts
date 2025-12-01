export type SourceCountry = 'Sri Lanka' | 'UAE' | 'Other';

export interface Donation {
  id: string;
  source_country: SourceCountry;
  country_name: string | null;
  currency: string;
  amount: number;
  amount_lkr: number;
  donor_name: string | null;
  donation_date: string;
  collected_by: 'Ayash' | 'Atheeq';
  created_at: string;
  updated_at: string;
}

export interface DonationFormData {
  source_country: SourceCountry;
  country_name?: string;
  currency: string;
  amount: number;
  amount_lkr: number;
  donor_name?: string;
  donation_date: string;
  collected_by: 'Ayash' | 'Atheeq';
}

export interface Admin {
  id: string;
  username: string;
  password_hash: string;
}

export interface DonationStats {
  totalLKR: number;
  sriLankaTotal: number;
  uaeTotal: {
    aed: number;
    lkr: number;
  };
  otherCountries: {
    country: string;
    currency: string;
    amount: number;
    lkr: number;
  }[];
}
