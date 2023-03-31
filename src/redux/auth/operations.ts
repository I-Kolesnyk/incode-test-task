import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'redux/store';
import { axiosPublic } from 'utils';

interface MyKnownError {
 message?: string;
 code? :number;
}

axios.defaults.baseURL = 'https://expa.fly.dev';

const accessToken = {
  set(accessToken : string) {
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    axios.defaults.headers.Authorization = '';
  },
};

export const userSignUp = createAsyncThunk(
  'auth/register',
  async (
    user: { username: string; password: string; displayName: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(`/auth/register`, user);
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message as MyKnownError['message']);
      }      
    }
  }
);

export const userSignIn = createAsyncThunk(
  'auth/login',
  async (user: { username: string; password: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/auth/login`, user);
      accessToken.set(data.accessToken); 
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message as MyKnownError['message']);
      }
      
    }
  }
);

export const userSignOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.get('/auth/logout');
      accessToken.unset();
      return;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message as MyKnownError['message']);
      }
    }
  }
);


export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
try {
  const response = await axiosPublic.post(`/auth/refresh`, {
    refreshToken: state.userData?.refreshToken,
  });

  const newUserData = {
    ...state.userData,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };

  return newUserData;
} catch (error) {
  if (error instanceof Error) {    
    return thunkAPI.rejectWithValue(error.message as MyKnownError['message']);
}
    
  }}
);

