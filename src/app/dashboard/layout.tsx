'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Trophy, User, 
  Settings, LogOut, Search, Bell, Command,
  ChevronLeft, ChevronRight, Zap, Star, ShoppingBag,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore, getAvatarUrl } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useToastStore } from '@/lib/toast-store';
import CommandPalette from '@/components/ui/CommandPalette';
import LevelUpModal from '@/components/ui/LevelUpModal';
import AmbientSounds from '@/components/ui/AmbientSounds';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { xp, streak, avatarConfig, username, level, gems } = useUserStore();
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [prevLevel, setPrevLevel] = useState(level);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (level > prevLevel) {
      setIsLevelUpModalOpen(true);
      setPrevLevel(level);
    }
  }, [level, prevLevel]);

  const handleSignOut = () => {
    addToast('Cerrando sesión...', 'info');
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const handleSearch = () => {
    setIsCommandPaletteOpen(true);
  };

  const handleNotifications = () => {
    addToast('No tienes notificaciones pendientes', 'success');
  };

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Comando', href: '/dashboard' },
    { icon: <BookOpen size={18} />, label: 'Maestría', href: '/dashboard/courses' },
    { icon: <Trophy size={18} />, label: 'Ranking', href: '/dashboard/leaderboard' },
    { icon: <Palette size={18} />, label: 'Identidad', href: '/dashboard/customize' },
    { icon: <ShoppingBag size={18} />, label: 'Bóveda', href: '/dashboard/shop' },
    { icon: <User size={18} />, label: 'Legado', href: '/dashboard/profile' },
  ];

  if (!mounted) return null;

  const avatarUrl = getAvatarUrl(avatarConfig);

  const getPathLabel = (path: string | null) => {
    if (!path) return 'Vista General';
    const segment = path.split('/').pop();
    const mapping: Record<string, string> = {
      'dashboard': 'Comando Central',
      'courses': 'Maestría',
      'leaderboard': 'Ranking',
      'customize': 'Identidad',
      'shop': 'Bóveda',
      'profile': 'Legado',
      'settings': 'Configuración',
      'lesson': 'Lección',
      'path': 'Trayectoria'
    };
    return mapping[segment || ''] || segment || 'Vista General';
  };

  return (
    <div className="flex min-h-screen bg-background text-text font-sans">
      {/* Sidebar - Linear Style */}
      <aside 
        className={`fixed left-0 top-0 h-screen border-r border-white/5 bg-surface/50 backdrop-blur-xl transition-all duration-500 z-50 hidden md:flex flex-col ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-16 flex items-center px-6 mb-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20 shrink-0">
              <span className="font-black text-white text-sm">L</span>
            </div>
            {!isSidebarCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-base tracking-tighter uppercase font-display"
              >
                Lumina
              </motion.span>
            )}
          </Link>
        </div>

        <div className="px-3 mb-4">
          <button 
            onClick={handleSearch}
            className="w-full h-9 flex items-center gap-3 px-3 rounded-lg bg-white/5 border border-white/5 text-muted hover:text-text hover:bg-white/10 transition-all group"
          >
            <Search size={16} className="shrink-0" />
            {!isSidebarCollapsed && (
              <div className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap">
                <span className="text-xs font-medium">Buscar...</span>
                <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Command size={10} />
                  <span className="text-[10px] font-black">K</span>
                </div>
              </div>
            )}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group overflow-hidden ${
                    isActive 
                      ? 'text-text bg-white/5 shadow-inner' 
                      : 'text-muted hover:text-text hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-4 bg-accent rounded-full"
                    />
                  )}
                  <div className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-accent' : 'group-hover:text-accent'}`}>
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-bold tracking-tight overflow-hidden whitespace-nowrap uppercase italic">
                      {item.label}
                    </span>
                  )}
                  {!isSidebarCollapsed && isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <Link href="/dashboard/settings">
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-all group ${pathname === '/dashboard/settings' ? 'text-text bg-white/5' : ''}`}>
              <Settings size={18} className="shrink-0 group-hover:rotate-45 transition-transform duration-500" />
              {!isSidebarCollapsed && <span className="text-sm font-bold tracking-tight uppercase italic">Configuración</span>}
            </div>
          </Link>
          <button 
             onClick={handleSignOut}
             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:text-danger hover:bg-danger/5 transition-all group"
           >
            <LogOut size={18} className="shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm font-bold tracking-tight uppercase italic text-left">Cerrar Sesión</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-white/5 bg-surface flex items-center justify-center hover:bg-white/5 transition-colors text-muted z-10"
        >
          {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col transition-all duration-500 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Topbar - Raycast Style */}
        <header className="h-16 border-b border-white/5 sticky top-0 bg-background/50 backdrop-blur-xl z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="text-xs font-black text-muted uppercase tracking-[0.2em]">{getPathLabel(pathname)}</span>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
                  <Zap size={14} className="text-warning fill-warning" />
                  <span className="text-warning font-black text-xs tracking-tighter">{streak} DÍAS</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                  <Star size={14} className="text-accent fill-accent" />
                  <span className="text-accent font-black text-xs tracking-tighter uppercase italic">{xp} XP</span>
                </div>
                <Link href="/dashboard/shop">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <Star size={14} className="text-secondary fill-secondary group-hover:scale-110 transition-transform" />
                    <span className="text-secondary font-black text-xs tracking-tighter uppercase italic">{gems} GEMAS</span>
                  </div>
                </Link>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                <AmbientSounds />
                <button 
                   onClick={handleNotifications}
                   className="relative p-2 text-muted hover:text-text transition-colors"
                 >
                   <Bell size={18} />
                   <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full ring-2 ring-background" />
                </button>
                <Link href="/dashboard/profile">
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden group-hover:border-accent transition-colors">
                       <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden lg:block">
                       <p className="text-xs font-black uppercase tracking-tight leading-none text-text group-hover:text-accent transition-colors">{username}</p>
                       <p className="text-[10px] font-bold text-muted mt-0.5">SILVER LEAGUE</p>
                    </div>
                  </div>
                </Link>
             </div>
          </div>
        </header>

        {/* Page Content Container */}
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </main>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* Level Up Modal */}
      <LevelUpModal 
        level={level} 
        isOpen={isLevelUpModalOpen} 
        onClose={() => setIsLevelUpModalOpen(false)} 
      />

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 glass-card bg-surface/90 border-white/10 z-50 flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
         {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 relative">
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-accent bg-accent/10' : 'text-muted'}`}>
                  {item.icon}
                </div>
                {isActive && (
                  <motion.div layoutId="mobile-dot" className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            );
         })}
      </nav>
    </div>
  );
}
