import { TThread } from '@/redux/features/thread/threadSlice';
import parse from 'html-react-parser';
import {
  CircleUserRoundIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import dayjs from '@/utils/dayJs.config';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import useUser from '@/hooks/api/useUser';
import { useEffect, useState } from 'react';
import { TUser } from '@/redux/features/user/userSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type ThreadCardProps = {
  thread: TThread;
};

const ThreadCard = ({ thread }: ThreadCardProps) => {
  const { getUserById } = useUser();

  const [owner, setOwner] = useState<TUser | null>(null);

  useEffect(() => {
    const getOwner = getUserById(thread.ownerId);
    setOwner(getOwner);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-b-4 p-3 shadow shadow-secondary md:p-5">
      <div className="flex flex-col gap-2">
        <Link to={`/threads/${thread.id}`}>
          <h4 className="flex-grow hover:underline md:text-3xl">
            {thread.title}
          </h4>
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className="w-6">
            <AvatarImage src={owner?.avatar} />
            <AvatarFallback>
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
          <small>{owner ? owner.name : 'Anonymus'}</small>
          <small>{dayjs(thread.createdAt).fromNow()}</small>
        </div>
      </div>
      <div className="paragraph line-clamp-3">{parse(thread.body)}</div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-start justify-start gap-2">
            <ThumbsUpIcon />
            {thread.upVotesBy.length}
          </div>
          <div className="flex items-start justify-start gap-2">
            <ThumbsDownIcon />
            {thread.downVotesBy.length}
          </div>
          <div className="flex items-start justify-start gap-2">
            <MessageSquareIcon /> {thread.totalComments}
          </div>
        </div>
        <Badge>{thread.category}</Badge>
      </div>
    </div>
  );
};

export default ThreadCard;
