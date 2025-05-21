import { API } from '@shared/constants';
import { IPlaceVoteRoomCheckResponseType } from '@shared/types/place/placeVoteRoomCheckResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getPlaceVoteRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteRoomCheckResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
