import RegisterForm from '@/components/forms/RegisterForm';
import useAuth from '@/hooks/api/useAuth';

const Register = () => {
  const { register, loading } = useAuth();
  return (
    <div className="mx-auto h-[100vh] max-w-[600px] p-3">
      <RegisterForm register={register} loading={loading} />
    </div>
  );
};

export default Register;
