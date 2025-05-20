import { API } from '@src/shared/constants';
import { ITimeDatesResponseType } from '@src/shared/types/time/timeDatesResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getTimeDates = async (roomId: string) => {
  return getAPIResponseData<ITimeDatesResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_ROOM_CHECK(roomId),
  });
};
