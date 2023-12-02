import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { REQUEST_GET_ALL_USER, TUser } from '@/redux/features/user/userSlice';

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, message, error } = useSelector(
    (state: RootState) => state.user,
  );

  const getUsers = () =>
    dispatch(REQUEST_GET_ALL_USER()).then((result) => {
      if (result.meta.requestStatus === 'rejected') {
        console.log(result.payload);
      }
    });

  const getUserById = (userId: string): TUser | null => {
    const user = users.find((user) => user.id === userId);
    return user || null;
  };

  return { getUsers, users, loading, message, getUserById, error };
};

export default useUser;
