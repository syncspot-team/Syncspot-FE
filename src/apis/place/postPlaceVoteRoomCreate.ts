import { API } from '@src/shared/constants';
import { IPlaceVoteRoomCreateRequestType } from '@src/shared/types/place/placeVoteRoomCreateRequestType';
import { getAPIResponseData } from '@src/shared/utils';

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
