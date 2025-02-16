import { deleteUserFromRoom } from '@src/apis/onboarding/deleteUserFromRoom';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useDeleteUserFromRoomMutation = (
  options?: UseMutationOptions<any, Error, any>,
) => {
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: () => deleteUserFromRoom(roomId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
      });
    },
    ...options,
  });
};
