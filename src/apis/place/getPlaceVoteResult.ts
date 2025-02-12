import { API } from '@src/constants/api';
import { PlaceVoteResultResponseType } from '@src/types/place/placeVoteResultResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getPlaceVoteResult = async (roomId: string) => {
  return getAPIResponseData<PlaceVoteResultResponseType, void>({
    method: 'GET',
    url: API.PLACE_VOTE_RESULT(roomId),
    params: {
      roomId,
    },
  });
};
