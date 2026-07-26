import { create } from 'zustand'
import type { DayPlan, PlanBlock } from '@/shared/types'
import { MAX_DURATION } from '@/features/dashboard/lib/duration'

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const MIN_DURATION = 15

interface WeeklyPlannerState {
  days: DayPlan[]
  addBlock: (dayIndex: number, block: PlanBlock) => void
  removeBlock: (dayIndex: number, blockId: string) => void
  updateDuration: (dayIndex: number, blockId: string, duration: number) => void
  updateTopic: (
    dayIndex: number,
    blockId: string,
    topicId: string | undefined,
    topicName: string | undefined
  ) => void
  moveBlock: (sourceDay: number, destDay: number, sourceIndex: number, destIndex: number) => void
}

function createEmptyDays(): DayPlan[] {
  return DAYS.map((name, index) => ({
    dayName: name,
    dayIndex: index,
    blocks: [],
  }))
}

export const useWeeklyPlannerStore = create<WeeklyPlannerState>((set) => ({
  days: createEmptyDays(),

  addBlock: (dayIndex, block) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayIndex === dayIndex ? { ...day, blocks: [...day.blocks, block] } : day
      ),
    })),

  removeBlock: (dayIndex, blockId) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayIndex === dayIndex
          ? { ...day, blocks: day.blocks.filter((b) => b.id !== blockId) }
          : day
      ),
    })),

  updateDuration: (dayIndex, blockId, duration) =>
    set((state) => {
      const clamped = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration))
      return {
        days: state.days.map((day) =>
          day.dayIndex === dayIndex
            ? {
                ...day,
                blocks: day.blocks.map((b) => (b.id === blockId ? { ...b, duration: clamped } : b)),
              }
            : day
        ),
      }
    }),

  updateTopic: (dayIndex, blockId, topicId, topicName) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayIndex === dayIndex
          ? {
              ...day,
              blocks: day.blocks.map((b) => (b.id === blockId ? { ...b, topicId, topicName } : b)),
            }
          : day
      ),
    })),

  moveBlock: (sourceDay, destDay, sourceIndex, destIndex) =>
    set((state) => {
      const days = state.days.map((d) => ({ ...d, blocks: [...d.blocks] }))

      const sourceDayObj = days.find((d) => d.dayIndex === sourceDay)
      const destDayObj = days.find((d) => d.dayIndex === destDay)
      if (!sourceDayObj || !destDayObj) return state

      const [moved] = sourceDayObj.blocks.splice(sourceIndex, 1)
      if (!moved) return state

      destDayObj.blocks.splice(destIndex, 0, moved)

      return { days }
    }),
}))
