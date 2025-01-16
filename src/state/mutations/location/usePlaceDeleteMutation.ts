import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deletePlaceDelete } from '@src/apis/location/deletePlaceDelete';
import { LOCATION_KEY } from '@src/state/queries/location/key';

interface IPlaceDeleteRequest {
  placeId: number;
}

export const usePlaceDeleteMutation = (
  roomId: string,
  options?: UseMutationOptions<any, Error, IPlaceDeleteRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId }: IPlaceDeleteRequest) =>
      deletePlaceDelete(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId),
      });
    },
    ...options,
  });
};
