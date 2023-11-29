import useLogin from '@/hooks/api/useLogin';
import { Navigate, Outlet } from 'react-router-dom';

const NotAuthRoute = () => {
  const { isLoggedIn } = useLogin();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default NotAuthRoute;
