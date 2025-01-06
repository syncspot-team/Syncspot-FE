import { postSignIn } from '@src/apis/auth/postSignIn';
import { ISignInRequest } from '@src/types/auth/SignInRequestType';
import { ISignInResponse } from '@src/types/auth/SignInResponseType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CustomToast from '@src/components/common/toast/customToast';
import { TOAST_TYPE } from '@src/types/toastType';
import { useLoginStore } from '@src/state/store/loginStore';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';

export const useSignInMutation = (
  options?: UseMutationOptions<ISignInResponse, Error, ISignInRequest>,
) => {
  const navigate = useNavigate();
  const { login } = useLoginStore();

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      if (data.data.accessToken && data.data.refreshToken) {
        login(data.data.accessToken, data.data.refreshToken);
        CustomToast({
          type: TOAST_TYPE.SUCCESS,
          message: '로그인에 성공하였습니다.',
        });
        navigate(PATH.ONBOARDING);
      } else {
        CustomToast({
          type: TOAST_TYPE.ERROR,
          message: '아이디 또는 비밀번호를 확인해주세요.',
        });
      }
    },
    ...options,
  });
};
