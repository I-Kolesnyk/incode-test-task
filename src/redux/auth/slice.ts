import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userSignUp, userSignIn } from './operations';

interface IAuthState {
  // user: { username: string; password: string; displayName?: string };
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
  isFetchingCurrentUser: boolean;
}

// interface IUserRegister {

//   accessToken: string | null;
// }
interface IUserLogin {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(userSignUp.fulfilled, state => {
        state.isLoggedIn = true;
      })
      .addCase(
        userSignIn.fulfilled,
        (state, action: PayloadAction<IUserLogin>) => {
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
        }
      )
      // .addCase(
      //   userSignIn.rejected,
      //   (state, action: PayloadAction<IAuthState>) => {
      //     state.error = action.payload.error;
      //   }
      // ),
});

export const authReducer = authSlice.reducer;
