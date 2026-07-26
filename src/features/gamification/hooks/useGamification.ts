import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/constants/queryKeys'
import { gamificationService } from '@/features/gamification/services/gamification.service'

export function useGamificationProfile() {
  return useQuery({
    queryKey: queryKeys.gamification.profile(),
    queryFn: gamificationService.getProfile,
  })
}

export function useAchievements() {
  return useQuery({
    queryKey: queryKeys.gamification.achievements(),
    queryFn: gamificationService.getAchievements,
  })
}

export function useMissions() {
  return useQuery({
    queryKey: queryKeys.gamification.missions(),
    queryFn: gamificationService.getMissions,
  })
}
