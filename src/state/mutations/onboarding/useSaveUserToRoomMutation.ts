import { postSaveUserToRoom } from '@src/apis/onboarding/postSaveUserToRoom';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useSaveUserToRoomMutation = (
  options?: UseMutationOptions<any, Error, any>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSaveUserToRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
      });
    },
    ...options,
  });
};
