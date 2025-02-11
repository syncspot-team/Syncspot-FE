import { postPlaceVoteRoomCreate } from '@src/apis/place/postPlaceVoteRoomCreate';
import { IPlaceVoteRoomCreateRequestType } from '@src/types/place/placeVoteRoomCreateRequestType';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const usePlaceVoteRoomCreateMutation = (
  options?: UseMutationOptions<any, Error, IPlaceVoteRoomCreateRequestType>,
) => {
  const { roomId } = useParams();

  return useMutation({
    mutationFn: (placeVoteRoomCreatePayload: IPlaceVoteRoomCreateRequestType) =>
      postPlaceVoteRoomCreate(roomId!, placeVoteRoomCreatePayload),
    ...options,
  });
};
