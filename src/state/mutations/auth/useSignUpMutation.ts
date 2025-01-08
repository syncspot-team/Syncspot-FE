import { postSignUp } from '@src/apis/auth/postSignUp';
import CustomToast from '@src/components/common/toast/customToast';
import { PATH } from '@src/constants/path';
import { ISignUpRequest } from '@src/types/auth/SignUpRequestType';
import { TOAST_TYPE } from '@src/types/toastType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignUpMutation = (
  options?: UseMutationOptions<any, Error, ISignUpRequest>,
) => {
  const navigate = useNavigate();

  const userSignup = useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      CustomToast({
        type: TOAST_TYPE.SUCCESS,
        message: '회원가입에 성공하였습니다.',
      });
      navigate(PATH.SIGN_IN);
    },
    ...options,
  });

  return userSignup;
};
