import { getMidpointSearch } from '@src/apis/location/getMidpointSearch';
import { LOCATION_KEY } from './key';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IMidpointSearchResponseType } from '@src/types/location/midpointSearchResponseType';

export const useMidpointSearchQuery = (
  options?: Omit<
    UseQueryOptions<IMidpointSearchResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useParams();

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: LOCATION_KEY.GET_MIDPOINT_SEARCH(roomId!),
    queryFn: async () => {
      try {
        return await getMidpointSearch(roomId!);
      } catch (error) {
        if (error instanceof Error && error.message.includes('404')) {
          return {
            data: [],
            isSuccess: true,
            status: 200,
          } as IMidpointSearchResponseType;
        }
        throw error;
      }
    },
    ...options,
  });
};
