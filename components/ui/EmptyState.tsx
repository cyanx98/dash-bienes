    "use client"

import { Search, LucideIcon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface EmptyStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  colSpan?: number
}

export function EmptyState({ 
  icon: Icon = Search, 
  title = "No se encontraron resultados",
  description = "Intenta con otros términos de búsqueda",
  colSpan = 4
}: EmptyStateProps) {
  const { isDarkMode: isDark } = useTheme()

  return (
    <tr>
      <td colSpan={colSpan} className="py-20">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDark ? 'bg-slate-800/50' : 'bg-slate-100'
          }`}>
            <Icon className={`w-8 h-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
          </div>
          <div className="text-center">
            <p className={`font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{title}</p>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </td>
    </tr>
  )
}