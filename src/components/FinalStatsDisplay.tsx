import { StatCard } from './StatCard';
import { TrendingDown, Scale, CheckCircle } from 'lucide-react';
import { DonationStats } from '@/types/donation';

interface FinalStatsDisplayProps {
  stats: DonationStats;
  totalSpent: number;
}

function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function FinalStatsDisplay({ stats, totalSpent }: FinalStatsDisplayProps) {
  const balance = stats.totalLKR - totalSpent;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        title="Total Spent"
        value={formatCurrency(totalSpent)}
        subtitle="For relief operations"
        icon={<TrendingDown className="h-6 w-6" />}
        variant="warning"
      />
      <StatCard
        title="Balance"
        value={formatCurrency(balance)}
        subtitle={balance === 0 ? "Fully utilized" : "Remaining funds"}
        icon={balance === 0 ? <CheckCircle className="h-6 w-6" /> : <Scale className="h-6 w-6" />}
        variant="success"
      />
    </div>
  );
}
