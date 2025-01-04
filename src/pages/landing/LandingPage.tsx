import CustomToast from '@src/components/common/toast/customToast';
import { useGetExamQuery } from '@src/state/queries/exam/useGetExamQuery';
import { useLoginStore } from '@src/state/store/loginStore';
import { TOAST_TYPE } from '@src/types/toastType';

export default function LandingPage() {
  const { data } = useGetExamQuery();
  const { login, logout } = useLoginStore();

  const handleClick = () => {
    CustomToast({
      type: TOAST_TYPE.SUCCESS,
      status: '200',
      message: 'wow',
    });
  };
  const handleLogin = () => {
    login('1234');
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <h1>Home 마이그레이션 version 4.5.1</h1>
      <button onClick={handleClick}>click me</button>
      <button onClick={handleLogin}>login</button> <br />
      <button onClick={handleLogout}>logout</button> <br />
      <div>{data?.title}</div>
    </>
  );
}
