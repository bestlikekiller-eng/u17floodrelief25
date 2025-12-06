import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'stat-card group hover:scale-[1.02] hover:shadow-elevated',
        variant === 'primary' && 'bg-emerald-500 text-white',
        variant === 'success' && 'bg-success text-success-foreground',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        className
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-1">
          <p
            className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-90'
            )}
          >
            {title}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                'text-xs',
                variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
            variant === 'default' && 'bg-primary/10 text-primary',
            variant === 'primary' && 'bg-primary-foreground/20 text-primary-foreground',
            variant === 'success' && 'bg-success-foreground/20 text-success-foreground',
            variant === 'warning' && 'bg-white/20 text-white'
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
