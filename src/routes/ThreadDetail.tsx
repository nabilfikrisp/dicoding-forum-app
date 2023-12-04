import useThread from '@/hooks/api/useThread';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadDetailContent from '@/components/ThreadDetailContent';
import LoadingState from '@/components/LoadingState';
import ThreadDetailComment from '@/components/ThreadDetailComment';
import { TDetailThread } from '@/interfaces/thread.interface';
import { TComment } from '@/interfaces/comment.interface';

const ThreadDetail = () => {
  const { id } = useParams();
  const { getDetailThread, detailThread: thread, loading, error } = useThread();
  useEffect(() => {
    getDetailThread(id as string);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-5 p-5">
      {thread && (
        <>
          <ThreadDetailContent thread={thread as TDetailThread} />
          <ThreadDetailComment comments={thread?.comments as TComment[]} />
        </>
      )}
    </div>
  );
};

export default ThreadDetail;
