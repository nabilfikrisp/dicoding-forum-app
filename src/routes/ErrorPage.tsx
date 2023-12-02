import MyButton from '@/components/MyButton';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-5">
      <h1>404</h1>
      <MyButton
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </MyButton>
    </div>
  );
};

export default ErrorPage;
