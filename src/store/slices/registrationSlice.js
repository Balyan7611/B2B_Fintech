import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  currentStep: 1,
  memberType: '',
  mobile: '',
  generatedOtp: '',
  isOtpSent: false,
  isOtpVerified: false,
  pan: '',
  isPanVerified: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    openModal: (state) => { state.isOpen = true; },
    closeModal: () => ({ ...initialState }),
    nextStep: (state) => { if (state.currentStep < 4) state.currentStep += 1; },
    setMemberType: (state, action) => { state.memberType = action.payload; },
    setMobile: (state, action) => { state.mobile = action.payload; },
    generateAndSendOtp: (state) => {
      state.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      state.isOtpSent = true;
    },
    setOtpVerified: (state) => { state.isOtpVerified = true; },
    setPan: (state, action) => { state.pan = action.payload; },
    setPanVerified: (state) => { state.isPanVerified = true; },
  },
});

export const {
  openModal, closeModal, nextStep,
  setMemberType, setMobile, generateAndSendOtp,
  setOtpVerified, setPan, setPanVerified,
} = registrationSlice.actions;
export default registrationSlice.reducer;
