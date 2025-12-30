"use client"

import { useTheme } from '@/context/ThemeContext'
import { ReactNode } from 'react'

interface FilterPanelProps {
  isOpen: boolean
  title?: string
  children: ReactNode
}

export function FilterPanel({ isOpen, title = "Filtros Avanzados", children }: FilterPanelProps) {
  const { isDarkMode: isDark } = useTheme()

  if (!isOpen) return null

  return (
    <div className={`rounded-xl p-6 space-y-4 border ${
      isDark 
        ? 'bg-slate-800/20 border-slate-800/40' 
        : 'bg-slate-50 border-slate-200'
    }`}>
      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      {children}
    </div>
  )
}