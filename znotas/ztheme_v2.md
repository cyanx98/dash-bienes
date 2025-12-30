"use client"

import { useState } from 'react'
import { 
  Menu, X, Home, Users, LogOut, BarChart3, 
  Settings, Bell, Search, ChevronDown, 
  TrendingUp, Activity, Shield, LayoutDashboard 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      
      {/* OVERLAY PARA MÓVIL */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 z-[70] h-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="flex flex-col h-full w-full">
          
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800/50 shrink-0 overflow-hidden">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 lg:opacity-0'}`}>
                <h1 className="text-lg font-bold text-white whitespace-nowrap">AdminPro</h1>
                <p className="text-xs text-slate-400">Panel v2.0</p>
              </div>
            </div>
          </div>

          {/* Menú con Tooltips corregidos */}
          <nav className="flex-1 p-4 space-y-2 mt-4">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative z-10 ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${sidebarOpen ? 'mr-3' : 'lg:mx-auto group-hover:scale-110'}`} />
                  <div className={`transition-all duration-300 overflow-hidden ${sidebarOpen ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
                    <span className="font-medium whitespace-nowrap ml-1">{item.label}</span>
                  </div>
                </button>

                {!sidebarOpen && (
                  <div className="absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] border border-slate-700 pointer-events-none">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-800/50 space-y-2 mb-4">
            <div className={`flex items-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all duration-300 ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-blue-500/30">
                <span className="text-sm font-bold text-white">{user.email[0].toUpperCase()}</span>
              </div>
              <div className={`transition-all duration-300 overflow-hidden ${sidebarOpen ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
                <p className="text-sm font-medium text-white truncate whitespace-nowrap">{user.name}</p>
                <p className="text-xs text-slate-400 truncate whitespace-nowrap">{user.email}</p>
              </div>
            </div>
            
            <div className="relative group">
              <button className={`w-full flex items-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/30 ${sidebarOpen ? 'px-4 py-3 space-x-3' : 'py-3 justify-center'}`}>
                <LogOut className="w-5 h-5 shrink-0" />
                <div className={`transition-all duration-300 overflow-hidden ${sidebarOpen ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
                  <span className="font-medium whitespace-nowrap">Cerrar Sesión</span>
                </div>
              </button>
              {!sidebarOpen && (
                <div className="absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-red-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                  Salir
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        
        {/* HEADER CON BUSCADOR */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 h-20 flex items-center px-4 sm:px-8 justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-2 rounded-xl transition-all">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden sm:block text-left">
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-slate-400">Bienvenido, {user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* BUSCADOR REINSTALADO */}
            <div className="hidden md:flex items-center bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700/50 focus-within:border-blue-500/50 transition-colors">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Buscar..." className="bg-transparent text-white text-sm outline-none w-48 placeholder-slate-500" />
            </div>

            {/* NOTIFICACIONES */}
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* AVATAR MÓVIL */}
            <button className="sm:hidden w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-blue-500/30">
              <span className="text-sm font-bold text-white">{user.email[0].toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* MAIN VIEW */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</h3>
                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">¡Bienvenido de vuelta! 👋</h2>
                  <p className="text-blue-100 text-sm sm:text-base max-w-xl">
                    Tu sesión está protegida con Supabase Auth y Next.js 15. Gestiona tus datos con seguridad.
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-3 rounded-2xl font-semibold transition-all border border-white/20 flex items-center space-x-2">
                  <span>Explorar</span>
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Seguridad de la Cuenta</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">ID de Usuario</p>
                  <p className="text-slate-300 font-mono text-sm break-all">{user.id}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Estado</p>
                  <p className="text-green-400 text-sm font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Autenticado vía Supabase
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}