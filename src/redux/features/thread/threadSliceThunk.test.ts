import store from '@/redux/store';
import { API } from '@/config/api';
import {
  REQUEST_GET_DETAIL_THREAD,
  REQUEST_GET_THREADS,
  THREAD_REDUCER,
} from './threadSlice';
import { describe, it, expect, vi } from 'vitest';

describe('thread async thunk function', () => {
  it('should set loading state on true when API call is pending', async () => {
    const nextState = THREAD_REDUCER(
      store.getState().thread,
      REQUEST_GET_THREADS.pending,
    );

    expect(nextState.loading).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  it('should update thread state if action fulfilled', async () => {
    const result = await store.dispatch(REQUEST_GET_THREADS());
    const threads = result.payload.data.threads;

    expect(result.type).toBe('thread/REQUEST_GET_THREADS/fulfilled');
    expect(store.getState().thread.threads).toBe(threads);
    expect(store.getState().thread.loading).toBeFalsy();
    expect(store.getState().thread.error).toBeNull();
  });

  it('should have error state if action rejected', async () => {
    vi.spyOn(API, 'get').mockRejectedValueOnce(
      new Error('Failed to fetch data'),
    );

    const result = await store.dispatch(REQUEST_GET_THREADS());
    expect(result.type).toBe('thread/REQUEST_GET_THREADS/rejected');
    expect(store.getState().thread.error).toStrictEqual(
      new Error('Failed to fetch data'),
    );
  });
});

describe('detail thread async thunk function', () => {
  it('should set loading state on true when API call is pending', async () => {
    const nextState = THREAD_REDUCER(
      store.getState().thread,
      REQUEST_GET_DETAIL_THREAD.pending,
    );

    expect(nextState.loading).toBeTruthy();
    expect(nextState.error).toBeNull();
  });

  it('should update thread state if action fulfilled', async () => {
    // thread id from previous test
    const threadId = store.getState().thread.threads[0].id;
    const result = await store.dispatch(REQUEST_GET_DETAIL_THREAD(threadId));
    const threadDetail = result.payload.data.detailThread;

    expect(result.type).toBe('thread/REQUEST_GET_DETAIL_THREAD/fulfilled');
    expect(store.getState().thread.detailThread).toBe(threadDetail);
    expect(store.getState().thread.loading).toBeFalsy();
    expect(store.getState().thread.error).toBeNull();
  });

  it('should have error state if action rejected', async () => {
    vi.spyOn(API, 'get').mockRejectedValueOnce(
      new Error('Failed to fetch detail'),
    );
    // thread id from previous test
    const threadId = store.getState().thread.threads[0].id;
    const result = await store.dispatch(REQUEST_GET_DETAIL_THREAD(threadId));
    expect(result.type).toBe('thread/REQUEST_GET_DETAIL_THREAD/rejected');
    expect(store.getState().thread.error).toStrictEqual(
      new Error('Failed to fetch detail'),
    );
  });
});
