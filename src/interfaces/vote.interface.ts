import { type AxiosError } from 'axios';
import { type TResponse } from './index.interface';

export type TVote = {
  id: string;
  userId: string;
  threadId: string;
  voteType: number;
};

export type TVoteResponse = TResponse<{
  vote: TVote;
}>;

export type TVoteState = {
  loading: boolean;
  message: string | unknown;
  error: AxiosError | null;
  vote: TVote | null;
};
