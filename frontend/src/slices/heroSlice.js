import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroInfo: localStorage.getItem("heroInfo")
    ? JSON.parse(localStorage.getItem("heroInfo"))
    : null,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHero: (state, action) => {
      console.log(action.payload);
      state.heroInfo = action.payload;
      localStorage.setItem("heroInfo", JSON.stringify(action.payload));
    },
    logoutHero: (state, action) => {
      state.heroInfo = null;
      localStorage.removeItem("heroInfo");
    },
  },
});

export const { setHero, logoutHero } = heroSlice.actions;

export default heroSlice.reducer;
