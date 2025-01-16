import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postPlaceSave } from '@src/apis/location/postPlaceSave';
import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';

interface IPlaceSaveRequest {
  roomId: string;
  placeSavePayload: IPlaceSaveRequestType;
}

export const usePlaceSaveMutation = (
  options?: UseMutationOptions<any, Error, IPlaceSaveRequest>,
) => {
  return useMutation({
    mutationFn: ({ roomId, placeSavePayload }: IPlaceSaveRequest) =>
      postPlaceSave(roomId, placeSavePayload),
    ...options,
  });
};
