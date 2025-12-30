"use client"

import { useTheme } from '@/context/ThemeContext'

interface PaginationInfoProps {
  startItem: number
  endItem: number
  totalCount: number
  itemsPerPage: number
  onItemsPerPageChange: (value: number) => void
  itemLabel?: string // "clientes", "productos", "ventas", etc.
  options?: number[] // Opciones del selector [10, 25, 50, 100]
}

export function PaginationInfo({ 
  startItem, 
  endItem, 
  totalCount, 
  itemsPerPage,
  onItemsPerPageChange,
  itemLabel = "elementos",
  options = [10, 25, 50, 100]
}: PaginationInfoProps) {
  const { isDarkMode: isDark } = useTheme()

  return (
    <div className="flex items-center justify-between text-sm">
      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
        Mostrando{' '}
        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {startItem}-{endItem}
        </span>
        {' '}de{' '}
        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {totalCount}
        </span>
        {' '}{itemLabel}
      </p>
      
      <div className="flex items-center gap-2">
        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          Mostrar:
        </span>
        <select 
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className={`px-3 py-1.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            isDark 
              ? 'bg-slate-800/40 border-slate-700 text-white' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}