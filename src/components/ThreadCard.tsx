import parse from 'html-react-parser';
import {
  CircleUserRoundIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import dayjs from '@/utils/dayJs.config';
import { Badge } from './ui/badge';
import { Link, useSearchParams } from 'react-router-dom';
import useUser from '@/hooks/api/useUser';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useLogin from '@/hooks/api/useAuth';
import { type TUser } from '@/interfaces/user.interface';
import { type TThread } from '@/interfaces/thread.interface';
import LoadingState from './LoadingState';

const ThreadCard = ({ thread }: { thread: TThread }) => {
  const [, setSearchParams] = useSearchParams();
  const { getUserById, loading } = useUser();
  const { myProfile } = useLogin();

  if (loading) {
    return <LoadingState />;
  }

  const [owner, setOwner] = useState<TUser | null>(null);

  useEffect(() => {
    const getOwner = getUserById(thread.ownerId);
    setOwner(getOwner);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-b-4 p-3 shadow shadow-secondary md:p-5">
      <div className="flex flex-col gap-2">
        <Link to={`/threads/${thread.id}`}>
          <h4 className="line-clamp-3 flex-grow break-words hover:underline md:text-3xl">
            {thread.title}
          </h4>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Avatar className="w-6">
            <AvatarImage src={owner?.avatar} />
            <AvatarFallback>
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
          <small>{owner?.name}</small>
          <small>{dayjs(thread.createdAt).fromNow()}</small>
        </div>
      </div>
      <div className="paragraph line-clamp-3">{parse(thread.body)}</div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-start justify-start gap-2">
            <ThumbsUpIcon
              fill={
                thread.upVotesBy.includes(myProfile?.id as string)
                  ? 'hsl(var(--primary))'
                  : ''
              }
            />
            {thread.upVotesBy.length}
          </div>
          <div className="flex items-center justify-start gap-2">
            <ThumbsDownIcon
              fill={
                thread.downVotesBy.includes(myProfile?.id as string)
                  ? 'hsl(var(--destructive))'
                  : ''
              }
            />
            {thread.downVotesBy.length}
          </div>
          <div className="flex items-start justify-start gap-2">
            <MessageSquareIcon />
            {thread.totalComments}
          </div>
        </div>
        <Badge
          className="cursor-pointer"
          onClick={() => {
            setSearchParams({ category: thread.category });
          }}
        >
          {thread.category}
        </Badge>
      </div>
    </div>
  );
};

export default ThreadCard;
