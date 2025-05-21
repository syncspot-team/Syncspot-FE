import { API } from '@shared/constants';
import { IPlaceVoteRoomUpdateRequestType } from '@shared/types/place/placeVoteRoomUpdateRequestType';
import { getAPIResponseData } from '@shared/utils';

export const putPlaceVoteRoomUpdate = async (
  roomId: string,
  placeVoteRoomUpdatePayload: IPlaceVoteRoomUpdateRequestType,
) => {
  return getAPIResponseData<void, IPlaceVoteRoomUpdateRequestType>({
    method: 'PUT',
    url: API.PLACE_VOTE_ROOM_UPDATE(roomId),
    data: placeVoteRoomUpdatePayload,
    params: { roomId },
  });
};
