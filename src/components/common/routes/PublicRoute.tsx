import { Navigate, Outlet } from 'react-router-dom';
import { useLoginStore } from '@src/state/store/loginStore';

export default function PublicRoute() {
  const { isLogin } = useLoginStore();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
