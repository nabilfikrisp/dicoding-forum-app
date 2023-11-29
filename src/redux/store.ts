import { configureStore } from '@reduxjs/toolkit';
import { USER_REDUCER } from './features/user/userSlice';
import { USER_REGISTRATION_REDUCER } from './features/user/userRegistrationSlice';
import { USER_LOGIN_REDUCER } from './features/user/userLoginSlice';
import { THREAD_REDUCER } from './features/thread/threadSlice';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : {};

const store = configureStore({
  devTools: true,
  reducer: {
    user: USER_REDUCER,
    userRegistration: USER_REGISTRATION_REDUCER,
    userLogin: USER_LOGIN_REDUCER,
    thread: THREAD_REDUCER,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
