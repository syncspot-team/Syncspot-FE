import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { LOCATION_KEY } from './key';
import { getPlaceSearch } from '@src/apis/location/getPlaceSearch';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import { useParams } from 'react-router-dom';

export const useGetPlaceSearchQuery = (
  options?: UseQueryOptions<IPlaceSearchResponseType, Error, any>,
) => {
  const { roomId } = useParams();

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: LOCATION_KEY.GET_PLACE_SEARCH(roomId!),
    queryFn: () => getPlaceSearch(roomId!),
    ...options,
  });
};
