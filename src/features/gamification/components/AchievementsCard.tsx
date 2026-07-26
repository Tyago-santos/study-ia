import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, ListSkeleton } from '@/shared/components/ui'
import { cn } from '@/shared/lib/utils'

interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
}

interface AchievementsCardProps {
  achievements: Achievement[] | undefined
  isLoading: boolean
}

export function AchievementsCard({ achievements, isLoading }: AchievementsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conquistas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ListSkeleton count={4} />
        ) : achievements && achievements.length > 0 ? (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-lg',
                  achievement.unlocked
                    ? 'bg-success-50 dark:bg-success-900/20'
                    : 'bg-[var(--bg-secondary)] opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    achievement.unlocked
                      ? 'bg-success-500 text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                  )}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text)]">{achievement.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-8">Nenhuma conquista disponível</p>
        )}
      </CardContent>
    </Card>
  )
}
