import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  isLoggedIn: false,
  isLoggedOut: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoggedOut = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.isLoggedOut = true;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export const currentUser = (state) => state.user.currentUser;
export const isFetching = (state) => state.user.isFetching;
export const error = (state) => state.user.error;
export const isLoggedIn = (state) => state.user.isLoggedIn;
export default userSlice.reducer;
