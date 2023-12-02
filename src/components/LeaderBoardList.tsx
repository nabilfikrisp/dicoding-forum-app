import { TLeaderBoard } from '@/redux/features/leaderboard/leaderBoardSlice';
import LeaderBoardCard from './LeaderBoardCard';

const LeaderBoardList = ({
  leaderboards,
}: {
  leaderboards: TLeaderBoard[];
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex justify-between">
        <h3>Users</h3>
        <h3>Score</h3>
      </div>
      {leaderboards.map((leaderboard) => (
        <LeaderBoardCard leaderboard={leaderboard} key={leaderboard.user.id} />
      ))}
    </div>
  );
};

export default LeaderBoardList;
