import { API } from '@/config/api';
import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';
import { COMMENT_ENDPOINT } from '@/endpoints/comment.endpoint';
import {
  type TCommentState,
  type TCreateCommentResponse,
  type TVoteCommentResponse,
} from '@/interfaces/comment.interface';

export const REQUEST_CREATE_COMMENT = createAsyncThunk(
  'user/CREATE_COMMENT',
  async (
    { threadId, reqBody }: { threadId: string; reqBody: { content: string } },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post(
        COMMENT_ENDPOINT(threadId).CREATE_COMMENT,
        reqBody,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_UP_VOTE_COMMENT = createAsyncThunk(
  'user/UP_VOTE_COMMENT',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post(
        COMMENT_ENDPOINT(threadId).UP_VOTE_COMMENT(commentId),
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_NEUTRALIZE_VOTE_COMMENT = createAsyncThunk(
  'user/NEUTRALIZE_VOTE_COMMENT',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post(
        COMMENT_ENDPOINT(threadId).NEUTRALIZE_VOTE_COMMENT(commentId),
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_DOWN_VOTE_COMMENT = createAsyncThunk(
  'user/DOWN_VOTE_COMMENT',
  async (
    { threadId, commentId }: { threadId: string; commentId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post(
        COMMENT_ENDPOINT(threadId).DOWN_VOTE_COMMENT(commentId),
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

const initialState: TCommentState = {
  comment: null,
  loading: false,
  message: null,
  error: null,
  vote: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE COMMENT
      .addCase(REQUEST_CREATE_COMMENT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_CREATE_COMMENT.fulfilled,
        (state, { payload }: PayloadAction<TCreateCommentResponse>) => {
          state.loading = false;
          state.message = payload.message;
          state.comment = payload.data.comment;
          state.error = null;
        },
      )
      .addCase(REQUEST_CREATE_COMMENT.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      })
      // UP VOTE COMMENT
      .addCase(REQUEST_UP_VOTE_COMMENT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_UP_VOTE_COMMENT.fulfilled,
        (state, { payload }: PayloadAction<TVoteCommentResponse>) => {
          state.loading = false;
          state.message = payload.message;
          state.vote = payload.data.vote;
          state.error = null;
        },
      )
      .addCase(REQUEST_UP_VOTE_COMMENT.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      })
      // NEUTRALIZE VOTE COMMENT
      .addCase(REQUEST_NEUTRALIZE_VOTE_COMMENT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_NEUTRALIZE_VOTE_COMMENT.fulfilled,
        (state, { payload }: PayloadAction<TVoteCommentResponse>) => {
          state.loading = false;
          state.message = payload.message;
          state.vote = payload.data.vote;
          state.error = null;
        },
      )
      .addCase(
        REQUEST_NEUTRALIZE_VOTE_COMMENT.rejected,
        (state, { payload }) => {
          state.error = payload as AxiosError;
          state.loading = false;
        },
      )
      // DOWN VOTE COMMENT
      .addCase(REQUEST_DOWN_VOTE_COMMENT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_DOWN_VOTE_COMMENT.fulfilled,
        (state, { payload }: PayloadAction<TVoteCommentResponse>) => {
          state.loading = false;
          state.message = payload.message;
          state.vote = payload.data.vote;
          state.error = null;
        },
      )
      .addCase(REQUEST_DOWN_VOTE_COMMENT.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const COMMENT_REDUCER = commentSlice.reducer;
