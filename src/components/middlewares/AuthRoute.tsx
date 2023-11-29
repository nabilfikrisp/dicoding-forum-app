import useLogin from '@/hooks/api/useLogin';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { isLoggedIn } = useLogin();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AuthRoute;
