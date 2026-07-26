import { useMemo } from 'react'
import {
  mockActivities,
  mockMonthlyStats,
  mockSubjects,
  mockSubjectStats,
  mockWeeklyStats,
} from '@/shared/mocks/data'
import type { CustomRange, DateRange } from '@/features/dashboard/components/DashboardFilters'

// Mock data is anchored to this date (the last day of mockWeeklyStats) instead of the real
// current date, so "hoje"/"7 dias"/"30 dias" line up with the seeded activity history.
const REFERENCE_NOW = new Date('2025-07-26T23:59:59')

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

interface DashboardFiltersState {
  dateRange: DateRange
  customRange: CustomRange
  selectedSubjects: string[]
  selectedTypes: string[]
}

function resolveRangeBounds(dateRange: DateRange, customRange: CustomRange) {
  const end = REFERENCE_NOW

  if (dateRange === 'today') {
    return { start: new Date('2025-07-26T00:00:00'), end }
  }

  if (dateRange === '30d') {
    const start = new Date(end)
    start.setDate(start.getDate() - 29)
    start.setHours(0, 0, 0, 0)
    return { start, end }
  }

  if (dateRange === 'custom') {
    const start = customRange.start ? new Date(`${customRange.start}T00:00:00`) : new Date(0)
    const customEnd = customRange.end ? new Date(`${customRange.end}T23:59:59`) : end
    return { start, end: customEnd }
  }

  const start = new Date(end)
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)
  return { start, end }
}

/**
 * Derives every chart/timeline dataset shown on the dashboard from the
 * currently selected filters.
 */
export function useDashboardData({
  dateRange,
  customRange,
  selectedSubjects,
  selectedTypes,
}: DashboardFiltersState) {
  const rangeBounds = useMemo(
    () => resolveRangeBounds(dateRange, customRange),
    [dateRange, customRange]
  )

  const chartDays = useMemo(() => {
    if (dateRange === '30d') return mockMonthlyStats.days
    if (dateRange === 'today') return mockWeeklyStats.days.slice(-1)
    if (dateRange === 'custom') {
      return [...mockMonthlyStats.days, ...mockWeeklyStats.days]
        .filter((d) => {
          const date = new Date(`${d.date}T12:00:00`)
          return date >= rangeBounds.start && date <= rangeBounds.end
        })
        .sort((a, b) => a.date.localeCompare(b.date))
    }
    return mockWeeklyStats.days
  }, [dateRange, rangeBounds])

  const activities = useMemo(
    () =>
      mockActivities.filter((a) => {
        const createdAt = new Date(a.createdAt)
        if (createdAt < rangeBounds.start || createdAt > rangeBounds.end) return false
        if (selectedTypes.length > 0 && !selectedTypes.includes(a.type)) return false
        if (selectedSubjects.length > 0 && !selectedSubjects.includes(a.subjectId)) return false
        return true
      }),
    [rangeBounds, selectedTypes, selectedSubjects]
  )

  const weeklyChartData = useMemo(
    () =>
      chartDays.map((d) => {
        const date = new Date(`${d.date}T12:00:00`)
        return {
          name:
            chartDays.length <= 7
              ? DAY_NAMES[date.getDay()]
              : date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          minutes: d.minutes,
          pomodoros: d.pomodoros,
        }
      }),
    [chartDays]
  )

  const subjectChartData = useMemo(() => {
    const filtered =
      selectedSubjects.length > 0
        ? mockSubjectStats.filter((s) => selectedSubjects.includes(s.subjectId))
        : mockSubjectStats

    return filtered.map((s) => ({
      name: s.subjectName,
      value: s.totalMinutes,
      color: mockSubjects.find((ms) => ms.id === s.subjectId)?.color ?? '#6b7280',
    }))
  }, [selectedSubjects])

  const trendData = useMemo(
    () =>
      chartDays.map((d) => ({
        name: new Date(`${d.date}T12:00:00`).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }),
        value: d.minutes,
      })),
    [chartDays]
  )

  const totalSubjectMinutes = subjectChartData.reduce((acc, s) => acc + s.value, 0)

  return { activities, weeklyChartData, subjectChartData, trendData, totalSubjectMinutes }
}
