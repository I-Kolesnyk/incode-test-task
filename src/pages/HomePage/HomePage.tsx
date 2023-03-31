import React, { FC, useCallback } from 'react';
import { useAppDispatch } from 'redux/store';
import { userSignOut, refreshToken } from 'redux/auth/operations';

const HomePage: FC = () => {  
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => dispatch(userSignOut()), [dispatch]);
  const handleTokenRefresh = useCallback(() => dispatch(refreshToken()), [dispatch]);

  return (
    <>
      <h1>Congratulations</h1>
      <p>
        Now you are on the main page. Soon we will provide you with detailed
        feedback on the result of your work
      </p>
      <button onClick = {handleSignOut}>Log Out</button>
      <button onClick = {handleTokenRefresh}>token</button>
    </>
  );
};

export default HomePage;
