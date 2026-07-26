import { Draggable, Droppable } from '@hello-pangea/dnd'
import { getSubjectIcon } from '@/shared/constants/subjectIcons'
import { cn } from '@/shared/lib/utils'
import type { Subject } from '@/shared/types'

interface SubjectPaletteProps {
  subjects: Subject[]
}

export function SubjectPalette({ subjects }: SubjectPaletteProps) {
  return (
    <Droppable droppableId="subjects" direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={cn(
            'flex flex-wrap gap-2 p-3 mb-5 rounded-xl border-2 border-dashed transition-colors',
            'bg-[var(--bg-secondary)] border-[var(--glass-border)]',
            snapshot.isDraggingOver && 'border-primary-500 bg-primary-500/10'
          )}
        >
          {subjects.length === 0 && !snapshot.isDraggingOver && (
            <p className="text-xs text-[var(--text-secondary)] px-1 py-1.5">
              Crie matérias na Biblioteca para vê-las aqui.
            </p>
          )}
          {subjects.map((subject, index) => {
            const Icon = getSubjectIcon(subject.icon)
            return (
              <Draggable key={subject.id} draggableId={`subject-${subject.id}`} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className={cn(
                      'flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing transition-all select-none',
                      'hover:-translate-y-0.5 hover:shadow-md',
                      dragSnapshot.isDragging && 'shadow-lg scale-105 rotate-2'
                    )}
                    style={{
                      ...dragProvided.draggableProps.style,
                      backgroundColor: subject.color + '14',
                      color: subject.color,
                      border: `1px solid ${subject.color}30`,
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                      style={{ backgroundColor: subject.color + '22' }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: subject.color }} />
                    </div>
                    {subject.name}
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
