'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-red-500/20 rounded-full" />
          <div className="relative bg-surface border border-white/10 w-32 h-32 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <AlertTriangle size={64} className="text-red-500" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-black mb-4 tracking-tighter">
          Algo salió mal
        </h1>
        
        <p className="text-muted mb-10">
          Ha ocurrido un error inesperado en el sistema. Nuestros ingenieros espaciales han sido notificados.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/25"
          >
            <RefreshCcw size={20} />
            Reintentar
          </button>
          <Link href="/dashboard" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-surface border border-white/10 text-text rounded-2xl font-bold hover:bg-white/5 transition-all">
            <Home size={20} />
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
