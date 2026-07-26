import { mockScheduleEvents } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { ScheduleEvent } from '@/shared/types'

let events = [...mockScheduleEvents]

export const scheduleService = {
  getAll: async (params?: { subjectId?: string }) => {
    let filtered = events
    if (params?.subjectId) {
      filtered = filtered.filter((e) => e.subjectId === params.subjectId)
    }
    return delay([...filtered].sort((a, b) => a.date.localeCompare(b.date)))
  },

  create: async (data: {
    title: string
    type: ScheduleEvent['type']
    date: string
    subjectId?: string
    description?: string
  }) => {
    const event: ScheduleEvent = {
      id: nextId('ev'),
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    events.push(event)
    return delay({ ...event })
  },

  toggleComplete: async (id: string) => {
    const found = events.find((e) => e.id === id)
    if (!found) throw new Error('Evento nao encontrado')
    found.completed = !found.completed
    return delay({ ...found })
  },

  delete: async (id: string) => {
    events = events.filter((e) => e.id !== id)
    return delay(undefined as void)
  },
}
