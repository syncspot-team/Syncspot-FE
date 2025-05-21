import { API } from '@shared/constants';
import { IPlaceSearchResponseType } from '@shared/types/location/placeSearchResponseType';
import { getAPIResponseData } from '@shared/utils';

export const getPlaceSearch = async (roomId: string) => {
  return getAPIResponseData<IPlaceSearchResponseType, void>({
    method: 'GET',
    url: API.PLACE_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
