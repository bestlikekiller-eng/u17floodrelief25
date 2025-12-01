import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Donation, DonationStats } from '@/types/donation';
import { format } from 'date-fns';

interface ExportOptions {
  title?: string;
  dateRange?: { start?: Date; end?: Date };
  collectedBy?: string;
}

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') {
    return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export function exportDonationsPDF(
  donations: Donation[],
  stats: DonationStats,
  options: ExportOptions = {}
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 119, 182);
  doc.text('United 17 - Flood Relief', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(options.title || 'Donation Report', pageWidth / 2, 30, { align: 'center' });

  // Date range
  if (options.dateRange?.start || options.dateRange?.end) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const dateText = `Period: ${
      options.dateRange.start ? format(options.dateRange.start, 'MMM dd, yyyy') : 'Start'
    } - ${options.dateRange.end ? format(options.dateRange.end, 'MMM dd, yyyy') : 'Present'}`;
    doc.text(dateText, pageWidth / 2, 38, { align: 'center' });
  }

  // Generated date
  doc.setFontSize(8);
  doc.text(`Generated: ${format(new Date(), 'PPP p')}`, pageWidth / 2, 44, {
    align: 'center',
  });

  // Stats summary
  let yPos = 55;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Summary', 14, yPos);

  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Total Donations: ${formatCurrency(stats.totalLKR)}`, 14, yPos);
  yPos += 6;
  doc.text(`Sri Lanka: ${formatCurrency(stats.sriLankaTotal)}`, 14, yPos);
  yPos += 6;
  doc.text(
    `UAE: ${formatCurrency(stats.uaeTotal.aed, 'AED')} (≈ ${formatCurrency(stats.uaeTotal.lkr)})`,
    14,
    yPos
  );

  if (stats.otherCountries.length > 0) {
    yPos += 6;
    doc.text('Other Countries:', 14, yPos);
    stats.otherCountries.forEach((c) => {
      yPos += 5;
      doc.text(
        `  ${c.country}: ${formatCurrency(c.amount, c.currency)} (≈ ${formatCurrency(c.lkr)})`,
        14,
        yPos
      );
    });
  }

  // Donations table
  yPos += 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Donation Details', 14, yPos);

  const tableData = donations.map((d) => [
    format(new Date(d.donation_date), 'MMM dd, yyyy'),
    d.donor_name || '-',
    d.source_country === 'Other' ? d.country_name : d.source_country,
    d.currency,
    formatCurrency(d.amount, d.currency),
    formatCurrency(d.amount_lkr),
    d.collected_by,
  ]);

  autoTable(doc, {
    startY: yPos + 5,
    head: [['Date', 'Name', 'Country', 'Currency', 'Amount', 'LKR Value', 'Collected By']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 119, 182],
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 35 },
      2: { cellWidth: 25 },
      3: { cellWidth: 18 },
      4: { cellWidth: 28 },
      5: { cellWidth: 28 },
      6: { cellWidth: 22 },
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save
  const filename = `donation-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  doc.save(filename);
}

export function exportPersonWisePDF(
  allDonations: Donation[],
  personName: 'Ayash' | 'Atheeq'
) {
  const donations = allDonations.filter((d) => d.collected_by === personName);

  let totalLKR = 0;
  let sriLankaTotal = 0;
  let uaeAED = 0;
  let uaeLKR = 0;
  const otherMap: Record<string, { currency: string; amount: number; lkr: number }> = {};

  donations.forEach((d) => {
    totalLKR += d.amount_lkr;
    if (d.source_country === 'Sri Lanka') {
      sriLankaTotal += d.amount_lkr;
    } else if (d.source_country === 'UAE') {
      uaeAED += d.amount;
      uaeLKR += d.amount_lkr;
    } else if (d.source_country === 'Other' && d.country_name) {
      const key = `${d.country_name}-${d.currency}`;
      if (!otherMap[key]) {
        otherMap[key] = { currency: d.currency, amount: 0, lkr: 0 };
      }
      otherMap[key].amount += d.amount;
      otherMap[key].lkr += d.amount_lkr;
    }
  });

  const stats: DonationStats = {
    totalLKR,
    sriLankaTotal,
    uaeTotal: { aed: uaeAED, lkr: uaeLKR },
    otherCountries: Object.entries(otherMap).map(([key, value]) => ({
      country: key.split('-')[0],
      ...value,
    })),
  };

  exportDonationsPDF(donations, stats, {
    title: `Donations Collected by ${personName}`,
    collectedBy: personName,
  });
}
