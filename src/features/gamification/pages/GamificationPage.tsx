import { ErrorState, StatsSkeleton } from '@/shared/components/ui'
import {
  useAchievements,
  useGamificationProfile,
  useMissions,
} from '@/features/gamification/hooks/useGamification'
import { AchievementsCard } from '../components/AchievementsCard'
import { GamificationOverview } from '../components/GamificationOverview'
import { MissionsCard } from '../components/MissionsCard'

export function GamificationPage() {
  const { data: profile, isLoading, error, refetch } = useGamificationProfile()
  const { data: achievements, isLoading: achievementsLoading } = useAchievements()
  const { data: missions, isLoading: missionsLoading } = useMissions()

  if (error) {
    return <ErrorState message="Erro ao carregar gamificação" onRetry={refetch} />
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[var(--bg-secondary)] rounded animate-pulse" />
        <StatsSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Gamificação</h1>
        <p className="text-[var(--text-secondary)]">Acompanhe seu progresso e conquistas</p>
      </div>

      <GamificationOverview
        level={profile?.level ?? 0}
        xp={profile?.xp ?? 0}
        streak={profile?.streak ?? 0}
        unlockedAchievements={achievements?.filter((a) => a.unlocked).length ?? 0}
        totalAchievements={achievements?.length ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MissionsCard missions={missions} isLoading={missionsLoading} />
        <AchievementsCard achievements={achievements} isLoading={achievementsLoading} />
      </div>
    </div>
  )
}
