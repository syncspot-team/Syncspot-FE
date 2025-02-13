import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchModifyPassword } from '@src/apis/users/patchModifyPassword';
import { IModifyPasswordRequestType } from '@src/types/users/modifyPasswordRequestType';

export const useModifyPasswordMutation = (
  options?: UseMutationOptions<any, Error, IModifyPasswordRequestType>,
) => {
  return useMutation({
    mutationFn: patchModifyPassword,
    ...options,
  });
};
