import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, MapPin, Users, Calendar } from 'lucide-react';

export function ExpenseReportCard() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/United17_Expense_Report.pdf';
    link.download = 'United17_Flood_Relief_Expense_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Icon and Title Section */}
          <div className="flex-shrink-0">
            <div className="rounded-2xl bg-primary/10 p-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl mb-2">
              Complete Expense Report
            </h3>
            <p className="text-muted-foreground mb-4">
              Full transparency on how every rupee was spent. Download the detailed breakdown of all relief operations.
            </p>

            {/* Mission Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">2 Missions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">83 Families</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2 sm:col-span-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">Dec 2025</span>
              </div>
            </div>

            {/* Missions Details */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
              <span className="bg-muted px-2 py-1 rounded-full">🏥 Mission 1: Anuradhapura</span>
              <span className="bg-muted px-2 py-1 rounded-full">🏘️ Mission 2: Puttalam (3 Villages)</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex-shrink-0">
            <Button 
              onClick={handleDownload}
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              <Download className="h-5 w-5" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground italic">
            "Every donation, no matter how small, made a difference. Thank you for your trust." 
            <span className="font-semibold text-foreground"> – United 17 Team</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
