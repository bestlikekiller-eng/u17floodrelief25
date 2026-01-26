import { CheckCircle, Sparkles } from 'lucide-react';

interface CollectedAmountCardProps {
  collectedAmount: number;
}

function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function CollectedAmountCard({ collectedAmount }: CollectedAmountCardProps) {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-emerald-500/10 via-primary/5 to-amber-500/10 border-2 border-emerald-500/30 p-6 sm:p-8">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        {/* Success Icon */}
        <div className="relative">
          <div className="rounded-full bg-emerald-500/20 p-4">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-500" />
        </div>

        {/* Amount */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Amount Collected</p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-primary">
            {formatCurrency(collectedAmount)}
          </p>
        </div>

        {/* Completion Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2">
          <span className="text-sm font-semibold text-emerald-700">
            100% Utilized for Relief Work ✓
          </span>
        </div>

        {/* Thank You Message */}
        <p className="text-sm text-muted-foreground max-w-md">
          Alhamdulillah! Every rupee has been spent on helping flood-affected families. 
          JazakAllah Khair to all our generous donors!
        </p>
      </div>
    </div>
  );
}
