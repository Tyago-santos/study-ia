import { mockSessions } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { StudySession } from '@/shared/types'

const sessions = [...mockSessions]

export const pomodoroService = {
  start: async (data: { subjectId: string; type: 'pomodoro' | 'free' }) => {
    const session: StudySession = {
      id: nextId('ss'),
      subjectId: data.subjectId,
      duration: 0,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      type: data.type,
    }
    sessions.push(session)
    return delay({ ...session })
  },

  finish: async (sessionId: string) => {
    const idx = sessions.findIndex((s) => s.id === sessionId)
    if (idx === -1) throw new Error('Session not found')
    const session = sessions[idx]
    const duration = Math.round((Date.now() - new Date(session.startedAt).getTime()) / 60000)
    sessions[idx] = {
      ...session,
      duration,
      completedAt: new Date().toISOString(),
    }

    const todaySessions = sessions.filter(
      (s) => new Date(s.completedAt).toDateString() === new Date().toDateString()
    )
    const todayTotal = todaySessions.reduce((acc, s) => acc + s.duration, 0)
    const weekTotal = sessions.reduce((acc, s) => acc + s.duration, 0)

    return delay({ session: { ...sessions[idx] }, todayTotal, weekTotal })
  },

  cancel: async (_sessionId: string) => {
    return delay(undefined as void)
  },
}
