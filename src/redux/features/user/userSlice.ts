// userSlice.js
import { API } from '@/config/api';
import { EUserEndpoint } from '@/enums/endpoints/userEndpoint.enum';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type TUserState = {
  users: TUser[];
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
};

const initialState: TUserState = {
  users: [],
  loading: false,
  message: null,
  error: null,
};

export const REQUEST_GET_ALL_USER = createAsyncThunk(
  'user/REQUEST_GET_ALL_USER',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(EUserEndpoint.USERS);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(REQUEST_GET_ALL_USER.pending, state => {
        state.loading = true;
      })
      .addCase(REQUEST_GET_ALL_USER.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.data.users;
        state.message = payload.message;
      })
      .addCase(REQUEST_GET_ALL_USER.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      });
  },
});

export const USER_REDUCER = userSlice.reducer;
