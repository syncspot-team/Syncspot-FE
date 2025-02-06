import { patchRoomMemo } from '@src/apis/onboarding/patchRoomMemo';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { IPatchRoomMemoRequestType } from '@src/types/onboarding/patchRoomMemoRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const usePatchRoomMemoMutation = (
  options?: UseMutationOptions<any, Error, IPatchRoomMemoRequestType>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRoomMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
      });
    },
    ...options,
  });
};
