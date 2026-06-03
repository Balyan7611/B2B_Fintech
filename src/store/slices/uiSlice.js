import { createSlice } from '@reduxjs/toolkit';

// Read saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
// Apply immediately to avoid flash
document.documentElement.setAttribute('data-theme', savedTheme);

const initialState = {
  isNavScrolled: false,
  isMobileMenuOpen: false,
  isDarkMode: savedTheme === 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNavScrolled: (state, action) => {
      state.isNavScrolled = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      const theme = state.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
  },
});

export const { setNavScrolled, toggleMobileMenu, setMobileMenuOpen, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
