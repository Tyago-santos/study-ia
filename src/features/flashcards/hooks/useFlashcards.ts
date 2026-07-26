import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryKeys } from '@/shared/constants/queryKeys'
import { flashcardsService } from '@/features/flashcards/services/flashcards.service'

export function useFlashcards(subjectId?: string) {
  return useQuery({
    queryKey: subjectId ? queryKeys.flashcards.bySubject(subjectId) : queryKeys.flashcards.list(),
    queryFn: () => flashcardsService.getAll({ subjectId }),
  })
}

export function useCreateFlashcard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: flashcardsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.flashcards.all })
      toast.success('Flashcard criado!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar flashcard')
    },
  })
}

export function useDeleteFlashcard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: flashcardsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.flashcards.all })
      toast.success('Flashcard excluído!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir flashcard')
    },
  })
}
