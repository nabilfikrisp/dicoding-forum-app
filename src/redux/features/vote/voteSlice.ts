import { API } from '@/config/api';
import { voteEndpoint } from '@/enums/endpoints/voteEndpoint.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const REQUEST_UP_VOTE_THREAD = createAsyncThunk(
  'user/UP_VOTE_THREAD',
  async (threadId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(voteEndpoint(threadId).upVoteThread);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_NEUTRALIZE_VOTE_THREAD = createAsyncThunk(
  'user/NEUTRALIZE_VOTE_THREAD',
  async (threadId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        voteEndpoint(threadId).neutralizeVoteThread,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_DOWN_VOTE_THREAD = createAsyncThunk(
  'user/DOWN_VOTE_THREAD',
  async (threadId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(voteEndpoint(threadId).downVoteThread);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

type TVoteState = {
  loading: boolean;
  message: string | unknown;
  error: AxiosError | null;
  vote: {
    id: string;
    userId: string;
    threadId: string;
    voteType: number;
  } | null;
};

const initialState: TVoteState = {
  loading: false,
  message: null,
  error: null,
  vote: null,
};

const voteSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // UP VOTE THREAD
      .addCase(REQUEST_UP_VOTE_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_UP_VOTE_THREAD.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.vote = payload.data.vote;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(REQUEST_UP_VOTE_THREAD.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      })

      // NEUTRALIZE VOTE THREAD
      .addCase(REQUEST_NEUTRALIZE_VOTE_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_NEUTRALIZE_VOTE_THREAD.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.vote = payload.data.vote;
          state.message = payload.message;
          state.error = null;
        },
      )
      .addCase(
        REQUEST_NEUTRALIZE_VOTE_THREAD.rejected,
        (state, { payload }) => {
          state.error = payload as AxiosError;
          state.loading = false;
        },
      )

      // DOWN VOTE THREAD
      .addCase(REQUEST_DOWN_VOTE_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_DOWN_VOTE_THREAD.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.vote = payload.data.vote;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(REQUEST_DOWN_VOTE_THREAD.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const VOTE_REDUCER = voteSlice.reducer;
