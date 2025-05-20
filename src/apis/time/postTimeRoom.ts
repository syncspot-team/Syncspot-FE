import { API } from '@src/shared/constants';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/shared/types/time/timeRoomType';
import { getAPIResponseData } from '@src/shared/utils';

export const postTimeRoom = async ({ roomId, dates }: ITimeRoomRequest) => {
  return getAPIResponseData<ITimeRoomResponse, ITimeRoomRequest>({
    method: 'POST',
    url: API.TIME_VOTE_ROOM_CREATE(roomId!),
    data: { dates },
  });
};
