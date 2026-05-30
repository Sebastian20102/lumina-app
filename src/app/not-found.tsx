'use client';

import { motion } from 'framer-motion';
import { Home, Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-accent/20 rounded-full" />
          <div className="relative bg-surface border border-white/10 w-32 h-32 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <AlertCircle size={64} className="text-accent" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black mb-4 tracking-tighter"
        >
          404: Misión Perdida
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted text-lg mb-10"
        >
          Parece que has intentado acceder a una zona restringida o inexistente del metaverso de Lumina.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/25">
            <Home size={20} />
            Volver al Comando
          </Link>
          <Link href="/dashboard/courses" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-surface border border-white/10 text-text rounded-2xl font-bold hover:bg-white/5 transition-all">
            <Search size={20} />
            Explorar Maestría
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
