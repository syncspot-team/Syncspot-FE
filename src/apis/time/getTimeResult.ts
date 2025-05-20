import { API } from '@src/shared/constants';
import { ITimeResultResponseType } from '@src/shared/types/time/timeResultType';
import { getAPIResponseData } from '@src/shared/utils';

export const getTimeResult = async (roomId: string) => {
  return getAPIResponseData<ITimeResultResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_RESULT(roomId),
  });
};
