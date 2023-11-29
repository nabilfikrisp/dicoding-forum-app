import { API } from '@/config/api';
import { EThreadEndpoint } from '@/enums/endpoints/threadEndpoint.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from '../user/userSlice';

export const REQUEST_GET_THREADS = createAsyncThunk(
  'thread/REQUEST_GET_THREADS',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(EThreadEndpoint.THREADS);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_GET_DETAIL_THREAD = createAsyncThunk(
  'thread/REQUEST_GET_DETAIL_THREAD',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${EThreadEndpoint.DETAIL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export type TDetailThread = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Omit<TUser, 'email'>;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: [
    {
      id: string;
      content: string;
      createdAt: string;
      owner: Omit<TUser, 'email'>;
    },
    upVotesBy: string[],
    downVotesBy: string[],
  ];
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

type TThreadState = {
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  threads: TThread[];
  detailThread: TDetailThread | null;
};

const initialState: TThreadState = {
  threads: [],
  loading: false,
  message: null,
  error: null,
  detailThread: null,
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_GET_THREADS.pending, (state) => {
        state.loading = true;
      })
      .addCase(REQUEST_GET_THREADS.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.threads = payload.data.threads;
        state.message = payload.message;
      })
      .addCase(REQUEST_GET_THREADS.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      })
      .addCase(REQUEST_GET_DETAIL_THREAD.pending, (state) => {
        state.loading = true;
      })
      .addCase(REQUEST_GET_DETAIL_THREAD.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.detailThread = payload.data.detailThread;
        state.message = payload.message;
      })
      .addCase(REQUEST_GET_DETAIL_THREAD.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      });
  },
});

export const THREAD_REDUCER = threadSlice.reducer;
