import { postCreateRoom } from '@src/apis/onboarding/postCreateRoom';
import { ICreateRoomRequest } from '@src/shared/types/onboarding/createRoomRequestType';
import { ICreateRoomResponse } from '@src/shared/types/onboarding/createRoomResponseType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useCreateRoomMutation = (
  options?: UseMutationOptions<ICreateRoomResponse, Error, ICreateRoomRequest>,
) => {
  return useMutation({
    mutationFn: postCreateRoom,
    ...options,
  });
};
