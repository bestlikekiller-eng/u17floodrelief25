import { useDonations } from '@/hooks/useDonations';
import { useMissions } from '@/hooks/useMissions';
import { useAdditionalCharges } from '@/hooks/useAdditionalCharges';
import { Header } from '@/components/Header';
import { FinalStatsDisplay } from '@/components/FinalStatsDisplay';
import { CollectedAmountCard } from '@/components/CollectedAmountCard';
import { ExpenseReportCard } from '@/components/ExpenseReportCard';
import { DonationsTable } from '@/components/DonationsTable';
import { DonationsBreakdown } from '@/components/DonationsBreakdown';
import { MissionsSection } from '@/components/MissionsSection';
import { ThankYouSection } from '@/components/ThankYouSection';
import { AboutU17Section } from '@/components/AboutU17Section';
import { Heart, Users, Shield } from 'lucide-react';
import unitedLogo from '@/assets/united17-logo.jpg';

const Index = () => {
  const { donations, loading, stats } = useDonations();
  const { missions, loading: missionsLoading, stats: missionStats } = useMissions();
  const { totalCharges } = useAdditionalCharges();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
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
                <Heart className="h-4 w-4" />
                <span>83 families helped</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Completed with Total Collected - Merged */}
      <section className="container pt-8 sm:pt-12">
        <div className="animate-slide-up">
          <CollectedAmountCard collectedAmount={stats.totalLKR} />
        </div>
      </section>

      {/* Final Stats Section - Spent and Balance Only */}
      <section className="container pt-6 sm:pt-8">
        <div className="animate-slide-up">
          <FinalStatsDisplay stats={stats} totalSpent={missionStats.totalSpent} additionalCharges={totalCharges} />
        </div>
      </section>

      {/* Expense Report Download Card */}
      <section className="container pt-6 sm:pt-8">
        <div className="animate-slide-up">
          <ExpenseReportCard />
        </div>
      </section>

      {/* Thank You Section */}
      <ThankYouSection />

      {/* Missions/Actions Section */}
      <MissionsSection missions={missions} loading={missionsLoading} stats={missionStats} />

      {/* About U17 Section */}
      <AboutU17Section />
      
      {/* Donations Breakdown */}
      <section className="container py-8 sm:py-12">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            Donations Breakdown
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Breakdown of donations by country and source
          </p>
        </div>
        <div className="animate-fade-in">
          <DonationsBreakdown stats={stats} />
        </div>
      </section>

      {/* Donations List */}
      <section className="container py-8 sm:py-12">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
            All Donations Received
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete list of all generous contributions. Thank you to everyone!
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
            © 2025 United 17 Flood Relief. All donations tracked transparently. 
            <span className="font-medium text-foreground"> Project Completed - December 2025</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Thank you to all donors, volunteers, and supporters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
