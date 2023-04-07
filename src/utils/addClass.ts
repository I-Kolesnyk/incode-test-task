import { useLocation } from 'react-router-dom';

export const addClass = () => {
    const {pathname} = useLocation();
    if (pathname !== '/auth') {   
      return 'wide';
    }
  };