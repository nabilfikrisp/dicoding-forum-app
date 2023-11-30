import { API } from '@/config/api';
import { EThreadEndpoint } from '@/enums/endpoints/threadEndpoint.enum';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from '../user/userSlice';
import { voteEndpoint } from '@/enums/endpoints/voteEndpoint.enum';
import { TComment } from '../comment/commentSlice';

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
  reducers: {
    pushNewUpVote: (
      state,
      { payload }: PayloadAction<{ newUserId: string }>,
    ) => {
      const { newUserId } = payload;

      if (state.detailThread) {
        state.detailThread = {
          ...state.detailThread,
          upVotesBy: [...state.detailThread.upVotesBy, newUserId],
          downVotesBy: state.detailThread.downVotesBy.filter(
            (userId) => userId !== newUserId,
          ),
        };
      }
    },
    neutralizeVote: (
      state,
      { payload }: PayloadAction<{ newUserId: string }>,
    ) => {
      const { newUserId } = payload;
      if (state.detailThread) {
        state.detailThread.upVotesBy = [...state.detailThread.upVotesBy].filter(
          (userId) => userId !== newUserId,
        );
        state.detailThread.downVotesBy = [
          ...state.detailThread.downVotesBy,
        ].filter((userId) => userId !== newUserId);
      }
    },
    pushNewDownVote: (
      state,
      { payload }: PayloadAction<{ newUserId: string }>,
    ) => {
      const { newUserId } = payload;
      if (state.detailThread) {
        state.detailThread.downVotesBy = [
          ...state.detailThread.downVotesBy,
          newUserId,
        ];
        state.detailThread.upVotesBy = [...state.detailThread.upVotesBy].filter(
          (userId) => userId !== newUserId,
        );
      }
    },
    pushNewComment: (
      state,
      { payload }: PayloadAction<{ newComment: TComment }>,
    ) => {
      if (state.detailThread) {
        state.detailThread.comments = [
          ...state.detailThread.comments,
          payload.newComment,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_GET_THREADS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_GET_THREADS.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.threads = payload.data.threads;
        state.error = null;
        state.message = payload.message;
      })
      .addCase(REQUEST_GET_THREADS.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      })

      // DETAIL THREAD
      .addCase(REQUEST_GET_DETAIL_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_GET_DETAIL_THREAD.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.detailThread = payload.data.detailThread;
        state.error = null;
        state.message = payload.message;
      })
      .addCase(REQUEST_GET_DETAIL_THREAD.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      });
  },
});

export const {
  pushNewDownVote,
  pushNewUpVote,
  neutralizeVote,
  pushNewComment,
} = threadSlice.actions;
export const THREAD_REDUCER = threadSlice.reducer;
