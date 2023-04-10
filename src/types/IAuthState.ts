export interface IAuthState {
  userData: {        
    accessToken: string | null;
    refreshToken:string | null;
  } | null;
  isLoggedIn: boolean;
  isNewUser: boolean;  
}