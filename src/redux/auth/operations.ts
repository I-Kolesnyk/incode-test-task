import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic, axiosPrivate } from 'utils/axios';
import { MyKnownError, RootState } from 'types';

export const userSignUp = createAsyncThunk(
  'auth/register',
  async (
    user: { username: string; password: string; displayName: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axiosPublic.post(`/auth/register`, user);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request failed with status code 409') {
          return thunkAPI.rejectWithValue(
            alert(
              'Username is already used by another user'
            ) as MyKnownError['message']
          );
        }
      }
    }
  }
);

export const userSignIn = createAsyncThunk(
  'auth/login',
  async (user: { username: string; password: string }, thunkAPI) => {
    try {
      const { data } = await axiosPublic.post(`/auth/login`, user);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return thunkAPI.rejectWithValue(
          error.message as MyKnownError['message']
        );
      }
    }
  }
);

export const userSignOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    
    try {
      const response = await axiosPrivate.get('/auth/logout');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message as MyKnownError['message']
        );
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await axiosPublic.post('/auth/refresh', {
        refreshToken: state.userData?.refreshToken,
      });

      const refreshUserData = {
        ...state.userData,
        accessToken: response.data.accessToken,
      };     
      return refreshUserData;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message as MyKnownError['message']
        );
      }
    }
  }
);
