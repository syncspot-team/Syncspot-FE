import { API } from '@shared/constants';
import { ITimeVotedResponseType } from '@shared/types/time/timeVotedResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getTimeVoted = async (roomId: string) => {
  return getAPIResponseData<ITimeVotedResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_LOOKUP(roomId),
  });
};
