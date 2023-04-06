import axios, {Axios} from 'axios';
import { store } from 'redux/store';
import jwt_decode from 'jwt-decode';
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
