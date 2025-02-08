import { API } from '@src/constants/api';
import { IJoinedRoomCheckResponseType } from '@src/types/common/joinedRoomCheckResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getJoinedRoomCheck = async (roomId: string) => {
  return getAPIResponseData<IJoinedRoomCheckResponseType, void>({
    method: 'GET',
    url: API.JOINED_ROOM_CHECK(roomId),
    params: {
      roomId,
    },
  });
};
