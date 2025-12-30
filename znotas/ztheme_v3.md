"use client"

import { useState } from 'react'
import { 
  Menu, X, Home, Users, LogOut, BarChart3, 
  Settings, Bell, Search, ChevronDown, 
  TrendingUp, Activity, Shield 
} from 'lucide-react'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const user = {
    email: 'admin@example.com',
    id: 'abc123-def456-ghi789',
    name: 'Admin User'
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Usuarios', active: false },
    { icon: BarChart3, label: 'Analíticas', active: false },
    { icon: Settings, label: 'Configuración', active: false }
  ]

  const stats = [
    { label: 'Usuarios Activos', value: '2,543', change: '+12.5%', trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Sesiones', value: '8,234', change: '+8.2%', trend: 'up', icon: Activity, color: 'from-purple-500 to-pink-500' },
    { label: 'Tasa de Éxito', value: '98.3%', change: '+2.1%', trend: 'up', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Seguridad', value: 'Alta', change: 'Óptima', trend: 'up', icon: Shield, color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 antialiased">
      
      {/* Estilo para ocultar scrollbar pero permitir scroll */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-500 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR CORREGIDO */}
      <aside className={`
        fixed top-0 left-0 z-[70] h-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50
        transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] will-change-transform
        ${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="flex flex-col h-full w-full">
          
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800/50 shrink-0 overflow-hidden">
            <div className="flex items-center space-x-3 transition-opacity duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div className={`transition-all duration-500 ${sidebarOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4 lg:hidden'}`}>
                <h1 className="text-lg font-bold text-white whitespace-nowrap">AdminPro</h1>
              </div>
            </div>
          </div>

          {/* Menú - Sin scroll visible */}
          <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${sidebarOpen ? 'mr-3' : 'lg:mx-auto group-hover:scale-110'}`} />
                  <div className={`transition-all duration-500 overflow-hidden ${sidebarOpen ? 'max-w-[200px] opacity-100 delay-200' : 'max-w-0 opacity-0'}`}>
                    <span className="font-medium whitespace-nowrap ml-1">{item.label}</span>
                  </div>
                </button>

                {/* Tooltip escritorio corregido */}
                {!sidebarOpen && (
                  <div className="absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible transition-all duration-200 z-[100] border border-slate-700 pointer-events-none shadow-2xl">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-800/50 space-y-2 mb-4 shrink-0">
            <div className={`flex items-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all duration-500 ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{user.email[0].toUpperCase()}</span>
              </div>
              <div className={`transition-all duration-500 overflow-hidden ${sidebarOpen ? 'max-w-[150px] opacity-100 delay-200' : 'max-w-0 opacity-0'}`}>
                <p className="text-sm font-medium text-white truncate whitespace-nowrap">{user.name}</p>
              </div>
            </div>
            
            <button className={`w-full flex items-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 ${sidebarOpen ? 'px-4 py-3 space-x-3' : 'py-3 justify-center'}`}>
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium whitespace-nowrap transition-all duration-500 opacity-100 delay-200">Salir</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`transition-[margin] duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 h-20 flex items-center px-4 sm:px-8 justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-xl transition-all"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700/50 focus-within:border-blue-500/50 transition-colors">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Buscar..." className="bg-transparent text-white text-sm outline-none w-48" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-600 sm:hidden flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700/50 transition-all duration-300 shadow-xl">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl mb-4 flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Welcome */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bienvenido de nuevo 👋</h2>
                <p className="text-blue-100 max-w-lg">Gestiona tu sistema con la máxima eficiencia y seguridad.</p>
               </div>
            </div>

            {/* Security */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Seguridad de la Cuenta</h3>
              </div>
              <p className="text-slate-400 text-sm font-mono bg-black/20 p-3 rounded-lg border border-white/5 break-all">
                ID: {user.id}
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}