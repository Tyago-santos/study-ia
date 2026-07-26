import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface StatsCardProps {
  label: string
  value: string
  icon: LucideIcon
  gradient: string
  trend?: { value: number; isPositive: boolean }
  sparkline?: number[]
}

export function StatsCard({ label, value, icon: Icon, gradient, trend, sparkline }: StatsCardProps) {
  const max = sparkline && sparkline.length > 0 ? Math.max(...sparkline) : 0

  return (
    <div className="relative rounded-2xl border backdrop-blur-sm bg-[var(--card-bg)] border-[var(--glass-border)] shadow-[var(--glass-shadow)] p-5 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            {label}
          </p>
          <p className="text-2xl font-bold text-[var(--text)] tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  'font-medium',
                  trend.isPositive ? 'text-emerald-500' : 'text-rose-500'
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-[var(--text-secondary)]">vs semana anterior</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'p-2.5 rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110',
            gradient
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {sparkline && sparkline.length > 0 && (
        <div className="mt-3 flex items-end gap-[3px] h-8">
          {sparkline.map((val, i) => {
            const height = max > 0 ? (val / max) * 100 : 0
            return (
              <div
                key={i}
                className={cn(
                  'flex-1 rounded-sm transition-all duration-300',
                  i === sparkline.length - 1
                    ? 'bg-gradient-to-t from-primary-500 to-primary-400'
                    : 'bg-primary-200 dark:bg-primary-800/50'
                )}
                style={{ height: `${Math.max(height, 8)}%` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
