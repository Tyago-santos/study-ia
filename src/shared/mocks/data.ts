import type {
  User,
  Subject,
  Topic,
  StudySession,
  Flashcard,
  Quiz,
  Summary,
  Conversation,
  DailyStats,
  SubjectStats,
  ScheduleEvent,
  Activity,
} from '@/shared/types'

export const mockUser: User = {
  id: 'u1',
  name: 'Tiago Almeida',
  email: 'tiago@example.com',
  bio: 'Estudante de Engenharia',
  avatar: '',
  createdAt: '2025-01-15T10:00:00Z',
}

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'Calculo I', color: '#00ff00', icon: 'Calculator', createdAt: '2025-01-15T10:00:00Z' },
  { id: 's2', name: 'Fisica', color: '#f59e0b', icon: 'Atom', createdAt: '2025-01-15T10:00:00Z' },
  { id: 's3', name: 'Programacao', color: '#10b981', icon: 'Code', createdAt: '2025-01-20T10:00:00Z' },
  { id: 's4', name: 'Quimica', color: '#ef4444', icon: 'FlaskConical', createdAt: '2025-02-01T10:00:00Z' },
  { id: 's5', name: 'Historia', color: '#00cc00', icon: 'BookOpen', createdAt: '2025-02-10T10:00:00Z' },
]

export const mockTopics: Topic[] = [
  { id: 't1', subjectId: 's1', name: 'Limites e continuidade', completed: true, createdAt: '2025-01-16T10:00:00Z' },
  { id: 't2', subjectId: 's1', name: 'Regras de derivacao', completed: true, createdAt: '2025-01-16T10:00:00Z' },
  { id: 't3', subjectId: 's1', name: 'Integrais definidas', completed: false, createdAt: '2025-01-20T10:00:00Z' },
  { id: 't4', subjectId: 's2', name: 'Leis de Newton', completed: true, createdAt: '2025-01-16T10:00:00Z' },
  { id: 't5', subjectId: 's2', name: 'Cinematica', completed: false, createdAt: '2025-01-18T10:00:00Z' },
  { id: 't6', subjectId: 's3', name: 'Estruturas de dados', completed: false, createdAt: '2025-01-21T10:00:00Z' },
  { id: 't7', subjectId: 's3', name: 'Promises e async/await', completed: true, createdAt: '2025-01-22T10:00:00Z' },
  { id: 't8', subjectId: 's4', name: 'Estequiometria', completed: false, createdAt: '2025-02-02T10:00:00Z' },
  { id: 't9', subjectId: 's5', name: 'Revolucao Industrial', completed: false, createdAt: '2025-02-11T10:00:00Z' },
]

export const mockSessions: StudySession[] = [
  { id: 'ss1', subjectId: 's1', duration: 25, startedAt: '2025-07-26T08:00:00Z', completedAt: '2025-07-26T08:25:00Z', type: 'pomodoro' },
  { id: 'ss2', subjectId: 's3', duration: 50, startedAt: '2025-07-26T06:00:00Z', completedAt: '2025-07-26T06:50:00Z', type: 'pomodoro' },
  { id: 'ss3', subjectId: 's2', duration: 30, startedAt: '2025-07-25T14:00:00Z', completedAt: '2025-07-25T14:30:00Z', type: 'free' },
  { id: 'ss4', subjectId: 's1', duration: 25, startedAt: '2025-07-25T10:00:00Z', completedAt: '2025-07-25T10:25:00Z', type: 'pomodoro' },
  { id: 'ss5', subjectId: 's4', duration: 45, startedAt: '2025-07-24T16:00:00Z', completedAt: '2025-07-24T16:45:00Z', type: 'pomodoro' },
]

export const mockFlashcards: Flashcard[] = [
  {
    id: 'fc1', subjectId: 's1', front: 'O que e derivada?',
    back: 'A derivada de uma funcao representa a taxa de variacao instantanea da funcao em relacao a sua variavel.',
    difficulty: 'medium', nextReview: '2025-07-26T00:00:00Z', reviewCount: 3, createdAt: '2025-03-01T10:00:00Z',
  },
  {
    id: 'fc2', subjectId: 's1', front: 'Regra do produto',
    back: "(f*g)' = f'*g + f*g'",
    difficulty: 'easy', nextReview: '2025-07-26T00:00:00Z', reviewCount: 5, createdAt: '2025-03-01T10:00:00Z',
  },
  {
    id: 'fc3', subjectId: 's2', front: 'Primeira lei de Newton',
    back: 'Um corpo em repouso ou movimento retinlineo uniforme permanece nesse estado, a menos que uma fuerca externa atue sobre ele.',
    difficulty: 'medium', nextReview: '2025-07-26T00:00:00Z', reviewCount: 2, createdAt: '2025-03-05T10:00:00Z',
  },
  {
    id: 'fc4', subjectId: 's3', front: 'O que e uma Promise em JS?',
    back: 'Um objeto que representa a eventual conclusao (ou falha) de uma operacao assincrona.',
    difficulty: 'hard', nextReview: '2025-07-26T00:00:00Z', reviewCount: 1, createdAt: '2025-03-10T10:00:00Z',
  },
  {
    id: 'fc5', subjectId: 's4', front: 'O que e mol?',
    back: 'A unidade de medida que representa aproximadamente 6,022x10^23 entidades.',
    difficulty: 'easy', nextReview: '2025-07-26T00:00:00Z', reviewCount: 4, createdAt: '2025-03-15T10:00:00Z',
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1', subjectId: 's1', title: 'Derivadas - Basico', score: 80, completedAt: '2025-07-23T10:00:00Z',
    questions: [
      { id: 'qq1', question: 'Qual a derivada de x^2?', options: ['2x', 'x', '2x^2', 'x^3'], correctAnswer: 0, userAnswer: 0 },
      { id: 'qq2', question: 'Qual a derivada de sen(x)?', options: ['cos(x)', '-cos(x)', '-sen(x)', 'tan(x)'], correctAnswer: 0, userAnswer: 2 },
    ],
    createdAt: '2025-07-23T10:00:00Z',
  },
  {
    id: 'q2', subjectId: 's3', title: 'JavaScript Basico',
    questions: [
      { id: 'qq3', question: 'O que e "hoisting"?', options: ['Elevacao de declaracoes', 'Um tipo de loop', 'Uma funcao nativa', 'Um operador'], correctAnswer: 0 },
      { id: 'qq4', question: 'typeof null retorna?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctAnswer: 2 },
    ],
    createdAt: '2025-07-25T10:00:00Z',
  },
]

export const mockSummaries: Summary[] = [
  {
    id: 'r1', subjectId: 's1', title: 'Derivadas e Integrais',
    content: 'Derivada e a taxa de variacao de uma funcao. Regras principais: regra do produto, quociente e cadeia. Integrais sao operacoes inversas das derivadas.',
    sourceType: 'text', createdAt: '2025-07-21T10:00:00Z',
  },
  {
    id: 'r2', subjectId: 's2', title: 'Leis de Newton',
    content: 'As tres leis do movimento de Newton descrevem a relacao entre fuercas e movimento dos corpos.',
    sourceType: 'text', createdAt: '2025-07-24T10:00:00Z',
  },
]

export const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: 'ev1', title: 'Prova de Calculo I', type: 'prova', subjectId: 's1',
    date: '2025-07-29T13:00:00Z', description: 'Limites, derivadas e integrais definidas.',
    completed: false, createdAt: '2025-07-15T10:00:00Z',
  },
  {
    id: 'ev2', title: 'Revisar Leis de Newton', type: 'estudo', subjectId: 's2',
    date: '2025-07-27T18:00:00Z', description: 'Revisao geral antes da prova.',
    completed: false, createdAt: '2025-07-20T10:00:00Z',
  },
  {
    id: 'ev3', title: 'Entrega do trabalho de Programacao', type: 'trabalho', subjectId: 's3',
    date: '2025-08-02T23:59:00Z', description: 'Projeto final da disciplina.',
    completed: false, createdAt: '2025-07-18T10:00:00Z',
  },
  {
    id: 'ev4', title: 'Prova de Quimica', type: 'prova', subjectId: 's4',
    date: '2025-07-24T13:00:00Z', description: 'Estequiometria e ligacoes quimicas.',
    completed: true, createdAt: '2025-07-10T10:00:00Z',
  },
]

export const mockConversations: Conversation[] = [
  {
    id: 'c1', title: 'Explicacao de Derivadas', createdAt: '2025-07-23T10:00:00Z', updatedAt: '2025-07-23T10:00:00Z',
    messages: [
      { id: 'm1', content: 'O que e uma derivada?', role: 'user', createdAt: '2025-07-23T10:00:00Z' },
      { id: 'm2', content: 'Uma derivada representa a taxa de variacao instantanea de uma funcao.', role: 'assistant', createdAt: '2025-07-23T10:00:00Z' },
    ],
  },
]

export const mockDashboardStats = {
  todayMinutes: 75,
  weekMinutes: 320,
  monthMinutes: 1440,
  streak: 7,
  weeklyGoal: 600,
  weeklyGoalProgress: 53,
}

export const mockSubjectStats: SubjectStats[] = [
  { subjectId: 's1', subjectName: 'Calculo I', totalMinutes: 480, sessions: 18 },
  { subjectId: 's3', subjectName: 'Programacao', totalMinutes: 360, sessions: 14 },
  { subjectId: 's2', subjectName: 'Fisica', totalMinutes: 240, sessions: 9 },
  { subjectId: 's4', subjectName: 'Quimica', totalMinutes: 180, sessions: 7 },
]

export const mockWeeklyStats: { days: DailyStats[] } = {
  days: [
    { date: '2025-07-20', minutes: 45, pomodoros: 2 },
    { date: '2025-07-21', minutes: 120, pomodoros: 4 },
    { date: '2025-07-22', minutes: 80, pomodoros: 3 },
    { date: '2025-07-23', minutes: 60, pomodoros: 2 },
    { date: '2025-07-24', minutes: 90, pomodoros: 3 },
    { date: '2025-07-25', minutes: 110, pomodoros: 4 },
    { date: '2025-07-26', minutes: 75, pomodoros: 3 },
  ],
}

export const mockMonthlyStats: { days: DailyStats[] } = {
  days: Array.from({ length: 30 }, (_, i) => ({
    date: `2025-06-${String(i + 1).padStart(2, '0')}`,
    minutes: Math.floor(Math.random() * 150) + 20,
    pomodoros: Math.floor(Math.random() * 6) + 1,
  })),
}

function generateYearlyActivity(endDate: string, days: number): DailyStats[] {
  const end = new Date(`${endDate}T00:00:00Z`)
  const result: DailyStats[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setUTCDate(d.getUTCDate() - i)
    const dateStr = d.toISOString().slice(0, 10)

    const seed = Array.from(dateStr).reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7)
    const rand = Math.abs(Math.sin(seed))
    const isWeekend = d.getUTCDay() === 0 || d.getUTCDay() === 6
    const skipped = rand < (isWeekend ? 0.45 : 0.25)
    const minutes = skipped ? 0 : Math.round(15 + rand * 135)
    const pomodoros = minutes === 0 ? 0 : Math.max(1, Math.round(minutes / 25))

    result.push({ date: dateStr, minutes, pomodoros })
  }

  return result
}

export const mockYearlyActivity: DailyStats[] = generateYearlyActivity('2025-07-26', 371)
  .map((day) => {
    const overlap = mockWeeklyStats.days.find((w) => w.date === day.date)
    return overlap ? { ...overlap } : day
  })

export const mockActivities: (Activity & { subjectId: string })[] = [
  { id: 'a1', type: 'pomodoro', title: 'Sessao de Calculo', description: '25 min - Calculo I', subjectId: 's1', createdAt: '2025-07-26T08:25:00Z' },
  { id: 'a2', type: 'quiz', title: 'Quiz JavaScript Basico', description: 'Score: 100%', subjectId: 's3', createdAt: '2025-07-25T10:00:00Z' },
  { id: 'a3', type: 'flashcard', title: 'Revisao de Flashcards', description: '5 flashcards revisados', subjectId: 's1', createdAt: '2025-07-24T17:00:00Z' },
  { id: 'a4', type: 'summary', title: 'Resumo: Leis de Newton', description: 'Resumo criado', subjectId: 's2', createdAt: '2025-07-24T14:00:00Z' },
  { id: 'a5', type: 'pomodoro', title: 'Sessao de Programacao', description: '50 min - Programacao', subjectId: 's3', createdAt: '2025-07-26T06:50:00Z' },
  { id: 'a6', type: 'quiz', title: 'Quiz Derivadas', description: 'Score: 80%', subjectId: 's1', createdAt: '2025-07-23T10:00:00Z' },
  { id: 'a7', type: 'flashcard', title: 'Novos Flashcards', description: '3 flashcards criados', subjectId: 's3', createdAt: '2025-07-22T09:00:00Z' },
  { id: 'a8', type: 'pomodoro', title: 'Sessao de Fisica', description: '30 min - Fisica', subjectId: 's2', createdAt: '2025-07-25T14:30:00Z' },
]

export const mockGamification = {
  profile: { level: 5, xp: 340, xpToNextLevel: 500, streak: 7 },
  achievements: [
    { id: 'ach1', name: 'Primeira Sessao', description: 'Complete sua primeira sessao de estudo', unlocked: true, unlockedAt: '2025-01-15T10:00:00Z' },
    { id: 'ach2', name: 'Sequencia de 3 dias', description: 'Estude por 3 dias seguidos', unlocked: true, unlockedAt: '2025-01-18T10:00:00Z' },
    { id: 'ach3', name: 'Sequencia de 7 dias', description: 'Estude por 7 dias seguidos', unlocked: true, unlockedAt: '2025-01-25T10:00:00Z' },
    { id: 'ach4', name: '100 flashcards', description: 'Reveja 100 flashcards', unlocked: false },
    { id: 'ach5', name: 'Mestre do Quiz', description: 'Acerte 10 quizzes com 100%', unlocked: false },
  ],
  missions: [
    { id: 'm1', name: 'Estudar 2h hoje', progress: 75, total: 120, xp: 50, completed: false },
    { id: 'm2', name: 'Completar 3 pomodoros', progress: 2, total: 3, xp: 30, completed: false },
    { id: 'm3', name: 'Revisar 10 flashcards', progress: 10, total: 10, xp: 25, completed: true },
  ],
}

export const mockSettings = {
  theme: 'light' as const,
  fontSize: 'medium' as const,
  language: 'pt-BR',
  notifications: true,
  pomodoro: { focus: 25, shortBreak: 5, longBreak: 15 },
}
