import { API } from '@/config/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TUser } from './userSlice';
import { USER_ENDPOINT } from '@/endpoints/user.endpoint';

export type TRegistrationReqBody = {
  name: string;
  email: string;
  password: string;
};

export type TLoginReqBody = {
  email: string;
  password: string;
};

export const REQUEST_REGISTER_USER = createAsyncThunk(
  'user/REQUEST_REGISTER_USER',
  async (requestBody: TRegistrationReqBody, { rejectWithValue }) => {
    try {
      const { data } = await API.post(USER_ENDPOINT.REGISTER, requestBody);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

export const REQUEST_LOGIN = createAsyncThunk(
  'user/REQUEST_LOGIN',
  async (requestBody: TLoginReqBody, { rejectWithValue }) => {
    try {
      const { data } = await API.post(USER_ENDPOINT.LOGIN, requestBody);
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
      const { data } = await API.get(USER_ENDPOINT.ME);
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

const authSlice = createSlice({
  name: 'auth',
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
      })
      .addCase(REQUEST_REGISTER_USER.pending, (state) => {
        state.loading = true;
      })
      .addCase(REQUEST_REGISTER_USER.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(REQUEST_REGISTER_USER.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as AxiosError;
      });
  },
});

export const { LOGOUT_REDUCER } = authSlice.actions;
export const AUTH_REDUCER = authSlice.reducer;
