import { API } from '@src/constants/api';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const deleteUserFromRoom = async (roomId: string) => {
  return getAPIResponseData<void, void>({
    method: 'DELETE',
    url: API.DELETE_USER_FROM_ROOM(roomId),
    params: {
      roomId,
    },
  });
};
