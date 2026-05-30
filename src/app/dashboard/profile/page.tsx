'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUserStore, getAvatarUrl } from '@/lib/store';
import { 
  Trophy, Star, Clock, Calendar, 
  Settings, Edit2, Share2, Award,
  Zap, BookOpen, Target, Crown,
  ChevronRight, Layout, Database, Brain,
  Check
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { COURSES } from '@/data/courses';
import { useToastStore } from '@/lib/toast-store';

export default function ProfilePage() {
  const { xp, level, streak, completedLessons, avatarConfig, username, bio } = useUserStore();
  const { addToast } = useToastStore();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${username} en Mimo`,
        text: `Mira mi progreso en Mimo! Nivel ${level}, racha de ${streak} días.`,
        url: window.location.href,
      }).catch(() => {
        addToast('Error al compartir', 'error');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Enlace copiado al portapapeles', 'success');
    }
  };

  const handleRanking = () => {
    addToast('El ranking global se está actualizando...', 'info');
  };

  const handleViewAllAchievements = () => {
    addToast('Próximamente: Galería completa de logros', 'info');
  };

  const avatarUrl = getAvatarUrl(avatarConfig);

  // Calcular progreso por categoría
  const getCategoryStats = () => {
    return COURSES.map(course => {
      const courseLessonsIds = course.lessons.map(l => l.id);
      const completed = completedLessons.filter(id => courseLessonsIds.includes(id)).length;
      return {
        id: course.id,
        name: course.title.split(' ')[0], // Simplificar nombre
        completed,
        total: course.lessonsCount,
        color: course.color,
        icon: course.icon === 'code' ? <Layout size={18} /> : 
              course.icon === 'book' ? <BookOpen size={18} /> :
              course.icon === 'database' ? <Database size={18} /> : <Brain size={18} />
      };
    });
  };

  const achievements = [
    { id: 1, title: 'Primer Paso', description: 'Completa tu primera lección', icon: <Zap className="text-warning" />, unlocked: completedLessons.length > 0 },
    { id: 2, title: 'Estudiante Serio', description: 'Alcanza el nivel 2', icon: <Award className="text-accent" />, unlocked: level >= 2 },
    { id: 3, title: 'Racha de Fuego', description: 'Mantén una racha de 7 días', icon: <Clock className="text-secondary" />, unlocked: streak >= 7 },
    { id: 4, title: 'Maestro Python', description: 'Completa 5 lecciones de Python', icon: <Star className="text-success" />, unlocked: completedLessons.filter(id => id.startsWith('python')).length >= 5 },
  ];

  const categoryStats = getCategoryStats();

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Profile Header Premium */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-card p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] -z-10" />
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-accent/20 p-2 bg-background/50 backdrop-blur-sm">
                <div className="w-full h-full rounded-full border-4 border-accent overflow-hidden shadow-2xl shadow-accent/20">
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full bg-card object-cover"
                  />
                </div>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl premium-gradient flex flex-col items-center justify-center border-4 border-background text-white shadow-xl"
              >
                <span className="text-[10px] font-black leading-none opacity-80 uppercase">Nvl</span>
                <span className="text-lg font-black leading-none">{level}</span>
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h2 className="text-5xl font-black italic tracking-tighter text-text">
                    {username}
                  </h2>
                  <div className="flex gap-2 justify-center">
                    <Link href="/dashboard/settings" className="p-2.5 rounded-xl bg-card border border-border hover:border-accent/50 hover:text-accent transition-all backdrop-blur-md">
                      <Settings size={20} />
                    </Link>
                    <button 
                      onClick={handleShare}
                      className="p-2.5 rounded-xl bg-card border border-border hover:border-accent/50 hover:text-accent transition-all backdrop-blur-md"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-xl text-subtext font-medium max-w-lg">
                  {bio}
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-subtext uppercase tracking-widest bg-card px-4 py-2 rounded-full border border-border">
                  <Calendar size={16} className="text-accent" /> Miembro desde Mayo 2026
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-success uppercase tracking-widest bg-success/10 px-4 py-2 rounded-full border border-success/20">
                  <Crown size={16} /> Liga de Diamante
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Skills */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ProfileStat label="XP Total" value={xp.toLocaleString()} icon={<Star size={20} />} color="warning" />
            <ProfileStat label="Lecciones" value={completedLessons.length} icon={<BookOpen size={20} />} color="accent" />
            <ProfileStat label="Racha" value={`${streak} d`} icon={<Zap size={20} />} color="secondary" />
            <ProfileStat label="Rango" value="#12" icon={<Trophy size={20} />} color="success" />
          </div>

          {/* Skills / Course Progress */}
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Award className="text-accent" />
                Habilidades Técnicas
              </h3>
              <span className="text-xs font-bold text-subtext uppercase tracking-widest">Progreso de Dominio</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryStats.map(stat => (
                <div key={stat.id} className="space-y-3 p-4 rounded-2xl bg-card border border-border hover:border-accent/20 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${stat.color}/20 text-${stat.color} group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <span className="font-bold text-text">{stat.name}</span>
                    </div>
                    <span className="text-xs font-black text-subtext">{stat.completed}/{stat.total}</span>
                  </div>
                  <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.completed / stat.total) * 100}%` }}
                      className={`h-full bg-${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="glass-card p-8 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-text">Actividad Semanal</h3>
                <div className="flex gap-2">
                   {[...Array(7)].map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-sm ${i === 6 ? 'bg-accent' : 'bg-border'}`} />
                   ))}
                </div>
             </div>
             <div className="flex items-end justify-between h-32 pt-4 px-2">
                {[40, 70, 45, 90, 65, 30, 85].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className={`w-4/5 rounded-t-md transition-all ${i === 6 ? 'premium-gradient' : 'bg-border'}`}
                    />
                    <span className="text-[10px] font-bold text-subtext uppercase">
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Achievements & Leagues */}
        <div className="space-y-8">
          {/* Current League Card */}
          <div className="glass-card p-8 bg-gradient-to-br from-success/20 via-transparent to-transparent border-success/30 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <Crown size={120} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success">
                    <Crown size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-text">Liga Esmeralda</h4>
                    <p className="text-xs text-subtext uppercase font-bold tracking-tighter">Top 5% de usuarios</p>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-text">Ascenso a Diamante</span>
                    <span className="text-success">450 XP restantes</span>
                 </div>
                 <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[75%]" />
                 </div>
              </div>
              <button 
                onClick={handleRanking}
                className="w-full py-3 rounded-xl bg-card border border-border text-sm font-bold flex items-center justify-center gap-2 hover:bg-card-hover transition-colors text-text"
              >
                 Ver Ranking Global <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Achievements Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-text">
              <Trophy className="text-warning" />
              Trofeos
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={`glass-card p-5 flex items-center gap-5 border-border hover:border-accent/20 transition-all group ${
                    ach.unlocked ? 'opacity-100 cursor-default' : 'opacity-40 grayscale'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                    ach.unlocked ? 'bg-background shadow-xl' : 'bg-background'
                  }`}>
                    {ach.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base leading-tight text-text">{ach.title}</h4>
                    <p className="text-xs text-subtext mt-1">{ach.description}</p>
                  </div>
                  {ach.unlocked && (
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="text-success" size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={handleViewAllAchievements}
              className="w-full py-4 text-sm font-bold text-subtext hover:text-text transition-colors"
            >
              Ver todos los trofeos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value, icon, color }: any) {
  const colorMap: any = {
    warning: 'text-warning bg-warning/10 border-warning/20',
    accent: 'text-accent bg-accent/10 border-accent/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    success: 'text-success bg-success/10 border-success/20',
  };

  return (
    <div className="glass-card p-5 text-center space-y-3 group hover:border-accent/20 transition-all relative overflow-hidden">
      <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="space-y-0.5 relative z-10">
        <div className="text-2xl font-black tracking-tighter text-text">{value}</div>
        <div className="text-[10px] font-bold text-subtext uppercase tracking-widest opacity-60">{label}</div>
      </div>
    </div>
  );
}
