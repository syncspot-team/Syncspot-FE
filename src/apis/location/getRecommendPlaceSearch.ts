import { API } from '@src/constants/api';
import { IRecommendPlaceSearchResponseType } from '@src/types/location/recommendPlaceSearchResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const getRecommendPlaceSearch = async (
  addressLat: number,
  addressLong: number,
  placeStandard: string,
  page: number,
) => {
  return getAPIResponseData<IRecommendPlaceSearchResponseType, void>({
    method: 'GET',
    url: API.RECOMMEND_PLACE_SEARCH,
    params: {
      addressLat,
      addressLong,
      placeStandard,
      page,
    },
  });
};
