import { postRequestEmailVerification } from '@src/apis/auth/postRequestEmailVerification';
import { ISignUpRequestEmailVerificationType } from '@src/types/auth/SignUpVerificationType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useRequestEmailVerificationMutation = (
  options?: UseMutationOptions<any, Error, ISignUpRequestEmailVerificationType>,
) => {
  return useMutation({
    mutationFn: postRequestEmailVerification,
    ...options,
  });
};
