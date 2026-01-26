import { CheckCircle, PartyPopper, Heart } from 'lucide-react';

export function ProjectCompletedBanner() {
  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-emerald-500/10 via-primary/5 to-amber-500/10 border border-emerald-500/30 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-emerald-500/20 p-2">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <PartyPopper className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
            🎉 Project Successfully Completed!
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Alhamdulillah! All donations have been fully utilized for flood relief.
          </p>
        </div>
        <Heart className="h-5 w-5 text-rose-500 animate-pulse hidden sm:block" fill="currentColor" />
      </div>
    </div>
  );
}
