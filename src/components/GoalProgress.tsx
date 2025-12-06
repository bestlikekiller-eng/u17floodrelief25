import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Trophy, Sparkles } from 'lucide-react';

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
  const isGoalReached = percentage >= 100;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-amber-500/10 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl sm:p-8">
      {/* Decorative background elements */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl" />
      
      {/* Goal Reached Celebration */}
      {isGoalReached && (
        <div className="absolute right-4 top-4 animate-bounce">
          <Trophy className="h-8 w-8 text-amber-500" />
        </div>
      )}

      <div className="relative">
        {/* Header Section */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-3 shadow-md">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground sm:text-xl flex items-center gap-2">
                Fundraising Goal
                {percentage >= 50 && <Sparkles className="h-4 w-4 text-amber-500" />}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGoalReached ? '🎉 Goal achieved!' : 'Help us reach our target'}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
              {formatCurrency(goalAmount)}
            </p>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-xs font-semibold text-primary">{percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="space-y-3">
          <div className="relative">
            {/* Background progress bar */}
            <div className="h-6 overflow-hidden rounded-full bg-muted/50 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-amber-500 shadow-lg transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
            
            {/* Percentage indicator */}
            {percentage >= 15 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground drop-shadow-md">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between gap-4 text-sm">
            {/* Amount Raised */}
            <div className="flex-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 p-3 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500 p-1">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Raised</span>
              </div>
              <p className="mt-1 font-display text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(currentAmount)}
              </p>
            </div>

            {/* Amount Remaining */}
            {remaining > 0 && (
              <div className="flex-1 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-amber-500 p-1">
                    <Target className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Remaining</span>
                </div>
                <p className="mt-1 font-display text-lg font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(remaining)}
                </p>
              </div>
            )}

            {/* Goal Reached Message */}
            {isGoalReached && (
              <div className="flex-1 rounded-lg bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/20 dark:to-emerald-950/20 p-3 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    Goal Achieved! 🎉
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        {!isGoalReached && percentage >= 75 && (
          <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center">
            <p className="text-sm font-medium text-primary">
              🔥 Almost there! Just {formatCurrency(remaining)} more to reach our goal!
            </p>
          </div>
        )}
        
        {!isGoalReached && percentage < 50 && (
          <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              💪 Every contribution brings us closer to helping those in need
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
