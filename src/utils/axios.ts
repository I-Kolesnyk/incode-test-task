import axios, { Axios } from 'axios';
import { store } from 'redux/store';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { refreshToken } from 'redux/auth/operations';


export const axiosPublic = axios.create({
  baseURL: 'https://expa.fly.dev',
  headers: {
    'Content-Type': 'application/json',
  },
}) as Axios;

export const axiosPrivate = axios.create({
  baseURL: 'https://expa.fly.dev',
  headers: {
    'Content-Type': 'application/json',
  },
}) as Axios;

axiosPrivate.interceptors.request.use(
  async config => {
    const accessToken = store?.getState()?.userData?.accessToken;
    const currentDate = new Date();
    if (accessToken) {
      const decodedAccessToken: { exp: number } = jwt_decode(accessToken);
      if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config?.headers) {
          config.headers['Authorization'] = `Bearer ${
            store?.getState()?.userData?.accessToken
          }`;
        }
      } else {
        if (config?.headers) {
          config.headers['Authorization'] = `Bearer ${
            store?.getState()?.userData?.accessToken
          }`;
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  async response => {
    if ((response.data.status = 201 && response.config.url === '/auth/login')) {
      toast.success('You successfully sign in!');
      return response;
    }
    if (
      (response.data.status = 201 && response.config.url === '/auth/register')
    ) {
      toast.success('You have been successfully registered! Please sign in');
      return response;
    }
    return response;
  },
  async error => {  
    if (!error.response) {
      toast.error('Please check your internet connection and try again!');
    }
    if (error.response.status === 404 && error.config.url === '/auth/login') {
      toast.error('User is not found. Please sign up!');
    }
    if (error.response.status === 401 && error.config.url === '/auth/login') {
      toast.error('Invalid sign in data.');
    }
    if (
      error.response.status === 400 &&
      error.config.url === '/auth/register'
    ) {
      toast.error('Password must be at least 8 characters long.');
    }
    if (
      error.response.status === 409 &&
      error.config.url === '/auth/register'
    ) {
      toast.error('User with such username is already exist.');
    }
    if (error.response.status === 403 && error.config.url === '/auth/refresh') {     
      toast.error('Please sign in!');
      return (window.location.href = '/auth');
    }
    if (error.response.status === 404 && error.config.url !== '/auth/login') {
      toast.error('Something has happened. Please try again later.');
    }
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  response => response,
  async error => { 
    if (!error.response) {
      toast.error('Please check your internet connection and try again!');
    }
    if (error.response.status === 401 && error.config.url === '/auth/logout') {
      toast.error('Please sign in!');
      return (window.location.href = '/auth');
    }
    if (error.response.status === 403 && error.config.url === '/auth/logout') {      
      toast.error('Please sign in!');
      return (window.location.href = '/auth');
    }
    if (error.response.status === 404) {
      toast.error('Something has happened. Please try again later.');
    }
    return Promise.reject(error);
  }
);
