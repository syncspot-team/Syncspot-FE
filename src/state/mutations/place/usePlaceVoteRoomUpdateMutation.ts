import { putPlaceVoteRoomUpdate } from '@src/apis/place/putPlaceVoteRoomUpdate';
import { IPlaceVoteRoomUpdateRequestType } from '@src/types/place/placeVoteRoomUpdateRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceVoteRoomUpdateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceVoteRoomUpdateRequestType>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (placeVoteRoomUpdatePayload: IPlaceVoteRoomUpdateRequestType) =>
      putPlaceVoteRoomUpdate(roomId!, placeVoteRoomUpdatePayload),
    ...options,
  });
};
