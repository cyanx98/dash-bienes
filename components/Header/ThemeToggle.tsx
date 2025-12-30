// app/dashboard/components/Header/ThemeToggle.tsx

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme()

  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-800/50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'} cursor-pointer`}
    >
      {isDarkMode ? (
        <Sun className="w-4.5 h-4.5" />
      ) : (
        <Moon className="w-4.5 h-4.5" />
      )}
    </button>
  )
}