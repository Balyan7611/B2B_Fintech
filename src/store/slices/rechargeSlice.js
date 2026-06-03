import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiList: [
    { id: 1, apiId: '1', name: 'SoniTechno', createDate: '09/08/2022 22:33:10', lastUpdate: '16/05/2025 17:49:57', status: true }
  ],
  apiBalances: [
    { id: 1, name: 'SoniTechno', balance: 'Rs. Invalid IP and Token' }
  ],
  isLoading: false
};

const rechargeSlice = createSlice({
  name: 'recharge',
  initialState,
  reducers: {
    toggleApiStatus: (state, action) => {
      const api = state.apiList.find(a => a.id === action.payload);
      if (api) api.status = !api.status;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { toggleApiStatus, setLoading } = rechargeSlice.actions;
export default rechargeSlice.reducer;
