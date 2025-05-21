import { postSignUp } from '@src/apis/auth/postSignUp';
import { CustomToast } from '@shared/ui';
import { PATH } from '@shared/constants';
import { ISignUpRequest } from '@shared/types/auth/SignUpRequestType';
import { TOAST_TYPE } from '@shared/types/toastType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (
  options?: UseMutationOptions<any, Error, ISignUpRequest>,
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      CustomToast({
        type: TOAST_TYPE.SUCCESS,
        message: '회원가입에 성공하였습니다.',
      });
      navigate(PATH.ONBOARDING);
    },
    ...options,
  });
};
