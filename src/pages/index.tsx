import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AdminRouter from './admin';
import AppRouter from './app';
import AuthRouter from './auth';
import LandingRouter from './landing';

import 'styles/global.css';
import { useAppSelector } from 'hooks';
import { USER_ROLES } from 'constants/index';

export const RouteManager = () => {
  const { isAuthenticated, user } =
    useAppSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={<LandingRouter />}
        />
        <Route
          path="auth/*"
          element={<AuthRouter />}
        />
        {!isAuthenticated ? (
          <Route
            path="app/*"
            element={
              <Navigate to="/auth/login" />
            }
          />
        ) : (
          <Route
            path="app/*"
            element={<AppRouter />}
          />
        )}
        {!isAuthenticated &&
        user &&
        user.role === USER_ROLES.ADMIN ? (
          <Route
            path="admin/*"
            element={
              <Navigate to="/auth/login" />
            }
          />
        ) : (
          <Route
            path="admin/*"
            element={<AdminRouter />}
          />
        )}
      </Routes>
    </Router>
  );
};
