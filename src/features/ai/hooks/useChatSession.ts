import { useEffect, useRef, useState } from 'react'
import {
  useConversations,
  useCreateConversation,
  useMessages,
  useSendMessage,
} from '@/features/ai/hooks/useAI'

/**
 * Owns the chat lifecycle: picks (or creates) the active conversation,
 * loads its messages and tracks the optimistic "pending" message while
 * the assistant reply is in flight.
 */
export function useChatSession() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [pendingText, setPendingText] = useState<string | null>(null)
  const hasRequestedCreateRef = useRef(false)

  const {
    data: conversations,
    isLoading: conversationsLoading,
    error: conversationsError,
    refetch,
  } = useConversations()
  const {
    data: messages,
    isLoading: messagesLoading,
    isFetching: messagesFetching,
  } = useMessages(activeConversation ?? '')
  const createConversation = useCreateConversation()
  const sendMessage = useSendMessage(activeConversation ?? '')

  useEffect(() => {
    if (conversationsLoading || activeConversation) return
    if (conversations && conversations.length > 0) {
      setActiveConversation(conversations[0].id)
    } else if (conversations && conversations.length === 0 && !hasRequestedCreateRef.current) {
      hasRequestedCreateRef.current = true
      createConversation.mutate(undefined, {
        onSuccess: (conversation) => setActiveConversation(conversation.id),
      })
    }
  }, [conversations, activeConversation, conversationsLoading, createConversation])

  useEffect(() => {
    if (pendingText && !sendMessage.isPending && !messagesFetching) {
      setPendingText(null)
    }
  }, [pendingText, sendMessage.isPending, messagesFetching])

  const send = (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || !activeConversation) return
    setPendingText(trimmed)
    sendMessage.mutate(trimmed)
  }

  return {
    activeConversation,
    messages,
    messagesLoading,
    pendingText,
    isSending: sendMessage.isPending,
    conversationsError,
    refetch,
    send,
  }
}
