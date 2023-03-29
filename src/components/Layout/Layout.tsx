import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = (): JSX.Element => {
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
          <Outlet />
        </div>
      </main>
      ;
    </>
  );
};

export default Layout;
