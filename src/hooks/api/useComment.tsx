import { REQUEST_CREATE_COMMENT } from '@/redux/features/comment/commentSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import { pushNewComment } from '@/redux/features/thread/threadSlice';

const useComment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { handleError, handleSuccess } = useResponse();
  const { loading, message, error, comment } = useSelector(
    (state: RootState) => state.comment,
  );

  const createComment = async (
    threadId: string,
    reqBody: { content: string },
  ) => {
    const result = await dispatch(
      REQUEST_CREATE_COMMENT({ threadId, reqBody }),
    );
    if (result.meta.requestStatus === 'fulfilled') {
      handleSuccess('Comment successfully submited');
      dispatch(pushNewComment({ newComment: result.payload.data.comment }));
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
    comment,
    createComment,
  };
};

export default useComment;
