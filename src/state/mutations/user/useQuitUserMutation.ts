import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteQuitUser } from '@src/apis/users/deleteQuitUser';
import { IQuitUserRequestType } from '@shared/types/users/quitUserRequestType';

export const useQuitUserMutation = (
  options?: UseMutationOptions<any, Error, IQuitUserRequestType>,
) => {
  return useMutation({
    mutationFn: deleteQuitUser,
    ...options,
  });
};
