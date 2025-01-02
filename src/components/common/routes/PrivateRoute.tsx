import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { isLogin } = useLoginStore();

  if (!isLogin) {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }
  return <Outlet />;
}
