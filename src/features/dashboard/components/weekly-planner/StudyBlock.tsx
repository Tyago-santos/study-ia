import { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { PlanBlock } from '@/shared/types'
import { formatDuration } from '@/features/dashboard/lib/duration'
import { BlockEditor } from './BlockEditor'

interface StudyBlockProps {
  block: PlanBlock
  dayIndex: number
  index: number
}

export function StudyBlock({ block, dayIndex, index }: StudyBlockProps) {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <div className="relative group">
      <Draggable draggableId={`block-${block.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={(e) => {
              e.stopPropagation()
              setShowEditor((v) => !v)
            }}
            className={cn(
              'relative rounded-lg border transition-all duration-200 cursor-pointer overflow-hidden',
              'bg-[var(--card-bg)] hover:shadow-md hover:-translate-y-px',
              snapshot.isDragging && 'shadow-xl scale-[1.02] rotate-1',
              showEditor && 'ring-2 ring-primary-500/40'
            )}
            style={{
              ...provided.draggableProps.style,
              borderColor: `${block.subjectColor}35`,
              backgroundImage: `linear-gradient(135deg, ${block.subjectColor}12, transparent 60%)`,
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ backgroundColor: block.subjectColor }}
            />

            <div className="relative flex items-center gap-1.5 pl-3 pr-2 py-2">
              <div
                {...provided.dragHandleProps}
                className="flex items-center justify-center w-5 h-5 rounded cursor-grab active:cursor-grabbing hover:bg-[var(--bg-secondary)] shrink-0 transition-colors opacity-0 group-hover:opacity-100"
              >
                <GripVertical className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              </div>

              <span className="flex-1 min-w-0 truncate">
                <span className="text-xs font-semibold text-[var(--text)] block truncate">
                  {block.subjectName}
                </span>
                {block.topicName && (
                  <span className="text-[10px] text-[var(--text-secondary)] block truncate">
                    {block.topicName}
                  </span>
                )}
              </span>

              <span
                className="text-[10px] font-bold whitespace-nowrap tabular-nums px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${block.subjectColor}18`,
                  color: block.subjectColor,
                }}
              >
                {formatDuration(block.duration)}
              </span>
            </div>
          </div>
        )}
      </Draggable>

      {showEditor && (
        <BlockEditor block={block} dayIndex={dayIndex} onClose={() => setShowEditor(false)} />
      )}
    </div>
  )
}
