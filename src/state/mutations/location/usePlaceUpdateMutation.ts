import { patchPlaceUpdate } from '@src/apis/location/patchPlaceUpdate';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { IPlaceUpdateRequestType } from '@src/types/location/placeUpdateRequestType';
import { LOCATION_KEY } from '@src/state/queries/location/key';

interface IPlaceUpdateRequest {
  placeUpdatePayload: IPlaceUpdateRequestType;
}

export const usePlaceUpdateMutation = (
  roomId: string,
  options?: UseMutationOptions<any, Error, IPlaceUpdateRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeUpdatePayload }: IPlaceUpdateRequest) =>
      patchPlaceUpdate(roomId, placeUpdatePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId),
      });
    },
    ...options,
  });
};
