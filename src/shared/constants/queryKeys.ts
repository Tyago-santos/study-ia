export const queryKeys = {
  subjects: {
    all: ['subjects'] as const,
    list: () => [...queryKeys.subjects.all, 'list'] as const,
  },

  topics: {
    all: ['topics'] as const,
    list: () => [...queryKeys.topics.all, 'list'] as const,
  },

  pomodoro: {
    all: ['pomodoro'] as const,
  },

  flashcards: {
    all: ['flashcards'] as const,
    list: () => [...queryKeys.flashcards.all, 'list'] as const,
    bySubject: (subjectId: string) => [...queryKeys.flashcards.all, 'subject', subjectId] as const,
  },

  quiz: {
    all: ['quiz'] as const,
    list: () => [...queryKeys.quiz.all, 'list'] as const,
  },

  summaries: {
    all: ['summaries'] as const,
    list: () => [...queryKeys.summaries.all, 'list'] as const,
  },

  schedule: {
    all: ['schedule'] as const,
    list: () => [...queryKeys.schedule.all, 'list'] as const,
  },

  ai: {
    all: ['ai'] as const,
    conversations: () => [...queryKeys.ai.all, 'conversations'] as const,
    messages: (conversationId: string) => [...queryKeys.ai.all, 'messages', conversationId] as const,
  },

  gamification: {
    all: ['gamification'] as const,
    profile: () => [...queryKeys.gamification.all, 'profile'] as const,
    achievements: () => [...queryKeys.gamification.all, 'achievements'] as const,
    missions: () => [...queryKeys.gamification.all, 'missions'] as const,
  },

  stats: {
    all: ['stats'] as const,
    dashboard: () => [...queryKeys.stats.all, 'dashboard'] as const,
    subjects: () => [...queryKeys.stats.all, 'subjects'] as const,
    contributions: () => [...queryKeys.stats.all, 'contributions'] as const,
    pomodoro: () => [...queryKeys.stats.all, 'pomodoro'] as const,
    quiz: () => [...queryKeys.stats.all, 'quiz'] as const,
    flashcards: () => [...queryKeys.stats.all, 'flashcards'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },

  settings: {
    all: ['settings'] as const,
  },
}
