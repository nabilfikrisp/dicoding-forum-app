import { AxiosError } from 'axios';
import { TUser } from './user.interface';
import { TResponse } from './index.interface';

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
