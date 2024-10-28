export interface IResponseApi {
  status: number;
  message: string;
  total: number;
  data: any[];
}

export interface IAuthBody {
  username: string;
  displayName: string;
  email: string;
  password: string;
  rememberCheck: boolean;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface IUserData {
  id: number;
  displayName: string;
  email: string;
}

export interface ITitleBubble {
  title: string
}
