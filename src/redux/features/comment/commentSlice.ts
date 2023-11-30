import { API } from '@/config/api';
import { commentEndpoint } from '@/enums/endpoints/commentEndpoint.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from '../user/userSlice';

export const REQUEST_CREATE_COMMENT = createAsyncThunk(
  'user/CREATE_COMMENT',
  async (
    { threadId, reqBody }: { threadId: string; reqBody: { content: string } },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post(
        commentEndpoint(threadId).createComment,
        reqBody,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export type TComment = {
  id: string;
  content: string;
  createdAt: string;
  owner: Omit<TUser, 'email'>;
  upVotesBy: string[];
  downVotesBy: string[];
};

type TCommentState = {
  comment: TComment | null;
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
};

const initialState: TCommentState = {
  comment: null,
  loading: false,
  message: null,
  error: null,
};

const commentSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE COMMENT
      .addCase(REQUEST_CREATE_COMMENT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_CREATE_COMMENT.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.comment = payload.data.comment;
        state.error = null;
      })
      .addCase(REQUEST_CREATE_COMMENT.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const COMMENT_REDUCER = commentSlice.reducer;
