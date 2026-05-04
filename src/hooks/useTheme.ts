import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme(): [Theme, () => void] {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('portfolio-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}
