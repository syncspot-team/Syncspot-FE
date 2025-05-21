import { API } from '@shared/constants';
import { IRecommendPlaceSearchResponseType } from '@shared/types/location/recommendPlaceSearchResponseType';
import { getAPIResponseData } from '@shared/utils';

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
