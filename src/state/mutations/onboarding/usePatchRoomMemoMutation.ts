import { patchRoomMemo } from '@src/apis/onboarding/patchRoomMemo';
import { IPatchRoomMemoRequestType } from '@src/types/onboarding/patchRoomMemoRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const usePatchRoomMemoMutation = (
  options?: UseMutationOptions<any, Error, IPatchRoomMemoRequestType>,
) => {
  return useMutation({
    mutationFn: patchRoomMemo,
    ...options,
  });
};
