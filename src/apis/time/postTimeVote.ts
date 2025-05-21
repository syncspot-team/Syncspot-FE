import { API } from '@shared/constants';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@shared/types/time/timeVoteType';
import { getAPIResponseData } from '@shared/utils';

export const postTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'POST',
    url: API.TIME_VOTE(roomId!),
    data: { dateTime },
  });
};
