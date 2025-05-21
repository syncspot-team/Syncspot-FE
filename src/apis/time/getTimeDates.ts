import { API } from '@shared/constants';
import { ITimeDatesResponseType } from '@shared/types/time/timeDatesResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getTimeDates = async (roomId: string) => {
  return getAPIResponseData<ITimeDatesResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_ROOM_CHECK(roomId),
  });
};
