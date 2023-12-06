import { useEffect } from 'react';
import ThreadFeed from '@/components/ThreadFeed';
import useThread from '@/hooks/api/useThread';
import LoadingState from '@/components/LoadingState';
import useLogin from '@/hooks/api/useAuth';
import useUser from '@/hooks/api/useUser';
import { useNavigate } from 'react-router-dom';
import NewThreadButton from '@/components/NewThreadButton';
import PopularCategory from '@/components/PopularCategory';

const EmptyState = () => {
  return (
    <h4 className="text-center text-base">
      Be the first one to post a thread!
    </h4>
  );
};

const Thread = () => {
  const navigate = useNavigate();
  const { loading, error, getThreads, sortedCategory, showedThreads } =
    useThread();
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
  if (error !== null) {
    return <p>Error fetching threads: {error.message}</p>;
  }
  if (profileError !== null) {
    return <p>Error fetching profile data: {profileError.message}</p>;
  }
  if (userError !== null) {
    return <p>Error fetching users data: {userError.message}</p>;
  }

  return (
    <div className="relative">
      <div className="mx-auto h-full max-w-[800px] p-3">
        <PopularCategory categories={sortedCategory} />
        <div className="mt-5 flex w-full flex-col gap-3 border-t pt-2">
          <h2>Threads</h2>
          {showedThreads.length > 0 ? (
            <ThreadFeed threads={showedThreads} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <NewThreadButton
        className="fixed bottom-20 right-5 md:bottom-24 md:right-16"
        onClick={() => {
          navigate('/new');
        }}
      />
    </div>
  );
};

export default Thread;
