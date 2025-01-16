import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deletePlaceDelete } from '@src/apis/location/deletePlaceDelete';

interface IPlaceDeleteRequest {
  placeId: number;
}

export const usePlaceDeleteMutation = (
  options?: UseMutationOptions<any, Error, IPlaceDeleteRequest>,
) => {
  return useMutation({
    mutationFn: ({ placeId }: IPlaceDeleteRequest) =>
      deletePlaceDelete(placeId),
    ...options,
  });
};
