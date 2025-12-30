// app/dashboard/layout.tsx

"use client"

import { useState } from 'react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import { Sidebar, Header } from '../../components'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  
  const { isDarkMode } = useTheme()
  
  // Esto debería venir de tu sesión real de Supabase
  const user = { 
    email: 'admin@example.com', 
    name: 'Admin User' 
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-600'} font-sans overflow-hidden`}>
      
      {/* OVERLAY MÓVIL */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[90] lg:hidden transition-opacity duration-500 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        subMenuOpen={subMenuOpen}
        setSubMenuOpen={setSubMenuOpen}
      />

      {/* CONTENIDO PRINCIPAL */}
      <div className={`relative flex flex-col h-screen transition-all duration-500 ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-18'}`}>
        
        {/* HEADER */}
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        {/* ÁREA DE CONTENIDO DINÁMICO */}
        <main className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ThemeProvider>
  )
}