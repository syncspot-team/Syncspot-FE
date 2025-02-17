import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPlaceVoteLookup } from '@src/apis/place/getPlaceVoteLookup';
import { ROOM_QUERY_KEY } from './key';
import { IPlaceVoteLookupResponseType } from '@src/types/place/placeVoteLookupResponseType';
import { useRoomStore } from '@src/state/store/roomStore';

export const useGetPlaceVotedQuery = (
  options?: Omit<
    UseQueryOptions<IPlaceVoteLookupResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useRoomStore();

  return useQuery({
    queryKey: ROOM_QUERY_KEY.GET_PLACE_VOTED(roomId),
    queryFn: () => getPlaceVoteLookup(roomId),
    enabled: !!roomId,
    ...options,
  });
};
