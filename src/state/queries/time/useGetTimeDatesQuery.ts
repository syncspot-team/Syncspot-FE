import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TIME_KEY } from './key';
import { ITimeDatesResponseType } from '@src/types/time/timeDatesResponseType';
import { getTimeDates } from '@src/apis/time/getTimeDates';

export const useGetTimeDatesQuery = (
  options?: UseQueryOptions<ITimeDatesResponseType, Error, any>,
) => {
  const { roomId } = useParams();

  return useQuery({
    queryKey: [TIME_KEY.GET_TIME_DATES(roomId!)],
    queryFn: () => getTimeDates(roomId!),
    ...options,
  });
};
