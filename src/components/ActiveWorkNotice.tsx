import { Hammer, RefreshCw, CheckCircle } from 'lucide-react';

export function ActiveWorkNotice() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-blue-500/10 p-2 mt-0.5">
          <Hammer className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-semibold text-foreground flex items-center gap-2">
            <span>We're Already on the Ground!</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
              <CheckCircle className="h-3 w-3" />
              Active
            </span>
          </h4>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Our U17 team members are <span className="font-medium text-foreground">already working in the field</span>, 
            delivering relief supplies and supporting affected families. We're not just collecting donations – 
            we've <span className="font-medium text-foreground">initiated the relief process</span> and are actively making a difference.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 text-blue-500" />
            <span>This website will be updated with <span className="font-medium text-foreground">all details, photos, and receipts</span> of our work.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
