import unitedLogo from '@/assets/united17-logo.jpg';
import sriLankaFlag from '@/assets/sri-lanka-flag.png';
import uaeFlag from '@/assets/uae-flag.png';
import { Heart, Sparkles } from 'lucide-react';

export function ThankYouSection() {
  return (
    <section className="container py-6 sm:py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 p-8 sm:p-12">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
        
        {/* Floating hearts decoration */}
        <div className="absolute top-4 left-8 animate-pulse">
          <Heart className="h-6 w-6 text-primary/20" fill="currentColor" />
        </div>
        <div className="absolute top-12 right-12 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Heart className="h-4 w-4 text-rose-400/30" fill="currentColor" />
        </div>
        <div className="absolute bottom-8 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-5 w-5 text-amber-400/30" />
        </div>

        <div className="relative z-10 text-center">
          {/* Thank you message */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="text-sm font-semibold text-primary">From Our Hearts</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              A Heartfelt Thank You
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              We extend our deepest gratitude to all who have contributed to this noble cause – 
              our beloved <span className="font-semibold text-foreground">United 17 members</span>, 
              dear <span className="font-semibold text-foreground">friends and family</span>, 
              <span className="font-semibold text-foreground"> well-wishers</span>, and 
              <span className="font-semibold text-foreground"> international supporters</span> who 
              opened their hearts for our flood-affected brothers and sisters.
            </p>
          </div>

          {/* United 17 x Flags Logo */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <img 
              src={sriLankaFlag} 
              alt="Sri Lanka Flag" 
              className="h-12 w-auto rounded shadow-md sm:h-16"
            />
            <div className="flex items-center gap-3">
              <img 
                src={unitedLogo} 
                alt="United 17 Logo" 
                className="h-16 w-16 rounded-xl object-cover shadow-lg sm:h-20 sm:w-20"
              />
        
            </div>
            <img 
              src={uaeFlag} 
              alt="UAE Flag" 
              className="h-12 w-auto rounded shadow-md sm:h-16"
            />
          </div>

          {/* Partnership message */}
          <div className="mb-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
              United 17 × Sri Lankans in the UAE
            </h3>
            <p className="mt-2 text-muted-foreground">
              Together with our Sri Lankan community living in the UAE, we stand united in this mission of hope and solidarity.
          
              <span className="font-semibold">Special thanks</span> to all Sri Lankans living in the UAE and 
              other foreign nations who have generously contributed to this relief effort. 
              Your compassion knows no borders.
            </p>

            
            <p className="mt-4 text-sm font-medium text-muted-foreground italic">
              – With love and gratitude, U17 Flood Relief Team
            </p>
  </div>
        </div>
      </div>
    </section>
  );
}
