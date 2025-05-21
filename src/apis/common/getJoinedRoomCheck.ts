import { API } from '@shared/constants';
import { IJoinedRoomCheckResponseType } from '@shared/types/common/joinedRoomCheckResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getJoinedRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IJoinedRoomCheckResponseType, void>({
    method: 'GET',
    url: API.JOINED_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
