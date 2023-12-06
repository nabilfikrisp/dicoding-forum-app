import { type AxiosError } from 'axios';
import { type TResponse } from './index.interface';
import { type TUser } from './user.interface';

export type TRegistrationReqBody = {
  name: string;
  email: string;
  password: string;
};

export type TLoginReqBody = {
  email: string;
  password: string;
};

export type TRegisterResponse = TResponse<{
  user: TUser;
}>;

export type TAuthState = {
  token: string | null;
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  isLoggedIn: boolean;
  myProfile: TUser | null;
};
