import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '@/config/api';
import { AxiosError } from 'axios';
import { EUserEndpoint } from '@/enums/endpoints/userEndpoint.enum';

export type TRegistrationReqBody = {
  name: string;
  email: string;
  password: string;
};

export const REQUEST_REGISTER_USER = createAsyncThunk(
  'user/REQUEST_REGISTER_USER',
  async (requestBody: TRegistrationReqBody, { rejectWithValue }) => {
    try {
      const { data } = await API.post(EUserEndpoint.REGISTER, requestBody);
      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  },
);

type TRegistrationState = {
  loading: boolean;
  message: string | null;
  error: AxiosError | null;
};

const initialState: TRegistrationState = {
  loading: false,
  message: null,
  error: null,
};

const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(REQUEST_REGISTER_USER.pending, state => {
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

export const USER_REGISTRATION_REDUCER = userRegistrationSlice.reducer;
