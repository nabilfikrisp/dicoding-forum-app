import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  CircleUserRoundIcon,
  Loader2,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import dayjs from '@/utils/dayJs.config';
import { Badge } from './ui/badge';
import parse from 'html-react-parser';
import useLogin from '@/hooks/api/useAuth';
import useVote from '@/hooks/api/useVote';
import { TDetailThread } from '@/interfaces/thread.interface';

const ThreadDetailContent = ({ thread }: { thread: TDetailThread }) => {
  const {
    upVoteThread,
    neutralizeVoteThread,
    downVoteThread,
    loading: voteLoading,
  } = useVote();
  const { myProfile } = useLogin();
  const userHasUpvoted = thread.upVotesBy.includes(myProfile?.id as string);
  const userHasDownvoted = thread.downVotesBy.includes(myProfile?.id as string);

  return (
    <div className="flex w-full flex-col gap-5 border-b pb-5">
      <h1 className="break-words">{thread?.title}</h1>
      <div className="flex flex-wrap items-center gap-2">
        <Avatar className="w-6">
          <AvatarImage src={thread?.owner?.avatar} />
          <AvatarFallback>
            <CircleUserRoundIcon />
          </AvatarFallback>
        </Avatar>
        <small>{thread?.owner ? thread?.owner.name : 'Anonymus'}</small>
        <small>{dayjs(thread?.createdAt).fromNow()}</small>
        <Badge>{thread?.category}</Badge>
      </div>
      <div className="paragraph">{parse(thread?.body as string)}</div>

      <div className="flex items-center justify-start gap-3 ps-1">
        <div className="flex items-start justify-start gap-2">
          {voteLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ThumbsUpIcon
              fill={userHasUpvoted ? 'hsl(var(--primary))' : ''}
              onClick={() => {
                if (!voteLoading) {
                  if (userHasUpvoted) {
                    neutralizeVoteThread(thread.id);
                  } else {
                    upVoteThread(thread.id);
                  }
                }
              }}
            />
          )}

          {thread?.upVotesBy.length}
        </div>
        <div className="flex items-start justify-start gap-2">
          {voteLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ThumbsDownIcon
              fill={userHasDownvoted ? 'hsl(var(--destructive))' : ''}
              onClick={() => {
                if (!voteLoading) {
                  if (userHasDownvoted) {
                    neutralizeVoteThread(thread.id);
                  } else {
                    downVoteThread(thread.id);
                  }
                }
              }}
            />
          )}

          {thread?.downVotesBy.length}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailContent;
