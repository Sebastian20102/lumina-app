'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Command, Layout, Book, Trophy, 
  User, Settings, Star, Zap, X, ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: string;
}

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    { id: 'dash', label: 'Ir al Comando Central', icon: <Layout size={18} />, action: () => router.push('/dashboard'), category: 'Navegación' },
    { id: 'courses', label: 'Ver Maestría', icon: <Book size={18} />, action: () => router.push('/dashboard/courses'), category: 'Navegación' },
    { id: 'leader', label: 'Ver Ranking Global', icon: <Trophy size={18} />, action: () => router.push('/dashboard/leaderboard'), category: 'Navegación' },
    { id: 'profile', label: 'Ver mi Legado', icon: <User size={18} />, action: () => router.push('/dashboard/profile'), category: 'Navegación' },
    { id: 'settings', label: 'Configuración de Sistema', icon: <Settings size={18} />, action: () => router.push('/dashboard/settings'), category: 'Navegación' },
    { id: 'python', label: 'Trayectoria: Python para Principiantes', icon: <Zap size={18} className="text-accent" />, action: () => router.push('/dashboard/path/python'), category: 'Cursos' },
    { id: 'web', label: 'Trayectoria: Desarrollo Web Moderno', icon: <Star size={18} className="text-secondary" />, action: () => router.push('/dashboard/path/web'), category: 'Cursos' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action();
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setSearch('');
      setSelectedIndex(0);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl glass-card bg-surface/90 border-white/10 shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <Search size={20} className="text-muted" />
                <input 
                  autoFocus
                  placeholder="¿Qué quieres hacer?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-text placeholder:text-muted"
                />
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-black text-muted">
                  <span className="uppercase tracking-tighter">ESC</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(
                      filteredCommands.reduce((acc, cmd) => {
                        if (!acc[cmd.category]) acc[cmd.category] = [];
                        acc[cmd.category].push(cmd);
                        return acc;
                      }, {} as Record<string, CommandItem[]>)
                    ).map(([category, items]) => (
                      <div key={category} className="space-y-1">
                        <h4 className="px-3 py-1 text-[10px] font-black text-muted uppercase tracking-[0.2em]">{category}</h4>
                        {items.map((cmd) => {
                          const isSelected = filteredCommands[selectedIndex]?.id === cmd.id;
                          return (
                            <div
                              key={cmd.id}
                              onClick={() => { cmd.action(); onClose(); }}
                              onMouseEnter={() => setSelectedIndex(filteredCommands.indexOf(cmd))}
                              className={`
                                flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all
                                ${isSelected ? 'bg-accent/10 text-accent shadow-inner' : 'hover:bg-white/5 text-subtext'}
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`${isSelected ? 'text-accent' : 'text-muted'}`}>
                                  {cmd.icon}
                                </div>
                                <span className="text-sm font-bold uppercase tracking-tight italic">{cmd.label}</span>
                              </div>
                              {isSelected && (
                                <motion.div layoutId="arrow" initial={{ x: -5 }} animate={{ x: 0 }}>
                                  <ArrowRight size={14} />
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                      <Search size={24} className="text-muted" />
                    </div>
                    <p className="text-sm font-medium text-muted">No encontramos resultados para tu búsqueda.</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/5 bg-background/50 flex items-center justify-between text-[10px] font-black text-muted uppercase tracking-widest">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">↑↓</span> Navegar
                   </div>
                   <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">ENTER</span> Seleccionar
                   </div>
                </div>
                <div className="flex items-center gap-1.5">
                   Hecho con <Star size={10} className="text-accent fill-accent" /> por Mimo
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
