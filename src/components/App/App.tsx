import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';

const AuthPage = lazy(() => import('pages/AuthView'));
const HomePage = lazy(() => import('pages/HomeView'));

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
