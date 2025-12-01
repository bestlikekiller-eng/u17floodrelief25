import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Donation, SourceCountry } from '@/types/donation';

export interface FilterOptions {
  startDate?: Date;
  endDate?: Date;
  sourceCountry?: SourceCountry | 'all';
  currency?: string;
  collectedBy?: 'Ayash' | 'Atheeq' | 'all';
}

interface DonationFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  currencies: string[];
}

export function DonationFilters({ filters, onFilterChange, currencies }: DonationFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const clearFilters = () => {
    onFilterChange({
      startDate: undefined,
      endDate: undefined,
      sourceCountry: 'all',
      currency: undefined,
      collectedBy: 'all',
    });
  };

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    (filters.sourceCountry && filters.sourceCountry !== 'all') ||
    filters.currency ||
    (filters.collectedBy && filters.collectedBy !== 'all');

  return (
    <div className="rounded-xl bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => setExpanded(!expanded)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              Active
            </span>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Start Date */}
          <div className="space-y-2">
            <Label className="text-xs">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !filters.startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {filters.startDate ? format(filters.startDate, 'PP') : 'From'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(d) => onFilterChange({ ...filters, startDate: d })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label className="text-xs">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !filters.endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {filters.endDate ? format(filters.endDate, 'PP') : 'To'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(d) => onFilterChange({ ...filters, endDate: d })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Source Country */}
          <div className="space-y-2">
            <Label className="text-xs">Country</Label>
            <Select
              value={filters.sourceCountry || 'all'}
              onValueChange={(v) =>
                onFilterChange({
                  ...filters,
                  sourceCountry: v as SourceCountry | 'all',
                })
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label className="text-xs">Currency</Label>
            <Select
              value={filters.currency || 'all'}
              onValueChange={(v) =>
                onFilterChange({
                  ...filters,
                  currency: v === 'all' ? undefined : v,
                })
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All currencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                {currencies.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Collected By */}
          <div className="space-y-2">
            <Label className="text-xs">Collected By</Label>
            <Select
              value={filters.collectedBy || 'all'}
              onValueChange={(v) =>
                onFilterChange({
                  ...filters,
                  collectedBy: v as 'Ayash' | 'Atheeq' | 'all',
                })
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Ayash">Ayash</SelectItem>
                <SelectItem value="Atheeq">Atheeq</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}

export function applyFilters(donations: Donation[], filters: FilterOptions): Donation[] {
  return donations.filter((d) => {
    if (filters.startDate) {
      const donationDate = new Date(d.donation_date);
      if (donationDate < filters.startDate) return false;
    }
    if (filters.endDate) {
      const donationDate = new Date(d.donation_date);
      if (donationDate > filters.endDate) return false;
    }
    if (filters.sourceCountry && filters.sourceCountry !== 'all') {
      if (d.source_country !== filters.sourceCountry) return false;
    }
    if (filters.currency) {
      if (d.currency !== filters.currency) return false;
    }
    if (filters.collectedBy && filters.collectedBy !== 'all') {
      if (d.collected_by !== filters.collectedBy) return false;
    }
    return true;
  });
}
