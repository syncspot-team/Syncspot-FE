import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IPlaceSearchResponseType } from '@src/types/location/placeSearchResponseType';
import { useRoomStore } from '@src/state/store/roomStore';
import { ROOM_QUERY_KEY } from './key';
import { getPlaceSearch } from '@src/apis/location/getPlaceSearch';

export const useGetCheckLocationEnterQuery = (
  options?: Omit<
    UseQueryOptions<IPlaceSearchResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useRoomStore();

  return useQuery({
    staleTime: 0,
    gcTime: 0,
    queryKey: ROOM_QUERY_KEY.GET_CHECK_LOCATION_ENTER(roomId),
    queryFn: () => getPlaceSearch(roomId),
    enabled: !!roomId,
    ...options,
  });
};
