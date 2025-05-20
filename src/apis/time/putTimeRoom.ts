import { API } from '@src/shared/constants';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@src/shared/types/time/timeRoomType';
import { getAPIResponseData } from '@src/shared/utils';

export const putTimeRoom = async ({ roomId, dates }: ITimeRoomRequest) => {
  return getAPIResponseData<ITimeRoomResponse, ITimeRoomRequest>({
    method: 'PUT',
    url: API.TIME_VOTE_ROOM_UPDATE(roomId!),
    data: { dates },
  });
};
