import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchUserNickName } from '@src/apis/users/patchUserNickName';
import { IModifyUserNicknameRequest } from '@src/types/users/modifyUserNicknameRequestType';

export const usePatchUserNickNameMutation = (
  options?: UseMutationOptions<any, Error, IModifyUserNicknameRequest>,
) => {
  return useMutation({
    mutationFn: patchUserNickName,
    ...options,
  });
};
