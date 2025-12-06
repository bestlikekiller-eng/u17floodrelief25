import { Heart } from 'lucide-react';

export function AboutU17Section() {
  return (
    <section className="container py-8 sm:py-12">
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-purple-500/10 border border-emerald-500/20 p-8 sm:p-12 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
          <Heart className="h-5 w-5 text-emerald-600" fill="currentColor" />
          <span className="text-sm font-semibold text-emerald-700">Our Story & Mission</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Who is <span className="text-emerald-600">United 17</span>?
        </h2>

        <div className="mx-auto max-w-4xl space-y-4 text-base text-muted-foreground leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">United 17</span> is a <span className="italic font-medium text-emerald-700">volunteer-driven youth organisation</span> formed by students who sat for the <span className="font-semibold">2017 G.C.E. Ordinary Level</span> examination in Sri Lanka. Inspired by a <span className="font-semibold text-foreground">shared passion for community service, education, and social development</span>, we came together during challenging times to support our nation and uplift our communities.
          </p>

          <p>
            Starting with <span className="font-semibold">educational support during the COVID-19 crisis</span>, our efforts expanded into broader <span className="italic">social initiatives, humanitarian assistance, youth engagement, and leadership development</span>. Today, <span className="font-semibold text-foreground">United 17</span> operates as a <span className="font-medium text-emerald-700">collective platform for young volunteers</span> across the country—<span className="font-semibold">regardless of ethnicity, religion, or background</span>—working with dedication to <span className="font-semibold text-foreground">create positive change, empower future leaders, and serve society</span> with <span className="italic font-medium text-rose-600">compassion and unity</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
