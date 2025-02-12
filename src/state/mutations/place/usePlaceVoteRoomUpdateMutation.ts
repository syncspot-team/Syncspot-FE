import { putPlaceVoteRoomUpdate } from '@src/apis/place/putPlaceVoteRoomUpdate';
import { PLACE_VOTE_ROOM_KEY } from '@src/state/queries/place/key';
import { IPlaceVoteRoomUpdateRequestType } from '@src/types/place/placeVoteRoomUpdateRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceVoteRoomUpdateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceVoteRoomUpdateRequestType>,
) => {
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (placeVoteRoomUpdatePayload: IPlaceVoteRoomUpdateRequestType) =>
      putPlaceVoteRoomUpdate(roomId!, placeVoteRoomUpdatePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_ROOM_CHECK(roomId!),
      });
      queryClient.invalidateQueries({
        queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_RESULT(roomId!),
      });
    },
    ...options,
  });
};
