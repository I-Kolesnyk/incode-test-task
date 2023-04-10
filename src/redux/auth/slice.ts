import { createSlice } from '@reduxjs/toolkit';
import {
  userSignUp,
  userSignIn,
  userSignOut,
  refreshToken,
} from './operations';
import { IAuthState } from 'types';

const initialState: IAuthState = {
  userData: {
    accessToken: null,
    refreshToken: null,
  },
  isLoggedIn: false,
  isNewUser: false,
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsNewUser(state, action) {
      state.isNewUser = action.payload;
    },
    
  },
  extraReducers: builder => {
    builder
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
        state.isLoggedIn = true;
      })
      .addCase(userSignOut.fulfilled, state => {
        state.userData = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
      })
      ;
  },
});

export const authReducer = authSlice.reducer;
export const { setIsNewUser } = authSlice.actions;
