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
        'relative overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
        variant === 'primary' && 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white',
        variant === 'success' && 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
        variant === 'warning' && 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
        variant === 'default' && 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700',
        className
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              'text-sm font-semibold uppercase tracking-wider',
              variant === 'default' ? 'text-slate-600 dark:text-slate-400' : 'text-white/90'
            )}
          >
            {title}
          </p>
          <p className={cn(
            "font-display text-3xl sm:text-4xl font-bold tracking-tight",
            variant === 'default' && 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400'
          )}>
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                'text-sm font-medium',
                variant === 'default' ? 'text-slate-500 dark:text-slate-400' : 'text-white/80'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110',
            variant === 'default' && 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
            variant === 'primary' && 'bg-white/20 text-white backdrop-blur-sm',
            variant === 'success' && 'bg-white/20 text-white backdrop-blur-sm',
            variant === 'warning' && 'bg-white/20 text-white backdrop-blur-sm'
          )}
        >
          {icon}
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
    </div>
  );
}
