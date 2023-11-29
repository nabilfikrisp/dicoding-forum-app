import useThread from '@/hooks/api/useThread';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from '@/utils/dayJs.config';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { CircleUserRoundIcon } from 'lucide-react';
import parse from 'html-react-parser';

const ThreadDetail = () => {
  const { id } = useParams();
  const { getDetailThread, detailThread: thread } = useThread();
  useEffect(() => {
    getDetailThread(id as string);
  }, []);
  console.log(thread, 'DETAIL');
  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-5 p-5">
      <h1>{thread?.title}</h1>
      <div className="flex items-center gap-2">
        <Avatar className="w-6">
          <AvatarImage src={thread?.owner?.avatar} />
          <AvatarFallback>
            <CircleUserRoundIcon />
          </AvatarFallback>
        </Avatar>
        <small>{thread?.owner ? thread?.owner.name : 'Anonymus'}</small>
        <small>{dayjs(thread?.createdAt).fromNow()}</small>
      </div>
      <div className="paragraph">{parse(thread?.body as string)}</div>
    </div>
  );
};

export default ThreadDetail;
