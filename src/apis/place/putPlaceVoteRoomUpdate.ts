import { API } from '@src/shared/constants';
import { IPlaceVoteRoomUpdateRequestType } from '@src/shared/types/place/placeVoteRoomUpdateRequestType';
import { getAPIResponseData } from '@src/shared/utils';

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
