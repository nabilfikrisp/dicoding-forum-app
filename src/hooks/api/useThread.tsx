import {
  REQUEST_CREATE_THREAD,
  REQUEST_GET_DETAIL_THREAD,
  REQUEST_GET_THREADS,
  TCreateThreadReqBody,
} from '@/redux/features/thread/threadSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { handleError, handleSuccess } = useResponse();
  const { loading, message, error, threads, detailThread, categoryCount } =
    useSelector((state: RootState) => state.thread);
  const navigate = useNavigate();

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

  const createThread = async (reqBody: TCreateThreadReqBody) => {
    const result = await dispatch(REQUEST_CREATE_THREAD(reqBody));
    if (result.meta.requestStatus === 'fulfilled') {
      handleSuccess(result.payload.data.message);
      navigate('/');
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const sortedCategory: string[] = Object.keys(categoryCount).sort(
    (a, b) => categoryCount[b] - categoryCount[a],
  );

  const showedThreads = searchParams.get('category')
    ? threads.filter(
        (thread) => thread.category === searchParams.get('category'),
      )
    : threads;

  return {
    loading,
    message,
    error,
    threads,
    getThreads,
    getDetailThread,
    detailThread,
    createThread,
    categoryCount,
    sortedCategory,
    showedThreads,
  };
};

export default useThread;
