import { Heart } from 'lucide-react';

export function AboutU17Section() {
  return (
    <section className="container py-4 sm:py-6">
      <div className="rounded-2xl bg-card shadow-soft overflow-hidden border border-border/50">
        <div className="bg-gradient-to-r from-primary/5 via-emerald-500/5 to-blue-500/5 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              About United 17
            </h2>
          </div>

          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">United 17</span> is a volunteer-driven youth organisation formed by students who sat for the 2017 G.C.E. Ordinary Level examination in Sri Lanka. Inspired by a shared passion for community service, education, and social development, we came together during challenging times to support our nation and uplift our communities. Starting with educational support during the COVID-19 crisis, our efforts expanded into broader social initiatives, humanitarian assistance, youth engagement, and leadership development. Today, <span className="font-semibold text-foreground">United 17</span> operates as a collective platform for young volunteers across the country—regardless of ethnicity, religion, or background—working with dedication to create positive change, empower future leaders, and serve society with compassion and unity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
