import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'

interface QuizPerformanceCardProps {
  average: number
  total: number
  bestStreak: number
}

export function QuizPerformanceCard({ average, total, bestStreak }: QuizPerformanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho nos quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-500">{average}%</p>
            <p className="text-sm text-[var(--text-secondary)]">Média de acerto</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-success-500">{total}</p>
            <p className="text-sm text-[var(--text-secondary)]">Quizzes realizados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-warning-500">{bestStreak}</p>
            <p className="text-sm text-[var(--text-secondary)]">Melhor sequência</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
