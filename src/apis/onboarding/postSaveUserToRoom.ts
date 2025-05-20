import { API } from '@src/shared/constants';
import { getAPIResponseData } from '@src/shared/utils';

interface IPostSaveUserToRoomProps {
  roomId: string;
}

export const postSaveUserToRoom = async ({
  roomId,
}: IPostSaveUserToRoomProps) => {
  return getAPIResponseData<void, void>({
    method: 'POST',
    url: API.SAVE_USER_TO_ROOM(roomId),
    params: {
      roomId,
    },
  });
};
