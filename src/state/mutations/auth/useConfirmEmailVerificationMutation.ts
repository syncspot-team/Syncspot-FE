import { postConfirmEmailVerification } from '@src/apis/auth/postConfirmEmailVerification';
import {
  ISignUpConfirmEmailVerificationResponseType,
  ISignUpConfirmEmailVerificationType,
} from '@src/types/auth/SignUpVerificationType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useConfirmEmailVerificationMutation = (
  options?: UseMutationOptions<
    ISignUpConfirmEmailVerificationResponseType,
    Error,
    ISignUpConfirmEmailVerificationType
  >,
) => {
  return useMutation({
    mutationFn: postConfirmEmailVerification,
    ...options,
  });
};
