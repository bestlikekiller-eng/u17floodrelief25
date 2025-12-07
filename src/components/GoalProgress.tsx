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
    <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 p-8 sm:p-12 shadow-2xl backdrop-blur-sm transition-all hover:shadow-3xl">
      {/* Decorative background elements */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      
      {/* Goal Reached Celebration */}
      {isGoalReached && (
        <div className="absolute right-6 top-6 animate-bounce">
          <Trophy className="h-12 w-12 text-amber-500" />
        </div>
      )}

      <div className="relative">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 px-6 py-3">
            <Target className="h-7 w-7 text-primary" />
            <span className="text-base font-bold text-foreground uppercase tracking-wide">Our Fundraising Goal</span>
            {percentage >= 50 && <Sparkles className="h-5 w-5 text-amber-500" />}
          </div>
          
          <h3 className="font-display text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-indigo-600 mb-4">
            {formatCurrency(goalAmount)}
          </h3>
          
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">{percentage.toFixed(1)}% Achieved</span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="space-y-4">
          <div className="relative">
            {/* Background progress bar */}
            <div className="h-8 overflow-hidden rounded-full bg-muted/50 shadow-inner border border-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-lg transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${percentage}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 w-full h-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
            
            {/* Percentage indicator */}
            {percentage >= 8 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Amount Raised */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-5 border-2 border-emerald-200 dark:border-emerald-800 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="rounded-full bg-emerald-500 p-2">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Raised</span>
              </div>
              <p className="font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(currentAmount)}
              </p>
            </div>

            {/* Amount Remaining */}
            {remaining > 0 ? (
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-5 border-2 border-amber-200 dark:border-amber-800 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-amber-500 p-2">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">To Go</span>
                </div>
                <p className="font-display text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(remaining)}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-amber-950/20 dark:to-emerald-950/20 p-5 border-2 border-amber-200 dark:border-amber-800 shadow-md flex items-center justify-center">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    Goal Achieved! 🎉
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        {!isGoalReached && percentage >= 75 && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 p-5 text-center border border-primary/20">
            <p className="text-base font-semibold text-primary">
              🔥 Almost there! Just {formatCurrency(remaining)} more to reach our goal!
            </p>
          </div>
        )}
        
        {!isGoalReached && percentage < 50 && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-5 text-center border-2 border-blue-200 dark:border-blue-800">
            <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
              💪 Every contribution brings us closer to helping those in need
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
