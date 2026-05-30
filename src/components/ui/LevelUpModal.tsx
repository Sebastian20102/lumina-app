'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function LevelUpModal({ level, isOpen, onClose }: { level: number, isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#06B6D4', '#F59E0B']
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-full max-w-lg glass-card p-12 text-center space-y-8 border-accent/30 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
               <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-accent/20 blur-[100px] rounded-full animate-pulse" />
               <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-secondary/10 blur-[100px] rounded-full animate-pulse" />
            </div>

            <div className="relative inline-block">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-2 border-dashed border-accent/30 rounded-full"
               />
               <div className="w-32 h-32 rounded-3xl premium-gradient flex items-center justify-center text-white shadow-2xl shadow-accent/40 relative z-10">
                  <Trophy size={64} fill="white" />
               </div>
               <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-warning flex items-center justify-center text-white shadow-lg"
               >
                  <Sparkles size={24} />
               </motion.div>
            </div>

            <div className="space-y-3">
               <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] animate-bounce">¡Subiste de Nivel!</h2>
               <h1 className="text-6xl font-black italic tracking-tighter text-gradient uppercase">Nivel {level}</h1>
               <p className="text-subtext text-lg font-medium max-w-xs mx-auto">
                  ¡Increíble! Tu dominio del código está alcanzando nuevas alturas.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="glass-card p-4 space-y-1">
                  <div className="flex items-center justify-center gap-2 text-warning">
                     <Zap size={16} fill="currentColor" />
                     <span className="text-sm font-black uppercase tracking-widest">Recompensa</span>
                  </div>
                  <p className="text-xl font-black italic">+50 XP</p>
               </div>
               <div className="glass-card p-4 space-y-1">
                  <div className="flex items-center justify-center gap-2 text-secondary">
                     <Star size={16} fill="currentColor" />
                     <span className="text-sm font-black uppercase tracking-widest">Bonus</span>
                  </div>
                  <p className="text-xl font-black italic">1.5x Multi</p>
               </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 rounded-2xl premium-gradient text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
               Continuar Desafío <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
