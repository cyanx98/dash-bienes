"use client"
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext';
// 1. Importa tu cliente de Supabase
import { createClient } from "@/lib/supabase/client" 

interface ModalRegistroProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCliente: (cliente: any) => void;
}

export default function ModalRegistro({ isOpen, onClose, onAddCliente }: ModalRegistroProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [ciudad, setCiudad] = useState('')
  const { isDarkMode: isDark } = useTheme()
  
  // 2. Estado para el loading del botón
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 3. Inicializa el cliente
  const supabase = createClient()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  // 4. Modifica el handleSubmit para que sea async
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Envío a Supabase
      const { data, error } = await supabase
        .from('clientes')
        .insert([
          { 
            nombre: nombre, 
            email: email, 
            telefono: telefono, 
            ciudad: ciudad 
          }
        ])
        .select() // Esto nos devuelve el objeto creado (con su ID real)

      if (error) throw error;

      if (data) {
        // Actualizamos la tabla en el page.tsx con el dato real de la DB
        onAddCliente(data[0]); 
        
        // Limpiamos y cerramos
        setNombre(''); setEmail(''); setTelefono(''); setCiudad('');
        onClose();
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("Error al registrar cliente. Revisa las políticas RLS.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-slate-950/80' : 'bg-black/60'} backdrop-blur-sm animate-in fade-in duration-300`}
        onClick={onClose} 
      />

      <div className={`relative ${isDark ? 'bg-slate-900' : 'bg-white'} w-full max-w-lg rounded-3xl shadow-2xl border ${isDark ? 'border-slate-800' : 'border-slate-200'} p-8 
                      animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 ease-out`}>
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>Nuevo Cliente</h2>
            <p className={`${isDark ? 'text-slate-500' : 'text-slate-600'} text-sm mt-1`}>Ingresa los datos para el registro</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className={`p-2.5 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'} rounded-full transition-all active:scale-90`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className={`absolute -top-2.5 left-4 ${isDark ? 'bg-slate-900' : 'bg-white'} px-2 z-10`}>
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-600 group-focus-within:text-blue-600'} transition-colors`}>
                Nombre Completo
              </span>
            </div>
            <input 
              required
              disabled={isSubmitting}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full bg-transparent border ${isDark ? 'border-slate-800 text-white' : 'border-slate-300 text-slate-900'} rounded-2xl px-5 py-3 text-lg font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50`}
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative group">
              <div className={`absolute -top-2.5 left-4 ${isDark ? 'bg-slate-900' : 'bg-white'} px-2 z-10`}>
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-600 group-focus-within:text-blue-600'} transition-colors`}>
                  Email
                </span>
              </div>
              <input 
                required
                type="email"
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-transparent border ${isDark ? 'border-slate-800 text-white' : 'border-slate-300 text-slate-900'} rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-50`}
                placeholder="nombre@correo.com"
              />
            </div>

            <div className="relative group">
              <div className={`absolute -top-2.5 left-4 ${isDark ? 'bg-slate-900' : 'bg-white'} px-2 z-10`}>
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-600 group-focus-within:text-blue-600'} transition-colors`}>
                  Teléfono
                </span>
              </div>
              <input 
                required
                disabled={isSubmitting}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className={`w-full bg-transparent border ${isDark ? 'border-slate-800 text-white' : 'border-slate-300 text-slate-900'} rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-50`}
                placeholder="+51 999..."
              />
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute -top-2.5 left-4 ${isDark ? 'bg-slate-900' : 'bg-white'} px-2 z-10`}>
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-600 group-focus-within:text-blue-600'} transition-colors`}>
                Ciudad
              </span>
            </div>
            <input 
              required
              disabled={isSubmitting}
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className={`w-full bg-transparent border ${isDark ? 'border-slate-800 text-white' : 'border-slate-300 text-slate-900'} rounded-2xl px-5 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-50`}
              placeholder="Lima, Perú"
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] text-sm uppercase tracking-widest disabled:bg-blue-800 disabled:opacity-70"
            >
              {isSubmitting ? 'Registrando...' : 'Confirmar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}