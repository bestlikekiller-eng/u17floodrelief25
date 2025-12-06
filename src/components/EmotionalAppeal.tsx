import { Heart, Droplets } from 'lucide-react';

export function EmotionalAppeal() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-primary/10 border border-rose-500/20 p-6 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2">
        <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
        <span className="text-sm font-semibold text-rose-600">Every Rupee Counts</span>
      </div>
      
      <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
        Your Small Drop Creates a Mighty Ocean
      </h3>
      
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Don't think your <span className="font-semibold text-primary">Rs.100</span> or <span className="font-semibold text-primary">Rs.500</span> is too small – 
        <span className="font-semibold text-foreground"> it's worth everything to us!</span> 
        Your contribution could provide a meal for a family, add to our relief budget, 
        or bring a smile to someone who has lost everything.
      </p>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-primary">
        <Droplets className="h-5 w-5" />
        <span className="font-display text-lg font-semibold italic">
          "Small drops become a sea"
        </span>
        <Droplets className="h-5 w-5" />
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Whatever you can give – <span className="font-medium text-foreground">give with love, and it becomes priceless.</span>
      </p>
    </div>
  );
}
