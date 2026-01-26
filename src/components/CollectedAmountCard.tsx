import { CheckCircle } from 'lucide-react';

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
        <div className="rounded-full bg-emerald-500/20 p-4">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>

        {/* Project Completed Message */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            Project Successfully Completed
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            All donations have been fully utilized for flood relief operations.
          </p>
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
            100% Utilized for Relief Work
          </span>
        </div>

        {/* Thank You Message */}
        <p className="text-sm text-muted-foreground max-w-md">
          Every rupee has been spent on helping flood-affected families. 
          Thank you to all our generous donors for making this possible!
        </p>
      </div>
    </div>
  );
}
