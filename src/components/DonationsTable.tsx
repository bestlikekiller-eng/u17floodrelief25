import { useState } from 'react';
import { Donation } from '@/types/donation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DonationsTableProps {
  donations: Donation[];
  showActions?: boolean;
  onEdit?: (donation: Donation) => void;
  onDelete?: (id: string) => void;
}

function formatCurrency(amount: number, currency: string = 'LKR'): string {
  if (currency === 'LKR') {
    return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export function DonationsTable({
  donations,
  showActions = false,
  onEdit,
  onDelete,
}: DonationsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (donations.length === 0) {
    return (
      <div className="rounded-xl bg-card p-12 text-center shadow-soft">
        <p className="text-muted-foreground">No donations found</p>
      </div>
    );
  }

  // Mobile card view
  const MobileView = () => (
    <div className="space-y-3 md:hidden">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="rounded-xl bg-card p-4 shadow-soft"
        >
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => toggleRow(donation.id)}
          >
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {donation.donor_name || 'Anonymous'}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(donation.donation_date), 'MMM dd, yyyy')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  {formatCurrency(donation.amount_lkr)}
                </p>
                {donation.currency !== 'LKR' && (
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(donation.amount, donation.currency)}
                  </p>
                )}
              </div>
              {expandedRows.has(donation.id) ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {expandedRows.has(donation.id) && (
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Country</span>
                <span className="text-foreground">
                  {donation.source_country === 'Other'
                    ? donation.country_name
                    : donation.source_country}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collected by</span>
                <Badge variant="secondary">{donation.collected_by}</Badge>
              </div>
              {showActions && (
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(donation);
                    }}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(donation.id);
                    }}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Desktop table view
  const DesktopView = () => (
    <div className="hidden md:block rounded-xl bg-card shadow-soft overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Name/Description</TableHead>
            <TableHead className="font-semibold">Country</TableHead>
            <TableHead className="font-semibold">Currency</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
            <TableHead className="font-semibold text-right">LKR Value</TableHead>
            <TableHead className="font-semibold">Collected By</TableHead>
            {showActions && <TableHead className="font-semibold">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation, idx) => (
            <TableRow
              key={donation.id}
              className={cn(
                'transition-colors',
                idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'
              )}
            >
              <TableCell className="font-medium">
                {format(new Date(donation.donation_date), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>{donation.donor_name || '-'}</TableCell>
              <TableCell>
                {donation.source_country === 'Other'
                  ? donation.country_name
                  : donation.source_country}
              </TableCell>
              <TableCell>{donation.currency}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(donation.amount, donation.currency)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(donation.amount_lkr)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    donation.collected_by === 'Ayash'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-success/10 text-success'
                  )}
                >
                  {donation.collected_by}
                </Badge>
              </TableCell>
              {showActions && (
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit?.(donation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete?.(donation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
