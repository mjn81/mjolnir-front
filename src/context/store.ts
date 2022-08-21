import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import authReducer from './authSlice';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'auth',
  storage: storage,
};
const persistedAuthReducer = persistReducer(
  persistConfig,
  authReducer,
);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<
  typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;
