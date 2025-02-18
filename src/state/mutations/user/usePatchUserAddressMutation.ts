import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { patchUserAddress } from '@src/apis/users/patchUserAddress';
import { IModifyUserAddressRequest } from '@src/types/users/modifyUserAddressRequestType';
import { USER_QUERY_KEY } from '@src/state/queries/users/key';

export const usePatchUserAddressMutation = (
  options?: UseMutationOptions<any, Error, IModifyUserAddressRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.USER_INFO });
    },
    ...options,
  });
};
