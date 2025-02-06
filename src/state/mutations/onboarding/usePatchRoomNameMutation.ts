import { patchRoomName } from '@src/apis/onboarding/patchRoomName';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { IPatchRoomNameRequestType } from '@src/types/onboarding/patchRoomNameRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const usePatchRoomNameMutation = (
  options?: UseMutationOptions<any, Error, IPatchRoomNameRequestType>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRoomName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
      });
    },
    ...options,
  });
};
