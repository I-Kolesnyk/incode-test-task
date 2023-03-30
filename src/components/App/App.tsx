import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';

const AuthPage = lazy(() => import('pages/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage'));

// const PageNotFound = lazy(() => import('pages/NotFound'));

const App: FC = () : JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthPage />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
