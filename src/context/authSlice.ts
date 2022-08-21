import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: any;
}

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
    },
  },
});

export const { setAuth, logout } =
  authSlice.actions;
export default authSlice.reducer;
