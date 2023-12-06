import { type TThread } from '@/interfaces/thread.interface';
import ThreadCard from './ThreadCard';

const ThreadFeed = ({ threads }: { threads: TThread[] }) => {
  return (
    <div className="flex flex-col gap-5">
      {threads.length === 0 ? (
        <p className="text-center">Currently no threads 😢</p>
      ) : (
        threads.map((thread) => <ThreadCard key={thread.id} thread={thread} />)
      )}
    </div>
  );
};

export default ThreadFeed;
