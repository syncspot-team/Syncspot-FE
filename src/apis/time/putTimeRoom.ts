import { API } from '@src/constants/api';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const putTimeRoom = async ({ roomId, dates }: ITimeRoomRequest) => {
  return getAPIResponseData<ITimeRoomResponse, ITimeRoomRequest>({
    method: 'PUT',
    url: API.TIME_VOTE_ROOM_UPDATE(roomId!),
    data: { dates },
  });
};
