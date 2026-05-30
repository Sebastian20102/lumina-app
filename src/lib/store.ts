import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyQuest {
  id: string;
  title: string;
  target: number;
  current: number;
  reward: number;
  completed: boolean;
  type: 'xp' | 'lesson' | 'streak';
}

interface UserState {
  username: string;
  email: string;
  bio: string;
  xp: number;
  gems: number;
  level: number;
  streak: number;
  inventory: string[];
  completedLessons: string[];
  dailyQuests: DailyQuest[];
  avatarConfig: {
    seed: string;
    accessories: string;
    top: string;
    hairColor: string;
    facialHair: string;
    eyes: string;
    mouth: string;
    clothing: string;
    clothingColor: string;
    skinColor: string;
    background: string;
  };
  settings: {
    notifications: {
      reminders: boolean;
      achievements: boolean;
      ranking: boolean;
      marketing: boolean;
    };
    privacy: {
      publicProfile: boolean;
      showStreak: boolean;
      showLevel: boolean;
    };
    appearance: {
      theme: 'dark' | 'light' | 'system';
      animations: boolean;
      sounds: boolean;
    };
  };
  addXP: (amount: number) => void;
  addGems: (amount: number) => void;
  buyItem: (itemId: string, cost: number) => boolean;
  completeLesson: (lessonId: string) => void;
  resetStreak: () => void;
  updateAvatar: (config: Partial<UserState['avatarConfig']>) => void;
  updateSettings: (section: keyof UserState['settings'], config: any) => void;
  updateProfile: (profile: { username?: string; email?: string; bio?: string }) => void;
  updateQuestProgress: (type: DailyQuest['type'], amount: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: 'JONATHAN DEV',
      email: 'jonathan@dev.com',
      bio: 'Aprendiendo a construir el futuro, una línea de código a la vez. 🚀',
      xp: 0,
      gems: 500, // Saldo inicial
      level: 1,
      streak: 1,
      inventory: [],
      completedLessons: [],
      dailyQuests: [
        { id: 'q1', title: 'Ganar 100 XP', target: 100, current: 0, reward: 50, completed: false, type: 'xp' },
        { id: 'q2', title: 'Completar 2 lecciones', target: 2, current: 0, reward: 100, completed: false, type: 'lesson' },
        { id: 'q3', title: 'Mantener la racha', target: 1, current: 1, reward: 30, completed: false, type: 'streak' },
      ],
      avatarConfig: {
        seed: 'Jonathan',
        accessories: 'none',
        top: 'shortFlat',
        hairColor: '2c1b18',
        facialHair: 'none',
        eyes: 'default',
        mouth: 'default',
        clothing: 'graphicShirt',
        clothingColor: '3c4f5c',
        skinColor: 'edb98a',
        background: 'transparent',
      },
      settings: {
        notifications: {
          reminders: true,
          achievements: true,
          ranking: true,
          marketing: false,
        },
        privacy: {
          publicProfile: true,
          showStreak: true,
          showLevel: true,
        },
        appearance: {
          theme: 'dark',
          animations: true,
          sounds: true,
        },
      },
      
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        
        // Recompensa en gemas por subir de nivel
        let bonusGems = 0;
        if (newLevel > state.level) {
          bonusGems = 100;
        }

        get().updateQuestProgress('xp', amount);

        return { 
          xp: newXP, 
          level: newLevel,
          gems: state.gems + bonusGems
        };
      }),

      addGems: (amount) => set((state) => ({ gems: state.gems + amount })),

      buyItem: (itemId, cost) => {
        const state = get();
        if (state.gems >= cost && !state.inventory.includes(itemId)) {
          set({
            gems: state.gems - cost,
            inventory: [...state.inventory, itemId]
          });
          return true;
        }
        return false;
      },

      completeLesson: (lessonId) => set((state) => {
        if (state.completedLessons.includes(lessonId)) return state;
        get().updateQuestProgress('lesson', 1);
        return { completedLessons: [...state.completedLessons, lessonId] };
      }),

      resetStreak: () => set({ streak: 0 }),

      updateAvatar: (config) => set((state) => ({
        avatarConfig: { ...state.avatarConfig, ...config }
      })),

      updateSettings: (section, config) => set((state) => ({
        settings: {
          ...state.settings,
          [section]: { ...state.settings[section], ...config }
        }
      })),

      updateProfile: (profile) => set((state) => ({
        ...state,
        ...profile
      })),

      updateQuestProgress: (type, amount) => set((state) => ({
        dailyQuests: state.dailyQuests.map(q => {
          if (q.type === type && !q.completed) {
            const newCurrent = Math.min(q.current + amount, q.target);
            const justCompleted = newCurrent === q.target;
            if (justCompleted) {
              get().addGems(q.reward);
            }
            return { ...q, current: newCurrent, completed: justCompleted };
          }
          return q;
        })
      })),
    }),
    {
      name: 'mimo-user-storage',
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        avatarConfig: {
          ...currentState.avatarConfig,
          ...(persistedState?.avatarConfig || {}),
        },
        settings: {
          ...currentState.settings,
          ...(persistedState?.settings || {}),
        }
      }),
    }
  )
);

export const getAvatarUrl = (config: UserState['avatarConfig']) => {
  const params = new URLSearchParams({
    seed: config.seed || 'default',
    top: config.top || 'shortFlat',
    accessories: config.accessories === 'none' ? '' : (config.accessories || ''),
    hairColor: config.hairColor || '2c1b18',
    facialHair: config.facialHair === 'none' ? '' : (config.facialHair || ''),
    eyes: config.eyes || 'default',
    mouth: config.mouth || 'default',
    clothing: config.clothing || 'graphicShirt',
    clothingColor: config.clothingColor || '3c4f5c',
    skinColor: config.skinColor || 'edb98a',
  });

  return `https://api.dicebear.com/9.x/avataaars/svg?${params.toString()}`;
};
