"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [checking, setChecking] = useState(true);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push("/dashboard");
      else setChecking(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (checking) return (
  //   <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
  //     <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
  //   </div>
  // );

  // USAS EL COMPONENTE AQUÍ
  if (checking) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-6 font-sans">
      
      <div className="w-full max-w-[440px] bg-[#0f172a]/40 border border-slate-800 rounded-[32px] p-8 sm:p-12 shadow-2xl shadow-black/40 backdrop-blur-sm">
        
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-white to-slate-200 flex items-center justify-center rounded-2xl shadow-lg shadow-white/5 rotate-3">
            <Lock className="w-7 h-7 text-black" strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="text-slate-400 text-sm font-medium opacity-80">
            Panel Administrativo TailAdmin
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          
          {/* INPUT EMAIL CON FIX DE TEXTO BLANCO EN AUTOFILL */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-transparent border border-slate-700 text-white px-4 py-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-transparent text-[15px]
              [&:-webkit-autofill]:shadow-[0_0_0_1000px_#0c1324_inset] 
              [&:-webkit-autofill]:[-webkit-text-fill-color:white]" 
            />
            <label 
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm transition-all duration-200 pointer-events-none 
              peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-500 peer-focus:bg-[#0c1324] peer-focus:px-2 
              peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:bg-[#0c1324] peer-[:not(:placeholder-shown)]:px-2"
            >
              Correo electrónico
            </label>
          </div>

          {/* INPUT PASSWORD CON FIX DE TEXTO BLANCO EN AUTOFILL */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full bg-transparent border border-slate-700 text-white px-4 py-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder-transparent text-[15px] 
              [&:-webkit-autofill]:shadow-[0_0_0_1000px_#0c1324_inset] 
              [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
            <label 
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm transition-all duration-200 pointer-events-none 
              peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-blue-500 peer-focus:bg-[#0c1324] peer-focus:px-2 
              peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:bg-[#0c1324] peer-[:not(:placeholder-shown)]:px-2"
            >
              Contraseña
            </label>
            
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-xs text-center font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100 text-[#020617] font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="text-sm">{isSignUp ? "Registrar ahora" : "Entrar al panel"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            className="text-[13px] text-slate-400 hover:text-white transition-colors font-medium border-b border-slate-700 pb-0.5"
          >
            {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
          </button>
        </div>
      </div>
    </div>
  );
}