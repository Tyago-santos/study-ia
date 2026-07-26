import { useCallback } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { CalendarDays, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'
import { useSubjects } from '@/features/library/hooks/useSubjects'
import { DAY_LABELS, formatDuration } from '@/features/dashboard/lib/duration'
import { useWeeklyPlannerStore } from '@/features/dashboard/store/weeklyPlanner.store'
import { DayColumn } from './DayColumn'
import { SubjectPalette } from './SubjectPalette'

const TODAY_INDEX = new Date().getDay()

export function WeeklyPlanner() {
  const { days, addBlock, moveBlock } = useWeeklyPlannerStore()
  const { data: subjects } = useSubjects()

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result
      if (!destination) return

      if (source.droppableId === 'subjects') {
        const subjectId = draggableId.replace('subject-', '')
        const subject = subjects?.find((s) => s.id === subjectId)
        if (!subject) return

        const destDay = parseInt(destination.droppableId.replace('day-', ''))

        addBlock(destDay, {
          id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectColor: subject.color,
          duration: 60,
        })
        return
      }

      const sourceDay = parseInt(source.droppableId.replace('day-', ''))
      const destDay = parseInt(destination.droppableId.replace('day-', ''))

      moveBlock(sourceDay, destDay, source.index, destination.index)
    },
    [addBlock, moveBlock, subjects]
  )

  const totalWeeklyMinutes = days.reduce(
    (acc, day) => acc + day.blocks.reduce((sum, b) => sum + b.duration, 0),
    0
  )

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-cyan-500/5 to-transparent pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 shadow-lg shadow-primary-500/25">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>Planejamento Semanal</CardTitle>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Arraste as matérias para montar sua rotina
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-xs font-bold bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent">
              {formatDuration(totalWeeklyMinutes)}
            </span>
            <span className="text-[10px] text-[var(--text-secondary)]">esta semana</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <DragDropContext onDragEnd={handleDragEnd}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            Matérias
          </p>

          <SubjectPalette subjects={subjects ?? []} />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {DAY_LABELS.map((name, index) => (
              <DayColumn
                key={name}
                dayName={name}
                dayIndex={index}
                isToday={index === TODAY_INDEX}
              />
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}
