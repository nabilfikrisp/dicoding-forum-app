import { useEffect } from 'react';
import ThreadFeed from '@/components/ThreadFeed';
import useThread from '@/hooks/api/useThread';
import LoadingState from '@/components/LoadingState';
import useUser from '@/hooks/api/useUser';

const Thread = () => {
  const { threads, loading, error, getThreads } = useThread();
  const { getUsers } = useUser();
  useEffect(() => {
    getThreads();
    getUsers();
  }, []);

  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="mx-auto h-full max-w-[800px] p-3">
      {threads && <ThreadFeed threads={threads} />}
    </div>
  );
};

export default Thread;
