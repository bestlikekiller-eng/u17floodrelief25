import { useState, useEffect } from 'react';
import { Donation, DonationFormData, SourceCountry } from '@/types/donation';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DonationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DonationFormData) => Promise<boolean>;
  editingDonation?: Donation | null;
  defaultCollector?: string;
}

export function DonationForm({
  open,
  onClose,
  onSubmit,
  editingDonation,
  defaultCollector,
}: DonationFormProps) {
  const [sourceCountry, setSourceCountry] = useState<SourceCountry>('Sri Lanka');
  const [countryName, setCountryName] = useState('');
  const [currency, setCurrency] = useState('LKR');
  const [amount, setAmount] = useState('');
  const [amountLKR, setAmountLKR] = useState('');
  const [donorName, setDonorName] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [collectedBy, setCollectedBy] = useState<'Ayash' | 'Atheeq' | 'Inas'>(
    (defaultCollector as 'Ayash' | 'Atheeq' | 'Inas') || 'Ayash'
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingDonation) {
      setSourceCountry(editingDonation.source_country);
      setCountryName(editingDonation.country_name || '');
      setCurrency(editingDonation.currency);
      setAmount(editingDonation.amount.toString());
      setAmountLKR(editingDonation.amount_lkr.toString());
      setDonorName(editingDonation.donor_name || '');
      setDate(new Date(editingDonation.donation_date));
      setCollectedBy(editingDonation.collected_by);
    } else {
      resetForm();
    }
  }, [editingDonation, open]);

  useEffect(() => {
    if (sourceCountry === 'Sri Lanka') {
      setCurrency('LKR');
      setAmountLKR(amount);
    } else if (sourceCountry === 'UAE') {
      setCurrency('AED');
    } else if (sourceCountry === 'Germany') {
      setCurrency('EUR');
    } else if (sourceCountry === 'Pakistan') {
      setCurrency('PKR');
    }
  }, [sourceCountry, amount]);

  const resetForm = () => {
    setSourceCountry('Sri Lanka');
    setCountryName('');
    setCurrency('LKR');
    setAmount('');
    setAmountLKR('');
    setDonorName('');
    setDate(new Date());
    setCollectedBy((defaultCollector as 'Ayash' | 'Atheeq' | 'Inas') || 'Ayash');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData: DonationFormData = {
      source_country: sourceCountry,
      country_name: sourceCountry === 'Other' ? countryName : undefined,
      currency,
      amount: parseFloat(amount),
      amount_lkr: sourceCountry === 'Sri Lanka' ? parseFloat(amount) : parseFloat(amountLKR),
      donor_name: donorName || undefined,
      donation_date: format(date, 'yyyy-MM-dd'),
      collected_by: collectedBy,
    };

    const success = await onSubmit(formData);
    setLoading(false);

    if (success) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {editingDonation ? 'Edit Donation' : 'Add New Donation'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Source Country */}
          <div className="space-y-2">
            <Label>Source Country *</Label>
            <Select
              value={sourceCountry}
              onValueChange={(v) => setSourceCountry(v as SourceCountry)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Pakistan">Pakistan</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country Name (for Other) */}
          {sourceCountry === 'Other' && (
            <div className="space-y-2">
              <Label>Country Name *</Label>
              <Input
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter country name"
                required
              />
            </div>
          )}

          {/* Currency (for Other) */}
          {sourceCountry === 'Other' && (
            <div className="space-y-2">
              <Label>Currency *</Label>
              <Input
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                placeholder="e.g., USD, GBP"
                required
              />
            </div>
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount in {currency} *</Label>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (sourceCountry === 'Sri Lanka') {
                  setAmountLKR(e.target.value);
                }
              }}
              placeholder={`Enter amount in ${currency}`}
              required
            />
          </div>

          {/* Equivalent LKR (for non-Sri Lanka) */}
          {sourceCountry !== 'Sri Lanka' && (
            <div className="space-y-2">
              <Label>Equivalent Amount in LKR *</Label>
              <Input
                type="number"
                step="0.01"
                value={amountLKR}
                onChange={(e) => setAmountLKR(e.target.value)}
                placeholder="Enter equivalent LKR amount"
                required
              />
            </div>
          )}

          {/* Donor Name */}
          <div className="space-y-2">
            <Label>Name / Description (Optional)</Label>
            <Input
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter donor name or description"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Collected By */}
          <div className="space-y-2">
            <Label>Collected By *</Label>
            <Select
              value={collectedBy}
              onValueChange={(v) => setCollectedBy(v as 'Ayash' | 'Atheeq' | 'Inas')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ayash">Ayash</SelectItem>
                <SelectItem value="Atheeq">Atheeq</SelectItem>
                <SelectItem value="Inas">Inas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
