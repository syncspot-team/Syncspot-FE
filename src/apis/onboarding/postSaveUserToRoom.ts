import { API } from '@src/constants/api';
import getAPIResponseData from '@src/utils/getAPIResponseData';

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
