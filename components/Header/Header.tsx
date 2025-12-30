// app/dashboard/components/Header/Header.tsx

import { Menu, Bell } from 'lucide-react'
import { SearchBar, ThemeToggle, UserMenu } from '..'
import { useTheme } from '@/context/ThemeContext'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  user: {
    email: string
    name: string
  }
}

export const Header = ({ sidebarOpen, setSidebarOpen, user }: HeaderProps) => {
  const { isDarkMode } = useTheme()

  return (
    <header className={`relative z-[80] h-16 ${isDarkMode ? 'bg-slate-900/40' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800/30' : 'border-slate-200'} flex items-center px-6 justify-between shrink-0`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className={`p-2 -ml-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} rounded-lg transition-all cursor-pointer`}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <SearchBar value={''} onChange={function (value: string): void {
          throw new Error('Function not implemented.')
        } } />
      </div>
      
      <div className="flex items-center space-x-5">
        <ThemeToggle />

        <div className="relative cursor-pointer group">
          <Bell className={`w-4 h-4 ${isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'} transition-colors`} />
          <span className={`absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full border-2 ${isDarkMode ? 'border-slate-950' : 'border-white'}`}></span>
        </div>

        <UserMenu user={user} />
      </div>
    </header>
  )
}