import { CustomToast } from '@shared/ui';
import { PATH } from '@shared/constants';
import { useLoginStore } from '@src/state/store/loginStore';
import { useRoomStore } from '@src/state/store/roomStore';
import { TOAST_TYPE } from '@shared/types/toastType';
import { useNavigate } from 'react-router-dom';

export const useNavigateWithRoomCheck = () => {
  const { isLogin } = useLoginStore();
  const { roomId } = useRoomStore();
  const navigate = useNavigate();

  return (path: string) => {
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
