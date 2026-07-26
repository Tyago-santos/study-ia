import { CheckCircle, Circle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

interface Mission {
  id: string
  name: string
  progress: number
  total: number
  xp: number
  completed: boolean
}

interface MissionsWidgetProps {
  missions: Mission[]
}

export function MissionsWidget({ missions }: MissionsWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Missoes de hoje</CardTitle>
        <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
          <Zap className="w-3.5 h-3.5" />
          {missions.filter((m) => m.completed).length}/{missions.length}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {missions.map((mission) => {
          const pct = Math.min(100, Math.round((mission.progress / mission.total) * 100))
          return (
            <div key={mission.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {mission.completed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-[var(--text-secondary)]" />
                  )}
                  <span
                    className={cn(
                      'text-sm font-medium',
                      mission.completed
                        ? 'text-[var(--text-secondary)] line-through'
                        : 'text-[var(--text)]'
                    )}
                  >
                    {mission.name}
                  </span>
                </div>
                <span className="text-xs text-amber-500 font-medium">+{mission.xp} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    mission.completed
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                      : 'bg-gradient-to-r from-primary-400 to-primary-600'
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
