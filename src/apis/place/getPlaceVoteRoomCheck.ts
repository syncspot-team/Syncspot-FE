import { API } from '@src/constants/api';
import { IPlaceVoteRoomCheckResponseType } from '@src/types/place/placeVoteRoomCheckResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getPlaceVoteRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteRoomCheckResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
