import { DonationStats as Stats } from '@/types/donation';
import { StatCard } from './StatCard';
import { Wallet, MapPin, Globe, Landmark, Target, TrendingDown, Scale } from 'lucide-react';
import { GoalProgress } from './GoalProgress';

interface DonationStatsProps {
  stats: Stats;
  totalSpent?: number;
  showSpentAndBalance?: boolean;
}

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') {
    return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function DonationStatsDisplay({ stats, totalSpent = 0, showSpentAndBalance = false }: DonationStatsProps) {
  const totalBalance = stats.totalLKR - totalSpent;

  return (
    <div className="space-y-6">
      {/* Target Goal Card - Full Width */}
      <GoalProgress currentAmount={stats.totalLKR} goalAmount={600000} />

      {/* Main Stats Cards - Total Donations, Total Spent, Balance */}
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
          subtitle="Relief operations"
          icon={<TrendingDown className="h-6 w-6" />}
          variant="warning"
        />
        <StatCard
          title="Balance"
          value={formatCurrency(totalBalance)}
          subtitle="Available funds"
          icon={<Scale className="h-6 w-6" />}
          variant="success"
        />
      </div>

      {/* Country Breakdown Title */}
      <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
        Donations Breakdown
      </h3>

      {/* Country Cards - Sri Lanka, UAE, Pakistan, Germany */}
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
          title="Pakistan"
          value={formatCurrency(stats.pakistanTotal.pkr, 'PKR')}
          subtitle={stats.pakistanTotal.lkr > 0 ? `≈ ${formatCurrency(stats.pakistanTotal.lkr)}` : 'Donations'}
          icon={<Globe className="h-6 w-6" />}
        />
        <StatCard
          title="Germany"
          value={formatCurrency(stats.germanyTotal.eur, 'EUR')}
          subtitle={`≈ ${formatCurrency(stats.germanyTotal.lkr)}`}
          icon={<Landmark className="h-6 w-6" />}
        />
      </div>

      {/* Other Countries Breakdown */}
      {stats.otherCountries.length > 0 && (
        <div className="rounded-xl bg-card p-4 shadow-soft">
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Other Countries
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
