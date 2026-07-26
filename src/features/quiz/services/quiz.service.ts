import { mockQuizzes } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { Quiz } from '@/shared/types'

const quizzes = [...mockQuizzes]

export const quizService = {
  getAll: async (params?: { subjectId?: string }) => {
    let filtered = quizzes
    if (params?.subjectId) {
      filtered = filtered.filter((q) => q.subjectId === params.subjectId)
    }
    return delay([...filtered])
  },

  create: async (data: {
    subjectId: string
    title: string
    questions: { question: string; options: string[]; correctAnswer: number }[]
  }) => {
    const quiz: Quiz = {
      id: nextId('q'),
      subjectId: data.subjectId,
      title: data.title,
      questions: data.questions.map((q) => ({
        id: nextId('qq'),
        ...q,
        userAnswer: undefined,
      })),
      createdAt: new Date().toISOString(),
    }
    quizzes.push(quiz)
    return delay({ ...quiz })
  },

  submit: async (id: string, data: { answers: Record<string, number> }) => {
    const idx = quizzes.findIndex((q) => q.id === id)
    if (idx === -1) throw new Error('Quiz not found')

    const quiz = quizzes[idx]
    let correct = 0
    const updatedQuestions = quiz.questions.map((q) => {
      const userAnswer = data.answers[q.id]
      if (userAnswer === q.correctAnswer) correct++
      return { ...q, userAnswer }
    })

    const percentage = Math.round((correct / quiz.questions.length) * 100)
    quizzes[idx] = {
      ...quiz,
      questions: updatedQuestions,
      score: percentage,
      completedAt: new Date().toISOString(),
    }

    return delay({
      score: correct,
      total: quiz.questions.length,
      percentage,
      quiz: { ...quizzes[idx] },
    })
  },

  generateWithAI: async (subjectId: string, topic?: string) => {
    const quiz: Quiz = {
      id: nextId('q'),
      subjectId,
      title: topic ? `Quiz: ${topic}` : 'Quiz Gerado por IA',
      questions: [
        {
          id: nextId('qq'),
          question: 'Pergunta gerada pela IA?',
          options: ['Opcao A', 'Opcao B', 'Opcao C', 'Opcao D'],
          correctAnswer: 0,
        },
      ],
      createdAt: new Date().toISOString(),
    }
    quizzes.push(quiz)
    return delay({ ...quiz })
  },
}
