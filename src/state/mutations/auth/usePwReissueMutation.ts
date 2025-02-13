import { postPwReissue } from '@src/apis/auth/postPwReissue';
import { IPwReissueRequestType } from '@src/types/auth/PwReissueRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const usePwReissueMutation = (
  options?: UseMutationOptions<any, Error, IPwReissueRequestType>,
) => {
  return useMutation({
    mutationFn: postPwReissue,
    ...options,
  });
};
