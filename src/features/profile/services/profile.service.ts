import { mockUser } from '@/shared/mocks/data'
import { delay } from '@/shared/mocks/helpers'
import type { User } from '@/shared/types'

const STORAGE_KEY = 'studyhub-mock-user'

function getStoredUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export const profileService = {
  getProfile: async () => {
    return delay(getStoredUser() ?? { ...mockUser })
  },

  updateProfile: async (data: { name?: string; bio?: string; avatar?: string }) => {
    const current = getStoredUser() ?? { ...mockUser }
    const updated = { ...current, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return delay({ ...updated })
  },
}
