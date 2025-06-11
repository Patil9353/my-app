import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // {email:string} or null
  isAuthenticated: false,
  error: null,
};

const validUser  = {
  email:'user@example.com',
  password:'password',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      if (email === validUser.email && password === validUser.password) {
        state.user = { email };
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
