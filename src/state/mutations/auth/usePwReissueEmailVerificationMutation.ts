import { postPwReissueEmailVerification } from '@src/apis/auth/postPwReissueEmailVerification';
import { IPwReissueEmailVerificationRequestType } from '@shared/types/auth/PwReissueEmailVerificationRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const usePwReissueEmailVerificationMutation = (
  options?: UseMutationOptions<
    any,
    Error,
    IPwReissueEmailVerificationRequestType
  >,
) => {
  return useMutation({
    mutationFn: postPwReissueEmailVerification,
    ...options,
  });
};
