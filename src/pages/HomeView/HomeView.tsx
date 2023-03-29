import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const HomeView  : FC = () => {
  return (
    <>
      <h1>Congratulations</h1>
      <p>
        Now you are on the main page. Soon we will provide you with detailed
        feedback on the result of your work
      </p>
      )<Link to={'/login'}>Log Out</Link>
    </>
  )
};

export default HomeView;