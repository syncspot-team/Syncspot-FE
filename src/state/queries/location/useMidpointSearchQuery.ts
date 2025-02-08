import { getMidpointSearch } from '@src/apis/location/getMidpointSearch';
import { LOCATION_KEY } from './key';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';

export const useMidpointSearchQuery = (
  options?: UseQueryOptions<IMidpointSearchResponseType, Error, any>,
) => {
  const { roomId } = useParams();

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: LOCATION_KEY.GET_MIDPOINT_SEARCH(roomId!),
    queryFn: () => getMidpointSearch(roomId!),
    ...options,
  });
};
