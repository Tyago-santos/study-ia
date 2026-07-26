import { mockUser } from '@/shared/mocks/data'
import { delay } from '@/shared/mocks/helpers'

const STORAGE_KEY = 'studyhub-mock-user'
const TOKEN_KEY = 'studyhub-token'
const MOCK_TOKEN = 'mock-token-123'

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const user = { ...mockUser, email: data.email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, MOCK_TOKEN)
    return delay({ user, token: MOCK_TOKEN })
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const user = { ...mockUser, name: data.name, email: data.email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY, MOCK_TOKEN)
    return delay({ user, token: MOCK_TOKEN })
  },
}
