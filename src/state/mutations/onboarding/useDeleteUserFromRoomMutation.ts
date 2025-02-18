import { deleteUserFromRoom } from '@src/apis/onboarding/deleteUserFromRoom';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { IDeleteUserFromRoomRequest } from '@src/types/onboarding/deleteUserFromRoomRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useDeleteUserFromRoomMutation = (
  options?: UseMutationOptions<any, Error, IDeleteUserFromRoomRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ selectedRoomId }: IDeleteUserFromRoomRequest) =>
      deleteUserFromRoom(selectedRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_JOINED_ROOM(),
      });
    },
    ...options,
  });
};
