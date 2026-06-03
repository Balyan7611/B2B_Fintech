import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeIndex: 0,
  autoPlay: true,
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    nextTestimonial: (state, action) => {
      const total = action.payload;
      state.activeIndex = (state.activeIndex + 1) % total;
    },
    prevTestimonial: (state, action) => {
      const total = action.payload;
      state.activeIndex = (state.activeIndex - 1 + total) % total;
    },
    setAutoPlay: (state, action) => {
      state.autoPlay = action.payload;
    },
  },
});

export const { setActiveIndex, nextTestimonial, prevTestimonial, setAutoPlay } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
