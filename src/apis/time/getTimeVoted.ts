import { API } from '@src/shared/constants';
import { ITimeVotedResponseType } from '@src/shared/types/time/timeVotedResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getTimeVoted = async (roomId: string) => {
  return getAPIResponseData<ITimeVotedResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_LOOKUP(roomId),
  });
};
