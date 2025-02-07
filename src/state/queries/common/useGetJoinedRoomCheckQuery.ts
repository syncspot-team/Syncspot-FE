import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { COMMON_KEY } from './key';
import { getJoinedRoomCheck } from '@src/apis/common/getJoinedRoomCheck';
import { IJoinedRoomCheckResponseType } from '@src/types/common/joinedRoomCheckResponseType';

export const useGetJoinedRoomCheckQuery = (
  roomId: string,
  options?: UseQueryOptions<IJoinedRoomCheckResponseType, Error, any>,
) => {
  return useQuery<IJoinedRoomCheckResponseType, Error, any>({
    queryKey: COMMON_KEY.JOINED_ROOM_CHECK(roomId),
    queryFn: () => getJoinedRoomCheck(roomId),
    ...options,
  });
};
