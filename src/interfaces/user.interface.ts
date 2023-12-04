import { AxiosError } from 'axios';
import { TResponse } from './index.interface';

export type TUserResponse = TResponse<{
  users: TUser[];
}>;

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type TUserState = {
  users: TUser[];
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
};
