import { API } from '@src/constants/api';
import { ITimeVotedResponseType } from '@src/types/time/timeVotedResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getTimeVoted = async (roomId: string) => {
  return getAPIResponseData<ITimeVotedResponseType, void>({
    method: 'GET',
    url: API.TIME_VOTE_LOOKUP(roomId),
  });
};
