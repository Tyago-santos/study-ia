import { mockConversations } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { ChatMessage, Conversation } from '@/shared/types'

const conversations = [...mockConversations]

export const aiService = {
  getConversations: () => delay([...conversations]),

  getMessages: (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    if (!conversation) throw new Error('Conversation not found')
    return delay([...conversation.messages])
  },

  createConversation: async (title?: string) => {
    const conversation: Conversation = {
      id: nextId('c'),
      title: title ?? 'Nova Conversa',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    conversations.push(conversation)
    return delay({ ...conversation })
  },

  sendMessage: async (conversationId: string, data: { content: string }) => {
    const idx = conversations.findIndex((c) => c.id === conversationId)
    if (idx === -1) throw new Error('Conversation not found')

    const userMessage: ChatMessage = {
      id: nextId('m'),
      content: data.content,
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    conversations[idx].messages.push(userMessage)

    const assistantMessage: ChatMessage = {
      id: nextId('m'),
      content: `Esta e uma resposta simulada da IA para: "${data.content}". Em producao, isso seria conectado a um modelo de linguagem.`,
      role: 'assistant',
      createdAt: new Date().toISOString(),
    }
    conversations[idx].messages.push(assistantMessage)
    conversations[idx].updatedAt = new Date().toISOString()

    return delay({ ...assistantMessage })
  },
}
