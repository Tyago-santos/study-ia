import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useFinishSession } from '@/features/pomodoro/hooks/usePomodoro'
import { playPomodoroSound } from '@/features/pomodoro/lib/sound'
import { usePomodoroStore } from '@/features/pomodoro/store/pomodoro.store'

const nextModeAfterFocus = 'shortBreak' as const

export function PomodoroEngine() {
  const isRunning = usePomodoroStore((s) => s.isRunning)
  const timeLeft = usePomodoroStore((s) => s.timeLeft)
  const mode = usePomodoroStore((s) => s.mode)
  const soundEnabled = usePomodoroStore((s) => s.settings.soundEnabled)
  const activeSessionId = usePomodoroStore((s) => s.activeSessionId)
  const finishSession = useFinishSession()
  const completingRef = useRef(false)

  useEffect(() => {
    if (!isRunning) return
    const interval = window.setInterval(() => {
      usePomodoroStore.getState().tick()
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (!isRunning || timeLeft > 0 || completingRef.current) return
    completingRef.current = true

    if (soundEnabled) playPomodoroSound()

    if (mode === 'focus' && activeSessionId) {
      finishSession.mutate(activeSessionId, {
        onSettled: () => {
          usePomodoroStore.getState().setActiveSessionId(null)
          usePomodoroStore.getState().completeTransition(nextModeAfterFocus)
          completingRef.current = false
        },
      })
    } else {
      toast.success(mode === 'focus' ? 'Foco concluído!' : 'Pausa concluída!')
      usePomodoroStore.getState().completeTransition(mode === 'focus' ? nextModeAfterFocus : mode)
      completingRef.current = false
    }
  }, [isRunning, timeLeft, mode, activeSessionId, soundEnabled, finishSession])

  return null
}
