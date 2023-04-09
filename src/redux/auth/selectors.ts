import { RootState } from 'types';

export const selectIsLoggedIn = (state : RootState) => state.isLoggedIn;
export const selectAccessToken = (state : RootState) => state.userData?.accessToken;
export const selectError = (state : RootState) => state.error;
export const selectIsNewUser = (state : RootState) => state.isNewUser;