import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TIME_KEY } from './key';
import { ITimeVotedResponseType } from '@src/types/time/timeVotedResponseType';
import { getTimeVoted } from '@src/apis/time/getTimeVoted';

export const useGetTimeVotedQuery = (
  options?: UseQueryOptions<ITimeVotedResponseType, Error, any>,
) => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: [TIME_KEY.GET_TIME_VOTED(roomId!)],
    queryFn: () => getTimeVoted(roomId!),
    ...options,
  });
};
