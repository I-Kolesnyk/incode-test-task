import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <>
      <header>
        <div>
          <a href="#">InCode</a>
          <p>Finance</p>
        </div>
      </header>
      <main>
        <div>
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
          </Suspense>
        </div>
      </main>
      ;
    </>
  );
};

export default Layout;
