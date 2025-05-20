import { API } from '@src/shared/constants';
import { IPlaceVoteLookupResponseType } from '@src/shared/types/place/placeVoteLookupResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getPlaceVoteLookup = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteLookupResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_LOOKUP(roomId),
    params: {
      roomId,
    },
  });
};
