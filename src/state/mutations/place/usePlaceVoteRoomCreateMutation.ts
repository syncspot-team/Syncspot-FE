import { postPlaceVoteRoomCreate } from '@src/apis/place/postPlaceVoteRoomCreate';
import { ROOM_QUERY_KEY } from '@src/state/queries/header/key';
import { IPlaceVoteRoomCreateRequestType } from '@src/types/place/placeVoteRoomCreateRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceVoteRoomCreateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceVoteRoomCreateRequestType>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (placeVoteRoomCreatePayload: IPlaceVoteRoomCreateRequestType) =>
      postPlaceVoteRoomCreate(roomId!, placeVoteRoomCreatePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEY.GET_PLACE_VOTE_ROOM_EXISTS(roomId!),
      });
    },
    ...options,
  });
};
