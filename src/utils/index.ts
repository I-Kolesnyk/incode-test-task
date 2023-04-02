import axios from 'axios';
import { store } from 'redux/store';
import { refreshToken } from 'redux/auth/operations';

export const axiosPublic = axios.create({
  baseURL: 'https://expa.fly.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: 'https://expa.fly.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosPrivate.interceptors.request.use(
  async config => {
    const accessToken = store?.getState()?.userData?.accessToken;
    if (accessToken) {
      await store.dispatch(refreshToken());
      if (config?.headers) {
        config.headers['Authorization'] = `Bearer ${
          store?.getState()?.userData?.accessToken
        }`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
