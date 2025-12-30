"use client"
import { X, User, Mail, Phone, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCliente({ id: Date.now(), nombre, email, telefono, ciudad });
    setNombre(''); setEmail(''); setTelefono(''); setCiudad('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay oscuro con desenfoque profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Tarjeta del Formulario */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-[#0f172a] w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-800 p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Nuevo Cliente</h2>
                <p className="text-slate-500 text-sm mt-1">Ingresa los datos para el registro</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 rounded-full transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input: Nombre Completo */}
              <div className="relative group">
                <div className="absolute -top-2.5 left-4 bg-[#0f172a] px-2 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    Nombre Completo
                  </span>
                </div>
                <div className="flex items-center">
                  <input 
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-transparent border border-slate-800 rounded-2xl px-5 py-4 text-white text-lg font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="Ej. Soadun Fergranto"
                  />
                </div>
              </div>

              {/* Grid: Email y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute -top-2.5 left-4 bg-[#0f172a] px-2 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 group-focus-within:text-blue-500 transition-colors">
                      Email
                    </span>
                  </div>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 text-sm"
                    placeholder="nombre@correo.com"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute -top-2.5 left-4 bg-[#0f172a] px-2 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 group-focus-within:text-blue-500 transition-colors">
                      Teléfono
                    </span>
                  </div>
                  <input 
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full bg-transparent border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 text-sm"
                    placeholder="+51 999..."
                  />
                </div>
              </div>

              {/* Input: Ciudad */}
              <div className="relative group">
                <div className="absolute -top-2.5 left-4 bg-[#0f172a] px-2 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    Ciudad
                  </span>
                </div>
                <input 
                  required
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full bg-transparent border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 text-sm"
                  placeholder="Lima, Perú"
                />
              </div>

              {/* Botón Principal con efecto Glow */}
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full py-4.5 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
                >
                  Confirmar Registro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


<!-- FORMULARIO CON FRAMER MOTION -->