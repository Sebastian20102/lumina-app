'use client';

import { create } from 'zustand';
import { useUserStore } from './store';

interface SoundState {
  playSuccess: () => void;
  playError: () => void;
  playClick: () => void;
  playXp: () => void;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  playSuccess: () => {
    const enabled = useUserStore.getState().settings.appearance.sounds;
    if (!enabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  },

  playError: () => {
    const enabled = useUserStore.getState().settings.appearance.sounds;
    if (!enabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  },

  playClick: () => {
    const enabled = useUserStore.getState().settings.appearance.sounds;
    if (!enabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.1;
    audio.play().catch(() => {});
  },

  playXp: () => {
    const enabled = useUserStore.getState().settings.appearance.sounds;
    if (!enabled) return;
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }
}));
