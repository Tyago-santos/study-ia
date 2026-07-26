import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryKeys } from '@/shared/constants/queryKeys'
import { aiService } from '@/features/ai/services/ai.service'

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.ai.conversations(),
    queryFn: aiService.getConversations,
  })
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: queryKeys.ai.messages(conversationId),
    queryFn: () => aiService.getMessages(conversationId),
    enabled: !!conversationId && conversationId.length > 0,
  })
}

export function useCreateConversation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: aiService.createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar conversa')
    },
  })
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => aiService.sendMessage(conversationId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.messages(conversationId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.ai.conversations() })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao enviar mensagem')
    },
  })
}
