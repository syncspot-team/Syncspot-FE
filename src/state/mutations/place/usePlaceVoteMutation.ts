import { postPlaceVote } from '@src/apis/place/postPlaceVote';
import { PLACE_VOTE_ROOM_KEY } from '@src/state/queries/place/key';
import { IPlaceVoteRequestType } from '@src/types/place/placeVoteRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceVoteMutation = (
  options?: UseMutationOptions<any, Error, IPlaceVoteRequestType>,
) => {
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (placeVotePayload: IPlaceVoteRequestType) =>
      postPlaceVote(roomId!, placeVotePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_LOOKUP(roomId!),
      });
    },
    ...options,
  });
};
