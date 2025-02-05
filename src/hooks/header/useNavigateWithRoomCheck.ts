import CustomToast from '@src/components/common/toast/customToast';
import { PATH } from '@src/constants/path';
import { useLoginStore } from '@src/state/store/loginStore';
import { useRoomIdStore } from '@src/state/store/roomIdStore';
import { TOAST_TYPE } from '@src/types/toastType';
import { useNavigate } from 'react-router-dom';

export const useNavigateWithRoomCheck = () => {
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomIdStore();
  const navigate = useNavigate();

  return (path: string, callback?: () => void) => {
    callback?.();

    if (path === PATH.ABOUT) {
      navigate(path);
      return;
    }

    if (!isLogin) {
      navigate(PATH.SIGN_IN);
      return;
    }
    if (!roomId) {
      CustomToast({
        type: TOAST_TYPE.ERROR,
        message: '모임을 선택해주세요!',
      });
    } else {
      navigate(path);
    }
  };
};
