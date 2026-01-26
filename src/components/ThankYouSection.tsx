import unitedLogo from '@/assets/united17-logo.jpg';
import sriLankaFlag from '@/assets/sri-lanka-flag.png';
import uaeFlag from '@/assets/uae-flag.png';
import { Heart, CheckCircle, Users, MapPin } from 'lucide-react';

export function ThankYouSection() {
  return (
    <section className="container py-6 sm:py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-background to-primary/10 p-8 sm:p-12">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative z-10 text-center">
          {/* Success Message */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Mission Accomplished</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Thank You!
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              From the depths of our hearts, we thank every single donor who contributed to this noble cause – 
              our beloved <span className="font-semibold text-foreground">United 17 members</span>, 
              dear <span className="font-semibold text-foreground">friends and family</span>, 
              <span className="font-semibold"> well-wishers</span>, and 
              <span className="font-semibold"> international supporters</span>. 
              Together, we made a real difference in the lives of 83 flood-affected families!
            </p>
          </div>

          {/* Impact Summary */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">2 Relief Missions</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">83 Families Helped</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2">
              <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
              <span className="text-sm font-medium text-foreground">100% Utilized</span>
            </div>
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
              United 17 × Sri Lankans Worldwide
            </h3>
            <p className="mt-2 text-muted-foreground">
              Together with our Sri Lankan community living in the UAE, Germany, and around the world, 
              we stood united in this mission of hope and solidarity.
              <span className="font-semibold"> Special thanks</span> to all Sri Lankans living abroad 
              who generously contributed to this relief effort. 
              Your compassion truly knows no borders.
            </p>
            
            <p className="mt-4 text-sm font-medium text-muted-foreground italic">
              – With eternal gratitude, U17 Flood Relief Team
            </p>
          </div>

          {/* Final Message */}
          <p className="text-sm text-muted-foreground">
            Thank you all for your kindness and generosity.
          </p>
        </div>
      </div>
    </section>
  );
}
