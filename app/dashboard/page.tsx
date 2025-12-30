"use client"

import { Users, Activity, TrendingUp, Shield } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const StatCard = ({ label, value, change, icon: Icon, color, isDark }: any) => (
  <div className={`${isDark ? 'bg-slate-800/20' : 'bg-white'} rounded-xl p-6 border ${isDark ? 'border-slate-800/40' : 'border-slate-200'} shadow-sm hover:border-slate-700/50 transition-all`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-xs font-bold ${isDark ? 'text-slate-500 bg-slate-800/60' : 'text-slate-600 bg-slate-100'} px-2 py-0.5 rounded uppercase tracking-tighter`}>
        {change}
      </span>
    </div>
    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'} mb-0.5 tracking-tight`}>{value}</h3>
    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'} font-medium tracking-tight`}>{label}</p>
  </div>
)

export default function DashboardPage() {
  const { isDarkMode: isDark } = useTheme()

  const stats = [
    { label: 'Usuarios Activos', value: '2,543', change: '+12.5%', icon: Users, color: 'text-blue-400 bg-blue-400/10' },
    { label: 'Total Sesiones', value: '8,234', change: '+8.2%', icon: Activity, color: 'text-purple-400 bg-purple-400/10' },
    { label: 'Tasa de Éxito', value: '98.3%', change: '+2.1%', icon: TrendingUp, color: 'text-green-400 bg-green-400/10' },
    { label: 'Seguridad', value: 'Alta', change: 'Óptima', icon: Shield, color: 'text-orange-400 bg-orange-400/10' }
  ]

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* SECCIÓN DE CARDS (Estadísticas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* SECCIÓN DE GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`h-75 ${isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'} border rounded-2xl flex items-center justify-center p-6`}>
             <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-xs italic`}>// Aquí puedes insertar un gráfico de área (ej: Chart.js o Recharts)</p>
          </div>
          <div className={`h-75 ${isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'} border rounded-2xl flex items-center justify-center p-6`}>
             <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-xs italic`}>// Aquí puedes insertar un gráfico de barras o dona</p>
          </div>
        </div>

        {/* TABLAS O ÚLTIMOS MOVIMIENTOS */}
        <div className={`${isDark ? 'bg-slate-800/20 border-slate-800/40' : 'bg-white border-slate-200'} border rounded-2xl p-6`}>
           <h2 className={`${isDark ? 'text-white' : 'text-slate-900'} text-sm font-medium mb-4`}>Últimos Usuarios Registrados</h2>
           <div className="space-y-4">
              <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-xs italic`}>// Aquí va tu componente de tabla o lista filtrable</p>
           </div>
        </div>

      </div>
    </div>
  )
}