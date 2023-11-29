import { API } from '@/config/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from './userSlice';
import { EUserEndpoint } from '@/enums/endpoints/userEndpoint.enum';

export type TLoginReqBody = {
  email: string;
  password: string;
};

export const REQUEST_LOGIN = createAsyncThunk(
  'user/REQUEST_LOGIN',
  async (requestBody: TLoginReqBody, { rejectWithValue }) => {
    try {
      const { data } = await API.post(EUserEndpoint.LOGIN, requestBody);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_GET_MY_PROFILE = createAsyncThunk(
  'user/REQUEST_GET_MY_PROFILE',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.post(EUserEndpoint.ME);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

type TLoginState = {
  token: string | null;
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
  isLoggedIn: boolean;
  myProfile: TUser | null;
};

const initialState: TLoginState = {
  token: null,
  loading: false,
  message: null,
  error: null,
  myProfile: null,
  isLoggedIn: false,
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    LOGOUT_REDUCER: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_LOGIN.pending, (state) => {
        state.loading = true;
      })
      .addCase(REQUEST_LOGIN.fulfilled, (state, { payload }) => {
        state.token = payload.data.token;
        state.loading = false;
        state.message = payload.message;
        state.isLoggedIn = true;
      })
      .addCase(REQUEST_LOGIN.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      })
      .addCase(REQUEST_GET_MY_PROFILE.pending, (state) => {
        state.loading = true;
      })
      .addCase(REQUEST_GET_MY_PROFILE.fulfilled, (state, { payload }) => {
        state.myProfile = payload.data.user;
        state.loading = false;
        state.message = payload as string;
      })
      .addCase(REQUEST_GET_MY_PROFILE.rejected, (state, { payload }) => {
        state.error = payload as AxiosError;
        state.loading = false;
      });
  },
});

export const { LOGOUT_REDUCER } = userLoginSlice.actions;
export const USER_LOGIN_REDUCER = userLoginSlice.reducer;
