import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deletePlaceDelete } from '@src/apis/location/deletePlaceDelete';
import { LOCATION_KEY } from '@src/state/queries/location/key';
import { useParams } from 'react-router-dom';

interface IPlaceDeleteRequest {
  placeId: number;
}

export const usePlaceDeleteMutation = (
  options?: UseMutationOptions<any, Error, IPlaceDeleteRequest>,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeId }: IPlaceDeleteRequest) =>
      deletePlaceDelete(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
      });
    },
    ...options,
  });
};
