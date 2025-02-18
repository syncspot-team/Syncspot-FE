import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { patchUserNickName } from '@src/apis/users/patchUserNickName';
import { IModifyUserNicknameRequest } from '@src/types/users/modifyUserNicknameRequestType';
import { USER_QUERY_KEY } from '@src/state/queries/users/key';

export const usePatchUserNickNameMutation = (
  options?: UseMutationOptions<any, Error, IModifyUserNicknameRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserNickName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.USER_INFO });
    },
    ...options,
  });
};
