"use client"

import { UserCircle, Mail, Phone, Calendar, Eye } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { formatInTimeZone } from 'date-fns-tz'

interface ClientTableRowProps {
  cliente: any
  onViewDetails?: (id: string) => void
}

export function ClientTableRow({ cliente, onViewDetails }: ClientTableRowProps) {
  const { isDarkMode: isDark } = useTheme()
  const fechaRegistro = formatInTimeZone(
  cliente.created_at,
  'America/Lima',
  'dd/MM/yyyy'
)


  return (
    <tr className={`transition-all group ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {cliente.nombre.charAt(0)}
          </div>
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {cliente.nombre}
            </p>
            <p className={`text-xs flex items-center gap-1 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Calendar className="w-3 h-3" />
              {/* {new Date(cliente.fecha_registro).toLocaleDateString('es-ES')} */}
              {/* {fechaRegistro} */}
              {cliente.fecha_registro}

            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <Mail className="w-4 h-4" />
          {cliente.email}
        </div>
      </td>
      <td className="px-8 py-5">
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <Phone className="w-4 h-4" />
          {cliente.telefono}
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => onViewDetails?.(cliente.id)}
            className={`p-2 rounded-lg transition-all group-hover:scale-105 ${
              isDark 
                ? 'bg-slate-800/50 hover:bg-blue-600 text-slate-400 hover:text-white' 
                : 'bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}