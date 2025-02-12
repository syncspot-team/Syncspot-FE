import { API } from '@src/constants/api';
import { IPlaceVoteLookupResponseType } from '@src/types/place/placeVoteLookupResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getPlaceVoteLookup = async (roomId: string) => {
  return getAPIResponseData<IPlaceVoteLookupResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_LOOKUP(roomId),
    params: {
      roomId,
    },
  });
};
