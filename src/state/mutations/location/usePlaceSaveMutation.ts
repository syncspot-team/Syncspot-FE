import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { postPlaceSave } from '@src/apis/location/postPlaceSave';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { LOCATION_KEY } from '@src/state/queries/location/key';
import { IPlaceSaveResponseType } from '@src/types/location/placeSaveResponseType';
import { useParams } from 'react-router-dom';

interface IPlaceSaveRequest {
  placeSavePayload: IPlaceSaveRequestType;
}

export const usePlaceSaveMutation = (
  options?: UseMutationOptions<
    IPlaceSaveResponseType,
    Error,
    IPlaceSaveRequest
  >,
) => {
  const { roomId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ placeSavePayload }: IPlaceSaveRequest) =>
      postPlaceSave(roomId!, placeSavePayload),
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
