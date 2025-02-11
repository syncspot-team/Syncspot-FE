import { API } from '@src/constants/api';
import { IPlaceVoteRoomUpdateRequestType } from '@src/types/place/placeVoteRoomUpdateRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
