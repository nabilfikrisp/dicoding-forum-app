import { AxiosError } from 'axios';
import { TUser } from './user.interface';
import { TResponse } from './index.interface';

export type TComment = {
  id: string;
  content: string;
  createdAt: string;
  owner: Omit<TUser, 'email'>;
  upVotesBy: string[];
  downVotesBy: string[];
};

export type TCommentState = {
  comment: TComment | null;
  vote: {
    id: string;
    userId: string;
    commentId: string;
    voteType: number;
  } | null;
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
};

export type TCreateCommentResponse = TResponse<{
  comment: TComment;
}>;

export type TCommentVote = {
  id: string;
  userId: string;
  commentId: string;
  voteType: number;
};

export type TVoteCommentResponse = TResponse<{
  vote: TCommentVote;
}>;
