import { configureStore } from '@reduxjs/toolkit';
import { USER_REDUCER } from './features/user/userSlice';
import { THREAD_REDUCER } from './features/thread/threadSlice';
import { AUTH_REDUCER } from './features/user/authSlice';
import { VOTE_REDUCER } from './features/vote/voteSlice';
import thunkMiddleware from 'redux-thunk';
import { COMMENT_REDUCER } from './features/comment/commentSlice';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : {};

const store = configureStore({
  devTools: true,
  reducer: {
    user: USER_REDUCER,
    auth: AUTH_REDUCER,
    thread: THREAD_REDUCER,
    vote: VOTE_REDUCER,
    comment: COMMENT_REDUCER,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
