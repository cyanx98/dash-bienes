"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, isLoading, onPageChange }: PaginationProps) {
  const { isDarkMode: isDark } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {/* Primera página */}
      <button 
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(1)}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isDark 
            ? 'border-slate-700 hover:bg-slate-800 text-white' 
            : 'border-slate-300 hover:bg-slate-100 text-slate-700'
        }`}
        title="Primera página"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>
      
      {/* Anterior */}
      <button 
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isDark 
            ? 'border-slate-700 hover:bg-slate-800 text-white' 
            : 'border-slate-300 hover:bg-slate-100 text-slate-700'
        }`}
        title="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Input para ir a página */}
      <div className="flex items-center gap-2 px-4">
        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ir a:</span>
        <input 
          type="number" 
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value)
            if (page >= 1 && page <= totalPages) {
              onPageChange(page)
            }
          }}
          className={`w-16 px-2 py-1 rounded-lg border text-center outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            isDark 
              ? 'bg-slate-800/40 border-slate-700 text-white' 
              : 'bg-white border-slate-300 text-slate-900'
          }`}
        />
      </div>
      
      {/* Siguiente */}
      <button 
        disabled={currentPage === totalPages || isLoading || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isDark 
            ? 'border-slate-700 hover:bg-slate-800 text-white' 
            : 'border-slate-300 hover:bg-slate-100 text-slate-700'
        }`}
        title="Página siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Última página */}
      <button 
        disabled={currentPage === totalPages || isLoading || totalPages === 0}
        onClick={() => onPageChange(totalPages)}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isDark 
            ? 'border-slate-700 hover:bg-slate-800 text-white' 
            : 'border-slate-300 hover:bg-slate-100 text-slate-700'
        }`}
        title="Última página"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  )
}