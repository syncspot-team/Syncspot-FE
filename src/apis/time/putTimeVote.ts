import { API } from '@src/shared/constants';
import {
  ITimeVoteRequest,
  ITimeVoteResponse,
} from '@src/shared/types/time/timeVoteType';
import { getAPIResponseData } from '@src/shared/utils';

export const putTimeVote = async ({ roomId, dateTime }: ITimeVoteRequest) => {
  return getAPIResponseData<ITimeVoteResponse, ITimeVoteRequest>({
    method: 'PUT',
    url: API.TIME_REVOTE(roomId!),
    data: { dateTime },
  });
};
