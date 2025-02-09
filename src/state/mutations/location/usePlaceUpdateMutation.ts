import { patchPlaceUpdate } from '@src/apis/location/patchPlaceUpdate';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { IPlaceUpdateRequestType } from '@src/types/location/placeUpdateRequestType';
import { LOCATION_KEY } from '@src/state/queries/location/key';
import { useParams } from 'react-router-dom';

interface IPlaceUpdateRequest {
  placeUpdatePayload: IPlaceUpdateRequestType;
}

export const usePlaceUpdateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceUpdateRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeUpdatePayload }: IPlaceUpdateRequest) =>
      patchPlaceUpdate(roomId!, placeUpdatePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
      });
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_MIDPOINT_SEARCH(roomId!),
      });
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_RECOMMEND_PLACE_SEARCH(roomId!),
      });
    },
    ...options,
  });
};
