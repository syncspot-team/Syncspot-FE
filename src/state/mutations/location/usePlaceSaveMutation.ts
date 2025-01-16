import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { postPlaceSave } from '@src/apis/location/postPlaceSave';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { LOCATION_KEY } from '@src/state/queries/location/key';

interface IPlaceSaveRequest {
  placeSavePayload: IPlaceSaveRequestType;
}

export const usePlaceSaveMutation = (
  roomId: string,
  options?: UseMutationOptions<any, Error, IPlaceSaveRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeSavePayload }: IPlaceSaveRequest) =>
      postPlaceSave(roomId, placeSavePayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId),
      });
    },
    ...options,
  });
};
