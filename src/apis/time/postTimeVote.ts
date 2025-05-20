import { API } from '@src/shared/constants';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/shared/types/time/timeVoteType';
import { getAPIResponseData } from '@src/shared/utils';

export const postTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'POST',
    url: API.TIME_VOTE(roomId!),
    data: { dateTime },
  });
};
