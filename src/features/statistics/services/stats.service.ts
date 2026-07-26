import {
  mockDashboardStats,
  mockSubjectStats,
  mockYearlyActivity,
} from '@/shared/mocks/data'
import { delay } from '@/shared/mocks/helpers'
import type { DailyStats, SubjectStats } from '@/shared/types'

export const statsService = {
  getDashboard: () => delay({ ...mockDashboardStats }),
  getSubjectStats: () => delay<SubjectStats[]>(mockSubjectStats.map((s) => ({ ...s }))),
  getContributions: () => delay<DailyStats[]>(mockYearlyActivity.map((d) => ({ ...d }))),
  getPomodoroStats: () => delay({ totalPomodoros: 48, totalTime: 1260 }),
  getQuizStats: () => delay({ average: 85, total: 12, bestStreak: 5 }),
  getFlashcardStats: () => delay({ total: 24, reviewed: 18, due: 6 }),
}
