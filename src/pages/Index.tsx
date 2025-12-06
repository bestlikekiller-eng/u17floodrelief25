import { useDonations } from '@/hooks/useDonations';
import { useMissions } from '@/hooks/useMissions';
import { Header } from '@/components/Header';
import { DonationStatsDisplay } from '@/components/DonationStats';
import { DonationCTA } from '@/components/DonationCTA';
import { DonationsTable } from '@/components/DonationsTable';
import { MissionsSection } from '@/components/MissionsSection';
import { ThankYouSection } from '@/components/ThankYouSection';
import { AboutU17Section } from '@/components/AboutU17Section';
import { Heart, Users, Shield } from 'lucide-react';
import unitedLogo from '@/assets/united17-logo.jpg';

const Index = () => {
  const { donations, loading, stats } = useDonations();
  const { missions, loading: missionsLoading, stats: missionStats } = useMissions();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section  */}
      <section className="hero-gradient py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            {/* Centered United 17 Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src={unitedLogo} 
                alt="United 17 Logo" 
                className="h-24 w-24 rounded-2xl object-cover shadow-xl sm:h-32 sm:w-32 ring-4 ring-primary-foreground/20"
              />
            </div>
            
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5">
              <Heart className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Flood Relief Initiative
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              United 17 – Flood Relief
              <br />
              <span className="text-primary-foreground/90">Donation Transparency Portal</span>
            </h1>
            <p className="mt-4 text-base text-primary-foreground/80 sm:text-lg">
              Tracking every donation with full transparency. Together, we rebuild lives.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{donations.length} donations received</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

 

{/* Stats Section */}
      <section className="container pt-8 sm:pt-12">
        <div className="animate-slide-up">
          <DonationStatsDisplay stats={stats} totalSpent={missionStats.totalSpent} />
        </div>
      </section>

      {/* Thank You Section - After Contribution Cards */}
      <ThankYouSection />

      {/* Donation CTA Section */}
      <DonationCTA />

      {/* Missions/Actions Section */}
      <MissionsSection missions={missions} loading={missionsLoading} stats={missionStats} />


{/* About U17 Section */}
      <AboutU17Section />
      
      {/* Donations List */}
      <section className="container py-8 sm:py-12">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            All Donations
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete list of all donations received
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="animate-fade-in">
            <DonationsTable donations={donations} showCollectedBy={false} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 United 17 Flood Relief. All donations are tracked transparently.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
