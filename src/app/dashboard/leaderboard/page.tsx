'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Crown, Zap, TrendingUp, Clock, ChevronUp } from 'lucide-react';
import { useUserStore, getAvatarUrl } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function LeaderboardPage() {
  const { xp, level, avatarConfig, username } = useUserStore();

  const getUsers = () => {
    const baseXP = Math.max(xp, 1000);
    const myAvatarUrl = getAvatarUrl(avatarConfig).split('?')[1];

    return [
      { name: 'Alex Rivera', xp: baseXP + 1200, level: 12, avatar: 'Alex', trend: 'up' },
      { name: 'Sofia Chen', xp: baseXP + 850, level: 10, avatar: 'Sofia', trend: 'up' },
      { name: username, xp: xp, level: level, avatar: 'Jonathan', isMe: true, trend: 'stable', customAvatar: myAvatarUrl },
      { name: 'Marco Rossi', xp: Math.max(baseXP - 150, 800), level: 8, avatar: 'Marco', trend: 'down' },
      { name: 'Elena Diaz', xp: Math.max(baseXP - 300, 600), level: 7, avatar: 'Elena', trend: 'up' },
      { name: 'Lucas Smith', xp: Math.max(baseXP - 450, 400), level: 5, avatar: 'Lucas', trend: 'down' },
      { name: 'Yuki Tanaka', xp: Math.max(baseXP - 600, 200), level: 4, avatar: 'Yuki', trend: 'stable' },
    ].sort((a, b) => b.xp - a.xp).map((user, index) => ({ ...user, rank: index + 1 }));
  };

  const users = getUsers();
  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header & League Info */}
      <div className="relative glass-card p-10 overflow-hidden border-success/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-success/5 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-xs font-black uppercase tracking-widest border border-success/20">
              <Crown size={14} />
              <span>Liga Esmeralda</span>
            </div>
            <h2 className="text-5xl font-black italic tracking-tighter">RANKING GLOBAL</h2>
            <p className="text-subtext text-lg max-w-md font-medium">
              Mantente en el <span className="text-success font-bold">Top 10</span> para ascender a la <span className="text-warning font-bold italic">Liga Diamante</span>.
            </p>
          </div>
          
          <div className="glass-card p-6 bg-card border-border flex items-center gap-6 backdrop-blur-xl">
             <div className="flex flex-col items-center px-4 border-r border-border">
                <span className="text-[10px] font-bold text-subtext uppercase tracking-widest">Termina en</span>
                <span className="text-xl font-black flex items-center gap-2 text-text">
                   <Clock size={18} className="text-accent" /> 2d 14h
                </span>
             </div>
             <div className="flex flex-col items-center px-4">
                <span className="text-[10px] font-bold text-subtext uppercase tracking-widest">Tu Posición</span>
                <span className="text-xl font-black text-accent">#{users.find(u => u.isMe)?.rank}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
        {/* Rank 2 */}
        <PodiumCard user={topThree[1]} rank={2} height="h-48" delay={0.1} />
        {/* Rank 1 */}
        <PodiumCard user={topThree[0]} rank={1} height="h-64" delay={0} isMain />
        {/* Rank 3 */}
        <PodiumCard user={topThree[2]} rank={3} height="h-40" delay={0.2} />
      </div>

      {/* Others List */}
      <div className="space-y-3 pt-8">
        <div className="flex items-center justify-between px-8 text-[10px] font-black text-subtext uppercase tracking-widest">
           <div className="flex items-center gap-12">
              <span className="w-8 text-center">Pos</span>
              <span>Usuario</span>
           </div>
           <span>Puntaje XP</span>
        </div>
        {others.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-card p-4 md:p-6 flex items-center justify-between group transition-all duration-300 hover:border-accent/20 ${
              user.isMe ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20' : 'border-border'
            }`}
          >
            <div className="flex items-center gap-6 md:gap-12">
              <div className="w-8 text-center font-black text-lg text-subtext group-hover:text-text transition-colors">
                {user.rank}
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                    <img src={user.customAvatar ? `https://api.dicebear.com/9.x/avataaars/svg?${user.customAvatar}` : `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.avatar}`} alt="Avatar" />
                  </div>
                  {user.trend === 'up' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center border-2 border-background"><ChevronUp size={10} className="text-white" /></div>}
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-lg flex items-center gap-2 text-text">
                    {user.name}
                    {user.isMe && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-md uppercase font-black tracking-widest shadow-lg shadow-accent/20">Tú</span>}
                  </h4>
                  <p className="text-subtext text-[10px] md:text-xs font-bold uppercase tracking-widest">Nivel {user.level} • Programador</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-xl border border-border">
              <Star className="text-warning fill-warning" size={14} />
              <span className="text-lg font-black tracking-tight text-text">{user.xp.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-subtext uppercase">XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PodiumCard({ user, rank, height, delay, isMain }: { 
  user: any, 
  rank: number, 
  height: string, 
  delay: number, 
  isMain?: boolean 
}) {
  const colors: any = {
    1: 'border-warning/40 shadow-warning/10',
    2: 'border-slate-400/40 shadow-slate-400/10',
    3: 'border-amber-700/40 shadow-amber-700/10',
  };

  const icons: any = {
    1: <Trophy size={24} className="text-warning" />,
    2: <Medal size={24} className="text-slate-400" />,
    3: <Medal size={24} className="text-amber-700" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`relative flex flex-col items-center group ${isMain ? 'z-20 scale-110' : 'z-10'}`}
    >
      <div className="mb-6 relative">
         <div className={`w-24 h-24 rounded-3xl border-4 overflow-hidden bg-card shadow-2xl transition-transform group-hover:scale-110 duration-500 ${colors[rank]}`}>
            <img src={user.customAvatar ? `https://api.dicebear.com/9.x/avataaars/svg?${user.customAvatar}` : `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.avatar}`} alt="Avatar" className="w-full h-full" />
         </div>
         <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-card border-2 flex items-center justify-center shadow-xl ${colors[rank]}`}>
            {icons[rank]}
         </div>
      </div>
      
      <div className="text-center mb-4">
         <h4 className="font-black italic text-lg text-text">{user.name}</h4>
         <div className="flex items-center justify-center gap-1.5 text-warning font-black text-sm">
            <Star size={14} fill="currentColor" />
            {user.xp.toLocaleString()} XP
         </div>
      </div>

      <div 
        className={`w-full ${height} rounded-t-3xl glass-card flex flex-col items-center pt-6 border-b-0 bg-gradient-to-b from-card to-transparent ${isMain ? 'border-accent/30' : 'border-border'}`}
      >
        <span className="text-4xl font-black italic opacity-20 text-text">{rank}</span>
        {isMain && (
           <div className="mt-4 flex flex-col items-center gap-1">
              <Zap size={20} className="text-accent fill-accent animate-pulse" />
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">MVP</span>
           </div>
        )}
      </div>
    </motion.div>
  );
}

