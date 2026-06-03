import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0];

const initialState = {
  isSidebarOpen: true,
  isQuickActionsOpen: false,
  selectedDate: today,
  wallets: { aeps: 320242.53, main: 111379.00, profit: 0.00 },
  memberCounts: { admin: 1, masterDist: 9, distributor: 49, retailer: 603, apiUser: 16, unique: 1 },
  hoveredMenu: null,
  isMemberDropdownOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.isSidebarOpen = !state.isSidebarOpen; },
    setSidebarOpen: (state, action) => { state.isSidebarOpen = action.payload; },
    toggleQuickActions: (state) => { state.isQuickActionsOpen = !state.isQuickActionsOpen; },
    setQuickActionsOpen: (state, action) => { state.isQuickActionsOpen = action.payload; },
    setSelectedDate: (state, action) => { state.selectedDate = action.payload; },
    setHoveredMenu: (state, action) => { state.hoveredMenu = action.payload; },
    setIsMemberDropdownOpen: (state, action) => { state.isMemberDropdownOpen = action.payload; },
  },
});

export const { 
  toggleSidebar, 
  setSidebarOpen, 
  toggleQuickActions, 
  setQuickActionsOpen, 
  setSelectedDate, 
  setHoveredMenu, 
  setIsMemberDropdownOpen 
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
