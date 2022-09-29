import create from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

const userInit: User = {
  id: '',
  email: '',
  name: '',
  username: '',
  role: '',
};

export const useAuthStore = create((set) => ({
  user: userInit,
  setUser: (user: User) => set({ user }),
}));
