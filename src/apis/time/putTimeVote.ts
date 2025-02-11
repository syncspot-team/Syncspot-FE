import { API } from '@src/constants/api';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/types/time/timeVoteType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const putTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'PUT',
    url: API.TIME_REVOTE(roomId!),
    data: { dateTime },
  });
};
