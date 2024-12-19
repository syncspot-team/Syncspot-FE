import { PATH } from '@src/constants/path';
import { loginAtom } from '@src/state/store/login';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLogin = useAtomValue(loginAtom);

  if (!isLogin) {
    return <Navigate to={PATH.LOGIN} replace />;
  }
  return <Outlet />;
};
