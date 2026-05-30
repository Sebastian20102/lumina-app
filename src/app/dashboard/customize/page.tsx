'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircle, Shirt, Sparkles, Palette, 
  Save, RefreshCw, ChevronRight, Check,
  Lock, Glasses, User, Brain, Star
} from 'lucide-react';
import { useUserStore, getAvatarUrl } from '@/lib/store';
import { useToastStore } from '@/lib/toast-store';

const AVATAR_OPTIONS = {
  top: [
    { id: 'shortFlat', name: 'Corto Liso', premium: false },
    { id: 'bigHair', name: 'Pelo Grande', premium: false },
    { id: 'bob', name: 'Bob', premium: false },
    { id: 'curly', name: 'Rizado', premium: false },
    { id: 'dreads', name: 'Rastas', premium: true },
    { id: 'frida', name: 'Frida', premium: true },
    { id: 'fro', name: 'Afro', premium: false },
    { id: 'shaggy', name: 'Shaggy', premium: false },
    { id: 'winterHat1', name: 'Gorro Invierno', premium: true },
  ],
  accessories: [
    { id: 'none', name: 'Ninguno', premium: false },
    { id: 'kurt', name: 'Kurt', premium: true },
    { id: 'prescription01', name: 'Lentes 1', premium: false },
    { id: 'round', name: 'Redondos', premium: false },
    { id: 'sunglasses', name: 'Gafas Sol', premium: true },
  ],
  facialHair: [
    { id: 'none', name: 'Ninguno', premium: false },
    { id: 'beardLight', name: 'Barba Ligera', premium: false },
    { id: 'beardMajestic', name: 'Barba Majestuosa', premium: true },
    { id: 'moustacheFancy', name: 'Bigote Elegante', premium: true },
  ],
  eyes: [
    { id: 'default', name: 'Normal', premium: false },
    { id: 'happy', name: 'Feliz', premium: false },
    { id: 'wink', name: 'Guiño', premium: false },
    { id: 'hearts', name: 'Corazones', premium: true },
    { id: 'starstruck', name: 'Estrellas', premium: true },
  ],
  mouth: [
    { id: 'default', name: 'Normal', premium: false },
    { id: 'smile', name: 'Sonrisa', premium: false },
    { id: 'tongue', name: 'Lengua', premium: true },
    { id: 'grimace', name: 'Mueca', premium: false },
  ],
  clothing: [
    { id: 'graphicShirt', name: 'Camiseta', premium: false },
    { id: 'hoodie', name: 'Sudadera', premium: false },
    { id: 'overall', name: 'Overol', premium: true },
    { id: 'blazerAndShirt', name: 'Blazer', premium: true },
  ],
  hairColor: ['2c1b18', '4a312c', '724138', 'a55728', 'b58143', 'c93305', 'e8c194', 'f59700'],
  clothingColor: ['3c4f5c', '262e33', '65c9ff', '5199e4', '25557c', 'e6e6e6', '929598'],
  skinColor: ['edb98a', 'f8d25c', 'fd9841', 'ffdbb4', 'd08b5b', 'ae5d29', '614335'],
};

type Category = 'cabeza' | 'rostro' | 'ropa' | 'colores';

export default function CustomizePage() {
  const { avatarConfig, updateAvatar, gems, inventory } = useUserStore();
  const { addToast } = useToastStore();
  const [activeCategory, setActiveCategory] = useState<Category>('cabeza');
  const [localConfig, setLocalConfig] = useState(avatarConfig);

  const handleUpdate = (key: string, value: string, isPremium: boolean) => {
    if (isPremium && !inventory.includes('legendary_avatar')) {
      addToast('Este item requiere el Pack Avatar Legendario de la tienda', 'warning');
      return;
    }
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateAvatar(localConfig);
    addToast('Avatar actualizado con éxito', 'success');
  };

  const handleRandomize = () => {
    const random = {
      seed: Math.random().toString(36).substring(7),
      top: AVATAR_OPTIONS.top[Math.floor(Math.random() * AVATAR_OPTIONS.top.length)].id,
      accessories: AVATAR_OPTIONS.accessories[Math.floor(Math.random() * AVATAR_OPTIONS.accessories.length)].id,
      facialHair: AVATAR_OPTIONS.facialHair[Math.floor(Math.random() * AVATAR_OPTIONS.facialHair.length)].id,
      eyes: AVATAR_OPTIONS.eyes[Math.floor(Math.random() * AVATAR_OPTIONS.eyes.length)].id,
      mouth: AVATAR_OPTIONS.mouth[Math.floor(Math.random() * AVATAR_OPTIONS.mouth.length)].id,
      clothing: AVATAR_OPTIONS.clothing[Math.floor(Math.random() * AVATAR_OPTIONS.clothing.length)].id,
      hairColor: AVATAR_OPTIONS.hairColor[Math.floor(Math.random() * AVATAR_OPTIONS.hairColor.length)],
      clothingColor: AVATAR_OPTIONS.clothingColor[Math.floor(Math.random() * AVATAR_OPTIONS.clothingColor.length)],
      skinColor: AVATAR_OPTIONS.skinColor[Math.floor(Math.random() * AVATAR_OPTIONS.skinColor.length)],
      background: 'transparent',
    };
    setLocalConfig(prev => ({ ...prev, ...random }));
  };

  const avatarUrl = getAvatarUrl(localConfig);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-5xl font-black italic tracking-tighter text-gradient uppercase">Personalización</h2>
          <p className="text-subtext font-medium text-lg italic">Diseña tu identidad en el multiverso Mimo</p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={handleRandomize}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 text-muted hover:text-text transition-all group"
           >
              <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
           </button>
           <button 
            onClick={handleSave}
            className="btn-premium px-10 py-4 text-sm font-black uppercase tracking-widest flex items-center gap-3"
           >
              <Save size={20} /> Guardar Avatar
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Preview Section */}
        <div className="lg:col-span-5 space-y-8">
           <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-secondary/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative glass-card p-12 aspect-square flex items-center justify-center border-accent/20 overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_70%)]" />
                 <img 
                    src={avatarUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(124,58,237,0.3)] animate-bounce-slow"
                 />
              </div>
           </div>

           <div className="glass-card p-6 bg-accent/5 border-accent/20">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-white">
                    <Star size={24} fill="white" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">Estado del Pack</p>
                    <p className="text-sm font-bold uppercase italic">
                       {inventory.includes('legendary_avatar') 
                        ? 'Pack Legendario Desbloqueado ✨' 
                        : 'Pack Legendario Bloqueado'}
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Editor Section */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="flex items-center gap-2 bg-card p-2 rounded-2xl border border-border">
              {(['cabeza', 'rostro', 'ropa', 'colores'] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                      : 'text-subtext hover:text-text hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="glass-card p-8 flex-1 border-white/5 bg-surface/50 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-8"
                >
                  {activeCategory === 'cabeza' && (
                    <div className="space-y-8">
                       <OptionGrid 
                        label="Peinado" 
                        options={AVATAR_OPTIONS.top} 
                        current={localConfig.top} 
                        onSelect={(v, p) => handleUpdate('top', v, p)} 
                       />
                       <OptionGrid 
                        label="Vello Facial" 
                        options={AVATAR_OPTIONS.facialHair} 
                        current={localConfig.facialHair} 
                        onSelect={(v, p) => handleUpdate('facialHair', v, p)} 
                       />
                    </div>
                  )}

                  {activeCategory === 'rostro' && (
                    <div className="space-y-8">
                       <OptionGrid 
                        label="Ojos" 
                        options={AVATAR_OPTIONS.eyes} 
                        current={localConfig.eyes} 
                        onSelect={(v, p) => handleUpdate('eyes', v, p)} 
                       />
                       <OptionGrid 
                        label="Boca" 
                        options={AVATAR_OPTIONS.mouth} 
                        current={localConfig.mouth} 
                        onSelect={(v, p) => handleUpdate('mouth', v, p)} 
                       />
                    </div>
                  )}

                  {activeCategory === 'ropa' && (
                    <div className="space-y-8">
                       <OptionGrid 
                        label="Vestimenta" 
                        options={AVATAR_OPTIONS.clothing} 
                        current={localConfig.clothing} 
                        onSelect={(v, p) => handleUpdate('clothing', v, p)} 
                       />
                       <OptionGrid 
                        label="Accesorios" 
                        options={AVATAR_OPTIONS.accessories} 
                        current={localConfig.accessories} 
                        onSelect={(v, p) => handleUpdate('accessories', v, p)} 
                       />
                    </div>
                  )}

                  {activeCategory === 'colores' && (
                    <div className="space-y-8">
                       <ColorGrid 
                        label="Color de Pelo" 
                        colors={AVATAR_OPTIONS.hairColor} 
                        current={localConfig.hairColor} 
                        onSelect={(v) => handleUpdate('hairColor', v, false)} 
                       />
                       <ColorGrid 
                        label="Color de Ropa" 
                        colors={AVATAR_OPTIONS.clothingColor} 
                        current={localConfig.clothingColor} 
                        onSelect={(v) => handleUpdate('clothingColor', v, false)} 
                       />
                       <ColorGrid 
                        label="Tono de Piel" 
                        colors={AVATAR_OPTIONS.skinColor} 
                        current={localConfig.skinColor} 
                        onSelect={(v) => handleUpdate('skinColor', v, false)} 
                       />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}

function OptionGrid({ label, options, current, onSelect }: { label: string, options: any[], current: string, onSelect: (id: string, premium: boolean) => void }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">{label}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((opt: any) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id, opt.premium)}
            className={`p-4 rounded-xl border-2 transition-all text-left relative group ${
              current === opt.id 
                ? 'border-accent bg-accent/10 text-accent' 
                : 'border-white/5 bg-white/5 text-subtext hover:border-white/20'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-tight italic">{opt.name}</span>
            {opt.premium && (
              <div className="absolute top-2 right-2 text-warning">
                <Sparkles size={12} fill="currentColor" />
              </div>
            )}
            {current === opt.id && (
              <div className="absolute bottom-2 right-2 text-accent">
                <Check size={14} strokeWidth={4} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorGrid({ label, colors, current, onSelect }: { label: string, colors: string[], current: string, onSelect: (color: string) => void }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">{label}</h4>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className={`w-12 h-12 rounded-xl border-2 transition-all relative ${
              current === color 
                ? 'border-accent scale-110 shadow-lg' 
                : 'border-white/5 hover:border-white/20'
            }`}
            style={{ backgroundColor: `#${color}` }}
          >
            {current === color && (
              <div className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                <Check size={16} strokeWidth={4} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
