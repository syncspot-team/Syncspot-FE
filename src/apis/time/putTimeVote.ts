import { API } from '@shared/constants';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@shared/types/time/timeVoteType';
import { getAPIResponseData } from '@shared/utils';

export const putTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'PUT',
    url: API.TIME_REVOTE(roomId!),
    data: { dateTime },
  });
};
