import { AxiosError } from 'axios';
import { TResponse } from './index.interface';
import { TUser } from './user.interface';
import { TComment } from './comment.interface';

export type TCreateThreadReqBody = {
  title: string;
  category?: string;
  body: string;
};

export type TCreateThreadResponse = TResponse<{
  thread: TThread;
}>;

export type TThreadsResponse = TResponse<{
  threads: TThread[];
}>;

export type TDetailThreadResponse = TResponse<{
  detailThread: TDetailThread;
}>;

export type TDetailThread = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Omit<TUser, 'email'>;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: TComment[];
};

export type TThread = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
};

export type TThreadState = {
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  threads: TThread[];
  detailThread: TDetailThread | null;
  categoryCount: Record<string, number>;
};
