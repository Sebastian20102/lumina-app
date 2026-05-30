'use client';

import { motion } from 'framer-motion';
import { Github, Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useToastStore } from '@/lib/toast-store';

export default function LoginPage() {
  const { addToast } = useToastStore();

  const handleSocialAuth = (provider: string) => {
    addToast(`Conectando con ${provider}...`, 'info');
  };

  const handleForgotPassword = () => {
    addToast('Enlace de recuperación enviado a tu correo', 'success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-subtext hover:text-text transition-colors group">
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        Volver al inicio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 space-y-8 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
            <span className="font-bold text-white text-2xl">M</span>
          </div>
          <h1 className="text-3xl font-black">Bienvenido de nuevo</h1>
          <p className="text-subtext">Continúa tu viaje hacia la maestría del código.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleSocialAuth('GitHub')}
            className="w-full py-4 rounded-xl bg-card border border-border flex items-center justify-center gap-3 font-bold hover:bg-card/60 transition-all group"
          >
            <Github size={20} />
            Continuar con GitHub
          </button>
          <button 
            onClick={() => handleSocialAuth('Google')}
            className="w-full py-4 rounded-xl bg-card border border-border flex items-center justify-center gap-3 font-bold hover:bg-card/60 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continuar con Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-subtext font-bold">o usa tu correo</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-subtext ml-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" size={18} />
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-accent outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-subtext">Contraseña</label>
              <button 
                onClick={handleForgotPassword}
                className="text-xs text-accent hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-accent outline-none transition-all"
              />
            </div>
          </div>
          <Link href="/dashboard">
            <button className="w-full py-4 rounded-xl premium-gradient text-white font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2">
              Iniciar Sesión
              <ArrowRight size={20} />
            </button>
          </Link>
        </form>

        <p className="text-center text-subtext text-sm">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-accent font-bold hover:underline">Regístrate gratis</Link>
        </p>
      </motion.div>
    </div>
  );
}
