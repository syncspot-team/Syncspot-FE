import { patchPlaceUpdate } from '@src/apis/location/patchPlaceUpdate';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IPlaceUpdateRequestType } from '@src/types/location/placeUpdateRequestType';

interface IPlaceUpdateRequest {
  roomId: string;
  placeUpdatePayload: IPlaceUpdateRequestType;
}

export const usePlaceUpdateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceUpdateRequest>,
) => {
  return useMutation({
    mutationFn: ({ roomId, placeUpdatePayload }: IPlaceUpdateRequest) =>
      patchPlaceUpdate(roomId, placeUpdatePayload),
    ...options,
  });
};
