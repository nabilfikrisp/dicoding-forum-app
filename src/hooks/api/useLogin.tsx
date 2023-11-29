import {
  LOGOUT_REDUCER,
  REQUEST_GET_MY_PROFILE,
  REQUEST_LOGIN,
  TLoginReqBody,
} from '@/redux/features/user/userLoginSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { deleteLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import useResponse from '../useResponse';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, message, error, token, myProfile, isLoggedIn } = useSelector(
    (state: RootState) => state.userLogin,
  );
  const { handleSuccess, handleError } = useResponse();

  const login = (reqBody: TLoginReqBody) => {
    dispatch(REQUEST_LOGIN(reqBody)).then((result) => {
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
    });
  };

  const getMyProfile = () => {
    dispatch(REQUEST_GET_MY_PROFILE()).then((result) => {
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
  };
};

export default useLogin;
