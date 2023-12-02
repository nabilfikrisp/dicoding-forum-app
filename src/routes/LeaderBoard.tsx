import LeaderBoardList from '@/components/LeaderBoardList';
import LoadingState from '@/components/LoadingState';
import useLeaderBoard from '@/hooks/api/useLeaderBoard';
import { useEffect } from 'react';

const EmptyState = () => {
  return (
    <h4 className="text-center text-base">
      Be the first one to post a thread!
    </h4>
  );
};

const LeaderBoard = () => {
  const { getLeaderBoards, leaderboards, loading, error } = useLeaderBoard();
  useEffect(() => {
    getLeaderBoards();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <p className="mx-auto h-full max-w-[800px] p-3">
        Error fetching leaderboards: {error.message}
      </p>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-[800px] flex-col gap-5 p-3">
      <h2>Active User Leaderboard</h2>
      {leaderboards.length > 0 ? (
        <LeaderBoardList leaderboards={leaderboards} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default LeaderBoard;
