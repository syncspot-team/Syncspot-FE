import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loginAtom } from '@src/state/store/login';

export default function PublicRoute() {
  const isLogin = useAtomValue(loginAtom);

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
