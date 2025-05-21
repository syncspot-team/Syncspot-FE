import { API } from '@shared/constants';
import { IPlaceVoteLookupResponseType } from '@shared/types/place/placeVoteLookupResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getPlaceVoteLookup = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteLookupResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_LOOKUP(roomId),
    params: {
      roomId,
    },
  });
};
