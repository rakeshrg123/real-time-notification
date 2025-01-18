import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null, // Add token field in the initial state
  },
  reducers: {
    // Set user data and token
    setUser: (state, action) => {     
      state.user = action.payload.user;
      state.token = action.payload.token; // Save token
      window.localStorage.setItem('user', JSON.stringify(action.payload));
    },
    // Remove user and token
    removeUser: (state) => {
      state.user = null;
      state.token = null; // Remove token
      window.localStorage.removeItem('user');
    },
    // Set user from local storage
    setUserFromLocalStorage: (state) => {
      var user = window.localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        state.user = user.user;
        state.token = user.token; // Set token from local storage
      } else {
        state.user = null;
        state.token = null; // Reset token
      }
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
