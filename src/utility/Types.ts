export interface IAuthBody {
  username: string;
  displayName: string;
  email: string;
  password: string;
  rememberCheck: boolean;
}

export interface IUserData {
  id: number;
  displayName: string;
  email: string;
}
