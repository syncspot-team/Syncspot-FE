import { API } from '@src/shared/constants';
import { IPlaceVoteRoomCheckResponseType } from '@src/shared/types/place/placeVoteRoomCheckResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getPlaceVoteRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteRoomCheckResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
