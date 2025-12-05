import { Mission, MissionStats } from '@/hooks/useMissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Target,
  MapPin,
  Calendar,
  Users,
  Receipt,
  Package,
  Camera,
  ExternalLink,
  ImageIcon,
  X,
  ZoomIn,
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface MissionsSectionProps {
  missions: Mission[];
  loading: boolean;
  stats: MissionStats;
}

function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function MissionsSection({ missions, loading, stats }: MissionsSectionProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <section className="container py-8 sm:py-12">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </section>
    );
  }

  if (missions.length === 0) {
    return null;
  }

  return (
    <section className="container py-8 sm:py-12">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Total Actions / Missions Completed
              </p>
              <CardTitle className="font-display text-3xl font-bold text-primary">
                {stats.totalMissions}
              </CardTitle>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Relief Actions Breakdown
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onViewDetails={() => setSelectedMission(mission)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Details Dialog */}
      <Dialog open={!!selectedMission} onOpenChange={() => setSelectedMission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedMission && (
            <MissionDetails
              mission={selectedMission}
              onImageClick={setZoomedImage}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Image Zoom Dialog */}
      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/90 border-none">
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {zoomedImage && (
            <div className="flex items-center justify-center w-full h-full p-4">
              <img
                src={zoomedImage}
                alt="Zoomed"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface MissionCardProps {
  mission: Mission;
  onViewDetails: () => void;
}

function MissionCard({ mission, onViewDetails }: MissionCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {mission.featured_image_url ? (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={mission.featured_image_url}
            alt={`${mission.district} - ${mission.area}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <Target className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground">{mission.district}</h4>
            <p className="text-sm text-muted-foreground">{mission.area}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {format(new Date(mission.mission_date), 'MMM dd')}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{formatCurrency(mission.total_spent)}</span>
          </div>
          {mission.volunteers_count > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{mission.volunteers_count} volunteers</span>
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  );
}

interface MissionDetailsProps {
  mission: Mission;
  onImageClick: (url: string) => void;
}

function MissionDetails({ mission, onImageClick }: MissionDetailsProps) {
  const receiptPhotos = mission.photos?.filter((p) => p.photo_type === 'receipt') || [];
  const itemPhotos = mission.photos?.filter((p) => p.photo_type === 'item') || [];
  const proofPhotos = mission.photos?.filter((p) => p.photo_type === 'proof') || [];

  return (
    <>
      {/* Featured Image Header */}
      {mission.featured_image_url && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={mission.featured_image_url}
            alt={`${mission.district} - ${mission.area}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {mission.district} - {mission.area}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {format(new Date(mission.mission_date), 'MMMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{mission.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">{formatCurrency(mission.total_spent)}</span>
            </div>
            {mission.volunteers_count > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mission.volunteers_count} volunteers</span>
              </div>
            )}
          </div>

          {/* Remarks */}
          {mission.remarks && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Remarks</h4>
              <p className="text-sm text-foreground">{mission.remarks}</p>
            </div>
          )}

          {/* Volunteer Names */}
          {mission.volunteer_names && mission.volunteer_names.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Volunteers</h4>
              <div className="flex flex-wrap gap-2">
                {mission.volunteer_names.map((name, idx) => (
                  <Badge key={idx} variant="outline">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Items Breakdown */}
          {mission.items && mission.items.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Items Breakdown</h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">Item</th>
                      <th className="text-center px-3 py-2 font-medium">Qty</th>
                      <th className="text-right px-3 py-2 font-medium">Unit Price</th>
                      <th className="text-right px-3 py-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mission.items.map((item) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-3 py-2">{item.item_name}</td>
                        <td className="text-center px-3 py-2">{item.quantity}</td>
                        <td className="text-right px-3 py-2">{formatCurrency(item.unit_price)}</td>
                        <td className="text-right px-3 py-2 font-medium">
                          {formatCurrency(item.total_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Receipt Photos */}
          {receiptPhotos.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Receipt Photos ({receiptPhotos.length})
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {receiptPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => onImageClick(photo.photo_url)}
                    className="aspect-square rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity relative group"
                  >
                    <img
                      src={photo.photo_url}
                      alt="Receipt"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Item Photos */}
          {itemPhotos.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Item Photos ({itemPhotos.length})
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {itemPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => onImageClick(photo.photo_url)}
                    className="aspect-square rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity relative group"
                  >
                    <img
                      src={photo.photo_url}
                      alt="Item"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Proof Photos */}
          {proofPhotos.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Proof Photo with Volunteers
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {proofPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => onImageClick(photo.photo_url)}
                    className="rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity relative group"
                  >
                    <img
                      src={photo.photo_url}
                      alt="Proof"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Drive Link */}
          {mission.drive_link && (
            <div>
              <Button asChild variant="outline" className="w-full">
                <a href={mission.drive_link} target="_blank" rel="noopener noreferrer">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  View Mission Photos & Album
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}