import { API } from '@shared/constants';
import { getAPIResponseData } from '@shared/utils';

export const deleteUserFromRoom = async (roomId: string) => {
  return getAPIResponseData<void, void>({
    method: 'DELETE',
    url: API.DELETE_USER_FROM_ROOM(roomId),
    params: {
      roomId,
    },
  });
};
