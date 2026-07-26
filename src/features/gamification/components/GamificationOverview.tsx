import { Award, Flame, Star, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui'

interface GamificationOverviewProps {
  level: number
  xp: number
  streak: number
  unlockedAchievements: number
  totalAchievements: number
}

export function GamificationOverview({
  level,
  xp,
  streak,
  unlockedAchievements,
  totalAchievements,
}: GamificationOverviewProps) {
  const cards = [
    { label: 'Nível', value: String(level), icon: Star, bg: 'bg-primary-100 dark:bg-primary-900/30', color: 'text-primary-500' },
    { label: 'XP Total', value: xp.toLocaleString(), icon: Trophy, bg: 'bg-warning-100 dark:bg-warning-900/30', color: 'text-warning-500' },
    { label: 'Ofensiva', value: `${streak} dias`, icon: Flame, bg: 'bg-success-100 dark:bg-success-900/30', color: 'text-success-500' },
    { label: 'Conquistas', value: `${unlockedAchievements}/${totalAchievements}`, icon: Award, bg: 'bg-error-100 dark:bg-error-900/30', color: 'text-error-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, bg, color }) => (
        <Card key={label}>
          <CardContent className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${bg}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{label}</p>
              <p className="text-2xl font-bold text-[var(--text)]">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
