import { DonationStats as Stats } from '@/types/donation';
import { StatCard } from './StatCard';
import { Wallet, MapPin, Globe, Landmark } from 'lucide-react';

interface DonationStatsProps {
  stats: Stats;
}

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'LKR' ? 'LKR' : currency === 'AED' ? 'AED' : 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace('LKR', 'Rs.').replace('USD', currency);
}

export function DonationStatsDisplay({ stats }: DonationStatsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donations"
          value={formatCurrency(stats.totalLKR)}
          subtitle="All sources combined"
          icon={<Wallet className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Sri Lanka"
          value={formatCurrency(stats.sriLankaTotal)}
          subtitle="Local donations"
          icon={<MapPin className="h-6 w-6" />}
        />
        <StatCard
          title="UAE"
          value={formatCurrency(stats.uaeTotal.aed, 'AED')}
          subtitle={`≈ ${formatCurrency(stats.uaeTotal.lkr)}`}
          icon={<Landmark className="h-6 w-6" />}
        />
        <StatCard
          title="Other Countries"
          value={formatCurrency(stats.otherCountries.reduce((sum, c) => sum + c.lkr, 0))}
          subtitle={`${stats.otherCountries.length} countries`}
          icon={<Globe className="h-6 w-6" />}
        />
      </div>

      {stats.otherCountries.length > 0 && (
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Breakdown by Country
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {stats.otherCountries.map((country, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
              >
                <span className="text-sm font-medium text-foreground">
                  {country.country}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(country.amount, country.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ≈ {formatCurrency(country.lkr)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
