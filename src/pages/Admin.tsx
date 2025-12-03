import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDonations } from '@/hooks/useDonations';
import { useMissions } from '@/hooks/useMissions';
import { Header } from '@/components/Header';
import { DonationStatsDisplay } from '@/components/DonationStats';
import { DonationsTable } from '@/components/DonationsTable';
import { DonationForm } from '@/components/DonationForm';
import { MissionForm } from '@/components/MissionForm';
import { DonationFilters, FilterOptions, applyFilters } from '@/components/DonationFilters';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Donation, DonationFormData, DonationStats } from '@/types/donation';
import { exportDonationsPDF, exportPersonWisePDF } from '@/utils/pdfExport';
import { Plus, Download, FileText, ChevronDown, Target } from 'lucide-react';

export default function Admin() {
  const { isLoggedIn, currentAdmin } = useAuth();
  const { donations, loading, addDonation, updateDonation, deleteDonation } =
    useDonations(currentAdmin || undefined);
  const { missions, stats: missionStats, addMission } = useMissions();

  const [showForm, setShowForm] = useState(false);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  const currencies = useMemo(() => {
    const currencySet = new Set(donations.map((d) => d.currency));
    return Array.from(currencySet);
  }, [donations]);

  const filteredDonations = useMemo(() => {
    return applyFilters(donations, filters);
  }, [donations, filters]);

  const filteredStats = useMemo((): DonationStats => {
    let totalLKR = 0;
    let sriLankaTotal = 0;
    let uaeAED = 0;
    let uaeLKR = 0;
    let germanyEUR = 0;
    let germanyLKR = 0;
    let pakistanPKR = 0;
    let pakistanLKR = 0;
    const otherMap: Record<string, { currency: string; amount: number; lkr: number }> = {};

    filteredDonations.forEach((d) => {
      totalLKR += d.amount_lkr;
      if (d.source_country === 'Sri Lanka') {
        sriLankaTotal += d.amount_lkr;
      } else if (d.source_country === 'UAE') {
        uaeAED += d.amount;
        uaeLKR += d.amount_lkr;
      } else if (d.source_country === 'Germany') {
        germanyEUR += d.amount;
        germanyLKR += d.amount_lkr;
      } else if (d.source_country === 'Pakistan') {
        pakistanPKR += d.amount;
        pakistanLKR += d.amount_lkr;
      } else if (d.source_country === 'Other' && d.country_name) {
        const key = `${d.country_name}-${d.currency}`;
        if (!otherMap[key]) {
          otherMap[key] = { currency: d.currency, amount: 0, lkr: 0 };
        }
        otherMap[key].amount += d.amount;
        otherMap[key].lkr += d.amount_lkr;
      }
    });

    return {
      totalLKR,
      sriLankaTotal,
      uaeTotal: { aed: uaeAED, lkr: uaeLKR },
      germanyTotal: { eur: germanyEUR, lkr: germanyLKR },
      pakistanTotal: { pkr: pakistanPKR, lkr: pakistanLKR },
      otherCountries: Object.entries(otherMap).map(([key, value]) => ({
        country: key.split('-')[0],
        ...value,
      })),
    };
  }, [filteredDonations]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: DonationFormData) => {
    if (editingDonation) {
      return await updateDonation(editingDonation.id, data);
    }
    return await addDonation(data);
  };

  const handleEdit = (donation: Donation) => {
    setEditingDonation(donation);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDonation(deleteId);
      setDeleteId(null);
    }
  };

  const handleExportAll = () => {
    exportDonationsPDF(filteredDonations, filteredStats, {
      title: 'All Donations Report',
      dateRange: { start: filters.startDate, end: filters.endDate },
    });
  };

  const handleExportPerson = (person: 'Ayash' | 'Atheeq' | 'Inas') => {
    exportPersonWisePDF(filteredDonations, person);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage donations collected by <span className="font-medium">{currentAdmin}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Donation
            </Button>

            {currentAdmin === 'Ayash' && (
              <Button variant="secondary" onClick={() => setShowMissionForm(true)}>
                <Target className="mr-2 h-4 w-4" />
                Add Mission
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportAll}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export All Donations
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExportPerson('Ayash')}>
                  Ayash's Donations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportPerson('Atheeq')}>
                  Atheeq's Donations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportPerson('Inas')}>
                  Inas's Donations
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-6">
          <DonationStatsDisplay stats={filteredStats} totalSpent={missionStats.totalSpent} />
        </div>

        <div className="mb-6">
          <DonationFilters filters={filters} onFilterChange={setFilters} currencies={currencies} />
        </div>

        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Your Donations ({filteredDonations.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DonationsTable
              donations={filteredDonations}
              showActions
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          )}
        </div>
      </div>

      <DonationForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingDonation(null);
        }}
        onSubmit={handleSubmit}
        editingDonation={editingDonation}
        defaultCollector={currentAdmin || undefined}
      />

      {currentAdmin === 'Ayash' && (
        <MissionForm
          open={showMissionForm}
          onClose={() => setShowMissionForm(false)}
          onSubmit={addMission}
          createdBy={currentAdmin}
        />
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Donation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this donation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
