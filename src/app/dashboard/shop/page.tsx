'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingBag, Sparkles, Zap, Shield, 
  Crown, Star, Palette, ShoppingCart,
  CheckCircle2, Lock
} from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { useToastStore } from '@/lib/toast-store';
import { useEffect, useState } from 'react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  category: 'avatar' | 'profile' | 'powerup';
  color: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'streak_freeze',
    name: 'Protector de Racha',
    description: 'Mantiene tu racha activa incluso si no estudias por un día.',
    cost: 200,
    icon: <Shield size={24} />,
    category: 'powerup',
    color: 'accent'
  },
  {
    id: 'xp_boost',
    name: 'Potenciador 2x XP',
    description: 'Gana el doble de XP en todas tus lecciones por 1 hora.',
    cost: 150,
    icon: <Zap size={24} />,
    category: 'powerup',
    color: 'warning'
  },
  {
    id: 'crown_badge',
    name: 'Insignia de Corona',
    description: 'Muestra una corona dorada junto a tu nombre en el ranking.',
    cost: 500,
    icon: <Crown size={24} />,
    category: 'profile',
    color: 'warning'
  },
  {
    id: 'neon_theme',
    name: 'Tema Neón Premium',
    description: 'Desbloquea un tema visual vibrante para toda la app.',
    cost: 800,
    icon: <Palette size={24} />,
    category: 'profile',
    color: 'secondary'
  },
  {
    id: 'legendary_avatar',
    name: 'Pack Avatar Legendario',
    description: 'Accesorios exclusivos y raros para tu personaje.',
    cost: 1000,
    icon: <Sparkles size={24} />,
    category: 'avatar',
    color: 'accent'
  }
];

export default function ShopPage() {
  const { gems, inventory, buyItem } = useUserStore();
  const { addToast } = useToastStore();

  const handlePurchase = (item: ShopItem) => {
    if (inventory.includes(item.id)) {
      addToast('Ya tienes este artículo', 'info');
      return;
    }

    if (gems >= item.cost) {
      const success = buyItem(item.id, item.cost);
      if (success) {
        addToast(`¡Has comprado ${item.name}!`, 'success');
      }
    } else {
      addToast('No tienes suficientes gemas', 'warning');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header with Balance */}
      <div className="relative glass-card p-10 overflow-hidden border-accent/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-5xl font-black italic tracking-tighter flex items-center gap-4">
              <ShoppingBag size={48} className="text-accent" />
              BÓVEDA DE RECOMPENSAS
            </h2>
            <p className="text-subtext text-lg max-w-md font-medium">
              Intercambia tus fragmentos de energía por mejoras de élite y personalización legendaria.
            </p>
          </div>
          
          <div className="glass-card p-6 bg-card border-border flex items-center gap-4 backdrop-blur-xl">
             <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-white shadow-xl">
                <Star size={24} fill="white" />
             </div>
             <div>
                <span className="text-[10px] font-bold text-subtext uppercase tracking-widest">Reserva de Energía</span>
                <p className="text-3xl font-black text-text italic">{gems.toLocaleString()} <span className="text-accent">GEMAS</span></p>
             </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategorySection 
          title="Potenciadores" 
          items={SHOP_ITEMS.filter(i => i.category === 'powerup')} 
          inventory={inventory}
          onPurchase={handlePurchase}
          gems={gems}
        />
        <CategorySection 
          title="Perfil y Estilo" 
          items={SHOP_ITEMS.filter(i => i.category === 'profile')} 
          inventory={inventory}
          onPurchase={handlePurchase}
          gems={gems}
        />
        <CategorySection 
          title="Avatar" 
          items={SHOP_ITEMS.filter(i => i.category === 'avatar')} 
          inventory={inventory}
          onPurchase={handlePurchase}
          gems={gems}
        />
      </div>
    </div>
  );
}

function CategorySection({ title, items, inventory, onPurchase, gems }: { 
  title: string, 
  items: ShopItem[], 
  inventory: string[], 
  onPurchase: (item: ShopItem) => void, 
  gems: number 
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black italic uppercase tracking-wider flex items-center gap-3 px-2">
        <Sparkles size={18} className="text-accent" />
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item: ShopItem) => {
          const isOwned = inventory.includes(item.id);
          const canAfford = gems >= item.cost;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className={`glass-card p-6 border-border hover:border-accent/30 transition-all group ${isOwned ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${item.color}/10 text-${item.color} border border-${item.color}/20 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                {isOwned && (
                  <div className="px-2 py-1 rounded-md bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={10} /> Obtenido
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-black italic uppercase tracking-tight">{item.name}</h4>
                <p className="text-xs text-subtext font-medium leading-relaxed">{item.description}</p>
              </div>

              <button
                disabled={isOwned}
                onClick={() => onPurchase(item)}
                className={`w-full mt-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                  isOwned 
                    ? 'bg-white/5 text-muted border border-white/5' 
                    : canAfford
                    ? 'bg-accent text-white shadow-lg shadow-accent/20 hover:scale-[1.02]'
                    : 'bg-white/5 text-subtext border border-white/5 hover:border-danger/30'
                }`}
              >
                {isOwned ? (
                  'Completado'
                ) : (
                  <>
                    <Star size={14} fill="currentColor" />
                    {item.cost} Gemas
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
