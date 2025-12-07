import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp } from 'lucide-react';

interface GoalProgressProps {
  currentAmount: number;
  goalAmount?: number;
}

function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function GoalProgress({ currentAmount, goalAmount = 600000 }: GoalProgressProps) {
  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
  const remaining = Math.max(goalAmount - currentAmount, 0);

  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-primary/5 via-background to-amber-500/5 border border-primary/20 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">Our Target Goal</h3>
            <p className="text-xs text-muted-foreground">Help us reach our goal</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-primary sm:text-xl">{formatCurrency(goalAmount)}</p>
          <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% reached</p>
        </div>
      </div>
      
      <div className="relative">
        <Progress value={percentage} className="h-3 bg-muted" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary-foreground drop-shadow-sm">
            {percentage >= 10 && `${percentage.toFixed(0)}%`}
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">{formatCurrency(currentAmount)}</span>
          <span className="text-muted-foreground">raised</span>
        </div>
        {remaining > 0 && (
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{formatCurrency(remaining)}</span> to go
          </span>
        )}
      </div>
    </div>
  );
}
