import create from 'zustand';
import {
  persist,
  devtools,
} from 'zustand/middleware';
import { IUser, IUserState } from './models';

const userInit: IUser = {
  id: '',
  email: '',
  name: '',
  username: '',
  role: '',
  usage: {
    limit: '0',
    used: '0',
  },
};

export const useAuthStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        loggedin: false,
        token: '',
        user: userInit,
        login: (user: IUser, token: string) =>
          set({ user, token, loggedin: true }),
        logout: () =>
          set({
            user: userInit,
            token: '',
            loggedin: false,
          }),
      }),
      {
        name: 'auth-state',
      },
    ),
  ),
);
