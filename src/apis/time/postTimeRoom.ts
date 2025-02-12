import { API } from '@src/constants/api';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/types/time/timeRoomType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postTimeRoom = async ({ roomId, dates }: ITimeRoomRequest) => {
  return getAPIResponseData<ITimeRoomResponse, ITimeRoomRequest>({
    method: 'POST',
    url: API.TIME_VOTE_ROOM_CREATE(roomId!),
    data: { dates },
  });
};
