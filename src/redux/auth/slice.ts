import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userSignUp, userSignIn, refreshToken } from './operations';
import { IAuthState } from 'types/types';

const initialState: IAuthState = {
  userData: {       
    accessToken:  null,
    refreshToken:  null,
  },
  isLoggedIn: false,
  error:  null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        userSignUp.fulfilled,
        (state, action: PayloadAction<IAuthState['userData']>) => {
          state.userData = action.payload;
        }
      )
      .addCase(
        userSignIn.fulfilled,
        (state, action: PayloadAction<IAuthState['userData']>) => {
          state.userData = action.payload;
          state.isLoggedIn = true;
        }
      )
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
      });
  },
});

export const authReducer = authSlice.reducer;
