import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ITimeDatesResponseType } from '@src/types/time/timeDatesResponseType';
import { getTimeDates } from '@src/apis/time/getTimeDates';
import { ROOM_QUERY_KEY } from './key';
import { useRoomStore } from '@src/state/store/roomStore';

export const useGetTimeViteRoomExistsQuery = (
  options?: UseQueryOptions<ITimeDatesResponseType, Error, any>,
) => {
  const { roomId } = useRoomStore();

  return useQuery({
    queryKey: ROOM_QUERY_KEY.GET_TIME_VOTE_ROOM_EXISTS(roomId),
    queryFn: () => getTimeDates(roomId),
    enabled: !!roomId,
    ...options,
  });
};
