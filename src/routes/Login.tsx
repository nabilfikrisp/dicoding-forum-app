import LoginForm from '@/components/forms/LoginForm';
import useAuth from '@/hooks/api/useAuth';

const Login = () => {
  const { login, loading } = useAuth();
  return (
    <div className="mx-auto h-[100vh] max-w-[600px] p-3">
      <LoginForm login={login} loading={loading} />
    </div>
  );
};

export default Login;
