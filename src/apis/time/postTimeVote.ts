import { API } from '@src/constants/api';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/types/time/timeVoteType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'POST',
    url: API.TIME_VOTE(roomId!),
    data: { dateTime },
  });
};
