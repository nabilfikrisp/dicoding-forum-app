import {
  TRegistrationReqBody,
  REQUEST_REGISTER_USER,
} from '@/redux/features/user/userRegistrationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, error } = useSelector(
    (state: RootState) => state.userRegistration,
  );
  const { handleError, handleSuccess } = useResponse();

  const register = (userData: TRegistrationReqBody) => {
    dispatch(REQUEST_REGISTER_USER(userData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        handleSuccess(result.payload.message);
        navigate('/login');
      } else if (result.meta.requestStatus === 'rejected') {
        handleError(
          result.payload.response.data.message,
          result.payload.response.status,
        );
      }
    });
  };

  return {
    loading,
    message,
    register,
    error,
  };
};

export default useRegister;
