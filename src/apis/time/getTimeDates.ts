import { API } from '@src/constants/api';
import { ITimeDatesResponseType } from '@src/types/time/timeDatesResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getTimeDates = async (roomId: string) => {
  return getAPIResponseData<ITimeDatesResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_ROOM_CHECK(roomId),
  });
};
