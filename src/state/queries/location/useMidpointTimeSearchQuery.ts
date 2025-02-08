import { getMidpointTimeSearch } from '@src/apis/location/getMidpointTimeSearch';
import { IMidpointTimeSearchResponseType } from '@src/types/location/midpointTimeSearchResponseType';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LOCATION_KEY } from './key';

export const useMidpointTimeSearchQuery = (
  destLatitude: number,
  destLongitude: number,
  options?: UseQueryOptions<IMidpointTimeSearchResponseType, Error, any>,
) => {
  const { roomId } = useParams();

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: LOCATION_KEY.GET_MIDPOINT_TIME_SEARCH(roomId!),
    queryFn: () => getMidpointTimeSearch(roomId!, destLatitude, destLongitude),
    ...options,
  });
};
