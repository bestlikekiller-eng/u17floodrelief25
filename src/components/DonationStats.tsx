import { DonationStats as Stats } from '@/types/donation';
import { StatCard } from './StatCard';
import { Wallet, MapPin, Globe, Landmark } from 'lucide-react';
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
  return (
    <div className="space-y-6">
      {/* Main Stats - Total Donations + Goal Progress with better styling */}
      <div className="grid gap-6 sm:grid-cols-2">
        <StatCard
          title="Total Donations"
          value={formatCurrency(stats.totalLKR)}
          subtitle="All sources combined"
          icon={<Wallet className="h-7 w-7" />}
          variant="primary"
          className="group"
        />
        <GoalProgress currentAmount={stats.totalLKR} goalAmount={600000} />
      </div>

      {/* Country Breakdown Title */}
      <div className="text-center">
        <h3 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-6 py-2 font-display text-sm font-semibold text-blue-900 dark:text-blue-100 uppercase tracking-wide border border-blue-200 dark:border-blue-800">
          <Globe className="h-4 w-4" />
          Donations Breakdown
        </h3>
      </div>

      {/* Country Cards - Sri Lanka, UAE, Pakistan, Germany with gradient backgrounds */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">Sri Lanka</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{formatCurrency(stats.sriLankaTotal)}</p>
              <p className="text-xs text-white/80 mt-1">Local donations</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-6 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">UAE</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{formatCurrency(stats.uaeTotal.aed, 'AED')}</p>
              <p className="text-xs text-white/80 mt-1">≈ {formatCurrency(stats.uaeTotal.lkr)}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Landmark className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 p-6 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">Pakistan</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{formatCurrency(stats.pakistanTotal.pkr, 'PKR')}</p>
              <p className="text-xs text-white/80 mt-1">{stats.pakistanTotal.lkr > 0 ? `≈ ${formatCurrency(stats.pakistanTotal.lkr)}` : 'Donations'}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Globe className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-6 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">Germany</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{formatCurrency(stats.germanyTotal.eur, 'EUR')}</p>
              <p className="text-xs text-white/80 mt-1">≈ {formatCurrency(stats.germanyTotal.lkr)}</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Landmark className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Other Countries Breakdown */}
      {stats.otherCountries.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
          <h3 className="mb-4 font-display text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Other Countries
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.otherCountries.map((country, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {country.country}
                </span>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(country.amount, country.currency)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
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
