import { API } from '@shared/constants';
import {
  ITimeRoomRequest,
  ITimeRoomResponse,
} from '@shared/types/time/timeRoomType';
import { getAPIResponseData } from '@shared/utils';

export const putTimeRoom = async ({ roomId, dates }: ITimeRoomRequest) => {
  return getAPIResponseData<ITimeRoomResponse, ITimeRoomRequest>({
    method: 'PUT',
    url: API.TIME_VOTE_ROOM_UPDATE(roomId!),
    data: { dates },
  });
};
