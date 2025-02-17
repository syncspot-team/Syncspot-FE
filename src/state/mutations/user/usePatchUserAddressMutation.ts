import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchUserAddress } from '@src/apis/users/patchUserAddress';
import { IModifyUserAddressRequest } from '@src/types/users/modifyUserAddressRequestType';

export const usePatchUserAddressMutation = (
  options?: UseMutationOptions<any, Error, IModifyUserAddressRequest>,
) => {
  return useMutation({
    mutationFn: patchUserAddress,
    ...options,
  });
};
