import { API } from '@src/shared/constants';
import { IPlaceSearchResponseType } from '@src/shared/types/location/placeSearchResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const getPlaceSearch = async (roomId: string) => {
  return getAPIResponseData<IPlaceSearchResponseType, void>({
    method: 'GET',
    url: API.PLACE_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
