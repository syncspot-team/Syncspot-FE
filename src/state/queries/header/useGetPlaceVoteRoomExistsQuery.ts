import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPlaceVoteRoomCheck } from '@src/apis/place/getPlaceVoteRoomCheck';

import { IPlaceVoteRoomCheckResponseType } from '@src/types/place/placeVoteRoomCheckResponseType';

import { ROOM_QUERY_KEY } from './key';
import { useRoomStore } from '@src/state/store/roomStore';

export const useGetPlaceVoteRoomExistsQuery = (
  options?: Omit<
    UseQueryOptions<IPlaceVoteRoomCheckResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useRoomStore();

  return useQuery({
    queryKey: ROOM_QUERY_KEY.GET_PLACE_VOTE_ROOM_EXISTS(roomId),
    queryFn: () => getPlaceVoteRoomCheck(roomId),
    enabled: !!roomId,
    ...options,
  });
};
