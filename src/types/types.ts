export interface IUserRegistration {
  id: number;
  password: string;
  username: string;
  displayName: string;
}

export interface IAuthState {
  userData: {        
    accessToken: string | null;
    refreshToken:string | null;
  } | null;
  isLoggedIn: boolean;
  isNewUser: boolean;
  error: string | null;  
}