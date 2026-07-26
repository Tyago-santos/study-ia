import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

interface StreakWidgetProps {
  streak: number
  level: number
  xp: number
  xpToNextLevel: number
}

export function StreakWidget({ streak, level, xp, xpToNextLevel }: StreakWidgetProps) {
  const xpPct = Math.round((xp / xpToNextLevel) * 100)

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5" />
      <CardHeader className="relative">
        <CardTitle>Sequencia &amp; Nivel</CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
            <span className="text-2xl font-bold text-white">{streak}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Dias de sequencia</p>
            <div className="flex gap-1 mt-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-4 h-4 rounded-full transition-all',
                    i < streak
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm shadow-amber-500/30'
                      : 'bg-[var(--bg-secondary)]'
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-500/20">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text)]">Nivel {level}</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {xp}/{xpToNextLevel} XP
              </span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
