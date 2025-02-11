import { getRecommendPlaceSearch } from '@src/apis/location/getRecommendPlaceSearch';
import { IRecommendPlaceSearchResponseType } from '@src/types/location/recommendPlaceSearchResponseType';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { LOCATION_KEY } from './key';

export const useGetRecommendPlaceSearchQuery = (
  placeStandard: string,
  page: number,
  options?: Omit<
    UseQueryOptions<IRecommendPlaceSearchResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const addressLat = searchParams.get('lat');
  const addressLong = searchParams.get('lng');

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: LOCATION_KEY.GET_RECOMMEND_PLACE_SEARCH(roomId!),
    queryFn: () =>
      getRecommendPlaceSearch(
        Number(addressLat),
        Number(addressLong),
        placeStandard,
        page,
      ),
    enabled: !!addressLat && !!addressLong && !!searchParams.get('location'),
    ...options,
  });
};
