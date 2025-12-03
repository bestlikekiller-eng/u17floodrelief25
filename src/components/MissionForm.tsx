import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Upload, X, Save } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MissionFormData, MissionItem } from '@/hooks/useMissions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MissionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MissionFormData) => Promise<boolean>;
  createdBy: string;
}

interface ItemInput {
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface PhotoUpload {
  file: File;
  type: 'receipt' | 'item' | 'proof';
  preview: string;
}

export function MissionForm({ open, onClose, onSubmit, createdBy }: MissionFormProps) {
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [remarks, setRemarks] = useState('');
  const [volunteersCount, setVolunteersCount] = useState('');
  const [volunteerNames, setVolunteerNames] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [items, setItems] = useState<ItemInput[]>([]);
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [loading, setLoading] = useState(false);

  const receiptInputRef = useRef<HTMLInputElement>(null);
  const itemInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const totalSpent = items.reduce((sum, item) => sum + item.total_price, 0);

  const addItem = () => {
    setItems([...items, { item_name: '', quantity: 1, unit_price: 0, total_price: 0 }]);
  };

  const updateItem = (index: number, field: keyof ItemInput, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Auto-calculate total price
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].total_price = newItems[index].quantity * newItems[index].unit_price;
    }

    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'receipt' | 'item' | 'proof') => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: PhotoUpload[] = [];
    Array.from(files).forEach((file) => {
      const preview = URL.createObjectURL(file);
      newPhotos.push({ file, type, preview });
    });

    setPhotos([...photos, ...newPhotos]);
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    const photo = photos[index];
    URL.revokeObjectURL(photo.preview);
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setDistrict('');
    setArea('');
    setDate(new Date());
    setRemarks('');
    setVolunteersCount('');
    setVolunteerNames('');
    setDriveLink('');
    setItems([]);
    photos.forEach((p) => URL.revokeObjectURL(p.preview));
    setPhotos([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the mission
      const formData: MissionFormData = {
        district,
        area,
        total_spent: totalSpent,
        mission_date: format(date, 'yyyy-MM-dd'),
        remarks: remarks || undefined,
        volunteers_count: volunteersCount ? parseInt(volunteersCount) : 0,
        volunteer_names: volunteerNames ? volunteerNames.split(',').map((n) => n.trim()) : undefined,
        drive_link: driveLink || undefined,
        created_by: createdBy,
        items: items.length > 0 ? items : undefined,
      };

      // Insert mission and get the ID
      const { data: mission, error: missionError } = await supabase
        .from('missions')
        .insert([{
          district: formData.district,
          area: formData.area,
          total_spent: formData.total_spent,
          mission_date: formData.mission_date,
          remarks: formData.remarks,
          volunteers_count: formData.volunteers_count,
          volunteer_names: formData.volunteer_names,
          drive_link: formData.drive_link,
          created_by: formData.created_by,
        }])
        .select()
        .single();

      if (missionError) throw missionError;

      // Add items if any
      if (formData.items && formData.items.length > 0) {
        const itemsWithMissionId = formData.items.map((item) => ({
          mission_id: mission.id,
          item_name: item.item_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
        }));

        const { error: itemsError } = await supabase
          .from('mission_items')
          .insert(itemsWithMissionId);

        if (itemsError) throw itemsError;
      }

      // Upload photos
      for (const photo of photos) {
        const fileExt = photo.file.name.split('.').pop();
        const fileName = `${mission.id}/${photo.type}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('mission-photos')
          .upload(fileName, photo.file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('mission-photos')
          .getPublicUrl(fileName);

        await supabase.from('mission_photos').insert([{
          mission_id: mission.id,
          photo_type: photo.type,
          photo_url: publicUrl,
        }]);
      }

      toast({
        title: 'Success',
        description: 'Mission added successfully',
      });

      resetForm();
      onClose();
      // Trigger a refetch
      window.location.reload();
    } catch (error) {
      console.error('Error adding mission:', error);
      toast({
        title: 'Error',
        description: 'Failed to add mission',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const receiptPhotos = photos.filter((p) => p.type === 'receipt');
  const itemPhotos = photos.filter((p) => p.type === 'item');
  const proofPhotos = photos.filter((p) => p.type === 'proof');

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Add New Mission</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>District *</Label>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g., Colombo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Area *</Label>
              <Input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g., Kelaniya"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Mission Date *</Label>
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

          {/* Items Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Items Breakdown</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="mr-1 h-4 w-4" />
                Add Item
              </Button>
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Item name"
                        value={item.item_name}
                        onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                      />
                    </div>
                    <div className="w-20">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity || ''}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-28">
                      <Input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unit_price || ''}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-28">
                      <Input
                        type="number"
                        placeholder="Total"
                        value={item.total_price || ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <div className="text-right font-semibold">
                  Total: Rs. {totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </div>

          {/* Manual Total (if no items) */}
          {items.length === 0 && (
            <div className="space-y-2">
              <Label>Total Spent (Rs.) *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter total amount spent"
              />
            </div>
          )}

          {/* Remarks */}
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any additional notes about the mission"
              rows={3}
            />
          </div>

          {/* Volunteers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Number of Volunteers</Label>
              <Input
                type="number"
                value={volunteersCount}
                onChange={(e) => setVolunteersCount(e.target.value)}
                placeholder="e.g., 5"
              />
            </div>
            <div className="space-y-2">
              <Label>Volunteer Names (comma separated)</Label>
              <Input
                value={volunteerNames}
                onChange={(e) => setVolunteerNames(e.target.value)}
                placeholder="e.g., John, Jane, Mike"
              />
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <Label>Photos</Label>

            {/* Receipt Photos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Receipt Photos</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => receiptInputRef.current?.click()}
                >
                  <Upload className="mr-1 h-4 w-4" />
                  Upload
                </Button>
                <input
                  ref={receiptInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, 'receipt')}
                />
              </div>
              {receiptPhotos.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {receiptPhotos.map((photo, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={photo.preview}
                        alt="Receipt"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photos.indexOf(photo))}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item Photos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Item Photos</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => itemInputRef.current?.click()}
                >
                  <Upload className="mr-1 h-4 w-4" />
                  Upload
                </Button>
                <input
                  ref={itemInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, 'item')}
                />
              </div>
              {itemPhotos.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {itemPhotos.map((photo, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={photo.preview}
                        alt="Item"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photos.indexOf(photo))}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Proof Photos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Proof Photo with Volunteers</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => proofInputRef.current?.click()}
                >
                  <Upload className="mr-1 h-4 w-4" />
                  Upload
                </Button>
                <input
                  ref={proofInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, 'proof')}
                />
              </div>
              {proofPhotos.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {proofPhotos.map((photo, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={photo.preview}
                        alt="Proof"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photos.indexOf(photo))}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Drive Link */}
          <div className="space-y-2">
            <Label>Google Drive Link (Mission Photos & Album)</Label>
            <Input
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Mission'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
