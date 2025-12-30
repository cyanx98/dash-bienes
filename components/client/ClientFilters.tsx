"use client"

import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css" // Estilos base
import { useTheme } from '@/context/ThemeContext'
import { Calendar, XCircle } from 'lucide-react'

interface ClientFiltersProps {
  fechaDesde: string
  fechaHasta: string
  onFechaDesdeChange: (fecha: string) => void
  onFechaHastaChange: (fecha: string) => void
  onClearFilters: () => void
}

export function ClientFilters({ 
  fechaDesde, fechaHasta, onFechaDesdeChange, onFechaHastaChange, onClearFilters 
}: ClientFiltersProps) {
  const { isDarkMode: isDark } = useTheme()

  // Estilo personalizado para inyectar en el head (para controlar los días del calendario)
  const calendarTheme = `
    .react-datepicker {
      background-color: ${isDark ? '#1e293b' : '#ffffff'};
      border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
      font-family: inherit;
      border-radius: 12px;
      overflow: hidden;
    }
    .react-datepicker__header {
      background-color: ${isDark ? '#0f172a' : '#f8fafc'};
      border-bottom: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
    }
    .react-datepicker__current-month, .react-datepicker__day-name {
      color: ${isDark ? '#f1f5f9' : '#1e293b'} !important;
    }
    .react-datepicker__day {
      color: ${isDark ? '#94a3b8' : '#475569'};
    }
    .react-datepicker__day:hover {
      background-color: ${isDark ? '#334155' : '#f1f5f9'};
    }
    .react-datepicker__day--selected {
      background-color: #2563eb !important;
      color: white !important;
      border-radius: 8px;
    }
  `;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
      <style>{calendarTheme}</style>

      {/* FECHA DESDE */}
      <div className="space-y-2">
        <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Desde
        </label>
        <div className={`relative flex items-center rounded-xl border transition-all ${
          isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <Calendar className="absolute left-4 w-4 h-4 text-slate-500 z-10" />
          <DatePicker
            selected={fechaDesde ? new Date(fechaDesde) : null}
            onChange={(date: Date) => onFechaDesdeChange(date?.toISOString().split('T')[0] || '')}
            placeholderText="Seleccionar fecha"
            className="w-full bg-transparent pl-12 pr-4 py-3 outline-none text-sm"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* FECHA HASTA */}
      <div className="space-y-2">
        <label className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Hasta
        </label>
        <div className={`relative flex items-center rounded-xl border transition-all ${
          isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <Calendar className="absolute left-4 w-4 h-4 text-slate-500 z-10" />
          <DatePicker
            selected={fechaHasta ? new Date(fechaHasta) : null}
            onChange={(date: Date) => onFechaHastaChange(date?.toISOString().split('T')[0] || '')}
            placeholderText="Seleccionar fecha"
            className="w-full bg-transparent pl-12 pr-4 py-3 outline-none text-sm"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* BOTÓN LIMPIAR */}
      {(fechaDesde || fechaHasta) && (
        <button
          onClick={onClearFilters}
          className="flex items-center justify-center gap-2 h-[46px] px-6 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <XCircle className="w-4 h-4" />
          Limpiar
        </button>
      )}
    </div>
  )
}