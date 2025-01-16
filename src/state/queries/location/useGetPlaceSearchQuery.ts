import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { LOCATION_KEY } from './key';
import { getPlaceSearch } from '@src/apis/location/getPlaceSearch';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';

export const useGetPlaceSearchQuery = (
  roomId: string,
  options?: UseQueryOptions<
    IPlaceSearchResponseType,
    Error,
    IPlaceSearchResponseType
  >,
) => {
  return useQuery({
    queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId),
    queryFn: () => getPlaceSearch(roomId),
    ...options,
  });
};
