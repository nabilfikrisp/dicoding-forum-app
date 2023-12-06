import { type TLeaderBoard } from '@/interfaces/leaderboard.interface';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CircleUserRoundIcon } from 'lucide-react';

const LeaderBoardCard = ({ leaderboard }: { leaderboard: TLeaderBoard }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-b-4 px-3 shadow shadow-secondary">
      <div className="flex items-center justify-start gap-3">
        <Avatar className="w-6">
          <AvatarImage src={leaderboard.user.avatar} />
          <AvatarFallback>
            <CircleUserRoundIcon />
          </AvatarFallback>
        </Avatar>
        <h4>{leaderboard.user.name}</h4>
      </div>
      <h4>{leaderboard.score}</h4>
    </div>
  );
};

export default LeaderBoardCard;
