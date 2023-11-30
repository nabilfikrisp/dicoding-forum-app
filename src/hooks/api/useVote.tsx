import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import {
  REQUEST_DOWN_VOTE_THREAD,
  REQUEST_NEUTRALIZE_VOTE_THREAD,
  REQUEST_UP_VOTE_THREAD,
  neutralizeVote,
  pushNewDownVote,
  pushNewUpVote,
} from '@/redux/features/thread/threadSlice';

const useVote = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, error, vote } = useSelector(
    (state: RootState) => state.vote,
  );
  const { handleError } = useResponse();

  const upVoteThread = async (id: string) => {
    const result = await dispatch(REQUEST_UP_VOTE_THREAD(id));
    if (result.meta.requestStatus === 'fulfilled') {
      const { userId } = result.payload.data.vote;
      dispatch(pushNewUpVote({ newUserId: userId }));
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const neutralizeVoteThread = async (id: string) => {
    const result = await dispatch(REQUEST_NEUTRALIZE_VOTE_THREAD(id));
    if (result.meta.requestStatus === 'fulfilled') {
      const { userId } = result.payload.data.vote;
      dispatch(neutralizeVote({ newUserId: userId }));
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const downVoteThread = async (id: string) => {
    const result = await dispatch(REQUEST_DOWN_VOTE_THREAD(id));
    if (result.meta.requestStatus === 'fulfilled') {
      const { userId } = result.payload.data.vote;
      dispatch(pushNewDownVote({ newUserId: userId }));
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  return {
    loading,
    message,
    error,
    upVoteThread,
    neutralizeVoteThread,
    downVoteThread,
    vote,
  };
};

export default useVote;
