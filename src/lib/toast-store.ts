import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'xp' | 'error';
  amount?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type'], amount?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type, amount) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, amount }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
