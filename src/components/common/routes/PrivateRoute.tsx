import { PATH } from '@src/constants/path';
import { loginAtom } from '@src/state/store/login';
import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';

export default function PrivateRoute() {
  const isLogin = useAtomValue(loginAtom);

  if (!isLogin) {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }
  return <Outlet />;
}
