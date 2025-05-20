import { API } from '@src/shared/constants';
import { getAPIResponseData } from '@src/shared/utils';

export const deleteUserFromRoom = async (roomId: string) => {
  return getAPIResponseData<void, void>({
    method: 'DELETE',
    url: API.DELETE_USER_FROM_ROOM(roomId),
    params: {
      roomId,
    },
  });
};
