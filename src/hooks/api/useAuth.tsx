import {
  LOGOUT_REDUCER,
  REQUEST_GET_MY_PROFILE,
  REQUEST_LOGIN,
  REQUEST_REGISTER_USER,
} from '@/redux/features/user/authSlice';
import {
  type TRegistrationReqBody,
  type TLoginReqBody,
} from '@/interfaces/auth.interface';
import { type AppDispatch, type RootState } from '@/redux/store';
import { deleteLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, message, error, token, myProfile, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );
  const { handleSuccess, handleError } = useResponse();

  const register = async (userData: TRegistrationReqBody) => {
    const result = await dispatch(REQUEST_REGISTER_USER(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      handleSuccess(result.payload.message);
      navigate('/login');
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const login = async (reqBody: TLoginReqBody) => {
    const result = await dispatch(REQUEST_LOGIN(reqBody));
    if (result.meta.requestStatus === 'fulfilled') {
      handleSuccess(result.payload.message);
      setLocalStorage('token', result.payload.data.token);
      navigate('/');
    } else if (result.meta.requestStatus === 'rejected') {
      handleError(
        result.payload.response.data.message,
        result.payload.response.status,
      );
    }
  };

  const getMyProfile = async () => {
    await dispatch(REQUEST_GET_MY_PROFILE()).then((result) => {
      if (result.meta.requestStatus === 'rejected') {
        handleError(result.payload, result.payload.code);
      }
    });
  };

  const logout = () => {
    deleteLocalStorage('token');
    dispatch(LOGOUT_REDUCER());
  };

  return {
    loading,
    message,
    error,
    token,
    login,
    logout,
    getMyProfile,
    myProfile,
    isLoggedIn,
    register,
  };
};

export default useAuth;
