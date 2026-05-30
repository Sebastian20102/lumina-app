'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/lib/toast-store';
import { CheckCircle2, Info, AlertTriangle, Sparkles, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-4 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl min-w-[300px] ${
              toast.type === 'xp' 
                ? 'bg-accent/10 border-accent/30 text-accent' 
                : toast.type === 'success'
                ? 'bg-success/10 border-success/30 text-success'
                : toast.type === 'error'
                ? 'bg-danger/10 border-danger/30 text-danger'
                : 'bg-card/80 border-border text-text'
            }`}
          >
            <div className="shrink-0">
              {toast.type === 'xp' && <Sparkles className="animate-pulse" />}
              {toast.type === 'success' && <CheckCircle2 />}
              {toast.type === 'info' && <Info />}
              {toast.type === 'warning' && <AlertTriangle />}
              {toast.type === 'error' && <X className="text-danger" />}
            </div>
            
            <div className="flex-1">
              <p className="font-bold text-sm leading-tight">{toast.message}</p>
              {toast.amount && (
                <p className="text-xs font-black mt-0.5">+{toast.amount} XP</p>
              )}
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
