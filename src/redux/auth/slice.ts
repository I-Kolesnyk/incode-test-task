import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  userSignUp,
  userSignIn,
  userSignOut,
  refreshToken,
} from './operations';
import { RootState } from 'redux/store';
import { IAuthState } from 'types/types';

const initialState: IAuthState = {
  userData: {
    accessToken: null,
    refreshToken: null,
  },
  isLoggedIn: false,
  isNewUser: false,
  error: null,
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
      .addCase(userSignUp.rejected, (state, action) => {
        state.error = action.payload as IAuthState['error'];
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
        state.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.error = action.payload as IAuthState['error'];
      })
      .addCase(userSignOut.fulfilled, state => {
        state.userData = null;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .addCase(userSignOut.rejected, (state, action) => {
        state.error = action.payload as IAuthState['error'];
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.userData = action.payload as IAuthState['userData'];
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload as IAuthState['error'];
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(userSignUp.pending, userSignIn.pending, userSignOut.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          userSignUp.fulfilled,
          userSignIn.fulfilled,
          userSignOut.fulfilled
        ),
        handleFulfilled
      );
  },
});

const handlePending = (state: RootState) => {
  state.error = null;
};

const handleFulfilled = (state: RootState) => {
  state.error = null;
};

export const authReducer = authSlice.reducer;
export const {setIsNewUser} = authSlice.actions;
