import { mockFlashcards } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { Flashcard } from '@/shared/types'

let flashcards = [...mockFlashcards]

export const flashcardsService = {
  getAll: async (params?: { subjectId?: string; page?: number; limit?: number }) => {
    let filtered = flashcards
    if (params?.subjectId) {
      filtered = filtered.filter((f) => f.subjectId === params.subjectId)
    }
    const limit = params?.limit ?? 20
    const page = params?.page ?? 1
    const start = (page - 1) * limit
    return delay({ flashcards: filtered.slice(start, start + limit), total: filtered.length })
  },

  create: async (data: {
    subjectId: string
    front: string
    back: string
    difficulty?: Flashcard['difficulty']
  }) => {
    const flashcard: Flashcard = {
      id: nextId('fc'),
      subjectId: data.subjectId,
      front: data.front,
      back: data.back,
      difficulty: data.difficulty ?? 'medium',
      nextReview: new Date().toISOString(),
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    }
    flashcards.push(flashcard)
    return delay({ ...flashcard })
  },

  delete: async (id: string) => {
    flashcards = flashcards.filter((f) => f.id !== id)
    return delay(undefined as void)
  },
}
