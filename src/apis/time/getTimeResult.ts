import { API } from '@src/constants/api';
import { ITimeResultResponseType } from '@src/types/time/timeResultType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getTimeResult = async (roomId: string) => {
  return getAPIResponseData<ITimeResultResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_RESULT(roomId),
  });
};
