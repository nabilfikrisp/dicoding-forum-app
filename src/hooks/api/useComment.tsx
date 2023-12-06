import {
  REQUEST_CREATE_COMMENT,
  REQUEST_DOWN_VOTE_COMMENT,
  REQUEST_NEUTRALIZE_VOTE_COMMENT,
  REQUEST_UP_VOTE_COMMENT,
} from '@/redux/features/comment/commentSlice';
import { type AppDispatch, type RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import {
  neutralizeCommentVote,
  pushNewComment,
  pushNewCommentDownVote,
  pushNewCommentUpVote,
} from '@/redux/features/thread/threadSlice';

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

  const upVoteComment = async (threadId: string, commentId: string) => {
    const result = await dispatch(
      REQUEST_UP_VOTE_COMMENT({ threadId, commentId }),
    );
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(
        pushNewCommentUpVote({
          commentId: result.payload.data.vote.commentId,
          newUserId: result.payload.data.vote.userId,
        }),
      );
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const neutralizeVoteComment = async (threadId: string, commentId: string) => {
    const result = await dispatch(
      REQUEST_NEUTRALIZE_VOTE_COMMENT({ threadId, commentId }),
    );
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(
        neutralizeCommentVote({
          commentId: result.payload.data.vote.commentId,
          newUserId: result.payload.data.vote.userId,
        }),
      );
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const downVoteComment = async (threadId: string, commentId: string) => {
    const result = await dispatch(
      REQUEST_DOWN_VOTE_COMMENT({ threadId, commentId }),
    );
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(
        pushNewCommentDownVote({
          commentId: result.payload.data.vote.commentId,
          newUserId: result.payload.data.vote.userId,
        }),
      );
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
    upVoteComment,
    neutralizeVoteComment,
    downVoteComment,
  };
};

export default useComment;
