import { API } from '@shared/constants';
import { ITimeResultResponseType } from '@shared/types/time/timeResultType';
import { getAPIResponseData } from '@shared/utils';

export const getTimeResult = async (roomId: string) => {
  return getAPIResponseData<ITimeResultResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_RESULT(roomId),
  });
};
