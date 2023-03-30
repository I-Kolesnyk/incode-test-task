import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface MyKnownError {
 message: string;
}

axios.defaults.baseURL = 'https://expa.fly.dev';

// const accessToken = {
//   set(accessToken : string) {
//     axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
//   },
//   unset() {
//     axios.defaults.headers.Authorization = '';
//   },
// };

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
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message as MyKnownError['message']);
      }
      
    }
  }
);
