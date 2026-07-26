import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryKeys } from '@/shared/constants/queryKeys'
import { pomodoroService } from '@/features/pomodoro/services/pomodoro.service'

export function useStartSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pomodoroService.start,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pomodoro.all })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao iniciar sessão')
    },
  })
}

export function useFinishSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pomodoroService.finish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pomodoro.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.stats.all })
      toast.success('Sessão registrada!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao finalizar sessão')
    },
  })
}

export function useCancelSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: pomodoroService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pomodoro.all })
    },
  })
}
