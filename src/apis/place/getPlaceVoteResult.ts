import { API } from '@src/shared/constants';
import { PlaceVoteResultResponseType } from '@src/shared/types/place/placeVoteResultResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getPlaceVoteResult = async (roomId: string) => {
  return getAPIResponseData<PlaceVoteResultResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_RESULT(roomId),
    params: {
      roomId,
    },
  });
};
