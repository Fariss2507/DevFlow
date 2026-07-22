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

export const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyThemeToDOM(newTheme);
    return { theme: newTheme };
  }),
}));

// Initialize the theme immediately upon store creation to avoid flashing
applyThemeToDOM('light');
