import { AppLayout } from 'layouts';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './category';
import CreateCategory from './category/create';
import EditCategory from './category/edit';
import HomePage from './home';

const AppRouter = () => {
  return (
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
      </Route>
    </Routes>
  );
};

export default AppRouter;
