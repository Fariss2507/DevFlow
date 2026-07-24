import { create } from 'zustand';

// Helper function to apply the theme to the DOM
const applyThemeToDOM = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Retrieve saved theme from localStorage, default to 'light'
const getSavedTheme = () => {
  const saved = localStorage.getItem('devflow_theme');
  return saved === 'dark' || saved === 'light' ? saved : 'light';
};

const initialTheme = getSavedTheme();

// Apply it immediately during module execution to prevent layout flashing
applyThemeToDOM(initialTheme);

export const useThemeStore = create((set) => ({
  theme: initialTheme,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyThemeToDOM(newTheme);
    localStorage.setItem('devflow_theme', newTheme);
    return { theme: newTheme };
  }),
}));
