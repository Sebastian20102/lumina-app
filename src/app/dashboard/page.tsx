'use client';

import { motion } from 'framer-motion';
import { 
  Zap, Trophy, Star, ArrowRight, 
  BookOpen, Clock, Target,
  Flame, TrendingUp,
  Brain, Code, Database, Sparkles, ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToastStore } from '@/lib/toast-store';

export default function DashboardPage() {
  const { xp, level, streak, completedLessons, username, dailyQuests } = useUserStore();
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSkillsMap = () => {
    addToast('El mapa de habilidades se está cargando...', 'info');
  };

  const handleAchievementClick = () => {
    addToast('¡Logro desbloqueado! Mira tu perfil para más detalles.', 'success');
  };

  const NEWS_ITEMS = [
    { id: 1, title: 'Python 3.13 ya está aquí', description: 'Descubre las nuevas funciones de rendimiento.', tag: 'Novedades', color: 'accent' },
    { id: 2, title: 'Próximamente: Curso de React', description: 'Domina el framework más usado.', tag: 'Cursos', color: 'secondary' },
  ];

  const getCourseProgress = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const courseLessonsIds = course.lessons.map(l => l.id);
    const completed = completedLessons.filter(id => courseLessonsIds.includes(id)).length;
    return Math.round((completed / course.lessons.length) * 100);
  };

  const getCompletedCount = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const courseLessonsIds = course.lessons.map(l => l.id);
    return completedLessons.filter(id => courseLessonsIds.includes(id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={12} />
            <span>Acceso Concedido</span>
          </motion.div>
          <h1 className="text-5xl font-black font-display tracking-tight text-gradient uppercase italic">
            Hola, {username.split(' ')[0]}
          </h1>
          <p className="text-subtext font-medium text-lg">¿Listo para continuar tu ascenso a la maestría?</p>
        </div>

        <div className="flex gap-4">
           <Link href="/dashboard/courses">
              <button className="btn-premium px-8 py-4 text-xs font-black uppercase tracking-widest">
                 Continuar Maestría
              </button>
           </Link>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Active Courses */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black font-display uppercase italic tracking-wider flex items-center gap-3">
                  <BookOpen size={20} className="text-accent" />
                  Trayectorias Activas
               </h3>
               <Link href="/dashboard/courses" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center gap-2">
                  Ver Todas <ChevronRight size={12} />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COURSES.slice(0, 2).map((course, idx) => (
                <CourseCard 
                  key={course.id}
                  course={course}
                  progress={getCourseProgress(course.id)}
                  completed={getCompletedCount(course.id)}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Daily Quests */}
          <div className="glass-card p-8 space-y-8 relative overflow-hidden group border-accent/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] -z-10 group-hover:bg-accent/10 transition-colors" />
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black font-display uppercase italic tracking-wider flex items-center gap-3">
                   <Target size={20} className="text-accent" />
                   Misiones Diarias
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest">
                   <Clock size={12} /> Reinicia en 6h 20m
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className={`p-4 rounded-2xl border transition-all ${quest.completed ? 'bg-success/5 border-success/20' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${quest.completed ? 'bg-success/20 text-success' : 'bg-accent/10 text-accent'}`}>
                          {quest.completed ? <CheckCircle2 size={16} /> : <Zap size={16} />}
                        </div>
                        <span className={`font-bold uppercase tracking-tight italic ${quest.completed ? 'text-success' : 'text-text'}`}>{quest.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-warning fill-warning" />
                        <span className="text-xs font-black">+{quest.reward}</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(quest.current / quest.target) * 100}%` }}
                        className={`h-full ${quest.completed ? 'bg-success' : 'bg-accent'}`}
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Noticias de Mimo */}
          <div className="space-y-6">
             <h3 className="text-xl font-black font-display uppercase italic tracking-wider flex items-center gap-3 px-2">
                <Sparkles size={20} className="text-secondary" />
                Noticias de Mimo
             </h3>
             <div className="grid grid-cols-1 gap-4">
                {NEWS_ITEMS.map((news) => (
                  <div key={news.id} className="glass-card p-6 flex items-center justify-between group hover:border-secondary/30 transition-all cursor-pointer">
                    <div className="space-y-2">
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-${news.color}/10 text-${news.color} border border-${news.color}/20`}>
                        {news.tag}
                      </span>
                      <h4 className="font-bold text-lg">{news.title}</h4>
                      <p className="text-xs text-subtext font-medium">{news.description}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-8">
           {/* XP / Nivel Widget */}
           <div className="glass-card p-8 bg-gradient-to-br from-accent/10 via-transparent to-transparent border-accent/20">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-white shadow-xl shadow-accent/20">
                    <Zap size={24} fill="white" />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Nivel</p>
                    <p className="text-3xl font-black italic text-text">{level}</p>
                 </div>
              </div>
              
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted">Progreso al Nvl {level + 1}</span>
                    <span className="text-accent">{xp % 500} / 500 XP</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(xp % 500) / 500 * 100}%` }}
                      className="h-full rounded-full premium-gradient shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                    />
                 </div>
              </div>
              
              <button 
                onClick={handleSkillsMap}
                className="w-full mt-8 py-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent/30 transition-all text-xs font-black uppercase tracking-widest text-text flex items-center justify-center gap-2"
              >
                 View Skills Map <TrendingUp size={14} className="text-accent" />
              </button>
           </div>

           {/* Quick Stats */}
           <div className="grid grid-cols-2 gap-4">
              <StatCard label="STREAK" value={streak} sub="Days" icon={<Flame size={16} />} color="warning" />
              <StatCard label="RANK" value="#12" sub="Global" icon={<Trophy size={16} />} color="secondary" />
           </div>

           {/* Achievements Preview */}
           <div className="glass-card p-6 space-y-6">
              <h4 className="text-xs font-black text-muted uppercase tracking-[0.2em]">Recent Achievements</h4>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                 {[1, 2, 3].map((i) => (
                   <div 
                    key={i} 
                    onClick={handleAchievementClick}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 hover:border-accent transition-colors cursor-pointer group"
                   >
                      <Trophy size={20} className="text-muted group-hover:text-warning transition-colors" />
                   </div>
                 ))}
                 <Link href="/dashboard/profile" className="w-12 h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center shrink-0 text-muted hover:text-text hover:border-white/20 transition-all cursor-pointer">
                    <ArrowRight size={16} />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, progress, completed, delay }: any) {
  const icons: any = {
    code: <Code size={20} />,
    book: <BookOpen size={20} />,
    database: <Database size={20} />,
    brain: <Brain size={20} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={`/dashboard/path/${course.id}`}>
        <div className="glass-card p-6 h-full flex flex-col justify-between hover:border-accent/40 hover:translate-y-[-4px] transition-all duration-300 group bg-surface/40">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${course.color}/10 text-${course.color} border border-${course.color}/20 group-hover:scale-110 transition-transform`}>
                    {icons[course.icon] || <Code size={20} />}
                 </div>
                 <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted">Active</span>
                 </div>
              </div>
              <div>
                 <h4 className="text-lg font-black font-display italic uppercase tracking-tight group-hover:text-accent transition-colors">{course.title}</h4>
                 <p className="text-xs text-muted font-medium line-clamp-2 mt-1">{course.description}</p>
              </div>
           </div>

           <div className="mt-8 space-y-3">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                 <span className="text-muted">{completed} / {course.lessonsCount} Lessons</span>
                 <span className="text-text">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className={`h-full bg-${course.color}`}
                 />
              </div>
           </div>
        </div>
      </Link>
    </motion.div>
  );
}

function StatCard({ label, value, sub, icon, color }: any) {
  const colorMap: any = {
    warning: 'text-warning bg-warning/5 border-warning/10',
    secondary: 'text-secondary bg-secondary/5 border-secondary/10',
    accent: 'text-accent bg-accent/5 border-accent/10',
    success: 'text-success bg-success/5 border-success/10',
  };

  return (
    <div className={`glass-card p-5 flex flex-col justify-between group hover:scale-105 transition-all duration-300 ${colorMap[color] || ''}`}>
       <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-current transition-colors">
             {icon}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
       </div>
       <div className="mt-4 flex items-end gap-1.5">
          <p className="text-2xl font-black italic tracking-tight">{value}</p>
          <p className="text-[10px] font-bold opacity-60 mb-1">{sub}</p>
       </div>
    </div>
  );
}

function GoalWidget({ label, current, total, icon, color }: any) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  const colorMap: any = {
    accent: 'text-accent border-accent/20 bg-accent/5',
    secondary: 'text-secondary border-secondary/20 bg-secondary/5',
    warning: 'text-warning border-warning/20 bg-warning/5',
  };

  const bgBarMap: any = {
    accent: 'bg-accent',
    secondary: 'bg-secondary',
    warning: 'bg-warning',
  };

  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
          <div className={`p-2 rounded-xl border ${colorMap[color]} flex items-center justify-center`}>
             {icon}
          </div>
          <div className="text-right">
             <p className="text-[9px] font-black text-muted uppercase tracking-widest">{label}</p>
             <p className="text-sm font-black italic">{current} / {total}</p>
          </div>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full ${bgBarMap[color] || 'bg-accent'} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
          />
       </div>
    </div>
  );
}
