export type SourceCountry = 'Sri Lanka' | 'UAE' | 'Germany' | 'Pakistan' | 'Other';

export interface Donation {
  id: string;
  source_country: SourceCountry;
  country_name: string | null;
  currency: string;
  amount: number;
  amount_lkr: number;
  donor_name: string | null;
  donation_date: string;
  collected_by: 'Ayash' | 'Atheeq' | 'Inas';
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
  collected_by: 'Ayash' | 'Atheeq' | 'Inas';
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
  germanyTotal: {
    eur: number;
    lkr: number;
  };
  pakistanTotal: {
    pkr: number;
    lkr: number;
  };
  otherCountries: {
    country: string;
    currency: string;
    amount: number;
    lkr: number;
  }[];
}
