import { Card, CardContent, CardHeader, CardTitle, ListSkeleton } from '@/shared/components/ui'

interface Mission {
  id: string
  name: string
  progress: number
  total: number
  xp: number
}

interface MissionsCardProps {
  missions: Mission[] | undefined
  isLoading: boolean
}

export function MissionsCard({ missions, isLoading }: MissionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Missões Diárias</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ListSkeleton count={3} />
        ) : missions && missions.length > 0 ? (
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--text)]">{mission.name}</span>
                  <span className="text-xs text-primary-500">+{mission.xp} XP</span>
                </div>
                <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all"
                    style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {mission.progress}/{mission.total}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-8">Nenhuma missão disponível</p>
        )}
      </CardContent>
    </Card>
  )
}
