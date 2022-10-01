import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from 'layouts';
import Loading from 'pages/loading';
import Settings from './settings';
const HomePage = React.lazy(
  () => import('./home'),
);
const Drive = React.lazy(() => import('./drive'));
const Categories = React.lazy(
  () => import('./category'),
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route
            path="tags"
            element={<Categories />}
          />
          <Route
            path="drive"
            element={<Drive />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
