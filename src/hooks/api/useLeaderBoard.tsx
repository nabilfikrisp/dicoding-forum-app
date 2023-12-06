import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '@/redux/store';
import { REQUEST_GET_LEADERBOARDS } from '@/redux/features/leaderboard/leaderBoardSlice';

const useLeaderBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leaderboards, loading, message, error } = useSelector(
    (state: RootState) => state.leaderboard,
  );

  const getLeaderBoards = async () => {
    const result = await dispatch(REQUEST_GET_LEADERBOARDS());
    if (result.meta.requestStatus === 'rejected') {
      console.log(result.payload);
    }
  };

  return { loading, message, error, leaderboards, getLeaderBoards };
};

export default useLeaderBoard;
