import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDonations } from '@/hooks/useDonations';
import { useMissions, Mission, MissionFormData } from '@/hooks/useMissions';
import { useAdditionalCharges } from '@/hooks/useAdditionalCharges';
import { Header } from '@/components/Header';
import { DonationsTable } from '@/components/DonationsTable';
import { DonationForm } from '@/components/DonationForm';
import { MissionForm } from '@/components/MissionForm';
import { AdditionalChargesForm } from '@/components/AdditionalChargesForm';
import { DonationFilters, FilterOptions, applyFilters } from '@/components/DonationFilters';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Donation, DonationFormData, DonationStats } from '@/types/donation';
import { exportDonationsPDF, exportPersonWisePDF } from '@/utils/pdfExport';
import { Plus, Download, FileText, ChevronDown, Target, Wallet, TrendingDown, Scale, MapPin, Landmark, Globe, Users, Calendar, Trash2, Eye, Edit, Receipt } from 'lucide-react';
import { format } from 'date-fns';

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Admin() {
  const { isLoggedIn, currentAdmin } = useAuth();
  const { donations: allDonations, loading, addDonation, updateDonation, deleteDonation } = useDonations();
  const { missions, stats: missionStats, addMission, updateMission, deleteMission } = useMissions();
  const { charges, totalCharges, addCharge, deleteCharge } = useAdditionalCharges();

  const [showForm, setShowForm] = useState(false);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [showChargesForm, setShowChargesForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteMissionId, setDeleteMissionId] = useState<string | null>(null);
  const [deleteChargeId, setDeleteChargeId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showAllDonations, setShowAllDonations] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const myDonations = useMemo(() => allDonations.filter((d) => d.collected_by === currentAdmin), [allDonations, currentAdmin]);
  const currencies = useMemo(() => Array.from(new Set(myDonations.map((d) => d.currency))), [myDonations]);
  const filteredDonations = useMemo(() => applyFilters(showAllDonations ? allDonations : myDonations, filters), [allDonations, myDonations, filters, showAllDonations]);

  const globalStats = useMemo(() => ({ totalLKR: allDonations.reduce((sum, d) => sum + d.amount_lkr, 0) }), [allDonations]);

  const myStats = useMemo((): DonationStats => {
    let totalLKR = 0, sriLankaTotal = 0, uaeAED = 0, uaeLKR = 0, germanyEUR = 0, germanyLKR = 0, pakistanPKR = 0, pakistanLKR = 0;
    const otherMap: Record<string, { currency: string; amount: number; lkr: number }> = {};
    myDonations.forEach((d) => {
      totalLKR += d.amount_lkr;
      if (d.source_country === 'Sri Lanka') sriLankaTotal += d.amount_lkr;
      else if (d.source_country === 'UAE') { uaeAED += d.amount; uaeLKR += d.amount_lkr; }
      else if (d.source_country === 'Germany') { germanyEUR += d.amount; germanyLKR += d.amount_lkr; }
      else if (d.source_country === 'Pakistan') { pakistanPKR += d.amount; pakistanLKR += d.amount_lkr; }
      else if (d.source_country === 'Other' && d.country_name) {
        const key = `${d.country_name}-${d.currency}`;
        if (!otherMap[key]) otherMap[key] = { currency: d.currency, amount: 0, lkr: 0 };
        otherMap[key].amount += d.amount; otherMap[key].lkr += d.amount_lkr;
      }
    });
    return { totalLKR, sriLankaTotal, uaeTotal: { aed: uaeAED, lkr: uaeLKR }, germanyTotal: { eur: germanyEUR, lkr: germanyLKR }, pakistanTotal: { pkr: pakistanPKR, lkr: pakistanLKR }, otherCountries: Object.entries(otherMap).map(([key, value]) => ({ country: key.split('-')[0], ...value })) };
  }, [myDonations]);

  const totalSpentWithCharges = missionStats.totalSpent + totalCharges;
  const balance = globalStats.totalLKR - totalSpentWithCharges;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const handleSubmit = async (data: DonationFormData) => editingDonation ? updateDonation(editingDonation.id, data) : addDonation(data);
  const handleEdit = (donation: Donation) => { setEditingDonation(donation); setShowForm(true); };
  const handleDelete = async () => { if (deleteId) { await deleteDonation(deleteId); setDeleteId(null); } };
  const handleDeleteMission = async () => { if (deleteMissionId) { await deleteMission(deleteMissionId); setDeleteMissionId(null); } };
  const handleDeleteCharge = async () => { if (deleteChargeId) { await deleteCharge(deleteChargeId); setDeleteChargeId(null); } };
  const handleExportAll = () => exportDonationsPDF(filteredDonations, myStats, { title: 'All Donations Report', dateRange: { start: filters.startDate, end: filters.endDate } });
  const handleExportPerson = (person: 'Ayash' | 'Atheeq' | 'Inas') => exportPersonWisePDF(allDonations, person);
  
  const handleMissionSubmit = async (data: MissionFormData) => {
    if (editingMission) {
      return await updateMission(editingMission.id, data);
    }
    return await addMission(data);
  };

  const handleEditMission = (mission: Mission) => {
    setEditingMission(mission);
    setShowMissionForm(true);
  };

  const handleCloseMissionForm = () => {
    setShowMissionForm(false);
    setEditingMission(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Logged in as <span className="font-medium">{currentAdmin}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowForm(true)}><Plus className="mr-2 h-4 w-4" />Add Donation</Button>
            {currentAdmin === 'Ayash' && <Button variant="secondary" onClick={() => setShowMissionForm(true)}><Target className="mr-2 h-4 w-4" />Add Mission</Button>}
            {currentAdmin === 'Ayash' && <Button variant="outline" onClick={() => setShowChargesForm(true)}><Receipt className="mr-2 h-4 w-4" />Add Charge</Button>}
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline"><Download className="mr-2 h-4 w-4" />Export PDF<ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportAll}><FileText className="mr-2 h-4 w-4" />Export All</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExportPerson('Ayash')}>Ayash's Donations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportPerson('Atheeq')}>Atheeq's Donations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportPerson('Inas')}>Inas's Donations</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Overall Summary (All Admins)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard title="Total Donations" value={formatCurrency(globalStats.totalLKR)} subtitle="All admins combined" icon={<Wallet className="h-6 w-6" />} variant="primary" />
            <StatCard title="Total Spent" value={formatCurrency(totalSpentWithCharges)} subtitle={`Missions: ${formatCurrency(missionStats.totalSpent)} + Charges: ${formatCurrency(totalCharges)}`} icon={<TrendingDown className="h-6 w-6" />} variant="warning" />
            <StatCard title="Balance" value={formatCurrency(balance)} subtitle="Available funds" icon={<Scale className="h-6 w-6" />} variant="success" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">{currentAdmin}'s Collections</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard title="My Total" value={formatCurrency(myStats.totalLKR)} subtitle={`${myDonations.length} donations`} icon={<Wallet className="h-6 w-6" />} />
            <StatCard title="Sri Lanka" value={formatCurrency(myStats.sriLankaTotal)} subtitle="Local donations" icon={<MapPin className="h-6 w-6" />} />
            <StatCard title="UAE" value={formatCurrency(myStats.uaeTotal.aed, 'AED')} subtitle={`≈ ${formatCurrency(myStats.uaeTotal.lkr)}`} icon={<Landmark className="h-6 w-6" />} />
            <StatCard title="Germany" value={formatCurrency(myStats.germanyTotal.eur, 'EUR')} subtitle={`≈ ${formatCurrency(myStats.germanyTotal.lkr)}`} icon={<Landmark className="h-6 w-6" />} />
            <StatCard title="Other Countries" value={formatCurrency(myStats.pakistanTotal.lkr + myStats.otherCountries.reduce((sum, c) => sum + c.lkr, 0))} subtitle={`${myStats.otherCountries.length + (myStats.pakistanTotal.lkr > 0 ? 1 : 0)} countries`} icon={<Globe className="h-6 w-6" />} />
          </div>
        </div>

        {currentAdmin === 'Ayash' && missions.length > 0 && (
          <div className="mb-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Missions ({missions.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {missions.map((mission) => (
                    <div key={mission.id} className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {mission.featured_image_url ? <img src={mission.featured_image_url} alt={mission.district} className="w-16 h-12 object-cover rounded" /> : <div className="w-16 h-12 bg-muted rounded flex items-center justify-center"><Target className="h-6 w-6 text-muted-foreground" /></div>}
                        <div>
                          <p className="font-semibold text-foreground">{mission.district} - {mission.area}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(mission.mission_date), 'MMM dd, yyyy')}</span>
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{mission.volunteers_count} volunteers</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-semibold">{formatCurrency(mission.total_spent)}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedMission(mission)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditMission(mission)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteMissionId(mission.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Charges Section - Only for Ayash */}
        {currentAdmin === 'Ayash' && charges.length > 0 && (
          <div className="mb-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Additional Charges ({charges.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {charges.map((charge) => (
                    <div key={charge.id} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">{charge.description}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(charge.charge_date), 'MMM dd, yyyy')}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-semibold">{formatCurrency(charge.amount)}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteChargeId(charge.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Total Additional Charges</span>
                    <Badge className="font-semibold">{formatCurrency(totalCharges)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-6"><DonationFilters filters={filters} onFilterChange={setFilters} currencies={currencies} /></div>

        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">{showAllDonations ? 'All Donations' : 'Your Donations'} ({filteredDonations.length})</h2>
            <div className="flex gap-2">
              <Button variant={showAllDonations ? 'outline' : 'default'} size="sm" onClick={() => setShowAllDonations(false)}>Your Donations</Button>
              <Button variant={showAllDonations ? 'default' : 'outline'} size="sm" onClick={() => setShowAllDonations(true)}>All Donations</Button>
            </div>
          </div>
          {loading ? <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div> : <DonationsTable donations={filteredDonations} showActions={!showAllDonations} showCollectedBy={showAllDonations} onEdit={handleEdit} onDelete={(id) => setDeleteId(id)} />}
        </div>
      </div>

      <DonationForm open={showForm} onClose={() => { setShowForm(false); setEditingDonation(null); }} onSubmit={handleSubmit} editingDonation={editingDonation} defaultCollector={currentAdmin || undefined} />
      {currentAdmin === 'Ayash' && (
        <>
          <MissionForm 
            open={showMissionForm} 
            onClose={handleCloseMissionForm} 
            onSubmit={handleMissionSubmit} 
            createdBy={currentAdmin} 
            editingMission={editingMission}
          />
          <AdditionalChargesForm
            open={showChargesForm}
            onClose={() => setShowChargesForm(false)}
            onSubmit={addCharge}
          />
        </>
      )}

      <Dialog open={!!selectedMission} onOpenChange={() => setSelectedMission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMission && (
            <>
              <DialogHeader><DialogTitle className="font-display text-xl">{selectedMission.district} - {selectedMission.area}</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedMission.featured_image_url && <img src={selectedMission.featured_image_url} alt={selectedMission.district} className="w-full h-48 object-cover rounded-lg" />}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{format(new Date(selectedMission.mission_date), 'MMMM dd, yyyy')}</span></div>
                  <div><span className="text-muted-foreground">Total Spent:</span> <span className="font-semibold">{formatCurrency(selectedMission.total_spent)}</span></div>
                  <div><span className="text-muted-foreground">Volunteers:</span> <span className="font-medium">{selectedMission.volunteers_count}</span></div>
                </div>
                {selectedMission.remarks && <div><span className="text-sm text-muted-foreground">Remarks:</span><p className="text-sm">{selectedMission.remarks}</p></div>}
                {selectedMission.items && selectedMission.items.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Items Breakdown</h4>
                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50"><tr><th className="text-left px-3 py-2">Item</th><th className="text-center px-3 py-2">Qty</th><th className="text-right px-3 py-2">Total</th></tr></thead>
                        <tbody>{selectedMission.items.map((item) => <tr key={item.id} className="border-t"><td className="px-3 py-2">{item.item_name}</td><td className="text-center px-3 py-2">{item.quantity}</td><td className="text-right px-3 py-2">{formatCurrency(item.total_price)}</td></tr>)}</tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Donation</AlertDialogTitle><AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteMissionId} onOpenChange={() => setDeleteMissionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Mission</AlertDialogTitle><AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteMission} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteChargeId} onOpenChange={() => setDeleteChargeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete Charge</AlertDialogTitle><AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteCharge} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}