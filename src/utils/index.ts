import axios from "axios";
import jwt_decode from "jwt-decode";
import { store } from 'redux/store';
import { refreshToken } from "redux/auth/operations";


export const axiosPublic = axios.create({
    baseURL: "https://expa.fly.dev",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const axiosPrivate = axios.create({
    baseURL: "https://expa.fly.dev",
    headers: {
      "Content-Type": "application/json",
    },
  });

axiosPrivate.interceptors.request.use(
    async (config) => {
      const user = store?.getState()?.userData;
  
      const currentDate = new Date();
      if (user?.accessToken) {
        const decodedToken: { exp: number } = jwt_decode(user?.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await store.dispatch(refreshToken());
          if (config?.headers) {
            config.headers["authorization"] = `Bearer ${
              store?.getState()?.userData?.accessToken
            }`;
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

