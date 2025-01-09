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
      // status는 200이나 data값이 존재하지 않을 경우 사용자가 입력한 회원정보가 올바르지 않은 문제
      if (!data.data) {
        CustomToast({
          type: TOAST_TYPE.ERROR,
          message: '아이디 또는 비밀번호를 확인해주세요.',
        });
      }
      // 로그인 성공시 accessToken, refreshToken 저장
      else if (data.data.accessToken && data.data.refreshToken) {
        login(data.data.accessToken, data.data.refreshToken);
        CustomToast({
          type: TOAST_TYPE.SUCCESS,
          message: '로그인에 성공하였습니다.',
        });
        navigate(PATH.ONBOARDING);
      }
    },
    ...options,
  });
};
