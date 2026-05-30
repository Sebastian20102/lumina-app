'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useUserStore } from '@/lib/store';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (theme: string) => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUserStore((state) => state.settings.appearance.theme);
  const updateSettings = useUserStore((state) => state.updateSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (targetTheme: string) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (targetTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(targetTheme);
      }
    };

    applyTheme(theme);

    // Escuchar cambios en la preferencia del sistema si es modo system
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: string) => {
    updateSettings('appearance', { theme: newTheme });
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
