import { type AxiosError } from 'axios';
import { type TUser } from './user.interface';
import { type TResponse } from './index.interface';

export type TLeaderBoard = {
  user: TUser;
  score: string;
};

export type TLeaderBoardState = {
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  leaderboards: TLeaderBoard[];
};

export type TLeaderBoardResponse = TResponse<{
  leaderboards: TLeaderBoard[];
}>;
