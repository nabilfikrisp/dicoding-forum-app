import { API } from '@/config/api';
import { LEADERBOARD_ENDPOINT } from '@/endpoints/leaderBoard.endpoint';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AxiosError } from 'axios';
import { TUser } from '../user/userSlice';

export const REQUEST_GET_LEADERBOARDS = createAsyncThunk(
  'thread/REQUEST_GET_LEADERBOARDS',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(LEADERBOARD_ENDPOINT.GET);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export type TLeaderBoard = {
  user: TUser;
  score: string;
};

type TLeaderBoardState = {
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  leaderboards: TLeaderBoard[];
};

const initialState: TLeaderBoardState = {
  loading: false,
  message: null,
  error: null,
  leaderboards: [],
};

const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE COMMENT
      .addCase(REQUEST_GET_LEADERBOARDS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_GET_LEADERBOARDS.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.leaderboards = payload.data.leaderboards;
        state.error = null;
      })
      .addCase(REQUEST_GET_LEADERBOARDS.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const LEADER_BOARD_REDUCER = leaderBoardSlice.reducer;
