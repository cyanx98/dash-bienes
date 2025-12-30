"use client"

import { ArrowUpDown } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface ClientTableHeaderProps {
  sortField: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: 'nombre' | 'email') => void
}

export function ClientTableHeader({ sortField, sortOrder, onSort }: ClientTableHeaderProps) {
  const { isDarkMode: isDark } = useTheme()

  return (
    <thead className={`border-b text-xs font-semibold uppercase tracking-wider ${
      isDark 
        ? 'bg-slate-800/40 border-slate-700/50 text-slate-300' 
        : 'bg-slate-50 border-slate-200 text-slate-700'
    }`}>
      <tr>
        <th className="px-8 py-4">
          <button 
            onClick={() => onSort('nombre')}
            className={`flex items-center gap-2 transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            Cliente
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </th>
        <th className="px-8 py-4">
          <button 
            onClick={() => onSort('email')}
            className={`flex items-center gap-2 transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            Email
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </th>
        <th className="px-8 py-4">Teléfono</th>
        <th className="px-8 py-4 text-center">Acciones</th>
      </tr>
    </thead>
  )
}