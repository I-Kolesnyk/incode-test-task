import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import PublicRoute from 'routes/PublicRoute';
import PrivateRoute from 'routes/PrivateRoute';

const AuthPage = lazy(() => import('pages/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage'));

// const PageNotFound = lazy(() => import('pages/NotFound'));

const App: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route
          index
          element={
            <PublicRoute redirectTo="/home" restricted>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path={'home'}
          element={
            <PrivateRoute redirectTo="/" restricted>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
