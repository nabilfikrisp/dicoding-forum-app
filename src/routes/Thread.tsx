import { useEffect } from 'react';
import ThreadFeed from '@/components/ThreadFeed';
import useThread from '@/hooks/api/useThread';
import LoadingState from '@/components/LoadingState';
import useLogin from '@/hooks/api/useAuth';
import useUser from '@/hooks/api/useUser';
import { useNavigate } from 'react-router-dom';
import NewThreadButton from '@/components/NewThreadButton';

const EmptyState = () => {
  return (
    <h4 className="text-center text-base">
      Be the first one to post a thread!
    </h4>
  );
};

const Thread = () => {
  const navigate = useNavigate();
  const { threads, loading, error, getThreads } = useThread();
  const {
    getMyProfile,
    loading: loadingProfile,
    error: profileError,
  } = useLogin();
  const { getUsers, loading: loadingUsers, error: userError } = useUser();
  useEffect(() => {
    getThreads();
    getMyProfile();
    getUsers();
  }, []);

  if (loading || loadingUsers || loadingProfile) {
    return <LoadingState />;
  }
  if (error) {
    return <p>Error fetching threads: {error.message}</p>;
  }
  if (profileError) {
    return <p>Error fetching profile data: {profileError.message}</p>;
  }
  if (userError) {
    return <p>Error fetching users data: {userError.message}</p>;
  }
  return (
    <div className="relative">
      <div className="mx-auto h-full max-w-[800px] p-3">
        {threads.length > 0 ? <ThreadFeed threads={threads} /> : <EmptyState />}
      </div>
      <NewThreadButton
        className="fixed bottom-24 right-16"
        onClick={() => {
          navigate('/new');
        }}
      />
    </div>
  );
};

export default Thread;
