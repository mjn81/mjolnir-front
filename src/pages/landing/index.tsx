import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landing';

const LandingRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default LandingRouter;
