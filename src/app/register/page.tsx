'use client';

import { motion } from 'framer-motion';
import { Github, Mail, Lock, ArrowRight, ChevronLeft, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useToastStore } from '@/lib/toast-store';

export default function RegisterPage() {
  const { addToast } = useToastStore();

  const handleSocialAuth = (provider: string) => {
    addToast(`Conectando con ${provider}...`, 'info');
  };

  const handleLegal = (type: string) => {
    addToast(`Abriendo ${type}...`, 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-subtext hover:text-text transition-colors group">
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        Volver al inicio
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 space-y-8 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4">
            <Sparkles size={14} />
            ÚNETE A 10M+ DE ESTUDIANTES
          </div>
          <h1 className="text-3xl font-black">Crea tu cuenta</h1>
          <p className="text-subtext">Empieza a programar gratis hoy mismo.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSocialAuth('GitHub')}
            className="py-4 rounded-xl bg-card border border-border flex items-center justify-center gap-2 font-bold hover:bg-card/60 transition-all"
          >
            <Github size={20} />
            GitHub
          </button>
          <button 
            onClick={() => handleSocialAuth('Google')}
            className="py-4 rounded-xl bg-card border border-border flex items-center justify-center gap-2 font-bold hover:bg-card/60 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-subtext font-bold">o regístrate con correo</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-subtext ml-1">Nombre de usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" size={18} />
              <input 
                type="text" 
                placeholder="jonathan_dev"
                className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-accent outline-none transition-all"
              />
            </div>
          </div>
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
            <label className="text-sm font-bold text-subtext ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext" size={18} />
              <input 
                type="password" 
                placeholder="Crea una contraseña segura"
                className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:border-accent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-1 pt-2">
            <input type="checkbox" className="mt-1 accent-accent" id="terms" />
            <label htmlFor="terms" className="text-xs text-subtext leading-relaxed">
              Acepto los <span onClick={() => handleLegal('Términos')} className="text-accent hover:underline cursor-pointer">Términos de Servicio</span> y la <span onClick={() => handleLegal('Privacidad')} className="text-accent hover:underline cursor-pointer">Política de Privacidad</span>.
            </label>
          </div>

          <Link href="/dashboard">
            <button className="w-full py-4 rounded-xl premium-gradient text-white font-black text-lg shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2">
              Crear Cuenta Gratis
              <ArrowRight size={20} />
            </button>
          </Link>
        </form>

        <p className="text-center text-subtext text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-accent font-bold hover:underline">Inicia sesión</Link>
        </p>
      </motion.div>
    </div>
  );
}
