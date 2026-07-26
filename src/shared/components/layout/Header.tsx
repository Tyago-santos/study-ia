import { Moon, Sun, BookOpen, Bell, Search, Menu } from 'lucide-react'
import { Button } from '@/shared/components/ui'
import { useThemeStore } from '@/shared/store/theme'
import type { Theme } from '@/shared/types'
import { PomodoroWidget } from '@/features/pomodoro/components/PomodoroWidget'

interface HeaderProps {
  onMenuClick?: () => void
  immersive?: boolean
}

export function Header({ onMenuClick, immersive }: HeaderProps) {
  const { theme, setTheme } = useThemeStore()

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'reading']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-[18px] h-[18px]" />
      case 'reading':
        return <BookOpen className="w-[18px] h-[18px]" />
      default:
        return <Sun className="w-[18px] h-[18px]" />
    }
  }

  if (immersive) {
    return (
      <header className="relative z-30 flex items-center gap-3 px-4 py-3 border-b border-[var(--glass-border)] backdrop-blur-xl bg-[var(--glass-bg)] lg:hidden">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text)]"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        <span className="text-sm font-bold text-[var(--text)] flex-1">StudyHub AI</span>
        <PomodoroWidget compact />
      </header>
    )
  }

  return (
    <header className="relative z-30 flex items-center justify-between gap-3 px-3 sm:px-6 py-3 border-b border-[var(--glass-border)] backdrop-blur-xl bg-[var(--glass-bg)]">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-md">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text)] lg:hidden"
        >
          <Menu className="w-[18px] h-[18px]" />
        </button>
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <PomodoroWidget />

        <Button variant="ghost" size="sm" className="relative rounded-xl" title="Notificacoes">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[var(--bg)]" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={cycleTheme}
          className="rounded-xl"
          title={`Tema: ${theme}`}
        >
          {getThemeIcon()}
        </Button>

        <div className="ml-2 flex items-center gap-2.5 pl-3 border-l border-[var(--border)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-500/20">
            TA
          </div>
        </div>
      </div>
    </header>
  )
}
