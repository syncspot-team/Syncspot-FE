import { API } from '@shared/constants';
import { PlaceVoteResultResponseType } from '@shared/types/place/placeVoteResultResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getPlaceVoteResult = async (roomId: string) => {
  return getAPIResponseData<PlaceVoteResultResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_RESULT(roomId),
    params: {
      roomId,
    },
  });
};
