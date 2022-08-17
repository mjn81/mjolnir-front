import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AdminRouter from './admin';
import AppRouter from './app';
import AuthRouter from './auth';

export const RouteManager = () => {
  return (
    <Router>
      <Routes>
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
