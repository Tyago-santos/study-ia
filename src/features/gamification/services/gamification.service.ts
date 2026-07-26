import { mockGamification } from '@/shared/mocks/data'
import { delay } from '@/shared/mocks/helpers'

export const gamificationService = {
  getProfile: () => delay({ ...mockGamification.profile }),
  getAchievements: () => delay(mockGamification.achievements.map((a) => ({ ...a }))),
  getMissions: () => delay(mockGamification.missions.map((m) => ({ ...m }))),
}
