import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';

export default function LandingPage() {
  const handleClick = () => {
    CustomToast({
      type: TOAST_TYPE.SUCCESS,
      status: '200',
      message: 'wow',
    });
  };
  return (
    <>
      <h1>Home 마이그레이션 version 4.5.1</h1>
      <button onClick={handleClick}>click me</button>
    </>
  );
}
