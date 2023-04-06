import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutComponent from 'components/Layout';
import PublicRoute from 'routes/PublicRoute';
import PrivateRoute from 'routes/PrivateRoute';
// import "./App.scss";

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));

// const PageNotFound = lazy(() => import('pages/NotFound'));

const App: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={< LayoutComponent />}>
      <Route
          index
          element={
            <PrivateRoute redirectTo="/auth" restricted>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
         path={'auth'}
          index
          element={
            <PublicRoute redirectTo="/" restricted>
              <AuthPage />
            </PublicRoute>
          }
        />       
      </Route>
    </Routes>
  );
};

export default App;
