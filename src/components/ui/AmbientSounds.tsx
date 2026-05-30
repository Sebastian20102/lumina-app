'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Wind, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOUNDS = [
  { id: 'lofi', name: 'Lofi Focus', icon: <Music size={14} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Placeholder URLs
  { id: 'nature', name: 'Naturaleza', icon: <Wind size={14} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'cafe', name: 'Cafetería', icon: <Coffee size={14} />, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export default function AmbientSounds() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
      audioRef.current?.pause();
    } else {
      setActiveSound(soundId);
      // En un entorno real, aquí cargaríamos la URL real
      // audioRef.current!.src = SOUNDS.find(s => s.id === soundId)!.url;
      // audioRef.current?.play();
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-xl border transition-all ${activeSound ? 'bg-accent/10 border-accent/30 text-accent animate-pulse' : 'bg-white/5 border-white/5 text-muted hover:text-text'}`}
      >
        {activeSound ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full right-0 mb-4 w-64 glass-card p-4 border-white/10 shadow-2xl z-[60]"
          >
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Ambient Soundscapes</h4>
               <Music size={12} className="text-accent" />
            </div>

            <div className="space-y-2">
               {SOUNDS.map((sound) => (
                 <button
                   key={sound.id}
                   onClick={() => toggleSound(sound.id)}
                   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                     activeSound === sound.id 
                       ? 'bg-accent text-white shadow-lg' 
                       : 'hover:bg-white/5 text-subtext hover:text-text'
                   }`}
                 >
                   <div className="flex items-center gap-2">
                      {sound.icon}
                      {sound.name}
                   </div>
                   {activeSound === sound.id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                 </button>
               ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
               <div className="flex items-center justify-between text-[10px] font-black text-muted uppercase">
                  <span>Volumen</span>
                  <span>{Math.round(volume * 100)}%</span>
               </div>
               <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-accent h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
               />
            </div>

            <p className="mt-4 text-[8px] text-center text-muted font-medium italic">
               * El audio real requiere suscripción Premium
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} loop />
    </div>
  );
}
