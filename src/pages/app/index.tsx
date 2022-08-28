import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from 'layouts';
import Loading from 'pages/loading';
const HomePage = React.lazy(
  () => import('./home'),
);
const Drive = React.lazy(() => import('./drive'));
const Categories = React.lazy(
  () => import('./category'),
);
const CreateCategory = React.lazy(
  () => import('./category/create'),
);
const EditCategory = React.lazy(
  () => import('./category/edit'),
);
const Upload = React.lazy(
  () => import('./drive/upload'),
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<HomePage />} />
          <Route
            path="categories"
            element={<Categories />}
          />
          <Route
            path="categories/create"
            element={<CreateCategory />}
          />
          <Route
            path="categories/edit/:id"
            element={<EditCategory />}
          />
          <Route
            path="drive"
            element={<Drive />}
          />
          <Route
            path="drive/upload"
            element={<Upload />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
