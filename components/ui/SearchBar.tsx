// components/ui/SearchBar.tsx

"use client";
import { Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string; // Por si quieres sobrescribir estilos desde fuera
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}: SearchBarProps) => {
  const { isDarkMode: isDark } = useTheme();

  return (
    /* He quitado el 'hidden' para que tú decidas dónde mostrarlo con la prop className */
    <div
      className={`flex items-center rounded-lg px-3 py-1.5 border transition-all group ${
        isDark
          ? "bg-slate-800/30 border-slate-700/30 focus-within:border-blue-500/50"
          : "bg-slate-100 border-slate-200 focus-within:border-blue-500"
      } ${className}`}
    >
      <Search
        className={`w-3.5 h-3.5 mr-2 transition-colors ${
          isDark ? "text-slate-500" : "text-slate-400"
        } group-focus-within:text-blue-500`}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-transparent text-xs outline-none w-full ${
          isDark
            ? "text-white placeholder-slate-600"
            : "text-slate-900 placeholder-slate-400"
        }`}
      />
    </div>
  );
};
