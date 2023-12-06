import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '@/redux/store';
import { REQUEST_GET_ALL_USER } from '@/redux/features/user/userSlice';
import { type TUser } from '@/interfaces/user.interface';

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, message, error } = useSelector(
    (state: RootState) => state.user,
  );

  const getUsers = async () => {
    const result = await dispatch(REQUEST_GET_ALL_USER());
    if (result.meta.requestStatus === 'rejected') {
      console.log(result.payload);
    }
  };

  const getUserById = (userId: string): TUser | null => {
    const user = users.find((user) => user.id === userId);
    if (user === undefined) {
      return null;
    }
    return user;
  };

  return { getUsers, users, loading, message, getUserById, error };
};

export default useUser;
