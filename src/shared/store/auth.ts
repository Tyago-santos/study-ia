import { create } from 'zustand'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('studyhub-token'),
  isAuthenticated: !!localStorage.getItem('studyhub-token'),

  login: (user, token) => {
    localStorage.setItem('studyhub-token', token)
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('studyhub-token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  setUser: (user) => {
    set({ user })
  },
}))
