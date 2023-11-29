import {
  REQUEST_GET_DETAIL_THREAD,
  REQUEST_GET_THREADS,
} from '@/redux/features/thread/threadSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';

const useThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleError } = useResponse();
  const { loading, message, error, threads, detailThread } = useSelector(
    (state: RootState) => state.thread,
  );

  const getThreads = () => {
    dispatch(REQUEST_GET_THREADS()).then((result) => {
      if (result.meta.requestStatus === 'rejected') {
        handleError(
          result.payload.response.data.message,
          result.payload.response.status,
        );
      }
    });
  };

  const getDetailThread = (id: string) => {
    dispatch(REQUEST_GET_DETAIL_THREAD(id)).then((result) => {
      if (result.meta.requestStatus === 'rejected') {
        handleError(
          result.payload.response.data.message,
          result.payload.response.status,
        );
      }
    });
  };

  return {
    loading,
    message,
    error,
    threads,
    getThreads,
    getDetailThread,
    detailThread,
  };
};

export default useThread;
