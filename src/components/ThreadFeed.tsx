import { TThread } from '@/redux/features/thread/threadSlice';
import ThreadCard from './ThreadCard';

type ThreadFeedProps = {
  threads: TThread[];
};

const ThreadFeed = ({ threads }: ThreadFeedProps) => {
  return (
    <div className="flex flex-col gap-5">
      {threads.length === 0 ? (
        <p className="text-center">Currently no threads 😢</p>
      ) : (
        threads.map(thread => <ThreadCard key={thread.id} thread={thread} />)
      )}
    </div>
  );
};

export default ThreadFeed;
