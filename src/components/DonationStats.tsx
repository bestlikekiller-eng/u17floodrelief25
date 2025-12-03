import { DonationStats as Stats } from '@/types/donation';
import { StatCard } from './StatCard';
import { Wallet, MapPin, Globe, Landmark, TrendingDown, Scale } from 'lucide-react';

interface DonationStatsProps {
  stats: Stats;
  totalSpent?: number;
}

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') {
    return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function DonationStatsDisplay({ stats, totalSpent = 0 }: DonationStatsProps) {
  const balance = stats.totalLKR - totalSpent;

  return (
    <div className="space-y-6">
      {/* Main Stats - Total, Spent, Balance */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Donations"
          value={formatCurrency(stats.totalLKR)}
          subtitle="All sources combined"
          icon={<Wallet className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          subtitle="On relief missions"
          icon={<TrendingDown className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Balance"
          value={formatCurrency(balance)}
          subtitle="Available funds"
          icon={<Scale className="h-6 w-6" />}
          variant="success"
        />
      </div>

      {/* Country Breakdown Title */}
      <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Donations Breakdown
      </h3>

      {/* Country Cards - Sri Lanka, UAE, Germany, Other */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          title="Germany"
          value={formatCurrency(stats.germanyTotal.eur, 'EUR')}
          subtitle={`≈ ${formatCurrency(stats.germanyTotal.lkr)}`}
          icon={<Landmark className="h-6 w-6" />}
        />
        <StatCard
          title="Other Countries"
          value={formatCurrency(
            stats.pakistanTotal.lkr + stats.otherCountries.reduce((sum, c) => sum + c.lkr, 0)
          )}
          subtitle={`${stats.otherCountries.length + (stats.pakistanTotal.lkr > 0 ? 1 : 0)} countries`}
          icon={<Globe className="h-6 w-6" />}
        />
      </div>

      {/* Other Countries Breakdown */}
      {(stats.pakistanTotal.lkr > 0 || stats.otherCountries.length > 0) && (
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Breakdown by Other Countries
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {stats.pakistanTotal.lkr > 0 && (
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-sm font-medium text-foreground">Pakistan</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(stats.pakistanTotal.pkr, 'PKR')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ≈ {formatCurrency(stats.pakistanTotal.lkr)}
                  </p>
                </div>
              </div>
            )}
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
