import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdditionalChargeFormData } from '@/hooks/useAdditionalCharges';

interface AdditionalChargesFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdditionalChargeFormData) => Promise<boolean>;
}

export function AdditionalChargesForm({ open, onClose, onSubmit }: AdditionalChargesFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [chargeDate, setChargeDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onSubmit({
      description,
      amount: parseFloat(amount),
      charge_date: chargeDate,
    });

    if (success) {
      setDescription('');
      setAmount('');
      setChargeDate(new Date().toISOString().split('T')[0]);
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Additional Charge</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Transport, Miscellaneous"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (LKR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chargeDate">Date</Label>
            <Input
              id="chargeDate"
              type="date"
              value={chargeDate}
              onChange={(e) => setChargeDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Charge'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
