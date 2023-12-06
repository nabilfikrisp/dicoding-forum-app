import {
  type TVoteResponse,
  type TVoteState,
} from '@/interfaces/vote.interface';
import { API } from '@/config/api';
import { VOTE_ENDPOINT } from '@/endpoints/vote.endpoint';
import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';

export const REQUEST_UP_VOTE_THREAD = createAsyncThunk(
  'user/UP_VOTE_THREAD',
  async (threadId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(VOTE_ENDPOINT(threadId).UP_VOTE_THREAD);
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
        VOTE_ENDPOINT(threadId).NEUTRALIZE_VOTE_THREAD,
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
      const { data } = await API.post(VOTE_ENDPOINT(threadId).DOWN_VOTE_THREAD);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

const initialState: TVoteState = {
  loading: false,
  message: null,
  error: null,
  vote: null,
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // UP VOTE THREAD
      .addCase(REQUEST_UP_VOTE_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        REQUEST_UP_VOTE_THREAD.fulfilled,
        (state, { payload }: PayloadAction<TVoteResponse>) => {
          state.loading = false;
          state.vote = payload.data.vote;
          state.message = payload.message;
          state.error = null;
        },
      )
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
        (state, { payload }: PayloadAction<TVoteResponse>) => {
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
      .addCase(
        REQUEST_DOWN_VOTE_THREAD.fulfilled,
        (state, { payload }: PayloadAction<TVoteResponse>) => {
          state.loading = false;
          state.vote = payload.data.vote;
          state.message = payload.message;
          state.error = null;
        },
      )
      .addCase(REQUEST_DOWN_VOTE_THREAD.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const VOTE_REDUCER = voteSlice.reducer;
