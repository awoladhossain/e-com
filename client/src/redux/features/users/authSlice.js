import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const isUserAvailable = localStorage.getItem("user");
    if (isUserAvailable === null) {
      return {
        user: null,
      };
    }
    return {
      user: JSON.parse(isUserAvailable),
    };
  } catch (error) {
    console.error(error);
    return {
      user: null,
    };
  }
};

const initialState = loadUserFromLocalStorage();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
