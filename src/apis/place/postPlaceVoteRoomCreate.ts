import { API } from '@src/constants/api';
import { IPlaceVoteRoomCreateRequestType } from '@src/types/place/placeVoteRoomCreateRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postPlaceVoteRoomCreate = async (
  roomId: string,
  placeVoteRoomCreatePayload: IPlaceVoteRoomCreateRequestType,
) => {
  return getAPIResponseData<void, IPlaceVoteRoomCreateRequestType>({
    method: 'POST',
    url: API.PLACE_VOTE_ROOM_CREATE(roomId),
    data: placeVoteRoomCreatePayload,
    params: {
      roomId,
    },
  });
};
