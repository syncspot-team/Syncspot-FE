import { patchRoomName } from '@src/apis/onboarding/patchRoomName';
import { IPatchRoomNameRequestType } from '@src/types/onboarding/patchRoomNameRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const usePatchRoomNameMutation = (
  options?: UseMutationOptions<any, Error, IPatchRoomNameRequestType>,
) => {
  return useMutation({
    mutationFn: patchRoomName,
    ...options,
  });
};
