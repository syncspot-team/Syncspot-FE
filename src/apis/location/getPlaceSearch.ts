import { API } from '@src/constants/api';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getPlaceSearch = async (roomId: string) => {
  return getAPIResponseData<IPlaceSearchResponseType, void>({
    method: 'GET',
    url: API.PLACE_SEARCH(roomId),
    params: {
      roomId,
    },
  });
};
