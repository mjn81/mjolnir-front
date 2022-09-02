import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const AdminRouter = React.lazy(
  () => import('./admin'),
);
const AppRouter = React.lazy(
  () => import('./app'),
);
const AuthRouter = React.lazy(
  () => import('./auth'),
);
import Loading from './loading';
const LandingRouter = React.lazy(
  () => import('./landing'),
);

import 'styles/global.css';
import { useAppSelector } from 'hooks';
import { USER_ROLES } from 'constants/index';

export const RouteManager = () => {
  const { isAuthenticated, user } =
    useAppSelector((state) => state.auth);
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};
