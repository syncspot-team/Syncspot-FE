import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useRoomStore } from '@src/state/store/roomStore';
import { ROOM_QUERY_KEY } from './key';
import { ITimeVotedResponseType } from '@src/types/time/timeVotedResponseType';
import { getTimeVoted } from '@src/apis/time/getTimeVoted';

export const useGetTimeVotedQuery = (
  options?: Omit<
    UseQueryOptions<ITimeVotedResponseType, Error, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { roomId } = useRoomStore();

  return useQuery({
    queryKey: ROOM_QUERY_KEY.GET_TIME_VOTED(roomId),
    queryFn: () => getTimeVoted(roomId),
    enabled: !!roomId,
    ...options,
  });
};
