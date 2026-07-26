import type { CSSProperties } from 'react'

export const CHART_COLORS = [
  '#00ff00',
  '#00cc00',
  '#009900',
  '#4ade80',
  '#22c55e',
  '#16a34a',
  '#15803d',
]

export const CHART_TOOLTIP_STYLE: CSSProperties = {
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}
