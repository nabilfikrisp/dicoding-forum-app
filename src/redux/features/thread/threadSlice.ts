import { API } from '@/config/api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from '../user/userSlice';
import { TComment } from '../comment/commentSlice';
import { THREAD_ENDPOINT } from '@/endpoints/thread.endpoint';

export const REQUEST_GET_THREADS = createAsyncThunk(
  'thread/REQUEST_GET_THREADS',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(THREAD_ENDPOINT.THREADS);
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
      const { data } = await API.get(`${THREAD_ENDPOINT.DETAIL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export type TCreateThreadReqBody = {
  title: string;
  category?: string;
  body: string;
};

export const REQUEST_CREATE_THREAD = createAsyncThunk(
  'thread/REQUEST_CREATE_THREAD',
  async (reqBody: TCreateThreadReqBody, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`${THREAD_ENDPOINT.CREATE}`, reqBody);
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
  categoryCount: Record<string, number>;
};

const initialState: TThreadState = {
  threads: [],
  loading: false,
  message: null,
  error: null,
  detailThread: null,
  categoryCount: {},
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
        state.detailThread.upVotesBy = [
          ...state.detailThread.upVotesBy,
          newUserId,
        ];

        state.detailThread.downVotesBy = [
          ...state.detailThread.downVotesBy,
        ].filter((userId) => userId !== newUserId);
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
    pushNewCommentUpVote: (
      state,
      { payload }: PayloadAction<{ commentId: string; newUserId: string }>,
    ) => {
      const { commentId, newUserId } = payload;
      if (state.detailThread && state.detailThread.comments) {
        const commentIndex = state.detailThread.comments.findIndex(
          (comment) => comment.id === commentId,
        );
        if (commentIndex !== -1) {
          state.detailThread.comments[commentIndex].downVotesBy = [
            ...state.detailThread.comments[commentIndex].downVotesBy,
          ].filter((userId) => userId !== newUserId);

          state.detailThread.comments[commentIndex].upVotesBy = [
            ...state.detailThread.comments[commentIndex].upVotesBy,
            newUserId,
          ];
        }
      }
    },
    pushNewCommentDownVote: (
      state,
      { payload }: PayloadAction<{ commentId: string; newUserId: string }>,
    ) => {
      const { commentId, newUserId } = payload;
      if (state.detailThread && state.detailThread.comments) {
        const commentIndex = state.detailThread.comments.findIndex(
          (comment) => comment.id === commentId,
        );
        if (commentIndex !== -1) {
          state.detailThread.comments[commentIndex].upVotesBy = [
            ...state.detailThread.comments[commentIndex].upVotesBy,
          ].filter((userId) => userId !== newUserId);

          state.detailThread.comments[commentIndex].downVotesBy = [
            ...state.detailThread.comments[commentIndex].downVotesBy,
            newUserId,
          ];
        }
      }
    },
    neutralizeCommentVote: (
      state,
      { payload }: PayloadAction<{ commentId: string; newUserId: string }>,
    ) => {
      const { commentId, newUserId } = payload;
      if (state.detailThread && state.detailThread.comments) {
        const commentIndex = state.detailThread.comments.findIndex(
          (comment) => comment.id === commentId,
        );
        if (commentIndex !== -1) {
          state.detailThread.comments[commentIndex].downVotesBy = [
            ...state.detailThread.comments[commentIndex].downVotesBy,
          ].filter((userId) => userId !== newUserId);

          state.detailThread.comments[commentIndex].upVotesBy = [
            ...state.detailThread.comments[commentIndex].upVotesBy,
          ].filter((userId) => userId !== newUserId);
        }
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

        state.categoryCount = {};
        const newCategoryCount = { ...state.categoryCount };
        payload.data.threads.forEach((thread: TThread) => {
          const category = thread.category;
          if (category !== undefined && category !== null) {
            newCategoryCount[category] = (newCategoryCount[category] || 0) + 1;
          }
        });
        state.categoryCount = newCategoryCount;

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
      })
      // CREATE THREAD
      .addCase(REQUEST_CREATE_THREAD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REQUEST_CREATE_THREAD.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.threads = [...state.threads, payload.data.thread];
        state.error = null;
        state.message = payload.message;
      })
      .addCase(REQUEST_CREATE_THREAD.rejected, (state, { payload }) => {
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
  pushNewCommentUpVote,
  pushNewCommentDownVote,
  neutralizeCommentVote,
} = threadSlice.actions;
export const THREAD_REDUCER = threadSlice.reducer;
