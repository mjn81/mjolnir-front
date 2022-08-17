import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import AdminRouter from './admin';
import AppRouter from './app';
import AuthRouter from './auth';
import LandingRouter from './landing';

import 'styles/global.css';

export const RouteManager = () => {
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
        <Route
          path="app/*"
          element={<AppRouter />}
        />
        <Route
          path="admin/*"
          element={<AdminRouter />}
        />
      </Routes>
    </Router>
  );
};
