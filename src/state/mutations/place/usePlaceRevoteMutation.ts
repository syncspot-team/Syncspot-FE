import { putPlaceRevote } from '@src/apis/place/putPlaceRevote';
import { PLACE_VOTE_ROOM_KEY } from '@src/state/queries/place/key';
import { IPlaceRevoteRequestType } from '@src/types/place/placeRevoteRequestType';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceRevoteMutation = (
  options?: UseMutationOptions<any, Error, IPlaceRevoteRequestType>,
) => {
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (placeRevotePayload: IPlaceRevoteRequestType) =>
      putPlaceRevote(roomId!, placeRevotePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PLACE_VOTE_ROOM_KEY.GET_PLACE_VOTE_LOOKUP(roomId!),
      });
    },
    ...options,
  });
};
