import { API } from '@src/shared/constants';
import { IJoinedRoomCheckResponseType } from '@src/shared/types/common/joinedRoomCheckResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getJoinedRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IJoinedRoomCheckResponseType, void>({
    method: 'GET',
    url: API.JOINED_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
